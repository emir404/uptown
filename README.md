# UPTOWN Restaurant & Bistro

The website of UPTOWN Restaurant & Bistro (Kronsforder Allee 3a, Lübeck) — a
Next.js 16 site whose content is edited in a Payload CMS admin panel at `/admin`.

## Stack

- **Next.js 16** (App Router) + React 19 + Tailwind 4 + `motion`
- **Payload CMS 3** — admin panel, German-only
- **SQLite**: a local file in dev, **Turso** (libSQL) in production
- **Vercel Blob** for uploads in production (local `public/media` in dev)

## Getting started

```bash
bun install
cp .env.example .env.local     # then edit the values
bun run migrate                # create the schema
bunx payload run scripts/seed.ts   # admin user + the site's content & images
bun dev                        # http://localhost:3000
```

The seed is safe to re-run: it only creates the admin user and the content while
the Media collection is still empty, so it never overwrites admin edits.

## The admin panel

`/admin`, in German. Everything the owner can change lives here:

| Bereich | What it holds |
| --- | --- |
| **Startseite** | Every section — Hero, Galerie, Über uns, Speisekarte (intro), Aktionen, Kontakt, Reservierung |
| **Speisekarte** | The full menu: categories with dishes, descriptions, prices and portion sizes |
| **Einstellungen** | Address, phone, e-mail, opening hours, SEO metadata, footer marquee |
| **Bilder** | The media library every image field draws from |
| **Dokumente** | Upload a photo/PDF — and optionally describe a change to apply from it |
| **KI-Änderungen** | The AI change requests and their results, kept as a log |

### KI-Änderungen

The owner describes a change in German ("Übernimm die neuen Preise von dieser
Karte"), optionally attaches up to 5 photos/PDFs, and saves. The request goes to
Claude together with the current content and the attachments (images as vision,
PDFs as documents); the returned content is written back through Payload, which
re-validates every field. Needs `ANTHROPIC_API_KEY`.

Uploading a **Dokument** with its `prompt` field filled does the same thing in one
step — that is the simplest path for the owner.

## Content model

`src/lib/defaults.ts` holds the site's content as it was before the CMS; the menu
itself stays in `src/data/menu.ts` (transcribed verbatim from `knowledge-base/`)
and is re-exported rather than duplicated. The seed writes all of it into the
globals, and `src/lib/content.ts` falls back to it field by field — so an unseeded
database still renders the original site rather than an empty one.

Two things are deliberately **not** editable, because they are design rather than
content: the homepage nav (it mirrors the page's sections) and the gallery's
collage layout (each slot's span is fixed; re-ordering the images in the admin
rearranges the collage).

## Deployment (Vercel)

`vercel-build` runs `payload migrate` before `next build`. Required env vars:

| Variable | Purpose |
| --- | --- |
| `PAYLOAD_SECRET` | Signs auth tokens — a long random string |
| `DATABASE_URI` | Turso libSQL URL (`libsql://…`) |
| `DATABASE_AUTH_TOKEN` | Turso auth token |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — uploads land here in production |
| `ANTHROPIC_API_KEY` | Required for KI-Änderungen |
| `ANTHROPIC_MODEL` | Optional, defaults to `claude-sonnet-5` |
| `NEXT_PUBLIC_PHILLIP_PREVIEW_ID` | Optional — renders the Phillip assistant embed |

## Datenschutz

Fonts are self-hosted through `next/font`. Google Maps is behind a two-click
consent gate (`src/components/ConsentEmbed.tsx`) — nothing reaches Google before
the visitor clicks. Any new third-party embed must go through that component, and
the Datenschutzerklärung must be updated in the same change.
