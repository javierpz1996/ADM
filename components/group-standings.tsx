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
        className="relative overflow-hidden rounded-lg w-full"
        style={{
          border: "2px solid rgb(167, 139, 250)",
          boxShadow: "0 0 20px rgba(167, 139, 250, 0.7), 0 0 40px rgba(167, 139, 250, 0.4), inset 0 0 30px rgba(167, 139, 250, 0.1)",
        }}
      >
        <img
          src="/images/fondo-3-group.jpg"
          alt=""
          className="block w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div className="absolute inset-0 z-10 flex flex-col">
            {/* Título del grupo - ancho completo */}
            <div
              className="w-full rounded-t-lg px-4 py-5 shrink-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.82)", borderBottom: "2px solid rgb(167, 139, 250)", boxShadow: "0 4px 20px rgba(167, 139, 250, 0.5), 0 4px 40px rgba(167, 139, 250, 0.25)" }}
            >
              <span className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white/95 [font-family:var(--font-staatliches),ui-sans-serif,sans-serif]">
                {title}
              </span>
            </div>
            {/* Contenido de la tabla centrado */}
            <div className="flex-1 flex items-center justify-center px-6 min-h-0">
              <div className="flex flex-col gap-[3px] w-full max-w-full">
            {/* Header */}
            <div className="grid grid-cols-[52px_1fr_88px_72px] gap-2 items-center rounded-lg py-2 mr-[5px] text-sm font-black uppercase tracking-wider text-white">
              <span className="text-center">Rank</span>
              <span>Team</span>
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
                  ? "text-red-100"
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
                  className={`grid grid-cols-[52px_1fr_88px_72px] gap-2 items-center rounded-lg px-5 py-3 ${index === 0 ? "mt-0" : "mt-[2px]"} mb-[2px] mr-[5px] ${rowBg} ${textColor} bg-cover bg-center`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/fondo-piedra.png)`,
                    ...rowNeon,
                  }}
                >
                  <div
                    className="flex items-center justify-center min-w-[28px] w-[36px] h-10 rounded-md bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/images/fondo-piedra.png)`,
                      boxShadow: "inset 3px 3px 8px rgba(0, 0, 0, 0.7), inset -2px -2px 4px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <span className="text-base font-bold tabular-nums leading-none">{rank}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={`/images/team-${(index % 3) + 1}.png`}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded object-cover"
                    />
                    <span
                      className="truncate text-lg font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #dab861, #dc5942)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {team.name}
                    </span>
                  </div>
                  <span className="text-center text-lg tabular-nums tracking-widest font-bold" style={{ fontStretch: "semi-expanded" }}>
                    {team.wins}-0-{team.losses}
                  </span>
                  <span className="text-center text-lg font-extrabold tabular-nums tracking-widest" style={{ fontStretch: "semi-expanded", color: "#896afdb3" }}>
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
