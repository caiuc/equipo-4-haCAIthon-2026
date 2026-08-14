import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { currentUser, merchants } from '../data/mock'
import { useApp } from '../store/AppStore'
import { formatFlora, formatKg } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { SmartImage } from '../components/ui/SmartImage'
import { CountUp } from '../components/ui/CountUp'
import { Reveal, Stagger } from '../components/ui/Reveal'
import { staggerItem } from '../components/ui/motionVariants'
import { PebbleIcon, ProgressBar, SectionHeader } from '../components/ui/Bits'
import { MerchantCard } from '../components/MerchantCard'

/** Perfil: identidad, impacto acumulado, favoritos y ajustes de la demo. */
export function Profile() {
  const navigate = useNavigate()
  const { flora, co2SavedKg, streakDays, returnedCount, containers, favorites } = useApp()

  const favoriteMerchants = merchants.filter((m) => favorites.includes(m.id))
  const tierProgress = (flora / (flora + currentUser.floraToNextTier)) * 100

  return (
    <div className="flex flex-col gap-stack-lg py-stack-lg page">
      {/* ── Encabezado ─────────────────────────────────────────────────── */}
      <Reveal
        as="section"
        className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-fixed-dim/20 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-secondary-fixed-dim"
          >
            <SmartImage
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              fallbackIcon="person"
              className="h-full w-full"
            />
          </motion.div>
          <div className="min-w-0 flex-1">
            <h1 className="text-headline-mobile font-bold text-primary-fixed md:text-headline-lg">
              {currentUser.name}
            </h1>
            <p className="font-label text-label-sm text-on-primary-container">
              {currentUser.handle}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed/20 px-3 py-1">
              <Icon name="forest" fill className="text-[16px] text-secondary-fixed-dim" />
              <span className="font-label text-label-sm font-bold text-primary-fixed">
                Nivel {currentUser.tier}
              </span>
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-5">
          <div className="mb-2 flex items-center justify-between font-label text-label-sm text-on-primary-container">
            <span>{currentUser.tier}</span>
            <span>{currentUser.nextTier}</span>
          </div>
          <ProgressBar
            value={tierProgress}
            trackClass="bg-primary/40"
            fillClass="bg-secondary-fixed-dim"
          />
          <p className="mt-2 text-center font-label text-label-sm text-on-primary-container">
            Te faltan {formatFlora(currentUser.floraToNextTier)} Flora para el siguiente
            nivel
          </p>
        </div>
      </Reveal>

      {/* ── Estadísticas ───────────────────────────────────────────────── */}
      <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="eco" value={flora} label="Flora acumuladas" />
        <StatCard
          icon="cloud_off"
          value={co2SavedKg}
          label="kg CO₂ evitados"
          format={formatKg}
        />
        <StatCard icon="recycling" value={returnedCount} label="Envases devueltos" />
        <StatCard
          icon="local_fire_department"
          value={streakDays}
          label="Días de racha"
        />
      </Stagger>

      {/* ── Envases en circulación ─────────────────────────────────────── */}
      <Reveal
        as="section"
        className="flex items-center gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-ambient"
      >
        <PebbleIcon name="package_2" size="h-14 w-14" tone="bg-secondary-container text-secondary" />
        <div className="min-w-0 flex-1">
          <p className="text-title-md font-bold text-primary">
            {containers.length} envases en tu poder
          </p>
          <p className="font-label text-label-sm text-on-surface-variant">
            Devuélvelos y suma{' '}
            {formatFlora(containers.reduce((s, c) => s + c.floraReward, 0))} Flora
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/devoluciones')}
          className="shrink-0 rounded-full bg-secondary px-4 py-2 font-label text-label-sm font-bold text-on-secondary transition-transform active:scale-95"
        >
          Devolver
        </button>
      </Reveal>

      {/* ── Insignias ──────────────────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Insignias" action="Ver ranking" onAction={() => navigate('/ranking')} />
        <div className="grid gap-3 sm:grid-cols-2">
          {currentUser.badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex min-w-0 items-center gap-3 rounded-xl p-4 ${
                badge.unlocked
                  ? 'bg-surface-container-lowest shadow-ambient'
                  : 'bg-surface-container opacity-60'
              }`}
            >
              <span
                className={`pebble flex h-11 w-11 shrink-0 items-center justify-center ${
                  badge.unlocked
                    ? 'bg-secondary-container text-secondary'
                    : 'bg-surface-container-high text-outline'
                }`}
              >
                <Icon name={badge.unlocked ? badge.icon : 'lock'} fill className="text-[20px]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-body-md font-bold text-primary">{badge.name}</p>
                <p className="truncate font-label text-label-sm text-on-surface-variant">
                  {badge.unlocked ? `Obtenida el ${badge.unlockedAt}` : badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Favoritos ──────────────────────────────────────────────────── */}
      {favoriteMerchants.length > 0 && (
        <Reveal as="section">
          <SectionHeader title="Tus favoritos" />
          <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {favoriteMerchants.map((m) => (
              <MerchantCard key={m.id} merchant={m} animated={false} />
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Ajustes ────────────────────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Configuración" />
        <ul className="divide-y divide-outline-variant/25 overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
          {[
            { icon: 'location_on', label: 'Direcciones de entrega', value: 'Macul' },
            { icon: 'notifications', label: 'Recordatorios de devolución', value: 'Activos' },
            { icon: 'credit_card', label: 'Medios de pago', value: '1 tarjeta' },
            { icon: 'group', label: 'Invitar amigos', value: '+100 Flora' },
            { icon: 'help', label: 'Cómo funciona GreenLoop', value: '' },
          ].map((row) => (
            <li key={row.label}>
              <button
                type="button"
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-container-low"
              >
                <Icon name={row.icon} className="shrink-0 text-secondary" />
                <span className="flex-1 text-body-md text-primary">{row.label}</span>
                {row.value && (
                  <span className="font-label text-label-sm text-on-surface-variant">
                    {row.value}
                  </span>
                )}
                <Icon name="chevron_right" className="shrink-0 text-on-surface-variant" />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="text-center font-label text-[11px] text-on-surface-variant">
        GreenLoop · Prueba de concepto HaCAiThon 2026. Todos los datos son ficticios.
      </p>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  format,
}: {
  icon: string
  value: number
  label: string
  format?: (n: number) => string
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      className="flex flex-col items-center gap-2 rounded-xl bg-surface-container-lowest p-5 text-center shadow-ambient"
    >
      <PebbleIcon name={icon} size="h-12 w-12" />
      <CountUp
        value={value}
        format={format ?? ((n) => formatFlora(Math.round(n)))}
        className="text-headline-mobile font-bold text-primary"
      />
      <span className="font-label text-label-sm leading-tight text-on-surface-variant">
        {label}
      </span>
    </motion.div>
  )
}
