import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Portfolio.module.css'

const CATEGORIAS = ['TODOS', 'EVENTOS', 'INMOBILIARIA', 'BOOKS', 'PAISAJES']

const FOTOS = [
  { src: '/evento-1.jpg', categoria: 'EVENTOS' },
  { src: '/evento-2.jpg', categoria: 'EVENTOS' },
  { src: '/evento-3.jpg', categoria: 'EVENTOS' },
  { src: '/evento-4.jpg', categoria: 'EVENTOS' },
  { src: '/evento-5.jpg', categoria: 'EVENTOS' },
  { src: '/evento-6.jpg', categoria: 'EVENTOS' },
  { src: '/inmobiliaria-1.jpg', categoria: 'INMOBILIARIA' },
  { src: '/inmobiliaria-2.jpg', categoria: 'INMOBILIARIA' },
  { src: '/inmobiliaria-3.jpg', categoria: 'INMOBILIARIA' },
  { src: '/inmobiliaria-4.jpg', categoria: 'INMOBILIARIA' },
  { src: '/inmobiliaria-5.jpg', categoria: 'INMOBILIARIA' },
  { src: '/inmobiliaria-6.jpg', categoria: 'INMOBILIARIA' },
  { src: '/book-1.jpg', categoria: 'BOOKS' },
  { src: '/book-2.jpg', categoria: 'BOOKS' },
  { src: '/book-3.jpg', categoria: 'BOOKS' },
  { src: '/book-4.jpg', categoria: 'BOOKS' },
  { src: '/book-5.jpg', categoria: 'BOOKS' },
  { src: '/book-6.jpg', categoria: 'BOOKS' },
  { src: '/paisaje-1.jpg', categoria: 'PAISAJES' },
  { src: '/paisaje-2.jpg', categoria: 'PAISAJES' },
  { src: '/paisaje-3.jpg', categoria: 'PAISAJES' },
  { src: '/paisaje-4.jpg', categoria: 'PAISAJES' },
  { src: '/paisaje-5.jpg', categoria: 'PAISAJES' },
  { src: '/paisaje-6.jpg', categoria: 'PAISAJES' },
]

export default function Portfolio() {
  const [activa, setActiva] = useState('TODOS')
  const [lightbox, setLightbox] = useState(null)

  const filtradas = activa === 'TODOS'
    ? ['/evento-1.jpg', '/evento-2.jpg', '/inmobiliaria-1.jpg', '/inmobiliaria-2.jpg', '/paisaje-1.jpg', '/paisaje-2.jpg']
        .map(src => FOTOS.find(f => f.src === src))
    : FOTOS.filter(f => f.categoria === activa)

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
          {filtradas.map(({ src, categoria }) => (
            <motion.div
              key={src}
              className={`${styles.fotoWrapper} ${activa === 'TODOS' ? styles.fotoWrapperDimmed : ''} ${categoria === 'BOOKS' ? styles.fotoWrapperTall : ''}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox({ src, categoria })}
            >
              <img src={src} alt={categoria} className={styles.foto} />
              <div className={styles.overlay}>
                <span className={styles.overlayLabel}>{categoria}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.categoria}
              className={styles.lightboxImg}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
