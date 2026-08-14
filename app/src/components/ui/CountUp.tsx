import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  value: number
  /** Formateador aplicado al valor interpolado. */
  format?: (n: number) => string
  duration?: number
  className?: string
}

/** Número que cuenta desde 0 cuando entra en pantalla, y re-anima al cambiar. */
export function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString('es-CL'),
  duration = 1100,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const from = useRef(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const origin = from.current
    const delta = value - origin
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo: rápido al inicio, asentamiento suave.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(origin + delta * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
      else from.current = value
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {format(inView ? display : 0)}
    </span>
  )
}
