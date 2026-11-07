import s from './Footer.module.css'
import useReveal from './useReveal'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const REDES = [
  { label: 'Instagram @estelavisual', href: 'https://instagram.com/estelavisual' },
  { label: 'Facebook /estelavisual', href: 'https://facebook.com/estelavisual' },
]

export default function Footer() {
  const ref = useReveal()
  return (
    <footer ref={ref} className={s.footer}>
      <a href="#inicio" className={s.mark} aria-label="Estela Visual, volver al inicio">
        <span>Estela</span> <span>Visual</span>
      </a>

      <div className={s.cols}>
        <div>
          <p className={s.t}>Explorá</p>
          <ul>{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
        <div>
          <p className={s.t}>Contacto</p>
          <ul>
            <li><a href="mailto:info@estelavisual.com.ar">info@estelavisual.com.ar</a></li>
            <li><a href="https://wa.me/5492246592370" target="_blank" rel="noopener noreferrer">+549 2246 592370</a></li>
          </ul>
        </div>
        <div>
          <p className={s.t}>Redes</p>
          <ul>{REDES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noopener noreferrer">{r.label}</a></li>)}</ul>
        </div>
      </div>

      <p className={s.copy}>© 2026 Estela Visual Estudio · La Plata, Buenos Aires · Todos los derechos reservados</p>
    </footer>
  )
}
