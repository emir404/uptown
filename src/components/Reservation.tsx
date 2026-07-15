"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { GoldFrame } from "./Brand";
import { Footer } from "./Footer";
import { useOpenState } from "@/data/openingHours";
import ConsentEmbed from "./ConsentEmbed";
import type { HomeData, SiteData } from "@/lib/content";

export function Reservation({
  reservation,
  contact,
  site,
}: {
  reservation: HomeData["reservation"];
  contact: HomeData["contact"];
  site: SiteData;
}) {
  const reducedMotion = useReducedMotionSafe();
  const openState = useOpenState(site.hours);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14">
        <Link href="/" className="flex flex-col py-2">
          <span className="font-serif text-[20px] uppercase tracking-[0.18em] text-foreground">
            {site.name}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">
            {site.subtitle}
          </span>
        </Link>
        <Link
          href="/"
          className="py-2 font-semibold text-[14px] tracking-[-0.14px] text-foreground/70 transition-opacity hover:opacity-70"
        >
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="flex-1">
        {/* Intro + phone CTA */}
        <section className="px-6 pt-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-20">
            <div className="flex flex-col items-start">
              <Reveal y={16}>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
                  {reservation.eyebrow}
                </p>
              </Reveal>
              <TextLineReveal
                as="h1"
                lines={reservation.heading}
                className="mt-3 font-serif leading-[1.02] tracking-[0.01em] text-foreground text-[clamp(44px,7vw,84px)]"
              />

              <Reveal delay={0.15} className="mt-8 max-w-[460px]">
                <p className="text-[16px] font-medium leading-[1.6] text-foreground/90">
                  {reservation.text}
                </p>
              </Reveal>

              {/* Giant phone CTA */}
              <div className="mt-12 w-full">
                <Reveal y={20}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                    {reservation.reserveEyebrow}
                  </p>
                </Reveal>
                <motion.span
                  className="mt-3 block overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <motion.a
                    href={site.phoneHref}
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
                    <span className="block whitespace-nowrap font-serif tabular-nums leading-[1.05] text-foreground transition-colors duration-500 group-hover:text-accent text-[clamp(30px,9vw,64px)] lg:text-[clamp(36px,4.6vw,64px)]">
                      {site.phoneDisplay}
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 block h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                  </motion.a>
                </motion.span>

                <Reveal delay={0.15} className="mt-6">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-block min-h-11 py-2 text-[16px] font-semibold text-foreground/70 transition-opacity hover:opacity-70 sm:min-h-0 sm:py-0"
                  >
                    {site.email}
                  </a>
                </Reveal>
              </div>
            </div>

            {/* Photo */}
            <div className="relative">
              <motion.div
                className="relative aspect-[593/720] w-full overflow-clip lg:ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  <Image
                    src={reservation.image.src}
                    alt={reservation.image.alt}
                    fill
                    preload
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <h2 className="font-semibold uppercase text-[20px] tracking-[0.08em] text-foreground">
                {contact.hoursHeading}
              </h2>
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
                    openState.isOpen
                      ? "animate-pulse bg-accent"
                      : "bg-foreground/40"
                  }`}
                />
                {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
              </motion.p>
            )}
          </div>

          <div className="mt-8 [perspective:900px]">
            {site.hours.map((row, i) => {
              const { day, time } = row;
              const isToday = openState?.day === row.dayIndex;
              const isClosed = row.open === null;
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
              {site.kitchenNote}
            </p>
          </Reveal>
        </section>

        {/* Map */}
        <section className="px-6 pb-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pb-32">
          <div className="relative">
            <Reveal y={60} amount={0.15}>
              {/* Google Maps only loads after an explicit click — before that
                  no request (and no IP) reaches Google. Art. 6 Abs. 1 lit. a
                  DSGVO + § 25 TDDDG. */}
              <div className="relative aspect-[4/3] w-full overflow-clip sm:aspect-[16/9] lg:aspect-[21/9]">
                <ConsentEmbed
                  service="Google Maps"
                  serviceId="google-maps"
                  src={site.mapsEmbedSrc}
                  privacyUrl="https://policies.google.com/privacy"
                  previewImage="/images/map-preview.svg"
                  title={`${site.name} auf Google Maps – ${site.address}`}
                  className="absolute inset-0"
                  iframeClassName="grayscale-[0.3] contrast-[0.95]"
                />
              </div>
            </Reveal>

            <motion.div
              className="relative z-10 mt-4 bg-surface p-6 shadow-2xl sm:absolute sm:bottom-8 sm:left-8 sm:mt-0 sm:max-w-[360px]"
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
                {site.name}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
                {site.subtitle}
              </p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-[15px] font-medium leading-[1.6] text-foreground/80 underline decoration-1 decoration-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
              >
                {site.street}
                <br />
                {site.cityNote ? `${site.city} · ${site.cityNote}` : site.city}
              </a>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.1em] text-accent sm:min-h-0"
              >
                {contact.mapCtaLabel}
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
      </main>

      <Footer site={site} curtain={false} />
    </div>
  );
}
