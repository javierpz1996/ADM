"use client";

import { ti16Teams } from "@/lib/mock-data";
import { TI16TeamCard } from "@/components/ti16-team-card";

export function TeamsSection() {
  return (
    <section id="teams" className="relative py-16 sm:py-24 overflow-hidden bg-[#030712]" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
      {/* Backgrounds (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {/* Base blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050510] to-[#030712]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90" />
        <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-[#020408] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#020408] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#896afd]/6 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-[#896afd]/8 rounded-full blur-[140px]" />

        {/* Imagen de fondo (full) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: "url(/images/main-fondo-teams.png)" }}
        />
        {/* Fade arriba y abajo a negro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90" />
        {/* Capa extra para legibilidad */}
        <div className="absolute inset-0 bg-black/35" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center">
          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
            }}
          >
            EQUIPOS PARTICIPANTES
          </span>
        </div>
        <div className="w-20 h-1.5 bg-white/70 rounded-none shrink-0 mb-8" aria-hidden />

        {/* Teams Grid: primero con equipo, después TBD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {[...ti16Teams]
            .sort((a, b) => (b.players?.length ?? 0) - (a.players?.length ?? 0))
            .map((team) => (
              <TI16TeamCard key={team.id} team={team} />
            ))}
        </div>

        {/* Footer info - mismo estilo que Group Stage + fecha */}
        <div className="mt-10 sm:mt-6 w-full flex flex-row flex-wrap items-center justify-between gap-6 text-base sm:text-lg uppercase tracking-wider text-amber-200/80">
          <div className="flex flex-row flex-wrap items-end gap-12 sm:gap-20 lg:gap-28">
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">Road to The International</span>
              <div className="mt-2 relative inline-block">
                {/* Neon glow effect - outer (copiado de la card) */}
                <div
                  className="absolute -inset-[2px] rounded-none opacity-80"
                  style={{
                    background:
                      "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Neon border (copiado de la card) */}
                <div
                  className="absolute -inset-[1px] rounded-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                  }}
                />

                {/* Card container (copiado de la card) */}
                <div
                  className="relative rounded-none overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                  }}
                >
                  {/* Fondo aegis transparente (copiado de la card) */}
                  <div
                    className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url(/images/aegis-fondo.png)",
                      backgroundSize: "130%",
                    }}
                    aria-hidden
                  />

                  {/* Inner glow overlay (copiado de la card) */}
                  <div
                    className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                    }}
                    aria-hidden
                  />

                  <span
                    className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                    style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
                  >
                    SEP 4-7, 2025
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">MAIN EVENT</span>
              <div className="mt-2 relative inline-block">
                {/* Neon glow effect - outer (copiado de la card) */}
                <div
                  className="absolute -inset-[2px] rounded-none opacity-80"
                  style={{
                    background:
                      "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Neon border (copiado de la card) */}
                <div
                  className="absolute -inset-[1px] rounded-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                  }}
                />

                {/* Card container (copiado de la card) */}
                <div
                  className="relative rounded-none overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                  }}
                >
                  {/* Fondo aegis transparente (copiado de la card) */}
                  <div
                    className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url(/images/aegis-fondo.png)",
                      backgroundSize: "130%",
                    }}
                    aria-hidden
                  />

                  {/* Inner glow overlay (copiado de la card) */}
                  <div
                    className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                    }}
                    aria-hidden
                  />

                  <span
                    className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                    style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
                  >
                    11-14, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
