import type { GlobalConfig } from "payload";

/** The full menu behind the „Speisekarte“ accordion on the homepage. */
export const Speisekarte: GlobalConfig = {
  slug: "speisekarte",
  label: "Speisekarte",
  access: {
    read: () => true,
  },
  admin: {
    description:
      "Die Karte, die auf der Startseite aufgeklappt wird. Kategorien und Gerichte " +
      "lassen sich per Drag & Drop umsortieren.",
  },
  fields: [
    {
      name: "sections",
      label: "Kategorien",
      type: "array",
      minRows: 1,
      labels: { singular: "Kategorie", plural: "Kategorien" },
      fields: [
        { name: "title", label: "Titel", type: "text", required: true },
        {
          name: "en",
          label: "Titel (englisch, kleine Zeile daneben)",
          type: "text",
          required: true,
        },
        {
          name: "note",
          label: "Hinweis unter der Kategorie",
          type: "textarea",
        },
        {
          name: "items",
          label: "Gerichte",
          type: "array",
          minRows: 1,
          labels: { singular: "Gericht", plural: "Gerichte" },
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "description",
              label: "Beschreibung",
              type: "textarea",
            },
            {
              name: "price",
              label: "Preis (ohne €, z.B. 21,50)",
              type: "text",
              admin: {
                description: "Leer lassen, wenn stattdessen Portionsgrößen angegeben sind.",
              },
            },
            {
              name: "sizes",
              label: "Portionsgrößen (statt eines einzelnen Preises)",
              type: "array",
              labels: { singular: "Größe", plural: "Größen" },
              fields: [
                { name: "label", label: "Größe (z.B. 250 g)", type: "text", required: true },
                { name: "price", label: "Preis (ohne €)", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "footnote",
      label: "Fußnote unter der Karte",
      type: "textarea",
      required: true,
    },
  ],
};
