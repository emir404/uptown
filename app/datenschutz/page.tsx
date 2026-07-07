import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz – UPTOWN Restaurant & Bistro, Lübeck",
  description:
    "Datenschutzerklärung der UPTOWN, Peter Witt und Ulf Bierbaum GbR, Kronsforder Allee 3a, 23560 Lübeck.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <LegalSection heading="Verantwortliche">
        <p>
          <strong>UPTOWN</strong>, Peter Witt und Ulf Bierbaum GbR
          <br />
          Inhaber: Peter Witt und Ulf Bierbaum
          <br />
          Kronsforder Allee 3a
          <br />
          23560 Lübeck
        </p>
        <p className="mt-4">
          Telefon: 0451 / 707 95 65
          <br />
          E-Mail:{" "}
          <a href="mailto:uptown@t-online.de" className="hover:opacity-70">
            uptown@t-online.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Besuch unserer Website / Server-Logfiles">
        <p>
          Beim Aufruf unserer Website werden automatisch technische Daten durch
          unseren Hosting-Anbieter erfasst (z.&nbsp;B. IP-Adresse, aufgerufene
          Seite, Datum und Uhrzeit des Zugriffs, Browsertyp). Diese
          Verarbeitung ist notwendig, um die Website bereitzustellen und die
          Sicherheit des Betriebs zu gewährleisten. Eine Auswertung zu
          Marketing- oder Trackingzwecken findet nicht statt.
        </p>
      </LegalSection>

      <LegalSection heading="Keine weiteren Datenverarbeitungen">
        <p>
          Auf dieser Website gibt es kein Kontaktformular, keine Registrierung,
          keinen Newsletter und keine Verlinkung zu Social-Media-Plattformen.
          Es werden keine personenbezogenen Daten über die Website aktiv
          erhoben; wenn Sie uns telefonisch oder per E-Mail kontaktieren,
          verwenden wir Ihre Angaben nur zur Bearbeitung Ihrer Anfrage
          (z.&nbsp;B. Tischreservierung oder Anmeldung zu einer Sonder-Aktion).
        </p>
      </LegalSection>

      <LegalSection heading="Google Maps">
        <p>
          Auf unserer Website ist eine Karte von Google Maps eingebunden, um
          Ihnen die Anfahrt zu erleichtern. Beim Laden der Karte werden
          technische Daten (z.&nbsp;B. Ihre IP-Adresse) an Google übertragen.
          Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
