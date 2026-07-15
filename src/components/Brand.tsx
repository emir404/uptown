/* Brand primitives drawn from the physical facade sign
   (public/images/real/facade-sign.jpg): gold hand-cut letters with a
   diamond-inset "O", an engraved Lübeck skyline, a double gold-line frame.
   All color via currentColor / token utilities so every theme scope works. */

/** The diamond from the sign's "O". Em-sized; color it via text-gold on the
    caller (an inline SVG because Manrope/Bodoni have no ◆ glyph). */
export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 10"
      className={`inline-block h-[0.45em] w-[0.45em] shrink-0 fill-current align-[0.08em] ${className}`}
    >
      <path d="M5 0 10 5 5 10 0 5Z" />
    </svg>
  );
}

/** The sign's double gold-line frame as an overlay. Parent must be `relative`. */
export function GoldFrame({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className="absolute inset-0 border border-gold/60" />
      <span className="absolute inset-[5px] border border-gold/30" />
    </span>
  );
}

/** Engraved-style Lübeck silhouette strip — Holstentor, the seven spires and
    stepped gables as a single hairline, echoing the etching on the sign. */
export function SkylineFrieze({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 720 64"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      <path d="M0 63H720" stroke="currentColor" strokeOpacity="0.45" />
      <path
        d="M0 63V56H10L14 52H22V57H30V50H42V33L53 19L64 33V44H70V38L76 32L82 38V44H88V33L99 19L110 33V50H118V57H126V52H132V48H138V44H144V48H150V52H156V56H170V54H178V49H186V54H194V56H210V50H222V44H236V26L248 10L260 26V44H268V52H276L284 46H300V54H312V40H318V22L330 4L342 22V30H352V22L364 4L376 22V40H384V50H394L402 44H416V52H428V56H436V46L440 42L444 46V50H452V46L456 42L460 46V52H468V56H474V40H480V26L490 12L500 26V32H508V26L518 12L528 26V40H534V52H544V48H552L558 44H566V54H574V30L584 16L594 30V46H602V54H610V34L620 22L630 34V48H638V56H648V52H658L662 56H672V53H684V58H694V55H706V60H720V63"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
