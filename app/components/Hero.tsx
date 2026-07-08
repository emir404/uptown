"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { LogoMark, Wordmark } from "./Wordmark";
import { Diamond } from "./Brand";
import { EASE, useReducedMotionSafe } from "./Reveal";

const MotionLink = motion.create(Link);

const NAV_LINKS = [
  { label: "GALERIE", href: "#galerie" },
  { label: "ÜBER UNS", href: "#ueber-uns" },
  { label: "SPEISEKARTE", href: "#speisekarte" },
  { label: "AKTIONEN", href: "#aktionen" },
  { label: "ÖFFNUNGSZEITEN", href: "#oeffnungszeiten" },
  { label: "RESERVIEREN", href: "/reservierung" },
  { label: "KONTAKT", href: "#kontakt" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=UPTOWN+Restaurant+Kronsforder+Allee+3a+23560+L%C3%BCbeck";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[560px] flex-col overflow-clip bg-background"
    >
      {/* Background photo with dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { scale: photoScale }}
        initial={reducedMotion ? { opacity: 0 } : { scale: 1.08, opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Die geschwungene rote Bar und der bordeauxrote Torbogen im UPTOWN am Abend, mit Kerzen und warmem Lampenlicht"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/45 to-background/90" />
      </motion.div>

      {/* Nav */}
      <motion.header
        className="relative z-20 flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
      >
        <a href="#" className="flex items-center py-1">
          <LogoMark className="h-[18px] w-auto sm:h-[21px]" />
        </a>

        <div className="flex items-center gap-5 sm:gap-7">
          <MotionLink
            href="/reservierung"
            className="hidden h-[42px] items-center justify-center bg-accent px-6 font-semibold text-[16px] uppercase tracking-[-0.16px] text-background lg:flex"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Tisch reservieren
          </MotionLink>

          {/* Sandwich menu — available on every screen size */}
          <button
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 py-2 text-foreground transition-opacity hover:opacity-70"
          >
            <span className="hidden text-[14px] font-semibold uppercase tracking-[0.16em] sm:inline">
              {menuOpen ? "Schließen" : "Menü"}
            </span>
            <span className="flex h-6 w-7 flex-col items-center justify-center gap-1.5">
              <motion.span
                className="block h-[2px] w-6 bg-foreground"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-foreground"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Full-screen menu overlay — opens on every screen size */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute inset-0 z-[15] flex flex-col overflow-y-auto overscroll-contain bg-background/97 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* m-auto centers the stack when it fits and degrades to a
                top-aligned scroll on short viewports (justify-center would
                make the top links unreachable) */}
            <nav className="m-auto flex flex-col items-center gap-3 px-6 sm:gap-6">
              {NAV_LINKS.map((link, i) => {
                const variantProps = {
                  onClick: () => setMenuOpen(false),
                  className:
                    "py-2 font-serif uppercase tracking-[0.06em] text-foreground transition-colors hover:text-accent text-[26px] sm:text-[34px]",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: EASE,
                  },
                } as const;
                return link.href.startsWith("/") ? (
                  <MotionLink
                    key={link.label}
                    href={link.href}
                    {...variantProps}
                  >
                    {link.label}
                  </MotionLink>
                ) : (
                  <motion.a key={link.label} href={link.href} {...variantProps}>
                    {link.label}
                  </motion.a>
                );
              })}
              <MotionLink
                href="/reservierung"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex h-12 items-center justify-center bg-accent px-8 font-semibold text-[16px] uppercase tracking-[-0.16px] text-background sm:mt-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              >
                Tisch reservieren
              </MotionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Giant wordmark */}
      <div className="relative z-0 flex flex-1 items-center justify-center px-6">
        <motion.div
          className="flex w-[min(88vw,860px)] flex-col items-center text-foreground"
          style={
            reducedMotion
              ? undefined
              : { scale: wordmarkScale, opacity: wordmarkOpacity, y: wordmarkY }
          }
        >
          <Wordmark className="h-auto w-full" delay={0.35} />
          <motion.p
            className="mt-6 text-center text-[12px] font-semibold uppercase tracking-[0.34em] text-foreground/70 sm:text-[14px]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
          >
            Restaurant &amp; Bistro
            <Diamond className="mx-3 text-gold" />
            Lübeck
            <Diamond className="mx-3 text-gold" />
            seit 2007
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className={`relative z-10 flex flex-col gap-2 px-6 pb-8 font-semibold text-[13px] tracking-[-0.13px] leading-[1.3] text-foreground sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:text-[16px] sm:tracking-[-0.16px] lg:px-[min(10.5vw,152px)] lg:pb-[80px] ${
          menuOpen ? "invisible" : ""
        }`}
        style={reducedMotion ? undefined : { opacity: infoOpacity }}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
      >
        <p>DI–DO 16–21 · FR/SA 16–22 · SO + MO RUHETAG</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase underline decoration-1 decoration-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
        >
          Kronsforder Allee 3a, 23560 Lübeck
        </a>
        <p>RESTAURANT &amp; BISTRO</p>
      </motion.div>
    </section>
  );
}
