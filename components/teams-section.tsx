"use client";

import { ti16Teams } from "@/lib/mock-data";
import { TI16TeamCard } from "@/components/ti16-team-card";

export function TeamsSection() {
  return (
    <section id="teams" className="relative py-16 sm:py-24 overflow-hidden bg-[#030712]">
      {/* Se funde con el negro del hero: más negro arriba/abajo, violeta muy suave al centro */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050510] to-[#030712]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90" />
      <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-[#020408] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#020408] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#896afd]/6 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-[#896afd]/8 rounded-full blur-[140px]" />
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header - Road to ADL Championship */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-gradient-to-r from-transparent to-[#a78bfa]/80" />
            <p className="text-[#a78bfa] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.2em]">
              ROAD TO
            </p>
            <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-gradient-to-l from-transparent to-[#a78bfa]/80" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#896afd] via-[#a78bfa] to-[#896afd] drop-shadow-[0_0_25px_rgba(137,106,253,0.7),0_0_50px_rgba(167,139,250,0.4)] mb-4">
            ADL CHAMPIONSHIP SEASON 1
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.8),0_0_40px_rgba(56,189,248,0.4)] [font-family:var(--font-staatliches),ui-sans-serif,sans-serif]">
            Regional Qualifiers
          </p>
        </div>

        {/* Teams Grid: primero con equipo, después TBD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[...ti16Teams]
            .sort((a, b) => (b.players?.length ?? 0) - (a.players?.length ?? 0))
            .map((team) => (
              <TI16TeamCard key={team.id} team={team} />
            ))}
        </div>

        {/* Footer info - mismo estilo que Group Stage + fecha */}
        <div className="mt-10 sm:mt-14 flex flex-row flex-wrap items-center justify-between gap-6 text-base sm:text-lg uppercase tracking-wider text-amber-200/80">
          <div className="flex flex-row flex-wrap items-end gap-12 sm:gap-20 lg:gap-28">
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">Road to The International</span>
              <span className="mt-2 px-5 py-3 rounded-none text-sm sm:text-base font-black uppercase tracking-wider" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
                SEP 4-7, 2025
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">MAIN EVENT</span>
              <span className="mt-2 px-5 py-3 rounded-none text-sm sm:text-base font-black uppercase tracking-wider" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
                11-14, 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
