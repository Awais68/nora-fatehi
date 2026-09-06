"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { gallery, type GalleryItem } from "@/lib/data"
import { profile } from "@/lib/images"
import { SectionHead } from "./NowShowing"

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  const step = useCallback(
    (delta: number) =>
      setIndex((prev) => (prev === null ? prev : (prev + delta + gallery.length) % gallery.length)),
    [],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null)
      if (e.key === "ArrowLeft") step(-1)
      if (e.key === "ArrowRight") step(1)
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [index, step])

  const open: GalleryItem | null = index === null ? null : gallery[index]

  return (
    <section id="gallery" className="section-padding bg-noir-950">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Portraits & film stills"
          title="Gallery"
          blurb="Press portraits and production stills, served at full resolution. Click any frame to open it."
        />

        {/* Masonry via CSS columns — portraits and 16:9 stills sit together
            without cropping either to a common ratio. */}
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="group relative mb-3 block w-full overflow-hidden rounded-xl border border-gold-500/10 sm:mb-4"
            >
              <Image
                src={profile(item.src, "w342")}
                alt={item.title}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm font-bold text-gold-200">{item.title}</p>
                <p className="text-[10px] uppercase tracking-wider text-gold-400/70">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIndex(null)}
              className="absolute inset-0 bg-noir-950/94 backdrop-blur-sm"
            />

            <motion.div
              key={open.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col items-center"
            >
              <Image
                src={profile(open.src, "original")}
                alt={open.title}
                width={open.width}
                height={open.height}
                quality={92}
                sizes="90vw"
                className="max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-3 text-center">
                <p className="font-display text-lg text-gold-200">{open.title}</p>
                <p className="text-[11px] uppercase tracking-wider text-gold-500/60">
                  {open.caption} · {index! + 1} of {gallery.length}
                </p>
              </div>
            </motion.div>

            <LightboxArrow side="left" onClick={() => step(-1)} />
            <LightboxArrow side="right" onClick={() => step(1)} />

            <button
              onClick={() => setIndex(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-20 rounded-full border border-gold-500/25 p-2.5 text-gold-400 transition-colors hover:bg-gold-500/10"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function LightboxArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold-500/25 bg-noir-950/50 p-3 text-gold-400 backdrop-blur-sm transition-all hover:scale-110 hover:text-gold-200 ${
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      }`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  )
}
