import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.content}>
        {/* Decorador superior */}
        <motion.div
          className={styles.decorator}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className={styles.dot}>●</span>
          <span className={styles.line} />
          <span className={styles.label}>LA PLATA · BUENOS AIRES</span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className={styles.title}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          Tu historia merece
          <br />
          <em className={styles.titleAccent}>ser contada bien.</em>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className={styles.subtitle}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          Estudio creativo · Imagen estratégica · Contenido que conecta
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.actions}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
        >
          <a href="#portfolio" className={styles.btnPrimary}>
            VER PORTFOLIO
          </a>
          <a href="#servicios" className={styles.btnSecondary}>
            NUESTROS SERVICIOS
          </a>
        </motion.div>
      </div>

    </section>
  )
}
