"use client";

import Image from "next/image";

export interface TalentData {
  id: string;
  name: string;
  image: string;
}

interface TalentCardProps {
  talent: TalentData;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <article className="group relative w-full cursor-pointer select-none">
      <div
        className="absolute -inset-[2px] rounded-none opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
          filter: "blur(4px)",
        }}
      />

      <div
        className="absolute -inset-[1px] rounded-none"
        style={{
          background:
            "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
        }}
      />

      <div
        className="relative h-full overflow-hidden rounded-none transition-transform duration-500 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
        }}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={talent.image}
            alt={`${talent.name} - RU Broadcast Talent`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover object-top transition-all duration-500 group-hover:scale-110"
          />

          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(204, 0, 255, 0.22) 0%, rgba(0, 231, 255, 0.16) 100%)",
              mixBlendMode: "multiply",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-55"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(2, 6, 23, 0.08) 20%, rgba(2, 6, 23, 0.52) 100%)",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, oklch(0.06 0.005 60 / 0.7) 100%)",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.07 0.006 60 / 0.9))",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, oklch(0.95 0.1 75 / 0.15) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: "none",
            }}
            aria-hidden="true"
          />
        </div>

        <div
          className="relative z-20 w-full border-t border-white/25 px-2 py-2 text-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(3,7,18,0.72), rgba(3,7,18,0.78)), url(/images/fondo-piedra-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span
            className="block bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent sm:text-sm"
            style={{
              filter:
                "drop-shadow(0 0 12px rgba(204, 0, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 231, 255, 0.4))",
            }}
          >
            {talent.name}
          </span>
        </div>

      </div>
    </article>
  );
}
