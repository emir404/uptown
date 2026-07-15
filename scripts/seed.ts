/**
 * One-time seed: moves the previously hardcoded site content and the images in
 * public/images into Payload. Run with:
 *
 *   bunx payload run scripts/seed.ts
 *
 * Safe to re-run: the admin user and the media uploads are only created when
 * missing, and the globals are only written while the Media collection is still
 * empty — so a re-run never overwrites content edited in the admin.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import {
  DEFAULT_HOMEPAGE,
  DEFAULT_SETTINGS,
  DEFAULT_SPEISEKARTE,
} from "../src/lib/defaults";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@uptown-restaurant.de";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "uptown2026";

async function main() {
  const payload = await getPayload({ config });

  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL}`);
  }

  const existingMedia = await payload.find({ collection: "media", limit: 1 });
  if (existingMedia.totalDocs > 0) {
    payload.logger.info("Media already exists — skipping content seed.");
    return;
  }

  // One upload per source file, even where the design reuses a photo (the story
  // arch is also the reservation image) — Media filenames are unique, so a
  // second upload of the same path would both duplicate the asset and collide.
  const uploaded = new Map<string, number>();

  /** Uploads a file from public/ into the Media collection, returns its id. */
  const media = async (src: string, alt: string) => {
    const cached = uploaded.get(src);
    if (cached !== undefined) return cached;
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(root, "public", src.replace(/^\//, "")),
    });
    uploaded.set(src, doc.id);
    return doc.id;
  };

  const h = DEFAULT_HOMEPAGE;

  const heroImage = await media(h.hero.imageSrc, h.hero.imageAlt);
  const reservationImage = await media(h.reservation.imageSrc, h.reservation.imageAlt);

  const galleryImages = [];
  for (const image of h.gallery.images) {
    galleryImages.push({
      image: await media(image.src, image.alt),
      caption: image.caption,
    });
  }

  const chapters = [];
  for (const chapter of h.story.chapters) {
    chapters.push({
      kicker: chapter.kicker,
      heading: chapter.heading,
      paragraphs: chapter.paragraphs,
      image: await media(chapter.imageSrc, chapter.imageAlt),
    });
  }

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        image: heroImage,
        reserveLabel: h.hero.reserveLabel,
        columns: h.hero.columns,
      },
      gallery: {
        eyebrow: h.gallery.eyebrow,
        heading: h.gallery.heading,
        text: h.gallery.text,
        images: galleryImages,
      },
      story: {
        eyebrow: h.story.eyebrow,
        heading: h.story.heading,
        chapters,
        quote: h.story.quote,
        ctaLabel: h.story.ctaLabel,
      },
      menu: h.menu,
      specials: h.specials,
      contact: h.contact,
      reservation: {
        eyebrow: h.reservation.eyebrow,
        heading: h.reservation.heading,
        text: h.reservation.text,
        reserveEyebrow: h.reservation.reserveEyebrow,
        image: reservationImage,
      },
    },
  });
  payload.logger.info("Startseite seeded.");

  await payload.updateGlobal({ slug: "speisekarte", data: DEFAULT_SPEISEKARTE });
  payload.logger.info(`Speisekarte seeded (${DEFAULT_SPEISEKARTE.sections.length} Kategorien).`);

  await payload.updateGlobal({ slug: "site-settings", data: DEFAULT_SETTINGS });
  payload.logger.info("Einstellungen seeded.");
}

await main();
process.exit(0);
