import Image from "next/image";

const HERO_IMAGE = "/images/hero-test-news.png";

/** Mismo alto para el bloque fijo y el espaciador del flujo */
const heroHeightClass =
  "h-[clamp(260px,42vw,460px)] sm:h-[clamp(300px,36vw,min(58vh,640px))] lg:h-[clamp(320px,34vw,min(56vh,680px))]";

interface NoticiaHeroScrollProps {
  title: string;
}

/**
 * Hero fijo bajo el navbar (z bajo). El artículo con z mayor y fondo sólido
 * se superpone al hacer scroll.
 */
export function NoticiaHeroScroll({ title }: NoticiaHeroScrollProps) {
  return (
    <>
      <div
        className={`fixed left-0 right-0 top-14 z-[1] overflow-hidden border-b border-white/10 bg-[#020617] ${heroHeightClass}`}
        aria-label="Cabecera visual de la noticia"
      >
        <Image
          src={HERO_IMAGE}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>
      {/* Misma altura en el flujo para que el texto empiece debajo y el scroll tape el hero */}
      <div className={`relative w-full shrink-0 ${heroHeightClass}`} aria-hidden />
    </>
  );
}
