import styles from './Footer.module.css'

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="#C9A84C" stroke="none" />
  </svg>
)

const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const REDES = [
  { Icon: IconInstagram, label: '@estelavisual', href: 'https://instagram.com/estelavisual' },
  { Icon: IconFacebook, label: '/estelavisual', href: 'https://facebook.com/estelavisual' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Columna izquierda — logo y tagline */}
        <div className={styles.colLogo}>
          <a href="#" className={styles.logo}>
            <img src="/logo.png" alt="Estela Visual" style={{ height: '80px', width: 'auto' }} />
          </a>
          <p className={styles.tagline}>Tu historia merece ser contada bien.</p>
        </div>

        {/* Columna derecha — EXPLORA y REDES lado a lado */}
        <div className={styles.colRight}>
          <div className={styles.colGroup}>
            <p className={styles.colTitulo}>EXPLORA</p>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.navLink}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colGroup}>
            <p className={styles.colTitulo}>REDES</p>
            <ul className={styles.navLinks}>
              {REDES.map(({ Icon, label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.redLink}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © 2026 Estela Visual Estudio · La Plata, Buenos Aires · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
