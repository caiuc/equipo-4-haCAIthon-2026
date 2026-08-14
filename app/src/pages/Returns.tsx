import { AnimatePresence, motion } from 'motion/react'
import { dropOffSites, rewards } from '../data/mock'
import { useApp } from '../store/AppStore'
import { currentUser } from '../data/mock'
import { formatDistance, formatFlora } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { CountUp } from '../components/ui/CountUp'
import { Reveal, Stagger } from '../components/ui/Reveal'
import { staggerItem } from '../components/ui/motionVariants'
import { PillButton, ProgressBar, SectionHeader } from '../components/ui/Bits'
import type { DropOffSite } from '../types'

const siteMeta: Record<DropOffSite['type'], { icon: string; label: string }> = {
  campus: { icon: 'school', label: 'Punto inteligente en campus' },
  tienda: { icon: 'storefront', label: 'Devolución en tienda' },
  repartidor: { icon: 'sports_motorsports', label: 'Entrega al repartidor' },
}

/** Pantalla 3 · Hub de devoluciones y recompensas. */
export function Returns() {
  const { containers, flora, returnedCount, openScanner, redeem, redeemed, history } =
    useApp()

  const tierProgress = Math.min(
    100,
    (flora / (flora + currentUser.floraToNextTier)) * 100,
  )

  return (
    <div className="flex flex-col gap-stack-lg py-stack-lg page">
      <header>
        <h1 className="mb-2 text-headline-mobile font-bold text-primary md:text-display-lg">
          Devoluciones y recompensas
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Convierte tus decisiones sustentables en beneficios reales.
        </p>
      </header>

      {/* ── Saldo de Flora ─────────────────────────────────────────────── */}
      <Reveal
        as="section"
        className="relative overflow-hidden rounded-xl bg-secondary p-6 text-on-secondary shadow-ambient-raised"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary-container opacity-25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary opacity-25 blur-xl" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.span
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-lowest/20"
          >
            <Icon name="eco" fill className="text-[32px] text-secondary-container" />
          </motion.span>
          <CountUp
            value={flora}
            format={(n) => formatFlora(Math.round(n))}
            className="text-display-lg leading-none text-on-secondary"
          />
          <p className="mt-1 text-title-md text-secondary-container">Flora disponibles</p>

          <div className="mt-6 w-full max-w-xs">
            <ProgressBar
              value={tierProgress}
              trackClass="bg-primary/30"
              fillClass="bg-secondary-container"
            />
            <p className="mt-3 font-label text-label-sm uppercase tracking-widest text-secondary-container/80">
              {formatFlora(currentUser.floraToNextTier)} Flora para {currentUser.nextTier}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Envases activos ────────────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Envases en tu poder" />
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="pebble flex h-14 w-14 items-center justify-center bg-secondary-container">
                <Icon name="package_2" fill className="text-2xl text-secondary" />
              </span>
              <div>
                <p className="text-headline-mobile font-bold leading-none text-primary">
                  {containers.length}
                </p>
                <p className="font-label text-label-sm text-on-surface-variant">
                  {containers.length === 1
                    ? 'envase esperando volver'
                    : 'envases esperando volver'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-title-md font-bold leading-none text-secondary">
                {returnedCount}
              </p>
              <p className="font-label text-label-sm text-on-surface-variant">
                devueltos en total
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {containers.map((c) => (
              <motion.div
                key={c.qrCodeId}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-2 flex items-center gap-3 overflow-hidden rounded-md bg-surface-container-low p-3"
              >
                <Icon name="qr_code_2" className="shrink-0 text-2xl text-secondary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-md font-semibold text-primary">
                    {c.type} · {c.merchantName}
                  </p>
                  <p className="font-label text-label-sm text-on-surface-variant">
                    {c.qrCodeId} · vence en {c.dueInDays}{' '}
                    {c.dueInDays === 1 ? 'día' : 'días'}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary-container px-2.5 py-1 font-label text-label-sm font-bold text-on-secondary-container">
                  +{formatFlora(c.floraReward)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {containers.length === 0 && (
            <p className="rounded-md bg-surface-container-low p-4 text-center text-body-md text-on-surface-variant">
              ¡Sin envases pendientes! Tu ciclo está completo.
            </p>
          )}

          <PillButton
            variant="leaf"
            icon="qr_code_scanner"
            className="mt-4 w-full py-4 text-title-md"
            onClick={openScanner}
            disabled={containers.length === 0}
          >
            Escanear QR para devolver
          </PillButton>
        </div>
      </Reveal>

      {/* ── Cómo funciona ──────────────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Cómo devolver tu envase" />
        <Stagger className="grid grid-cols-3 gap-3">
          {[
            { icon: 'map', step: '1. Ubica', text: 'Encuentra un punto cercano' },
            { icon: 'qr_code_scanner', step: '2. Escanea', text: 'Registra la devolución' },
            { icon: 'stars', step: '3. Gana', text: 'Recibe Flora al instante' },
          ].map((s) => (
            <motion.div
              key={s.step}
              variants={staggerItem}
              className="flex flex-col items-center rounded-xl bg-surface-container-lowest p-4 text-center shadow-ambient"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-secondary">
                <Icon name={s.icon} fill />
              </span>
              <span className="mb-1 text-body-md font-bold text-primary">{s.step}</span>
              <span className="font-label text-label-sm leading-tight text-on-surface-variant">
                {s.text}
              </span>
            </motion.div>
          ))}
        </Stagger>
      </Reveal>

      {/* ── Puntos de devolución ───────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Puntos de devolución cercanos" />
        <MiniMap />
        <Stagger className="mt-3 flex flex-col gap-3">
          {dropOffSites.map((site) => (
            <motion.article
              key={site.id}
              variants={staggerItem}
              whileHover={{ x: 4 }}
              className="flex min-w-0 items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-ambient transition-shadow hover:shadow-ambient-raised"
            >
              <span className="pebble flex h-12 w-12 shrink-0 items-center justify-center bg-secondary-container text-secondary">
                <Icon name={siteMeta[site.type].icon} fill className="text-[22px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-md font-bold text-primary">{site.name}</p>
                <p className="truncate font-label text-label-sm text-on-surface-variant">
                  {siteMeta[site.type].label} · {site.address}
                </p>
                <p className="mt-1 flex items-center gap-1 font-label text-[11px] text-secondary">
                  <Icon name="schedule" className="text-[12px]" />
                  {site.hours}
                </p>
                {site.activeBins > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <ProgressBar
                      value={site.capacityUsed * 100}
                      height="h-1.5"
                      trackClass="bg-surface-container-high"
                      className="max-w-[140px]"
                    />
                    <span className="font-label text-[10px] text-on-surface-variant">
                      {site.activeBins} contenedores ·{' '}
                      {Math.round((1 - site.capacityUsed) * 100)}% libre
                    </span>
                  </div>
                )}
              </div>
              <span className="shrink-0 text-right">
                <span className="block font-label text-label-sm font-bold text-primary">
                  {formatDistance(site.distanceKm)}
                </span>
                <Icon name="chevron_right" className="text-on-surface-variant" />
              </span>
            </motion.article>
          ))}
        </Stagger>
      </Reveal>

      {/* ── Catálogo de recompensas ────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Catálogo de recompensas" />
        <Stagger className="grid gap-3 md:grid-cols-2">
          {rewards.map((reward) => {
            const affordable = flora >= reward.cost
            const claimed = redeemed.includes(reward.id)
            return (
              <motion.article
                key={reward.id}
                variants={staggerItem}
                className={`flex min-w-0 items-center justify-between gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-ambient transition-opacity ${
                  affordable || claimed ? '' : 'opacity-60'
                }`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${
                      reward.accent === 'gold'
                        ? 'bg-gold-container text-on-gold-container'
                        : reward.accent === 'mint'
                          ? 'bg-secondary-container text-secondary'
                          : 'bg-surface-container text-secondary'
                    }`}
                  >
                    <Icon name={reward.icon} fill className="text-[24px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-body-md font-bold text-primary">
                      {reward.name}
                    </h3>
                    <p className="truncate font-label text-label-sm text-on-surface-variant">
                      {reward.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!affordable}
                  onClick={() => redeem(reward.id, reward.name, reward.cost)}
                  className={`shrink-0 rounded-full px-4 py-2 font-label text-label-sm font-bold tracking-wide transition-all ${
                    affordable
                      ? 'bg-secondary text-on-secondary hover:shadow-ambient-raised active:scale-95'
                      : 'cursor-not-allowed bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {formatFlora(reward.cost)}
                </button>
              </motion.article>
            )
          })}
        </Stagger>
      </Reveal>

      {/* ── Movimientos de Flora ───────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Movimientos de Flora" />
        <ul className="divide-y divide-outline-variant/25 overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
          <AnimatePresence initial={false}>
            {history.slice(0, 6).map((mv) => (
              <motion.li
                key={mv.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-secondary">
                  <Icon name={mv.icon} fill className="text-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-md font-semibold text-primary">
                    {mv.label}
                  </p>
                  <p className="truncate font-label text-label-sm text-on-surface-variant">
                    {mv.detail} · {mv.date}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-label text-body-md font-bold ${
                    mv.amount > 0 ? 'text-secondary' : 'text-error'
                  }`}
                >
                  {mv.amount > 0 ? '+' : ''}
                  {formatFlora(mv.amount)}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Reveal>
    </div>
  )
}

/** Mapa ilustrado de los puntos de devolución (representación, no es un mapa real). */
function MiniMap() {
  const pins = [
    { x: '26%', y: '38%', label: 'Biblioteca Central UC', delay: 0 },
    { x: '58%', y: '58%', label: 'Green Bowl Providencia', delay: 0.4 },
    { x: '76%', y: '30%', label: 'Hub Casa Central', delay: 0.8 },
  ]
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-surface-container shadow-ambient md:h-64">
      {/* Trama de calles */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="calles" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M0 28h56M28 0v56" stroke="#c1c8c2" strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#calles)" />
        <path
          d="M-20 140 Q 160 90 340 150 T 720 120"
          stroke="#a5d0b9"
          strokeWidth="16"
          fill="none"
          opacity="0.55"
        />
        <circle cx="12%" cy="78%" r="46" fill="#a1f4c8" opacity="0.35" />
        <circle cx="88%" cy="18%" r="38" fill="#c1ecd4" opacity="0.5" />
      </svg>

      {pins.map((pin) => (
        <div
          key={pin.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pin.x, top: pin.y }}
        >
          <span
            className="absolute inset-0 animate-pulse-ring rounded-full bg-secondary"
            style={{ animationDelay: `${pin.delay}s` }}
          />
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pin.delay,
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary shadow-ambient-raised"
          >
            <Icon name="eco" fill className="text-[18px] text-on-secondary" />
          </motion.span>
        </div>
      ))}

      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-md bg-surface-container-lowest p-3 shadow-ambient-raised">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
          <Icon name="pin_drop" fill className="text-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-body-md font-bold leading-tight text-primary">
            Biblioteca Central UC
          </p>
          <p className="font-label text-label-sm text-on-surface-variant">
            A 0,3 km · Abierto ahora
          </p>
        </div>
      </div>
    </div>
  )
}
