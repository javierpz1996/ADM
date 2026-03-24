import Image from "next/image";
import Link from "next/link";

interface FeaturedNewsHeroProps {
  title: string;
  image: string;
  href: string;
  badge?: string;
}

export function FeaturedNewsHero({
  title,
  image,
  href,
  badge = "Esports",
}: FeaturedNewsHeroProps) {
  return (
    <section className="w-full">
      <h2
        className="mb-4 text-3xl font-black uppercase tracking-tight text-white sm:mb-5 sm:text-4xl md:text-5xl lg:mb-5 lg:text-6xl"
        style={{ fontFamily: "'Bison Bold', sans-serif" }}
      >
        Featured News
      </h2>

      <Link
        href={href}
        className="relative block aspect-[21/9] min-h-[220px] w-full overflow-hidden rounded-none ring-1 ring-white/10 md:min-h-[300px] lg:min-h-[360px]"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
          <span
            className="inline-flex rounded-none bg-gradient-to-r from-[#7c3aed] to-[#6366f1] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_12px_rgba(99,102,241,0.45)] md:px-3.5 md:py-1.5 md:text-sm"
          >
            {badge}
          </span>
          <h3
            className="mt-1.5 max-w-5xl text-2xl font-bold leading-[1.12] text-white md:mt-2 md:text-3xl lg:text-4xl xl:text-5xl"
            style={{ fontFamily: "'Bison Bold', sans-serif" }}
          >
            {title}
          </h3>
        </div>
      </Link>
    </section>
  );
}
