import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

/** Insignia oficial de Eco-Partner (>30% de ventas sustentables). */
export function EcoPartnerBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-surface-container-lowest px-2.5 py-1 shadow-ambient ${className}`}
    >
      <Icon name="eco" fill className="text-[13px] text-secondary" />
      <span className="font-label text-[10px] font-bold tracking-wide text-primary">
        Eco-Partner
      </span>
    </span>
  )
}

/** Chip de metadato con fondo suave (packaging, tiempo, precio…). */
export function Chip({
  icon,
  children,
  tone = 'neutral',
  className = '',
}: {
  icon?: string
  children: ReactNode
  tone?: 'neutral' | 'mint' | 'gold' | 'outline'
  className?: string
}) {
  const tones = {
    neutral: 'bg-surface-container text-on-surface',
    mint: 'bg-secondary-container text-on-secondary-container',
    gold: 'bg-gold-container text-on-gold-container',
    outline: 'border border-outline-variant text-on-surface-variant',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-label text-label-sm ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} className="text-[14px]" />}
      {children}
    </span>
  )
}

/** Etiqueta de huella de carbono de un plato. */
export function Co2Tag({ kg, className = '' }: { kg: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm bg-secondary-container/60 px-2 py-0.5 font-label text-[11px] font-semibold text-on-secondary-container ${className}`}
    >
      <Icon name="energy_savings_leaf" fill className="text-[12px]" />
      {kg.toString().replace('.', ',')} kg CO₂e
    </span>
  )
}

/** Barra de progreso gruesa: pista sage, relleno verde hoja. */
export function ProgressBar({
  value,
  className = '',
  trackClass = 'bg-tertiary-fixed',
  fillClass = 'bg-secondary',
  height = 'h-3',
}: {
  value: number
  className?: string
  trackClass?: string
  fillClass?: string
  height?: string
}) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full overflow-hidden rounded-full ${trackClass} ${height} ${className}`}
    >
      <motion.div
        className={`${height} rounded-full ${fillClass}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </div>
  )
}

/** Botón primario tipo píldora, con elevación al pasar el cursor. */
export function PillButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'leaf'
  className?: string
  icon?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  const variants = {
    primary: 'bg-primary text-on-primary shadow-ambient hover:shadow-ambient-raised',
    secondary:
      'bg-tertiary-fixed text-primary hover:bg-primary-fixed shadow-ambient hover:shadow-ambient-raised',
    leaf: 'bg-secondary text-on-secondary shadow-ambient hover:shadow-ambient-raised',
    ghost: 'text-primary hover:bg-surface-container',
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-label text-label-sm font-semibold transition-shadow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="text-[18px]" />}
      {children}
    </motion.button>
  )
}

/** Encabezado de sección con acción secundaria opcional. */
export function SectionHeader({
  title,
  action,
  onAction,
  className = '',
}: {
  title: string
  action?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={`mb-stack-md flex items-end justify-between gap-4 ${className}`}>
      <h2 className="text-headline-mobile font-bold text-primary md:text-headline-lg">
        {title}
      </h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="group flex shrink-0 items-center font-label text-label-sm text-secondary transition-colors hover:text-primary"
        >
          {action}
          <Icon
            name="chevron_right"
            className="ml-0.5 text-[16px] transition-transform group-hover:translate-x-0.5"
          />
        </button>
      )}
    </div>
  )
}

/** Icono sobre un fondo orgánico irregular (DESIGN.md · Shapes). */
export function PebbleIcon({
  name,
  className = '',
  size = 'h-12 w-12',
  tone = 'bg-surface-variant text-secondary',
}: {
  name: string
  className?: string
  size?: string
  tone?: string
}) {
  return (
    <span
      className={`pebble flex shrink-0 items-center justify-center ${size} ${tone} ${className}`}
    >
      <Icon name={name} fill className="text-[22px]" />
    </span>
  )
}
