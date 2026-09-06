import type { Metadata, Viewport } from "next"
import "./globals.css"

const SITE = "https://nora-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Nora Fatehi | Films, Showtimes & Performances",
    template: "%s | Nora Fatehi",
  },
  description:
    "Now showing, coming soon, ticket booking and the full filmography of actor, dancer and producer Nora Fatehi.",
  keywords: [
    "Nora Fatehi",
    "movie tickets",
    "now showing",
    "coming soon",
    "filmography",
    "Bollywood",
    "dance",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Nora Fatehi",
    title: "Nora Fatehi | Films, Showtimes & Performances",
    description:
      "Book tickets for what's in cinemas now, count down to what's next, and browse a decade of work.",
    images: [
      {
        url: "https://image.tmdb.org/t/p/original/fdMM1zC3m1JIeMLVXUTLdhZ48CV.jpg",
        width: 1249,
        height: 1872,
        alt: "Nora Fatehi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nora Fatehi | Films, Showtimes & Performances",
    description: "Now showing, coming soon, offers and the full filmography.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Warm the image CDNs before the hero requests its first frame. */}
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
