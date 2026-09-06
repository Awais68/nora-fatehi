"use client"

import { useSyncExternalStore } from "react"

type Parts = { days: number; hours: number; minutes: number; seconds: number }

/* A single one-second clock shared by every countdown on the page. */

let cachedSecond = 0

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 1000)
  return () => clearInterval(timer)
}

/** Whole seconds since the epoch — stable within a tick, so React can bail out. */
function getSnapshot() {
  const now = Math.floor(Date.now() / 1000)
  if (now !== cachedSecond) cachedSecond = now
  return cachedSecond
}

/** 0 marks "not on the client yet", which keeps SSR and hydration identical. */
function getServerSnapshot() {
  return 0
}

function partsUntil(targetMs: number, nowSeconds: number): Parts {
  const diff = Math.max(0, targetMs - nowSeconds * 1000)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

/**
 * Ticking release countdown. The server renders placeholders and the real
 * numbers appear on the first client tick, so hydration never mismatches.
 */
export default function Countdown({ date, compact = false }: { date: string; compact?: boolean }) {
  const second = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const parts = second === 0 ? null : partsUntil(new Date(`${date}T00:00:00`).getTime(), second)

  const cells: [string, number | null][] = [
    ["Days", parts?.days ?? null],
    ["Hrs", parts?.hours ?? null],
    ["Min", parts?.minutes ?? null],
    ["Sec", parts?.seconds ?? null],
  ]

  return (
    <div className={`flex ${compact ? "gap-1.5" : "gap-2 sm:gap-3"}`}>
      {cells.map(([label, value]) => (
        <div
          key={label}
          className={`flex-1 rounded-lg border border-gold-500/20 bg-noir-950/70 text-center ${
            compact ? "px-1.5 py-1" : "px-2 py-2"
          }`}
        >
          <div
            className={`font-display font-bold tabular-nums text-gold-300 ${
              compact ? "text-base leading-tight" : "text-xl sm:text-2xl"
            }`}
          >
            {value === null ? "––" : String(value).padStart(2, "0")}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-gold-500/60">{label}</div>
        </div>
      ))}
    </div>
  )
}
