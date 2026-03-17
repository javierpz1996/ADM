import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { DM_Sans, Staatliches, Bebas_Neue, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const streetHipster = localFont({
  src: '../public/fonts/Street Hipster.ttf',
  variable: '--font-street-hipster',
  display: 'swap',
});

const jamstreetGraffiti = localFont({
  src: '../public/fonts/JamstreetGraffiti.ttf',
  variable: '--font-jamstreet-graffiti',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
});

const staatliches = Staatliches({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-staatliches',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-most-wanted',
});

export const metadata: Metadata = {
  title: 'Dota 2 Championship 2026 | Official Tournament',
  description: 'Join the ultimate Dota 2 tournament featuring the best teams from around the world competing for a $2,000,000 prize pool.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${streetHipster.variable} ${jamstreetGraffiti.variable} ${dmSans.variable} ${staatliches.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
