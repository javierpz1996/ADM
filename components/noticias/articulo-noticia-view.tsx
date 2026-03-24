import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ArticleDetail } from "@/lib/noticias-articles";
import { ArticuloPrevNext } from "./articulo-prev-next";
import { DiscordCtaBanner } from "./discord-cta-banner";
import { NoticiaHeroScroll } from "./noticia-hero-scroll";

interface ArticuloNoticiaViewProps {
  article: ArticleDetail;
  prev: ArticleDetail | null;
  next: ArticleDetail | null;
}

export function ArticuloNoticiaView({
  article,
  prev,
  next,
}: ArticuloNoticiaViewProps) {
  return (
    <div className="w-full">
      <NoticiaHeroScroll title={article.title} />

      <div className="relative z-10 w-full bg-[#020617] pt-6 shadow-[0_-20px_50px_rgba(0,0,0,0.55)] sm:pt-7">
        <div className="mx-auto w-full max-w-[960px] px-4 pb-16 sm:px-6 lg:px-8">
          <Link
            href="/noticias"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            Back to All News
          </Link>

          <header className="mb-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-0">
                <span className="inline-flex items-center rounded-none bg-gradient-to-r from-[#7c3aed]/90 to-[#6366f1]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white sm:text-[11px]">
                  Esports
                </span>
                <span className="inline-flex items-center rounded-none bg-[#312e81] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#c4b5fd] sm:text-[11px]">
                  {article.secondaryTag}
                </span>
              </div>
              <time
                className="text-xs font-normal text-white/45 sm:text-sm"
                dateTime={article.date}
              >
                {article.date}
              </time>
            </div>
            <div className="h-px w-full bg-white/15" aria-hidden />
            <h1
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.5rem]"
              style={{ fontFamily: "'Bison Bold', sans-serif" }}
            >
              {article.title}
            </h1>
            <p className="mt-3 font-sans text-base leading-relaxed text-white/80 sm:text-lg">
              {article.excerpt}
            </p>
          </header>

          <div className="space-y-4 font-sans text-[15px] leading-relaxed text-white/85 sm:text-base">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <ArticuloPrevNext prev={prev} next={next} />

          <div className="mt-10">
            <DiscordCtaBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
