import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const ITEMS = [
  { id: 'servicios', t: 'Servicios', n: '02A', d: 'Cinco servicios para tu marca.' },
  { id: 'portfolio', t: 'Portfolio', n: '03A', d: 'Eventos, inmobiliaria, books y paisajes.' },
  { id: 'nosotros', t: 'Nosotros', n: '04A', d: 'Dos hermanos, una mirada.' },
  { id: 'contacto', t: 'Contacto', n: '05A', d: 'Contanos sobre tu proyecto.' },
]
const ORDER = ['inicio', ...ITEMS.map((i) => i.id)]

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const [ang, setAng] = useState(0)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const dial = useRef(null)
  const lens = useRef(null)

  const activeIdx = ITEMS.findIndex((i) => i.id === active)
  const home = activeIdx >= 0 ? activeIdx : 0
  // gira por el camino más corto hacia el modo elegido
  const aim = (i) => setAng((a) => a + ((((i * 90 - a) % 360) + 540) % 360) - 180)
  const closeMenu = () => { setOpen(false); setHover(null) }

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ORDER.forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s) })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeMenu()
    addEventListener('keydown', onKey)
    lens.current?.querySelector('a')?.focus({ preventScroll: true })
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  const toggle = () => {
    if (open) return closeMenu()
    const r = dial.current.getBoundingClientRect()
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    aim(home)
    setOpen(true)
  }

  const frame = String(Math.max(1, ORDER.indexOf(active) + 1)).padStart(2, '0') + 'A'
  const v = ITEMS[hover ?? home]

  return (
    <>
      <a className={styles.edge} href="#inicio" aria-label="Estela Visual, ir al inicio">
        <span>Estela Visual</span>
        <i />
        <em>{frame}</em>
      </a>

      <div className={`${styles.root} ${open ? styles.open : ''}`}>
        <button ref={dial} type="button" className={styles.dial} onClick={toggle} aria-expanded={open} aria-controls="lente" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          <span className={styles.knurl} />
          <span className={`${styles.core} ${open ? styles.x : ''}`}>{open ? '×' : frame}</span>
        </button>

        <div id="lente" className={styles.iris} style={{ '--x': origin.x + 'px', '--y': origin.y + 'px' }}>
          <nav ref={lens} className={styles.lens} aria-label="Principal" onMouseLeave={() => { setHover(null); aim(home) }}>
            <span className={styles.ring} />
            <span className={styles.rim} />
            <span className={styles.wedge} style={{ transform: `rotate(${ang}deg)` }} />
            <div className={styles.center}><b>{v.n}</b><span>{v.d}</span></div>
            {ITEMS.map((it, i) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={styles.item}
                style={{ '--a': i * 90 + 'deg', '--i': i }}
                tabIndex={open ? 0 : -1}
                onMouseEnter={() => { setHover(i); aim(i) }}
                onFocus={() => { setHover(i); aim(i) }}
                onClick={closeMenu}
              >
                {it.t}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
