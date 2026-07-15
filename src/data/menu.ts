// UPTOWN Restaurant & Bistro — full menu, transcribed verbatim from the
// knowledge base (knowledge-base/data/food-menu.json, sourced from the
// current placemat "2 TISCHSET Innenseite . 2026"). Prices in EUR.
// Do not invent items or prices — the KB is the single source of truth.

export type MenuItem = {
  name: string;
  description?: string;
  /** Single price, e.g. "21,50". Omitted when `sizes` is present. */
  price?: string;
  /** Portion variants, e.g. steaks in 250 g / 500 g. */
  sizes?: { label: string; price: string }[];
};

export type MenuCategory = {
  title: string;
  en: string;
  /** Optional intro line shown under the category header. */
  note?: string;
  items: MenuItem[];
};

export const FULL_MENU_URL = "https://www.uptown-restaurant.de";

export const MENU: MenuCategory[] = [
  {
    title: "Vorspeisen & Salate",
    en: "Starters & Salads",
    items: [
      {
        name: "Soljanka",
        price: "6,50",
        description:
          "Kräftige, leicht säuerlich-würzige Suppe mit Fleisch, Rauchwurst, Gurke und Kraut",
      },
      {
        name: "Oliven-Mix",
        price: "6,50",
        description: "Die schmackhaftesten Mittelmeer-Oliven",
      },
      { name: "Knobi-Kräuterbrot", price: "5,00" },
      {
        name: "Bruschetta Royal",
        price: "6,50",
        description:
          "Gebackenes Baguette mit Tomaten-Kräuter-Mix und Mozzarella-Würfeln mit Sour Cream",
      },
      {
        name: "Nuss-Camembert",
        price: "13,50",
        description:
          "In Nuss-Brotpanierung gebacken, mit Preiselbeeren, Brot und Salatgarnitur",
      },
      {
        name: "Gryllefjorder Lachs",
        price: "14,50",
        description:
          "Mild geräucherter Norweger-Lachs auf Kartoffelpuffer mit Sahne-Schmand und Kaviar",
      },
      {
        name: "Scampi Louisiana",
        price: "14,50",
        description:
          "Würzig gebratene Garnelen in feuriger Cajun-Rahmsauce mit Gemüse-Julienne und Baguette",
      },
      {
        name: "„Uptown“ Caesar Salat",
        price: "13,50",
        description:
          "Romana-Salat mit Caesar-Dressing, Ei, sonnengetrockneten Tomaten, Knoblauch-Croûtons und Reggiano-Parmesan · mit Hähnchenbrust +6,50 · mit Rindfleischstreifen +7,50",
      },
      {
        name: "Uptown Salat-Mix",
        sizes: [
          { label: "klein", price: "7,00" },
          { label: "groß", price: "9,50" },
        ],
        description:
          "Frischer Salat-Mix der Saison mit Dressing nach Wahl: Balsamico-Vinaigrette, American oder Essig & Öl",
      },
    ],
  },
  {
    title: "Smoke-Town-Ribs & BBQ",
    en: "From the Smoker",
    items: [
      {
        name: "Smoke-Town-Ribs",
        price: "21,50",
        description:
          "Sweet-Hawaii oder würzig-scharf — lange, marinierte Räucherrippen (ca. 650 g), mit Cole Slaw, Honey-Baked-Beans und Ofenkartoffel mit Sour Cream",
      },
      {
        name: "Smoke-Town-Ribs „satt“",
        price: "23,50",
        description: "„All you can eat“ — jeden Freitag und Samstag",
      },
      {
        name: "Chicken & Ribs",
        price: "21,50",
        description:
          "Marinierte Hähnchenschenkel mit Rückenstück und Räucherrippen in hausgemachten BBQ-Saucen, mit Cole Slaw, Honey-Baked-Beans und Pommes",
      },
      {
        name: "BBQ-Chicken-Honey-Chili",
        price: "21,50",
        description:
          "Marinierte Hähnchenschenkel mit Rückenstück (650 g) in würziger, hausgemachter Honig-Chili-BBQ-Sauce, mit Cole Slaw, Honey-Baked-Beans und Pommes",
      },
      {
        name: "Pulled Pork Pie",
        price: "19,50",
        description:
          "Original Pulled Pork, im Smoker gegart — mit Blätterteighaube, Cole Slaw, Honey-Baked-Beans und Kartoffelspalten mit Sour Cream",
      },
    ],
  },
  {
    title: "Steaks vom Grill",
    en: "NY-Strip-Steak",
    note: "Bester Schnitt vom argentinischen Rumpsteak, fein mariniert und gut abgehangen — serviert mit Toscana-Kartoffeln und frischer Salatbeilage.",
    items: [
      {
        name: "Arizona",
        sizes: [
          { label: "250 g", price: "23,50" },
          { label: "500 g", price: "32,50" },
        ],
        description: "Mit würziger, hausgemachter Arizona-Steakbutter",
      },
      {
        name: "Madagaskar",
        sizes: [
          { label: "250 g", price: "23,50" },
          { label: "500 g", price: "32,50" },
        ],
        description: "Mit feuriger, mit Rum verfeinerter Pfeffersauce",
      },
      {
        name: "Valentino",
        sizes: [
          { label: "250 g", price: "24,00" },
          { label: "500 g", price: "34,50" },
        ],
        description: "Mit frischen, in Butter gebratenen Pilzen und Zwiebeln",
      },
      {
        name: "Surf and Turf",
        sizes: [
          { label: "250 g", price: "27,50" },
          { label: "500 g", price: "37,50" },
        ],
        description: "Mit in Limonen-Butter gebratenen Garnelen",
      },
      {
        name: "Bison-Burger",
        sizes: [
          { label: "180 g", price: "17,50" },
          { label: "360 g", price: "21,50" },
        ],
        description:
          "Rustikales Burger-Bun mit Salsa-Majo, Salat, Tomate, Gurke, Speck, karamellisierten Zwiebeln, Guacamole, Cheddar und BBQ-Burger-Sauce, mit gegrilltem Bisonfleisch, dazu Pommes",
      },
      {
        name: "Uptown-Grill-Teller",
        price: "26,50",
        description:
          "350 g Fleisch — Rumpsteak, Hähnchenbrust, Schweinesteak, Speck und Räucherrippe auf frischem Chiligemüse und Toscana-Kartoffeln, mit Tobago-Sauce",
      },
    ],
  },
  {
    title: "Hauptgerichte",
    en: "Mains",
    items: [
      {
        name: "Schweinemedaillon le Havre",
        price: "18,50",
        description:
          "Auf frischen Gemüsestreifen mit leichter Estragon-Sahnesauce und Kartoffelgratin aus heimischen und Süßkartoffeln",
      },
      {
        name: "Limonen-Hähnchen",
        price: "16,50",
        description:
          "In Limonen-Pfeffer marinierte Hähnchenbrust mit leichter Limonen-Buttersauce auf Zucchinigemüse und Reis",
      },
      {
        name: "Gourmet-Schnitzel",
        price: "18,50",
        description:
          "Zwei Schweinerücken-Schnitzel, leicht paniert, mit Trüffelbutter, Steinpilz-Sauce und Kartoffelgratin",
      },
      {
        name: "Spinach Heaven",
        price: "15,50",
        description:
          "Frischer Blattspinat in Knoblauch-Rahmsauce, mit Käse überbacken, dazu Knobi-Kräuterbrot",
      },
      {
        name: "Afrikanischer Erdnusstopf",
        price: "17,50",
        description:
          "Schweinefiletstreifen mit Gemüsewürfeln in Tomaten-Erdnuss-Sauce, mit Kardamom verfeinert, dazu Dampfreis",
      },
      {
        name: "Toscana-Gemüse-Topf",
        price: "14,50",
        description:
          "Frischer Gemüse-Mix, leicht tomatisiert und mit Kräutern verfeinert, mit Toscana-Kartoffeln · mit Hähnchenbruststreifen +6,50",
      },
    ],
  },
  {
    title: "Nachos & Pasta",
    en: "Nachos & Pasta",
    items: [
      {
        name: "Nachos Classico",
        price: "12,50",
        description:
          "Gebackene Tortilla-Chips mit mexikanischem Gemüsemix, mit Käse überbacken, dazu Salsa und Sour Cream · mit Thunfisch, Zwiebeln, Oliven, Peperoni +4,50 · mit Hähnchenbrust +6,50 · mit Rindfleisch +7,50",
      },
      {
        name: "Spaghetti-Pesto",
        price: "13,50",
        description:
          "Mit grünem Pesto aus Parmesan, Nusskernen, frischen Kräutern, Knoblauch und Olivenöl",
      },
      {
        name: "Spaghetti Scampi Lafayet",
        price: "19,50",
        description:
          "Sautierte Garnelen mit Gemüse-Julienne in würziger Langusten-Cajun-Rahmsauce, mit frischem Parmesan",
      },
    ],
  },
  {
    title: "Desserts",
    en: "Desserts",
    items: [
      {
        name: "Gemischtes Eis",
        price: "4,50",
        description:
          "3 Kugeln Eis und Waffel · mit Sahne +0,50 · mit Erdbeer-, Karamell- oder Schokosauce +1,00 · mit Eierlikör +2,00",
      },
      {
        name: "Apfel-Cranberry-Karamell-Crumble",
        price: "6,50",
        description:
          "Mit Streuseln überbackene Äpfel und Cranberry-Stücke, mit Karamellsauce verfeinert und hausgemachtem Mandel-Honig-Eis",
      },
    ],
  },
];
