"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { Movie } from "@/lib/data"
import { poster } from "@/lib/images"
import {
  AISLE_AFTER,
  bookingReference,
  buildSeatMap,
  cities,
  inr,
  priceBooking,
  promos,
  showTimes,
  tiers,
  upcomingDates,
  type Cinema,
  type Seat,
  type ShowTime,
} from "@/lib/booking"

const STEPS = ["Showtime", "Seats", "Payment"] as const
const MAX_SEATS = 10

export default function BookingModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [cityId, setCityId] = useState(cities[0].id)
  const [cinema, setCinema] = useState<Cinema | null>(null)
  const [dateIndex, setDateIndex] = useState(0)
  const [show, setShow] = useState<ShowTime | null>(null)
  const [picked, setPicked] = useState<string[]>([])
  const [code, setCode] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  const city = cities.find((c) => c.id === cityId)!
  const dates = useMemo(() => upcomingDates(7), [])

  // Close on Escape, and stop the page behind the modal from scrolling.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  const seatSeed = `${movie.id}|${cinema?.id ?? ""}|${dateIndex}|${show?.id ?? ""}`
  const seatRows = useMemo(
    () => (show ? buildSeatMap(seatSeed, show) : []),
    [seatSeed, show],
  )
  const allSeats = useMemo(() => seatRows.flat(), [seatRows])
  const selected = useMemo(
    () => allSeats.filter((s) => picked.includes(s.id)),
    [allSeats, picked],
  )
  const price = useMemo(() => priceBooking(selected, show, code), [selected, show, code])

  const availableFormats = cinema?.formats ?? []
  const shows = showTimes.filter((s) => availableFormats.includes(s.format))

  const toggleSeat = (seat: Seat) => {
    if (seat.occupied) return
    setPicked((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : prev.length >= MAX_SEATS
          ? prev
          : [...prev, seat.id],
    )
  }

  const chooseCinema = (next: Cinema) => {
    setCinema(next)
    setShow(null)
    setPicked([])
  }

  const chooseShow = (next: ShowTime) => {
    setShow(next)
    setPicked([])
  }

  const canContinue = step === 0 ? Boolean(cinema && show) : step === 1 ? picked.length > 0 : true

  const reference = bookingReference(`${seatSeed}|${picked.join(",")}`)
  const selectedDate = dates[dateIndex]

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-noir-950/85 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Book tickets for ${movie.title}`}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-gold-500/25 bg-noir-900 shadow-2xl outline-none sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-gold-500/15 bg-noir-950/60 p-4 sm:p-5">
          <div className="relative hidden h-20 w-14 shrink-0 overflow-hidden rounded-md sm:block">
            {movie.poster && (
              <Image
                src={poster(movie.poster, "w342")}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-xl font-bold text-gold-300 sm:text-2xl">
              {movie.title}
            </h2>
            <p className="truncate text-xs text-gold-500/80 sm:text-sm">
              {[movie.language, movie.genres.slice(0, 2).join(" · "), movie.runtime]
                .filter(Boolean)
                .join("  •  ")}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking"
            className="shrink-0 rounded-full p-2 text-gold-400 transition-colors hover:bg-gold-500/10 hover:text-gold-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Steps */}
        {!confirmed && (
          <ol className="flex items-center gap-2 border-b border-gold-500/10 px-4 py-3 sm:px-5">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors ${
                    i <= step ? "bg-gold-500 text-noir-950" : "bg-noir-800 text-gold-500/50"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    i <= step ? "text-gold-300" : "text-gold-500/40"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className={`h-px flex-1 ${i < step ? "bg-gold-500/60" : "bg-noir-700"}`}
                  />
                )}
              </li>
            ))}
          </ol>
        )}

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <Confirmation
                key="done"
                movie={movie}
                reference={reference}
                cinema={cinema!}
                cityName={city.name}
                date={selectedDate}
                show={show!}
                seats={selected}
                total={price.total}
              />
            ) : step === 0 ? (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-7"
              >
                <Field label="City">
                  <div className="flex flex-wrap gap-2">
                    {cities.map((c) => (
                      <Chip
                        key={c.id}
                        active={c.id === cityId}
                        onClick={() => {
                          setCityId(c.id)
                          setCinema(null)
                          setShow(null)
                        }}
                      >
                        {c.name}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label="Cinema">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {city.cinemas.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => chooseCinema(c)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          cinema?.id === c.id
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-noir-700 bg-noir-800/50 hover:border-gold-500/40"
                        }`}
                      >
                        <div className="font-medium text-gold-200">{c.name}</div>
                        <div className="text-xs text-gold-500/70">{c.area}</div>
                        <div className="mt-2 flex gap-1">
                          {c.formats.map((f) => (
                            <span
                              key={f}
                              className="rounded bg-noir-950/60 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-gold-400"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Date">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDateIndex(i)
                          setPicked([])
                        }}
                        className={`min-w-[64px] shrink-0 rounded-xl border px-3 py-2 text-center transition-all ${
                          i === dateIndex
                            ? "border-gold-500 bg-gold-500 text-noir-950"
                            : "border-noir-700 bg-noir-800/50 text-gold-300 hover:border-gold-500/40"
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className="text-lg font-bold leading-tight">{d.getDate()}</div>
                        <div className="text-[10px] uppercase opacity-70">
                          {d.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={cinema ? "Showtime" : "Showtime — pick a cinema first"}>
                  <div className="flex flex-wrap gap-2">
                    {shows.length === 0 && (
                      <p className="text-sm text-gold-500/60">Select a cinema to see showtimes.</p>
                    )}
                    {shows.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => chooseShow(s)}
                        className={`rounded-xl border px-4 py-2 text-left transition-all ${
                          show?.id === s.id
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-noir-700 bg-noir-800/50 hover:border-gold-500/40"
                        }`}
                      >
                        <div className="font-semibold text-gold-200">{s.time}</div>
                        <div className="text-[11px] text-gold-500/70">
                          {s.format} · from {inr(s.base)}
                        </div>
                      </button>
                    ))}
                  </div>
                </Field>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-6"
              >
                <div className="mx-auto h-1.5 w-3/4 rounded-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
                <p className="text-center text-[11px] uppercase tracking-[0.3em] text-gold-500/60">
                  Screen this way
                </p>

                <div className="overflow-x-auto">
                  <div className="mx-auto w-max space-y-4 pb-2">
                    {tiers.map((tier) => (
                      <div key={tier.id} className="space-y-1.5">
                        <div className="flex items-baseline justify-between text-[11px] text-gold-500/70">
                          <span className="font-semibold uppercase tracking-wider">{tier.label}</span>
                          <span>
                            {inr(Math.round(((show?.base ?? 0) * tier.multiplier) / 10) * 10)}
                          </span>
                        </div>
                        {seatRows
                          .filter((row) => row[0].tier.id === tier.id)
                          .map((row) => (
                            <div key={row[0].row} className="flex items-center gap-1.5">
                              <span className="w-4 text-[10px] font-semibold text-gold-500/50">
                                {row[0].row}
                              </span>
                              {row.map((seat, i) => (
                                <span key={seat.id} className="flex">
                                  {i === AISLE_AFTER || i === row.length - AISLE_AFTER ? (
                                    <span className="w-3" />
                                  ) : null}
                                  <button
                                    onClick={() => toggleSeat(seat)}
                                    disabled={seat.occupied}
                                    aria-label={`Seat ${seat.id}, ${
                                      seat.occupied ? "unavailable" : inr(seat.price)
                                    }`}
                                    aria-pressed={picked.includes(seat.id)}
                                    className={`h-6 w-6 rounded-t-md border text-[9px] font-semibold transition-all ${
                                      seat.occupied
                                        ? "cursor-not-allowed border-noir-700 bg-noir-800 text-transparent"
                                        : picked.includes(seat.id)
                                          ? "scale-110 border-gold-400 bg-gold-500 text-noir-950"
                                          : "border-gold-500/45 bg-gold-500/10 text-gold-300/85 hover:border-gold-400 hover:bg-gold-500/30"
                                    }`}
                                  >
                                    {seat.number}
                                  </button>
                                </span>
                              ))}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-gold-500/70">
                  <Legend className="border-gold-500/45 bg-gold-500/10">Available</Legend>
                  <Legend className="border-gold-400 bg-gold-500">Selected</Legend>
                  <Legend className="border-noir-700 bg-noir-800">Taken</Legend>
                  <span>Max {MAX_SEATS} seats per booking</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border border-gold-500/20 bg-noir-950/50 p-4">
                  <Row label="Cinema" value={`${cinema!.name}, ${city.name}`} />
                  <Row
                    label="Show"
                    value={`${selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })} · ${show!.time} · ${show!.format}`}
                  />
                  <Row label="Seats" value={selected.map((s) => s.id).join(", ")} />
                </div>

                <Field label="Promo code">
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="e.g. NORA25"
                      className="min-w-0 flex-1 rounded-xl border border-noir-700 bg-noir-800/60 px-4 py-2.5 text-sm uppercase tracking-wider text-gold-200 placeholder:normal-case placeholder:tracking-normal placeholder:text-gold-500/40 focus:border-gold-500 focus:outline-none focus:ring-0"
                    />
                    {code && (
                      <button
                        onClick={() => setCode("")}
                        className="rounded-xl border border-noir-700 px-4 text-sm text-gold-400 transition-colors hover:border-gold-500/40"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {price.promoError && (
                    <p className="mt-2 text-xs text-crimson-500">{price.promoError}</p>
                  )}
                  {price.appliedPromo && (
                    <p className="mt-2 text-xs text-emerald-400">
                      {price.appliedPromo.label} applied — you saved {inr(price.discount)}.
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {promos.map((p) => (
                      <button
                        key={p.code}
                        onClick={() => setCode(p.code)}
                        className="rounded-full border border-dashed border-gold-500/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-gold-400 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
                      >
                        {p.code}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="space-y-1.5 rounded-2xl border border-gold-500/20 bg-noir-950/50 p-4 text-sm">
                  <Row label={`Tickets (${selected.length})`} value={inr(price.subtotal)} />
                  {price.discount > 0 && (
                    <Row
                      label={`Discount · ${price.appliedPromo?.code}`}
                      value={`− ${inr(price.discount)}`}
                      accent="emerald"
                    />
                  )}
                  <Row label="Convenience fee" value={inr(price.fee)} />
                  <Row label="GST (18%)" value={inr(price.tax)} />
                  <div className="mt-3 flex items-baseline justify-between border-t border-gold-500/20 pt-3">
                    <span className="font-display text-lg font-bold text-gold-300">Total</span>
                    <span className="font-display text-2xl font-bold text-gold-400">
                      {inr(price.total)}
                    </span>
                  </div>
                </div>

                <p className="text-center text-[11px] leading-relaxed text-gold-500/50">
                  Demo checkout — no payment is taken and no seats are actually reserved.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-gold-500/15 bg-noir-950/60 p-4 sm:p-5">
          {confirmed ? (
            <button
              onClick={onClose}
              className="ml-auto rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-noir-950 transition-transform hover:scale-105"
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={() => (step === 0 ? onClose() : setStep(step - 1))}
                className="rounded-full border border-noir-700 px-5 py-3 text-sm font-medium text-gold-400 transition-colors hover:border-gold-500/40"
              >
                {step === 0 ? "Cancel" : "Back"}
              </button>

              <div className="ml-auto flex items-center gap-4">
                {step === 1 && picked.length > 0 && (
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-gold-500/60">
                      {picked.length} seat{picked.length > 1 ? "s" : ""}
                    </div>
                    <div className="font-display text-lg font-bold leading-none text-gold-300">
                      {inr(price.subtotal)}
                    </div>
                  </div>
                )}
                <button
                  disabled={!canContinue}
                  onClick={() => (step === 2 ? setConfirmed(true) : setStep(step + 1))}
                  className="rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-noir-950 transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {step === 2 ? `Pay ${inr(price.total)}` : "Continue"}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* --------------------------- small pieces --------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500/70">
        {label}
      </h3>
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? "border-gold-500 bg-gold-500 text-noir-950"
          : "border-noir-700 bg-noir-800/50 text-gold-300 hover:border-gold-500/40"
      }`}
    >
      {children}
    </button>
  )
}

function Legend({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-4 w-4 rounded-t border ${className}`} />
      {children}
    </span>
  )
}

function Row({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: "emerald"
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-0.5 text-sm">
      <span className="text-gold-500/70">{label}</span>
      <span
        className={`text-right font-medium ${
          accent === "emerald" ? "text-emerald-400" : "text-gold-200"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function Confirmation({
  movie,
  reference,
  cinema,
  cityName,
  date,
  show,
  seats,
  total,
}: {
  movie: Movie
  reference: string
  cinema: Cinema
  cityName: string
  date: Date
  show: ShowTime
  seats: Seat[]
  total: number
}) {
  return (
    <motion.div
      key="confirm"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <div>
        <h3 className="font-display text-2xl font-bold text-gold-300">Booking confirmed</h3>
        <p className="mt-1 text-sm text-gold-500/70">
          Reference <span className="font-mono text-gold-400">{reference}</span>
        </p>
      </div>

      <div className="mx-auto max-w-sm rounded-2xl border border-dashed border-gold-500/40 bg-noir-950/60 p-5 text-left">
        <div className="font-display text-lg font-bold text-gold-300">{movie.title}</div>
        <div className="mt-3 space-y-1.5">
          <Row label="Cinema" value={`${cinema.name}, ${cityName}`} />
          <Row
            label="Show"
            value={`${date.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })} · ${show.time} · ${show.format}`}
          />
          <Row label="Seats" value={seats.map((s) => s.id).join(", ")} />
          <Row label="Paid" value={inr(total)} />
        </div>
      </div>

      <p className="text-[11px] text-gold-500/50">
        This is a demo flow — nothing was charged and no seats were held.
      </p>
    </motion.div>
  )
}
