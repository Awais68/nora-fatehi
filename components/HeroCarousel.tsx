"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface CarouselImage {
    src: string
    alt: string
}

const carouselImages: CarouselImage[] = [
    {
        src: "/images/hero/Nora-Fatehi-10.jpg",
        alt: "Nora Fatehi - Professional Photoshoot 1"
    },
    {
        src: "/images/hero/Nora-Fatehi-6-12.jpg",
        alt: "Nora Fatehi - Professional Photoshoot 2"
    },
    {
        src: "/images/hero/fff.jpeg",
        alt: "Nora Fatehi - Professional Photoshoot 3"
    },
    {
        src: "/images/hero/images (3).jpeg",
        alt: "Nora Fatehi - Professional Photoshoot 4"
    }
]

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? carouselImages.length - 1 : prev - 1
        )
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }

    return (
        <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={carouselImages[currentIndex].src}
                            alt={carouselImages[currentIndex].alt}
                            fill
                            priority={currentIndex === 0}
                            className="object-cover object-center"
                            quality={75}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-noir-950/70 via-noir-900/60 to-gold-900/40" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-noir-950/50 hover:bg-noir-950/80 backdrop-blur-sm text-gold-400 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
            >
                <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-noir-950/50 hover:bg-noir-950/80 backdrop-blur-sm text-gold-400 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Next image"
            >
                <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-gold-400 w-8 md:w-12"
                            : "bg-gold-400/30 hover:bg-gold-400/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
