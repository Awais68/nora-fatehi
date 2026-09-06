"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { filmography, type Movie } from "@/lib/data"
import { poster } from "@/lib/images"
import VideoLightbox from "./VideoLightbox"
import ScoreRing from "./ScoreRing"
import { SectionHead } from "./NowShowing"

type Filter = { id: string; label: string; match: (m: Movie) => boolean }

const FILTERS: Filter[] = [
  { id: "all", label: "All", match: () => true },
  { id: "lead", label: "Leading Roles", match: (m) => /Lead/.test(m.role) },
  { id: "hindi", label: "Hindi", match: (m) => m.language === "Hindi" },
  { id: "south", label: "South Indian", match: (m) => /Telugu|Tamil|Kannada/.test(m.language) },
  { id: "recent", label: "2020 →", match: (m) => Number(m.releaseDate?.slice(0, 4) ?? 0) >= 2020 },
]

export default function Filmography() {
  const [filterId, setFilterId] = useState("all")
  const [trailer, setTrailer] = useState<Movie | null>(null)

  const films = useMemo(() => {
    const filter = FILTERS.find((f) => f.id === filterId)!
    return filmography.filter(filter.match)
  }, [filterId])

  return (
    <section id="filmography" className="section-padding bg-noir-900">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Eighteen features, six languages"
          title="Filmography"
          blurb="From a debut dance number in Baahubali to leading roles across Hindi, Telugu, Tamil and Kannada cinema."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterId(f.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                filterId === f.id
                  ? "border-gold-500 bg-gold-500 text-noir-950"
                  : "border-noir-700 text-gold-400 hover:border-gold-500/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {films.map((film) => (
              <motion.article
                key={film.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gold-500/10 bg-noir-800/60 transition-colors hover:border-gold-500/30"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  {film.poster && (
                    <Image
                      src={poster(film.poster, "w500")}
                      alt={`${film.title} poster`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent opacity-80" />

                  <span className="absolute right-2 top-2 rounded-full bg-noir-950/80 px-2 py-1 text-[10px] font-semibold text-gold-400 backdrop-blur-sm">
                    {film.role}
                  </span>
                  {film.score !== null && (
                    <div className="absolute bottom-2 left-2">
                      <ScoreRing score={film.score} size={34} />
                    </div>
                  )}

                  {film.trailer && (
                    <button
                      onClick={() => setTrailer(film)}
                      aria-label={`Play ${film.title} trailer`}
                      className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500/90 text-noir-950 transition-transform hover:scale-110">
                        <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="font-display text-sm font-bold leading-tight text-gold-300 sm:text-base">
                    {film.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-gold-500/60">
                    {film.releaseDate?.slice(0, 4)} · {film.language}
                  </p>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-gold-300/55">
                    {film.overview}
                  </p>

                  <div className="mt-3 flex gap-2 pt-1">
                    {film.trailer && (
                      <button
                        onClick={() => setTrailer(film)}
                        className="flex-1 rounded-md bg-gold-500 py-1.5 text-[11px] font-semibold text-noir-950 transition-colors hover:bg-gold-400"
                      >
                        Trailer
                      </button>
                    )}
                    <a
                      href={
                        film.imdbId
                          ? `https://www.imdb.com/title/${film.imdbId}/`
                          : `https://www.themoviedb.org/movie/${film.tmdbId}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-md bg-noir-700 py-1.5 text-center text-[11px] font-semibold text-gold-400 transition-colors hover:bg-noir-600"
                    >
                      {film.imdbId ? "IMDb" : "Details"}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {trailer?.trailer && (
        <VideoLightbox
          youtubeId={trailer.trailer}
          title={`${trailer.title} — Official Trailer`}
          onClose={() => setTrailer(null)}
        />
      )}
    </section>
  )
}
