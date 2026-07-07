import type { Metadata } from "next";
import { Manrope, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uptown-restaurant.de"),
  title: "UPTOWN Restaurant & Bistro – Grill & Smokehouse in Lübeck",
  description:
    "UPTOWN Restaurant & Bistro – Grill & Smokehouse in Lübeck, seit 2007. Argentinische Steaks, Smoke-Town-Ribs aus dem Smoker, Bison-Burger und Cocktails. Kronsforder Allee 3a, 23560 Lübeck.",
  openGraph: {
    title: "UPTOWN Restaurant & Bistro – Grill & Smokehouse in Lübeck",
    description:
      "Argentinische Steaks, Smoke-Town-Ribs aus dem Smoker, Bison-Burger und Cocktails – seit 2007 in Lübeck, nahe dem Mühlentorteller. Kronsforder Allee 3a, 23560 Lübeck.",
    type: "website",
    locale: "de_DE",
    url: "https://www.uptown-restaurant.de",
    siteName: "UPTOWN Restaurant & Bistro",
    images: [{ url: "/images/hero.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
