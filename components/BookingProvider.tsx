"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { Movie } from "@/lib/data"
import BookingModal from "./BookingModal"

type BookingContextValue = {
  /** Opens the booking flow for a film. */
  book: (movie: Movie) => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>")
  return ctx
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [movie, setMovie] = useState<Movie | null>(null)

  const book = useCallback((next: Movie) => setMovie(next), [])
  const value = useMemo(() => ({ book }), [book])

  return (
    <BookingContext.Provider value={value}>
      {children}
      {movie && <BookingModal movie={movie} onClose={() => setMovie(null)} />}
    </BookingContext.Provider>
  )
}
