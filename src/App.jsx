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
import ScrollTop from './components/ScrollTop'

export default function App() {
  return (
    <div className="app">
      <CustomCursor />

      <div className="hero-bg" />
      <div className="video-overlay" />

      <Navbar />
      <Hero />
      <Servicios />
      <Portfolio />
      <Nosotros />
      <Contacto />
      <Ebook />
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  )
}
