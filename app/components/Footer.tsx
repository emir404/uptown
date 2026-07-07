"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useReducedMotionSafe } from "./Reveal";

const MARQUEE_TEXT =
  "Grill · Smokehouse · Bar · Steaks · Ribs · Lübeck · seit 2007 · ";

const HOURS_SUMMARY = [
  { days: "Dienstag – Donnerstag", time: "16:00 – 21:00" },
  { days: "Freitag – Samstag", time: "16:00 – 22:00" },
  { days: "Sonntag & Montag", time: "Ruhetag" },
];

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityMarquee() {
  const reducedMotion = useReducedMotionSafe();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    let moveBy = direction.current * -1.5 * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="border-y border-border py-5 sm:py-7">
      <p className="sr-only">
        Grill, Smokehouse und Bar in Lübeck — seit 2007.
      </p>
      <div aria-hidden className="overflow-hidden whitespace-nowrap">
        <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="shrink-0 font-serif uppercase leading-none tracking-[0.06em] text-foreground text-[clamp(28px,5vw,56px)]"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
    </p>
  );
}

export function Footer({ curtain = true }: { curtain?: boolean }) {
  const footerRef = useRef<HTMLElement>(null);

  // The curtain reveal only works when the whole footer fits in the viewport;
  // otherwise its top (contact/legal links) would be unreachable.
  const [fitsViewport, setFitsViewport] = useState(true);

  useEffect(() => {
    const check = () => {
      setFitsViewport(
        (footerRef.current?.offsetHeight ?? 0) <= window.innerHeight,
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sticky = curtain && fitsViewport;

  return (
    <>
      {/* Marquee strip — stays in the dark page flow above the footer curtain */}
      {curtain && (
        <div className="relative z-10 bg-background">
          <VelocityMarquee />
        </div>
      )}

      <footer
        ref={footerRef}
        className={`bg-surface text-foreground ${
          sticky ? "sticky bottom-0 z-0 motion-reduce:static" : ""
        }`}
      >
        <div className="px-6 py-12 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-x-16">
            {/* Brand */}
            <div>
              <p className="font-serif text-[40px] uppercase leading-none tracking-[0.12em] text-foreground">
                Uptown
              </p>
              <p className="mt-5 max-w-[36ch] text-[14px] font-medium leading-[1.6] text-muted">
                Restaurant &amp; Bistro · Grill · Smokehouse · Bar
                <br />
                Kronsforder Allee 3a, 23560 Lübeck · Nahe Mühlentorteller
              </p>
              <a
                href="mailto:uptown@t-online.de"
                className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-foreground transition-opacity hover:opacity-60 sm:min-h-0"
              >
                uptown@t-online.de
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            {/* Kontakt */}
            <div>
              <FooterLabel>Kontakt</FooterLabel>
              <div className="mt-4 flex flex-col gap-1 text-[15px] font-semibold">
                <a
                  href="tel:+494517079565"
                  className="min-h-11 py-1.5 tabular-nums transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0.5"
                >
                  0451 / 707 95 65
                </a>
                <p className="text-[13px] font-medium text-muted">
                  Telefonisch erreichbar ab 15 Uhr
                </p>
              </div>
              <Link
                href="/reservierung"
                className="mt-5 inline-flex h-11 items-center justify-center bg-accent px-6 font-semibold text-[14px] uppercase tracking-[-0.14px] text-background transition-transform duration-200 hover:scale-[1.03]"
              >
                Tisch reservieren
              </Link>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <FooterLabel>Öffnungszeiten</FooterLabel>
              <dl className="mt-4 flex flex-col gap-2.5 text-[14px]">
                {HOURS_SUMMARY.map((row) => (
                  <div key={row.days} className="flex flex-col">
                    <dt className="font-semibold text-foreground">
                      {row.days}
                    </dt>
                    <dd className="font-medium tabular-nums text-muted">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="text-[13px] font-semibold text-muted">
              © {new Date().getFullYear()} UPTOWN Restaurant &amp; Bistro ·
              Peter Witt und Ulf Bierbaum GbR
            </p>
            <div className="flex items-center gap-6 text-[13px] font-semibold">
              <Link
                href="/impressum"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
