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
import { Wordmark } from "./Wordmark";
import { EASE, useReducedMotionSafe } from "./Reveal";

const MotionLink = motion.create(Link);

const NAV_LINKS = [
  { label: "SPEISEKARTE", href: "#speisekarte" },
  { label: "AKTIONEN", href: "#aktionen" },
  { label: "ÜBER UNS", href: "#ueber-uns" },
  { label: "ÖFFNUNGSZEITEN", href: "#oeffnungszeiten" },
  { label: "RESERVIEREN", href: "/reservierung" },
  { label: "KONTAKT", href: "#kontakt" },
];

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
          alt="Kerzenbeleuchteter Gastraum im UPTOWN mit Blick auf den offenen Grill"
          fill
          priority
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
        <a
          href="#"
          className="font-serif text-[18px] uppercase tracking-[0.18em] leading-[1.3] text-foreground"
        >
          Uptown
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 font-semibold text-[16px] tracking-[-0.16px] leading-[1.3] text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="py-2 font-semibold text-[16px] tracking-[-0.16px] leading-[1.3] text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <MotionLink
          href="/reservierung"
          className="hidden h-[42px] items-center justify-center bg-accent px-6 font-semibold text-[16px] uppercase tracking-[-0.16px] text-background lg:flex"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Tisch reservieren
        </MotionLink>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <motion.span
            className="block h-[2px] w-6 bg-foreground"
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-[2px] w-6 bg-foreground"
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-background/95 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_LINKS.map((link, i) => {
              const variantProps = {
                onClick: () => setMenuOpen(false),
                className:
                  "py-2 font-semibold text-[20px] tracking-[-0.2px] text-foreground",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease: EASE,
                },
              } as const;
              return link.href.startsWith("/") ? (
                <MotionLink key={link.label} href={link.href} {...variantProps}>
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
              className="mt-4 flex h-12 items-center justify-center bg-accent px-8 font-semibold text-[16px] uppercase tracking-[-0.16px] text-background"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            >
              Tisch reservieren
            </MotionLink>
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
            Restaurant &amp; Bistro · Lübeck · seit 2007
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className="relative z-10 flex flex-col gap-2 px-6 pb-8 font-semibold text-[13px] tracking-[-0.13px] leading-[1.3] text-foreground sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:text-[16px] sm:tracking-[-0.16px] lg:px-[min(10.5vw,152px)] lg:pb-[80px]"
        style={reducedMotion ? undefined : { opacity: infoOpacity }}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
      >
        <p>DI–DO 16–21 · FR/SA 16–22 · SO + MO RUHETAG</p>
        <p className="uppercase">Kronsforder Allee 3a, 23560 Lübeck</p>
        <p>GRILL · SMOKEHOUSE · BAR</p>
      </motion.div>
    </section>
  );
}
