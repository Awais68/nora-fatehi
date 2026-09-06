"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { stats } from "@/lib/data"
import { profile } from "@/lib/images"

const TIMELINE = [
  { year: "2015", event: "Screen debut fronting 'Manohari' in Baahubali: The Beginning." },
  { year: "2018", event: "'Dilbar' becomes the first Indian song past 20M views in 24 hours." },
  { year: "2020", event: "Leading role in Street Dancer 3D opposite Varun Dhawan." },
  { year: "2022", event: "FIFA World Cup anthem performance in Qatar." },
  { year: "2026", event: "Four titles in production across Hindi, Tamil and Kannada cinema." },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-noir-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500/70">
              Morocco · Canada · India
            </p>
            <h2 className="font-display text-4xl font-bold text-gradient-gold sm:text-5xl md:text-6xl">
              About Nora
            </h2>

            <div className="mt-8 space-y-4 leading-relaxed text-gold-200/80">
              <p>
                Born in Toronto to Moroccan parents, Nora Fatehi moved to Mumbai in 2014 and broke
                through the following year with a single dance number in the biggest film India had
                ever made.
              </p>
              <p>
                A decade on she has fronted some of the most-streamed music videos in the country&apos;s
                history, carried features as a lead in four languages, and performed at the FIFA World
                Cup — the first Indian artist invited to do so.
              </p>
              <p>
                Her work now spans acting, choreography, production and an international recording
                catalogue released in English, Arabic and Hindi.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-bold text-gold-500 sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-gold-300/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl noir-shadow">
              <Image
                src={profile("fdMM1zC3m1JIeMLVXUTLdhZ48CV.jpg", "original")}
                alt="Nora Fatehi portrait"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 to-transparent" />
            </div>

            <div className="absolute -left-3 -top-3 h-20 w-20 rounded-tl-2xl border-l-4 border-t-4 border-gold-500 sm:-left-4 sm:-top-4 sm:h-24 sm:w-24" />
            <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl border-b-4 border-r-4 border-gold-500 sm:-bottom-4 sm:-right-4 sm:h-24 sm:w-24" />
          </motion.div>
        </div>

        {/* Career timeline */}
        <div className="mt-20 border-t border-gold-500/15 pt-12">
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative border-l-2 border-gold-500/25 pl-4"
              >
                <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gold-500" />
                <div className="font-display text-2xl font-bold text-gold-500">{item.year}</div>
                <p className="mt-1 text-xs leading-relaxed text-gold-300/65">{item.event}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
