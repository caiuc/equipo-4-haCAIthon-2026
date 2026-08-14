import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { categories, communityStats, merchants } from '../data/mock'
import { useApp } from '../store/AppStore'
import { formatFlora, formatKg, isEcoPartner } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { CountUp } from '../components/ui/CountUp'
import { Reveal, Stagger } from '../components/ui/Reveal'
import { staggerItem } from '../components/ui/motionVariants'
import { PebbleIcon, PillButton, ProgressBar, SectionHeader } from '../components/ui/Bits'
import { MerchantCard } from '../components/MerchantCard'

/** Pantalla 1 · Feed sustentable de inicio. */
export function Home() {
  const navigate = useNavigate()
  const { co2SavedKg, streakDays, flora, containers } = useApp()

  const recommended = merchants.filter((m) => isEcoPartner(m.sustainableSalesRatio))

  return (
    <div className="flex flex-col gap-stack-lg pb-stack-lg">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-4 page">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[58%] md:max-w-none"
          >
            <h1 className="relative inline-block text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-primary sm:text-display-lg md:text-[56px] md:leading-[60px]">
              Buena comida.
              <br />
              <span className="text-secondary">Mejor planeta.</span>
              <motion.span
                animate={{ rotate: [12, 22, 12], y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-7 -top-2 origin-bottom md:-right-9 md:-top-3"
              >
                <Icon
                  name="energy_savings_leaf"
                  fill
                  className="text-[22px] text-secondary md:text-[28px]"
                />
              </motion.span>
            </h1>
            <p className="mt-3 max-w-sm text-body-md text-on-surface-variant md:text-body-lg">
              Delivery con envases retornables, huella de carbono visible y recompensas
              reales por cada elección consciente.
            </p>
            <div className="mt-5 hidden gap-3 md:flex">
              <PillButton icon="explore" onClick={() => navigate('/explorar')}>
                Explorar Eco-Partners
              </PillButton>
              <PillButton
                variant="secondary"
                icon="leaderboard"
                onClick={() => navigate('/ranking')}
              >
                Ver mi ranking
              </PillButton>
            </div>
          </motion.div>

          {/* Ilustración orgánica del hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-6 -top-4 h-[190px] w-[55%] md:relative md:right-auto md:top-auto md:h-[280px] md:w-full"
          >
            <div className="absolute inset-0 rounded-full bg-secondary-container/40 blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-full items-center justify-center"
            >
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </div>

        {/* Buscador */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mt-8 flex gap-2"
        >
          <div className="group flex flex-1 items-center rounded-full border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 shadow-ambient transition-all focus-within:border-secondary focus-within:shadow-ambient-raised">
            <Icon
              name="search"
              className="mr-3 text-on-surface-variant transition-colors group-focus-within:text-secondary"
            />
            <input
              type="search"
              placeholder="Busca comida o locales…"
              onFocus={() => navigate('/explorar')}
              className="w-full bg-transparent text-body-md text-primary outline-none placeholder:text-on-surface-variant/70"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/explorar')}
            aria-label="Filtros"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-lowest shadow-ambient transition-colors hover:bg-surface-container-low"
          >
            <Icon name="tune" className="text-primary" />
          </button>
        </motion.div>
      </section>

      {/* ── Categorías ─────────────────────────────────────────────────── */}
      <Reveal as="section" className="page">
        <div className="no-scrollbar flex justify-between gap-2 overflow-x-auto rounded-md bg-surface-container-lowest p-4 shadow-ambient">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/explorar?categoria=${cat.id}`)}
              className="group flex min-w-[76px] flex-1 flex-col items-center gap-2"
            >
              <motion.span
                whileHover={{ scale: 1.08, rotate: -4 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-variant transition-colors group-hover:bg-secondary-container"
              >
                <Icon name={cat.icon} fill={cat.fill} className="text-2xl text-secondary" />
              </motion.span>
              <span className="whitespace-pre-line text-center font-label text-label-sm leading-tight text-on-surface-variant transition-colors group-hover:text-primary">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* ── Tarjeta de impacto personal ────────────────────────────────── */}
      <Reveal as="section" className="page">
        <div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary">
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-secondary-fixed-dim/25 blur-3xl" />
          <Icon
            name="public"
            fill
            className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 text-[160px] text-secondary-fixed/10"
          />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <PebbleIcon
                name="eco"
                size="h-16 w-16"
                tone="bg-surface-container-lowest text-secondary"
                className="shadow-ambient"
              />
              <div>
                <p className="font-label text-label-sm uppercase tracking-widest text-on-primary-container">
                  Tu impacto este mes
                </p>
                <p className="text-display-lg leading-none text-primary-fixed">
                  <CountUp value={co2SavedKg} format={(n) => formatKg(n)} />
                  <span className="ml-2 text-title-md text-secondary-fixed-dim">
                    kg CO₂ evitados
                  </span>
                </p>
                <p className="mt-1 text-body-md text-on-primary-container">
                  Equivale a {Math.round(co2SavedKg * 4.6)} km sin auto 🚗
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <MiniStat icon="local_fire_department" value={`${streakDays} días`} label="Racha" />
              <MiniStat icon="eco" value={formatFlora(flora)} label="Flora" />
              <MiniStat
                icon="package_2"
                value={String(containers.length)}
                label="Envases activos"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Recomendados ───────────────────────────────────────────────── */}
      <section className="overflow-hidden">
        <div className="page">
          <SectionHeader
            title="Recomendados para ti"
            action="Ver todos"
            onAction={() => navigate('/explorar')}
          />
        </div>
        <Stagger className="page-rail no-scrollbar flex snap-x gap-gutter overflow-x-auto pb-4">
          {recommended.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} variant="carousel" />
          ))}
        </Stagger>
      </section>

      {/* ── Banner de devoluciones ─────────────────────────────────────── */}
      <Reveal as="section" className="page">
        <div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-xl bg-primary-fixed p-6 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary-fixed-dim opacity-40 blur-2xl" />
          <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest shadow-ambient">
            <Icon name="recycling" className="text-3xl text-secondary" />
            <Icon
              name="eco"
              fill
              className="absolute -bottom-1 -right-1 text-xl text-secondary"
            />
          </div>
          <div className="relative z-10 flex-1">
            <h3 className="mb-1 text-title-md font-bold text-primary">
              Tienes {containers.length} envases esperando volver
            </h3>
            <p className="mb-3 text-body-md text-on-primary-fixed-variant">
              Devuélvelos en un punto inteligente del campus, en la tienda o al repartidor
              de tu próximo pedido.
            </p>
            <PillButton icon="qr_code_scanner" onClick={() => navigate('/devoluciones')}>
              Devolver envases
            </PillButton>
          </div>
        </div>
      </Reveal>

      {/* ── Impacto de la comunidad ────────────────────────────────────── */}
      <Reveal as="section" className="page">
        <SectionHeader
          title="Cada pedido genera impacto"
          action="Ver ranking"
          onAction={() => navigate('/ranking')}
        />
        <div className="grid gap-3 rounded-md bg-surface-container-lowest p-4 shadow-ambient sm:grid-cols-3 sm:divide-x sm:divide-outline-variant/30">
          <CommunityStat
            icon="eco"
            value={communityStats.co2SavedKg}
            label="kg CO₂ ahorrados"
          />
          <CommunityStat
            icon="recycling"
            value={communityStats.wasteAvoided}
            label="residuos evitados"
            className="sm:px-4"
          />
          <CommunityStat
            icon="park"
            value={communityStats.treesPlanted}
            label="árboles plantados"
            className="sm:px-4"
          />
        </div>

        <div className="mt-4 rounded-md bg-surface-container-lowest p-4 shadow-ambient">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-body-md font-semibold text-primary">
              Meta comunitaria: 20.000 envases en circulación
            </p>
            <span className="font-label text-label-sm text-secondary">
              {communityStats.containersInLoop.toLocaleString('es-CL')}
            </span>
          </div>
          <ProgressBar value={(communityStats.containersInLoop / 20000) * 100} />
        </div>
      </Reveal>
    </div>
  )
}

function MiniStat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest/15 px-3 py-2 backdrop-blur-sm">
      <Icon name={icon} fill className="text-[18px] text-secondary-fixed-dim" />
      <span className="flex flex-col leading-none">
        <span className="text-body-md font-bold text-primary-fixed">{value}</span>
        <span className="font-label text-[10px] text-on-primary-container">{label}</span>
      </span>
    </div>
  )
}

function CommunityStat({
  icon,
  value,
  label,
  className = '',
}: {
  icon: string
  value: number
  label: string
  className?: string
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={`flex items-center gap-3 px-2 ${className}`}
    >
      <PebbleIcon name={icon} size="h-11 w-11" />
      <div className="flex flex-col">
        <CountUp value={value} className="text-title-md font-bold text-primary" />
        <span className="font-label text-[11px] leading-tight text-on-surface-variant">
          {label}
        </span>
      </div>
    </motion.div>
  )
}

/** Ilustración vectorial del hero: bolsa de papel, hojas y planeta. */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 220 200" className="h-full w-full" role="img" aria-label="Bolsa de papel con hojas y el planeta">
      <ellipse cx="110" cy="176" rx="88" ry="16" fill="#c1ecd4" opacity="0.65" />
      <circle cx="158" cy="70" r="34" fill="#a5d0b9" opacity="0.55" />
      <path
        d="M158 44a26 26 0 1 0 0 52 26 26 0 0 0 0-52Zm-14 26a14 14 0 0 1 20-12l-6 9 8 4-4 10 10 2a14 14 0 0 1-28-13Z"
        fill="#116c4a"
        opacity="0.35"
      />
      <path d="M62 76h84l10 96H52l10-96Z" fill="#d9c6a8" />
      <path d="M62 76h84l4 38H58l4-38Z" fill="#c9b28c" opacity="0.5" />
      <path
        d="M84 76c0-12 10-22 26-22s26 10 26 22"
        stroke="#a8916b"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="104" cy="126" r="26" fill="#116c4a" opacity="0.18" />
      <path
        d="M104 110c14 0 22 8 22 20-14 4-26-2-30-12 6-6 8-8 8-8Z"
        fill="#116c4a"
        opacity="0.75"
      />
      <path d="M104 142c-8-8-6-22 4-30" stroke="#012d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 96c-14-6-22-20-18-34 16-2 30 8 32 22" fill="#86d7ad" />
      <path d="M40 96c-6-14-4-26 6-34" stroke="#116c4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M186 130c12 4 20 16 16 28-14 2-26-6-28-18" fill="#a1f4c8" />
      <path d="M186 130c8 10 10 20 6 28" stroke="#116c4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
