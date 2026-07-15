import { getCms, toImg, type Img } from "./cms";
import { DEFAULT_HOMEPAGE, DEFAULT_SETTINGS, DEFAULT_SPEISEKARTE } from "./defaults";
import type { Homepage, SiteSetting, Speisekarte } from "@/payload-types";

/**
 * Reads the globals and resolves them into the plain, fully-typed view models
 * the (client) section components take as props. Every field falls back to
 * `defaults.ts`, so an unseeded database renders the original site instead of
 * throwing — and upload relations become `{ src, alt }` here rather than in
 * each component.
 */

/** Sonntag = 0, to line up with Date.getDay(). */
const DAY_INDEX: Record<string, number> = {
  Sonntag: 0,
  Montag: 1,
  Dienstag: 2,
  Mittwoch: 3,
  Donnerstag: 4,
  Freitag: 5,
  Samstag: 6,
};

export interface HoursRow {
  day: string;
  time: string;
  /** Minutes since midnight, or null when closed — drives „Jetzt geöffnet“. */
  open: [number, number] | null;
  /** Date.getDay() index, so „Heute“ survives any re-ordering in the admin. */
  dayIndex: number;
}

export interface SiteData {
  meta: { title: string; description: string; siteUrl: string };
  name: string;
  subtitle: string;
  since: string;
  street: string;
  city: string;
  /** „23560 Lübeck“ → „Lübeck“ — the hero tagline shows the town on its own. */
  cityName: string;
  cityNote: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  phoneNote: string;
  email: string;
  legalName: string;
  mapsEmbedSrc: string;
  mapsLink: string;
  fullMenuUrl: string;
  hours: HoursRow[];
  hoursSummary: Array<{ days: string; time: string }>;
  kitchenNote: string;
  marquee: string[];
  marqueeSrLabel: string;
  phillipEnabled: boolean;
}

/** „16:30“ → 990. Anything unparseable means „closed“. */
function toMinutes(value: string | null | undefined): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec((value ?? "").trim());
  if (!match) return null;
  const minutes = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  return Number.isFinite(minutes) ? minutes : null;
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? fallback : trimmed;
}

/** A textarea heading — one animated line per row. */
export function toLines(value: string | null | undefined, fallback: string): string[] {
  const lines = text(value, fallback)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length ? lines : fallback.split("\n");
}

function img(
  media: Parameters<typeof toImg>[0],
  fallbackSrc: string,
  fallbackAlt: string,
): Img {
  return toImg(media, fallbackAlt) ?? { src: fallbackSrc, alt: fallbackAlt };
}

export async function getSiteData(): Promise<SiteData> {
  const cms = await getCms();
  const s = (await cms.findGlobal({ slug: "site-settings" })) as SiteSetting;
  const d = DEFAULT_SETTINGS;

  const rows = s?.hours?.length ? s.hours : d.hours;
  const hours: HoursRow[] = rows.map((row) => {
    const from = toMinutes(row.openFrom);
    const until = toMinutes(row.openUntil);
    return {
      day: row.day,
      time: row.time,
      open: from !== null && until !== null ? [from, until] : null,
      dayIndex: DAY_INDEX[row.day.trim()] ?? -1,
    };
  });

  const street = text(s?.contact?.street, d.contact.street);
  const city = text(s?.contact?.city, d.contact.city);

  return {
    meta: {
      title: text(s?.meta?.title, d.meta.title),
      description: text(s?.meta?.description, d.meta.description),
      siteUrl: text(s?.meta?.siteUrl, d.meta.siteUrl),
    },
    name: text(s?.contact?.name, d.contact.name),
    subtitle: text(s?.contact?.subtitle, d.contact.subtitle),
    since: text(s?.contact?.since, d.contact.since),
    street,
    city,
    cityName: city.replace(/^\d[\d\s]*/, "").trim() || city,
    cityNote: text(s?.contact?.cityNote, d.contact.cityNote),
    address: `${street}, ${city}`,
    phoneDisplay: text(s?.contact?.phoneDisplay, d.contact.phoneDisplay),
    phoneHref: `tel:${text(s?.contact?.phoneNumber, d.contact.phoneNumber).replace(/[^\d+]/g, "")}`,
    phoneNote: text(s?.contact?.phoneNote, d.contact.phoneNote),
    email: text(s?.contact?.email, d.contact.email),
    legalName: text(s?.contact?.legalName, d.contact.legalName),
    mapsEmbedSrc: text(s?.contact?.mapsEmbedSrc, d.contact.mapsEmbedSrc),
    mapsLink: text(s?.contact?.mapsLink, d.contact.mapsLink),
    fullMenuUrl: text(s?.contact?.fullMenuUrl, d.contact.fullMenuUrl),
    hours,
    hoursSummary: s?.hoursSummary?.length
      ? s.hoursSummary.map((r) => ({ days: r.days, time: r.time }))
      : d.hoursSummary,
    kitchenNote: text(s?.kitchenNote, d.kitchenNote),
    marquee: s?.marquee?.length ? s.marquee.map((m) => m.text) : d.marquee.map((m) => m.text),
    marqueeSrLabel: text(s?.marqueeSrLabel, d.marqueeSrLabel),
    // Unset (null) means on — the checkbox is opt-out.
    phillipEnabled: s?.phillipEnabled !== false,
  };
}

export interface MenuItemData {
  name: string;
  description?: string;
  price?: string;
  sizes?: Array<{ label: string; price: string }>;
}

export interface MenuCategoryData {
  title: string;
  en: string;
  note?: string;
  items: MenuItemData[];
}

export interface SpeisekarteData {
  sections: MenuCategoryData[];
  footnote: string;
}

export async function getSpeisekarte(): Promise<SpeisekarteData> {
  const cms = await getCms();
  const k = (await cms.findGlobal({ slug: "speisekarte" })) as Speisekarte;
  const d = DEFAULT_SPEISEKARTE;

  if (!k?.sections?.length) return d;

  return {
    sections: k.sections.map((section) => ({
      title: section.title,
      en: section.en,
      note: section.note?.trim() || undefined,
      items: (section.items ?? []).map((item) => ({
        name: item.name,
        description: item.description?.trim() || undefined,
        // A dish has either a single price or portion sizes — never both.
        price: item.sizes?.length ? undefined : item.price?.trim() || undefined,
        sizes: item.sizes?.length
          ? item.sizes.map((s) => ({ label: s.label, price: s.price }))
          : undefined,
      })),
    })),
    footnote: text(k.footnote, d.footnote),
  };
}

export interface HomeData {
  hero: { image: Img; reserveLabel: string; columns: string[] };
  gallery: {
    eyebrow: string;
    heading: string[];
    text: string;
    images: Array<Img & { caption?: string }>;
  };
  story: {
    eyebrow: string;
    heading: string[];
    chapters: Array<{
      kicker: string;
      heading: string[];
      paragraphs: string[];
      image: Img;
    }>;
    quote: { text: string; author: string };
    ctaLabel: string;
  };
  menu: { eyebrow: string; heading: string[]; ctaLabel: string };
  specials: {
    eyebrow: string;
    heading: string[];
    items: Array<{
      cadence: string;
      title: string;
      description: string;
      price: string;
      unit?: string;
    }>;
    barEyebrow: string;
    bar: Array<{ name: string; price: string; description: string }>;
    footnote: string[];
  };
  contact: {
    heading: string[];
    reserveEyebrow: string;
    reserveLinkLabel: string;
    infoItems: string[];
    hoursHeading: string;
    mapCtaLabel: string;
  };
  reservation: {
    eyebrow: string;
    heading: string[];
    text: string;
    reserveEyebrow: string;
    image: Img;
  };
}

export async function getHomeData(): Promise<HomeData> {
  const cms = await getCms();
  const h = (await cms.findGlobal({ slug: "homepage" })) as Homepage;
  const d = DEFAULT_HOMEPAGE;

  return {
    hero: {
      image: img(h?.hero?.image, d.hero.imageSrc, d.hero.imageAlt),
      reserveLabel: text(h?.hero?.reserveLabel, d.hero.reserveLabel),
      columns: h?.hero?.columns?.length
        ? h.hero.columns.map((c) => c.text)
        : d.hero.columns.map((c) => c.text),
    },
    gallery: {
      eyebrow: text(h?.gallery?.eyebrow, d.gallery.eyebrow),
      heading: toLines(h?.gallery?.heading, d.gallery.heading),
      text: text(h?.gallery?.text, d.gallery.text),
      images: h?.gallery?.images?.length
        ? h.gallery.images.map((g, i) => ({
            ...img(g.image, d.gallery.images[i]?.src ?? "", d.gallery.images[i]?.alt ?? ""),
            caption: g.caption?.trim() || undefined,
          }))
        : d.gallery.images.map((g) => ({
            src: g.src,
            alt: g.alt,
            caption: g.caption || undefined,
          })),
    },
    story: {
      eyebrow: text(h?.story?.eyebrow, d.story.eyebrow),
      heading: toLines(h?.story?.heading, d.story.heading),
      chapters: h?.story?.chapters?.length
        ? h.story.chapters.map((c, i) => ({
            kicker: c.kicker,
            heading: toLines(c.heading, d.story.chapters[i]?.heading ?? ""),
            paragraphs: (c.paragraphs ?? []).map((p) => p.text),
            image: img(
              c.image,
              d.story.chapters[i]?.imageSrc ?? "",
              d.story.chapters[i]?.imageAlt ?? "",
            ),
          }))
        : d.story.chapters.map((c) => ({
            kicker: c.kicker,
            heading: c.heading.split("\n"),
            paragraphs: c.paragraphs.map((p) => p.text),
            image: { src: c.imageSrc, alt: c.imageAlt },
          })),
      quote: {
        text: text(h?.story?.quote?.text, d.story.quote.text),
        author: text(h?.story?.quote?.author, d.story.quote.author),
      },
      ctaLabel: text(h?.story?.ctaLabel, d.story.ctaLabel),
    },
    menu: {
      eyebrow: text(h?.menu?.eyebrow, d.menu.eyebrow),
      heading: toLines(h?.menu?.heading, d.menu.heading),
      ctaLabel: text(h?.menu?.ctaLabel, d.menu.ctaLabel),
    },
    specials: {
      eyebrow: text(h?.specials?.eyebrow, d.specials.eyebrow),
      heading: toLines(h?.specials?.heading, d.specials.heading),
      items: h?.specials?.items?.length
        ? h.specials.items.map((s) => ({
            cadence: s.cadence,
            title: s.title,
            description: s.description,
            price: s.price,
            unit: s.unit?.trim() || undefined,
          }))
        : d.specials.items.map((s) => ({ ...s, unit: s.unit || undefined })),
      barEyebrow: text(h?.specials?.barEyebrow, d.specials.barEyebrow),
      bar: h?.specials?.bar?.length
        ? h.specials.bar.map((b) => ({
            name: b.name,
            price: b.price,
            description: b.description,
          }))
        : d.specials.bar,
      footnote: h?.specials?.footnote?.length
        ? h.specials.footnote.map((f) => f.text)
        : d.specials.footnote.map((f) => f.text),
    },
    contact: {
      heading: toLines(h?.contact?.heading, d.contact.heading),
      reserveEyebrow: text(h?.contact?.reserveEyebrow, d.contact.reserveEyebrow),
      reserveLinkLabel: text(h?.contact?.reserveLinkLabel, d.contact.reserveLinkLabel),
      infoItems: h?.contact?.infoItems?.length
        ? h.contact.infoItems.map((i) => i.text)
        : d.contact.infoItems.map((i) => i.text),
      hoursHeading: text(h?.contact?.hoursHeading, d.contact.hoursHeading),
      mapCtaLabel: text(h?.contact?.mapCtaLabel, d.contact.mapCtaLabel),
    },
    reservation: {
      eyebrow: text(h?.reservation?.eyebrow, d.reservation.eyebrow),
      heading: toLines(h?.reservation?.heading, d.reservation.heading),
      text: text(h?.reservation?.text, d.reservation.text),
      reserveEyebrow: text(h?.reservation?.reserveEyebrow, d.reservation.reserveEyebrow),
      image: img(h?.reservation?.image, d.reservation.imageSrc, d.reservation.imageAlt),
    },
  };
}
