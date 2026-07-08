"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Diamond, GoldFrame, SkylineFrieze } from "./Brand";
import {
  Reveal,
  Stagger,
  StaggerItem,
  TextLineReveal,
  EASE,
  useReducedMotionSafe,
} from "./Reveal";
import {
  HOURS,
  DISPLAY_ORDER,
  KITCHEN_NOTE,
  useOpenState,
} from "../data/openingHours";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=UPTOWN+Restaurant+Kronsforder+Allee+3a+23560+L%C3%BCbeck";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const openState = useOpenState();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      id="kontakt"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[140px]"
    >
      {/* Ghost heading */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -right-[2vw] top-8 select-none font-semibold uppercase leading-none tracking-[-0.02em] text-transparent text-[clamp(120px,22vw,340px)]"
        style={{
          WebkitTextStroke: "1.5px color-mix(in oklab, var(--foreground) 8%, transparent)",
          y: reducedMotion ? 0 : ghostY,
        }}
      >
        Kontakt
      </motion.p>

      <div className="relative">
        <TextLineReveal
          as="h2"
          lines={["Kontakt &", "Reservierung"]}
          className="font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-foreground text-[clamp(36px,5vw,48px)]"
        />

        {/* Giant dial-to-reserve headline */}
        <div className="mt-16 lg:mt-24">
          <Reveal y={24}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/50 sm:text-[14px]">
              Tisch reservieren — rufen Sie uns an
            </p>
          </Reveal>
          <motion.span
            className="mt-3 block overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.a
              href="tel:+494517079565"
              className="group block w-fit max-w-full"
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { y: "105%" },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1.1, delay: 0.1, ease: EASE },
                },
              }}
            >
              <span className="block whitespace-nowrap font-serif tabular-nums leading-[1.05] text-foreground transition-colors duration-500 group-hover:text-accent text-[clamp(32px,10vw,118px)] lg:text-[clamp(40px,8vw,118px)]">
                0451&nbsp;707&nbsp;95&nbsp;65
              </span>
              <span
                aria-hidden
                className="mt-2 block h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </motion.a>
          </motion.span>

          <Reveal delay={0.1} className="mt-6">
            <Link
              href="/reservierung"
              className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.1em] text-accent sm:min-h-0"
            >
              Zur Reservierungsseite
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </Reveal>

          <Stagger
            className="mt-8 flex flex-col gap-x-10 gap-y-3 text-[15px] font-medium text-foreground/70 sm:flex-row sm:items-center sm:text-[16px]"
            stagger={0.1}
          >
            <StaggerItem y={16}>
              <span>Telefonisch erreichbar ab 15 Uhr</span>
            </StaggerItem>
            <StaggerItem y={16}>
              <span className="hidden sm:inline" aria-hidden>
                <Diamond className="text-gold/80" />
              </span>
            </StaggerItem>
            <StaggerItem y={16}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 decoration-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
              >
                Kronsforder Allee 3a, 23560 Lübeck
              </a>
            </StaggerItem>
            <StaggerItem y={16}>
              <span className="hidden sm:inline" aria-hidden>
                <Diamond className="text-gold/80" />
              </span>
            </StaggerItem>
            <StaggerItem y={16}>
              <span>Feiern &amp; Seminare bis 60 Personen</span>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Departure-board opening hours */}
        <div id="oeffnungszeiten" className="mt-20 lg:mt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <h3 className="font-semibold uppercase text-[20px] tracking-[0.08em] text-foreground">
                Öffnungszeiten
              </h3>
            </Reveal>
            {openState && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`flex items-center gap-2.5 border px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] ${
                  openState.isOpen
                    ? "border-accent/40 text-accent"
                    : "border-foreground/20 text-foreground/50"
                }`}
              >
                <span
                  aria-hidden
                  className={`inline-block h-2 w-2 rounded-full ${
                    openState.isOpen ? "animate-pulse bg-accent" : "bg-foreground/40"
                  }`}
                />
                {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
              </motion.p>
            )}
          </div>

          <div className="mt-8 [perspective:900px]">
            {DISPLAY_ORDER.map((dayIndex, i) => {
              const { day, time } = HOURS[dayIndex];
              const isToday = openState?.day === dayIndex;
              const isClosed = HOURS[dayIndex].open === null;
              return (
                <motion.div
                  key={day}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotateX: -70, y: 24 }
                  }
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className={`relative flex items-baseline justify-between gap-4 border-b border-foreground/10 px-4 py-4 [transform-origin:top] sm:px-6 ${
                    isToday ? "bg-surface" : ""
                  }`}
                >
                  {isToday && (
                    <motion.span
                      aria-hidden
                      className="absolute bottom-0 left-0 top-0 w-1 bg-accent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="flex items-baseline gap-3 text-[16px] font-semibold uppercase tracking-[0.1em] text-foreground">
                    {day}
                    {isToday && (
                      <span className="text-[11px] font-semibold tracking-[0.16em] text-accent">
                        Heute
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[16px] font-medium tabular-nums tracking-[0.06em] ${
                      isClosed ? "text-foreground/40" : "text-foreground/90"
                    }`}
                  >
                    {time}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={0.2} className="mt-6">
            <p className="text-[14px] font-medium text-foreground/60">
              {KITCHEN_NOTE}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Map with floating card */}
      <div className="relative mt-16 lg:mt-24">
        <Reveal className="mb-12 flex justify-center lg:mb-16">
          <SkylineFrieze className="h-9 w-[min(100%,520px)] text-gold/40" />
        </Reveal>
        <Reveal y={60} amount={0.15}>
          <div className="relative aspect-[4/3] w-full overflow-clip sm:aspect-[16/9] lg:aspect-[21/9]">
            <iframe
              src="https://maps.google.com/maps?q=Kronsforder%20Allee%203a%2C%2023560%20L%C3%BCbeck&z=15&output=embed"
              title="UPTOWN Restaurant auf Google Maps – Kronsforder Allee 3a, 23560 Lübeck"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] contrast-[0.95]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <motion.div
          className="relative -mt-8 ml-4 mr-4 bg-surface p-6 shadow-2xl sm:absolute sm:bottom-8 sm:left-8 sm:ml-0 sm:mr-0 sm:mt-0 sm:max-w-[360px]"
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 60,
            x: reducedMotion ? 0 : -24,
          }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.2 }}
        >
          <GoldFrame />
          <p className="font-serif text-[17px] uppercase tracking-[0.16em] text-foreground">
            Uptown
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
            Restaurant &amp; Bistro
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-[15px] font-medium leading-[1.6] text-foreground/80 underline decoration-1 decoration-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
          >
            Kronsforder Allee 3a
            <br />
            23560 Lübeck · Nahe Mühlentorteller
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.1em] text-accent sm:min-h-0"
          >
            Route planen
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
