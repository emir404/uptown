import type { CollectionConfig } from "payload";
import { applyChangeRequest } from "../lib/applyChangeRequest";
import type { Document } from "@/payload-types";

// „KI-Änderungen“: der Inhaber lädt Dokumente hoch (neue Speisekarte,
// Öffnungszeiten, Flyer …), beschreibt den Wunsch, speichert — und die
// Änderung wird direkt auf die Website-Inhalte (Startseite + Einstellungen)
// angewendet. Der Eintrag bleibt als Protokoll mit Ergebnis stehen.

const MAX_ATTACHMENTS = 5;

export const ChangeRequests: CollectionConfig = {
  slug: "change-requests",
  labels: { singular: "KI-Änderung", plural: "KI-Änderungen" },
  admin: {
    description:
      "Beschreibt die gewünschte Änderung (z.B. „Übernimm die Preise aus der angehängten Karte“), " +
      "hängt bis zu 5 Fotos/PDFs an und speichert — die Website wird direkt aktualisiert.",
    defaultColumns: ["prompt", "status", "updatedAt"],
    useAsTitle: "prompt",
  },
  fields: [
    {
      name: "prompt",
      label: "Gewünschte Änderung",
      type: "textarea",
      required: true,
      admin: {
        description:
          "In eigenen Worten: Was soll sich auf der Website ändern? Die angehängten Dateien werden mitgelesen.",
      },
    },
    {
      name: "attachments",
      label: "Anhänge (max. 5)",
      type: "upload",
      relationTo: "documents",
      hasMany: true,
      validate: (value: unknown) => {
        if (Array.isArray(value) && value.length > MAX_ATTACHMENTS) {
          return `Höchstens ${MAX_ATTACHMENTS} Anhänge pro Änderung.`;
        }
        return true;
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "offen",
      options: [
        { label: "Offen", value: "offen" },
        { label: "Angewendet", value: "angewendet" },
        { label: "Fehlgeschlagen", value: "fehlgeschlagen" },
      ],
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "summary",
      label: "Ergebnis",
      type: "textarea",
      admin: {
        readOnly: true,
        description: "Was die KI geändert hat — oder warum es nicht ging.",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        // The status write-back below re-enters this hook — skip that pass.
        if (context.skipApply) return doc;
        if (doc.status !== "offen") return doc;

        const attachmentIds: number[] = (doc.attachments ?? []).map(
          (a: number | { id: number }) => (typeof a === "object" ? a.id : a),
        );
        const documents: Document[] = [];
        for (const id of attachmentIds.slice(0, MAX_ATTACHMENTS)) {
          documents.push(
            (await req.payload.findByID({ collection: "documents", id })) as Document,
          );
        }

        let patch: { status: "angewendet" | "fehlgeschlagen"; summary: string };
        try {
          const outcome = await applyChangeRequest({
            payload: req.payload,
            prompt: doc.prompt,
            documents,
          });
          patch = { status: "angewendet", summary: outcome.summary };
        } catch (err) {
          req.payload.logger.error({ err }, "change request failed");
          patch = {
            status: "fehlgeschlagen",
            summary: `Konnte nicht angewendet werden: ${err instanceof Error ? err.message : String(err)}`,
          };
        }

        await req.payload.update({
          collection: "change-requests",
          id: doc.id,
          data: patch,
          context: { skipApply: true },
        });
        return { ...doc, ...patch };
      },
    ],
  },
};
