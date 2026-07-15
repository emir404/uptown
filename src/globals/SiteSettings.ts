import type { GlobalConfig } from "payload";

/** Shared site data: address, hours, contact — used in Hero, Contact and Footer. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Einstellungen",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phillipEnabled",
      label: "Phillip (Website-Assistent) anzeigen",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Schaltet den Chat-Assistenten unten rechts auf der Website ein oder aus. " +
          "Die Änderung greift innerhalb von etwa einer Minute.",
      },
    },
    {
      type: "group",
      name: "meta",
      label: "SEO & Metadaten",
      fields: [
        { name: "title", label: "Seitentitel", type: "text", required: true },
        {
          name: "description",
          label: "Beschreibung",
          type: "textarea",
          required: true,
        },
        {
          name: "siteUrl",
          label: "Adresse der Website (für Social-Media-Vorschau)",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "contact",
      label: "Kontakt",
      fields: [
        { name: "name", label: "Name des Lokals", type: "text", required: true },
        {
          name: "subtitle",
          label: "Untertitel (z.B. Restaurant & Bistro)",
          type: "text",
          required: true,
        },
        { name: "since", label: "Seit (z.B. seit 2007)", type: "text", required: true },
        { name: "street", label: "Straße", type: "text", required: true },
        { name: "city", label: "PLZ & Ort", type: "text", required: true },
        {
          name: "cityNote",
          label: "Zusatz zur Lage (z.B. Nahe Mühlentorteller)",
          type: "text",
        },
        {
          name: "phoneDisplay",
          label: "Telefon (Anzeige, z.B. 0451 / 707 95 65)",
          type: "text",
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Telefon (wählbar, z.B. +494517079565)",
          type: "text",
          required: true,
        },
        {
          name: "phoneNote",
          label: "Hinweis zur Erreichbarkeit",
          type: "text",
          required: true,
        },
        { name: "email", label: "E-Mail", type: "text", required: true },
        {
          name: "legalName",
          label: "Firmierung (Footer-Copyright)",
          type: "text",
          required: true,
        },
        {
          name: "mapsEmbedSrc",
          label: "Google Maps Embed-URL (Karte)",
          type: "text",
          required: true,
        },
        {
          name: "mapsLink",
          label: "Google Maps Link (Route planen)",
          type: "text",
          required: true,
        },
        {
          name: "fullMenuUrl",
          label: "Link „Wochenkarte & Aktuelles“",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "hours",
      label: "Öffnungszeiten",
      type: "array",
      minRows: 7,
      maxRows: 7,
      labels: { singular: "Tag", plural: "Tage" },
      admin: {
        description:
          "Ein Eintrag pro Wochentag, beginnend mit Montag. „Von“ und „Bis“ leer lassen = " +
          "Ruhetag. Sie steuern nur die Anzeige „Jetzt geöffnet“ — angezeigt wird immer der Text unter „Zeiten“.",
      },
      fields: [
        { name: "day", label: "Tag", type: "text", required: true },
        {
          name: "time",
          label: "Zeiten (angezeigter Text, z.B. „16:00 – 21:00“)",
          type: "text",
          required: true,
        },
        { name: "openFrom", label: "Von (HH:MM, leer = Ruhetag)", type: "text" },
        {
          name: "openUntil",
          label: "Bis (HH:MM, „24:00“ für Open End)",
          type: "text",
        },
      ],
    },
    {
      name: "hoursSummary",
      label: "Öffnungszeiten — Kurzfassung (Footer)",
      type: "array",
      minRows: 1,
      labels: { singular: "Zeile", plural: "Zeilen" },
      fields: [
        { name: "days", label: "Tage", type: "text", required: true },
        { name: "time", label: "Zeiten", type: "text", required: true },
      ],
    },
    {
      name: "kitchenNote",
      label: "Hinweis unter den Öffnungszeiten (Küche)",
      type: "textarea",
      required: true,
    },
    {
      name: "marquee",
      label: "Laufschrift (Footer)",
      type: "array",
      minRows: 1,
      labels: { singular: "Begriff", plural: "Begriffe" },
      admin: {
        description: "Wird endlos wiederholt, getrennt durch das goldene Rauten-Zeichen.",
      },
      fields: [{ name: "text", label: "Begriff", type: "text", required: true }],
    },
    {
      name: "marqueeSrLabel",
      label: "Laufschrift — Text für Screenreader",
      type: "text",
      required: true,
    },
  ],
};
