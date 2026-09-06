"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { nowShowing, type Movie } from "@/lib/data"
import { poster } from "@/lib/images"
import { useBooking } from "./BookingProvider"
import VideoLightbox from "./VideoLightbox"
import ScoreRing from "./ScoreRing"

export default function NowShowing() {
  const { book } = useBooking()
  const [trailer, setTrailer] = useState<Movie | null>(null)

  return (
    <section id="now-showing" className="section-padding bg-noir-900">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="In cinemas this week"
          title="Now Showing"
          blurb="Pick a city, pick your seats. Advance booking is open across all listed screens."
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {nowShowing.map((movie, i) => (
            <motion.article
              key={movie.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gold-500/10 bg-noir-800/60 transition-colors hover:border-gold-500/30"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                {movie.poster && (
                  <Image
                    src={poster(movie.poster, "w500")}
                    alt={`${movie.title} poster`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/10 to-transparent" />

                {movie.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-crimson-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {movie.tag}
                  </span>
                )}
                {movie.score !== null && (
                  <div className="absolute bottom-3 left-3">
                    <ScoreRing score={movie.score} />
                  </div>
                )}

                {movie.trailer && (
                  <button
                    onClick={() => setTrailer(movie)}
                    aria-label={`Play ${movie.title} trailer`}
                    className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-500/90 text-noir-950 backdrop-blur-sm transition-transform hover:scale-110">
                      <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <h3 className="font-display text-base font-bold leading-tight text-gold-300 sm:text-lg">
                  {movie.title}
                </h3>
                <p className="mt-1 text-[11px] text-gold-500/70">
                  {movie.language} · {movie.genres.slice(0, 2).join(", ")}
                  {movie.runtime ? ` · ${movie.runtime}` : ""}
                </p>
                <button
                  onClick={() => book(movie)}
                  className="mt-4 w-full rounded-full bg-gold-500 py-2.5 text-xs font-semibold text-noir-950 transition-transform hover:scale-[1.03] sm:text-sm"
                >
                  Book Tickets
                </button>
              </div>
            </motion.article>
          ))}
        </div>
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

export function SectionHead({
  eyebrow,
  title,
  blurb,
  align = "center",
}: {
  eyebrow: string
  title: string
  blurb?: string
  align?: "center" | "left"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-10 sm:mb-14 ${align === "center" ? "text-center" : ""}`}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500/70">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold text-gradient-gold sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {blurb && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-gold-300/70 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {blurb}
        </p>
      )}
    </motion.div>
  )
}
