import { ARTICLES_ORDER } from "./noticias-articles";

export type NoticiaGame = "all" | "dota2";

export interface NoticiaItem {
  id: string;
  title: string;
  image: string;
  href: string;
  game: Exclude<NoticiaGame, "all">;
  category: "esports";
  secondaryTag: string;
}

export const TEAM_FILTERS: { key: NoticiaGame; label: string }[] = [
  { key: "all", label: "All" },
  { key: "dota2", label: "Dota 2" },
];

export const NOTICIAS_LIST: NoticiaItem[] = ARTICLES_ORDER.map((a, idx) => ({
  id: String(idx + 1),
  title: a.title,
  image: a.image,
  href: `/noticias/${a.slug}`,
  game: "dota2" as const,
  category: "esports" as const,
  secondaryTag: a.secondaryTag,
}));

const featured = ARTICLES_ORDER[0]!;
export const FEATURED_NOTICIA = {
  title: featured.title,
  image: featured.image,
  href: `/noticias/${featured.slug}`,
  badge: "Esports",
} as const;
