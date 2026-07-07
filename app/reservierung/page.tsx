import type { Metadata } from "next";
import { Reservation } from "../components/Reservation";

export const metadata: Metadata = {
  title: "Reservierung – UPTOWN Restaurant & Bistro, Lübeck",
  description:
    "Reservieren Sie Ihren Tisch im UPTOWN telefonisch unter 0451 / 707 95 65 (ab 15 Uhr). Feiern und Seminare bis 60 Personen. Kronsforder Allee 3a, 23560 Lübeck.",
};

export default function ReservierungPage() {
  return <Reservation />;
}
