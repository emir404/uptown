"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";

const IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "New-York-Strip-Steak mit Röstkartoffeln auf dunklem Steingut" },
  { src: "/images/gallery-2.jpg", alt: "Smoke-Town-Ribs mit dunkler BBQ-Glasur auf Holzbrett" },
  { src: "/images/gallery-3.jpg", alt: "Bison-Burger mit Cheddar, Speck und karamellisierten Zwiebeln" },
  { src: "/images/gallery-4.jpg", alt: "Scampi in der gusseisernen Pfanne mit Cajun-Rahmsauce" },
  { src: "/images/gallery-5.jpg", alt: "Caipirinha mit Limetten und Crushed Ice an der Bar" },
  { src: "/images/gallery-6.jpg", alt: "Glühende Holzkohle unter dem Grillrost" },
  { src: "/images/gallery-7.jpg", alt: "Die Bar im UPTOWN mit warm beleuchteten Flaschenregalen" },
  { src: "/images/gallery-8.jpg", alt: "Gedeck mit Leinenserviette, Steakmesser und Kerzenlicht" },
  { src: "/images/gallery-9.jpg", alt: "Apfel-Cranberry-Karamell-Crumble mit Mandel-Honig-Eis" },
];

export function Gallery() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section className="bg-background px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-24">
      <div className="mb-10 max-w-[560px] lg:mb-14">
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
          <p className="text-[15px] font-medium leading-[1.6] text-foreground/70 sm:text-[16px]">
            Steaks vom Grill, Ribs aus dem Smoker, Cocktails an der Bar —
            besuchen Sie uns in der Kronsforder Allee 3a, 23560 Lübeck.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {IMAGES.map((image, i) => (
          <motion.div
            key={image.src}
            className="group relative aspect-[3/4] overflow-clip sm:aspect-[385/510]"
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : 48,
              scale: reducedMotion ? 1 : 1.04,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 2) * 0.12, ease: EASE }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
