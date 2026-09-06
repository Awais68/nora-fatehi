/**
 * TMDB image CDN helpers.
 * All artwork is served from TMDB's public image CDN in HD, so nothing
 * heavy ships from /public and every poster/still stays crisp on retina.
 */

const TMDB = "https://image.tmdb.org/t/p"

export type PosterSize = "w342" | "w500" | "w780" | "original"
export type BackdropSize = "w780" | "w1280" | "original"
export type ProfileSize = "w342" | "h632" | "original"

export const poster = (hash: string, size: PosterSize = "w500") =>
  `${TMDB}/${size}/${hash}`

export const backdrop = (hash: string, size: BackdropSize = "original") =>
  `${TMDB}/${size}/${hash}`

export const profile = (hash: string, size: ProfileSize = "original") =>
  `${TMDB}/${size}/${hash}`

/** YouTube still — maxresdefault is 1280x720 and exists for every video here. */
export const youtubeThumb = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

export const youtubeEmbed = (id: string, autoplay = true) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`

export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`
