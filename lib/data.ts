/**
 * Single source of truth for the site's content.
 *
 * Artwork hashes, ratings, runtimes and release dates come from TMDB;
 * video ids are verified YouTube uploads from the official label channels.
 */

export type Movie = {
  id: string
  tmdbId: number
  imdbId?: string
  title: string
  /** ISO date, or null when the studio has not dated it yet. */
  releaseDate: string | null
  role: string
  language: string
  genres: string[]
  runtime: string | null
  /** TMDB user score, 0-100. */
  score: number | null
  overview: string
  /** TMDB poster hash, or null when the title has no artwork yet. */
  poster: string | null
  backdrop: string | null
  trailer: string | null
  /** Marketing badge shown on cards in the "Now Showing" rail. */
  tag?: string
}

/* ------------------------------------------------------------------ */
/*  In cinemas — bookable                                              */
/* ------------------------------------------------------------------ */

export const nowShowing: Movie[] = [
  {
    id: "kd-the-devil",
    tmdbId: 1103473,
    title: "KD – The Devil",
    releaseDate: "2026-04-30",
    role: "Special Appearance",
    language: "Kannada",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 21m",
    score: 53,
    overview:
      "A sprawling 1970s Bangalore gangster saga, with Nora headlining one of the film's biggest musical set pieces.",
    poster: "nEuEMJrnLBneE9tJlmzbhCFLu95.jpg",
    backdrop: "cNvaYDnGSfmOFi2yGnOmRIM5pce.jpg",
    trailer: "yQLKrS5N4KU",
    tag: "In Cinemas",
  },
  {
    id: "thamma",
    tmdbId: 1196364,
    title: "Thamma",
    releaseDate: "2025-10-21",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Horror", "Comedy", "Fantasy"],
    runtime: "2h 29m",
    score: 66,
    overview:
      "The Diwali horror-comedy blockbuster from the Maddock supernatural universe, still holding screens nationwide.",
    poster: "udkbDwBbysCGEydt0FHnl9dVO2k.jpg",
    backdrop: "e5bFtChejaGio218NejT0jXgSux.jpg",
    trailer: "Mod_oXpftJA",
    tag: "Holding Strong",
  },
  {
    id: "ufff-yeh-siyapaa",
    tmdbId: 1534291,
    title: "Ufff Yeh Siyapaa",
    releaseDate: "2025-09-05",
    role: "Lead",
    language: "Hindi",
    genres: ["Comedy", "Thriller"],
    runtime: "1h 56m",
    score: 50,
    overview:
      "A screwball caper scored by A. R. Rahman, with Nora in one of her meatiest comedic leads to date.",
    poster: "6ntsWm5J9S45ItTBjQvNRy3wWfY.jpg",
    backdrop: "njJQBmalOYu6Re5FObEGtbhVmWm.jpg",
    trailer: "Sq0c5UmRIsc",
    tag: "Final Week",
  },
  {
    id: "street-dancer-3d-rerelease",
    tmdbId: 644712,
    imdbId: "tt8910342",
    title: "Street Dancer 3D",
    releaseDate: "2020-01-24",
    role: "Lead Actress",
    language: "Hindi",
    genres: ["Drama", "Music"],
    runtime: "2h 26m",
    score: 66,
    overview:
      "Back on the big screen for the Dance Fest retrospective — remastered, and still the definitive Nora Fatehi showcase.",
    poster: "mnsoKSS6EZNB7y2kEzXHdLm1U0E.jpg",
    backdrop: "zmIcouKMZNpHvTev6TCZrDy7w9V.jpg",
    trailer: "2Ym7LJv6L_c",
    tag: "Re-Release",
  },
]

/* ------------------------------------------------------------------ */
/*  Upcoming                                                           */
/* ------------------------------------------------------------------ */

export const comingSoon: Movie[] = [
  {
    id: "jailer-2",
    tmdbId: 1234139,
    title: "Jailer 2",
    releaseDate: "2026-10-15",
    role: "Special Appearance",
    language: "Tamil",
    genres: ["Action", "Thriller"],
    runtime: null,
    score: null,
    overview:
      "Nelson Dilipkumar's sequel to the 2023 phenomenon, with Nora joining the ensemble for a marquee musical number.",
    poster: "9tTHcPNt6OgkTVzGu4gwVQDFRWr.jpg",
    backdrop: "m0ks2o59mOAz6WdCybJ5FAUNTOU.jpg",
    trailer: "ugzPkXEqff4",
    tag: "Advance Booking Open",
  },
  {
    id: "side-heroes",
    tmdbId: 1525482,
    title: "Side Heroes",
    releaseDate: "2027-07-30",
    role: "Lead",
    language: "Hindi",
    genres: ["Comedy", "Drama"],
    runtime: null,
    score: null,
    overview:
      "An ensemble comedy about the people who never get the close-up — Nora in a full-length dramatic lead.",
    // TMDB only carries a cast headshot for this title — show the title card instead.
    poster: null,
    backdrop: null,
    trailer: null,
    tag: "Announced",
  },
  {
    id: "krrish-4",
    tmdbId: 496318,
    title: "Krrish 4",
    releaseDate: null,
    role: "Cast",
    language: "Hindi",
    genres: ["Action", "Sci-Fi", "Adventure"],
    runtime: null,
    score: null,
    overview:
      "The fourth chapter of India's biggest superhero franchise. Release date to be announced by the studio.",
    // TMDB only carries a cast headshot for this title — show the title card instead.
    poster: null,
    backdrop: null,
    trailer: null,
    tag: "In Production",
  },
  {
    id: "kanchana-4",
    tmdbId: 1313676,
    title: "Kanchana 4",
    releaseDate: null,
    role: "Cast",
    language: "Tamil",
    genres: ["Horror", "Comedy"],
    runtime: null,
    score: null,
    overview:
      "Raghava Lawrence returns to the horror-comedy series that made him a box-office institution.",
    poster: "f2AMsfdvEXjLo1a2qEYMTxwPxhs.jpg",
    backdrop: null,
    trailer: null,
    tag: "In Production",
  },
]

/* ------------------------------------------------------------------ */
/*  Full filmography                                                   */
/* ------------------------------------------------------------------ */

export const filmography: Movie[] = [
  {
    id: "be-happy",
    tmdbId: 607141,
    title: "Be Happy",
    releaseDate: "2025-03-14",
    role: "Supporting Role",
    language: "Hindi",
    genres: ["Drama", "Family"],
    runtime: "2h 9m",
    score: 64,
    overview:
      "A father-daughter dance drama opposite Abhishek Bachchan, streaming worldwide on Prime Video.",
    poster: "6bvW47MtJKo2ipPYJ2xDvdf4zbz.jpg",
    backdrop: "a4H5TFw7p7hCzED5zKuNzjBbi5h.jpg",
    trailer: "neApkeqVj4w",
  },
  {
    id: "matka",
    tmdbId: 1233327,
    title: "Matka",
    releaseDate: "2024-11-14",
    role: "Special Appearance",
    language: "Telugu",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 39m",
    score: 49,
    overview: "A period crime epic tracing the rise of India's numbers racket across four decades.",
    poster: "1LzHbFk93Lp00ZsqGHPAnAoUJW8.jpg",
    backdrop: "kyVcNF6GRthdiT4oZn5XgJtl0F7.jpg",
    trailer: "FKtnAhHnfUo",
  },
  {
    id: "madgaon-express",
    tmdbId: 1201015,
    title: "Madgaon Express",
    releaseDate: "2024-03-22",
    role: "Supporting Role",
    language: "Hindi",
    genres: ["Comedy", "Adventure"],
    runtime: "2h 25m",
    score: 64,
    overview: "Kunal Kemmu's directorial debut — a Goa road-trip comedy that became a sleeper hit.",
    poster: "kS1s8FKLWFR6cn1rlVUyqURb5os.jpg",
    backdrop: "grHW40Lv8gzahOKHNr4oCuKHwaR.jpg",
    trailer: "B7VP47oCZfE",
  },
  {
    id: "crakk",
    tmdbId: 1215938,
    title: "Crakk: Jeetega... Toh Jiyegaa",
    releaseDate: "2024-02-23",
    role: "Lead Actress",
    language: "Hindi",
    genres: ["Action", "Thriller"],
    runtime: "2h 34m",
    score: 55,
    overview: "An extreme-sports action thriller with Nora as an Interpol officer chasing an underground games ring.",
    poster: "tmrjo8M4rm6NhkBKk20wDSj91go.jpg",
    backdrop: "xzwNTmJzCxn4gBpAsV9o2Krkx0C.jpg",
    trailer: "8xjSvwi7W-0",
  },
  {
    id: "an-action-hero",
    tmdbId: 882826,
    title: "An Action Hero",
    releaseDate: "2022-12-02",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Comedy", "Thriller"],
    runtime: "2h 8m",
    score: 65,
    overview: "A meta satire on stardom, featuring the viral 'Jehda Nasha' number.",
    poster: "tI91k15dJpQbOMofKeKlYx3qDik.jpg",
    backdrop: "gmnX4h9BQrBZOVjzfr2c3eBRmx3.jpg",
    trailer: "vCTt_PnWHPg",
  },
  {
    id: "rocket-gang",
    tmdbId: 1035366,
    title: "Rocket Gang",
    releaseDate: "2022-11-11",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Comedy", "Fantasy", "Music"],
    runtime: "2h 20m",
    score: 45,
    overview: "Bosco Martis's dance-fantasy debut, choreography-first from the first frame.",
    poster: "8icRtVuWUDvBITWCeMBmRTL8chu.jpg",
    backdrop: "gj8jEE1zOcyfzxVlxziSHiY1aHV.jpg",
    trailer: "kqp2kUkXpCs",
  },
  {
    id: "thank-god",
    tmdbId: 783723,
    title: "Thank God",
    releaseDate: "2022-10-25",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Comedy", "Fantasy"],
    runtime: "2h 1m",
    score: 63,
    overview: "A Diwali fantasy comedy carrying 'Manike', one of Nora's most-streamed tracks.",
    poster: "dxKtwP2Q4n3jfqMIqxoShX08UkH.jpg",
    backdrop: "vA5tZeY30S8GPsRz5CeS4VPNYWZ.jpg",
    trailer: "x-sgnhYJGOA",
  },
  {
    id: "satyameva-jayate-2",
    tmdbId: 695973,
    imdbId: "tt9900782",
    title: "Satyameva Jayate 2",
    releaseDate: "2021-11-25",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Drama", "Thriller"],
    runtime: "2h 21m",
    score: 55,
    overview: "The sequel to the 2018 hit, home to the chart-topping 'Kusu Kusu'.",
    poster: "y1ebOObyi97slwBTljIifE67PR5.jpg",
    backdrop: "80cXy6LF1SXcdonuMr21S1z5y70.jpg",
    trailer: "e6VZiwlzhSw",
  },
  {
    id: "bhuj",
    tmdbId: 590397,
    imdbId: "tt6920080",
    title: "Bhuj: The Pride of India",
    releaseDate: "2021-08-13",
    role: "Supporting Role",
    language: "Hindi",
    genres: ["War", "Action", "Drama"],
    runtime: "1h 53m",
    score: 53,
    overview: "A war drama built on true events from the 1971 Indo-Pak conflict.",
    poster: "zc0OzUOF8B4x4AH4bubxw0mHCnF.jpg",
    backdrop: "Aoq4QMrrBJcFt6WQcwj6px2LXQp.jpg",
    trailer: "YngLZzBuzHA",
  },
  {
    id: "street-dancer-3d",
    tmdbId: 644712,
    imdbId: "tt8910342",
    title: "Street Dancer 3D",
    releaseDate: "2020-01-24",
    role: "Lead Actress",
    language: "Hindi",
    genres: ["Drama", "Music"],
    runtime: "2h 26m",
    score: 66,
    overview: "Remo D'Souza's dance drama — the film that put Nora's choreography centre-frame.",
    poster: "mnsoKSS6EZNB7y2kEzXHdLm1U0E.jpg",
    backdrop: "zmIcouKMZNpHvTev6TCZrDy7w9V.jpg",
    trailer: "2Ym7LJv6L_c",
  },
  {
    id: "marjaavaan",
    tmdbId: 627715,
    title: "Marjaavaan",
    releaseDate: "2019-11-15",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Drama", "Romance"],
    runtime: "2h 13m",
    score: 70,
    overview: "A high-melodrama revenge saga, with Nora fronting 'Ek Toh Kam Zindagani'.",
    poster: "xILMQFZMQdJq3D7J6TuLrW6A3W5.jpg",
    backdrop: "aKnxz5bTgKGIPwwoDNXmWB6TEZx.jpg",
    trailer: "L7TbPUOn1hc",
  },
  {
    id: "batla-house",
    tmdbId: 550485,
    imdbId: "tt8869978",
    title: "Batla House",
    releaseDate: "2019-08-15",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 26m",
    score: 68,
    overview: "A procedural thriller on the Batla House encounter — and the home of 'O Saki Saki'.",
    poster: "lHATvvxVvcHRy9G8ZJGXA7J6JEg.jpg",
    backdrop: "wzeWyCxgOzfFdIy6Lcwbt0ckpAs.jpg",
    trailer: "dG3K6jB3iW8",
  },
  {
    id: "bharat",
    tmdbId: 569594,
    title: "Bharat",
    releaseDate: "2019-06-05",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Drama", "Action"],
    runtime: "2h 35m",
    score: 60,
    overview: "A sweeping six-decade family epic spanning Partition to the present day.",
    poster: "aawdjzVsfKvRRIFu9Ni74wZyjc8.jpg",
    backdrop: "1CpOFqgxOFOL2MxTWcIRfg6axy4.jpg",
    trailer: "Ea_GKoe81GY",
  },
  {
    id: "stree",
    tmdbId: 533991,
    imdbId: "tt8108274",
    title: "Stree",
    releaseDate: "2018-08-31",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Horror", "Comedy"],
    runtime: "2h 8m",
    score: 70,
    overview: "The horror comedy that launched a universe and became one of the year's biggest hits.",
    poster: "euhgW6hpDYw7nxFDjqHn0eKvQPX.jpg",
    backdrop: "4qgK44Ee1iRXTRp6w9LvMz76LJw.jpg",
    trailer: "gzeaGcLLl_A",
  },
  {
    id: "satyameva-jayate",
    tmdbId: 531597,
    imdbId: "tt7838252",
    title: "Satyameva Jayate",
    releaseDate: "2018-08-15",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 22m",
    score: 64,
    overview: "The vigilante action thriller that gave the world 'Dilbar'.",
    poster: "yXdzw7Mg7UeAnIRMsMgP9DiiGuk.jpg",
    backdrop: "i2KL4H2C2IIAE0LyJZbmN8LaHvS.jpg",
    trailer: "odXKXLG43co",
  },
  {
    id: "my-birthday-song",
    tmdbId: 500055,
    imdbId: "tt7363076",
    title: "My Birthday Song",
    releaseDate: "2018-01-19",
    role: "Lead Actress",
    language: "Hindi",
    genres: ["Thriller", "Mystery"],
    runtime: "1h 35m",
    score: 57,
    overview: "A time-loop psychological thriller and Nora's first Hindi acting lead.",
    poster: "2Yb3m0xxJnhWMI2WWRwiLRdJPaH.jpg",
    backdrop: "w4oswEUxnewLAS7uxGZkYsAgHmq.jpg",
    trailer: "5_IhgKO3F9c",
  },
  {
    id: "rocky-handsome",
    tmdbId: 376873,
    imdbId: "tt4667888",
    title: "Rocky Handsome",
    releaseDate: "2016-03-25",
    role: "Special Appearance",
    language: "Hindi",
    genres: ["Action", "Thriller"],
    runtime: "2h 6m",
    score: 63,
    overview: "A relentless action thriller featuring the club anthem 'Rock Tha Party'.",
    poster: "x6jfeYy7KTBk4eS0kMUHTd4sGtZ.jpg",
    backdrop: "pmGEEA8a4O7JGOz37ThRbjCloNI.jpg",
    trailer: "mMjPokU5-0w",
  },
  {
    id: "baahubali",
    tmdbId: 256040,
    imdbId: "tt2631186",
    title: "Baahubali: The Beginning",
    releaseDate: "2015-07-10",
    role: "Manohari Dancer",
    language: "Telugu / Tamil",
    genres: ["Action", "Drama", "Fantasy"],
    runtime: "2h 39m",
    score: 76,
    overview: "The epic that redefined the scale of Indian cinema — Nora fronts 'Manohari'.",
    poster: "9BAjt8nSSms62uOVYn1t3C3dVto.jpg",
    backdrop: "e9ZEuHGHZ06AToHlfN1L7nejJ7W.jpg",
    trailer: "3NQRhE772b0",
  },
]

/* ------------------------------------------------------------------ */
/*  Music videos & performances                                        */
/* ------------------------------------------------------------------ */

export type Video = {
  id: string
  youtubeId: string
  title: string
  from: string
  description: string
  views: string
  year: string
}

export const featuredVideos: Video[] = [
  {
    id: "dilbar",
    youtubeId: "TRa9IMvccjg",
    title: "Dilbar",
    from: "Satyameva Jayate",
    description:
      "The number that changed everything — the first Indian song to cross 20 million views in 24 hours.",
    views: "1.4B+ views",
    year: "2018",
  },
  {
    id: "o-saki-saki",
    youtubeId: "_uUdJalMaF8",
    title: "O Saki Saki",
    from: "Batla House",
    description: "A reinvention of a 2004 classic, and the defining dance single of its year.",
    views: "1.1B+ views",
    year: "2019",
  },
  {
    id: "garmi",
    youtubeId: "IE8OD5FbU-c",
    title: "Garmi",
    from: "Street Dancer 3D",
    description: "Remo D'Souza choreography at full tilt, opposite Varun Dhawan.",
    views: "600M+ views",
    year: "2020",
  },
  {
    id: "naach-meri-rani",
    youtubeId: "TCx1yMegJ4A",
    title: "Naach Meri Rani",
    from: "Guru Randhawa",
    description: "Bosco-choreographed, shot as a single-take-styled showcase.",
    views: "800M+ views",
    year: "2020",
  },
  {
    id: "kusu-kusu",
    youtubeId: "RgzLnmTaCAU",
    title: "Kusu Kusu",
    from: "Satyameva Jayate 2",
    description: "An Afro-Latin fusion routine that pushed the item number somewhere new.",
    views: "400M+ views",
    year: "2021",
  },
  {
    id: "zaalima-coca-cola",
    youtubeId: "t6n-BVCelnU",
    title: "Zaalima Coca Cola",
    from: "Single",
    description: "Desert-set, Shreya Ghoshal on vocals, Nora carrying the frame alone.",
    views: "500M+ views",
    year: "2021",
  },
  {
    id: "chhor-denge",
    youtubeId: "hGf8rOwFzvo",
    title: "Chhor Denge",
    from: "Parampara Tandon",
    description: "The acting turn that proved the range beyond dance.",
    views: "400M+ views",
    year: "2021",
  },
  {
    id: "dance-meri-rani",
    youtubeId: "G-XMiVMlLRI",
    title: "Dance Meri Rani",
    from: "Guru Randhawa",
    description: "A stadium-scale follow-up with international production values.",
    views: "300M+ views",
    year: "2021",
  },
  {
    id: "manike",
    youtubeId: "zqHUMF9syFA",
    title: "Manike",
    from: "Thank God",
    description: "The Sri Lankan viral hit rebuilt as a full Bollywood production number.",
    views: "300M+ views",
    year: "2022",
  },
  {
    id: "manohari",
    youtubeId: "snpV6awcBPo",
    title: "Manohari",
    from: "Baahubali: The Beginning",
    description: "The breakout — a debut on the biggest canvas Indian cinema had built.",
    views: "150M+ views",
    year: "2015",
  },
  {
    id: "sexy-in-my-dress",
    youtubeId: "nVPFfbg2clk",
    title: "Sexy In My Dress",
    from: "International Single",
    description: "An English-language release aimed squarely at the global market.",
    views: "40M+ views",
    year: "2023",
  },
]

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  id: string
  /** TMDB hash. */
  src: string
  kind: "portrait" | "still"
  title: string
  caption: string
  width: number
  height: number
}

export const gallery: GalleryItem[] = [
  {
    id: "p1",
    src: "fdMM1zC3m1JIeMLVXUTLdhZ48CV.jpg",
    kind: "portrait",
    title: "Editorial Portrait",
    caption: "Press portrait",
    width: 1249,
    height: 1872,
  },
  {
    id: "p2",
    src: "jKvLkySOJFUUnUdE7Zo4oPb9ZzM.jpg",
    kind: "portrait",
    title: "Golden Hour",
    caption: "Campaign still",
    width: 1059,
    height: 1588,
  },
  {
    id: "p3",
    src: "lLG4CpArt9vB8CFFeKam2KYHm6c.jpg",
    kind: "portrait",
    title: "Studio Session",
    caption: "Press portrait",
    width: 961,
    height: 1440,
  },
  {
    id: "p4",
    src: "d9kcyTKvksFOg1emWJdVVeMLVGz.jpg",
    kind: "portrait",
    title: "On Set",
    caption: "Production portrait",
    width: 720,
    height: 1079,
  },
  {
    id: "s1",
    src: "zmIcouKMZNpHvTev6TCZrDy7w9V.jpg",
    kind: "still",
    title: "Street Dancer 3D",
    caption: "Film still · 2020",
    width: 1920,
    height: 1080,
  },
  {
    id: "s2",
    src: "xzwNTmJzCxn4gBpAsV9o2Krkx0C.jpg",
    kind: "still",
    title: "Crakk",
    caption: "Film still · 2024",
    width: 1920,
    height: 1080,
  },
  {
    id: "s3",
    src: "gmnX4h9BQrBZOVjzfr2c3eBRmx3.jpg",
    kind: "still",
    title: "An Action Hero",
    caption: "Film still · 2022",
    width: 1920,
    height: 1080,
  },
  {
    id: "s4",
    src: "4qgK44Ee1iRXTRp6w9LvMz76LJw.jpg",
    kind: "still",
    title: "Stree",
    caption: "Film still · 2018",
    width: 1920,
    height: 1080,
  },
  {
    id: "s5",
    src: "e9ZEuHGHZ06AToHlfN1L7nejJ7W.jpg",
    kind: "still",
    title: "Baahubali: The Beginning",
    caption: "Film still · 2015",
    width: 1920,
    height: 1080,
  },
  {
    id: "s6",
    src: "e5bFtChejaGio218NejT0jXgSux.jpg",
    kind: "still",
    title: "Thamma",
    caption: "Film still · 2025",
    width: 1920,
    height: 1080,
  },
  {
    id: "s7",
    src: "grHW40Lv8gzahOKHNr4oCuKHwaR.jpg",
    kind: "still",
    title: "Madgaon Express",
    caption: "Film still · 2024",
    width: 1920,
    height: 1080,
  },
  {
    id: "s8",
    src: "cNvaYDnGSfmOFi2yGnOmRIM5pce.jpg",
    kind: "still",
    title: "KD – The Devil",
    caption: "Film still · 2026",
    width: 1920,
    height: 1080,
  },
]

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export type HeroSlide = {
  src: string
  alt: string
  kicker: string
  headline: string
  focus: string
}

export const heroSlides: HeroSlide[] = [
  {
    src: "fdMM1zC3m1JIeMLVXUTLdhZ48CV.jpg",
    alt: "Nora Fatehi editorial portrait",
    kicker: "Actor · Dancer · Producer",
    headline: "Nora Fatehi",
    focus: "50% 22%",
  },
  {
    src: "zmIcouKMZNpHvTev6TCZrDy7w9V.jpg",
    alt: "Still from Street Dancer 3D",
    kicker: "Back in cinemas",
    headline: "Street Dancer 3D",
    focus: "50% 40%",
  },
  {
    src: "jKvLkySOJFUUnUdE7Zo4oPb9ZzM.jpg",
    alt: "Nora Fatehi golden hour portrait",
    kicker: "Four billion streams",
    headline: "The Voice of a Decade",
    focus: "50% 20%",
  },
  {
    src: "cNvaYDnGSfmOFi2yGnOmRIM5pce.jpg",
    alt: "Still from KD – The Devil",
    kicker: "Now showing",
    headline: "KD – The Devil",
    focus: "50% 35%",
  },
  {
    src: "lLG4CpArt9vB8CFFeKam2KYHm6c.jpg",
    alt: "Nora Fatehi studio portrait",
    kicker: "Booking now open",
    headline: "See Her On Screen",
    focus: "50% 22%",
  },
]

/* ------------------------------------------------------------------ */
/*  Career highlights                                                  */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: "35+", label: "Films & Productions" },
  { value: "4B+", label: "Combined Music Views" },
  { value: "6", label: "Languages On Screen" },
  { value: "100M+", label: "Followers Worldwide" },
]
