"use client";

import { useState } from "react";
import { NewsCard } from "./news-card";

const initialNews = [
  {
    id: 1,
    image: "/images/noticia-1.jpg",
    date: "February 11, 2026",
    title: "Before the Horn – More Teams, More Dota",
    href: "#",
  },
  {
    id: 2,
    image: "/images/noticia-1.jpg",
    date: "December 19, 2025",
    title: "ESL Pro Tour DreamLeague & Division 2 – Additional Information",
    href: "#",
  },
  {
    id: 3,
    image: "/images/noticia-1.jpg",
    date: "September 8, 2025",
    title: "EPT Season 2025/2026 Event Overview",
    href: "#",
  },
  {
    id: 4,
    image: "/images/noticia-1.jpg",
    date: "August 15, 2025",
    title: "Championship Finals – Road to Glory",
    href: "#",
  },
];

const moreNews = [
  {
    id: 5,
    image: "/images/noticia-1.jpg",
    date: "July 22, 2025",
    title: "New Season Roster Changes Announced",
    href: "#",
  },
  {
    id: 6,
    image: "/images/noticia-1.jpg",
    date: "June 10, 2025",
    title: "Regional Qualifiers – Format and Schedule",
    href: "#",
  },
];

export function LatestNews() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedNews = isExpanded ? [...initialNews, ...moreNews] : initialNews;
  const handleToggle = () => setIsExpanded((v) => !v);

  return (
    <section
      id="news"
      className="relative bg-[#060d14] px-4 py-20 sm:py-24 md:py-28 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <h2 className="mb-12 text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
          Latest News
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {displayedNews.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              date={item.date}
              title={item.title}
              href={item.href}
            />
          ))}
        </div>

        {moreNews.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggle}
              className="relative inline-block bg-transparent p-0 text-left"
            >
              <div
                className="absolute -inset-[2px] rounded-none opacity-80"
                style={{
                  background:
                    "linear-gradient(180deg, #7c3aed 0%, #4f46e5 25%, #6366f1 50%, #4f46e5 75%, #7c3aed 100%)",
                  filter: "blur(4px)",
                }}
                aria-hidden
              />

              <div
                className="absolute -inset-[1px] rounded-none"
                style={{
                  background:
                    "linear-gradient(180deg, #a78bfa 0%, #818cf8 30%, #6366f1 50%, #818cf8 70%, #a78bfa 100%)",
                }}
                aria-hidden
              />

              <div
                className="relative rounded-none overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0a2e 100%)",
                }}
              >
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
                  {isExpanded ? "Leer menos" : "Load More"}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
