import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { TablonTablero } from "@/components/tablon/tablon-tablero";

export const metadata: Metadata = {
  title: "Tablón | Argentina Dota Masters",
  description: "Dejá tu firma en la pizarra de la comunidad.",
};

export default function TablonPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] pt-14 text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#020617_0%,#0a0f1c_45%,#020617_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(99,102,241,0.12),transparent_58%)]"
        aria-hidden
      />
      <Navbar />
      <div className="relative z-10">
        <TablonTablero />
      </div>
    </main>
  );
}
