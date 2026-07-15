"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Diamond, GoldFrame } from "./Brand";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import type { HomeData } from "@/lib/content";

/* The collage is design, not content: each slot's span/aspect is fixed here and
   applied by position, so re-ordering the images in the admin rearranges the
   collage while the layout itself stays intact. Sources are 550–1200 px wide —
   the spans keep every cell at or under ~1.2x native width; widening a slot will
   blur its photo. */
type Slot = { className: string; sizes: string; framed?: boolean };

const SLOTS: Slot[] = [
  {
    className: "col-span-2 aspect-[9/5] lg:col-span-8",
    sizes: "(max-width: 1024px) 100vw, 62vw",
  },
  {
    className: "col-span-1 aspect-[4/5] lg:col-span-4",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    className: "col-span-1 aspect-[4/3] lg:col-span-4 lg:mt-16",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    className: "col-span-1 aspect-[4/3] lg:col-span-5",
    sizes: "(max-width: 1024px) 50vw, 38vw",
  },
  {
    className: "col-span-1 aspect-[3/2] self-end lg:col-span-3",
    sizes: "(max-width: 1024px) 50vw, 23vw",
  },
  {
    className: "col-span-2 aspect-[9/5] lg:col-span-6 lg:col-start-2",
    sizes: "(max-width: 1024px) 100vw, 46vw",
    framed: true,
  },
  {
    className: "col-span-1 aspect-[4/3] lg:col-span-4 lg:mt-20",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    className: "col-span-1 aspect-[3/2] self-start lg:col-span-3 lg:col-start-1",
    sizes: "(max-width: 1024px) 50vw, 23vw",
  },
  {
    className:
      "col-span-2 aspect-[16/9] lg:col-span-8 lg:col-start-4 lg:ml-auto lg:w-full lg:max-w-[900px]",
    sizes: "(max-width: 1024px) 100vw, 56vw",
  },
];

/** Anything beyond the designed slots falls back to a plain half-width cell. */
const FALLBACK_SLOT: Slot = {
  className: "col-span-1 aspect-[4/3] lg:col-span-4",
  sizes: "(max-width: 1024px) 50vw, 30vw",
};

export function Gallery({ gallery }: { gallery: HomeData["gallery"] }) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="galerie"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="mb-10 max-w-[560px] lg:mb-16">
        <Reveal y={16}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
            {gallery.eyebrow}
          </p>
        </Reveal>
        <TextLineReveal
          as="h2"
          lines={gallery.heading}
          className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(30px,5vw,52px)]"
        />
        <Reveal delay={0.1} className="mt-5">
          <p className="text-[15px] font-medium leading-[1.6] text-foreground/75 sm:text-[16px]">
            {gallery.text}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-6">
        {gallery.images.map((image, i) => {
          const slot = SLOTS[i] ?? FALLBACK_SLOT;
          return (
          <motion.figure
            key={`${image.src}-${i}`}
            className={`group relative m-0 ${slot.className}`}
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : 40,
              scale: reducedMotion ? 1 : 1.03,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 3) * 0.1, ease: EASE }}
          >
            <div className="relative h-full w-full overflow-clip">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={slot.sizes}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
              {slot.framed && <GoldFrame />}
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[12px]">
                <Diamond className="mr-2 text-gold" />
                {image.caption}
              </figcaption>
            )}
          </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
