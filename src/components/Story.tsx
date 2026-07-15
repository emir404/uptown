"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import type { HomeData, SiteData } from "@/lib/content";

type Chapter = HomeData["story"]["chapters"][number];

/* The chapter rows alternate sides; the numeral is the position in the section,
   not editable content. The closing quote and the Maps link belong to the last
   chapter by design. */

function ChapterRow({
  chapter,
  num,
  flip,
  last,
  quote,
  ctaLabel,
  mapsLink,
  parallaxY,
}: {
  chapter: Chapter;
  num: string;
  flip: boolean;
  last: boolean;
  quote: HomeData["story"]["quote"];
  ctaLabel: string;
  mapsLink: string;
  parallaxY: MotionValue<number> | undefined;
}) {
  const { kicker, heading, paragraphs, image } = chapter;

  const textCol = (
    <div
      className={`lg:col-span-4 ${flip ? "lg:col-start-9" : "lg:col-start-2"}`}
    >
      <p
        aria-hidden
        className="font-serif leading-none text-accent text-[clamp(40px,4.5vw,64px)] lg:hidden"
      >
        {num}
      </p>
      <Reveal y={16} className="mt-4 lg:mt-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
          {kicker}
        </p>
      </Reveal>
      <TextLineReveal
        as="h3"
        lines={heading}
        className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(30px,3.6vw,44px)]"
      />
      <Reveal delay={0.15} className="mt-7 flex max-w-[440px] flex-col gap-5">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-[16px] font-medium leading-[1.65] text-foreground/85"
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
      {last && (
        <motion.figure
          className="relative mt-10 w-full max-w-[440px] bg-surface p-8 pb-9"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-7 select-none font-serif text-[72px] leading-none text-accent/70"
          >
            „
          </span>
          <blockquote className="relative mt-2 font-serif text-[22px] leading-[1.4] text-foreground sm:text-[24px]">
            {quote.text}
          </blockquote>
          <figcaption className="relative mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
            {quote.author}
          </figcaption>
        </motion.figure>
      )}
      {last && (
        <Reveal delay={0.2} className="mt-9">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 font-semibold text-[15px] tracking-[-0.15px] text-foreground"
          >
            {ctaLabel}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </Reveal>
      )}
    </div>
  );

  const imageCol = (
    <div
      className={`lg:col-span-6 ${flip ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-7"}`}
    >
      <motion.div
        className="relative aspect-[3/4] w-full max-w-[560px] overflow-clip lg:mx-auto"
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="relative grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
      {/* sticky chapter numeral rail (desktop) */}
      <div aria-hidden className="hidden lg:col-span-1 lg:col-start-1 lg:block">
        <span className="sticky top-28 block font-serif leading-none text-accent text-[clamp(40px,3.4vw,58px)]">
          {num}
        </span>
      </div>
      {textCol}
      {imageCol}
    </div>
  );
}

export function Story({
  story,
  site,
}: {
  story: HomeData["story"];
  site: SiteData;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxSoft = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const parallaxDeep = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const parallax = [parallaxSoft, parallaxDeep, parallaxSoft];

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[140px]"
    >
      <div className="max-w-[640px]">
        <Reveal y={16}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
            {story.eyebrow}
          </p>
        </Reveal>
        <TextLineReveal
          as="h2"
          lines={story.heading}
          className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(34px,5vw,56px)]"
        />
      </div>

      <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-40">
        {story.chapters.map((chapter, i) => (
          <ChapterRow
            key={chapter.kicker}
            chapter={chapter}
            num={String(i + 1).padStart(2, "0")}
            flip={i % 2 === 1}
            last={i === story.chapters.length - 1}
            quote={story.quote}
            ctaLabel={story.ctaLabel}
            mapsLink={site.mapsLink}
            parallaxY={reducedMotion ? undefined : parallax[i % parallax.length]}
          />
        ))}
      </div>
    </section>
  );
}
