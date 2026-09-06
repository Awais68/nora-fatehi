"use client"

/**
 * Infinite marquee. The track holds two identical copies and translates by
 * exactly -50%, so the loop point is invisible.
 */
const ITEMS = [
  "NORA25 — 25% off every screen",
  "FIRSTSHOW — half price before noon",
  "DILBAR100 — flat ₹100 off, no minimum",
  "SQUAD4 — ₹500 off when you book four",
  "Advance booking now open for Jailer 2",
]

export default function OffersTicker() {
  return (
    <div className="relative overflow-hidden border-y border-gold-500/20 bg-gold-500/[0.06] py-3">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center whitespace-nowrap px-6 text-xs font-medium uppercase tracking-[0.2em] text-gold-400/90"
              >
                {item}
                <span className="ml-6 text-gold-500/40">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
