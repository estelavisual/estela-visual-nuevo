import { useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Portfolio from './components/Portfolio'
import Ebook from './components/Ebook'
import Nosotros from './components/Nosotros'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <video
        ref={videoRef}
        className="video-bg"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="video-overlay" />

      <Navbar />
      <Hero />
      <Servicios />
      <Portfolio />
      <Ebook />
      <Nosotros />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
