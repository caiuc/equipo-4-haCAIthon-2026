import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Merchant } from '../types'
import { formatDistance, formatPercent, isEcoPartner } from '../lib/format'
import { useApp } from '../store/AppStore'
import { Icon } from './ui/Icon'
import { SmartImage } from './ui/SmartImage'
import { EcoPartnerBadge } from './ui/Bits'
import { staggerItem } from './ui/motionVariants'

/**
 * Tarjeta de comercio: imagen de alta proporción, insignia Eco-Partner flotante
 * y chips de sustentabilidad (DESIGN.md · Components).
 */
export function MerchantCard({
  merchant,
  variant = 'grid',
  animated = true,
}: {
  merchant: Merchant
  variant?: 'grid' | 'carousel'
  animated?: boolean
}) {
  const { favorites, toggleFavorite } = useApp()
  const isFavorite = favorites.includes(merchant.id)

  return (
    <motion.article
      variants={animated ? staggerItem : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`group relative overflow-hidden rounded-md bg-surface-container-lowest shadow-ambient transition-shadow duration-300 hover:shadow-ambient-hover ${
        variant === 'carousel' ? 'w-[280px] shrink-0 snap-start' : 'w-full'
      }`}
    >
      <Link to={`/restaurante/${merchant.slug}`} className="block">
        <div className="relative h-[160px] w-full overflow-hidden">
          <SmartImage
            src={merchant.imageUrl}
            alt={merchant.name}
            className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          {isEcoPartner(merchant.sustainableSalesRatio) && (
            <EcoPartnerBadge className="absolute left-3 top-3" />
          )}
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-primary/85 px-2.5 py-1 font-label text-[10px] font-semibold text-on-primary backdrop-blur-sm">
            <Icon name="schedule" className="text-[12px]" />
            {merchant.deliveryTimeMin}–{merchant.deliveryTimeMax} min
          </span>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(merchant.id)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/85 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
      >
        <Icon
          name="favorite"
          fill={isFavorite}
          className={`text-[18px] ${isFavorite ? 'text-error' : 'text-primary'}`}
        />
      </button>

      <Link to={`/restaurante/${merchant.slug}`} className="block p-4">
        <div className="mb-1 flex items-center gap-1.5">
          <h3 className="truncate text-title-md font-bold text-primary transition-colors group-hover:text-secondary">
            {merchant.name}
          </h3>
          {isEcoPartner(merchant.sustainableSalesRatio) && (
            <Icon name="verified" fill className="shrink-0 text-[16px] text-secondary" />
          )}
        </div>
        <p className="mb-2 font-label text-label-sm text-on-surface-variant">
          {merchant.priceLevel} · {merchant.category} · {formatDistance(merchant.distanceKm)}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-variant/60 px-2 py-1 font-label text-[10px] text-secondary">
            <Icon name={merchant.packagingIcon} fill className="text-[12px]" />
            {merchant.packagingTag}
          </span>
          <span className="inline-flex items-center gap-1 font-label text-[10px] text-on-surface-variant">
            <Icon name="star" fill className="text-[12px] text-gold" />
            {merchant.rating.toString().replace('.', ',')}
          </span>
        </div>
        <p className="mt-2 font-label text-[10px] text-on-surface-variant">
          {formatPercent(merchant.sustainableSalesRatio)} de sus ventas con envase sustentable
        </p>
      </Link>
    </motion.article>
  )
}
