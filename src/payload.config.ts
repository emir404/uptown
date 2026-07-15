import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { de } from "@payloadcms/translations/languages/de";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Documents } from "./collections/Documents";
import { ChangeRequests } from "./collections/ChangeRequests";
import { SiteSettings } from "./globals/SiteSettings";
import { Homepage } from "./globals/Homepage";
import { Speisekarte } from "./globals/Speisekarte";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " — UPTOWN",
    },
  },
  // German only — with `en` in the list, an English browser locale flips the
  // whole admin (Create New, Bulk Upload, …) into English.
  i18n: {
    supportedLanguages: { de },
    fallbackLanguage: "de",
  },
  collections: [Media, Documents, ChangeRequests, Users],
  globals: [Homepage, Speisekarte, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    migrationDir: path.resolve(dirname, "migrations"),
    // Unlike Klein & Fein — whose production DB predates its migration history
    // and needs an additive `onInit` ensure — this project starts empty, so the
    // generated migrations are the single source of truth and run in
    // `vercel-build` before `next build`.
    push: false,
    client: {
      // Local dev: a file DB. Production (Vercel): a Turso libSQL URL + token.
      url: process.env.DATABASE_URI || "file:./uptown.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  plugins: [
    // Store uploads in Vercel Blob when a token is present (production);
    // falls back to the local `public/media` folder in development.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Serve media straight from the Blob CDN (public URLs) instead of
      // proxying every image through the serverless function. Documents (the
      // attachments of KI-Änderungen) live in Blob too — the read-only Vercel
      // filesystem can't take uploads.
      collections: {
        media: { disablePayloadAccessControl: true },
        documents: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
});
