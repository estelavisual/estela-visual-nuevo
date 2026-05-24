import { motion } from 'framer-motion'
import styles from './Nosotros.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const STATS = [
  { valor: '10+', label: 'AÑOS DE EXPERIENCIA' },
  { valor: '100%', label: 'SATISFACCIÓN O REPETIMOS' },
  { valor: '24h', label: 'ENTREGA PRIORITARIA' },
  { valor: '2', label: 'FOTÓGRAFOS ESPECIALIZADOS' },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>

        {/* Columna izquierda — texto */}
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
        </div>

        {/* Columna derecha — estadísticas */}
        <div className={styles.statsCol}>
          {STATS.map(({ valor, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15 + i * 0.1}
            >
              <motion.div
                className={styles.statCard}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <span className={styles.statValor}>{valor}</span>
                <span className={styles.statLabel}>{label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
