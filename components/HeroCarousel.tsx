"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { heroSlides } from "@/lib/data"
import { profile } from "@/lib/images"

const DURATION = 6500

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  const go = useCallback(
    (delta: number) =>
      setIndex((prev) => (prev + delta + heroSlides.length) % heroSlides.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => go(1), DURATION)
    return () => clearTimeout(timer)
  }, [index, paused, go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  const slide = heroSlides[index]

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return
        const delta = e.changedTouches[0].clientX - touchStart.current
        if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1)
        touchStart.current = null
      }}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            // Slow Ken Burns push runs for the whole slide, not just the fade.
            scale: { duration: DURATION / 1000 + 1.2, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={profile(slide.src, "original")}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            style={{ objectPosition: slide.focus }}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility scrim — heavier at the edges so the headline always reads. */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-950/80 via-noir-950/45 to-noir-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-noir-950/70 via-transparent to-noir-950/50" />

      {/* Slide caption — pinned to the corner so it never collides with the hero stack. */}
      <div className="pointer-events-none absolute bottom-7 left-4 z-30 hidden max-w-[38%] md:block md:left-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.kicker}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="border-l-2 border-gold-500/50 pl-3 text-[11px] uppercase tracking-[0.35em] text-gold-300/80"
          >
            {slide.kicker}
          </motion.p>
        </AnimatePresence>
      </div>

      <ArrowButton side="left" onClick={() => go(-1)} />
      <ArrowButton side="right" onClick={() => go(1)} />

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2.5">
        {heroSlides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="group relative h-2.5 w-2.5 rounded-full"
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                i === index ? "bg-gold-400" : "bg-gold-400/30 group-hover:bg-gold-400/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress bar doubles as the timer readout. */}
      <div className="absolute bottom-0 left-0 z-30 h-0.5 w-full bg-gold-500/10">
        <motion.div
          key={`${index}-${paused}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? 0 : 1 }}
          transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
          className="h-full origin-left bg-gold-500/70"
        />
      </div>
    </div>
  )
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-gold-500/20 bg-noir-950/40 p-3 text-gold-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-noir-950/70 hover:text-gold-200 sm:block ${
        side === "left" ? "left-4 md:left-8" : "right-4 md:right-8"
      }`}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  )
}
