import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Nosotros', href: '#nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo} aria-label="Inicio">
        <img src="/logo.png" alt="Estela Visual" style={{ height: '45px', width: 'auto' }} />
      </a>

      <div className={styles.right}>
        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className={styles.cta}>
          CONTACTO
        </a>
      </div>
    </nav>
  )
}
