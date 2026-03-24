import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturedNewsHero } from "@/components/noticias/featured-news-hero";
import { DiscordCtaBanner } from "@/components/noticias/discord-cta-banner";
import { AllNewsSection } from "@/components/noticias/all-news-section";
import { FEATURED_NOTICIA } from "@/lib/noticias-data";

export const metadata: Metadata = {
  title: "Noticias | Argentina Dota Masters",
  description: "Últimas noticias de esports y Dota 2.",
};

export default function NoticiasPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] pt-14 text-white">
      {/* Fondo oscuro fijo (sin el canvas global): base + leve profundidad violeta */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#020617_0%,#0a0f1c_45%,#020617_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(99,102,241,0.14),transparent_58%)]"
        aria-hidden
      />
      <Navbar />
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-4 pb-10 pt-4 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 lg:gap-10 lg:px-10 lg:pb-14 lg:pt-6">
        <FeaturedNewsHero
          title={FEATURED_NOTICIA.title}
          image={FEATURED_NOTICIA.image}
          href={FEATURED_NOTICIA.href}
          badge={FEATURED_NOTICIA.badge}
        />

        <DiscordCtaBanner />

        <AllNewsSection />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
