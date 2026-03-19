"use client";

import { groupATeams, groupBTeams } from "@/lib/mock-data";
import { GroupStandings } from "./group-standings";

export function GroupStandingsSection() {
  return (
    <section id="groups" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/fondo-teams.jpg)",
          filter: "grayscale(1) brightness(0.45) contrast(1.1)",
        }}
        aria-hidden
      />
      {/* Fade a negro arriba y abajo */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/12 to-black/75"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/15" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-18">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] mb-0">
            Group Stage
          </h2>

          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
            }}
          >
             Final Standings
          </span>
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
              <span className="font-bold text-sm sm:text-base text-white">
                Group Stage
              </span>
              <div className="mt-2 relative inline-block">
                <div
                  className="absolute -inset-[2px] rounded-none opacity-80"
                  style={{
                    background:
                      "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                    filter: "blur(4px)",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute -inset-[1px] rounded-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                  }}
                  aria-hidden
                />
                <div
                  className="relative rounded-none overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url(/images/aegis-fondo.png)",
                      backgroundSize: "130%",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                    }}
                    aria-hidden
                  />
                  <span
                    className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                    style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
                  >
                    Oct 15–18, 2026
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm sm:text-base text-white">
                Playoffs | Arena
              </span>
              <div className="mt-2 relative inline-block">
                <div
                  className="absolute -inset-[2px] rounded-none opacity-80"
                  style={{
                    background:
                      "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                    filter: "blur(4px)",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute -inset-[1px] rounded-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                  }}
                  aria-hidden
                />
                <div
                  className="relative rounded-none overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url(/images/aegis-fondo.png)",
                      backgroundSize: "130%",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                    }}
                    aria-hidden
                  />
                  <span
                    className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                    style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
                  >
                    Oct 20–23, 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-sm sm:text-base text-white">
              Finals | Indoor Stadium
            </span>
            <div className="mt-2 relative inline-block min-w-[220px] sm:min-w-[260px]">
              <div
                className="absolute -inset-[2px] rounded-none opacity-80"
                style={{
                  background:
                    "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                  filter: "blur(4px)",
                }}
                aria-hidden
              />
              <div
                className="absolute -inset-[1px] rounded-none"
                style={{
                  background:
                    "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                }}
                aria-hidden
              />
              <div
                className="relative rounded-none overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url(/images/aegis-fondo.png)",
                    backgroundSize: "130%",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                  }}
                  aria-hidden
                />
                <span
                  className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white text-center"
                  style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
                >
                  Oct 29–30, 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
