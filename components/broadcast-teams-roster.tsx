"use client";

import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { hasFlag } from "country-flag-icons";
import {
  broadcastRosterTeams,
  PLACEHOLDER_PHOTO,
  type BroadcastRosterTeam,
} from "@/lib/broadcast-roster-data";

function CountryFlag({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) {
  const code = countryCode.toUpperCase();
  if (!hasFlag(code)) return null;
  const Flag = (
    FlagIcons as Record<
      string,
      ComponentType<{ title?: string; className?: string }>
    >
  )[code];
  if (!Flag) return null;
  return <Flag title={code} className={className} />;
}

const rowInnerStyle: CSSProperties = {
  background:
    "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
};

function TeamBroadcastRow({ team }: { team: BroadcastRosterTeam }) {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-none opacity-80"
        style={{
          background:
            "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
          filter: "blur(4px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-none"
        style={{
          background:
            "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
        }}
        aria-hidden
      />
      <div
        className="relative flex min-h-0 w-full flex-row items-stretch overflow-hidden rounded-none"
        style={rowInnerStyle}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-none opacity-15 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/aegis-fondo.png)",
            backgroundSize: "170%",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-none opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 w-[118px] shrink-0 flex-col items-center justify-center overflow-hidden border-r border-white/15 px-2 py-2 sm:w-[140px] sm:px-3 sm:py-2.5">
          <div
            className="pointer-events-none absolute inset-0 rounded-none"
            style={{
              background:
                "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-none bg-center bg-no-repeat opacity-25"
            style={{
              backgroundImage: "url(/images/aegis-fondo.png)",
              backgroundSize: "170%",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-1 text-center sm:gap-1.5">
            <div className="relative h-[94px] w-full max-w-[114px] sm:h-[106px] sm:max-w-[136px]">
              {team.logoImage ? (
                <Image
                  src={team.logoImage}
                  alt=""
                  fill
                  className="object-contain object-center drop-shadow-[0_0_8px_rgba(139,92,246,0.55)]"
                  sizes="(max-width: 640px) 136px, 160px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span
                    className="text-xl font-black text-[#a78bfa] drop-shadow sm:text-2xl"
                    style={{ textShadow: "0 0 8px rgba(167, 139, 250, 0.5)" }}
                  >
                    {team.logoText}
                  </span>
                </div>
              )}
            </div>
            <p
              className="relative w-full shrink-0 text-center text-[17px] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-[21px] md:text-[22px]"
              style={{
                color: "#a78bfa",
                textShadow: "0 0 8px rgba(167, 139, 250, 0.5)",
              }}
            >
              {team.name}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-row">
          {team.players.map((p, i) => (
            <div
              key={p.id}
              className={`flex min-w-[56px] flex-1 flex-col border-white/15 sm:min-w-[88px] md:min-w-[102px] lg:min-w-[116px] ${
                i < team.players.length - 1 ? "border-r" : ""
              }`}
            >
              <div className="relative h-[118px] w-full bg-[#0f172a] sm:h-[132px] md:h-[144px] lg:h-[152px]">
                <Image
                  src={PLACEHOLDER_PHOTO}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 16vw, 220px"
                />
              </div>
              <div className="flex min-h-[30px] items-center gap-0.5 border-t border-white/10 bg-black/25 px-1 py-0.5 sm:min-h-[34px] sm:px-1.5">
                <CountryFlag
                  countryCode={p.countryCode}
                  className="h-2.5 w-3.5 shrink-0 rounded-[1px] sm:h-3 sm:w-[18px]"
                />
                <span className="truncate font-sans text-[12px] font-semibold tracking-[0.06em] text-white sm:text-[14px] md:text-[15px]">
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BroadcastTeamsRoster() {
  const left = broadcastRosterTeams.slice(0, 4);
  const right = broadcastRosterTeams.slice(4, 8);

  return (
    <section
      className="relative min-h-screen overflow-hidden pb-16 pt-20 font-sans text-white"
      aria-label="Equipos — formato broadcast"
    >
      <div className="relative z-10 mx-auto w-full max-w-[min(100%,1680px)] px-3 sm:px-6 lg:px-10">
        <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <h1
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "'Bison Bold', sans-serif" }}
          >
            <span className="block text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Argentina Dota Masters
            </span>
            <span
              className="mt-2 block bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent sm:mt-3"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
              }}
            >
              Equipos participantes
            </span>
          </h1>
          <div
            className="mx-auto mt-6 h-1.5 w-20 shrink-0 bg-white/70"
            aria-hidden
          />
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            {left.map((team) => (
              <TeamBroadcastRow key={team.id} team={team} />
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {right.map((team) => (
              <TeamBroadcastRow key={team.id} team={team} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
