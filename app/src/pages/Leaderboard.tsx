import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  currentUser,
  friendsLeaderboard,
  globalLeaderboard,
  merchantRanking,
} from '../data/mock'
import { useApp } from '../store/AppStore'
import { formatKg, formatPercent } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { CountUp } from '../components/ui/CountUp'
import { SmartImage } from '../components/ui/SmartImage'
import { Reveal, Stagger } from '../components/ui/Reveal'
import { staggerItem } from '../components/ui/motionVariants'
import { ProgressBar, SectionHeader } from '../components/ui/Bits'
import type { LeaderboardEntry } from '../types'

const medals = ['#d4af37', '#b0b7bd', '#c08457']

/** Pantalla 4 · Ranking social de CO₂ estilo Duolingo. */
export function Leaderboard() {
  const { co2SavedKg, streakDays, pushToast } = useApp()
  const [scope, setScope] = useState<'amigos' | 'global'>('amigos')

  const raw = scope === 'amigos' ? friendsLeaderboard : globalLeaderboard
  const entries = [...raw]
    .map((e) => (e.isCurrentUser ? { ...e, co2Kg: co2SavedKg, streakDays } : e))
    .sort((a, b) => b.co2Kg - a.co2Kg)

  const myIndex = entries.findIndex((e) => e.isCurrentUser)
  const ahead = myIndex > 0 ? entries[myIndex - 1] : null
  const gap = ahead ? Math.max(0, ahead.co2Kg - co2SavedKg) : 0
  const progressToAhead = ahead ? (co2SavedKg / ahead.co2Kg) * 100 : 100

  return (
    <div className="flex flex-col gap-stack-lg py-stack-lg page">
      <header className="flex flex-col items-center gap-stack-md text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-container"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/40" />
          <Icon name="local_fire_department" fill className="text-4xl text-gold" />
        </motion.div>
        <div>
          <h1 className="text-headline-mobile font-bold text-primary md:text-display-lg">
            ¡Racha de {streakDays} días verdes!
          </h1>
          <p className="mt-1 text-body-lg text-on-surface-variant">
            Compara tu impacto en CO₂ con tu comunidad.
          </p>
        </div>

        {/* Días de la racha */}
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 400 }}
              className={`flex h-8 w-8 items-center justify-center rounded-full font-label text-[11px] font-bold ${
                i < streakDays % 8 || streakDays >= 7
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
            </motion.span>
          ))}
        </div>

        {/* Conmutador de alcance */}
        <div className="flex rounded-full bg-surface-container-low p-1">
          {(['amigos', 'global'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setScope(key)}
              className="relative rounded-full px-6 py-2 text-body-md font-semibold capitalize transition-colors"
            >
              {scope === key && (
                <motion.span
                  layoutId="scope-pill"
                  className="absolute inset-0 rounded-full bg-surface-container-lowest shadow-ambient"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className={`relative ${
                  scope === key ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {key === 'amigos' ? 'Amigos' : 'Global'}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Tarjeta de posición actual ─────────────────────────────────── */}
      <Reveal
        as="section"
        className="relative overflow-hidden rounded-xl border border-surface-container-low bg-surface-container-lowest p-container-margin shadow-ambient"
      >
        <Icon
          name="emoji_events"
          fill
          className="pointer-events-none absolute -right-8 -top-8 text-[130px] text-secondary opacity-10"
        />
        <div className="relative z-10 flex items-center gap-gutter">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-secondary">
            <SmartImage
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              fallbackIcon="person"
              className="h-full w-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-title-md font-bold text-primary">
              Vas en el puesto #{myIndex + 1}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-secondary">
              <Icon name="local_fire_department" fill className="text-[16px]" />
              <span className="font-label text-label-sm font-bold">
                {streakDays} días de racha verde
              </span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <CountUp
              value={co2SavedKg}
              format={(n) => formatKg(n)}
              className="text-headline-lg font-bold text-primary"
            />
            <p className="font-label text-label-sm text-on-surface-variant">kg CO₂</p>
          </div>
        </div>

        {ahead && (
          <div className="mt-stack-md border-t border-surface-container-low pt-stack-md">
            <p className="mb-2 text-body-md text-on-surface-variant">
              Estás a <strong className="text-primary">{formatKg(gap)} kg</strong> de superar
              a {ahead.name.split(' ')[0]}.
            </p>
            <ProgressBar value={progressToAhead} />
          </div>
        )}
      </Reveal>

      {/* ── Ranking de personas ────────────────────────────────────────── */}
      <section>
        <SectionHeader
          title={scope === 'amigos' ? 'Tus amigos' : 'Ranking global'}
        />
        <AnimatePresence mode="wait">
          <Stagger
            key={scope}
            className="divide-y divide-surface-container-low overflow-hidden rounded-xl border border-surface-container-low bg-surface-container-lowest shadow-ambient"
          >
            {entries.map((entry, index) => (
              <RankRow
                key={entry.id}
                entry={entry}
                rank={index + 1}
                onCelebrate={() =>
                  pushToast({
                    title:
                      entry.isCurrentUser
                        ? '¡Sigue así!'
                        : `Enviaste ánimo a ${entry.name.split(' ')[0]}`,
                    detail: 'Tu comunidad lo verá en su feed',
                    icon: entry.isCurrentUser ? 'celebration' : 'waving_hand',
                  })
                }
              />
            ))}
          </Stagger>
        </AnimatePresence>
      </section>

      {/* ── Ranking de comercios ───────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Comercios más circulares" />
        <p className="mb-stack-md text-body-md text-on-surface-variant">
          Porcentaje de ventas con envase retornable. Sobre 30% obtienen la insignia
          Eco-Partner y prioridad en el feed.
        </p>
        <Stagger className="flex flex-col gap-3">
          {merchantRanking.map((m, i) => (
            <motion.article
              key={m.id}
              variants={staggerItem}
              className="flex min-w-0 items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-ambient"
            >
              <span className="w-6 shrink-0 text-center text-title-md font-bold text-on-surface-variant">
                {i + 1}
              </span>
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                <SmartImage src={m.logoUrl} alt={m.name} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-1.5">
                  <h3 className="truncate text-body-md font-bold text-primary">{m.name}</h3>
                  {m.returnableRatio > 0.3 && (
                    <Icon name="verified" fill className="shrink-0 text-[15px] text-secondary" />
                  )}
                </div>
                <ProgressBar value={m.returnableRatio * 100} height="h-2" />
                <p className="mt-1 font-label text-[11px] text-on-surface-variant">
                  {m.containersReturned.toLocaleString('es-CL')} envases devueltos
                </p>
              </div>
              <span className="shrink-0 text-title-md font-bold text-secondary">
                {formatPercent(m.returnableRatio)}
              </span>
            </motion.article>
          ))}
        </Stagger>
      </Reveal>

      {/* ── Insignias ──────────────────────────────────────────────────── */}
      <Reveal as="section">
        <SectionHeader title="Tus insignias" />
        <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {currentUser.badges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={staggerItem}
              whileHover={badge.unlocked ? { y: -4, rotate: -3 } : undefined}
              title={badge.description}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all ${
                badge.unlocked
                  ? 'bg-surface-container-lowest shadow-ambient'
                  : 'bg-surface-container opacity-55'
              }`}
            >
              <span
                className={`pebble flex h-12 w-12 items-center justify-center ${
                  badge.unlocked
                    ? 'bg-secondary-container text-secondary'
                    : 'bg-surface-container-high text-outline'
                }`}
              >
                <Icon name={badge.unlocked ? badge.icon : 'lock'} fill className="text-[22px]" />
              </span>
              <span className="font-label text-[11px] leading-tight text-on-surface-variant">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </Stagger>
      </Reveal>
    </div>
  )
}

function RankRow({
  entry,
  rank,
  onCelebrate,
}: {
  entry: LeaderboardEntry
  rank: number
  onCelebrate: () => void
}) {
  return (
    <motion.div
      variants={staggerItem}
      layout
      className={`flex items-center gap-gutter p-stack-md ${
        entry.isCurrentUser ? 'border-l-4 border-secondary bg-surface-bright' : ''
      }`}
    >
      <span
        className="w-8 shrink-0 text-center text-headline-mobile font-bold"
        style={{ color: rank <= 3 ? medals[rank - 1] : undefined }}
      >
        {rank}
      </span>

      <div className="relative h-12 w-12 shrink-0">
        <div
          className={`h-full w-full overflow-hidden rounded-full ${
            entry.isCurrentUser ? 'border-2 border-secondary' : ''
          }`}
        >
          <SmartImage
            src={entry.avatarUrl}
            alt={entry.name}
            fallbackIcon="person"
            className="h-full w-full"
          />
        </div>
        {rank <= 3 && (
          <span className="absolute -bottom-1 -right-1 rounded-full bg-surface-container-lowest p-[2px]">
            <Icon
              name="workspace_premium"
              fill
              className="text-[15px]"
              style={{ color: medals[rank - 1] }}
            />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-body-md ${
            entry.isCurrentUser ? 'font-bold text-primary' : 'font-semibold text-primary'
          }`}
        >
          {entry.isCurrentUser ? 'Tú' : entry.name}
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-0.5 font-label text-[11px] text-on-surface-variant">
            <Icon name="local_fire_department" fill className="text-[12px] text-gold" />
            {entry.streakDays}
          </span>
          {entry.badge && (
            <span className="rounded-sm bg-secondary-container px-2 py-0.5 font-label text-[10px] text-on-secondary-container">
              {entry.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end">
        <span
          className={`text-body-md font-bold ${
            entry.isCurrentUser ? 'text-secondary' : 'text-primary'
          }`}
        >
          {formatKg(entry.co2Kg)} kg
        </span>
        <button
          type="button"
          onClick={onCelebrate}
          className="mt-0.5 flex items-center gap-1 font-label text-[11px] text-outline transition-colors hover:text-secondary"
        >
          <Icon
            name={entry.isCurrentUser ? 'celebration' : 'waving_hand'}
            className="text-[13px]"
          />
          {entry.isCurrentUser ? 'Celebrar' : 'Animar'}
        </button>
      </div>
    </motion.div>
  )
}
