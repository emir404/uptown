import Link from "next/link";
import { Footer } from "./Footer";
import { LogoMark } from "./Wordmark";
import { getSiteData } from "@/lib/content";

export async function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const site = await getSiteData();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14">
        <Link href="/" className="flex flex-col py-2">
          <LogoMark className="h-[17px] w-auto" />
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">
            {site.subtitle}
          </span>
        </Link>
        <Link
          href="/"
          className="py-2 font-semibold text-[14px] tracking-[-0.14px] text-foreground/70 transition-opacity hover:opacity-70"
        >
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="flex-1 px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-24">
        <h1 className="font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-foreground text-[clamp(32px,5vw,48px)]">
          {title}
        </h1>
        <div className="mt-10 flex max-w-[640px] flex-col gap-8">{children}</div>
      </main>

      <Footer site={site} curtain={false} />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {heading && (
        <h2 className="mb-3 font-semibold text-[20px] tracking-[-0.2px] text-foreground">
          {heading}
        </h2>
      )}
      <div className="text-[16px] font-medium leading-[1.7] text-foreground/80">
        {children}
      </div>
    </section>
  );
}
