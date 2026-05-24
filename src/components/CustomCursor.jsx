import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setHovering(true)
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setHovering(false)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${hovering ? styles.dotHidden : ''}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${hovering ? styles.ringHover : ''}`}
      />
    </>
  )
}
