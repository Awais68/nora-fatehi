"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  return (
    <section id="contact" className="section-padding bg-noir-900">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500/70">
            Never miss a release
          </p>
          <h2 className="font-display text-4xl font-bold text-gradient-gold sm:text-5xl md:text-6xl">
            First In Line
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gold-300/70 sm:text-base">
            Release dates, advance booking windows and subscriber-only discount codes — straight to
            your inbox, roughly once a month.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="min-w-0 flex-1 rounded-full border border-noir-700 bg-noir-800/60 px-5 py-3.5 text-sm text-gold-200 placeholder:text-gold-500/40 focus:border-gold-500 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-noir-950 transition-transform hover:scale-105"
          >
            {done ? "You're in ✓" : "Notify Me"}
          </button>
        </motion.form>

        {done && (
          <p className="mt-4 text-xs text-emerald-400">
            Demo form — nothing was sent and no address was stored.
          </p>
        )}

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:bookings@example.com"
            className="rounded-full border-2 border-gold-500 px-8 py-3.5 text-sm font-semibold text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-noir-950"
          >
            Press & Booking Enquiries
          </a>
          <a
            href="#now-showing"
            className="rounded-full px-8 py-3.5 text-sm font-semibold text-gold-400/80 transition-colors hover:text-gold-300"
          >
            Back to showtimes →
          </a>
        </div>
      </div>
    </section>
  )
}
