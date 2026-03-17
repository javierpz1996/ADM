"use client";

import { groupATeams, groupBTeams } from "@/lib/mock-data";
import { GroupStandings } from "./group-standings";

export function GroupStandingsSection() {
  return (
    <section
      id="groups"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/fondo-teams.jpg)", filter: "grayscale(1) brightness(0.45) contrast(1.1)" }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header - mismo estilo que ROAD TO / ADL CHAMPIONSHIP SEASON 1 / Regional Qualifiers */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-gradient-to-r from-transparent to-[#a78bfa]/80" />
            <p className="text-[#a78bfa] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.2em]">
              ADL Championship
            </p>
            <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-gradient-to-l from-transparent to-[#a78bfa]/80" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#896afd] via-[#a78bfa] to-[#896afd] drop-shadow-[0_0_25px_rgba(137,106,253,0.7),0_0_50px_rgba(167,139,250,0.4)] mb-4">
            Group Stage
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.8),0_0_40px_rgba(56,189,248,0.4)] [font-family:var(--font-staatliches),ui-sans-serif,sans-serif]">
            Final Standings
          </p>
        </div>

        {/* Two panels side by side */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10 w-full">
          <GroupStandings title="Group A" teams={groupATeams} />
          <GroupStandings title="Group B" teams={groupBTeams} />
        </div>

        {/* Footer timeline - dos al inicio, Finals al final */}
        <div className="mt-8 flex flex-row flex-wrap items-center justify-between gap-6 text-base sm:text-lg uppercase tracking-wider text-amber-200/80">
          <div className="flex flex-row flex-wrap items-end gap-12 sm:gap-20 lg:gap-28">
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">Group Stage</span>
              <span className="mt-2 px-5 py-3 rounded-none text-sm sm:text-base font-black uppercase tracking-wider" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
                Oct 15–18, 2026
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">Playoffs | Arena</span>
              <span className="mt-2 px-5 py-3 rounded-none text-sm sm:text-base font-black uppercase tracking-wider" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
                Oct 20–23, 2026
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-sm sm:text-base text-white">Finals | Indoor Stadium</span>
            <span className="mt-2 px-5 py-3 rounded-none text-sm sm:text-base font-black uppercase tracking-wider min-w-[220px] sm:min-w-[260px] inline-block text-center" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
              Oct 29–30, 2026
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
