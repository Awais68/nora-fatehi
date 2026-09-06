"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { featuredVideos, type Video } from "@/lib/data"
import { youtubeThumb } from "@/lib/images"
import VideoLightbox from "./VideoLightbox"
import { SectionHead } from "./NowShowing"

const INITIAL = 6

export default function VideoGallery() {
  const [active, setActive] = useState<Video | null>(null)
  const [expanded, setExpanded] = useState(false)

  const shown = expanded ? featuredVideos : featuredVideos.slice(0, INITIAL)

  return (
    <section id="videos" className="section-padding bg-noir-950">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Four billion streams and counting"
          title="Performances"
          blurb="The dance numbers and singles that built the catalogue. Tap any card to play."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((video, i) => (
            <motion.button
              key={video.id}
              onClick={() => setActive(video)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group text-left"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border border-gold-500/10 bg-noir-800 transition-colors group-hover:border-gold-500/40">
                <Image
                  src={youtubeThumb(video.youtubeId)}
                  alt={`${video.title} thumbnail`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/85 via-noir-950/10 to-transparent" />

                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-noir-950/60 text-gold-400 ring-1 ring-gold-500/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-noir-950">
                    <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>

                <span className="absolute bottom-3 right-3 rounded bg-noir-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-gold-400">
                  {video.year}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="font-display text-lg font-bold leading-tight text-gold-300 transition-colors group-hover:text-gold-200">
                  {video.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-gold-500/60">
                  {video.from} · {video.views}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-gold-300/60">
                  {video.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {featuredVideos.length > INITIAL && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full border border-gold-500/40 px-7 py-3 text-sm font-semibold text-gold-400 transition-colors hover:bg-gold-500/10"
            >
              {expanded ? "Show fewer" : `Show all ${featuredVideos.length} performances`}
            </button>
          </div>
        )}
      </div>

      {active && (
        <VideoLightbox
          youtubeId={active.youtubeId}
          title={`${active.title} — ${active.from}`}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  )
}
