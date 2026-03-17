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
  const isTBD = !team.players || team.players.length === 0;

  return (
    <div className="group relative">
      <div
        className={`absolute -inset-[1px] rounded-lg blur-sm transition-opacity duration-300 ${
          isTBD
            ? "bg-[#896afd]/25 opacity-60 group-hover:opacity-100"
            : "bg-[#a78bfa]/35 opacity-75 group-hover:opacity-100"
        }`}
      />

      <div
        className={`relative flex flex-col p-4 sm:p-5 rounded-lg aspect-square overflow-hidden transition-all duration-300 ${
          isTBD
            ? "border border-[#896afd]/60 group-hover:border-[#a78bfa]/90 shadow-[0_0_10px_rgba(137,106,253,0.3),inset_0_0_8px_rgba(137,106,253,0.04)] group-hover:shadow-[0_0_18px_rgba(137,106,253,0.5),0_0_28px_rgba(137,106,253,0.15),inset_0_0_10px_rgba(137,106,253,0.06)]"
            : "border border-[#a78bfa]/70 group-hover:border-[#c4b5fd] shadow-[0_0_14px_rgba(167,139,250,0.45),inset_0_0_10px_rgba(167,139,250,0.08)] group-hover:shadow-[0_0_22px_rgba(167,139,250,0.65),0_0_35px_rgba(196,181,253,0.25),inset_0_0_12px_rgba(167,139,250,0.12)]"
        }`}
      >
        {isTBD ? (
          <>
            <Image
              src="/images/tbd-test-3.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#080810]" />
            {/* Logo: visible por defecto, se oculta al hover */}
            {team.logoImage && (
              <div className="absolute inset-0 z-10 p-4 opacity-100 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <Image
                  src={team.logoImage}
                  alt={team.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            )}
            {/* Jugadores: ocultos por defecto, visibles al hover */}
            <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              {team.players!.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 py-2 border-b border-white/10 last:border-b-0 text-foreground text-xs sm:text-sm"
                >
                  <span className="w-5 shrink-0 text-muted-foreground font-medium tabular-nums">
                    {i + 1}
                  </span>
                  <CountryFlag countryCode={p.countryCode} className="w-5 shrink-0 rounded-[2px] overflow-hidden" />
                  <span className="font-medium truncate min-w-0">{p.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
