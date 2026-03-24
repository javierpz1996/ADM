import Link from "next/link";
import type { ArticleDetail } from "@/lib/noticias-articles";

interface ArticuloPrevNextProps {
  prev: ArticleDetail | null;
  next: ArticleDetail | null;
}

export function ArticuloPrevNext({ prev, next }: ArticuloPrevNextProps) {
  return (
    <nav
      className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      aria-label="Navegación entre noticias"
    >
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={`/noticias/${prev.slug}`}
            className="group inline-flex items-start gap-1 text-left text-sm font-medium leading-snug text-white/75 underline-offset-4 transition-colors hover:text-[#a78bfa] hover:underline"
          >
            <span className="shrink-0 text-[#a78bfa]" aria-hidden>
              &lt;
            </span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span className="invisible text-sm" aria-hidden>
            &nbsp;
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 sm:text-right">
        {next ? (
          <Link
            href={`/noticias/${next.slug}`}
            className="group inline-flex items-start justify-end gap-1 text-right text-sm font-medium leading-snug text-white/75 underline-offset-4 transition-colors hover:text-[#a78bfa] hover:underline sm:ml-auto"
          >
            <span>{next.title}</span>
            <span className="shrink-0 text-[#a78bfa]" aria-hidden>
              &gt;
            </span>
          </Link>
        ) : (
          <span className="invisible text-sm" aria-hidden>
            &nbsp;
          </span>
        )}
      </div>
    </nav>
  );
}
