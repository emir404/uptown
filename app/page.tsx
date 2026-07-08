import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Menu } from "./components/Menu";
import { Specials } from "./components/Specials";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero />
        {/* DAY — cream scope: the theme-cream class re-resolves all color
            tokens for gallery, story and menu */}
        <div className="theme-cream flex flex-col bg-background">
          <Gallery />
          <Story />
          <Menu />
        </div>
        <Specials />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
