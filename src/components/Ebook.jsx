import { motion } from 'framer-motion'
import styles from './Ebook.module.css'

const HOTMART_URL = 'https://pay.hotmart.com/S105871132H'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const float = {
  animate: {
    y: [0, -14, 0],
    rotateY: [0, 6, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

export default function Ebook() {
  return (
    <section id="ebook" className={styles.section}>
      <div className={styles.inner}>

        {/* Columna izquierda — mockup */}
        <motion.div
          className={styles.mockupCol}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/ebook-mockup.png"
            alt="Portada e-book Posteá y Vendé"
            className={styles.mockup}
            variants={float}
            animate="animate"
          />
        </motion.div>

        {/* Columna derecha — texto */}
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
            <span className={styles.label}>E-BOOK · MARKETING EN REDES</span>
          </motion.div>

          <motion.h2
            className={styles.titulo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            Posteá y <em className={styles.tituloAccent}>Vendé.</em>
          </motion.h2>

          <motion.p
            className={styles.descripcion}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            La guía definitiva para crear contenido en redes que no solo suma likes,
            sino que convierte seguidores en clientes reales.
          </motion.p>

          <motion.p
            className={styles.subtitulo}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
          >
            ESTRATEGIA · TEXTOS · PLANTILLAS
          </motion.p>

          <motion.div
            className={styles.acciones}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
          >
            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              COMPRAR AHORA — $9.99 USD
            </a>

          </motion.div>

          <motion.p
            className={styles.garantia}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.5}
          >
            ACCESO INMEDIATO · PDF DESCARGABLE · GARANTÍA 15 DÍAS
          </motion.p>
        </div>

      </div>
    </section>
  )
}
