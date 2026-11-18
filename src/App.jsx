import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import DisenoWeb from './components/DisenoWeb'
import Portfolio from './components/Portfolio'
import Nosotros from './components/Nosotros'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CustomCursor from './components/CustomCursor'
import ScrollTop from './components/ScrollTop'
import Diafragma from './components/Diafragma'

export default function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Diafragma />
      <Navbar />
      <Hero />
      <Servicios />
      <DisenoWeb />
      <Portfolio />
      <Nosotros />
      <Contacto />
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  )
}
