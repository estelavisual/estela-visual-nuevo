import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Contacto.module.css'

const FORMSPREE_URL = 'https://formspree.io/f/xaqkyzqe'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const IconEmail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const IconUbicacion = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const IconCheck = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="26" cy="26" r="24" />
    <path d="M15 26l8 8 14-16" />
  </svg>
)

const SERVICIOS_OPTS = [
  'Fotografía de Eventos',
  'Fotografía Inmobiliaria',
  'Books Personales',
  'Community Manager',
  'Diseño Web',
  'Contenido Audiovisual',
]

export default function Contacto() {
  const [estado, setEstado] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstado('sending')

    const data = new FormData(formRef.current)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setEstado('success')
        formRef.current.reset()
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className={styles.section}>
      <motion.div
        className={styles.decorator}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.dot}>●</span>
        <span className={styles.line} />
        <span className={styles.label}>CONTACTO</span>
      </motion.div>

      <motion.h2
        className={styles.titulo}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Hablemos. Tu proyecto nos inspira.
      </motion.h2>

      <div className={styles.inner}>
        {/* Columna izquierda — info */}
        <motion.div
          className={styles.infoCol}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
        >
          <a href="mailto:info@estelavisual.com.ar" className={styles.infoItem}>
            <span className={styles.infoIcono}><IconEmail /></span>
            <span className={styles.infoTexto}>info@estelavisual.com.ar</span>
          </a>

          <a
            href="https://wa.me/5492246592370"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoItem}
          >
            <span className={styles.infoIcono}><IconWhatsApp /></span>
            <span className={styles.infoTexto}>+549 2246 592370</span>
          </a>

          <div className={styles.infoItem}>
            <span className={styles.infoIcono}><IconUbicacion /></span>
            <span className={styles.infoTexto}>La Plata · Buenos Aires, Argentina</span>
          </div>
        </motion.div>

        {/* Columna derecha — formulario o confirmación */}
        <AnimatePresence mode="wait">
          {estado === 'success' ? (
            <motion.div
              key="confirmacion"
              className={styles.confirmacion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <IconCheck />
              <h3 className={styles.confirmTitulo}>¡Mensaje enviado!</h3>
              <p className={styles.confirmSubtitulo}>Gracias por contactarnos.</p>
              <p className={styles.confirmTexto}>Nos pondremos en contacto con vos a la brevedad.</p>
              <button
                className={styles.btnOtro}
                onClick={() => setEstado('idle')}
              >
                ENVIAR OTRO MENSAJE
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="formulario"
              ref={formRef}
              className={styles.form}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.25}
              onSubmit={handleSubmit}
            >
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>NOMBRE</label>
                  <input
                    name="nombre"
                    type="text"
                    className={styles.formInput}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>EMAIL</label>
                  <input
                    name="email"
                    type="email"
                    className={styles.formInput}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>SERVICIO</label>
                <select name="servicio" className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Seleccioná un servicio</option>
                  {SERVICIOS_OPTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>MENSAJE</label>
                <textarea
                  name="mensaje"
                  className={styles.formTextarea}
                  placeholder="Contanos sobre tu proyecto..."
                  rows={5}
                  required
                />
              </div>

              {estado === 'error' && (
                <p className={styles.msgError}>Hubo un error. Por favor intentá de nuevo.</p>
              )}

              <button
                type="submit"
                className={styles.btnEnviar}
                disabled={estado === 'sending'}
              >
                {estado === 'sending' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
