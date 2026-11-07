import b from './Section.module.css'
import s from './Ebook.module.css'
import useReveal from './useReveal'
import { PRECIOS } from '../config/precios'

const HOTMART_URL = 'https://pay.hotmart.com/S105871132H'

const BENEFICIOS = [
  'Cómo crear contenido que vende sin parecer publicidad',
  'Estrategia de publicaciones para Instagram y Facebook',
  'Plantillas de copy listas para usar',
  'Cómo transformar seguidores en clientes reales',
  'Errores que cometen el 90% de los negocios en redes',
]

const rv = (d) => ({ 'data-rv': true, style: { transitionDelay: d + 's' } })

export default function Ebook() {
  const ref = useReveal()
  return (
    <section id="ebook" ref={ref} className={`${b.sec} ${b.alt}`}>
      <div className={s.inner}>
        <div className={`${s.mock} ${b.rv}`} data-rv>
          <span className={s.glow} aria-hidden="true" />
          <img src="/ebook-mockup.png" alt="Portada e-book Posteá y Vendé" className={s.img} loading="lazy" />
        </div>

        <div>
<p className={`${b.label} ${b.rv}`} {...rv(0)}><em>EB</em><i />E-book de marketing en redes</p>
          <h2 className={`${b.h2} ${b.rv}`} {...rv(0.08)}>Posteá y Vendé.</h2>
          <p className={`${s.desc} ${b.rv}`} {...rv(0.16)}>La guía definitiva para crear contenido en redes que no solo suma likes, sino que convierte seguidores en clientes reales.</p>

          <ol className={s.list}>
            {BENEFICIOS.map((t, i) => (
              <li key={t} className={b.rv} data-rv style={{ transitionDelay: 0.22 + i * 0.07 + 's' }}>
                <span>{String(i + 1).padStart(2, '0')}</span>{t}
              </li>
            ))}
          </ol>

          <div className={b.rv} {...rv(0.62)}>
            <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer" className={b.cta}>
              Comprar ahora — {PRECIOS.ebook.precio}
            </a>
          </div>
          <p className={`${s.garantia} ${b.rv}`} {...rv(0.7)}>Acceso inmediato · PDF descargable · Garantía 15 días</p>
        </div>
      </div>
    </section>
  )
}
