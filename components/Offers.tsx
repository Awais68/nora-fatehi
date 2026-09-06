"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { promos, type Promo } from "@/lib/booking"
import { nowShowing } from "@/lib/data"
import { useBooking } from "./BookingProvider"
import { SectionHead } from "./NowShowing"

const ACCENTS: Record<Promo["accent"], string> = {
  gold: "from-gold-500/25 to-gold-700/10 border-gold-500/30",
  crimson: "from-crimson-500/25 to-crimson-700/10 border-crimson-500/30",
  emerald: "from-emerald-500/20 to-emerald-700/10 border-emerald-500/30",
}

export default function Offers() {
  const [copied, setCopied] = useState<string | null>(null)
  const { book } = useBooking()

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(code)
      setTimeout(() => setCopied((c) => (c === code ? null : c)), 2000)
    } catch {
      // Clipboard is blocked in some embedded contexts — the code is on screen anyway.
      setCopied(null)
    }
  }

  return (
    <section id="offers" className="section-padding bg-noir-900">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Save on every seat"
          title="Offers & Discounts"
          blurb="Apply a code at checkout. One code per booking — the best value is picked for you if you are unsure."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-br p-5 ${ACCENTS[promo.accent]}`}
            >
              {/* Perforated ticket notches */}
              <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-noir-900" />
              <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-noir-900" />

              <h3 className="font-display text-xl font-bold leading-snug text-gold-200">
                {promo.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gold-300/70">{promo.detail}</p>

              <div className="my-4 border-t border-dashed border-gold-500/25" />

              <button
                onClick={() => copy(promo.code)}
                className="group flex items-center justify-between rounded-lg border border-dashed border-gold-500/50 bg-noir-950/40 px-3 py-2 transition-colors hover:border-gold-400"
              >
                <span className="font-mono text-sm font-bold tracking-[0.15em] text-gold-300">
                  {promo.code}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-500/70 group-hover:text-gold-400">
                  {copied === promo.code ? "Copied ✓" : "Copy"}
                </span>
              </button>

              <button
                onClick={() => book(nowShowing[0])}
                className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-gold-400/80 transition-colors hover:text-gold-300"
              >
                Use it now →
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-gold-500/45">
          Demo pricing. No payment is processed and no seats are reserved.
        </p>
      </div>
    </section>
  )
}
