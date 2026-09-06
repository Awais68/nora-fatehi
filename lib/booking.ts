/**
 * Booking domain logic: cinemas, showtimes, seat maps and promo pricing.
 *
 * Everything here is deterministic — the same movie + cinema + show always
 * produces the same occupied seats, so the UI stays stable across re-renders
 * and matches on a page refresh.
 */

export type City = { id: string; name: string; cinemas: Cinema[] }
export type Cinema = { id: string; name: string; area: string; formats: Format[] }
export type Format = "2D" | "3D" | "IMAX" | "4DX"

export const cities: City[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    cinemas: [
      { id: "mum-1", name: "Grand Cinemas", area: "Lower Parel", formats: ["2D", "IMAX", "4DX"] },
      { id: "mum-2", name: "Marine Drive Picture House", area: "Churchgate", formats: ["2D", "3D"] },
      { id: "mum-3", name: "Juhu Premiere", area: "Juhu", formats: ["2D", "3D", "IMAX"] },
    ],
  },
  {
    id: "delhi",
    name: "Delhi NCR",
    cinemas: [
      { id: "del-1", name: "Connaught Royale", area: "Connaught Place", formats: ["2D", "IMAX"] },
      { id: "del-2", name: "Cyber Hub Screens", area: "Gurugram", formats: ["2D", "3D", "4DX"] },
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    cinemas: [
      { id: "dxb-1", name: "Marina Luxe", area: "Dubai Marina", formats: ["2D", "IMAX"] },
      { id: "dxb-2", name: "Downtown Grand", area: "Downtown", formats: ["2D", "3D"] },
    ],
  },
  {
    id: "toronto",
    name: "Toronto",
    cinemas: [
      { id: "yyz-1", name: "Queen West Cinema", area: "Queen Street West", formats: ["2D", "3D"] },
    ],
  },
]

export type ShowTime = {
  id: string
  time: string
  format: Format
  /** Base ticket price in INR before tier multiplier. */
  base: number
  /** Morning shows unlock the FIRSTSHOW code. */
  morning: boolean
  fillRate: number
}

export const showTimes: ShowTime[] = [
  { id: "s1", time: "09:15 AM", format: "2D", base: 190, morning: true, fillRate: 0.18 },
  { id: "s2", time: "12:30 PM", format: "2D", base: 260, morning: false, fillRate: 0.34 },
  { id: "s3", time: "03:45 PM", format: "3D", base: 340, morning: false, fillRate: 0.46 },
  { id: "s4", time: "06:50 PM", format: "IMAX", base: 520, morning: false, fillRate: 0.62 },
  { id: "s5", time: "10:10 PM", format: "4DX", base: 640, morning: false, fillRate: 0.41 },
]

/* ----------------------------- seat map ----------------------------- */

export type Tier = { id: "silver" | "gold" | "recliner"; label: string; multiplier: number; rows: string[] }

export const tiers: Tier[] = [
  { id: "silver", label: "Silver", multiplier: 1, rows: ["A", "B", "C", "D"] },
  { id: "gold", label: "Gold", multiplier: 1.6, rows: ["E", "F", "G", "H"] },
  { id: "recliner", label: "Recliner", multiplier: 2.4, rows: ["J", "K"] },
]

export const SEATS_PER_ROW = 14
/** Aisle sits after this many seats on each side. */
export const AISLE_AFTER = 3

export type Seat = {
  id: string
  row: string
  number: number
  tier: Tier
  price: number
  occupied: boolean
}

/** Small deterministic string hash — same input, same seat map, every time. */
function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed: number) {
  let s = seed || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 100000) / 100000
  }
}

export function buildSeatMap(seed: string, show: ShowTime): Seat[][] {
  const next = rng(hash(seed))
  return tiers.flatMap((tier) =>
    tier.rows.map((row) => {
      const price = Math.round((show.base * tier.multiplier) / 10) * 10
      return Array.from({ length: SEATS_PER_ROW }, (_, i) => {
        // Middle seats and premium tiers sell out first — the fill rate is
        // weighted so the map reads like a real house.
        const centreBias = 1 - Math.abs(i - (SEATS_PER_ROW - 1) / 2) / SEATS_PER_ROW
        // The tier weight is deliberately gentle: multiplying by the raw price
        // multiplier sold out every gold and recliner row before the map rendered.
        const tierWeight = 1 + (tier.multiplier - 1) * 0.12
        const demand = show.fillRate * (0.6 + centreBias * 0.5) * tierWeight
        const occupied = next() < Math.min(demand, 0.78)
        return {
          id: `${row}${i + 1}`,
          row,
          number: i + 1,
          tier,
          price,
          occupied,
        }
      })
    }),
  )
}

/* ------------------------------ pricing ----------------------------- */

export type Promo = {
  code: string
  label: string
  detail: string
  /** Percentage off the ticket subtotal, 0-1. */
  percent?: number
  /** Flat INR off. */
  flat?: number
  /** Cap on the discount in INR. */
  cap?: number
  minSeats?: number
  morningOnly?: boolean
  /** Accent used by the offers cards. */
  accent: "gold" | "crimson" | "emerald"
}

export const promos: Promo[] = [
  {
    code: "NORA25",
    label: "25% off every screen",
    detail: "Valid on all formats, all cities. Capped at ₹400 per booking.",
    percent: 0.25,
    cap: 400,
    accent: "gold",
  },
  {
    code: "FIRSTSHOW",
    label: "Half price before noon",
    detail: "50% off morning shows. One booking per person, per day.",
    percent: 0.5,
    cap: 500,
    morningOnly: true,
    accent: "emerald",
  },
  {
    code: "DILBAR100",
    label: "Flat ₹100 off",
    detail: "No minimum spend. Stacks with no other code.",
    flat: 100,
    accent: "crimson",
  },
  {
    code: "SQUAD4",
    label: "₹500 off for four",
    detail: "Book four seats or more in a single transaction.",
    flat: 500,
    minSeats: 4,
    accent: "gold",
  },
]

export const CONVENIENCE_FEE_PER_SEAT = 35
export const GST_RATE = 0.18

export type PriceBreakdown = {
  subtotal: number
  discount: number
  fee: number
  tax: number
  total: number
  promoError: string | null
  appliedPromo: Promo | null
}

export function priceBooking(
  seats: Seat[],
  show: ShowTime | null,
  code: string,
): PriceBreakdown {
  const subtotal = seats.reduce((sum, s) => sum + s.price, 0)
  const fee = seats.length * CONVENIENCE_FEE_PER_SEAT
  const trimmed = code.trim().toUpperCase()

  let discount = 0
  let promoError: string | null = null
  let appliedPromo: Promo | null = null

  if (trimmed) {
    const promo = promos.find((p) => p.code === trimmed)
    if (!promo) {
      promoError = "That code is not valid."
    } else if (promo.morningOnly && !show?.morning) {
      promoError = `${promo.code} only applies to shows before noon.`
    } else if (promo.minSeats && seats.length < promo.minSeats) {
      promoError = `${promo.code} needs at least ${promo.minSeats} seats.`
    } else if (seats.length === 0) {
      promoError = "Pick your seats first."
    } else {
      appliedPromo = promo
      discount = promo.flat ?? 0
      if (promo.percent) discount = subtotal * promo.percent
      if (promo.cap) discount = Math.min(discount, promo.cap)
      discount = Math.min(Math.round(discount), subtotal)
    }
  }

  const taxable = subtotal - discount + fee
  const tax = Math.round(taxable * GST_RATE)

  return { subtotal, discount, fee, tax, total: taxable + tax, promoError, appliedPromo }
}

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`

/** Next `count` calendar days, starting today. */
export function upcomingDates(count = 7, from = new Date()): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from)
    d.setDate(d.getDate() + i)
    d.setHours(0, 0, 0, 0)
    return d
  })
}

export function bookingReference(seed: string): string {
  const h = hash(seed).toString(36).toUpperCase().padStart(6, "0")
  return `NF-${h.slice(0, 3)}-${h.slice(3, 7)}`
}
