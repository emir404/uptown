/**
 * The site's content as it was before the CMS existed — still the single source
 * of truth for a fresh database: `scripts/seed.ts` writes exactly this into the
 * globals, and the frontend falls back to it field by field if a global has not
 * been seeded yet (so the site never renders empty).
 *
 * The menu itself stays in `src/data/menu.ts` — it was transcribed verbatim from
 * the knowledge base and is re-exported here rather than duplicated.
 *
 * Images are the static files in `public/images`. Once the seed has uploaded them
 * into the Media collection, the CMS values win and these paths are only the
 * safety net.
 */
import { MENU, FULL_MENU_URL } from "@/data/menu";

export const DEFAULT_SETTINGS = {
  phillipEnabled: true,
  meta: {
    title: "UPTOWN Restaurant & Bistro – Lübeck",
    description:
      "UPTOWN Restaurant & Bistro in Lübeck, seit 2007. Argentinische Steaks, Smoke-Town-Ribs aus dem Smoker, Bison-Burger und Cocktails. Kronsforder Allee 3a, 23560 Lübeck.",
    siteUrl: "https://www.uptown-restaurant.de",
  },
  contact: {
    name: "UPTOWN",
    subtitle: "Restaurant & Bistro",
    since: "seit 2007",
    street: "Kronsforder Allee 3a",
    city: "23560 Lübeck",
    cityNote: "Nahe Mühlentorteller",
    phoneDisplay: "0451 / 707 95 65",
    phoneNumber: "+494517079565",
    phoneNote: "Telefonisch erreichbar ab 15 Uhr",
    email: "uptown@t-online.de",
    legalName: "Peter Witt und Ulf Bierbaum GbR",
    mapsEmbedSrc:
      "https://maps.google.com/maps?q=Kronsforder%20Allee%203a%2C%2023560%20L%C3%BCbeck&z=15&output=embed",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=UPTOWN+Restaurant+Kronsforder+Allee+3a+23560+L%C3%BCbeck",
    fullMenuUrl: FULL_MENU_URL,
  },
  // Monday first — the frontend matches on the day name, so this order is just
  // the editing order in the admin.
  hours: [
    { day: "Montag", time: "Ruhetag", openFrom: "", openUntil: "" },
    { day: "Dienstag", time: "16:00 – 21:00", openFrom: "16:00", openUntil: "21:00" },
    { day: "Mittwoch", time: "16:00 – 21:00", openFrom: "16:00", openUntil: "21:00" },
    { day: "Donnerstag", time: "16:00 – 21:00", openFrom: "16:00", openUntil: "21:00" },
    { day: "Freitag", time: "16:00 – 22:00", openFrom: "16:00", openUntil: "22:00" },
    { day: "Samstag", time: "16:00 – 22:00", openFrom: "16:00", openUntil: "22:00" },
    { day: "Sonntag", time: "Ruhetag", openFrom: "", openUntil: "" },
  ],
  hoursSummary: [
    { days: "Dienstag – Donnerstag", time: "16:00 – 21:00" },
    { days: "Freitag – Samstag", time: "16:00 – 22:00" },
    { days: "Sonntag & Montag", time: "Ruhetag" },
  ],
  kitchenNote:
    "Küche: Di–Do bis 20:30 Uhr, Fr–Sa bis 21:30 Uhr · Telefonisch erreichbar ab 15 Uhr",
  marquee: [
    { text: "Restaurant & Bistro" },
    { text: "Steaks" },
    { text: "Ribs" },
    { text: "Cocktails" },
    { text: "Lübeck" },
    { text: "seit 2007" },
  ],
  marqueeSrLabel: "UPTOWN Restaurant und Bistro in Lübeck — seit 2007.",
};

export const DEFAULT_SPEISEKARTE = {
  sections: MENU.map((category) => ({
    title: category.title,
    en: category.en,
    note: category.note ?? "",
    items: category.items.map((item) => ({
      name: item.name,
      description: item.description ?? "",
      price: item.price ?? "",
      sizes: item.sizes ?? [],
    })),
  })),
  footnote:
    "Jede Änderung berechnen wir mit 1,50 € · Halbe Portion 2/3 des Preises · Gerichte teilen oder extra Gedeck 2,00 € · Eine Liste der enthaltenen Allergene und Zusatzstoffe liegt für Sie bereit — bitte fragen Sie unser Personal.",
};

export const DEFAULT_HOMEPAGE = {
  hero: {
    imageSrc: "/images/hero-interior.jpg",
    imageAlt:
      "Die geschwungene rote Bar und der bordeauxrote Torbogen im UPTOWN am Abend, mit Kerzen und warmem Lampenlicht",
    reserveLabel: "Tisch reservieren",
    columns: [
      { text: "DI–DO 16–21 · FR/SA 16–22 · SO + MO RUHETAG" },
      { text: "Kronsforder Allee 3a, 23560 Lübeck" },
      { text: "RESTAURANT & BISTRO" },
    ],
  },
  gallery: {
    eyebrow: "Galerie",
    heading: "Ein Abend\nim Uptown.",
    text: "Der rote Bogen, die rote Bar, Teller, wie sie wirklich auf den Tisch kommen — echte Aufnahmen aus dem UPTOWN, nichts davon inszeniert.",
    images: [
      {
        src: "/images/real/dining-arch.jpg",
        alt: "Gastraum im UPTOWN mit dem burgunderroten Torbogen und New-York-Bildern an der Wand",
        caption: "Der rote Bogen",
      },
      {
        src: "/images/real/food-medaillons.jpg",
        alt: "Schweinemedaillons mit Kartoffelgratin, Gemüse und Salat auf weißem Teller",
        caption: "Schweinemedaillon le Havre",
      },
      {
        src: "/images/real/food-burger.jpg",
        alt: "Bison-Burger mit Curly Fries auf dem UPTOWN-Tischset",
        caption: "",
      },
      {
        src: "/images/real/food-bbq.jpg",
        alt: "BBQ-Teller und großer Salatteller auf den bedruckten Tischsets",
        caption: "",
      },
      {
        src: "/images/real/bar-red.jpg",
        alt: "Die rot beleuchtete Bar im UPTOWN mit dichtem Flaschenregal",
        caption: "Die Bar",
      },
      {
        src: "/images/real/facade-sign.jpg",
        alt: "Gelber UPTOWN-Schriftzug mit Lübecker Silhouette über den Fenstern",
        caption: "Restaurant & Bistro — seit 2007",
      },
      {
        src: "/images/real/entrance-day.jpg",
        alt: "Eingang des UPTOWN an der Kronsforder Allee bei Tageslicht",
        caption: "",
      },
      {
        src: "/images/real/window-dining.jpg",
        alt: "Gastraum mit Weinregal und Blick auf die Fensterfront",
        caption: "",
      },
      {
        src: "/images/real/facade-dusk.jpg",
        alt: "Warm erleuchtete Fassade des UPTOWN am Abend",
        caption: "Kronsforder Allee, abends",
      },
    ],
  },
  story: {
    eyebrow: "Über uns",
    heading: "Ein Stück Uptown\nin Lübeck.",
    chapters: [
      {
        kicker: "Seit 2007",
        heading: "Zwei Gastgeber,\neine Idee.",
        paragraphs: [
          {
            text: "2007 eröffnen Peter Witt und Ulf Bierbaum an der Kronsforder Allee, wenige Schritte vom Mühlentorteller, ihr eigenes Restaurant. Der Name ist eine Verbeugung vor Manhattan — UPTOWN: dorthin, wo der Abend etwas Besonderes wird.",
          },
          {
            text: "Aus der Idee wurde eine Lübecker Institution: ein Haus, in dem Geburtstage, Konfirmationen und Weihnachtsfeiern gefeiert werden — oder einfach ein Dienstagabend. And yes, we speak English.",
          },
        ],
        imageSrc: "/images/story-entrance.jpg",
        imageAlt:
          "Warm erleuchteter Eingang des UPTOWN am Winterabend, Backsteinfassade mit roten Sonnenschirmen",
      },
      {
        kicker: "Der Raum",
        heading: "Der rote\nBogen.",
        paragraphs: [
          {
            text: "Wer einmal hier war, vergisst den Raum nicht: der burgunderrote Bogen zwischen den Gasträumen, die geschwungene rote Bar, Kerzen auf jedem Tisch. An den Wänden New York — Empire State, Yellow Cabs — und dazwischen kleine Echsen, die sich über die Jahre eingeschlichen haben.",
          },
          {
            text: "Nichts davon stammt vom Reißbrett. Es ist über fast zwei Jahrzehnte gewachsen — und fühlt sich genau deshalb wie ein Wohnzimmer an, nicht wie ein Konzept.",
          },
        ],
        imageSrc: "/images/story-arch.jpg",
        imageAlt:
          "Der burgunderrote Torbogen im UPTOWN mit Blick in den kerzenbeleuchteten zweiten Gastraum",
      },
      {
        kicker: "Feuer & Rauch",
        heading: "Gutes braucht\nZeit.",
        paragraphs: [
          {
            text: "In der Küche gilt seit dem ersten Tag dieselbe Regel: Zeit. Argentinisches Rumpsteak, fein mariniert und gut abgehangen. Smoke-Town-Ribs, rund 650 Gramm, lange geräuchert — Sweet-Hawaii oder würzig-scharf. BBQ-Saucen, Dips und Dressings: hausgemacht.",
          },
          {
            text: "Und wenn Sie feiern möchten: Im Haus richten wir Gesellschaften und Seminare bis 60 Personen aus, außer Haus liefern wir bis 50 Personen.",
          },
        ],
        imageSrc: "/images/story-fire.jpg",
        imageAlt: "Glühende Holzkohle und aufsteigender Rauch im Grill des UPTOWN",
      },
    ],
    quote: {
      text: "Gutes Fleisch braucht Zeit — am Grill, im Smoker und am Tisch. Wir freuen uns auf Ihren Besuch.",
      author: "Peter Witt & Ulf Bierbaum · Gastgeber",
    },
    ctaLabel: "AUF GOOGLE MAPS FINDEN",
  },
  menu: {
    eyebrow: "Speisekarte",
    heading: "Vom Grill,\naus dem Smoker.",
    ctaLabel: "WOCHENKARTE & AKTUELLES",
  },
  specials: {
    eyebrow: "Aktionen",
    heading: "Die Rituale\ndes Hauses.",
    items: [
      {
        cadence: "Jeden Freitag & Samstag",
        title: "Smoke-Town-Ribs „satt“",
        description:
          "„All you can eat“ — Rippen satt, nur Rippen satt: die besten Ribs der Stadt, lange mariniert und geräuchert, Sweet-Hawaii oder würzig-scharf.",
        price: "23,50 €",
        unit: "pro Person",
      },
      {
        cadence: "Jeden 1. Dienstag im Monat",
        title: "Scampi „satt“",
        description:
          "Zwei Stunden würzige Riesengarnelen, soviel Sie schaffen — mit Brot-Mix, drei hausgemachten Dips und Salatteller mit Sylter-Dressing. Anmeldung und Anzahlung erforderlich.",
        price: "32,50 €",
        unit: "pro Person",
      },
      {
        cadence: "Jeden Donnerstag ab 20 Uhr",
        title: "Caipi-Donnerstag",
        description:
          "Unser Klassiker aus Cachaça, Limetten und Rohrzucker — donnerstags zum Sonderpreis.",
        price: "5,00 €",
        unit: "pro Caipirinha",
      },
      {
        cadence: "Wochenkarte",
        title: "Große frische Scholle",
        description:
          "In Butter gebraten, serviert mit Zitrone und Gurkensalat — wahlweise mit hausgemachtem Kartoffelsalat oder Röstkartoffeln. Dazu: echte holländische Matjesfilets ab 14,50 €.",
        price: "23,50 €",
        unit: "",
      },
    ],
    barEyebrow: "Aus der Bar",
    bar: [
      {
        name: "Uptown Colada",
        price: "9,00 €",
        description:
          "Ein sahniger Cocos-Traum mit einer Top-Secret-Rezeptur — das Original gibt es nur hier.",
      },
      {
        name: "Caipirinha",
        price: "6,50 €",
        description: "Cachaça, Limetten und Rohrzucker. Donnerstags ab 20 Uhr für 5,00 €.",
      },
      {
        name: "Vom Fass",
        price: "ab 3,50 €",
        description:
          "Duckstein, Grevensteiner, Holsten Pilsener und Erdinger Weizen — frisch gezapft.",
      },
    ],
    footnote: [
      { text: "Scampi „satt“ nur mit Vorkasse" },
      { text: "Keine Gutschein-Einlösung bei Sonder-Aktionen" },
      { text: "Kein Doggy Bag bei „All you can eat“" },
      { text: "Termine und Anmeldung: 0451 / 707 95 65" },
    ],
  },
  contact: {
    heading: "Kontakt &\nReservierung",
    reserveEyebrow: "Tisch reservieren — rufen Sie uns an",
    reserveLinkLabel: "Zur Reservierungsseite",
    infoItems: [
      { text: "Telefonisch erreichbar ab 15 Uhr" },
      { text: "Feiern & Seminare bis 60 Personen" },
    ],
    hoursHeading: "Öffnungszeiten",
    mapCtaLabel: "Route planen",
  },
  reservation: {
    eyebrow: "Ihr Tisch im Uptown",
    heading: "Reservierung",
    text: "Für Tischreservierungen rufen Sie uns bitte an — wir sind telefonisch ab 15 Uhr erreichbar. Auch Taufen, Hochzeiten, Konfirmationen, Weihnachts- und Geburtstagsfeiern sowie Seminare richten wir für Sie aus: im Haus bis 60 Personen, außer Haus mit Lieferung bis 50. Wir freuen uns auf Ihren Besuch.",
    reserveEyebrow: "Restaurant — rufen Sie uns an",
    imageSrc: "/images/story-arch.jpg",
    imageAlt: "Der burgunderrote Torbogen im UPTOWN mit kerzenbeleuchteten Tischen",
  },
};
