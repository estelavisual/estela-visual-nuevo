import { useEffect, useRef, useState } from 'react'
import styles from './Portfolio.module.css'
import useReveal from './useReveal'

const range = (p, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${p}-${a + i}`)

// Para mover una foto de serie, cambiá su nombre de lugar. Son los nombres de la carpeta public (sin .jpg).
const GROUPS = [
  { id: 'recitales', name: 'Recitales', alt: 'Fotografía de recitales y shows en vivo', files: range('evento', 1, 6) },
  { id: 'egresados', name: 'Egresados', alt: 'Fotografía de fiestas de egresados', files: range('evento', 7, 10) },
  { id: 'bautismos', name: 'Bautismos', alt: 'Fotografía de bautismos y celebraciones familiares', files: range('evento', 11, 14) },
  { id: 'inmobiliaria', name: 'Inmobiliaria', alt: 'Fotografía inmobiliaria', files: range('inmobiliaria', 1, 6) },
  { id: 'books', name: 'Books', alt: 'Book de fotos personal', files: range('book', 1, 6) },
  { id: 'paisajes', name: 'Paisajes', alt: 'Fotografía de paisajes', files: range('paisaje', 1, 7) },
]
const mkPhotos = (g) => g.files.map((f, i) => ({ src: `/${f}.jpg`, cat: g.name, alt: `${g.alt}, foto ${i + 1}` }))
const CATS = [{ id: 'todas', name: 'Todas', photos: GROUPS.flatMap(mkPhotos) }, ...GROUPS.map((g) => ({ id: g.id, name: g.name, photos: mkPhotos(g) }))]
const DROP = (i) => (i % 5) * 7 // leve desnivel orgánico del tendal

function Print({ p, i, onOpen }) {
  const [hung, setHung] = useState(false)
  const el = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHung(true); io.disconnect() } }, { threshold: 0.2 })
    if (el.current) io.observe(el.current)
    return () => io.disconnect()
  }, [])
  return (
    <button
      ref={el}
      type="button"
      className={`${styles.print} ${hung ? styles.hung : ''}`}
      style={{ '--d': DROP(i) + 'px', '--i': i, animationDelay: Math.min(i, 10) * 70 + 'ms' }}
      onClick={() => onOpen(p)}
      aria-label={`Ver completa: ${p.alt}`}
    >
      <span className={styles.string} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.card}>
        <img src={p.src} alt={p.alt} loading={i < 6 ? 'eager' : 'lazy'} decoding="async" />
        <span className={styles.tag}>{p.cat}</span>
      </span>
    </button>
  )
}

export default function Portfolio() {
  const ref = useReveal()
  const [ci, setCi] = useState(0)
  const [full, setFull] = useState(null)
  const closeRef = useRef(null)
  const photos = CATS[ci].photos

  const step = (d) => {
    const i = photos.findIndex((p) => p.src === full.src)
    setFull(photos[(i + d + photos.length) % photos.length])
  }

  useEffect(() => {
    if (!full) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setFull(null)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    addEventListener('keydown', onKey)
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [full])

  return (
    <section id="portfolio" ref={ref} className={styles.sec}>
      <header className={styles.head}>
        <p className={`${styles.kicker} ${styles.rv}`} data-rv>Portfolio</p>
        <h2 className={`${styles.h2} ${styles.rv}`} data-rv style={{ transitionDelay: '.08s' }}>Un tendal de recuerdos.</h2>
        <p className={`${styles.sub} ${styles.rv}`} data-rv style={{ transitionDelay: '.16s' }}>Cada foto, colgada a secar. Elegí una serie y mirá de cerca.</p>
      </header>

      <div className={`${styles.tabs} ${styles.rv}`} data-rv style={{ transitionDelay: '.22s' }} role="tablist" aria-label="Series del portfolio">
        {CATS.map((c, i) => (
          <button key={c.id} type="button" role="tab" aria-selected={i === ci} className={`${styles.tab} ${i === ci ? styles.on : ''}`} onClick={() => setCi(i)}>
            {c.name}
          </button>
        ))}
      </div>

      <div className={styles.wireWrap}>
        <svg className={styles.wire} viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,4 Q500,24 1000,4" fill="none" stroke="rgba(201,168,76,.45)" strokeWidth="1.3" />
        </svg>
        <div className={styles.line} key={ci}>
          {photos.map((p, i) => <Print key={p.src} p={p} i={i} onOpen={setFull} />)}
        </div>
      </div>

      {full && (
        <div className={styles.lb} role="dialog" aria-modal="true" aria-label={`${full.cat}, foto ampliada`} onClick={() => setFull(null)}>
          <img src={full.src} alt={full.alt} onClick={(e) => e.stopPropagation()} />
          <div className={styles.lbBar} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)}>Anterior</button>
            <span>{full.cat}</span>
            <button type="button" onClick={() => step(1)}>Siguiente</button>
          </div>
          <button ref={closeRef} type="button" className={styles.lbX} onClick={() => setFull(null)}>Cerrar</button>
        </div>
      )}
    </section>
  )
}
