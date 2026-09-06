import BookingProvider from "@/components/BookingProvider"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import OffersTicker from "@/components/OffersTicker"
import NowShowing from "@/components/NowShowing"
import ComingSoon from "@/components/ComingSoon"
import Offers from "@/components/Offers"
import VideoGallery from "@/components/VideoGallery"
import Filmography from "@/components/Filmography"
import Gallery from "@/components/Gallery"
import About from "@/components/About"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <main className="min-h-screen bg-noir-950">
        <Hero />
        <OffersTicker />
        <NowShowing />
        <ComingSoon />
        <Offers />
        <VideoGallery />
        <Filmography />
        <Gallery />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </BookingProvider>
  )
}
