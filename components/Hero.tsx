"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import HeroCarousel from "./HeroCarousel"
import { useBooking } from "./BookingProvider"
import { nowShowing } from "@/lib/data"

export default function Hero() {
  const { book } = useBooking()
  const feature = nowShowing[0]

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <HeroCarousel />

      <div className="relative z-20 mx-auto max-w-4xl px-4 pt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-400/90 sm:text-xs"
        >
          Actor · Dancer · Producer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="font-display text-5xl font-black leading-[0.95] text-gradient-gold sm:text-7xl md:text-8xl lg:text-9xl"
        >
          NORA FATEHI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-gold-200/80 sm:text-lg"
        >
          Eighteen features. Six languages. Four billion streams. Now in cinemas with{" "}
          <span className="text-gold-300">{feature.title}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <button
            onClick={() => book(feature)}
            className="w-full rounded-full luxury-gradient px-8 py-4 text-base font-semibold text-noir-950 transition-transform duration-300 noir-shadow hover:scale-105 sm:w-auto"
          >
            Book Tickets
          </button>
          <Link
            href="#videos"
            className="w-full rounded-full border-2 border-gold-500/60 px-8 py-4 text-base font-semibold text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto"
          >
            Watch Performances
          </Link>
        </motion.div>
      </div>

      {/* Ambient light — decorative only. */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -left-20 bottom-10 h-96 w-96 rounded-full bg-crimson-500/10 blur-3xl"
      />
    </section>
  )
}
