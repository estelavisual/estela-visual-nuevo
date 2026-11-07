import { useEffect, useRef } from 'react'

// data-rv: el elemento aparece cuando entra en pantalla (agrega data-in).
export default function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute('data-in', '1'); io.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    root.querySelectorAll('[data-rv]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}
