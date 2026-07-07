# UPTOWN Restaurant — Knowledge Base

A verified, single-source-of-truth knowledge base for **UPTOWN Restaurant & Bistro**
(Lübeck), transcribed directly from the live site **https://www.uptown-restaurant.de**
and its menu placemats. Use this to generate site content **without hallucinating**.

> Every fact in this knowledge base was read off the restaurant's own pages, menu
> placemats (PDF/JPG "Tischsets"), and promotional posters. Nothing here is invented.
> Where a value could not be read with confidence it is marked `‹unread›`.

Captured on **2026-07-07** from the CMS Made Simple site at `uptown-restaurant.de`.

---

## ⚠️ Data-accuracy warning for this repo

The existing rebuild in this project was seeded with **content from a different
restaurant** and with **incorrect facts**. Do not trust it — use this knowledge base instead:

| File | Problem | Correct source |
|------|---------|----------------|
| `app/data/menu.ts` | Menu items, prices & the `FULL_MENU_URL` are copied from **Trattoria Lara** (`trattoria-lara.de`) — a different restaurant. None of it is UPTOWN's menu. | [`02-food-menu.md`](02-food-menu.md) |
| `app/data/openingHours.ts` | Opening hours are wrong (shows Sun & Sat midday open, Mon closed). UPTOWN is **closed Sun + Mon**, opens **16:00**, Tue–Thu until 21:00, Fri–Sat until 22:00. | [`01-restaurant-info.md`](01-restaurant-info.md) |
| `public/images/*` (`hero.jpg`, `about-*.jpg`, `gallery-*.jpg`) | Generic/stock placeholder photos, **not** UPTOWN's own images. | `source/originals/…` (real site imagery) |

---

## Contents

| Document | What's in it |
|----------|--------------|
| [`01-restaurant-info.md`](01-restaurant-info.md) | Identity, address, phone, email, **opening hours**, location, WiFi, party service, imprint, house rules |
| [`02-food-menu.md`](02-food-menu.md) | Full food menu (current 2026 placemat): starters, salads, BBQ/ribs, mains, steaks, pasta, desserts |
| [`03-drinks-menu.md`](03-drinks-menu.md) | Beers, wines (glass + bottle), cocktails, alcohol-free cocktails, softdrinks, juices, water |
| [`04-specials-and-promotions.md`](04-specials-and-promotions.md) | Weekly special (Scholle/Matjes), Smoke-Town-Ribs all-you-can-eat, Scampi "satt", Caipi-Donnerstag |
| [`data/`](data/) | Machine-readable JSON: `restaurant-info.json`, `food-menu.json`, `drinks-menu.json` |
| [`reference-images/`](reference-images/) | Readable rendered images of the menu placemats & promo posters |
| [`source/`](source/) | Raw downloaded material — every page's HTML + all original images & PDFs |

---

## Source material (downloaded)

### Pages (`source/pages/`)
All 13 live pages of `uptown-restaurant.de`, saved as raw HTML:
`index`, `vorspeisen`, `hauptgericht`, `pasta`, `desserts`, `wochenkarte`, `weinkarte`,
`aktionen`, `anfahrt`, `oeffnungszeiten`, `partyservice`, `fotoalbum`, `impressum`.

> The site is a shell: the menu pages (`vorspeisen`, `hauptgericht`, `pasta`, `desserts`)
> contain **no text menu** — they embed the placemat images/PDFs. `pasta` and `desserts`
> are "in Bearbeitung" (under construction). `fotoalbum` is "zur Zeit nicht verfügbar".
> **The real menu lives entirely in the placemat ("Tischset") PDFs.**

### Original images & PDFs (`source/originals/uploads/…`)
Paths preserved as on the server. Key files:

| File | What it is |
|------|-----------|
| `…/2025-2026/2 TISCHSET Innenseite . 2026 .pdf` (+ `.26.jpg`) | **Current food menu** (inside of placemat, 2026) |
| `…/2024/2 TISCHSET . 2024 .pdf` (+ `.jpg`) | Prior food menu (2024) — same dishes/prices, blue colourway |
| `…/2024/1.Tischsets VORDERS. 2024 .pdf` (+ `.jpg`) | **Drinks menu** (front of placemat) |
| `…/2025-2026/Scholle 2026 .pdf` (+ `.jpg`) | Weekly special: fresh plaice & matjes |
| `…/2024/2024 Plakat Rippen ….pdf` | Ribs "all you can eat" poster |
| `…/2025-2026/Scampi 2026 .jpg` | Scampi "satt" poster (2026 dates) |
| `…/2023/Publikation2.jpg`, `…/Aktionen/Publikation2.pdf` | Caipi-Donnerstag promo |
| `…/fotos_aktionen/aktion_ribs.jpg`, `aktion_caipi.jpg` | Promo thumbnails |
| `…/teaser/tl_english.gif`, `tr_caipi.gif` | Sidebar teasers ("We speak English", Caipi) |

## Reproducing the reference images
The `reference-images/` PNGs were rendered from the source PDFs with Ghostscript, e.g.:
```bash
gs -q -dNOPAUSE -dBATCH -sDEVICE=png16m -r400 \
   -sOutputFile=out-%d.png "source/originals/uploads/images/uptown/2025-2026/2 TISCHSET Innenseite . 2026 .pdf"
```

## Allergen / additive numbers
Dishes on the placemat carry superscript numbers (e.g. `(1,3,7,9,10,12)`). The **legend
key is not printed on the placemat** — the menu states: *"Eine Liste der enthaltenen
Allergene und Zusatzstoffe liegt für Sie bereit. Bitte fragen Sie unser Personal."*
The numbers are recorded verbatim here; their meanings were **not** captured (do not invent them).
