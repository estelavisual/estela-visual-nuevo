import b from './Section.module.css'
import s from './Nosotros.module.css'
import useReveal from './useReveal'

const FOTO_NOSOTROS = '/nosotros.jpeg'

function Marquee({ text, rev }) {
  return (
    <div className={`${s.row} ${rev ? s.rev : ''}`} aria-hidden="true">
      <div className={s.track}>
        <span>{text}</span><span>{text}</span>
      </div>
    </div>
  )
}

export default function Nosotros() {
  const ref = useReveal()
  return (
    <section id="nosotros" ref={ref} className={`${b.sec} ${b.alt}`}>
      <p className={`${b.label} ${b.rv}`} data-rv><em>04A</em><i />Sobre nosotros</p>
      <h2 className={`${b.h2} ${b.rv}`} data-rv style={{ transitionDelay: '.08s' }}>10 años <em className={s.plus}>+</em> capturando momentos que no se volverán a repetir.</h2>
      <p className={`${s.loc} ${b.rv}`} data-rv style={{ transitionDelay: '.12s' }}>La Plata - Buenos Aires</p>

      <div className={`${s.marquee} ${b.rv}`} data-rv style={{ transitionDelay: '.14s' }}>
        <Marquee text="DOS HERMANOS · UNA MIRADA · ESTELA VISUAL ESTUDIO · " />
        <Marquee text="LA PLATA · BUENOS AIRES · " rev />
      </div>

      <div className={s.cols}>
        <div className={`${s.fotoCol} ${b.rv}`} data-rv style={{ transitionDelay: '.2s' }}>
          <figure className={`${s.pic} ${s.picBig}`}>
            <img src={FOTO_NOSOTROS} alt="Sebastián y Fernanda — Estela Visual Estudio" loading="lazy" />
            <figcaption>Sebastián · Fernanda</figcaption>
          </figure>
          <div className={s.mosaico}>
            <figure className={s.pic}>
              <img src="/nosotros-fer-1.jpg" alt="Fernanda fotografiando en una construcción abandonada" loading="lazy" />
              <figcaption>Fernanda</figcaption>
            </figure>
            <figure className={s.pic}>
              <img src="/nosotros-seba-1.jpg" alt="Sebastián fotografiando en la costa" loading="lazy" />
              <figcaption>Sebastián</figcaption>
            </figure>
            <figure className={s.pic}>
              <img src="/nosotros-fer-2.jpg" alt="Fernanda con la cámara en mano, en primer plano" loading="lazy" />
              <figcaption>Fernanda</figcaption>
            </figure>
            <figure className={s.pic}>
              <img src="/nosotros-seba-2.jpg" alt="Sebastián fotografiando junto a un tronco en la playa" loading="lazy" />
              <figcaption>Sebastián</figcaption>
            </figure>
          </div>
        </div>

        <div className={s.txt}>
          <p>Somos Fernanda y Sebastián — dos hermanos quienes no conocimos a nuestro abuelo. La gente del pueblo, en el cual nos criamos, decía que era un gran fotógrafo, y quizás por eso heredamos esta manera de mirar, sentir y de contar historias a través de la luz, los colores y las emociones.</p>
          <p>Nos apasiona encontrar detalles que muchas veces pasan inadvertidos, detener el tiempo por un instante y transformar momentos en recuerdos que perduren para siempre.</p>
          <p>A lo largo de nuestro camino, fuimos descubriendo distintas formas de expresar nuestra pasión: fotografía social, retratos, fotografía inmobiliaria y proyectos que nos permiten seguir creciendo, aprendiendo y explorando nuestra creatividad.</p>
          <p>Creemos que una buena fotografía no necesita demasiadas palabras: tiene que emocionar, transmitir y despertar algo en quien la observa.</p>
          <p>Somos Fernanda y Sebastián, dos personas simples, con ganas genuinas de crecer — y de hacer crecer a quienes confían en nosotros.</p>
          <p className={s.cierre}>La fotografía es mucho más que nuestro trabajo: es nuestra pasión, nuestro lenguaje y nuestra manera de dejar un pedacito nuestro en cada imagen.</p>
          <p className={s.cierre}>Hoy damos un paso más con Estela Visual: un estudio propio para ayudar a contar mejor cada historia.</p>
        </div>
      </div>

    </section>
  )
}
