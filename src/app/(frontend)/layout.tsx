import type { Metadata, Viewport } from "next";
import { Manrope, Bodoni_Moda } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getHomeData, getSiteData } from "@/lib/content";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
});

// The layout carries the Phillip toggle and the SEO metadata — revalidate so a
// save in the admin reaches every (frontend) route within a minute, not on the
// next rebuild.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSiteData(), getHomeData()]);
  const title = site.meta.title;
  const description = site.meta.description;

  return {
    metadataBase: new URL(site.meta.siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "de_DE",
      url: site.meta.siteUrl,
      siteName: `${site.name} ${site.subtitle}`,
      images: [{ url: home.hero.image.src }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#241a17",
};

// Set per site (Vercel env) — without it there is no embed to render.
const PHILLIP_PREVIEW_ID = process.env.NEXT_PUBLIC_PHILLIP_PREVIEW_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteData();

  return (
    <html
      lang="de"
      className={`${manrope.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        {/* Phillip, the preview agent — rendered only while the admin toggle
            (Einstellungen → „Phillip anzeigen“) is on and this site has a
            preview id configured. */}
        {site.phillipEnabled && PHILLIP_PREVIEW_ID && (
          <Script
            src="https://phillip-dashboard-eight.vercel.app/phillip.js"
            data-preview-id={PHILLIP_PREVIEW_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
