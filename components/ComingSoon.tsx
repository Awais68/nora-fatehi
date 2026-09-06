"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { comingSoon, type Movie } from "@/lib/data"
import { poster } from "@/lib/images"
import Countdown from "./Countdown"
import VideoLightbox from "./VideoLightbox"
import { SectionHead } from "./NowShowing"
import { useBooking } from "./BookingProvider"

export default function ComingSoon() {
  const [trailer, setTrailer] = useState<Movie | null>(null)
  const [notified, setNotified] = useState<string[]>([])
  const { book } = useBooking()

  return (
    <section id="coming-soon" className="section-padding bg-noir-950">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="On the slate"
          title="Coming Soon"
          blurb="Four titles in the pipeline across three languages. Advance booking opens four weeks before release."
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {comingSoon.map((movie, i) => {
            const dated = Boolean(movie.releaseDate)
            const isNotified = notified.includes(movie.id)

            return (
              <motion.article
                key={movie.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-gold-500/10 bg-noir-900/80 p-4 transition-colors hover:border-gold-500/30 sm:gap-5 sm:p-5"
              >
                <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl sm:w-32">
                  {movie.poster ? (
                    <Image
                      src={poster(movie.poster, "w342")}
                      alt={`${movie.title} poster`}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <TitleCard title={movie.title} />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold-500/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                      {movie.tag}
                    </span>
                    <span className="text-[11px] text-gold-500/60">{movie.language}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-gold-300 sm:text-2xl">
                    {movie.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gold-300/60 sm:text-sm">
                    {movie.overview}
                  </p>

                  <div className="mt-auto pt-4">
                    {dated ? (
                      <>
                        <p className="mb-2 text-[11px] uppercase tracking-wider text-gold-500/60">
                          Releases{" "}
                          {new Date(`${movie.releaseDate}T00:00:00`).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <Countdown date={movie.releaseDate!} compact />
                      </>
                    ) : (
                      <p className="rounded-lg border border-dashed border-gold-500/25 px-3 py-2 text-center text-[11px] uppercase tracking-wider text-gold-500/60">
                        Release date to be announced
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {movie.trailer && (
                        <button
                          onClick={() => setTrailer(movie)}
                          className="rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-semibold text-gold-400 transition-colors hover:bg-gold-500/10"
                        >
                          Watch Teaser
                        </button>
                      )}
                      {movie.tag === "Advance Booking Open" ? (
                        <button
                          onClick={() => book(movie)}
                          className="rounded-full bg-gold-500 px-4 py-1.5 text-xs font-semibold text-noir-950 transition-transform hover:scale-105"
                        >
                          Book Early Access
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setNotified((prev) =>
                              prev.includes(movie.id)
                                ? prev.filter((id) => id !== movie.id)
                                : [...prev, movie.id],
                            )
                          }
                          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                            isNotified
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "border border-noir-700 text-gold-400 hover:border-gold-500/40"
                          }`}
                        >
                          {isNotified ? "We'll notify you ✓" : "Notify Me"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      {trailer?.trailer && (
        <VideoLightbox
          youtubeId={trailer.trailer}
          title={`${trailer.title} — Teaser`}
          onClose={() => setTrailer(null)}
        />
      )}
    </section>
  )
}

/** Stand-in artwork for announced titles that have no poster yet. */
function TitleCard({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-noir-800 via-noir-900 to-noir-950 p-2 text-center ring-1 ring-inset ring-gold-500/20">
      <span className="font-display text-[11px] font-bold uppercase leading-tight tracking-wide text-gold-400/90">
        {title}
      </span>
      <span className="text-[8px] uppercase tracking-[0.2em] text-gold-500/50">Artwork soon</span>
    </div>
  )
}
