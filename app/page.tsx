"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import HeroCarousel from "@/components/HeroCarousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-noir-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-noir-950/80 backdrop-blur-md border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-display font-bold text-gradient-gold"
            >
              NORA FATEHI
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-8"
            >
              <Link href="#portfolio" className="text-gold-500 hover:text-gold-400 transition-colors font-medium">
                Portfolio
              </Link>
              <Link href="#videos" className="text-gold-500 hover:text-gold-400 transition-colors font-medium">
                Videos
              </Link>
              <Link href="#filmography" className="text-gold-500 hover:text-gold-400 transition-colors font-medium">
                Films
              </Link>
              <Link href="#about" className="text-gold-500 hover:text-gold-400 transition-colors font-medium">
                About
              </Link>
              <Link href="#contact" className="text-gold-500 hover:text-gold-400 transition-colors font-medium">
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Carousel Background */}
        <HeroCarousel />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-display font-black text-gradient-gold mb-6"
          >
            NORA FATEHI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gold-300 font-light tracking-wide mb-12"
          >
            International Actress • Model • Performer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="#portfolio"
              className="inline-block px-8 py-4 luxury-gradient text-noir-950 font-semibold text-lg rounded-full hover:scale-105 transition-transform duration-300 noir-shadow"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-noir-950 to-transparent" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-crimson-500/10 rounded-full blur-3xl"
        />
      </section>

      {/* Portfolio Grid Section */}
      <section id="portfolio" className="section-padding bg-noir-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold text-center text-gradient-gold mb-16"
          >
            Portfolio
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />

                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-noir-800 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gold-500 text-lg font-semibold">{item.title}</p>
                      <p className="text-gold-300 text-sm">{item.category}</p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gold-400 text-sm font-medium">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section id="videos" className="section-padding bg-noir-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold text-center text-gradient-gold mb-16"
          >
            Featured Performances
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group"
              >
                <div className="aspect-video rounded-lg overflow-hidden noir-shadow hover-lift">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-display font-bold text-gold-400 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gold-300 mb-2">{video.description}</p>
                  <div className="flex items-center gap-2 text-gold-500 text-sm">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filmography Section */}
      <section id="filmography" className="section-padding bg-noir-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold text-center text-gradient-gold mb-16"
          >
            Filmography
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filmography.map((film, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-noir-800 rounded-lg overflow-hidden hover-lift"
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-gold-500/20 to-crimson-500/20 relative overflow-hidden">
                  {film.posterUrl && (
                    <Image
                      src={film.posterUrl}
                      alt={`${film.title} Poster`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  {!film.posterUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <p className="text-gold-500 text-xl font-display font-bold mb-2">
                          {film.title}
                        </p>
                        <p className="text-gold-300 text-sm">{film.year}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-gold-500 text-noir-950 px-3 py-1 rounded-full text-xs font-semibold z-10">
                    {film.role}
                  </div>
                  {film.trailerUrl && (
                    <a
                      href={film.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <div className="bg-gold-500/90 backdrop-blur-sm rounded-full p-4 hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-noir-950" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gold-400 mb-2 group-hover:text-gold-300 transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-gold-300 text-sm mb-3">{film.description}</p>
                  <div className="flex items-center justify-between text-gold-500 text-sm mb-3">
                    <span>{film.language}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 fill-current text-gold-400" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      {film.rating}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {film.trailerUrl && (
                      <a
                        href={film.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gold-500 hover:bg-gold-400 text-noir-950 px-4 py-2 rounded-md text-sm font-semibold text-center transition-colors"
                      >
                        Watch Trailer
                      </a>
                    )}
                    <a
                      href={film.imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-noir-700 hover:bg-noir-600 text-gold-400 px-4 py-2 rounded-md text-sm font-semibold text-center transition-colors"
                    >
                      IMDb
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-noir-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient-gold mb-8">
                About Nora
              </h2>
              <div className="space-y-4 text-gold-200 text-lg leading-relaxed">
                <p>
                  Nora Fatehi is an international actress, model, and performer who has captivated audiences worldwide with her extraordinary talent and magnetic presence.
                </p>
                <p>
                  With roots spanning multiple continents, she brings a unique global perspective to every project, seamlessly blending diverse cultural influences into her work.
                </p>
                <p>
                  From high-fashion editorials to blockbuster films, Nora&apos;s versatility and dedication to her craft have established her as one of the industry&apos;s most sought-after talents.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">50+</div>
                  <div className="text-gold-300 text-sm">Productions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">20+</div>
                  <div className="text-gold-300 text-sm">Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">100M+</div>
                  <div className="text-gold-300 text-sm">Followers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gold-500/20 to-crimson-500/20 rounded-lg overflow-hidden noir-shadow">
                <Image
                  src="/images/Nora-Fatehi-10.jpg"
                  alt="Nora Fatehi Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-gold-500 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-gold-500 rounded-br-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-noir-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold text-gradient-gold mb-8"
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gold-300 mb-12"
          >
            Available for fashion campaigns, film projects, and brand collaborations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:contact@norafatehi.com"
              className="px-8 py-4 luxury-gradient text-noir-950 font-semibold text-lg rounded-full hover:scale-105 transition-transform duration-300 noir-shadow"
            >
              Get In Touch
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-transparent border-2 border-gold-500 text-gold-500 font-semibold text-lg rounded-full hover:bg-gold-500 hover:text-noir-950 transition-all duration-300"
            >
              View Work
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-noir-950 border-t border-gold-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-display font-bold text-gradient-gold mb-4 md:mb-0">
              NORA FATEHI
            </div>
            <div className="flex gap-6 text-gold-400">
              <a href="#" className="hover:text-gold-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold-300 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gold-300 transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gold-500/60 text-sm">
            © 2025 Nora Fatehi. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

const portfolioItems = [
  {
    title: "Fashion Editorial",
    category: "Vogue Magazine",
    imageUrl: "/images/new-hot-nora-fatehi-full-hd-wallpapers-new-pic-11632484768evdjalvno6.jpg"
  },
  {
    title: "Brand Campaign",
    category: "Luxury Fashion",
    imageUrl: "/images/new-hot-nora-fatehi-full-hd-wallpapers-pic-11632484938u1rkwlgolr.jpg"
  },
  {
    title: "Film Still",
    category: "International Cinema",
    imageUrl: "/images/nora-fatehi-latest-hot-hd-photos-for-mobile-pic-11632484979ztgg3t4ki8.jpg"
  },
  {
    title: "Red Carpet",
    category: "Cannes Festival",
    imageUrl: "/images/wp6710049.jpg"
  },
  {
    title: "Magazine Cover",
    category: "Elle Magazine",
    imageUrl: "/images/images (2).jpeg"
  },
  {
    title: "Dance Performance",
    category: "Award Show",
    imageUrl: "/images/images (3).jpeg"
  },
  {
    title: "Commercial",
    category: "Global Brand",
    imageUrl: "/images/images (4).jpeg"
  },
  {
    title: "Fashion Week",
    category: "Paris Fashion Week",
    imageUrl: "/images/vvv.jpeg"
  },
  {
    title: "Portrait Series",
    category: "Artistic Photography",
    imageUrl: "/images/591244-gtfnvbc7.webp"
  },
];

const featuredVideos = [
  {
    title: "Dilbar | Satyameva Jayate",
    description: "Iconic dance performance that broke records with over 1 billion views",
    embedUrl: "https://www.youtube.com/embed/JFcgOboQZ08",
    views: "1.2B+ views",
    year: "2018"
  },
  {
    title: "Garmi | Street Dancer 3D",
    description: "Electrifying dance number featuring Nora's signature style",
    embedUrl: "https://www.youtube.com/embed/l_MyUGq7pgs",
    views: "800M+ views",
    year: "2020"
  },
  {
    title: "Kusu Kusu | Satyameva Jayate 2",
    description: "Sensational performance showcasing versatility and grace",
    embedUrl: "https://www.youtube.com/embed/TCx1yMegJ4A",
    views: "400M+ views",
    year: "2021"
  },
  {
    title: "Dance Meri Rani | Guru Randhawa",
    description: "International collaboration with stunning choreography",
    embedUrl: "https://www.youtube.com/embed/nCeFbK-Weve",
    views: "700M+ views",
    year: "2021"
  },
  {
    title: "Set It Down | Nora Fatehi",
    description: "Global debut single showcasing international appeal",
    embedUrl: "https://www.youtube.com/embed/PzIjdP_vaqw",
    views: "50M+ views",
    year: "2023"
  }
];

const filmography = [
  {
    title: "Street Dancer 3D",
    year: "2020",
    role: "Lead Actress",
    language: "Hindi",
    rating: "7.2/10",
    description: "Dance drama featuring Nora's exceptional choreography and performance",
    imdbUrl: "https://www.imdb.com/title/tt8910342/",
    trailerUrl: "https://www.youtube.com/watch?v=_1VJN_eNLfE",
    posterUrl: "/images/filmography/1.jpg"
  },
  {
    title: "Satyameva Jayate 2",
    year: "2021",
    role: "Special Appearance",
    language: "Hindi",
    rating: "6.8/10",
    description: "Action thriller with memorable dance sequences",
    imdbUrl: "https://www.imdb.com/title/tt9900782/",
    trailerUrl: "https://www.youtube.com/watch?v=nQwj_7LQjjs",
    posterUrl: "/images/filmography/2.jpeg"
  },
  {
    title: "Bhuj: The Pride of India",
    year: "2021",
    role: "Supporting Role",
    language: "Hindi",
    rating: "7.1/10",
    description: "War drama based on true events during 1971 Indo-Pak war",
    imdbUrl: "https://www.imdb.com/title/tt6920080/",
    trailerUrl: "https://www.youtube.com/watch?v=l_MyUGq7pgs",
    posterUrl: "/images/filmography/3.jpeg"
  },
  {
    title: "Batla House",
    year: "2019",
    role: "Item Number",
    language: "Hindi",
    rating: "7.3/10",
    description: "Thriller based on Batla House encounter case",
    imdbUrl: "https://www.imdb.com/title/tt8869978/",
    trailerUrl: "https://www.youtube.com/watch?v=KW9taIYNHpM",
    posterUrl: "/images/filmography/4.jpeg"
  },
  {
    title: "Stree",
    year: "2018",
    role: "Special Appearance",
    language: "Hindi",
    rating: "7.8/10",
    description: "Horror comedy that became one of the highest-grossing films",
    imdbUrl: "https://www.imdb.com/title/tt8108274/",
    trailerUrl: "https://www.youtube.com/watch?v=QDhA1JBhWNY",
    posterUrl: "/images/filmography/5.jpeg"
  },
  {
    title: "Satyameva Jayate",
    year: "2018",
    role: "Special Appearance",
    language: "Hindi",
    rating: "6.7/10",
    description: "Action thriller featuring the iconic 'Dilbar' song",
    imdbUrl: "https://www.imdb.com/title/tt7838252/",
    trailerUrl: "https://www.youtube.com/watch?v=JFcgOboQZ08",
    posterUrl: "/images/filmography/6.jpeg"
  },
  {
    title: "Bahubali: The Beginning",
    year: "2015",
    role: "Manohari Dancer",
    language: "Telugu/Tamil",
    rating: "8.0/10",
    description: "Epic historical fantasy that redefined Indian cinema",
    imdbUrl: "https://www.imdb.com/title/tt2631186/",
    trailerUrl: "https://www.youtube.com/watch?v=sOEg_YZQsTI",
    posterUrl: "/images/filmography/7.jpeg"
  },
  {
    title: "Rocky Handsome",
    year: "2016",
    role: "Item Number",
    language: "Hindi",
    rating: "6.8/10",
    description: "Action thriller with high-octane sequences",
    imdbUrl: "https://www.imdb.com/title/tt4667888/",
    trailerUrl: "https://www.youtube.com/watch?v=zZsOQDFmCzY",
    posterUrl: "/images/filmography/8.jpg"
  },
  {
    title: "My Birthday Song",
    year: "2018",
    role: "Lead Actress",
    language: "Hindi",
    rating: "6.5/10",
    description: "Psychological thriller showcasing versatile acting",
    imdbUrl: "https://www.imdb.com/title/tt7363076/",
    trailerUrl: "https://www.youtube.com/watch?v=VyqFdZ7bKPE",
    posterUrl: "/images/filmography/9.jpeg"
  }
];
