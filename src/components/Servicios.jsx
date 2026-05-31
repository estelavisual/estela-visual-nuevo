import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Servicios.module.css'
import { PRECIOS } from '../config/precios'

const WA_URL = 'https://wa.me/5492246592370'

const SVG_PROPS = { width: 48, height: 48, viewBox: '0 0 48 48', fill: 'none', stroke: '#C9A84C', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round' }

const IconCamera = () => (
  <svg {...SVG_PROPS}>
    <rect x="6" y="14" width="36" height="26" rx="3" />
    <circle cx="24" cy="27" r="7" />
    <path d="M17 14l3-6h8l3 6" />
    <circle cx="36" cy="19" r="1.5" fill="#C9A84C" stroke="none" />
  </svg>
)

const IconHouse = () => (
  <svg {...SVG_PROPS}>
    <path d="M6 22L24 8l18 14" />
    <path d="M10 22v16h10v-9h8v9h10V22" />
  </svg>
)

const IconPerson = () => (
  <svg {...SVG_PROPS}>
    <circle cx="24" cy="14" r="7" />
    <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" />
  </svg>
)

const IconChat = () => (
  <svg {...SVG_PROPS}>
    <circle cx="14" cy="24" r="4" />
    <circle cx="24" cy="14" r="4" />
    <circle cx="34" cy="24" r="4" />
    <line x1="17.8" y1="21.8" x2="20.8" y2="16.8" />
    <line x1="27.2" y1="16.8" x2="30.2" y2="21.8" />
    <line x1="18" y1="26" x2="21" y2="26" />
    <line x1="27" y1="26" x2="30" y2="26" />
  </svg>
)

const IconMonitor = () => (
  <svg {...SVG_PROPS}>
    <rect x="4" y="8" width="40" height="26" rx="2" />
    <line x1="16" y1="40" x2="32" y2="40" />
    <line x1="24" y1="34" x2="24" y2="40" />
    <line x1="4" y1="28" x2="44" y2="28" />
  </svg>
)

const IconClap = () => (
  <svg {...SVG_PROPS}>
    <rect x="6" y="16" width="36" height="26" rx="2" />
    <path d="M6 22l36-8" />
    <line x1="18" y1="16" x2="14" y2="8" />
    <line x1="26" y1="14" x2="22" y2="6" />
    <path d="M20 32l6-4v8l-6-4z" />
  </svg>
)

const BtnWA = ({ texto = 'CONSULTAR POR WHATSAPP' }) => (
  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.btnWA}>
    {texto}
  </a>
)

const PaquetesList = ({ paquetes }) => (
  <div className={styles.paquetes}>
    {paquetes.map(p => (
      <div key={p.num} className={styles.paquete}>
        <span className={styles.paqueteNum}>{p.num}</span>
        <div className={styles.paqueteInfo}>
          <span className={styles.paqueteNombre}>{p.nombre}</span>
          <span className={styles.paqueteDetalle}>{p.detalle}</span>
        </div>
        <span className={styles.paquetePrecio}>{p.precio}</span>
      </div>
    ))}
  </div>
)

const PrecioInmobiliaria = () => (
  <div className={styles.precioContent}>
    <PaquetesList paquetes={PRECIOS.inmobiliaria} />
    <p className={styles.nota}>Para inmobiliarias con varias propiedades mensuales ofrecemos planes especiales con precio por volumen. Consultanos directamente para armar algo a medida.</p>
  </div>
)

const PrecioCM = () => (
  <div className={styles.precioContent}>
    <PaquetesList paquetes={PRECIOS.cm} />
  </div>
)

const SERVICIOS = [
  {
    Icon: IconCamera,
    titulo: 'Fotografía de Eventos',
    descripcion: 'Capturamos cada momento con intención. Imágenes que cuentan la historia de tu evento con calidad editorial.',
    precio: <div className={styles.precioContent}><p className={styles.precioTexto}>Consultanos según tu evento y necesidad.</p><BtnWA texto="PEDIR PRESUPUESTO DE EVENTO" /></div>,
  },
  {
    Icon: IconHouse,
    titulo: 'Fotografía Inmobiliaria',
    descripcion: 'Espacios que se venden solos. Fotografía profesional que destaca cada ambiente y acelera las decisiones de compra.',
    precio: <PrecioInmobiliaria />,
  },
  {
    Icon: IconPerson,
    titulo: 'Books Personales',
    descripcion: 'Tu mejor versión en imágenes. Sesiones diseñadas para reflejar tu personalidad y potenciar tu presencia.',
    precio: <div className={styles.precioContent}><p className={styles.precioTexto}>{PRECIOS.book.detalle}</p><p className={styles.precioValor}>{PRECIOS.book.precio}</p><BtnWA texto="RESERVAR MI SESIÓN" /></div>,
  },
  {
    Icon: IconChat,
    titulo: 'Community Manager',
    descripcion: 'Gestión estratégica de redes sociales. Contenido que conecta, comunidades que crecen, resultados que se miden.',
    precio: <PrecioCM />,
  },
  {
    Icon: IconMonitor,
    titulo: 'Diseño Web',
    descripcion: 'Sitios que convierten. Diseño pensado desde la experiencia del usuario hacia los objetivos de tu marca.',
    precio: <div className={styles.precioContent}><p className={styles.precioTexto}>Cada proyecto es único. Consultanos para armar una propuesta a medida.</p><BtnWA texto="SOLICITAR PROPUESTA WEB" /></div>,
  },
  {
    Icon: IconClap,
    titulo: 'Contenido Audiovisual',
    descripcion: 'Video, reels y piezas visuales que capturan la atención en los primeros segundos y comunican con fuerza.',
    precio: <div className={styles.precioContent}><p className={styles.precioTexto}>Cotizamos según duración, formato y plataforma de destino.</p><BtnWA texto="COTIZAR AUDIOVISUAL" /></div>,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

function ServiceCard({ Icon, titulo, descripcion, precio, index, abierto, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
    <motion.div
      className={`${styles.card} ${abierto ? styles.cardAbierta : ''}`}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onToggle}
    >
      <div className={styles.cardHeader}>
        <div className={styles.icono}><Icon /></div>
        <h3 className={styles.cardTitulo}>{titulo}</h3>
        <p className={styles.cardDesc}>{descripcion}</p>
        <div className={`${styles.flecha} ${abierto ? styles.flechaAbierta : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
            <path d="M2 4l5 6 5-6" />
          </svg>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            className={styles.panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.panelInner}>
              {precio}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </motion.div>
  )
}

export default function Servicios() {
  const [abiertoIdx, setAbiertoIdx] = useState(null)

  return (
    <section id="servicios" className={styles.section}>
      <motion.div
        className={styles.decorator}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.dot}>●</span>
        <span className={styles.line} />
        <span className={styles.label}>SERVICIOS</span>
      </motion.div>

      <motion.h2
        className={styles.titulo}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Todo lo que tu marca necesita.
      </motion.h2>

      <div className={styles.grilla}>
        {SERVICIOS.map(({ Icon, titulo, descripcion, precio }, i) => (
          <ServiceCard
            key={titulo}
            Icon={Icon}
            titulo={titulo}
            descripcion={descripcion}
            precio={precio}
            index={i}
            abierto={abiertoIdx === i}
            onToggle={() => setAbiertoIdx(abiertoIdx === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
