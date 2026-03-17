import Image from "next/image"
import Link from "next/link"

interface NewsCardProps {
  image: string
  date: string
  title: string
  href: string
}

export function NewsCard({ image, date, title, href }: NewsCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(138,255,0,0.15)]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="pt-4">
          <time className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {date}
          </time>
          <h3 className="mt-2 text-sm font-medium leading-tight text-foreground md:text-base">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
