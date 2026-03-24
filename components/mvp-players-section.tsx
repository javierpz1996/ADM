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
      const scrollAmount = 360;
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
        {/* Título + flechas (estilo referencia) */}
        <div className="mb-4 w-full max-w-[1500px] lg:mx-auto">
          <div className="flex w-full items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                MVP Players
              </h2>
              <p
                className="mt-2 text-[10px] font-bold uppercase tracking-tight bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-transparent sm:text-xs md:text-sm"
                style={{
                  filter:
                    "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
                }}
              >
                Top performing players of the tournament
              </p>
              
            </div>

                

            <div className="hidden shrink-0 gap-2 sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-12 w-12 border-[#896afd]/40 bg-[#030712]/60 text-[#896afd] hover:border-[#896afd]/70 hover:bg-[#896afd]/20 hover:text-[#a78bfa]"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-12 w-12 border-[#896afd]/40 bg-[#030712]/60 text-[#896afd] hover:border-[#896afd]/70 hover:bg-[#896afd]/20 hover:text-[#a78bfa]"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 4 cards + footer: mismo ancho que la fila de referencia */}
        <div className="mx-auto w-full max-w-[1500px]">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pt-2 sm:gap-5 md:grid md:snap-none md:grid-cols-4 md:gap-4 md:overflow-visible lg:gap-5"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {Array.from({ length: 4 }).map((_, idx) => {
              const player = mvpPlayers[0]
              if (!player) return null

              return (
                <div
                  key={`${player.id}-${idx}`}
                  className="min-w-0 shrink-0 snap-center md:w-full"
                >
                  <MVPPlayerCard player={player} />
                </div>
              )
            })}
          </div>

        {/* Texto debajo alineado con bordes de las 4 cards */}
        <div className="mt-6 flex w-full flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="mt-2 relative inline-block">
            {/* Neon glow effect (mismo look que teams-section) */}
            <div
              className="absolute -inset-[2px] rounded-none opacity-80"
              style={{
                background:
                  "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                filter: "blur(4px)",
              }}
              aria-hidden
            />

            {/* Neon border */}
            <div
              className="absolute -inset-[1px] rounded-none"
              style={{
                background:
                  "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
              }}
              aria-hidden
            />

            {/* Card container */}
            <div
              className="relative rounded-none overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
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
                  background:
                    "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                }}
                aria-hidden
              />

              <span
                className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
              >
                The players who made the biggest impact this tournament.
              </span>
            </div>
          </div>
          <div className="mt-2 relative inline-block">
            {/* Neon glow effect (mismo look que el bloque de arriba) */}
            <div
              className="absolute -inset-[2px] rounded-none opacity-80"
              style={{
                background:
                  "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                filter: "blur(4px)",
              }}
              aria-hidden
            />

            {/* Neon border */}
            <div
              className="absolute -inset-[1px] rounded-none"
              style={{
                background:
                  "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
              }}
              aria-hidden
            />

            {/* Card container */}
            <div
              className="relative rounded-none overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
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
                  background:
                    "radial-gradient(ellipse at center top, #8b5cf6 0%, transparent 60%)",
                }}
                aria-hidden
              />

              <span
                className="relative block px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider text-white"
                style={{ textShadow: "0 0 4px rgba(255,255,255,0.4)" }}
              >
                — Our Beasts
              </span>
            </div>
          </div>
        </div>
        </div>

        {/* Mobile scroll hint */}
        <p className="mt-4 text-center text-xs text-[#a78bfa]/60 lg:hidden">
          Deslizá para ver los jugadores
        </p>
      </div>
    </section>
  );
}
