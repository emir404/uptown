import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum – UPTOWN Restaurant & Bistro, Lübeck",
  description:
    "Impressum der UPTOWN, Peter Witt und Ulf Bierbaum GbR, Kronsforder Allee 3a, 23560 Lübeck.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Dienstanbieter">
        <p>
          <strong>UPTOWN</strong>, Peter Witt und Ulf Bierbaum GbR
          <br />
          Kronsforder Allee 3a
          <br />
          23560 Lübeck
          <br />
          Schleswig-Holstein, DE
        </p>
        <p className="mt-4">Vertreten durch: Peter Witt und Ulf Bierbaum</p>
      </LegalSection>

      <LegalSection heading="Kontaktmöglichkeiten">
        <p>
          Telefon:{" "}
          <a href="tel:+494517079565" className="hover:opacity-70">
            0451 / 707 95 65
          </a>{" "}
          (ab 15 Uhr)
          <br />
          E-Mail:{" "}
          <a href="mailto:uptown@t-online.de" className="hover:opacity-70">
            uptown@t-online.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="USt-IdNr.">
        {/* Nicht im Kundenmaterial enthalten — vor Veröffentlichung ergänzen. */}
        <p>[bitte ergänzen]</p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
          werden wir diese Inhalte umgehend entfernen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir
          derartige Links umgehend entfernen.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Downloads und Kopien
          dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch
          gestattet.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
