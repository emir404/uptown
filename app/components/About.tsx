"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=UPTOWN+Restaurant+Kronsforder+Allee+3a+23560+L%C3%BCbeck";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoLargeY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoSmallY = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:gap-20">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <TextLineReveal
            as="h2"
            lines={["Feuer, Rauch", "und Zeit."]}
            className="font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(40px,5.5vw,56px)]"
          />

          <Reveal delay={0.15} className="mt-10 max-w-[420px]">
            <p className="text-[16px] font-medium leading-[1.6] text-foreground/90">
              Seit 2007 steht das UPTOWN Restaurant &amp; Bistro in Lübeck für
              Fleisch, das seine Zeit bekommt: bester Schnitt vom
              argentinischen Rumpsteak, fein mariniert und gut abgehangen.
              Dazu Smoke-Town-Ribs aus dem Smoker, Bison-Burger und
              hausgemachte BBQ-Saucen — serviert mit Toscana-Kartoffeln und
              frischer Salatbeilage.
            </p>
            <p className="mt-5 text-[16px] font-medium leading-[1.6] text-foreground/90">
              Sie finden uns in unmittelbarer Nähe vom Mühlentorteller. An der
              Bar warten Caipirinha, Long Island Ice Tea und eine gepflegte
              Weinauswahl; Feiern und Seminare richten wir bis 60 Personen
              aus, außer Haus liefern wir bis 50. We speak English.
            </p>
          </Reveal>

          {/* Owners' word */}
          <motion.figure
            className="relative mt-12 w-full max-w-[420px] bg-surface p-8 pb-10"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 48, scale: reducedMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 left-4 select-none font-serif text-[96px] leading-none text-accent/80"
            >
              „
            </span>
            <blockquote className="relative mt-6 font-serif text-[24px] leading-[1.35] text-foreground">
              Gutes Fleisch braucht Zeit — am Grill, im Smoker und am Tisch.
              Wir freuen uns auf Ihren Besuch.
            </blockquote>
            <figcaption className="relative mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
              Peter Witt &amp; Ulf Bierbaum · Gastgeber
            </figcaption>
          </motion.figure>

          <Reveal delay={0.2} className="mt-10">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 font-semibold text-[16px] tracking-[-0.16px] text-foreground"
            >
              AUF GOOGLE MAPS FINDEN
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Photo column */}
        <div className="relative">
          <motion.div
            className="relative aspect-[593/777] w-full max-w-[594px] overflow-clip lg:ml-auto"
            style={reducedMotion ? undefined : { y: photoLargeY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <Image
                src="/images/about-1.jpg"
                alt="Kerzenbeleuchtete Sitzecke mit Lederbank im UPTOWN"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-16 mr-auto aspect-[487/303] w-[78%] max-w-[487px] overflow-clip shadow-2xl lg:absolute lg:-left-24 lg:bottom-6 lg:mt-0 lg:w-[68%]"
            style={reducedMotion ? undefined : { y: photoSmallY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            >
              <Image
                src="/images/about-2.jpg"
                alt="Argentinisches Rumpsteak, medium-rare aufgeschnitten, mit Kräuterbutter"
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
