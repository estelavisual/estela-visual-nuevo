import { useRef, useState } from 'react'
import b from './Section.module.css'
import s from './Contacto.module.css'
import useReveal from './useReveal'

const FORMSPREE_URL = 'https://formspree.io/f/xaqkyzqe'

const SERVICIOS_OPTS = [
  'Fotografía de Eventos',
  'Fotografía Inmobiliaria',
  'Books Personales',
  'Community Manager',
  'Diseño Web',
]

const rv = (d) => ({ 'data-rv': true, style: { transitionDelay: d + 's' } })

export default function Contacto() {
  const [estado, setEstado] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)
  const ref = useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Campo honeypot: si tiene valor, es un bot
    const honeypot = formRef.current.querySelector('[name="_gotcha"]')
    if (honeypot && honeypot.value) return

    setEstado('sending')
    const data = new FormData(formRef.current)
    try {
      const res = await fetch(FORMSPREE_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (res.ok) { setEstado('success'); formRef.current.reset() } else setEstado('error')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" ref={ref} className={b.sec}>
      <p className={`${b.label} ${b.rv}`} {...rv(0)}><em>05A</em><i />Contacto</p>
      <h2 className={`${b.h2} ${b.rv}`} {...rv(0.08)}>Hablemos. Tu proyecto nos inspira.</h2>

      <div className={s.grid}>
        <div className={`${s.info} ${b.rv}`} {...rv(0.15)}>
          <a href="mailto:info@estelavisual.com.ar" className={s.item}>
            <span className={s.k}>Email</span>
            <span className={s.v}>info@estelavisual.com.ar</span>
          </a>
          <a href="https://wa.me/5492246592370" target="_blank" rel="noopener noreferrer" className={s.item}>
            <span className={s.k}>WhatsApp</span>
            <span className={s.v}>+549 2246 592370</span>
          </a>
          <div className={s.item}>
            <span className={s.k}>Ubicación</span>
            <span className={s.v}>La Plata · Buenos Aires, Argentina</span>
          </div>
        </div>

        <div className={b.rv} {...rv(0.25)}>
        {estado === 'success' ? (
          <div className={s.ok} role="status">
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos.</p>
            <p className={s.okSub}>Nos pondremos en contacto con vos a la brevedad.</p>
            <button type="button" className={b.cta} onClick={() => setEstado('idle')}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form ref={formRef} className={s.form} onSubmit={handleSubmit}>
            {/* Honeypot anti-spam: oculto para humanos, visible para bots */}
            <input name="_gotcha" type="text" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />

            <div className={s.row}>
              <label className={s.f}><span>Nombre</span>
                <input name="nombre" type="text" placeholder="Tu nombre" required />
              </label>
              <label className={s.f}><span>Email</span>
                <input name="email" type="email" placeholder="tu@email.com" required />
              </label>
            </div>

            <div className={s.row}>
              <label className={s.f}><span>Teléfono <small>(opcional)</small></span>
                <input name="telefono" type="tel" placeholder="+54 9 221 000-0000" />
              </label>
              <label className={s.f}><span>Servicio</span>
                <select name="servicio" defaultValue="">
                  <option value="" disabled>Seleccioná un servicio</option>
                  {SERVICIOS_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>
            </div>

            <label className={s.f}><span>Mensaje</span>
              <textarea name="mensaje" placeholder="Contanos sobre tu proyecto..." rows={5} required />
            </label>

            {estado === 'error' && <p className={s.err} role="alert">Hubo un error. Por favor intentá de nuevo.</p>}

            <button type="submit" className={b.cta} disabled={estado === 'sending'}>
              {estado === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
