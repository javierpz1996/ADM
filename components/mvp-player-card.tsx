"use client";

import type { MVPPlayer } from "@/lib/mock-data";

interface MVPPlayerCardProps {
  player: MVPPlayer;
}

export function MVPPlayerCard({ player }: MVPPlayerCardProps) {
  const playerImage =
    player.image ??
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=750&fit=crop";
  const playerName = player.nickname;
  const realName = player.role ?? player.nickname;
  const logoSrc = player.teamLogoImage ?? "/images/team-1.png";

  return (
    <div className="relative h-[420px] w-[min(360px,85vw)] shrink-0 overflow-hidden sm:h-[440px] md:h-[450px] md:w-full md:shrink md:max-w-none">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-500">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M 50 20 L 60 35 L 40 35 Z" fill="#6B7280" opacity="0.7" />
          <path d="M 150 20 L 160 35 L 140 35 Z" fill="#6B7280" opacity="0.7" />
          <path d="M 250 20 L 260 35 L 240 35 Z" fill="#6B7280" opacity="0.7" />
          <path d="M 350 20 L 360 35 L 340 35 Z" fill="#6B7280" opacity="0.7" />
          <path d="M 450 20 L 460 35 L 440 35 Z" fill="#6B7280" opacity="0.7" />
          <path d="M 250 80 L 350 240 L 150 240 Z" fill="white" opacity="0.4" />
          <path d="M 250 150 L 380 340 L 120 340 Z" fill="white" opacity="0.2" />
          <path d="M 250 200 L 320 320 L 180 320 Z" fill="white" opacity="0.25" />
        </svg>
      </div>

      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-700 flex items-center justify-center">
        <div className="w-1.5 h-0.5 bg-neutral-800" />
      </div>
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-700 flex items-center justify-center">
        <div className="w-1.5 h-0.5 bg-neutral-800" />
      </div>
      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-700 flex items-center justify-center">
        <div className="w-1.5 h-0.5 bg-neutral-800" />
      </div>
      <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-neutral-600 border border-neutral-700 flex items-center justify-center">
        <div className="w-1.5 h-0.5 bg-neutral-800" />
      </div>

      <div className="absolute inset-0">
        <img
          src={playerImage}
          alt={playerName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* MVP badge (without SONY) */}
      <div
        className="absolute top-5 right-0 bg-black px-4 py-2 rounded-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
      >
        <div className="flex flex-col items-center ml-2">
          <span className="font-bold text-white text-4xl leading-none">MVP</span>
        </div>
      </div>

      <div className="absolute bottom-[76px] right-3 z-20 sm:right-4 md:right-5">
        <p className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
          Martin Perez
        </p>
      </div>

      {/* Logo + nombre a la derecha */}
      <div className="absolute bottom-3 right-2 z-20 flex justify-end shadow-2xl sm:right-3 md:right-4">
        <div
          className="flex h-14 w-full min-w-0 max-w-[96%] items-center justify-between bg-black py-2 pl-4 pr-6 sm:h-16 sm:pl-6 sm:pr-8 md:pl-7 md:pr-10"
          style={{
            clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <img
            src={logoSrc}
            alt={player.teamName}
            className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] sm:h-11 sm:w-11 md:h-12 md:w-12"
          />
          <h2 className="ml-3 text-right text-xl font-bold uppercase leading-none tracking-[0.05em] text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {playerName}
          </h2>
        </div>
      </div>
    </div>
  );
}

