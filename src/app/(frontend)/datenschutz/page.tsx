import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

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
          Auf unserer Website können Sie eine Karte von Google Maps laden, um
          sich die Anfahrt anzeigen zu lassen. Anbieter ist Google Ireland
          Limited, Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p className="mt-4">
          Die Karte wird <strong>nicht automatisch geladen</strong>. Sie sehen
          zunächst nur einen lokalen Platzhalter; erst wenn Sie auf „Google
          Maps laden“ klicken, wird die Karte abgerufen und dabei technische
          Daten (u.&nbsp;a. Ihre IP-Adresse) an Google übertragen. Bis dahin
          erreicht Google keine Anfrage von Ihnen.
        </p>
        <p className="mt-4">
          Rechtsgrundlage für diese Übertragung ist Ihre Einwilligung nach
          Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO sowie § 25 Abs.&nbsp;1
          TDDDG. Ihre Einwilligung gilt nur für den aktuellen Seitenaufruf —
          es sei denn, Sie haben „Auswahl merken“ angekreuzt; dann wird sie
          lokal in Ihrem Browser gespeichert. Sie können sie jederzeit
          widerrufen, indem Sie auf der Karte „Google Maps ausblenden“
          anklicken; der gespeicherte Eintrag wird dabei gelöscht. Die
          Übertragung kann auch Server in den USA einbeziehen; Google ist
          unter dem EU-US Data Privacy Framework zertifiziert. Näheres in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
