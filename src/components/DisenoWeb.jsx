import { useRef, useState } from 'react'
import useReveal from './useReveal'
import b from './Section.module.css'
import s from './DisenoWeb.module.css'

const DEMOS = [
  {
    id: 'raiz',
    num: '01',
    nombre: 'Raíz Estudio',
    rubro: 'Yoga & Bienestar',
    descripcion: 'Landing page para estudio de yoga en La Plata. Hero interactivo con canvas de respiración, horarios y reserva online.',
    url: 'https://raiz-estudio.sebas22lpda.workers.dev',
    color: '#6B8C72',
  },
  {
    id: 'sebastian',
    num: '02',
    nombre: 'Sebastian Estela',
    rubro: 'Fotografía',
    descripcion: 'Portfolio personal para fotógrafo profesional. Hero con video de fondo, galería por categorías y cursor personalizado.',
    url: 'https://sebastian-estela.sebas22lpda.workers.dev',
    color: '#c9a84c',
  },
  {
    id: 'tostado',
    num: '03',
    nombre: 'Tostado',
    rubro: 'Gastronomía',
    descripcion: 'Sitio web para marca gastronómica. Diseño cálido con menú interactivo, galería de productos y sección de contacto.',
    url: 'https://tostado.sebas22lpda.workers.dev',
    color: '#c97c4c',
  },
]

function Card({ demo, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${s.card} ${b.rv}`}
      data-rv
      style={{ transitionDelay: index * 100 + 'ms' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview */}
      <div className={s.preview}>
        <div className={s.frame}>
          <iframe
            src={demo.url}
            title={demo.nombre}
            loading="lazy"
            tabIndex={-1}
            style={{
              transform: hovered ? 'scale(0.5) translateY(-2%)' : 'scale(0.5)',
              transition: 'transform 0.6s ease',
            }}
          />
          <div className={s.frameMask} />
        </div>
      </div>

      {/* Info */}
      <div className={s.info}>
        <div className={s.top}>
          <span className={s.num}>{demo.num}</span>
          <span className={s.rubro} style={{ color: demo.color }}>{demo.rubro}</span>
        </div>
        <h3 className={s.nombre}>{demo.nombre}</h3>
        <p className={s.desc}>{demo.descripcion}</p>
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={s.btn}
          style={{ '--c': demo.color }}
        >
          <span>Ver demo</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function DisenoWeb() {
  const ref = useReveal()

  return (
    <section id="diseno-web" ref={ref} className={`${b.sec} ${s.sec}`}>
      <p className={`${b.label} ${b.rv}`} data-rv><em>02B</em><i />Diseño Web</p>
      <h2 className={`${b.h2} ${b.rv}`} data-rv style={{ transitionDelay: '.08s' }}>
        Webs que se recuerdan.
      </h2>
      <p className={`${s.sub} ${b.rv}`} data-rv style={{ transitionDelay: '.16s' }}>
        Cada sitio es único. Diseñado desde cero, pensado para convertir. Estos son algunos proyectos recientes.
      </p>

      <div className={s.grid}>
        {DEMOS.map((demo, i) => (
          <Card key={demo.id} demo={demo} index={i} />
        ))}
      </div>
    </section>
  )
}
