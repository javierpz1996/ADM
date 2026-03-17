import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TeamsSection } from "@/components/teams-section";
import { MVPPlayersSection } from "@/components/mvp-players-section";
import { GroupStandingsSection } from "@/components/group-standings-section";
import { LatestNews } from "@/components/latest-news";
import { FaqSection } from "@/components/faq-section";
import { MerchSection } from "@/components/merch-section";
import { Footer } from "@/components/footer";

export default function TournamentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MerchSection />
      <TeamsSection />
      <MVPPlayersSection />
      <GroupStandingsSection />
      <LatestNews />
      <FaqSection />
      <Footer />
    </main>
  );
}
