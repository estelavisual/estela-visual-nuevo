import { useEffect, useRef } from 'react'

const NS = 'http://www.w3.org/2000/svg'
const N = 9 // hojas del diafragma
const mk = (tag, attrs = {}) => {
  const e = document.createElementNS(NS, tag)
  Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]))
  return e
}
const EASE = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

// Diafragma de cámara de 9 hojas: dispara un cierre y apertura de duración fija
// cada vez que el centro de la pantalla cruza el borde de una sección.
export default function Diafragma() {
  const host = useRef(null)

  useEffect(() => {
    const svg = host.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    const defs = mk('defs')
    svg.appendChild(defs)
    const blades = []
    for (let k = 0; k < N; k++) {
      const g = mk('linearGradient', { id: `dg-${k}`, gradientUnits: 'userSpaceOnUse' })
      ;[['0', '#55492f'], ['0.3', '#1e1a12'], ['1', '#050403'] ].forEach(([o, c]) => g.appendChild(mk('stop', { offset: o, 'stop-color': c })))
      defs.appendChild(g)
      const poly = mk('polygon', { fill: `url(#dg-${k})`, stroke: 'rgba(0,0,0,.75)', 'stroke-width': 1.2, 'stroke-linejoin': 'round' })
      const edge = mk('line', { stroke: 'rgba(241,234,217,.6)', 'stroke-width': 1.1 })
      svg.appendChild(poly); svg.appendChild(edge)
      blades.push({ g, poly, edge })
    }
    const flash = mk('rect', { x: '-10%', y: '-10%', width: '120%', height: '120%', fill: '#f1ead9', opacity: 0 })
    svg.appendChild(flash)

    let W = innerWidth, H = innerHeight
    const resize = () => { W = innerWidth; H = innerHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`) }
    resize()

    const pts = (a) => a.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join(' ')
    const line = (el, a, b) => { el.setAttribute('x1', a[0].toFixed(1)); el.setAttribute('y1', a[1].toFixed(1)); el.setAttribute('x2', b[0].toFixed(1)); el.setAttribute('y2', b[1].toFixed(1)) }
    const draw = (R, rot) => {
      const cx = W / 2, cy = H / 2, far = Math.hypot(W, H)
      const radial = ([x, y]) => { const dx = x - cx, dy = y - cy, l = Math.hypot(dx, dy) || 1; return [x + (dx / l) * far, y + (dy / l) * far] }
      const V = Array.from({ length: N }, (_, k) => { const a = rot + (k * 2 * Math.PI) / N; return [cx + R * Math.cos(a), cy + R * Math.sin(a)] })
      V.forEach((P, k) => {
        const Q = V[(k + 1) % N]
        const ux = Q[0] - P[0], uy = Q[1] - P[1], len = Math.hypot(ux, uy) || 1
        const A = [P[0] - (ux / len) * len * 0.62, P[1] - (uy / len) * len * 0.62]
        const b = blades[k]
        b.poly.setAttribute('points', pts([A, Q, radial(Q), radial(A)]))
        line(b.edge, A, Q)
        const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, ml = Math.hypot(mx - cx, my - cy) || 1
        const L = 240 + R * 0.6
        b.g.setAttribute('x1', mx.toFixed(1)); b.g.setAttribute('y1', my.toFixed(1))
        b.g.setAttribute('x2', (mx + ((mx - cx) / ml) * L).toFixed(1)); b.g.setAttribute('y2', (my + ((my - cy) / ml) * L).toFixed(1))
      })
    }

    const Rmax = Math.hypot(W, H) * 0.62
    let raf = 0
    const render = (open) => {
      const e = EASE(open)
      draw(Rmax * e, -Math.PI / 2 + (1 - e) * 0.55)
      flash.setAttribute('opacity', open < 0.12 ? ((0.12 - open) / 0.12) * 0.22 : 0)
    }
    const play = () => {
      cancelAnimationFrame(raf)
      svg.style.display = 'block'
      const dur = 760, hold = 90
      const t0 = performance.now()
      const step = (t) => {
        const el = t - t0
        let open
        if (el < dur * 0.46) open = 1 - el / (dur * 0.46)
        else if (el < dur * 0.46 + hold) open = 0
        else open = Math.min(1, (el - dur * 0.46 - hold) / (dur * 0.54))
        render(Math.max(0, Math.min(1, open)))
        if (el < dur) raf = requestAnimationFrame(step)
        else svg.style.display = 'none'
      }
      raf = requestAnimationFrame(step)
    }

    if (reduced) return undefined

    let primed = false
    const io = new IntersectionObserver(
      (entries) => {
        if (!primed) { primed = true; return } // el reporte inicial no es un cruce real
        if (entries.some((e) => e.isIntersecting)) play()
      },
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s))
    addEventListener('resize', resize)
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])

  return <svg ref={host} aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 80, display: 'none' }} />
}
