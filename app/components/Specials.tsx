"use client";

import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

// Recurring specials, verbatim from the UPTOWN knowledge base
// (04-specials-and-promotions.md). Prices in EUR.
const SPECIALS = [
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
];

// Bar highlights, verbatim from the drinks placemat (03-drinks-menu.md).
const BAR_HIGHLIGHTS = [
  {
    name: "Uptown Colada",
    price: "9,00 €",
    description:
      "Ein sahniger Cocos-Traum mit einer Top-Secret-Rezeptur — das Original gibt es nur hier.",
  },
  {
    name: "Caipirinha",
    price: "6,50 €",
    description:
      "Cachaça, Limetten und Rohrzucker. Donnerstags ab 20 Uhr für 5,00 €.",
  },
  {
    name: "Vom Fass",
    price: "ab 3,50 €",
    description:
      "Duckstein, Grevensteiner, Holsten Pilsener und Erdinger Weizen — frisch gezapft.",
  },
];

export function Specials() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="aktionen"
      className="theme-wine relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="max-w-[560px]">
        <Reveal y={16}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
            Aktionen
          </p>
        </Reveal>
        <TextLineReveal
          as="h2"
          lines={["Die Rituale", "des Hauses."]}
          className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(34px,5vw,52px)]"
        />
      </div>

      <div className="mt-12 lg:mt-16">
        {SPECIALS.map((special, i) => (
          <motion.article
            key={special.title}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: EASE }}
            className="grid gap-3 border-b border-border py-8 first:border-t lg:grid-cols-[240px_minmax(0,1fr)_auto] lg:items-baseline lg:gap-10"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
              {special.cadence}
            </p>
            <div>
              <h3 className="font-serif text-[26px] leading-[1.15] text-foreground sm:text-[30px]">
                {special.title}
              </h3>
              <p className="mt-2 max-w-[62ch] text-[15px] font-medium leading-[1.6] text-muted">
                {special.description}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="font-serif tabular-nums text-[26px] leading-none text-foreground sm:text-[30px]">
                {special.price}
              </p>
              {special.unit && (
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {special.unit}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Aus der Bar — verbatim from the drinks placemat
          (knowledge-base/03-drinks-menu.md) */}
      <div className="mt-16 border-t border-border pt-10 lg:mt-20">
        <Reveal y={16}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
            Aus der Bar
          </p>
        </Reveal>
        <div className="mt-6 grid gap-8 sm:grid-cols-3 lg:gap-12">
          {BAR_HIGHLIGHTS.map((drink, i) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-[21px] leading-[1.2] text-foreground sm:text-[23px]">
                  {drink.name}
                </h3>
                <p className="shrink-0 font-serif tabular-nums text-[20px] leading-none text-foreground">
                  {drink.price}
                </p>
              </div>
              <p className="mt-2 max-w-[36ch] text-[14px] font-medium leading-[1.55] text-muted">
                {drink.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal delay={0.15} className="mt-10">
        <p className="max-w-[72ch] text-[13px] font-medium leading-[1.6] text-muted">
          Scampi „satt“ nur mit Vorkasse · Keine Gutschein-Einlösung bei
          Sonder-Aktionen · Kein Doggy Bag bei „All you can eat“ · Termine und
          Anmeldung: 0451 / 707 95 65
        </p>
      </Reveal>
    </section>
  );
}
