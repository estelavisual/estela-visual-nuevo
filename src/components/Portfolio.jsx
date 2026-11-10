import { useEffect, useRef, useState } from 'react'
import styles from './Portfolio.module.css'
import useReveal from './useReveal'

const range = (p, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${p}-${a + i}`)

// Para mover una foto de serie, cambiá su nombre de lugar. Son los nombres de la carpeta public (sin .jpg).
// La primera foto de "files" es la portada de la serie.
const GROUPS = [
  { id: 'recitales', name: 'Recitales', alt: 'Fotografía de recitales y shows en vivo', files: range('evento', 1, 6) },
  { id: 'egresados', name: 'Egresados', alt: 'Fotografía de fiestas de egresados', files: range('evento', 7, 10) },
  { id: 'bautismos', name: 'Bautismos', alt: 'Fotografía de bautismos y celebraciones familiares', files: range('evento', 11, 14) },
  { id: 'inmobiliaria', name: 'Inmobiliaria', alt: 'Fotografía inmobiliaria', files: range('inmobiliaria', 1, 6) },
  { id: 'books', name: 'Books', alt: 'Book de fotos personal', files: range('book', 1, 6) },
  { id: 'paisajes', name: 'Paisajes', alt: 'Fotografía de paisajes', files: range('paisaje', 1, 7) },
].map((g) => ({ ...g, photos: g.files.map((f, i) => ({ src: `/${f}.jpg`, cat: g.name, alt: `${g.alt}, foto ${i + 1}` })) }))

function Print({ p, i, eager, style, onOpen }) {
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
      style={{ animationDelay: Math.min(i, 10) * 60 + 'ms', ...style }}
      onClick={onOpen}
      aria-label={`Ver completa: ${p.alt}`}
    >
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.card}>
        <img src={p.src} alt={p.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <span className={styles.tag}>{p.cat}</span>
      </span>
    </button>
  )
}

export default function Portfolio() {
  const ref = useReveal()
  const [openId, setOpenId] = useState(null)
  const [full, setFull] = useState(null) // { gi, pi }
  const closeRef = useRef(null)
  const openGroup = GROUPS.find((g) => g.id === openId)

  const step = (d) => {
    setFull(({ gi, pi }) => {
      const n = GROUPS[gi].photos.length
      return { gi, pi: (pi + d + n) % n }
    })
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

  const fullPhoto = full ? GROUPS[full.gi].photos[full.pi] : null

  return (
    <section id="portfolio" ref={ref} className={styles.sec}>
      <header className={styles.head}>
        <p className={`${styles.kicker} ${styles.rv}`} data-rv>Portfolio</p>
        <h2 className={`${styles.h2} ${styles.rv}`} data-rv style={{ transitionDelay: '.08s' }}>Pilas de recuerdos.</h2>
      </header>

      <div className={`${styles.line} ${styles.rv}`} data-rv style={{ transitionDelay: '.22s' }}>
        {GROUPS.map((g, gi) => {
          const many = g.photos.length > 1
          const open = openId === g.id
          return (
            <button
              key={g.id}
              type="button"
              className={`${styles.coverBtn} ${many && !open ? styles.stacked : ''}`}
              style={{ '--f': gi }}
              aria-expanded={many ? open : undefined}
              aria-label={many ? `${g.name}, serie de ${g.photos.length} fotos — ${open ? 'ocultar' : 'ver todas'}` : `Ver completa: ${g.photos[0].alt}`}
              onClick={() => (many ? setOpenId((o) => (o === g.id ? null : g.id)) : setFull({ gi, pi: 0 }))}
            >
              <span className={styles.stack}>
                <span className={styles.sheet} aria-hidden="true" />
                <span className={styles.sheet2} aria-hidden="true" />
                <span className={styles.card}>
                  <img src={g.photos[0].src} alt="" loading="eager" decoding="async" />
                </span>
              </span>
              <span className={styles.tag}>{g.name}</span>
            </button>
          )
        })}
      </div>

      {openGroup && (
        <div className={styles.cascadeWrap} key={openId}>
          <p className={styles.cascadeLabel}>{openGroup.name}</p>
          <div className={styles.cascade}>
            {openGroup.photos.map((p, i) => (
              <Print
                key={p.src}
                p={p}
                i={i}
                style={{ '--d': i * 70 + 'ms' }}
                onOpen={() => setFull({ gi: GROUPS.indexOf(openGroup), pi: i })}
              />
            ))}
          </div>
        </div>
      )}

      {full && (
        <div className={styles.lb} role="dialog" aria-modal="true" aria-label={`${fullPhoto.cat}, foto ampliada`} onClick={() => setFull(null)}>
          <img src={fullPhoto.src} alt={fullPhoto.alt} onClick={(e) => e.stopPropagation()} />
          <div className={styles.lbBar} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)}>Anterior</button>
            <span>{fullPhoto.cat}</span>
            <button type="button" onClick={() => step(1)}>Siguiente</button>
          </div>
          <button ref={closeRef} type="button" className={styles.lbX} onClick={() => setFull(null)}>Cerrar</button>
        </div>
      )}
    </section>
  )
}
