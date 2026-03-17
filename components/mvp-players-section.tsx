"use client";

import { useRef } from "react";
import { mvpPlayers } from "@/lib/mock-data";
import { MVPPlayerCard } from "@/components/mvp-player-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MVPPlayersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="mvp" className="relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#050510] to-[#030712] py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#896afd]/12 blur-[100px]" />
        <div className="absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#a78bfa]/12 blur-[100px]" />
      </div>
      
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Título + flechas: max-w-7xl */}
        <div className="mx-auto max-w-7xl">
          <div className="flex w-full items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                MVP Players
              </h2>
              <p className="text-sm text-[#a78bfa]/80">
                Top performing players of the tournament
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-10 w-10 border-[#896afd]/40 bg-[#030712]/60 text-[#896afd] hover:border-[#896afd]/70 hover:bg-[#896afd]/20 hover:text-[#a78bfa]"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-10 w-10 border-[#896afd]/40 bg-[#030712]/60 text-[#896afd] hover:border-[#896afd]/70 hover:bg-[#896afd]/20 hover:text-[#a78bfa]"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Cards: ancho completo, sin max-w */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex justify-center gap-5 overflow-x-auto scroll-smooth pb-6 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {mvpPlayers.slice(0, 5).map((player) => (
            <MVPPlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Texto debajo de las cards: max-w-7xl */}
        <div className="mx-auto mt-4 flex w-full max-w-7xl flex-row flex-wrap items-center justify-between gap-6 sm:gap-8">
          <span className="px-5 py-3 rounded-none text-sm font-black uppercase tracking-wider max-w-xl" style={{ backgroundColor: "#896afd", backgroundImage: "radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 35%, transparent 60%)", boxShadow: "0 0 25px rgba(137, 106, 253, 0.8), 0 0 50px rgba(137, 106, 253, 0.4)", color: "#1a1a1a", textShadow: "0 0 12px rgba(137, 106, 253, 0.8), 0 0 4px rgba(255,255,255,0.4)" }}>
            The players who made the biggest impact this tournament.
          </span>
          <span className="text-sm sm:text-base font-bold text-white border border-[#896afd] px-4 py-2">
            — Our Beasts
          </span>
        </div>

        {/* Mobile scroll hint */}
        <p className="mt-4 text-center text-xs text-[#a78bfa]/60 sm:hidden">
          Swipe to see more players
        </p>
      </div>
    </section>
  );
}
