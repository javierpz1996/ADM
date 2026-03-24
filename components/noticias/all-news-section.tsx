"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  TEAM_FILTERS,
  NOTICIAS_LIST,
  type NoticiaGame,
} from "@/lib/noticias-data";
import { NoticiaRowCard } from "./noticia-row-card";

const CATEGORIES = [{ value: "esports", label: "Esports" }] as const;

export function AllNewsSection() {
  const [activeTeam, setActiveTeam] = useState<NoticiaGame>("all");
  const [category, setCategory] = useState<string>("esports");

  const filtered = useMemo(() => {
    return NOTICIAS_LIST.filter((item) => {
      if (activeTeam !== "all" && item.game !== activeTeam) return false;
      if (category && item.category !== category) return false;
      return true;
    });
  }, [activeTeam, category]);

  return (
    <section className="w-full">
      <h2
        className="mb-5 text-3xl font-black uppercase tracking-tight text-white md:mb-6 md:text-4xl lg:text-5xl"
        style={{ fontFamily: "'Bison Bold', sans-serif" }}
      >
        All News
      </h2>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between md:mb-7">
        <div className="flex flex-wrap gap-1">
          {TEAM_FILTERS.map(({ key, label }) => {
            const isActive = activeTeam === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTeam(key)}
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors sm:text-sm",
                  isActive
                    ? "border-transparent bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-[0_0_16px_rgba(99,102,241,0.35)]"
                    : "border-white/20 bg-transparent text-white/90 hover:border-[#a78bfa]/50 hover:bg-white/5",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-sm font-semibold text-white/80">Category</span>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none rounded-lg border border-white/20 bg-[#1e1b4b]/90 py-2.5 pl-4 pr-10 text-sm font-semibold text-white outline-none focus:border-[#a78bfa]/60 focus:ring-2 focus:ring-[#6366f1]/30"
              aria-label="Categoría"
            >
              {CATEGORIES.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  className="bg-[#1e1b4b] text-white"
                >
                  {c.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a78bfa]">
              <ChevronDown className="h-4 w-4" aria-hidden strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {filtered.map((item) => (
          <NoticiaRowCard
            key={item.id}
            title={item.title}
            image={item.image}
            href={item.href}
            secondaryTag={item.secondaryTag}
          />
        ))}
      </div>
    </section>
  );
}
