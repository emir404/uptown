import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Dokumente — Speisekarten-Fotos, PDF-Karten, Flyer. Der Upload ist zugleich
 * der einfachste Weg, die Website zu ändern: Wunsch ins Textfeld schreiben,
 * speichern, fertig — ein KI-Änderungs-Eintrag wird automatisch angelegt und
 * angewendet, das Ergebnis erscheint direkt am Dokument.
 */
export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Dokument", plural: "Dokumente" },
  admin: {
    description:
      "Foto oder PDF hochladen (z.B. die neue Speisekarte). Wenn dabei etwas auf der " +
      "Website geändert werden soll, einfach unten beschreiben — es wird beim Speichern " +
      "automatisch angewendet.",
    defaultColumns: ["filename", "prompt", "ergebnis", "updatedAt"],
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/documents"),
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "prompt",
      label: "Soll etwas auf der Website geändert werden?",
      type: "textarea",
      admin: {
        description:
          "In eigenen Worten, z.B. „Übernimm die neuen Öffnungszeiten von dieser Karte“. " +
          "Die Datei wird mitgelesen und die Änderung beim Speichern direkt angewendet. " +
          "Leer lassen, wenn die Datei nur abgelegt werden soll.",
      },
    },
    {
      name: "ergebnis",
      label: "Ergebnis",
      type: "textarea",
      admin: {
        readOnly: true,
        description: "Was auf der Website geändert wurde — oder warum es nicht ging.",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation, context }) => {
        if (context.skipApply) return doc;
        const prompt: string = (doc.prompt ?? "").trim();
        if (!prompt) return doc;
        // Re-saving an already-applied document shouldn't re-run the change —
        // only a fresh upload or a newly written/edited request does.
        if (operation === "update" && previousDoc?.prompt?.trim() === prompt && doc.ergebnis) {
          return doc;
        }

        // The change-request entry does the actual work in its own hook and
        // stays behind as the log (status + summary in „KI-Änderungen“).
        const request = await req.payload.create({
          collection: "change-requests",
          data: { prompt, attachments: [doc.id], status: "offen" },
          context: {},
        });

        const ergebnis =
          request.summary ??
          (request.status === "angewendet" ? "Angewendet." : "Konnte nicht angewendet werden.");
        await req.payload.update({
          collection: "documents",
          id: doc.id,
          data: { ergebnis },
          context: { skipApply: true },
        });
        return { ...doc, ergebnis };
      },
    ],
  },
};
