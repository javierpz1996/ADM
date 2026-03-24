export interface ArticleDetail {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  secondaryTag: string;
  body: string[];
}

/** Orden = cadena anterior / siguiente */
export const ARTICLES_ORDER: ArticleDetail[] = [
  {
    slug: "february-rundown",
    title: "February Rundown - Another Rollercoaster Month",
    excerpt:
      "Un repaso a lo más destacado del mes: resultados, sorpresas y lo que viene en el circuito competitivo.",
    date: "Feb 1, 2026",
    image: "/images/noticia-1.jpg",
    secondaryTag: "DOTA2",
    body: [
      "Febrero dejó otra tanda de series inolvidables y clasificaciones que definen el rumbo hacia los eventos más grandes del año.",
      "Los equipos de la región siguen afinando estrategias y el meta no deja de moverse entre parches y torneos online.",
      "En las próximas semanas esperamos anuncios de formato, fechas clave y nuevos enfrentamientos que marcarán la temporada.",
    ],
  },
  {
    slug: "heroic-win-latam-dota",
    title: "HEROIC Win Another Title for LATAM Dota",
    excerpt:
      "El roster demuestra otra vez por qué es referente en Sudamérica con una actuación sólida de punta a punta.",
    date: "Oct 13, 2025",
    image: "/images/noticia-1.jpg",
    secondaryTag: "DOTA2",
    body: [
      "HEROIC suma un nuevo trofeo para la región tras una final exigente donde el draft y la ejecución en teamfights marcaron la diferencia.",
      "El equipo mantuvo la calma en momentos clave y supo cerrar mapas que parecían abiertos, aprovechando errores puntuales del rival.",
      "Los jugadores destacaron por la versatilidad en roles y por lecturas de mapa que permitieron controlar objetivos sin ceder presión innecesaria.",
      "Con este resultado, HEROIC refuerza su posición en el circuito y suma confianza de cara a los próximos compromisos internacionales.",
    ],
  },
  {
    slug: "heroic-ti-latam",
    title: "HEROIC Take Historic Finish for LATAM at The International",
    excerpt:
      "Una actuación memorable en TI que quedará en la historia de la escena latinoamericana.",
    date: "Sep 20, 2025",
    image: "/images/noticia-1.jpg",
    secondaryTag: "DOTA2",
    body: [
      "La escuadra completó una campaña memorable en The International, superando expectativas y dejando series para el recuerdo.",
      "El apoyo regional se hizo sentir en cada transmisión, con la comunidad celebrando cada victoria como propia.",
      "El camino incluyó remontadas y partidos tensos donde la preparación mental fue tan importante como la mecánica individual.",
    ],
  },
  {
    slug: "dreamleague-s25",
    title: "DreamLeague Season 25 — Groups Announced",
    excerpt:
      "Ya están definidos los grupos; calendario cargado y cruces que prometen partidos de alto nivel.",
    date: "Aug 12, 2025",
    image: "/images/noticia-1.jpg",
    secondaryTag: "DOTA2",
    body: [
      "DreamLeague presentó el formato de grupos para la temporada 25, con equipos top de varias regiones.",
      "Los enfrentamientos iniciales ya generan debate entre aficionados y analistas sobre favoritos y posibles sorpresas.",
      "Se espera alta densidad de partidos; cada serie puede pesar de cara a la fase siguiente del torneo.",
    ],
  },
  {
    slug: "patch-meta",
    title: "Patch Analysis — Meta Shifts in Pro Play",
    excerpt:
      "Cómo los últimos cambios están redibujando prioridades de picks y ritmo de juego en escena competitiva.",
    date: "Jul 3, 2025",
    image: "/images/noticia-1.jpg",
    secondaryTag: "DOTA2",
    body: [
      "El parche actual empuja a replantear rotaciones, vision y timings de objetivos según los lineups más jugados en scrims.",
      "Los supports con herramientas de iniciación vuelven a cobrar relevancia cuando el mapa se fragmenta en mid game.",
      "Los equipos que mejor adapten su pool en pocas semanas tendrán ventaja en torneos con formato compacto.",
    ],
  },
];

export function getArticleBySlug(slug: string): ArticleDetail | undefined {
  return ARTICLES_ORDER.find((a) => a.slug === slug);
}

export function getNeighbors(slug: string): {
  prev: ArticleDetail | null;
  next: ArticleDetail | null;
} {
  const i = ARTICLES_ORDER.findIndex((a) => a.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? ARTICLES_ORDER[i - 1]! : null,
    next: i < ARTICLES_ORDER.length - 1 ? ARTICLES_ORDER[i + 1]! : null,
  };
}
