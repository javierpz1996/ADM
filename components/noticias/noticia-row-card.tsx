import Image from "next/image";
import Link from "next/link";

export interface NoticiaRowCardProps {
  title: string;
  image: string;
  href: string;
  secondaryTag: string;
}

/**
 * Tarjeta horizontal al estilo ADM: gradiente violeta oscuro, borde suave, pills violeta.
 */
export function NoticiaRowCard({
  title,
  image,
  href,
  secondaryTag,
}: NoticiaRowCardProps) {
  return (
    <Link href={href} className="group block">
      <article
        className="flex flex-row items-stretch gap-3 rounded-none border border-white/15 bg-gradient-to-br from-[#1e1b4b]/95 via-[#1e1b4b]/85 to-[#0f0a2e] p-3 shadow-[0_0_24px_rgba(0,0,0,0.25)] transition-[box-shadow,border-color] duration-200 hover:border-[#a78bfa]/40 hover:shadow-[0_0_28px_rgba(99,102,241,0.15)] sm:gap-4 sm:p-[14px]"
      >
        <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-none ring-1 ring-white/10 sm:h-[84px] sm:w-[124px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 108px, 124px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <h3 className="text-left text-sm font-bold leading-snug text-white sm:text-[15px]">
            {title}
          </h3>
          <div className="flex flex-wrap gap-0">
            <span className="inline-flex items-center rounded-none bg-gradient-to-r from-[#7c3aed]/90 to-[#6366f1]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:text-[11px]">
              Esports
            </span>
            <span className="inline-flex items-center rounded-none bg-[#312e81] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#c4b5fd] sm:text-[11px]">
              {secondaryTag}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
