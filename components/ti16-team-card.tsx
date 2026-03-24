"use client";

import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { hasFlag } from "country-flag-icons";
import type { TI16Team } from "@/lib/mock-data";

function CountryFlag({ countryCode, className }: { countryCode: string; className?: string }) {
  const code = countryCode.toUpperCase();
  if (!hasFlag(code)) return null;
  const Flag = (FlagIcons as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[code];
  if (!Flag) return null;
  return <Flag title={code} className={className} />;
}

interface TI16TeamCardProps {
  team: TI16Team;
}

export function TI16TeamCard({ team }: TI16TeamCardProps) {
  const hasPlayers = !!team.players && team.players.length > 0;
  const isTBD = !hasPlayers;
  const logoUrl = isTBD ? "/images/tbd-test-6.jpg" : (team.logoImage ?? "");
  const name = team.name;
  const hasLogoImage = !!team.logoImage;

  return (
    <div
      className={[
        "relative w-full aspect-square min-w-0",
        hasPlayers ? "group cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      {/* Neon glow effect - outer */}
      <div
        className={[
          "absolute -inset-[2px] rounded-none opacity-80 transition-opacity duration-300",
          hasPlayers ? "group-hover:opacity-100" : "",
        ].join(" ")}
        style={{
          background: "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
          filter: "blur(4px)",
        }}
      />

      {/* Neon border */}
      <div
        className="absolute -inset-[1px] rounded-none"
        style={{
          background: "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
        }}
      />

      {/* Card container */}
      <div
        className="relative rounded-none h-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
        }}
      >
        {/* Fondo aegis transparente */}
        <div
          className="absolute inset-0 rounded-none opacity-25 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/aegis-fondo.png)",
            backgroundSize: "170%",
          }}
          aria-hidden
        />
        {/* Inner glow overlay */}
        <div
          className="absolute inset-0 rounded-none opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
          }}
        />

        {isTBD ? (
          <>
            {/* Slot vacío: imagen full, sin texto, sin hover */}
            <Image
              src={logoUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/15" aria-hidden />
          </>
        ) : (
          <>
            {/* Vista default: logo centrado + nombre abajo */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-3 transition-opacity duration-300 group-hover:opacity-0">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                {hasLogoImage ? (
                  <Image
                    src={logoUrl}
                    alt={`${name} logo`}
                    width={180}
                    height={180}
                    className="object-contain drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-all duration-300"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                ) : (
                  <span
                    className="text-2xl font-bold text-[#a78bfa] drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                    style={{ textShadow: "0 0 8px rgba(167, 139, 250, 0.5)" }}
                  >
                    {team.logo || name.slice(0, 2)}
                  </span>
                )}
              </div>

              <span
                className="mt-0 text-base sm:text-lg font-medium text-center line-clamp-2"
                style={{
                  color: "#a78bfa",
                  textShadow: "0 0 8px rgba(167, 139, 250, 0.5)",
                }}
              >
                {name}
              </span>
            </div>

            {/* Hover: players ocupan toda la card */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-black/35" aria-hidden />
              <div className="relative h-full w-full p-3 overflow-auto">
                <div className="h-full flex flex-col justify-center gap-1">
                  {team.players!.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 py-1.5 border-b border-white/10 last:border-b-0 text-white text-sm sm:text-base"
                    >
                      <span className="w-4 shrink-0 text-white/80 font-medium tabular-nums">{i + 1}</span>
                      <CountryFlag countryCode={p.countryCode} className="w-4 shrink-0 rounded-[2px] overflow-hidden" />
                      <span className="font-medium truncate min-w-0">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
