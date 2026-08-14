import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { formatFlora, formatKg } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { PillButton } from '../components/ui/Bits'
import { CountUp } from '../components/ui/CountUp'

interface OrderState {
  flora?: number
  co2?: number
  merchant?: string
}

/** Celebración post-pedido, estilo Duolingo: confeti de hojas + recuento de Flora. */
export function OrderConfirmed() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: OrderState | null }
  const flora = state?.flora ?? 0
  const co2 = state?.co2 ?? 0

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [state, navigate])

  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        rotate: Math.random() * 360,
        icon: ['eco', 'energy_savings_leaf', 'spa'][i % 3],
      })),
    [],
  )

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-stack-lg text-center page">
      {/* Confeti de hojas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            initial={{ y: -60, opacity: 0, rotate: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: c.rotate }}
            transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
            className="absolute top-0"
            style={{ left: c.left }}
          >
            <Icon name={c.icon} fill className="text-2xl text-secondary/50" />
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 16 }}
        className="relative z-10 mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-secondary"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-secondary-fixed-dim" />
        <Icon name="check" className="relative text-6xl text-on-secondary" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 mb-2 text-headline-mobile font-bold text-primary md:text-display-lg"
      >
        ¡Pedido confirmado!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative z-10 mb-8 max-w-md text-body-lg text-on-surface-variant"
      >
        {state?.merchant} está preparando tu pedido. Recuerda devolver tu envase en
        cualquier punto inteligente dentro de 5 días.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 mb-8 grid w-full max-w-md grid-cols-2 gap-3"
      >
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <Icon name="eco" fill className="mb-2 text-3xl text-secondary" />
          <CountUp
            value={flora}
            format={(n) => `+${formatFlora(Math.round(n))}`}
            className="block text-headline-lg font-bold text-primary"
          />
          <span className="font-label text-label-sm text-on-surface-variant">
            Flora ganadas
          </span>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <Icon name="cloud_off" fill className="mb-2 text-3xl text-secondary" />
          <CountUp
            value={co2}
            format={(n) => formatKg(n)}
            className="block text-headline-lg font-bold text-primary"
          />
          <span className="font-label text-label-sm text-on-surface-variant">
            kg CO₂ evitados
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 flex flex-wrap justify-center gap-3"
      >
        <PillButton icon="leaderboard" onClick={() => navigate('/ranking')}>
          Ver mi ranking
        </PillButton>
        <PillButton variant="secondary" icon="home" onClick={() => navigate('/')}>
          Volver al inicio
        </PillButton>
      </motion.div>
    </div>
  )
}
