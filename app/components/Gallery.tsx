"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Diamond, GoldFrame } from "./Brand";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  className: string;
  sizes: string;
  /** Double gold-line frame overlay (the facade sign gets its own frame). */
  framed?: boolean;
};

/* Real photos (guest shots, unified warm grade via scripts/prep-real-photos.mjs).
   Sources are 550–1200 px wide — the collage spans below keep every cell at or
   under ~1.2× native width; enlarging a cell will blur its photo. */
const IMAGES: GalleryImage[] = [
  {
    src: "/images/real/dining-arch.jpg",
    alt: "Gastraum im UPTOWN mit dem burgunderroten Torbogen und New-York-Bildern an der Wand",
    caption: "Der rote Bogen",
    className: "col-span-2 aspect-[9/5] lg:col-span-8",
    sizes: "(max-width: 1024px) 100vw, 62vw",
  },
  {
    src: "/images/real/food-medaillons.jpg",
    alt: "Schweinemedaillons mit Kartoffelgratin, Gemüse und Salat auf weißem Teller",
    caption: "Schweinemedaillon le Havre",
    className: "col-span-1 aspect-[4/5] lg:col-span-4",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    src: "/images/real/food-burger.jpg",
    alt: "Bison-Burger mit Curly Fries auf dem UPTOWN-Tischset",
    className: "col-span-1 aspect-[4/3] lg:col-span-4 lg:mt-16",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    src: "/images/real/food-bbq.jpg",
    alt: "BBQ-Teller und großer Salatteller auf den bedruckten Tischsets",
    className: "col-span-1 aspect-[4/3] lg:col-span-5",
    sizes: "(max-width: 1024px) 50vw, 38vw",
  },
  {
    src: "/images/real/bar-red.jpg",
    alt: "Die rot beleuchtete Bar im UPTOWN mit dichtem Flaschenregal",
    caption: "Die Bar",
    className: "col-span-1 aspect-[3/2] self-end lg:col-span-3",
    sizes: "(max-width: 1024px) 50vw, 23vw",
  },
  {
    src: "/images/real/facade-sign.jpg",
    alt: "Gelber UPTOWN-Schriftzug mit Lübecker Silhouette über den Fenstern",
    caption: "Restaurant & Bistro — seit 2007",
    className: "col-span-2 aspect-[9/5] lg:col-span-6 lg:col-start-2",
    sizes: "(max-width: 1024px) 100vw, 46vw",
    framed: true,
  },
  {
    src: "/images/real/entrance-day.jpg",
    alt: "Eingang des UPTOWN an der Kronsforder Allee bei Tageslicht",
    className: "col-span-1 aspect-[4/3] lg:col-span-4 lg:mt-20",
    sizes: "(max-width: 1024px) 50vw, 30vw",
  },
  {
    src: "/images/real/window-dining.jpg",
    alt: "Gastraum mit Weinregal und Blick auf die Fensterfront",
    className: "col-span-1 aspect-[3/2] self-start lg:col-span-3 lg:col-start-1",
    sizes: "(max-width: 1024px) 50vw, 23vw",
  },
  {
    src: "/images/real/facade-dusk.jpg",
    alt: "Warm erleuchtete Fassade des UPTOWN am Abend",
    caption: "Kronsforder Allee, abends",
    className:
      "col-span-2 aspect-[16/9] lg:col-span-8 lg:col-start-4 lg:ml-auto lg:w-full lg:max-w-[900px]",
    sizes: "(max-width: 1024px) 100vw, 56vw",
  },
];

export function Gallery() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="galerie"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="mb-10 max-w-[560px] lg:mb-16">
        <Reveal y={16}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[14px]">
            Galerie
          </p>
        </Reveal>
        <TextLineReveal
          as="h2"
          lines={["Ein Abend", "im Uptown."]}
          className="mt-3 font-serif leading-[1.08] tracking-[0.01em] text-foreground text-[clamp(30px,5vw,52px)]"
        />
        <Reveal delay={0.1} className="mt-5">
          <p className="text-[15px] font-medium leading-[1.6] text-foreground/75 sm:text-[16px]">
            Der rote Bogen, die rote Bar, Teller, wie sie wirklich auf den
            Tisch kommen — echte Aufnahmen aus dem UPTOWN, nichts davon
            inszeniert.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-6">
        {IMAGES.map((image, i) => (
          <motion.figure
            key={image.src}
            className={`group relative m-0 ${image.className}`}
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
                sizes={image.sizes}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
              {image.framed && <GoldFrame />}
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[12px]">
                <Diamond className="mr-2 text-gold" />
                {image.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
