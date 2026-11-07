import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// Para cambiar una foto, reemplazá el nombre (sin .jpg). z = profundidad de la serie (0 a 1).
const ZONES = [
  { name: 'Recitales', desc: ['Escenario, público', 'y toda la energía del show.'], alt: 'Fotografía de recitales y shows en vivo', z: 0.08, files: ['evento-1', 'evento-2', 'evento-4', 'evento-6'] },
  { name: 'Egresados', desc: ['La fiesta que cierra una etapa,', 'sin perder un solo momento.'], alt: 'Fotografía de fiestas de egresados', z: 0.25, files: ['evento-7', 'evento-8', 'evento-9', 'evento-10'] },
  { name: 'Bautismos', desc: ['Los primeros momentos,', 'guardados para siempre.'], alt: 'Fotografía de bautismos y celebraciones familiares', z: 0.42, files: ['evento-11', 'evento-12', 'evento-13', 'evento-14'] },
  { name: 'Inmobiliaria', desc: ['Cada ambiente,', 'en su mejor luz.'], alt: 'Fotografía inmobiliaria en La Plata', z: 0.58, files: ['inmobiliaria-1', 'inmobiliaria-3', 'inmobiliaria-4', 'inmobiliaria-6'] },
  { name: 'Books', desc: ['Sesiones que se parecen a vos.'], alt: 'Book de fotos personal', z: 0.75, files: ['book-2', 'book-3', 'book-4', 'book-6'] },
  { name: 'Paisajes', desc: ['La luz justa de cada lugar.'], alt: 'Fotografía de paisaje', z: 0.92, files: ['paisaje-1', 'paisaje-2', 'paisaje-3', 'paisaje-7'] },
]
// Posiciones por centro (en %), todas sobre una línea media y dentro de la zona central.
const SLOTS = [{ x: 24, y: 33, w: 20, r: -3 }, { x: 41, y: 38, w: 23, r: 2 }, { x: 59, y: 32, w: 22, r: -1.5 }, { x: 76, y: 37, w: 19, r: 3 }]
const DX = [-1.5, 1.5, -1, 1, -0.5, 0.5]
const DY = [1, -1, 1.5, -1.5, 0.5, -0.5]
const JIT = [-0.025, 0.02, -0.01, 0.03]
const STD = [4000, 2000, 1000, 500, 250, 125, 60, 30, 15, 8, 4]
const cl = (v, a, b) => Math.min(b, Math.max(a, v))

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    const q = (s) => el.querySelector(s)
    const imgs = [...el.querySelectorAll('[data-ph]')]
    const tts = [...el.querySelectorAll('[data-tt]')]
    const af = q('[data-af]'), lab = q('[data-lab]'), fn = q('[data-fn]'), sh = q('[data-sh]')
    const ds = q('[data-ds]'), ct = q('[data-ct]'), fl = q('[data-flash]')
    const hg = q('[data-hg]').getContext('2d')
    const layer = q('[data-layer]')
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const set = (node, v) => { if (node._v !== v) { node.textContent = v; node._v = v } }

    let W = el.clientWidth, H = el.clientHeight
    const onResize = () => { W = el.clientWidth; H = el.clientHeight }
    let f = rm ? 0.5 : 0, tf = 0.5, n = 2.8, tn = 2.8, mx = 0.5, my = 0.4
    let px = W / 2, py = H / 2, tx = px, ty = py, cnt = 0, raf = 0, vis = true, lock0 = false

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = e.clientX - r.left; ty = e.clientY - r.top
      mx = cl(tx / r.width, 0, 1); my = cl(ty / r.height, 0, 1)
      tf = mx; tn = 1.4 * Math.pow(8 / 1.4, my)
    }
    const shoot = () => {
      cnt++; set(ct, ('000' + cnt).slice(-4))
      fl.classList.remove(styles.go); void fl.offsetWidth; fl.classList.add(styles.go)
    }
    const onClick = (e) => { if (!e.target.closest('a,button')) shoot() }
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { tf = cl(tf - 0.05, 0, 1); mx = tf; tx = tf * W }
      else if (e.key === 'ArrowRight') { tf = cl(tf + 0.05, 0, 1); mx = tf; tx = tf * W }
      else if (e.key === 'ArrowUp') { e.preventDefault(); tn = cl(tn * 0.89, 1.4, 8) }
      else if (e.key === 'ArrowDown') { e.preventDefault(); tn = cl(tn * 1.12, 1.4, 8) }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); shoot() }
    }

    // Al bajar, el hero sale de foco y se funde con la sección siguiente
    let lastP = -1, ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const r = el.getBoundingClientRect()
        const p = cl(-r.top / (r.height * 0.75), 0, 1)
        if (p === lastP) return
        lastP = p
        layer.style.opacity = (1 - p * 0.95).toFixed(3)
        layer.style.filter = p > 0.02 ? `blur(${(p * 12).toFixed(1)}px)` : 'none'
        layer.style.transform = p > 0 ? `translate3d(0,${(p * 60).toFixed(1)}px,0) scale(${(1 + p * 0.04).toFixed(3)})` : 'none'
      })
    }

    const frame = (t) => {
      if (!vis) { raf = 0; return }
      f += (tf - f) * (rm ? 1 : 0.09); n += (tn - n) * (rm ? 1 : 0.1)
      px += (tx - px) * (rm ? 1 : 0.2); py += (ty - py) * (rm ? 1 : 0.2)
      const k = 3.2 * Math.pow(1.4 / n, 0.8)

      imgs.forEach((im) => {
        const z = +im.dataset.z, r = +im.dataset.r
        const bb = Math.min(1, Math.abs(f - z) * k)
        const blur = Math.round(bb * 36) / 2
        const dx = Math.round((mx - 0.5) * (z + 0.2) * -110), dy = Math.round((my - 0.5) * (z + 0.2) * -50)
        const sig = blur + '|' + dx + '|' + dy + '|' + Math.round(bb * 50)
        if (im._s !== sig) {
          im._s = sig
          im.style.filter = `blur(${blur}px) brightness(${(1 - bb * 0.45).toFixed(2)})`
          im.style.opacity = (1 - bb * 0.5).toFixed(2)
          im.style.transform = `translate(-50%,-50%) translate3d(${dx}px,${dy}px,0) rotate(${r}deg) scale(${(1.05 - bb * 0.1).toFixed(3)})`
          im.style.zIndex = Math.round((1 - bb) * 10)
        }
      })

      let best = 0, bd = 9
      tts.forEach((tt, i) => {
        const d = f - +tt.dataset.z, ad = Math.abs(d)
        if (ad < bd) { bd = ad; best = i }
        tt.style.filter = `blur(${Math.min(16, ad * k * 20).toFixed(1)}px)`
        tt.style.opacity = Math.max(0, 1 - ad * 6).toFixed(2)
        tt.style.transform = `translateX(${(-d * 70).toFixed(1)}px)`
      })
      const lock = bd < 0.06
      if (lock !== lock0) { lock0 = lock; af.classList.toggle(styles.lock, lock); lab.classList.toggle(styles.lock, lock) }
      set(lab, lock ? 'Enfocado: ' + ZONES[best].name : 'Enfocando')
      af.style.transform = `translate3d(${px - 42}px,${py - 42}px,0)`
      set(fn, 'ƒ/' + n.toFixed(1))
      set(sh, '1/' + STD[cl(4 + Math.round((2 * Math.log(n / 2.8)) / Math.LN2), 0, 10)])
      set(ds, (0.6 * Math.pow(25, f)).toFixed(1) + ' m')
      hg.clearRect(0, 0, 144, 52); hg.fillStyle = 'rgba(241,234,217,.7)'
      for (let i = 0; i < 18; i++) {
        const h = Math.exp(-Math.pow(i - 9 - 5 * (f - 0.5), 2) / 18) * (0.45 + 0.55 * Math.abs(Math.sin(i * 1.7 + (rm ? 0 : t * 0.0004)))) * 50
        hg.fillRect(i * 8, 52 - h, 6, h)
      }
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting
      if (vis && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(el)
    addEventListener('resize', onResize)
    if (!rm) { addEventListener('scroll', onScroll, { passive: true }); onScroll() }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('click', onClick)
    el.addEventListener('keydown', onKey)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      removeEventListener('resize', onResize)
      removeEventListener('scroll', onScroll)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('click', onClick)
      el.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <>
    <section id="inicio" ref={root} className={styles.hero} tabIndex={0} aria-label="Visor interactivo: mové el mouse para enfocar cada servicio">
      <h1 className={styles.sr}>Estela Visual: fotografía, community management y diseño web en La Plata</h1>
      <div data-layer className={styles.layer}>

      {ZONES.map((zn, zi) =>
        zn.files.map((file, i) => (
          <img
            key={file}
            src={`/${file}.jpg`}
            alt={`${zn.alt}, foto ${i + 1}`}
            data-ph
            data-z={(zn.z + JIT[i]).toFixed(3)}
            data-r={SLOTS[i].r}
            loading={zi === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={styles.ph}
            style={{ left: SLOTS[i].x + DX[zi] + '%', top: SLOTS[i].y + DY[zi] + '%', '--w': SLOTS[i].w + 'vw', transform: 'translate(-50%,-50%)' }}
          />
        ))
      )}

      <div className={styles.stage}>
        {ZONES.map((zn) => (
          <div key={zn.name} data-tt data-z={zn.z} className={styles.tt}>
            <h2>{zn.name}</h2>
            <p>{zn.desc.map((l) => <span key={l}>{l}</span>)}</p>
          </div>
        ))}
      </div>

      <span className={`${styles.corner} ${styles.tl}`} /><span className={`${styles.corner} ${styles.tr}`} />
      <span className={`${styles.corner} ${styles.bl}`} /><span className={`${styles.corner} ${styles.br}`} />
      <div data-af className={styles.af}>
        <svg viewBox="0 0 84 84" aria-hidden="true"><path d="M0 24V0H24M60 0H84V24M84 60V84H60M24 84H0V60" /></svg>
      </div>
      <div data-flash className={styles.flash} />

      <div className={styles.hud}>
        <div>
          <div data-lab className={styles.lab} aria-live="polite">Enfocando</div>
          <span className={`${styles.sub} ${styles.hint}`}>Mové el mouse: izquierda y derecha enfoca, arriba y abajo cambia el diafragma. Clic para disparar.</span>
        </div>
        <div className={styles.stats}>
          <b data-fn>ƒ/2.8</b><b data-sh>1/250</b><b>ISO 400</b><b data-ds>3 m</b>
          <canvas data-hg className={styles.hg} width="144" height="52" aria-hidden="true" />
          <b data-ct>0001</b>
        </div>
      </div>
      </div>
    </section>
    </>
  )
}
