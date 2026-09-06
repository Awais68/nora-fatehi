import Link from "next/link"

const SECTIONS = [
  {
    heading: "Watch",
    links: [
      { href: "#now-showing", label: "Now Showing" },
      { href: "#coming-soon", label: "Coming Soon" },
      { href: "#filmography", label: "Filmography" },
      { href: "#videos", label: "Performances" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { href: "#offers", label: "Offers & Discounts" },
      { href: "#gallery", label: "Gallery" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
  },
]

const SOCIALS = [
  { href: "https://www.instagram.com/norafatehi/", label: "Instagram" },
  { href: "https://www.youtube.com/@NoraFatehi", label: "YouTube" },
  { href: "https://www.imdb.com/name/nm6702762/", label: "IMDb" },
  { href: "https://www.themoviedb.org/person/1488785", label: "TMDB" },
]

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-noir-950 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold text-gradient-gold">NORA FATEHI</div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gold-300/55">
              Actor, dancer and producer working across Hindi, Telugu, Tamil and Kannada cinema.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-400 transition-colors hover:text-gold-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500/70">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-gold-300/70 transition-colors hover:text-gold-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-2 border-t border-gold-500/10 pt-6 text-center text-xs text-gold-500/45">
          <p>
            Fan-made portfolio. Film artwork, ratings and metadata courtesy of{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold-500/30 underline-offset-2 hover:text-gold-400"
            >
              TMDB
            </a>
            ; this product is not endorsed or certified by TMDB.
          </p>
          <p>Ticket booking, pricing and offers are a demonstration only — no payment is taken.</p>
        </div>
      </div>
    </footer>
  )
}
