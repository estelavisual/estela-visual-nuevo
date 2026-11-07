import { useEffect, useRef, useState } from 'react'
import b from './Section.module.css'
import s from './Servicios.module.css'
import useReveal from './useReveal'
import { PRECIOS } from '../config/precios'

const WA_URL = 'https://wa.me/5492246592370'

const BtnWA = ({ texto = 'Consultar por WhatsApp' }) => (
  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={b.cta}>{texto}</a>
)
const Texto = ({ children }) => <p className={s.texto}>{children}</p>
const Paquetes = ({ items }) => (
  <div className={s.paquetes}>
    {items.map((p) => (
      <div key={p.num} className={s.paquete}>
        <span className={s.num}>{p.num}</span>
        <span className={s.info}><b>{p.nombre}</b><span>{p.detalle}</span></span>
        <span className={s.pPrecio}>{p.precio}</span>
      </div>
    ))}
  </div>
)

// Tira de rollo: avanza sola y se acelera (o retrocede) con el scroll.
const STRIP = ['evento-1', 'inmobiliaria-2', 'book-4', 'paisaje-1', 'evento-6', 'inmobiliaria-5', 'book-6', 'paisaje-5', 'evento-9', 'book-2']

function Strip() {
  const wrap = useRef(null)
  const reel = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0, v = 0, last = scrollY, raf = 0, vis = false
    const loop = () => {
      if (!vis) { raf = 0; return }
      v += (scrollY - last - v) * 0.12
      last = scrollY
      x -= 0.7 + v * 0.45
      const half = reel.current.scrollWidth / 2
      if (x <= -half) x += half
      if (x > 0) x -= half
      reel.current.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting
      if (vis && !raf) { last = scrollY; raf = requestAnimationFrame(loop) }
    })
    io.observe(wrap.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={wrap} className={`${s.strip} ${b.rv}`} data-rv aria-hidden="true">
      <div ref={reel} className={s.reel}>
        {[...STRIP, ...STRIP].map((f, i) => <img key={i} src={`/${f}.jpg`} alt="" loading="lazy" decoding="async" />)}
      </div>
    </div>
  )
}

// Fotos reveladas que caen sobre la mesa al abrir un servicio; se pueden arrastrar.
const LAYOUT = [{ l: 2, t: 14, r: -6 }, { l: 33, t: 2, r: 5 }, { l: 55, t: 30, r: -3 }]

const WEB = {
  browser: (
    <div className={s.browser}>
      <span className={s.dots}><i /><i /><i /></span>
      <span className={s.bhero} />
      <span className={s.blocks}><i /><i /><i /></span>
    </div>
  ),
  code: (
    <pre className={s.code}>
      <span>{'<h1>'}</span>Tu marca<span>{'</h1>'}</span>{'\n'}
      <span>{'<a href="#contacto">'}</span>{'\n'}
      {'  '}Hablemos{'\n'}
      <span>{'</a>'}</span>
    </pre>
  ),
  phone: (
    <div className={s.phoneWrap}>
      <div className={s.phone}><b /><u /><u /><u /></div>
    </div>
  ),
}

function Print({ p, i, front }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [z, setZ] = useState(i + 1)
  const [drag, setDrag] = useState(false)
  const st = useRef(null)
  const L = LAYOUT[i]
  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    st.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y }
    setDrag(true)
    setZ(++front.current)
  }
  const move = (e) => {
    if (!st.current) return
    const box = e.currentTarget.parentElement.getBoundingClientRect()
    const lim = (v, m) => Math.max(-m, Math.min(m, v))
    setPos({ x: lim(st.current.x + e.clientX - st.current.px, box.width * 0.6), y: lim(st.current.y + e.clientY - st.current.py, box.height * 0.6) })
  }
  const up = () => { st.current = null; setDrag(false) }
  return (
    <div
      className={`${s.print} ${drag ? s.drag : ''}`}
      style={{ left: L.l + '%', top: L.t + '%', zIndex: z, '--dx': pos.x + 'px', '--dy': pos.y + 'px', '--r': L.r + 'deg', '--i': i }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      {p.web ? (
        <figure className={`${s.card} ${s.web}`}>
          {WEB[p.web]}
          <figcaption>{p.cap}</figcaption>
        </figure>
      ) : (
        <figure className={s.card}>
          <img src={p.src} alt={`${p.cap}, trabajo de Estela Visual`} draggable={false} loading="lazy" decoding="async" />
          {p.play && <span className={s.play} aria-hidden="true" />}
          <figcaption>{p.cap}</figcaption>
        </figure>
      )}
    </div>
  )
}

function Prints({ items }) {
  const front = useRef(10)
  return (
    <div className={s.table}>
      {items.map((p, i) => <Print key={p.src || p.cap} p={p} i={i} front={front} />)}
      <span className={s.hint}>{items[0].web ? 'Arrastrá las piezas' : 'Arrastrá las fotos'}</span>
    </div>
  )
}

const SERVICIOS = [
  {
    titulo: 'Fotografía de Eventos',
    descripcion: 'Capturamos cada momento con intención. Imágenes que cuentan la historia de tu evento con calidad editorial.',
    precio: <><Texto>Consultanos según tu evento y necesidad.</Texto><BtnWA texto="Pedir presupuesto de evento" /></>,
    prints: [{ src: '/evento-4.jpg', cap: 'Recital' }, { src: '/evento-8.jpg', cap: 'Egresados' }, { src: '/evento-12.jpg', cap: 'Bautismo' }],
  },
  {
    titulo: 'Fotografía Inmobiliaria',
    descripcion: 'Espacios que se venden solos. Fotografía profesional que destaca cada ambiente y acelera las decisiones de compra.',
    precio: <><Paquetes items={PRECIOS.inmobiliaria} /><Texto>Para inmobiliarias con varias propiedades mensuales ofrecemos planes especiales con precio por volumen. Consultanos directamente para armar algo a medida.</Texto></>,
    prints: [{ src: '/inmobiliaria-1.jpg', cap: 'Ambiente 01' }, { src: '/inmobiliaria-4.jpg', cap: 'Ambiente 02' }, { src: '/inmobiliaria-6.jpg', cap: 'Ambiente 03' }],
  },
  {
    titulo: 'Books Personales',
    descripcion: 'Tu mejor versión en imágenes. Sesiones diseñadas para reflejar tu personalidad y potenciar tu presencia.',
    precio: <><Texto>{PRECIOS.book.detalle}</Texto><p className={s.valor}>{PRECIOS.book.precio}</p><BtnWA texto="Reservar mi sesión" /></>,
    prints: [{ src: '/book-2.jpg', cap: 'Book 01' }, { src: '/book-4.jpg', cap: 'Book 02' }, { src: '/book-6.jpg', cap: 'Book 03' }],
  },
  {
    titulo: 'Community Manager',
    descripcion: 'Gestión estratégica de redes sociales, con videos y reels incluidos. Contenido que conecta, comunidades que crecen, resultados que se miden.',
    precio: <Paquetes items={PRECIOS.cm} />,
    prints: [{ src: '/freya-1.jpg', cap: 'Reel', play: true }, { src: '/freya-2.jpg', cap: 'Post' }, { src: '/freya-3.jpg', cap: 'Historia' }],
  },
  {
    titulo: 'Diseño Web',
    descripcion: 'Sitios que convierten. Diseño pensado desde la experiencia del usuario hacia los objetivos de tu marca.',
    precio: <><Texto>Cada proyecto es único. Consultanos para armar una propuesta a medida.</Texto><BtnWA texto="Solicitar propuesta web" /></>,
    prints: [{ web: 'browser', cap: 'Landing' }, { web: 'code', cap: 'Código' }, { web: 'phone', cap: 'Mobile' }],
  },
]

export default function Servicios() {
  const [open, setOpen] = useState(null)
  const [epoch, setEpoch] = useState(0)
  const ref = useReveal()

  const toggle = (i) => {
    if (open === i) return setOpen(null)
    setEpoch((e) => e + 1) // las fotos vuelven a caer sobre la mesa
    setOpen(i)
  }

  return (
    <section id="servicios" ref={ref} className={b.sec}>
<p className={`${b.label} ${b.rv}`} data-rv><em>02A</em><i />Servicios</p>
      <h2 className={`${b.h2} ${b.rv}`} data-rv style={{ transitionDelay: '.08s' }}>Todo lo que tu marca necesita.</h2>

      <Strip />

      <div className={s.list}>
        {SERVICIOS.map((sv, i) => {
          const on = open === i
          return (
            <div key={sv.titulo} className={`${s.item} ${on ? s.on : ''} ${b.rv}`} data-rv style={{ transitionDelay: i * 60 + 'ms' }}>
              <button type="button" className={s.row} aria-expanded={on} aria-controls={`sv-${i}`} onClick={() => toggle(i)}>
                <span className={s.n}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.t}>{sv.titulo}</span>
                <span className={s.plus} aria-hidden="true" />
              </button>
              <div id={`sv-${i}`} className={s.panel} role="region" aria-label={sv.titulo}>
                <div className={s.inner}>
                  <div className={s.cols}>
                    <div className={s.left}>
                      <p className={s.desc}>{sv.descripcion}</p>
                      <div>{sv.precio}</div>
                    </div>
                    <Prints key={epoch} items={sv.prints} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
