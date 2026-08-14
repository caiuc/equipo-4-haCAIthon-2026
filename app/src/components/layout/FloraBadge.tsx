import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../store/AppStore'
import { formatFlora } from '../../lib/format'
import { Icon } from '../ui/Icon'

/**
 * Contador de Flora del encabezado. Al sumar o restar Flora late brevemente
 * y muestra el delta flotando hacia arriba, estilo Duolingo.
 */
export function FloraBadge({ onClick }: { onClick?: () => void }) {
  const { flora } = useApp()
  const previous = useRef(flora)
  const [delta, setDelta] = useState<number | null>(null)

  useEffect(() => {
    if (flora === previous.current) return
    const diff = flora - previous.current
    previous.current = flora
    setDelta(diff)
    const timer = window.setTimeout(() => setDelta(null), 1500)
    return () => window.clearTimeout(timer)
  }, [flora])

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${formatFlora(flora)} Flora acumuladas`}
      animate={delta ? { scale: [1, 1.12, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex shrink-0 items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-1.5 shadow-ambient transition-shadow hover:shadow-ambient-raised"
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed-dim">
        <Icon name="eco" fill className="text-[16px] text-primary" />
        {delta !== null && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-secondary-fixed-dim" />
        )}
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="text-title-md font-bold leading-none text-primary">
          {formatFlora(flora)}
        </span>
        <span className="mt-0.5 font-label text-[10px] leading-none text-on-surface-variant">
          Flora
        </span>
      </span>

      <AnimatePresence>
        {delta !== null && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -24 }}
            exit={{ opacity: 0, y: -34 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-none absolute right-2 top-0 font-label text-label-sm font-bold ${
              delta > 0 ? 'text-secondary' : 'text-error'
            }`}
          >
            {delta > 0 ? '+' : ''}
            {formatFlora(delta)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
