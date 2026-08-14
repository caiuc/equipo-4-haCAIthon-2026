import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { categories, merchants } from '../data/mock'
import { isEcoPartner } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { MerchantCard } from '../components/MerchantCard'
import { Stagger } from '../components/ui/Reveal'

type SortKey = 'sustentabilidad' | 'tiempo' | 'rating' | 'distancia'

const sorters: Record<SortKey, { label: string; icon: string }> = {
  sustentabilidad: { label: 'Más sustentables', icon: 'eco' },
  tiempo: { label: 'Más rápidos', icon: 'schedule' },
  rating: { label: 'Mejor evaluados', icon: 'star' },
  distancia: { label: 'Más cerca', icon: 'near_me' },
}

/** Búsqueda y filtros. Los Eco-Partner suben en el ranking (ARCHITECTURE.md §1.3). */
export function Explore() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('categoria')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('sustentabilidad')
  const [onlyEcoPartner, setOnlyEcoPartner] = useState(false)

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return merchants
      .filter((m) => !activeCategory || m.categories.includes(activeCategory))
      .filter((m) => !onlyEcoPartner || isEcoPartner(m.sustainableSalesRatio))
      .filter(
        (m) =>
          !term ||
          m.name.toLowerCase().includes(term) ||
          m.category.toLowerCase().includes(term) ||
          m.tagline.toLowerCase().includes(term) ||
          m.menu.some((i) => i.name.toLowerCase().includes(term)),
      )
      .sort((a, b) => {
        switch (sort) {
          case 'tiempo':
            return a.deliveryTimeMin - b.deliveryTimeMin
          case 'rating':
            return b.rating - a.rating
          case 'distancia':
            return a.distanceKm - b.distanceKm
          default:
            return b.sustainableSalesRatio - a.sustainableSalesRatio
        }
      })
  }, [activeCategory, onlyEcoPartner, query, sort])

  const setCategory = (id: string | null) => {
    if (!id) setParams({})
    else setParams({ categoria: id })
  }

  return (
    <div className="flex flex-col gap-stack-lg py-stack-lg page">
      <header>
        <h1 className="mb-2 text-headline-mobile font-bold text-primary md:text-display-lg">
          Explorar
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Los comercios con más de 30% de ventas sustentables aparecen primero.
        </p>
      </header>

      <div className="sticky top-[68px] z-30 -mx-container-margin flex flex-col gap-3 bg-background/90 px-container-margin py-3 backdrop-blur-xl lg:top-[76px]">
        <div className="flex items-center rounded-full border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 shadow-ambient focus-within:border-secondary">
          <Icon name="search" className="mr-3 text-on-surface-variant" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca un local o un plato…"
            className="w-full bg-transparent text-body-md text-primary outline-none placeholder:text-on-surface-variant/70"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
              <Icon name="close" className="text-[18px] text-on-surface-variant" />
            </button>
          )}
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <FilterChip
            active={!activeCategory}
            onClick={() => setCategory(null)}
            icon="apps"
            label="Todos"
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setCategory(activeCategory === cat.id ? null : cat.id)}
              icon={cat.icon}
              label={cat.label.replace('\n', ' ')}
            />
          ))}
          <FilterChip
            active={onlyEcoPartner}
            onClick={() => setOnlyEcoPartner((v) => !v)}
            icon="verified"
            label="Solo Eco-Partner"
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {(Object.keys(sorters) as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 font-label text-label-sm transition-colors ${
                sort === key
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Icon name={sorters[key].icon} className="text-[14px]" />
              {sorters[key].label}
            </button>
          ))}
        </div>
      </div>

      <p className="font-label text-label-sm text-on-surface-variant">
        {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
      </p>

      <AnimatePresence mode="popLayout">
        {results.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 rounded-xl bg-surface-container-lowest p-10 text-center shadow-ambient"
          >
            <span className="pebble flex h-20 w-20 items-center justify-center bg-surface-container">
              <Icon name="search_off" className="text-3xl text-outline" />
            </span>
            <p className="text-title-md text-primary">Sin resultados</p>
            <p className="text-body-md text-on-surface-variant">
              Prueba con otro término o quita algún filtro.
            </p>
          </motion.div>
        ) : (
          <Stagger
            key={`${activeCategory}-${sort}-${onlyEcoPartner}-${query}`}
            className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </Stagger>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: string
  label: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 font-label text-label-sm transition-colors ${
        active
          ? 'border-secondary bg-secondary-container text-on-secondary-container'
          : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
      }`}
    >
      <Icon name={icon} fill={active} className="text-[16px]" />
      {label}
    </motion.button>
  )
}
