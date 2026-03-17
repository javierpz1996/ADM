"use client";

import { Card } from "@/components/ui/card";
import type { MVPPlayer } from "@/lib/mock-data";

interface MVPPlayerCardProps {
  player: MVPPlayer;
}

export function MVPPlayerCard({ player }: MVPPlayerCardProps) {
  return (
    <Card className="group relative min-w-[240px] max-w-[240px] overflow-hidden gap-4 py-0 border-2 border-[#896afd]/50 bg-gradient-to-b from-[#030712]/95 to-[#050510]/95 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(137,106,253,0.15),inset_0_0_30px_rgba(137,106,253,0.03)] hover:border-[#a78bfa]/80 hover:shadow-[0_0_35px_rgba(137,106,253,0.4),0_0_60px_rgba(167,139,250,0.2),inset_0_0_40px_rgba(137,106,253,0.06)]">
      {/* Neon glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#896afd]/0 via-[#a78bfa]/0 to-[#896afd]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-15 pointer-events-none" />
      
      {/* Top neon line + glow */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#896afd] to-transparent opacity-90 shadow-[0_0_10px_#896afd,0_0_20px_rgba(137,106,253,0.6)]" />
      
      {/* Team logo - arriba izquierda, un poco más grande */}
      {player.teamLogoImage ? (
        <img
          src={player.teamLogoImage}
          alt={player.teamName}
          className="absolute left-1 top-8 z-10 h-16 w-16 object-contain"
        />
      ) : null}

      {/* Player Image - 10px padding + particles + neon frame */}
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden p-4">
        {/* Particle background - behind image */}
        <div className="absolute inset-0 z-0">
          {[
            { left: "10%", top: "20%", size: "w-1.5 h-1.5", delay: "0s" },
            { left: "25%", top: "60%", size: "w-1 h-1", delay: "0.5s" },
            { left: "45%", top: "15%", size: "w-2 h-2", delay: "1s" },
            { left: "60%", top: "70%", size: "w-1 h-1", delay: "0.2s" },
            { left: "75%", top: "30%", size: "w-1.5 h-1.5", delay: "1.5s" },
            { left: "85%", top: "55%", size: "w-1 h-1", delay: "0.8s" },
            { left: "15%", top: "75%", size: "w-1 h-1", delay: "1.2s" },
            { left: "55%", top: "45%", size: "w-2 h-2", delay: "0.3s" },
            { left: "35%", top: "80%", size: "w-1.5 h-1.5", delay: "2s" },
            { left: "70%", top: "10%", size: "w-1 h-1", delay: "0.6s" },
            { left: "5%", top: "45%", size: "w-1 h-1", delay: "1.8s" },
            { left: "90%", top: "40%", size: "w-1.5 h-1.5", delay: "0.4s" },
            { left: "50%", top: "85%", size: "w-1 h-1", delay: "1.1s" },
            { left: "20%", top: "35%", size: "w-2 h-2", delay: "0.9s" },
            { left: "80%", top: "75%", size: "w-1 h-1", delay: "0.7s" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-[#896afd] shadow-[0_0_8px_#896afd,0_0_16px_rgba(137,106,253,0.6)] animate-particle-float ${p.size}`}
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                opacity: 0.6,
              }}
            />
          ))}
          {[
            { left: "30%", top: "25%", size: "w-1 h-1", delay: "0.4s" },
            { left: "65%", top: "50%", size: "w-1.5 h-1.5", delay: "1.6s" },
            { left: "40%", top: "65%", size: "w-1 h-1", delay: "0.9s" },
            { left: "12%", top: "50%", size: "w-1 h-1", delay: "2.1s" },
            { left: "88%", top: "20%", size: "w-1 h-1", delay: "0.3s" },
          ].map((p, i) => (
            <div
              key={`b-${i}`}
              className={`absolute rounded-full bg-[#a78bfa]/80 shadow-[0_0_6px_#a78bfa] animate-particle-float ${p.size}`}
              style={{ left: p.left, top: p.top, opacity: 0.5, animationDelay: p.delay }}
            />
          ))}
        </div>
        <div className="absolute inset-0 z-[1] shadow-[inset_0_0_40px_rgba(137,106,253,0.08)] group-hover:shadow-[inset_0_0_50px_rgba(137,106,253,0.12)] transition-shadow duration-300 pointer-events-none" />
        {player.image ? (
          <img src={player.image} alt={player.nickname} className="relative z-10 h-full w-full rounded-sm object-cover object-center" />
        ) : (
          <span className="relative z-10 text-5xl font-bold text-[#a78bfa]">{player.avatar}</span>
        )}
      </div>

      {/* Player Info - Below Image (misma fuente que hero: DM Sans) */}
      <div className="relative space-y-0.5 px-4 pb-3 [font-family:var(--font-dm-sans),sans-serif]">
        {/* Player Name */}
        <h3 className="text-center text-xl font-bold tracking-wide text-white transition-all duration-300 group-hover:text-[#a78bfa] [text-shadow:0_0_20px_rgba(167,139,250,0.5)] group-hover:[text-shadow:0_0_25px_rgba(167,139,250,0.8),0_0_40px_rgba(137,106,253,0.4)]">
          {player.nickname}
        </h3>

        {/* Team Name */}
        <p className="text-center text-sm text-[#a78bfa]/80">
          {player.teamName}
        </p>

        {/* KDA Stat */}
        <div className="flex items-center justify-center gap-2 rounded-lg bg-[#030712]/80 border border-[#896afd]/40 px-4 py-1.5 mt-1 shadow-[0_0_15px_rgba(137,106,253,0.2)] group-hover:border-[#896afd]/60 group-hover:shadow-[0_0_20px_rgba(137,106,253,0.35)] transition-all duration-300">
          <span className="text-xs font-medium uppercase tracking-wider text-[#896afd]">KDA</span>
          <span className="text-sm font-bold text-white">{player.kda}</span>
        </div>
      </div>

      {/* Bottom neon line + glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#896afd] to-transparent opacity-90 shadow-[0_0_10px_#896afd,0_0_20px_rgba(137,106,253,0.5)]" />
      {/* Side neon accents */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#896afd]/60 via-[#a78bfa]/40 to-[#896afd]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#896afd]" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#896afd]/60 via-[#a78bfa]/40 to-[#896afd]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#896afd]" />
    </Card>
  );
}
