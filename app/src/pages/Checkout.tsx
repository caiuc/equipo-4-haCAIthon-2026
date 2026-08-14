import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../store/AppStore'
import { currentUser } from '../data/mock'
import { formatCLP, formatFlora, formatKg } from '../lib/format'
import { Icon } from '../components/ui/Icon'
import { SmartImage } from '../components/ui/SmartImage'
import { Chip, PillButton } from '../components/ui/Bits'
import { Reveal } from '../components/ui/Reveal'

/** Checkout con desglose del descuento por envase retornable. */
export function Checkout() {
  const navigate = useNavigate()
  const {
    lines,
    merchant,
    subtotal,
    deliveryFee,
    discount,
    total,
    floraForOrder,
    co2ForOrder,
    packaging,
    setPackaging,
    placeOrder,
  } = useApp()
  const [method, setMethod] = useState<'tarjeta' | 'flora'>('tarjeta')
  const [processing, setProcessing] = useState(false)

  // Mientras se confirma, esta pantalla deja de depender del carrito: `placeOrder`
  // lo vacía y la salida animada mantiene el componente montado un instante más.
  if (processing) return <ProcessingView />

  if (!lines.length || !merchant) return <Navigate to="/explorar" replace />

  const usesReturnable = packaging === 'retornable' && merchant.returnableAvailable
  const floraPayment = Math.min(currentUser.flora, Math.floor(total / 10))

  const confirm = () => {
    const resumen = {
      flora: floraForOrder,
      co2: co2ForOrder,
      merchant: merchant.name,
    }
    setProcessing(true)
    window.setTimeout(() => {
      navigate('/pedido-confirmado', { state: resumen })
      placeOrder()
    }, 1400)
  }

  return (
    <div className="grid gap-gutter py-stack-lg md:grid-cols-12 page">
      <div className="flex min-w-0 flex-col gap-stack-lg md:col-span-7">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Volver"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest shadow-ambient"
          >
            <Icon name="arrow_back" className="text-primary" />
          </button>
          <h1 className="text-headline-mobile font-bold text-primary md:text-headline-lg">
            Confirmar pedido
          </h1>
        </header>

        {/* Entrega */}
        <Reveal
          as="section"
          className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient"
        >
          <h2 className="mb-3 flex items-center gap-2 text-title-md font-bold text-primary">
            <Icon name="location_on" fill className="text-secondary" />
            Dirección de entrega
          </h2>
          <p className="text-body-md text-on-surface-variant">{currentUser.address}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip icon="schedule">
              Llega en {merchant.deliveryTimeMin}–{merchant.deliveryTimeMax} min
            </Chip>
            <Chip icon="pedal_bike" tone="mint">
              Reparto en bicicleta eléctrica
            </Chip>
          </div>
        </Reveal>

        {/* Envase */}
        <Reveal
          as="section"
          className="rounded-xl border border-secondary-fixed-dim bg-[#f2f8f5] p-5 shadow-ambient"
        >
          <h2 className="mb-3 flex items-center gap-2 text-title-md font-bold text-primary">
            <Icon name="package_2" className="text-secondary" />
            Envase
          </h2>
          {merchant.returnableAvailable ? (
            <div className="flex items-center justify-between gap-4">
              <p className="text-body-md text-on-surface-variant">
                {usesReturnable
                  ? `Retornable · ahorras ${formatCLP(merchant.returnableDiscount)} y ganas ${formatFlora(floraForOrder)} Flora`
                  : 'Compostable estándar · sin descuento'}
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={usesReturnable}
                aria-label="Usar envase retornable"
                onClick={() => setPackaging(usesReturnable ? 'compostable' : 'retornable')}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  usesReturnable ? 'bg-secondary' : 'bg-surface-variant'
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 600, damping: 32 }}
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-surface-container-lowest shadow-sm ${
                    usesReturnable ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ) : (
            <p className="text-body-md text-on-surface-variant">
              Este comercio entrega en envase compostable.
            </p>
          )}
        </Reveal>

        {/* Pago */}
        <Reveal
          as="section"
          className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient"
        >
          <h2 className="mb-3 flex items-center gap-2 text-title-md font-bold text-primary">
            <Icon name="credit_card" className="text-secondary" />
            Medio de pago
          </h2>
          <div className="flex flex-col gap-2">
            <PaymentOption
              selected={method === 'tarjeta'}
              onSelect={() => setMethod('tarjeta')}
              icon="credit_card"
              title="Tarjeta terminada en 4821"
              detail="Débito · Banco demo"
            />
            <PaymentOption
              selected={method === 'flora'}
              onSelect={() => setMethod('flora')}
              icon="eco"
              title={`Usar ${formatFlora(floraPayment)} Flora`}
              detail={`Cubre ${formatCLP(floraPayment * 10)} del total`}
            />
          </div>
        </Reveal>
      </div>

      {/* Resumen */}
      <div className="min-w-0 md:col-span-5">
        <Reveal
          as="section"
          className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-ambient md:sticky md:top-28"
        >
          <div className="flex items-center gap-3 border-b border-surface-variant pb-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
              <SmartImage
                src={merchant.imageUrl}
                alt={merchant.name}
                className="h-full w-full"
              />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-title-md font-bold text-primary">
                {merchant.name}
              </h2>
              <p className="font-label text-label-sm text-on-surface-variant">
                {lines.reduce((s, l) => s + l.quantity, 0)} productos
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {lines.map((line) => (
              <li key={line.itemId} className="flex justify-between gap-3 text-body-md">
                <span className="min-w-0 truncate text-on-surface-variant">
                  {line.quantity}× {line.name}
                </span>
                <span className="shrink-0 text-primary">
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
              <dd>{formatCLP(deliveryFee)}</dd>
            </div>
            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between overflow-hidden text-body-md font-bold text-secondary"
                >
                  <dt className="flex items-center gap-1">
                    <Icon name="eco" fill className="text-[16px]" />
                    Descuento sustentable
                  </dt>
                  <dd>−{formatCLP(discount)}</dd>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-between border-t border-surface-variant pt-3 text-title-md font-bold text-primary">
              <dt>Total</dt>
              <dd>{formatCLP(total)}</dd>
            </div>
          </dl>

          <div className="rounded-md bg-secondary-container/50 p-3">
            <p className="flex items-center gap-2 font-label text-label-sm text-on-secondary-container">
              <Icon name="park" fill className="text-[16px]" />
              Este pedido evita {formatKg(co2ForOrder)} kg de CO₂
              {floraForOrder > 0 && ` y te da ${formatFlora(floraForOrder)} Flora`}
            </p>
          </div>

          <PillButton
            className="w-full py-4 text-title-md"
            onClick={confirm}
            disabled={processing}
            icon={processing ? undefined : 'lock'}
          >
            {processing ? 'Procesando…' : `Pagar ${formatCLP(total)}`}
          </PillButton>

          <p className="text-center font-label text-[11px] text-on-surface-variant">
            Demostración de concepto · no se realiza ningún cobro real.
          </p>
        </Reveal>
      </div>
    </div>
  )
}

/** Estado intermedio mientras se confirma el pago. */
function ProcessingView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center page">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface-container border-t-secondary"
      />
      <p className="text-title-md font-bold text-primary">Confirmando tu pedido…</p>
      <p className="text-body-md text-on-surface-variant">
        Reservando tu envase retornable.
      </p>
    </div>
  )
}

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  detail,
}: {
  selected: boolean
  onSelect: () => void
  icon: string
  title: string
  detail: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${
        selected
          ? 'border-secondary bg-secondary-container/30'
          : 'border-outline-variant/40 hover:bg-surface-container-low'
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-secondary bg-secondary' : 'border-outline'
        }`}
      >
        {selected && <Icon name="check" className="text-[15px] text-on-secondary" />}
      </span>
      <Icon name={icon} className="shrink-0 text-secondary" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body-md font-semibold text-primary">
          {title}
        </span>
        <span className="block truncate font-label text-label-sm text-on-surface-variant">
          {detail}
        </span>
      </span>
    </button>
  )
}
