import b from './Section.module.css'

// Separador de rollo entre secciones: el contador avanza de un fotograma al siguiente al scrollear.
export default function Seam({ from, to }) {
  return (
    <div data-fx className={b.seam} aria-hidden="true">
      <div className={b.win}><div className={b.col}><span>{from}</span><span>{to}</span></div></div>
    </div>
  )
}
