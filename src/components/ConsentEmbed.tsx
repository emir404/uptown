"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Zwei-Klick-Einwilligung für Dritt-Embeds (Google Maps, YouTube, …).
 *
 * Das iframe wird erst geladen, nachdem der Besucher aktiv eingewilligt hat —
 * vorher fließt keine einzige Anfrage (und damit keine IP-Adresse) an den
 * Drittanbieter. Rechtsgrundlage nach dem Klick: Einwilligung
 * (Art. 6 Abs. 1 lit. a DSGVO) + § 25 Abs. 1 TDDDG.
 *
 * - Einwilligung ist granular pro Dienst (`serviceId`) und jederzeit über
 *   „ausblenden“ widerrufbar (der localStorage-Eintrag wird dabei gelöscht).
 * - Gespeichert wird die Auswahl NUR, wenn der Besucher „Auswahl merken“
 *   ankreuzt — sonst gilt sie für den aktuellen Seitenaufruf.
 * - `previewImage` muss ein LOKALES Bild sein (kein Google-Static-Maps-Abruf,
 *   der würde vor der Einwilligung wieder Daten an Google senden).
 *
 * Optik pro Site über CSS-Variablen steuerbar:
 *   --consent-embed-bg, --consent-embed-fg, --consent-embed-muted,
 *   --consent-embed-accent, --consent-embed-accent-fg
 */
type ConsentEmbedProps = {
  /** Anzeigename des Dienstes, z. B. „Google Maps“. */
  service: string;
  /** Stabiler Schlüssel für die gemerkte Einwilligung, z. B. „google-maps“. */
  serviceId: string;
  /** Die iframe-URL — wird erst nach Einwilligung gesetzt. */
  src: string;
  /** Datenschutzerklärung des Drittanbieters. */
  privacyUrl: string;
  /** Feste Höhe in px; entfällt, wenn der Container die Größe vorgibt. */
  height?: number;
  /** Lokales Vorschaubild hinter dem Einwilligungs-Dialog. */
  previewImage?: string;
  /** iframe-title für Screenreader; Fallback ist der Dienstname. */
  title?: string;
  className?: string;
  iframeClassName?: string;
};

const storageKey = (serviceId: string) => `consent-embed:${serviceId}`;

export default function ConsentEmbed({
  service,
  serviceId,
  src,
  privacyUrl,
  height,
  previewImage,
  title,
  className,
  iframeClassName,
}: ConsentEmbedProps) {
  const [consented, setConsented] = useState(false);
  const [remember, setRemember] = useState(false);

  // Server und erste Client-Zeichnung rendern immer den Dialog — erst nach
  // der Hydration darf localStorage die gemerkte Einwilligung einlösen.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(storageKey(serviceId)) === "granted") {
        setConsented(true);
      }
    } catch {
      // Speicher gesperrt (z. B. Safari-Privatmodus) — Dialog bleibt einfach da.
    }
  }, [serviceId]);

  const grant = () => {
    setConsented(true);
    if (remember) {
      try {
        window.localStorage.setItem(storageKey(serviceId), "granted");
      } catch {
        // ohne Speicher gilt die Einwilligung eben nur für diesen Aufruf
      }
    }
  };

  // Widerruf: Embed weg, gemerkte Auswahl weg.
  const revoke = () => {
    setConsented(false);
    try {
      window.localStorage.removeItem(storageKey(serviceId));
    } catch {
      // nichts gespeichert, nichts zu löschen
    }
  };

  return (
    <div
      // Position kommt ausschließlich vom Aufrufer (z. B. „absolute inset-0“
      // im Karten-Container) — ein hart kodiertes `relative` daneben kollidiert
      // im Produktions-CSS und lässt die Box auf 0 Höhe kollabieren.
      className={`overflow-hidden ${className ?? "relative"}`}
      style={height ? { height } : undefined}
    >
      {consented ? (
        <>
          <iframe
            src={src}
            title={title ?? service}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={`absolute inset-0 h-full w-full border-0 ${iframeClassName ?? ""}`}
          />
          <button
            type="button"
            onClick={revoke}
            className="absolute right-2 top-2 z-10 rounded-full bg-[var(--consent-embed-bg,#0d4a4d)]/90 px-3 py-1.5 text-[12px] font-semibold text-[var(--consent-embed-fg,#dcf3f3)] shadow-md transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--consent-embed-accent,#ffcc66)]"
          >
            {service} ausblenden
          </button>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {previewImage ? (
            // Lokales Bild, bewusst kein next/image: SVG-Vorschau braucht keine
            // Optimierungs-Pipeline, und es darf keinesfalls eine externe
            // Loader-URL entstehen.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--consent-embed-fg,#dcf3f3)]/60" />
          )}
          <div className="relative z-10 m-[clamp(12px,3vw,24px)] flex max-w-[440px] flex-col gap-3 rounded-[6px] bg-[var(--consent-embed-bg,#0d4a4d)] p-[clamp(16px,2.5vw,24px)] text-[var(--consent-embed-fg,#dcf3f3)] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--consent-embed-muted,rgba(220,243,243,0.55))]">
              Externer Inhalt
            </p>
            <p className="text-[clamp(13px,1.05vw,15px)] leading-[1.55]">
              An dieser Stelle binden wir {service} ein. Erst wenn Sie den
              Inhalt laden, werden Daten (u.&nbsp;a. Ihre IP-Adresse) an den
              Anbieter übertragen. Details:{" "}
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Datenschutzhinweise von {service}
              </a>{" "}
              und unsere{" "}
              <Link
                href="/datenschutz"
                className="underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
            <label className="flex w-fit cursor-pointer items-center gap-2 text-[clamp(12px,1vw,14px)]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 accent-[var(--consent-embed-accent,#ffcc66)]"
              />
              Auswahl merken
            </label>
            <button
              type="button"
              onClick={grant}
              className="w-fit rounded-full bg-[var(--consent-embed-accent,#ffcc66)] px-[clamp(18px,2vw,26px)] py-[clamp(10px,1.1vw,13px)] text-[clamp(13px,1.05vw,15px)] font-semibold text-[var(--consent-embed-accent-fg,#0d4a4d)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--consent-embed-fg,#dcf3f3)]"
            >
              {service} laden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
