import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Nosotros', href: '#nosotros' },
]

const SECCIONES = ['servicios', 'portfolio', 'ebook', 'nosotros', 'contacto']

function useActiveSection() {
  const [activa, setActiva] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiva(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    SECCIONES.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activa
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const activa = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuAbierto])

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.logo} aria-label="Inicio" onClick={cerrarMenu}>
          <img src="/logo.png" alt="Estela Visual" style={{ height: '45px', width: 'auto' }} loading="eager" fetchPriority="high" />
        </a>

        {/* Desktop */}
        <div className={styles.right}>
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link} ${activa === href.slice(1) ? styles.linkActivo : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className={styles.cta}>
            CONTACTO
          </a>
        </div>

        {/* Hamburguesa */}
        <button
          className={`${styles.hamburger} ${menuAbierto ? styles.hamburgerAbierto : ''}`}
          onClick={() => setMenuAbierto(v => !v)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Menú móvil overlay */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className={styles.mobileLinks}>
              {[...NAV_LINKS, { label: 'Contacto', href: '#contacto' }].map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    className={`${styles.mobileLink} ${activa === href.slice(1) ? styles.mobileLinkActivo : ''}`}
                    onClick={cerrarMenu}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className={styles.mobileSocial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <a href="https://instagram.com/estelavisual" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialLink}>
                @estelavisual
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
