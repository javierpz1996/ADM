"use client";

import { useState } from "react";
import { NewsCard } from "./news-card";

const initialNews = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "February 11, 2026",
    title: "Before the Horn – More Teams, More Dota",
    href: "#",
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "December 19, 2025",
    title: "ESL Pro Tour DreamLeague & Division 2 – Additional Information",
    href: "#",
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "September 8, 2025",
    title: "EPT Season 2025/2026 Event Overview",
    href: "#",
  },
];

const moreNews = [
  {
    id: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "August 15, 2025",
    title: "Championship Finals – Road to Glory",
    href: "#",
  },
  {
    id: 5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "July 22, 2025",
    title: "New Season Roster Changes Announced",
    href: "#",
  },
  {
    id: 6,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m5aiS9KP2ZBzhDgtrB1I2QESdDFyVk.png",
    date: "June 10, 2025",
    title: "Regional Qualifiers – Format and Schedule",
    href: "#",
  },
];

export function LatestNews() {
  const [news, setNews] = useState(initialNews);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setNews([...news, ...moreNews]);
    setHasMore(false);
  };

  return (
    <section className="bg-background px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-black uppercase italic tracking-tight text-[--neon-green] md:text-5xl lg:text-6xl">
          Latest News
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              date={item.date}
              title={item.title}
              href={item.href}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="border-2 border-[--neon-green]/30 bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-[--neon-green] transition-all duration-300 hover:border-[--neon-green] hover:bg-[--neon-green]/10 hover:shadow-[0_0_20px_rgba(138,255,0,0.2)]"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
