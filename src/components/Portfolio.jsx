import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Portfolio.module.css'

const CATEGORIAS = ['TODOS', 'EVENTOS', 'INMOBILIARIA', 'BOOKS', 'PAISAJES']

// En TODOS las fotos se muestran en este orden — intercaladas por categoría
// para que la grilla se vea equilibrada visualmente.
const FOTOS = [
  // Fila 1
  { src: '/evento-1.jpg',       categoria: 'EVENTOS',      alt: 'Fotografía de evento social en La Plata' },
  { src: '/inmobiliaria-1.jpg', categoria: 'INMOBILIARIA', alt: 'Fotografía inmobiliaria de interior' },
  { src: '/book-1.jpg',         categoria: 'BOOKS',        alt: 'Book personal fotográfico' },
  // Fila 2
  { src: '/evento-2.jpg',       categoria: 'EVENTOS',      alt: 'Cobertura fotográfica de evento' },
  { src: '/inmobiliaria-2.jpg', categoria: 'INMOBILIARIA', alt: 'Fotografía profesional de propiedad' },
  { src: '/book-2.jpg',         categoria: 'BOOKS',        alt: 'Sesión de book personal' },
  // Fila 3
  { src: '/evento-3.jpg',       categoria: 'EVENTOS',      alt: 'Fotografía editorial de evento' },
  { src: '/inmobiliaria-3.jpg', categoria: 'INMOBILIARIA', alt: 'Fotografía inmobiliaria de ambiente' },
  { src: '/book-3.jpg',         categoria: 'BOOKS',        alt: 'Fotografía para book personal' },
  // Fila 4
  { src: '/evento-4.jpg',       categoria: 'EVENTOS',      alt: 'Momentos capturados en evento especial' },
  { src: '/inmobiliaria-4.jpg', categoria: 'INMOBILIARIA', alt: 'Fotografía de propiedad en venta' },
  { src: '/book-4.jpg',         categoria: 'BOOKS',        alt: 'Retrato artístico para book' },
  // Fila 5
  { src: '/evento-5.jpg',       categoria: 'EVENTOS',      alt: 'Fotografía de evento corporativo' },
  { src: '/inmobiliaria-5.jpg', categoria: 'INMOBILIARIA', alt: 'Fotografía inmobiliaria profesional' },
  { src: '/book-5.jpg',         categoria: 'BOOKS',        alt: 'Sesión de fotos book personal' },
  // Fila 6
  { src: '/evento-6.jpg',       categoria: 'EVENTOS',      alt: 'Cobertura de evento social' },
  { src: '/inmobiliaria-6.jpg', categoria: 'INMOBILIARIA', alt: 'Espacio fotografiado para inmobiliaria' },
  { src: '/book-6.jpg',         categoria: 'BOOKS',        alt: 'Book fotográfico profesional' },
  // Fila 7
  { src: '/evento-7.jpg',       categoria: 'EVENTOS',      alt: 'UPD Colegio GELP La Plata' },
  { src: '/evento-8.jpg',       categoria: 'EVENTOS',      alt: 'UPD Colegio GELP La Plata' },
  { src: '/paisaje-1.jpg',      categoria: 'PAISAJES',     alt: 'Fotografía de paisaje natural' },
  // Fila 8
  { src: '/evento-9.jpg',       categoria: 'EVENTOS',      alt: 'UPD Colegio GELP La Plata' },
  { src: '/evento-10.jpg',      categoria: 'EVENTOS',      alt: 'UPD Colegio GELP La Plata' },
  { src: '/paisaje-2.jpg',      categoria: 'PAISAJES',     alt: 'Fotografía de paisaje argentino' },
  // Fila 9
  { src: '/evento-11.jpg',      categoria: 'EVENTOS',      alt: 'Fotografía de bautismo en La Plata' },
  { src: '/evento-12.jpg',      categoria: 'EVENTOS',      alt: 'Fotografía de bautismo en La Plata' },
  { src: '/paisaje-3.jpg',      categoria: 'PAISAJES',     alt: 'Paisaje fotografiado en Buenos Aires' },
  // Fila 10
  { src: '/evento-13.jpg',      categoria: 'EVENTOS',      alt: 'Fotografía de bautismo en La Plata' },
  { src: '/evento-14.jpg',      categoria: 'EVENTOS',      alt: 'Fotografía de bautismo en La Plata' },
  { src: '/paisaje-4.jpg',      categoria: 'PAISAJES',     alt: 'Fotografía artística de paisaje' },
  // Fila 11
  { src: '/paisaje-5.jpg',      categoria: 'PAISAJES',     alt: 'Paisaje natural fotografiado' },
  { src: '/paisaje-6.jpg',      categoria: 'PAISAJES',     alt: 'Fotografía de paisaje exterior' },
  { src: '/paisaje-7.jpg',      categoria: 'PAISAJES',     alt: 'Fotografía de paisaje en Epecuén' },
]

function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <div className={styles.imgPlaceholder} />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </>
  )
}

export default function Portfolio() {
  const [activa, setActiva] = useState('TODOS')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const filtradas = activa === 'TODOS'
    ? FOTOS
    : FOTOS.filter(f => f.categoria === activa)

  const abrirLightbox = (idx) => setLightboxIdx(idx)
  const cerrarLightbox = () => setLightboxIdx(null)

  const irAnterior = useCallback(() => {
    setLightboxIdx(i => (i - 1 + filtradas.length) % filtradas.length)
  }, [filtradas.length])

  const irSiguiente = useCallback(() => {
    setLightboxIdx(i => (i + 1) % filtradas.length)
  }, [filtradas.length])

  // Teclado
  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') irAnterior()
      else if (e.key === 'ArrowRight') irSiguiente()
      else if (e.key === 'Escape') cerrarLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, irAnterior, irSiguiente])

  // Swipe touch
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) irSiguiente()
      else irAnterior()
    }
    touchStartX.current = null
    touchStartY.current = null
  }, [irAnterior, irSiguiente])

  const fotoActual = lightboxIdx !== null ? filtradas[lightboxIdx] : null

  return (
    <section id="portfolio" className={styles.section}>

      {/* Encabezado */}
      <motion.div
        className={styles.decorator}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.dot}>●</span>
        <span className={styles.line} />
        <span className={styles.label}>PORTFOLIO</span>
      </motion.div>

      <motion.h2
        className={styles.titulo}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Nuestro trabajo habla por sí solo.
      </motion.h2>

      {/* Filtros */}
      <motion.div
        className={styles.filtros}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            className={`${styles.filtro} ${activa === cat ? styles.filtroActivo : ''}`}
            onClick={() => setActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grilla */}
      <motion.div
        className={styles.grilla}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {filtradas.map(({ src, categoria, alt }, idx) => (
            <motion.div
              key={src}
              className={`${styles.fotoWrapper} ${categoria === 'BOOKS' ? styles.fotoWrapperTall : ''}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => abrirLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && abrirLightbox(idx)}
              aria-label={`Ver ${alt}`}
            >
              <LazyImage src={src} alt={alt} className={styles.foto} />
              <div className={styles.overlay}>
                <span className={styles.overlayIcon}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M11 4v14M4 11h14" />
                  </svg>
                </span>
                <span className={styles.overlayLabel}>{categoria}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div
        className={styles.ctaWrap}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className={styles.ctaTexto}>¿Te gustó lo que viste?</p>
        <a href="#contacto" className={styles.ctaBtn}>HABLEMOS DE TU PROYECTO</a>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {fotoActual && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={cerrarLightbox}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button
              className={styles.lightboxClose}
              onClick={cerrarLightbox}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={e => { e.stopPropagation(); irAnterior() }}
              aria-label="Imagen anterior"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M13 4l-6 6 6 6" />
              </svg>
            </button>

            <motion.img
              src={fotoActual.src}
              alt={fotoActual.alt}
              className={styles.lightboxImg}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              key={fotoActual.src}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            />

            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={e => { e.stopPropagation(); irSiguiente() }}
              aria-label="Imagen siguiente"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 4l6 6-6 6" />
              </svg>
            </button>

            <div className={styles.lightboxCounter} onClick={e => e.stopPropagation()}>
              <span>{lightboxIdx + 1} / {filtradas.length}</span>
              <span className={styles.swipeHint}>← DESLIZÁ →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
