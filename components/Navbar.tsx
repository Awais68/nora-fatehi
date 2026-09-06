"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useBooking } from "./BookingProvider"
import { nowShowing } from "@/lib/data"

const LINKS = [
  { href: "#now-showing", label: "Now Showing" },
  { href: "#coming-soon", label: "Coming Soon" },
  { href: "#offers", label: "Offers" },
  { href: "#videos", label: "Videos" },
  { href: "#filmography", label: "Films" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { book } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The drawer covers the page, so lock the body while it is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-gold-500/20 bg-noir-950/90 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-noir-950/80 to-transparent"
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="#top"
            className="font-display text-xl font-bold tracking-wide text-gradient-gold sm:text-2xl"
          >
            NORA FATEHI
          </Link>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gold-400/90 transition-colors hover:text-gold-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => book(nowShowing[0])}
            className="ml-auto rounded-full bg-gold-500 px-4 py-2 text-xs font-semibold text-noir-950 transition-transform hover:scale-105 sm:px-5 sm:text-sm lg:ml-0"
          >
            Book Tickets
          </button>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gold-400 transition-colors hover:bg-gold-500/10 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-l border-gold-500/20 bg-noir-900 p-6"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="self-end rounded-lg p-2 text-gold-400 hover:bg-gold-500/10"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="mt-4 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 font-display text-lg text-gold-300 transition-colors hover:bg-gold-500/10 hover:text-gold-200"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto rounded-full border border-gold-500 px-5 py-3 text-center text-sm font-semibold text-gold-400"
              >
                Contact
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
