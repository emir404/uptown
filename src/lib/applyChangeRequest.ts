import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import type { Payload } from "payload";
import sharp from "sharp";
import type { Document } from "@/payload-types";

// Turns a saved change request (prompt + attached documents) into real edits on
// the site's content: the current Homepage, Speisekarte and SiteSettings globals
// go to Claude as JSON, the attachments go along as readable content (images as
// vision, PDFs as documents), and the returned content is written back through
// Payload — which re-validates every field against the schema.

const dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCUMENTS_DIR = path.resolve(dirname, "../../public/documents");

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

/** Image types the Messages API accepts as vision blocks. */
const VISION_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);
/** Longest edge Claude needs — anything bigger only costs tokens. */
const MAX_IMAGE_DIMENSION = 1568;

const SYSTEM = [
  "You are the content editor for the website of UPTOWN Restaurant & Bistro, a steak and BBQ",
  "restaurant in Lübeck (Kronsforder Allee, since 2007 — argentinian steaks, Smoke-Town-Ribs,",
  "cocktails).",
  "You receive the site's entire editable content as three JSON values — `homepage`, `speisekarte`",
  "(the full menu: categories with dishes and prices) and `siteSettings` — plus the owner's request",
  "in German, often with attached photos or PDFs (a new menu, new opening hours, a flyer). Read the",
  "attachments carefully and apply exactly the requested changes to the JSON.",
  "",
  "Rules:",
  "- All visible text is German — keep it German, in the site's warm but formal voice (Sie-Ansprache).",
  "- Change ONLY what the request implies. Copy every other value through unchanged, byte for byte.",
  "- When an attachment contains content (dishes, prices, hours), transcribe it faithfully —",
  "  never invent items, prices, or times that are not in the attachment.",
  "- MATCH THE SITE'S EXISTING FORMAT, not the attachment's. The design must stay consistent:",
  "  copy the exact formatting conventions of the values you replace — zero-padded times, the",
  "  en-dash „–“ with spaces (never a hyphen), German decimal commas in prices, the same label",
  "  patterns, the same capitalization, punctuation, and roughly the same text length as before.",
  "- Numeric fields that reference images (e.g. `hero.image`, `gallery.images[].image`,",
  "  `story.chapters[].image`) are upload IDs. NEVER change, add, or remove them, and never turn",
  "  them into strings.",
  "- `speisekarte` is the menu: { sections: [{ title, en, note?, items: [{ name, description?,",
  '  price?, sizes?: [{ label, price }] }] }], footnote }. Prices are strings WITHOUT the € sign',
  '  ("21,50") — the design adds it. A dish has EITHER `price` OR `sizes`, never both. Menu and',
  "  price changes from an attached card belong HERE (and only touch hours/homepage if asked).",
  "- `siteSettings.hours` is exactly 7 entries, Monday first. `time` is the text shown to guests;",
  "  `openFrom`/`openUntil` are „HH:MM“ and drive the „Jetzt geöffnet“ badge — keep them consistent",
  '  with `time` (empty both = Ruhetag, "24:00" = open end). `hoursSummary` is the footer short form',
  "  and must stay consistent with `hours`.",
  "- Fields named `heading` may contain line breaks — each line is animated separately, so keep",
  "  the existing number of lines unless the request needs otherwise.",
  "- Respect the array limits: hero.columns ≤ 3, gallery.images ≤ 9, story.chapters ≤ 3,",
  "  specials.bar ≤ 3, contact.infoItems ≤ 4. The gallery's collage layout follows the image",
  "  order — reordering images rearranges the collage.",
  "- If the request cannot be fulfilled with these fields (e.g. it needs a new page or new images),",
  '  set every value to null and explain why in "summary" (German).',
  "",
  "Respond with ONLY a JSON object, no markdown fences, of the shape:",
  '{ "homepage": <full updated homepage object or null>,',
  '  "speisekarte": <full updated speisekarte object or null>,',
  '  "siteSettings": <full updated site-settings object or null>,',
  '  "summary": "<one or two German sentences for the owner: what changed>" }',
  "Return each value COMPLETE (all fields), not a diff. Return null for anything you did not change.",
].join("\n");

interface ClaudeResult {
  homepage: Record<string, unknown> | null;
  speisekarte: Record<string, unknown> | null;
  siteSettings: Record<string, unknown> | null;
  summary: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * The attachment's bytes — from the Blob CDN in production, from disk in dev.
 * Right after an upload the public Blob URL can briefly 404 (the apply hook
 * runs in the same request as the upload), so remote reads retry a few times
 * before giving up.
 */
async function loadDocumentBytes(doc: Document): Promise<Buffer | null> {
  if (doc.url && /^https?:\/\//.test(doc.url)) {
    for (let attempt = 0; attempt < 4; attempt++) {
      if (attempt > 0) await sleep(1500 * attempt);
      try {
        const res = await fetch(doc.url, { cache: "no-store" });
        if (res.ok) return Buffer.from(await res.arrayBuffer());
      } catch {
        // transient network error — fall through to the next attempt
      }
    }
    return null;
  }
  if (doc.filename) {
    try {
      return await readFile(path.join(DOCUMENTS_DIR, doc.filename));
    } catch {
      return null;
    }
  }
  return null;
}

/** One content block per readable attachment; oversized images get downscaled. */
async function attachmentBlocks(docs: Document[]): Promise<Anthropic.ContentBlockParam[]> {
  const blocks: Anthropic.ContentBlockParam[] = [];
  for (const doc of docs) {
    const bytes = await loadDocumentBytes(doc);
    if (!bytes) continue;
    const mime = doc.mimeType ?? "";

    if (mime === "application/pdf") {
      blocks.push({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: bytes.toString("base64"),
        },
      });
      continue;
    }

    if (mime.startsWith("image/")) {
      // Re-encode anything exotic (HEIC…) or oversized into a JPEG Claude accepts.
      const needsReencode = !VISION_TYPES.has(mime);
      const meta = await sharp(bytes).metadata();
      const tooBig = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_IMAGE_DIMENSION;
      if (needsReencode || tooBig) {
        const resized = await sharp(bytes)
          .resize({
            width: MAX_IMAGE_DIMENSION,
            height: MAX_IMAGE_DIMENSION,
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({ quality: 85 })
          .toBuffer();
        blocks.push({
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: resized.toString("base64") },
        });
      } else {
        blocks.push({
          type: "image",
          source: {
            type: "base64",
            media_type: mime as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: bytes.toString("base64"),
          },
        });
      }
    }
    // Other types are skipped — the mimeTypes filter on the collection
    // shouldn't let any through in the first place.
  }
  return blocks;
}

/** Payload adds bookkeeping fields the model must not edit (or echo back). */
function stripMeta(global: Record<string, unknown>): Record<string, unknown> {
  const { id, createdAt, updatedAt, globalType, ...rest } = global as Record<string, unknown> & {
    id?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
    globalType?: unknown;
  };
  return rest;
}

/** Tolerate a model that wraps its JSON in a fence despite instructions. */
function parseResult(text: string): ClaudeResult {
  const unfenced = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  const parsed = JSON.parse(unfenced) as Partial<ClaudeResult>;
  if (typeof parsed !== "object" || parsed === null || typeof parsed.summary !== "string") {
    throw new Error("model response is missing the expected shape");
  }
  return {
    homepage: parsed.homepage ?? null,
    speisekarte: parsed.speisekarte ?? null,
    siteSettings: parsed.siteSettings ?? null,
    summary: parsed.summary,
  };
}

export interface ApplyOutcome {
  summary: string;
  changedHomepage: boolean;
  changedSettings: boolean;
}

export async function applyChangeRequest(input: {
  payload: Payload;
  prompt: string;
  documents: Document[];
}): Promise<ApplyOutcome> {
  const { payload, prompt, documents } = input;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY ist nicht konfiguriert.");
  }

  // depth 0 keeps upload relations as plain numeric IDs — exactly the shape
  // we can safely round-trip through the model and back into updateGlobal.
  const [homepage, speisekarte, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "homepage", depth: 0 }),
    payload.findGlobal({ slug: "speisekarte", depth: 0 }),
    payload.findGlobal({ slug: "site-settings", depth: 0 }),
  ]);

  const client = new Anthropic();
  const blocks = await attachmentBlocks(documents);
  // Better a clear German error on the entry than the model politely guessing
  // its way around attachments it never received.
  if (documents.length > 0 && blocks.length === 0) {
    throw new Error(
      "Die angehängten Dateien konnten nicht geladen werden — bitte einfach noch einmal speichern.",
    );
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: [
          ...blocks,
          {
            type: "text",
            text: [
              `homepage:\n${JSON.stringify(stripMeta(homepage as unknown as Record<string, unknown>))}`,
              `speisekarte:\n${JSON.stringify(stripMeta(speisekarte as unknown as Record<string, unknown>))}`,
              `siteSettings:\n${JSON.stringify(stripMeta(siteSettings as unknown as Record<string, unknown>))}`,
              `Wunsch des Inhabers:\n${prompt}`,
              documents.length
                ? `(${documents.length} ${documents.length === 1 ? "Datei ist" : "Dateien sind"} oben angehängt.)`
                : "(Keine Dateien angehängt.)",
            ].join("\n\n"),
          },
        ],
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  const result = parseResult(text);

  // updateGlobal re-runs Payload's own field validation — a malformed shape
  // from the model fails loudly instead of half-writing content. Each global
  // is applied independently: the model sometimes echoes a global it didn't
  // touch, and a validation error there must not sink the change that WAS
  // requested. Echoes (deep-equal to current) are skipped outright.
  const current = {
    homepage: stripMeta(homepage as unknown as Record<string, unknown>),
    speisekarte: stripMeta(speisekarte as unknown as Record<string, unknown>),
    siteSettings: stripMeta(siteSettings as unknown as Record<string, unknown>),
  };
  const failures: string[] = [];
  let changedHomepage = false;
  let changedSettings = false;
  let changedKarte = false;

  if (result.homepage && JSON.stringify(result.homepage) !== JSON.stringify(current.homepage)) {
    try {
      await payload.updateGlobal({ slug: "homepage", data: result.homepage });
      changedHomepage = true;
    } catch (err) {
      failures.push(`Startseite: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (
    result.speisekarte &&
    JSON.stringify(result.speisekarte) !== JSON.stringify(current.speisekarte)
  ) {
    try {
      await payload.updateGlobal({ slug: "speisekarte", data: result.speisekarte });
      changedKarte = true;
    } catch (err) {
      failures.push(`Speisekarte: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (
    result.siteSettings &&
    JSON.stringify(result.siteSettings) !== JSON.stringify(current.siteSettings)
  ) {
    try {
      await payload.updateGlobal({ slug: "site-settings", data: result.siteSettings });
      changedSettings = true;
    } catch (err) {
      failures.push(`Einstellungen: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (failures.length && !changedHomepage && !changedSettings && !changedKarte) {
    throw new Error(failures.join(" · "));
  }
  const summary = failures.length
    ? `${result.summary} (Teilweise fehlgeschlagen — ${failures.join(" · ")})`
    : result.summary;

  return { summary, changedHomepage, changedSettings };
}
