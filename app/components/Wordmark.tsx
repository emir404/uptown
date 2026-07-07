"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "./Reveal";

const LINES = ["Uptown"] as const;

/**
 * Typographic wordmark for UPTOWN Restaurant & Bistro. Renders the name in
 * the Bodoni Moda display serif with a per-letter reveal. Colour is inherited
 * via `currentColor` (hero uses `text-foreground`, footer uses `text-accent`).
 */
export function Wordmark({
  className,
  delay = 0.4,
  play,
}: {
  className?: string;
  delay?: number;
  /** When provided, controls the animation instead of playing on mount. */
  play?: boolean;
}) {
  const reducedMotion = useReducedMotionSafe();
  const visible = play === undefined || play;

  let letterIndex = 0;

  return (
    <div
      className={`flex flex-col items-center justify-center font-serif uppercase leading-[0.92] tracking-[0.1em] ${className ?? ""}`}
      role="img"
      aria-label="Uptown Restaurant & Bistro"
    >
      {LINES.map((line, lineIdx) => (
        <span
          key={line}
          aria-hidden
          className="block whitespace-nowrap pl-[0.1em] text-[clamp(60px,16vw,180px)]"
        >
          {line.split("").map((char) => {
            const i = letterIndex++;
            return (
              <motion.span
                key={`${line}-${i}`}
                className="inline-block"
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: "40%", rotate: lineIdx % 2 ? 3 : -3 }
                }
                animate={
                  visible
                    ? { opacity: 1, y: 0, rotate: 0 }
                    : reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: "40%", rotate: lineIdx % 2 ? 3 : -3 }
                }
                transition={{
                  duration: reducedMotion ? 0.6 : 0.9,
                  delay: delay + i * 0.05,
                  ease: EASE,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
