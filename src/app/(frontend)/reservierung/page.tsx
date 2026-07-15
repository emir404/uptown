import type { Metadata } from "next";
import { Reservation } from "@/components/Reservation";
import { getHomeData, getSiteData } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSiteData(), getHomeData()]);
  return {
    title: `${home.reservation.heading.join(" ")} – ${site.name} ${site.subtitle}, ${site.cityName}`,
    description: home.reservation.text,
  };
}

export default async function ReservierungPage() {
  const [home, site] = await Promise.all([getHomeData(), getSiteData()]);
  return (
    <Reservation
      reservation={home.reservation}
      contact={home.contact}
      site={site}
    />
  );
}
