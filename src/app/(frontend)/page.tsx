import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Menu } from "@/components/Menu";
import { Specials } from "@/components/Specials";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getHomeData, getSiteData, getSpeisekarte } from "@/lib/content";

// Content is edited in the admin — re-render the page about once a minute so
// a save goes live without a deploy.
export const revalidate = 60;

export default async function Home() {
  const [home, site, speisekarte] = await Promise.all([
    getHomeData(),
    getSiteData(),
    getSpeisekarte(),
  ]);

  return (
    <div className="flex flex-col">
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero hero={home.hero} site={site} />
        {/* DAY — cream scope: the theme-cream class re-resolves all color
            tokens for gallery, story and menu */}
        <div className="theme-cream flex flex-col bg-background">
          <Gallery gallery={home.gallery} />
          <Story story={home.story} site={site} />
          <Menu menu={home.menu} speisekarte={speisekarte} site={site} />
        </div>
        <Specials specials={home.specials} />
        <Contact contact={home.contact} site={site} />
      </div>
      <Footer site={site} />
    </div>
  );
}
