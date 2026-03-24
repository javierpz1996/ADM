import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticuloNoticiaView } from "@/components/noticias/articulo-noticia-view";
import {
  ARTICLES_ORDER,
  getArticleBySlug,
  getNeighbors,
} from "@/lib/noticias-articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES_ORDER.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Noticia" };
  return {
    title: `${article.title} | Noticias Argentina Dota Masters`,
    description: article.excerpt,
  };
}

export default async function NoticiaArticuloPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { prev, next } = getNeighbors(slug);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] pt-14 text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#020617_0%,#0a0f1c_45%,#020617_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(99,102,241,0.14),transparent_58%)]"
        aria-hidden
      />
      <Navbar />
      <div className="relative z-10">
        <ArticuloNoticiaView article={article} prev={prev} next={next} />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
