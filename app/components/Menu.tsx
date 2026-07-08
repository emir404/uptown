"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MENU, FULL_MENU_URL, type MenuItem } from "../data/menu";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

function priceLabel(item: MenuItem): string {
  return item.sizes
    ? item.sizes.map((s) => `${s.label} ${s.price} €`).join(" · ")
    : `${item.price} €`;
}

export function Menu() {
  const reducedMotion = useReducedMotionSafe();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

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

      {/* Category accordion — one category open at a time */}
      <div className="mt-12 border-t border-border lg:mt-16">
        {MENU.map((category, ci) => {
          const open = openIndex === ci;
          const buttonId = `${idPrefix}-menu-button-${ci}`;
          const panelId = `${idPrefix}-menu-panel-${ci}`;
          return (
            <motion.div
              key={category.title}
              className="border-b border-border"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.04 * ci, ease: EASE }}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : ci)}
                  className="group flex min-h-14 w-full items-center gap-4 py-6 text-left sm:gap-6"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span
                      className={`font-serif leading-[1.1] text-[clamp(24px,3vw,34px)] transition-colors duration-300 ${
                        open ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {category.title}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[13px]">
                      {category.en}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-[13px] font-semibold uppercase tracking-[0.12em] tabular-nums text-muted sm:inline">
                    {category.items.length}{" "}
                    {category.items.length === 1 ? "Gericht" : "Gerichte"}
                  </span>
                  <motion.span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-[15px] text-foreground"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.45, ease: EASE }
                    }
                  >
                    ↓
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            height: { duration: 0.55, ease: EASE },
                            opacity: { duration: 0.35, ease: EASE },
                          }
                    }
                  >
                    {/* padding lives on the inner div so the height
                        animation collapses cleanly */}
                    <div className="pb-10">
                      {category.note && (
                        <p className="max-w-[60ch] text-[14px] font-medium italic leading-[1.5] text-muted">
                          {category.note}
                        </p>
                      )}
                      <ul
                        className={`grid gap-x-16 gap-y-5 lg:grid-cols-2 ${
                          category.note ? "mt-6" : ""
                        }`}
                      >
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
                              <span className="shrink-0 text-right font-semibold tabular-nums text-[16px] text-accent sm:text-[17px]">
                                {priceLabel(item)}
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-12">
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
