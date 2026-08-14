import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { merchants } from '../data/mock'
import { useApp } from '../store/AppStore'
import {
  formatCLP,
  formatFlora,
  formatPercent,
  isEcoPartner,
} from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { SmartImage } from '../components/ui/SmartImage'
import { Chip, Co2Tag, PillButton, ProgressBar } from '../components/ui/Bits'
import { Reveal, Stagger } from '../components/ui/Reveal'
import { staggerItem } from '../components/ui/motionVariants'
import type { MenuItem } from '../types'

/** Pantalla 2 · Detalle de comercio sustentable. */
export function RestaurantDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const merchant = merchants.find((m) => m.slug === slug)
  const {
    addItem,
    favorites,
    toggleFavorite,
    packaging,
    setPackaging,
    lines,
    subtotal,
    discount,
    total,
    floraForOrder,
    openCart,
    merchant: cartMerchant,
  } = useApp()

  const menuCategories = useMemo(
    () => (merchant ? [...new Set(merchant.menu.map((i) => i.category))] : []),
    [merchant],
  )
  const [activeCategory, setActiveCategory] = useState(menuCategories[0] ?? '')

  if (!merchant) return <Navigate to="/explorar" replace />

  const isFavorite = favorites.includes(merchant.id)
  const usesReturnable = packaging === 'retornable' && merchant.returnableAvailable
  const cartBelongsHere = cartMerchant?.id === merchant.id
  const visibleMenu = merchant.menu.filter(
    (i) => i.category === (activeCategory || menuCategories[0]),
  )

  return (
    <div className="pb-stack-lg">
      {/* Encabezado móvil */}
      <div className="sticky top-[60px] z-30 flex items-center gap-2 bg-background/90 px-container-margin py-2 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-ambient"
        >
          <Icon name="arrow_back" className="text-primary" />
        </button>
        <span className="flex-1 truncate text-title-md font-bold text-primary">
          {merchant.name}
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(merchant.id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-ambient"
        >
          <Icon
            name="favorite"
            fill={isFavorite}
            className={isFavorite ? 'text-error' : 'text-primary'}
          />
        </button>
      </div>

      <div className="grid gap-gutter pt-4 md:grid-cols-12 page">
        {/* ── Columna izquierda ─────────────────────────────────────────── */}
        {/* min-w-0: sin esto la fila de píldoras con margen negativo ensancha la columna */}
        <div className="flex min-w-0 flex-col gap-stack-lg md:col-span-8">
          <Reveal as="section" className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
            <div className="relative h-48 w-full md:h-72">
              <SmartImage
                src={merchant.imageUrl}
                alt={merchant.name}
                className="h-full w-full"
              />
              {isEcoPartner(merchant.sustainableSalesRatio) && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="absolute left-4 top-4 flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1.5 font-label text-label-sm font-semibold text-on-secondary shadow-ambient-raised"
                >
                  <Icon name="eco" fill className="text-[16px]" />
                  Eco-Partner · {formatPercent(merchant.sustainableSalesRatio)} sustentable
                </motion.div>
              )}
            </div>

            <div className="p-container-margin">
              <div className="mb-2 flex items-start justify-between gap-4">
                <h1 className="text-headline-mobile font-bold text-primary md:text-display-lg">
                  {merchant.name}
                </h1>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-surface-container-low px-3 py-1.5">
                  <Icon name="star" fill className="text-[18px] text-gold" />
                  <span className="text-title-md font-bold text-primary">
                    {merchant.rating.toString().replace('.', ',')}
                  </span>
                  <span className="font-label text-label-sm text-on-surface-variant">
                    ({merchant.reviews.toLocaleString('es-CL')})
                  </span>
                </span>
              </div>
              <p className="mb-stack-md text-body-lg text-on-surface-variant">
                {merchant.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip icon={merchant.packagingIcon}>{merchant.packagingTag}</Chip>
                <Chip icon="local_shipping">
                  {merchant.deliveryTimeMin}–{merchant.deliveryTimeMax} min
                </Chip>
                <Chip icon="payments">{formatCLP(merchant.deliveryFee)} de envío</Chip>
                <Chip icon="near_me">
                  {merchant.distanceKm.toString().replace('.', ',')} km
                </Chip>
              </div>

              {/* Meta de sustentabilidad del comercio */}
              <div className="mt-stack-lg rounded-md bg-surface-container-low p-4">
                <div className="mb-2 flex items-end justify-between gap-3">
                  <span className="text-body-md font-semibold text-primary">
                    Meta {'>'}30% de ventas sustentables
                  </span>
                  <span
                    className={`font-label text-label-sm font-bold ${
                      isEcoPartner(merchant.sustainableSalesRatio)
                        ? 'text-secondary'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {formatPercent(merchant.sustainableSalesRatio)}
                  </span>
                </div>
                <ProgressBar value={merchant.sustainableSalesRatio * 100} />
                <p className="mt-2 font-label text-label-sm text-on-surface-variant">
                  {isEcoPartner(merchant.sustainableSalesRatio)
                    ? 'Meta cumplida: recibe insignia Eco-Partner y prioridad en el feed.'
                    : `Le faltan ${formatPercent(0.3 - merchant.sustainableSalesRatio)} para obtener la insignia Eco-Partner.`}
                </p>
              </div>

              {/* Las marcas reales aparecen con datos inventados: hay que decirlo. */}
              {merchant.isRealBrand && (
                <p className="mt-stack-md flex items-start gap-2 rounded-md bg-surface-container p-3 font-label text-label-sm text-on-surface-variant">
                  <Icon name="info" className="shrink-0 text-[16px] text-outline" />
                  <span>
                    Marca real usada solo como referencia visual en esta demo. El menú, los
                    precios y las métricas de sustentabilidad son inventados y no
                    representan datos reales de la empresa.
                  </span>
                </p>
              )}
            </div>
          </Reveal>

          {/* Categorías del menú */}
          <div className="no-scrollbar -mx-container-margin flex gap-3 overflow-x-auto px-container-margin md:mx-0 md:px-0">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-body-md font-semibold whitespace-nowrap shadow-ambient transition-colors ${
                  (activeCategory || menuCategories[0]) === cat
                    ? 'bg-primary text-on-primary'
                    : 'border border-surface-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menú */}
          <section>
            <h2 className="mb-stack-md text-headline-mobile font-bold text-primary">
              {activeCategory || menuCategories[0]}
            </h2>
            <AnimatePresence mode="wait">
              <Stagger key={activeCategory} className="flex flex-col gap-stack-md">
                {visibleMenu.map((item) => (
                  <MenuRow
                    key={item.id}
                    item={item}
                    onAdd={() => addItem(merchant, item)}
                    quantity={
                      cartBelongsHere
                        ? (lines.find((l) => l.itemId === item.id)?.quantity ?? 0)
                        : 0
                    }
                  />
                ))}
              </Stagger>
            </AnimatePresence>
          </section>
        </div>

        {/* ── Columna derecha (pegajosa en escritorio) ──────────────────── */}
        <div className="flex min-w-0 flex-col gap-stack-lg md:col-span-4">
          <div className="flex flex-col gap-stack-lg md:sticky md:top-28">
            {/* Preferencia de envase */}
            <Reveal
              as="section"
              className="relative overflow-hidden rounded-xl border border-secondary-fixed-dim bg-[#f2f8f5] p-5 shadow-ambient"
            >
              <Icon
                name="eco"
                fill
                className="pointer-events-none absolute -right-8 -top-8 text-[150px] text-secondary-container opacity-25"
              />
              <div className="relative z-10">
                <h3 className="mb-3 flex items-center gap-2 text-title-md font-bold text-primary">
                  <Icon name="package_2" className="text-secondary" />
                  Preferencia de envase
                </h3>

                {merchant.returnableAvailable ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <PackagingOption
                        selected={usesReturnable}
                        onSelect={() => setPackaging('retornable')}
                        icon="autorenew"
                        title="Envase retornable"
                        detail={`Ahorra ${formatCLP(merchant.returnableDiscount)} + ${formatFlora(merchant.returnableFlora)} Flora`}
                        highlight
                      />
                      <PackagingOption
                        selected={!usesReturnable}
                        onSelect={() => setPackaging('compostable')}
                        icon="compost"
                        title="Envase compostable estándar"
                        detail="Sin descuento ni Flora"
                      />
                    </div>
                    <AnimatePresence>
                      {usesReturnable && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 flex items-center gap-3 rounded-md bg-surface-container-lowest/70 p-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
                              <Icon name="verified_user" />
                            </span>
                            <p className="font-label text-label-sm leading-tight text-on-surface-variant">
                              <strong className="text-primary">Elección cero residuos.</strong>{' '}
                              Devuélvelo en cualquier punto inteligente en 5 días.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <p className="text-body-md text-on-surface-variant">
                    Este comercio aún no participa del programa de envases retornables. Usa
                    envase compostable.
                  </p>
                )}
              </div>
            </Reveal>

            {/* Resumen del pedido */}
            <Reveal
              as="section"
              className="flex flex-col gap-4 rounded-xl border border-surface-variant bg-surface-container-lowest p-5 shadow-ambient"
            >
              <h3 className="border-b border-surface-variant pb-3 text-title-md font-bold text-primary">
                Tu pedido
              </h3>

              {!cartBelongsHere || lines.length === 0 ? (
                <p className="py-4 text-center text-body-md text-on-surface-variant">
                  Agrega platos para ver el resumen y tu ahorro sustentable.
                </p>
              ) : (
                <>
                  <ul className="flex flex-col gap-2">
                    {lines.map((line) => (
                      <li key={line.itemId} className="flex items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="rounded bg-surface-container px-2 py-0.5 font-label text-label-sm font-bold text-primary">
                            {line.quantity}
                          </span>
                          <span className="truncate text-body-md text-primary">
                            {line.name}
                          </span>
                        </span>
                        <span className="shrink-0 text-body-md text-primary">
                          {formatCLP(line.price * line.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="flex flex-col gap-2 border-t border-surface-variant pt-3">
                    <div className="flex justify-between text-body-md text-on-surface-variant">
                      <dt>Subtotal</dt>
                      <dd>{formatCLP(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-body-md text-on-surface-variant">
                      <dt>Envío</dt>
                      <dd>{formatCLP(merchant.deliveryFee)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-body-md font-bold text-secondary">
                        <dt className="flex items-center gap-1">
                          <Icon name="eco" fill className="text-[16px]" />
                          Descuento sustentable
                        </dt>
                        <dd>−{formatCLP(discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-surface-variant pt-3 text-title-md font-bold text-primary">
                      <dt>Total</dt>
                      <dd>{formatCLP(total)}</dd>
                    </div>
                  </dl>

                  <PillButton
                    className="w-full py-4 text-title-md"
                    onClick={() => navigate('/checkout')}
                  >
                    Ir a pagar · {formatCLP(total)}
                  </PillButton>

                  {floraForOrder > 0 && (
                    <p className="flex items-center justify-center gap-1 font-label text-label-sm text-secondary">
                      <Icon name="park" fill className="text-[14px]" />
                      Ganarás {formatFlora(floraForOrder)} Flora con este pedido
                    </p>
                  )}
                </>
              )}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Barra flotante de carrito (móvil) */}
      <AnimatePresence>
        {cartBelongsHere && lines.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed inset-x-0 bottom-[76px] z-40 px-container-margin lg:hidden"
          >
            <button
              type="button"
              onClick={openCart}
              className="flex w-full items-center justify-between gap-3 rounded-full bg-primary px-5 py-4 text-on-primary shadow-ambient-raised"
            >
              <span className="flex items-center gap-2">
                <Icon name="shopping_bag" fill className="text-[20px]" />
                <span className="text-body-md font-bold">
                  {lines.reduce((s, l) => s + l.quantity, 0)}{' '}
                  {lines.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </span>
              <span className="text-title-md font-bold">{formatCLP(total)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-stack-lg text-center lg:hidden page">
        <Link
          to="/explorar"
          className="font-label text-label-sm text-secondary underline underline-offset-4"
        >
          Ver otros Eco-Partners
        </Link>
      </div>
    </div>
  )
}

function MenuRow({
  item,
  quantity,
  onAdd,
}: {
  item: MenuItem
  quantity: number
  onAdd: () => void
}) {
  return (
    <motion.article
      variants={staggerItem}
      className="group flex gap-4 rounded-xl border border-transparent bg-surface-container-lowest p-4 shadow-ambient transition-all hover:border-secondary-fixed hover:shadow-ambient-raised"
    >
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-title-md font-semibold text-primary transition-colors group-hover:text-secondary">
              {item.name}
            </h3>
            {item.tag && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-secondary-container px-2 py-0.5 font-label text-[11px] font-semibold text-on-secondary-container">
                <Icon name="energy_savings_leaf" className="text-[12px]" />
                {item.tag}
              </span>
            )}
          </div>
          <p className="mb-2 line-clamp-2 text-body-md text-on-surface-variant">
            {item.description}
          </p>
          <Co2Tag kg={item.co2Kg} />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-title-md font-bold text-primary">
            {formatCLP(item.price)}
          </span>
          <motion.button
            type="button"
            onClick={onAdd}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1.5 font-label text-label-sm font-semibold text-on-secondary-container transition-colors hover:bg-secondary hover:text-on-secondary"
          >
            <Icon name="add" className="text-[16px]" />
            Agregar
          </motion.button>
          <AnimatePresence>
            {quantity > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex h-6 min-w-6 items-center justify-center rounded-full bg-secondary px-1.5 font-label text-[11px] font-bold text-on-secondary"
              >
                {quantity}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <SmartImage
        src={item.imageUrl}
        alt={item.name}
        rounded="rounded-md"
        className="h-24 w-24 shrink-0 md:h-28 md:w-28"
      />
    </motion.article>
  )
}

function PackagingOption({
  selected,
  onSelect,
  icon,
  title,
  detail,
  highlight = false,
}: {
  selected: boolean
  onSelect: () => void
  icon: string
  title: string
  detail: string
  highlight?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${
        selected
          ? 'border-secondary bg-surface-container-lowest shadow-ambient'
          : 'border-outline-variant/40 hover:bg-surface-container-lowest/60'
      }`}
    >
      {/* Casilla ampliada a 24px, se rellena en verde hoja (DESIGN.md · Selection Controls) */}
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? 'border-secondary bg-secondary' : 'border-outline'
        }`}
      >
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              <Icon name="check" className="text-[15px] text-on-secondary" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-body-md font-semibold text-primary">
          <Icon
            name={icon}
            className={`text-[18px] ${highlight ? 'text-secondary' : 'text-on-surface-variant'}`}
          />
          {title}
        </span>
        <span className="block font-label text-label-sm text-on-surface-variant">
          {detail}
        </span>
      </span>
    </button>
  )
}
