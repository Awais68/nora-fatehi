"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { youtubeEmbed } from "@/lib/images"

/**
 * Plays one YouTube video over the page. Nothing is embedded until this
 * mounts, which is why the video rails ship thumbnails instead of iframes.
 */
export default function VideoLightbox({
  youtubeId,
  title,
  onClose,
}: {
  youtubeId: string
  title: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-noir-950/92 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="aspect-video overflow-hidden rounded-xl border border-gold-500/20 bg-black shadow-2xl">
          <iframe
            src={youtubeEmbed(youtubeId)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="truncate font-display text-lg text-gold-300">{title}</p>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-gold-500/30 px-4 py-1.5 text-sm text-gold-400 transition-colors hover:bg-gold-500/10"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
