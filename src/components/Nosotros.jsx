import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Nosotros.module.css'

// Cuando tengas la foto, reemplazá null por la ruta: '/nosotros.jpg'
const FOTO_NOSOTROS = '/nosotros.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const STATS = [
  { valorNum: 10, sufijo: '+', label: 'AÑOS DE EXPERIENCIA' },
  { valorNum: 100, sufijo: '%', label: 'SATISFACCIÓN O REPETIMOS' },
  { valorNum: 24, sufijo: 'h', label: 'ENTREGA PRIORITARIA' },
  { valorNum: 2, sufijo: '', label: 'FOTÓGRAFOS ESPECIALIZADOS' },
]

function useCountUp(target, duration = 1800, isActive = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isActive) return
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, isActive])

  return count
}

function StatCard({ valorNum, sufijo, label, delay }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(valorNum, 1600, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
    >
      <motion.div
        className={styles.statCard}
        whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      >
        <span className={styles.statValor}>{count}{sufijo}</span>
        <span className={styles.statLabel}>{label}</span>
      </motion.div>
    </motion.div>
  )
}

export default function Nosotros() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>

        {/* Columna izquierda — foto */}
        <motion.div
          className={styles.fotoCol}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {FOTO_NOSOTROS ? (
            <>
              <div className={styles.fotoWrapper}>
                <img
                  src={FOTO_NOSOTROS}
                  alt="Sebastián y Fernanda — Estela Visual Estudio"
                  className={styles.foto}
                  loading="lazy"
                />
              </div>
              <p className={styles.fotoPie}>SEBASTIÁN · FERNANDA</p>
            </>
          ) : (
            <div className={styles.fotoPlaceholder}>
              <p className={styles.fotoPlaceholderTexto}>
                SEBASTIÁN · FERNANDA<br />
                foto próximamente
              </p>
            </div>
          )}
        </motion.div>

        {/* Columna derecha — texto + stats */}
        <div className={styles.textCol}>
          <motion.div
            className={styles.decorator}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <span className={styles.dot}>●</span>
            <span className={styles.line} />
            <span className={styles.label}>SOBRE NOSOTROS</span>
          </motion.div>

          <motion.h2
            className={styles.titulo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            Dos hermanos. Una mirada.
          </motion.h2>

          <motion.p
            className={styles.subtitulo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            La fotografía no es algo que elegimos. Es algo que heredamos.
          </motion.p>

          <motion.p
            className={styles.parrafo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
          >
            Somos Sebastián y Fernanda. Nunca conocimos a nuestro abuelo, pero mamá siempre nos contaba que era un gran fotógrafo en su pueblo natal. Quizás fue él quien, sin saberlo, nos pasó algo especial — esa manera de mirar el mundo y querer capturarlo.
          </motion.p>

          <motion.p
            className={styles.parrafo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.38}
          >
            Construimos nuestra experiencia fotografiando eventos, books personales y propiedades — incluso en Barcelona — perfeccionando el ojo y el criterio en cada trabajo.
          </motion.p>

          <motion.p
            className={styles.parrafo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.46}
          >
            Hoy damos un paso más. Estela Visual no es solo fotografía — es nuestra apuesta por generar algo propio. Un estudio creativo integral que ayude a pymes, empresas y personas a contar mejor su historia.
          </motion.p>

          <motion.p
            className={styles.frase}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.54}
          >
            Somos dos personas simples, con ganas genuinas de crecer — y de hacer crecer a quienes confían en nosotros.
          </motion.p>

          {/* Estadísticas */}
          <div className={styles.statsCol}>
            {STATS.map(({ valorNum, sufijo, label }, i) => (
              <StatCard
                key={label}
                valorNum={valorNum}
                sufijo={sufijo}
                label={label}
                delay={0.6 + i * 0.08}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
