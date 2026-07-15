import type { GlobalConfig } from "payload";

/** All editable content of the homepage, grouped by section. */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Startseite",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            {
              name: "image",
              label: "Hintergrundbild",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "reserveLabel",
              label: "Button-Text (Tisch reservieren)",
              type: "text",
              required: true,
            },
            {
              name: "columns",
              label: "Info-Zeile unten (max. 3)",
              type: "array",
              maxRows: 3,
              admin: {
                description:
                  "Die mittlere Zeile wird automatisch mit der Adresse aus den Einstellungen verlinkt.",
              },
              fields: [{ name: "text", label: "Text", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Galerie",
          name: "gallery",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text", required: true },
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            { name: "text", label: "Text", type: "textarea", required: true },
            {
              name: "images",
              label: "Bilder (max. 9)",
              type: "array",
              maxRows: 9,
              admin: {
                description:
                  "Die Collage-Anordnung ist Teil des Designs und richtet sich nach der " +
                  "Reihenfolge — das erste Bild ist das große oben. Bildunterschrift ist optional.",
              },
              fields: [
                {
                  name: "image",
                  label: "Bild",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                { name: "caption", label: "Bildunterschrift", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Über uns",
          name: "story",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text", required: true },
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "chapters",
              label: "Kapitel (max. 3)",
              type: "array",
              maxRows: 3,
              labels: { singular: "Kapitel", plural: "Kapitel" },
              fields: [
                { name: "kicker", label: "Überzeile", type: "text", required: true },
                {
                  name: "heading",
                  label: "Überschrift (Zeilenumbruch per Enter)",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "paragraphs",
                  label: "Absätze",
                  type: "array",
                  minRows: 1,
                  fields: [{ name: "text", label: "Text", type: "textarea", required: true }],
                },
                {
                  name: "image",
                  label: "Bild",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
            {
              type: "group",
              name: "quote",
              label: "Zitat (am letzten Kapitel)",
              fields: [
                { name: "text", label: "Zitat", type: "textarea", required: true },
                { name: "author", label: "Unterzeile", type: "text", required: true },
              ],
            },
            {
              name: "ctaLabel",
              label: "Button-Text (Google Maps)",
              type: "text",
              required: true,
            },
          ],
        },
        {
          label: "Speisekarte",
          name: "menu",
          admin: {
            description: "Die Gerichte selbst stehen im globalen Dokument „Speisekarte“.",
          },
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text", required: true },
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "ctaLabel",
              label: "Button-Text (Wochenkarte)",
              type: "text",
              required: true,
            },
          ],
        },
        {
          label: "Aktionen",
          name: "specials",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text", required: true },
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "items",
              label: "Aktionen",
              type: "array",
              minRows: 1,
              labels: { singular: "Aktion", plural: "Aktionen" },
              fields: [
                {
                  name: "cadence",
                  label: "Rhythmus (z.B. Jeden Freitag & Samstag)",
                  type: "text",
                  required: true,
                },
                { name: "title", label: "Titel", type: "text", required: true },
                {
                  name: "description",
                  label: "Beschreibung",
                  type: "textarea",
                  required: true,
                },
                { name: "price", label: "Preis (z.B. 23,50 €)", type: "text", required: true },
                { name: "unit", label: "Einheit (z.B. pro Person)", type: "text" },
              ],
            },
            { name: "barEyebrow", label: "Überzeile „Aus der Bar“", type: "text", required: true },
            {
              name: "bar",
              label: "Bar-Highlights (max. 3)",
              type: "array",
              maxRows: 3,
              labels: { singular: "Getränk", plural: "Getränke" },
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "price", label: "Preis (z.B. 9,00 €)", type: "text", required: true },
                {
                  name: "description",
                  label: "Beschreibung",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "footnote",
              label: "Fußnote (Hinweise, „·“ trennt die Teile)",
              type: "array",
              minRows: 1,
              labels: { singular: "Hinweis", plural: "Hinweise" },
              fields: [{ name: "text", label: "Hinweis", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Kontakt",
          name: "contact",
          fields: [
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "reserveEyebrow",
              label: "Überzeile über der Telefonnummer",
              type: "text",
              required: true,
            },
            {
              name: "reserveLinkLabel",
              label: "Link-Text zur Reservierungsseite",
              type: "text",
              required: true,
            },
            {
              name: "infoItems",
              label: "Zeile unter der Telefonnummer (max. 4)",
              type: "array",
              maxRows: 4,
              admin: {
                description:
                  "Die Adresse steht automatisch dazwischen — hier stehen nur die Zusätze.",
              },
              fields: [{ name: "text", label: "Text", type: "text", required: true }],
            },
            {
              name: "hoursHeading",
              label: "Überschrift Öffnungszeiten",
              type: "text",
              required: true,
            },
            {
              name: "mapCtaLabel",
              label: "Button-Text auf der Karte",
              type: "text",
              required: true,
            },
          ],
        },
        {
          label: "Reservierung",
          name: "reservation",
          admin: { description: "Die eigene Seite unter /reservierung." },
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text", required: true },
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            { name: "text", label: "Text", type: "textarea", required: true },
            {
              name: "reserveEyebrow",
              label: "Überzeile über der Telefonnummer",
              type: "text",
              required: true,
            },
            {
              name: "image",
              label: "Bild",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
