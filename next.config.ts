import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Artwork is served straight from the TMDB and YouTube CDNs and
    // re-encoded to AVIF/WebP by the Next image optimizer.
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "media.themoviedb.org" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // Hero, gallery and portrait shots opt into the higher quality tiers.
    qualities: [75, 90, 92],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
