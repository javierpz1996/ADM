"use client";

import { GroupTeam } from "@/lib/mock-data";

interface GroupStandingsProps {
  title: string;
  teams: GroupTeam[];
}

export function GroupStandings({ title, teams }: GroupStandingsProps) {
  return (
    <div className="flex-1 min-w-[560px] max-w-[800px] w-full flex-1">
      <div
        className="relative overflow-visible rounded-none w-full"
        style={{
          border: "none",
          boxShadow: "none",
        }}
      >
        {/* Neon table border (same stack as MVP footer) */}
        <div
          className="absolute -inset-[2px] rounded-none opacity-95 z-0"
          style={{
            background:
              "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
            filter: "blur(3px) saturate(1.35)",
          }}
          aria-hidden
        />
        <div
          className="absolute -inset-[1px] rounded-none opacity-100 z-0"
          style={{
            background:
              "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
            filter: "saturate(1.25)",
          }}
          aria-hidden
        />

        <img
          src="/images/fondo-group-6.jpg"
          alt=""
          className="relative z-0 block w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/50 z-10" aria-hidden />
        <div className="absolute inset-0 z-20 flex flex-col">
            {/* Título del grupo - ancho completo */}
            <div
              className="w-full rounded-none px-4 py-5 shrink-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.82)", borderBottom: "2px solid rgb(167, 139, 250)", boxShadow: "0 4px 20px rgba(167, 139, 250, 0.5), 0 4px 40px rgba(167, 139, 250, 0.25)" }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest text-white/95">
                {title}
              </span>
            </div>
            {/* Contenido de la tabla centrado */}
            <div className="flex-1 flex items-center justify-center px-6 min-h-0">
              <div className="flex flex-col gap-[2px] w-full max-w-full">
            {/* Header */}
            <div className="grid grid-cols-[52px_1fr_88px_72px] gap-2 items-center rounded-[5px] px-5 py-3 mr-[5px] text-lg font-black uppercase tracking-wider text-white">
              <span className="text-center -translate-x-3">Rank</span>
              <span className="text-left -translate-x-[4px]">Team</span>
              <span className="text-center">W-D-L</span>
              <span className="text-center">Score</span>
            </div>
            {teams.map((team, index) => {
              const rank = index + 1;
              const isQualified = rank <= 4;
              const isMiddle = rank >= 5 && rank <= 7;
              const isEliminated = rank >= 8;

              const rowBg = isQualified
                ? "bg-emerald-900/70"
                : isEliminated
                  ? "bg-red-950/70"
                  : "bg-stone-900/40";

              const textColor = isQualified
                ? "text-emerald-50"
                : isEliminated
                  ? "text-white/90"
                  : "text-white/90";

              // Borde neon por dentro: colores custom más saturados
              const rowNeon =
                rank <= 4
                  ? { border: "2px solid rgba(230, 195, 75, 1)", boxShadow: "inset 0 0 22px rgba(230, 195, 75, 0.85), 0 4px 12px rgba(0, 0, 0, 0.4)" }
                  : rank <= 6
                    ? { border: "2px solid rgba(120, 220, 65, 1)", boxShadow: "inset 0 0 22px rgba(120, 220, 65, 0.85), 0 4px 12px rgba(0, 0, 0, 0.4)" }
                    : rank === 7
                      ? { border: "2px solid rgba(165, 158, 115, 1)", boxShadow: "inset 0 0 22px rgba(165, 158, 115, 0.85), 0 4px 12px rgba(0, 0, 0, 0.4)" }
                      : { border: "2px solid rgba(235, 70, 50, 1)", boxShadow: "inset 0 0 22px rgba(235, 70, 50, 0.85), 0 4px 12px rgba(0, 0, 0, 0.4)" };

              return (
                <div
                  key={team.id}
                  className={`grid grid-cols-[52px_1fr_88px_72px] gap-2 items-center rounded-[5px] px-5 py-3 ${index === 0 ? "mt-0" : "mt-[2px]"} mb-[1px] mr-[5px] ${rowBg} ${textColor} bg-cover bg-center`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/fondo-piedra-2.png)`,
                    ...rowNeon,
                  }}
                >
                  <div
                    className="flex items-center justify-center min-w-[28px] w-[36px] h-10 rounded-[5px] bg-cover bg-center shrink-0 -translate-x-1"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/images/fondo-piedra-2.png)`,
                      boxShadow: "inset 3px 3px 8px rgba(0, 0, 0, 0.7), inset -2px -2px 4px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <span className="text-base font-bold tabular-nums leading-none">{rank}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 -translate-x-[12px]">
                    <img
                      src={`/images/team-${(index % 3) + 1}.png`}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-[5px] object-cover"
                      style={
                        isEliminated
                          ? {
                              filter:
                                "grayscale(1) saturate(0) contrast(1.1) brightness(0.85)",
                            }
                          : undefined
                      }
                    />
                    <span
                      className={`truncate text-lg font-bold ${
                        isEliminated ? "text-[#6b7280]" : "bg-clip-text text-transparent"
                      }`}
                      style={
                        isEliminated
                          ? {
                              backgroundImage: "none",
                              WebkitBackgroundClip: "initial",
                              WebkitTextFillColor: "initial",
                              textShadow: "none",
                              color: "#6b7280",
                            }
                          : {
                              backgroundImage:
                                "linear-gradient(90deg, #cc00ff 0%, #00e7ff 100%)",
                              filter: "saturate(0.78)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              textShadow:
                                "0 0 4px rgba(204, 0, 255, 0.22), 0 0 1.5px rgba(0, 231, 255, 0.12)",
                            }
                      }
                    >
                      {team.name}
                    </span>
                  </div>
                  <span
                    className="text-center text-lg tabular-nums tracking-widest font-bold"
                    style={{
                      fontStretch: "semi-expanded",
                      color: isEliminated ? "#6b7280" : undefined,
                    }}
                  >
                    {team.wins}-0-{team.losses}
                  </span>
                  <span
                    className="text-center text-lg font-extrabold tabular-nums tracking-widest"
                    style={{
                      fontStretch: "semi-expanded",
                      color: isEliminated ? "#6b7280" : "#896afdb3",
                    }}
                  >
                    {team.points}
                  </span>
                </div>
              );
            })}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
