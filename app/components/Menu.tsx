"use client";

import { motion } from "motion/react";
import { MENU, FULL_MENU_URL } from "../data/menu";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

export function Menu() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="speisekarte"
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal y={16}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
              Speisekarte
            </p>
          </Reveal>
          <TextLineReveal
            as="h2"
            lines={["Vom Grill,", "aus dem Smoker."]}
            className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(34px,5vw,52px)]"
          />
        </div>
        <Reveal delay={0.1} className="hidden sm:block">
          <a
            href={FULL_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 font-semibold text-[15px] tracking-[-0.15px] text-foreground"
          >
            WOCHENKARTE &amp; AKTUELLES
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-16 gap-y-12 lg:mt-20 lg:grid-cols-2">
        {MENU.map((category, ci) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: (ci % 2) * 0.1, ease: EASE }}
          >
            <div className="flex items-baseline gap-3 border-b border-border pb-4">
              <h3 className="font-serif text-[26px] leading-none text-foreground">
                {category.title}
              </h3>
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                {category.en}
              </span>
            </div>

            {category.note && (
              <p className="mt-4 max-w-[52ch] text-[14px] font-medium italic leading-[1.5] text-muted">
                {category.note}
              </p>
            )}

            <ul className="mt-6 flex flex-col gap-5">
              {category.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold text-[17px] tracking-[-0.17px] text-foreground">
                      {item.name}
                    </span>
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-foreground/25"
                    />
                    <span className="shrink-0 font-semibold tabular-nums text-[17px] text-accent">
                      {item.sizes
                        ? item.sizes
                            .map((s) => `${s.label} ${s.price} €`)
                            .join(" · ")
                        : `${item.price} €`}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-1 max-w-[44ch] text-[14px] font-medium leading-[1.5] text-muted">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14">
        <p className="max-w-[72ch] text-[14px] font-medium leading-[1.6] text-muted">
          Jede Änderung berechnen wir mit 1,50 € · Halbe Portion 2/3 des
          Preises · Gerichte teilen oder extra Gedeck 2,00 € · Eine Liste der
          enthaltenen Allergene und Zusatzstoffe liegt für Sie bereit — bitte
          fragen Sie unser Personal.
        </p>
        <a
          href={FULL_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex min-h-11 items-center gap-3 font-semibold text-[15px] tracking-[-0.15px] text-foreground sm:hidden"
        >
          WOCHENKARTE &amp; AKTUELLES
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
