import { motion } from 'framer-motion'
import styles from './Ebook.module.css'
import { PRECIOS } from '../config/precios'

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
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  },
}

const BENEFICIOS = [
  'Cómo crear contenido que vende sin parecer publicidad',
  'Estrategia de publicaciones para Instagram y Facebook',
  'Plantillas de copy listas para usar',
  'Cómo transformar seguidores en clientes reales',
  'Errores que cometen el 90% de los negocios en redes',
]

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l3.5 3.5L12 3" />
  </svg>
)

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

          {/* Beneficios */}
          <motion.ul
            className={styles.beneficios}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
          >
            {BENEFICIOS.map((b, i) => (
              <motion.li
                key={i}
                className={styles.beneficio}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.beneficioIcono}><IconCheck /></span>
                <span>{b}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.acciones}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.7}
          >
            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              COMPRAR AHORA — {PRECIOS.ebook.precio}
            </a>
          </motion.div>

          <motion.p
            className={styles.garantia}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.8}
          >
            ACCESO INMEDIATO · PDF DESCARGABLE · GARANTÍA 15 DÍAS
          </motion.p>
        </div>

      </div>
    </section>
  )
}
