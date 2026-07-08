"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "./Reveal";
import { LOGO_LETTERS, LOGO_VIEWBOX, type LogoPath } from "./logoPaths";

function LetterPaths({ paths }: { paths: LogoPath[] }) {
  return paths.map((p, i) => (
    <path key={i} fill={p.fill} fillRule={p.fillRule} d={p.d} />
  ));
}

/**
 * The UPTOWN sign logo (vectorized from the facade sign) with a per-letter
 * reveal: each letter rises and settles like the hand-cut sign letters being
 * mounted, staggered left to right.
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

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label="Uptown Restaurant & Bistro"
    >
      {LOGO_LETTERS.map((letter, i) => {
        const hidden = reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 44, rotate: i % 2 ? 2.5 : -2.5 };
        return (
          <motion.g
            key={letter.name}
            initial={hidden}
            animate={visible ? { opacity: 1, y: 0, rotate: 0 } : hidden}
            transition={{
              duration: reducedMotion ? 0.6 : 0.9,
              delay: delay + i * 0.07,
              ease: EASE,
            }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          >
            <LetterPaths paths={letter.paths} />
          </motion.g>
        );
      })}
    </svg>
  );
}

/** Static sign logo for nav and footer brand spots. */
export function LogoMark({
  className,
  label = "Uptown",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label={label}
    >
      {LOGO_LETTERS.map((letter) => (
        <g key={letter.name}>
          <LetterPaths paths={letter.paths} />
        </g>
      ))}
    </svg>
  );
}
