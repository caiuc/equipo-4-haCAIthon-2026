import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppStore'
import { formatCLP, formatFlora, formatKg } from '../lib/format'
import { Icon } from './ui/Icon'
import { SmartImage } from './ui/SmartImage'
import { PillButton } from './ui/Bits'

/** Panel lateral del carrito, con desglose de descuento por envase retornable. */
export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    merchant,
    setQty,
    subtotal,
    deliveryFee,
    discount,
    total,
    floraForOrder,
    co2ForOrder,
    packaging,
    setPackaging,
  } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cartOpen, closeCart])

  const returnable = packaging === 'retornable' && !!merchant?.returnableAvailable

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-primary/35 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label="Tu pedido"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-[420px] flex-col bg-background shadow-ambient-raised"
          >
            <header className="flex items-center justify-between border-b border-outline-variant/30 px-container-margin py-4">
              <div>
                <h2 className="text-headline-mobile font-bold text-primary">Tu pedido</h2>
                {merchant && (
                  <p className="font-label text-label-sm text-on-surface-variant">
                    {merchant.name}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container"
              >
                <Icon name="close" className="text-primary" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-container-margin text-center">
                <span className="pebble flex h-24 w-24 items-center justify-center bg-surface-container">
                  <Icon name="shopping_bag" className="text-4xl text-outline" />
                </span>
                <p className="text-title-md text-primary">Tu carrito está vacío</p>
                <p className="text-body-md text-on-surface-variant">
                  Elige un Eco-Partner y suma Flora con cada envase retornable.
                </p>
                <PillButton
                  onClick={() => {
                    closeCart()
                    navigate('/explorar')
                  }}
                  icon="explore"
                >
                  Explorar restaurantes
                </PillButton>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-container-margin py-4">
                  <ul className="flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => (
                        <motion.li
                          key={line.itemId}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0, marginBottom: -12 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-3 rounded-md bg-surface-container-lowest p-3 shadow-ambient"
                        >
                          <SmartImage
                            src={line.imageUrl}
                            alt={line.name}
                            rounded="rounded"
                            className="h-14 w-14 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-body-md font-semibold text-primary">
                              {line.name}
                            </p>
                            <p className="font-label text-label-sm text-on-surface-variant">
                              {formatCLP(line.price)} · {formatKg(line.co2Kg)} kg CO₂e
                            </p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-surface-container px-1 py-1">
                            <button
                              type="button"
                              aria-label={`Quitar una unidad de ${line.name}`}
                              onClick={() => setQty(line.itemId, line.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-surface-container-high"
                            >
                              <Icon
                                name={line.quantity === 1 ? 'delete' : 'remove'}
                                className="text-[16px] text-primary"
                              />
                            </button>
                            <span className="w-5 text-center text-body-md font-bold text-primary">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Agregar una unidad de ${line.name}`}
                              onClick={() => setQty(line.itemId, line.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-surface-container-high"
                            >
                              <Icon name="add" className="text-[16px] text-primary" />
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {merchant?.returnableAvailable && (
                    <div className="mt-stack-lg rounded-md border border-secondary-fixed-dim bg-[#f2f8f5] p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-title-md font-bold text-primary">
                          <Icon name="package_2" className="text-secondary" />
                          Envase retornable
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={returnable}
                          aria-label="Usar envase retornable"
                          onClick={() =>
                            setPackaging(returnable ? 'compostable' : 'retornable')
                          }
                          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                            returnable ? 'bg-secondary' : 'bg-surface-variant'
                          }`}
                        >
                          <motion.span
                            layout
                            transition={{ type: 'spring', stiffness: 600, damping: 32 }}
                            className={`absolute top-0.5 h-6 w-6 rounded-full bg-surface-container-lowest shadow-sm ${
                              returnable ? 'left-[22px]' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-body-md text-on-surface-variant">
                        Ahorra{' '}
                        <strong className="text-primary">
                          {formatCLP(merchant.returnableDiscount)}
                        </strong>{' '}
                        y gana{' '}
                        <strong className="text-secondary">
                          {formatFlora(merchant.returnableFlora)} Flora
                        </strong>{' '}
                        por unidad al devolverlo.
                      </p>
                    </div>
                  )}
                </div>

                <footer className="border-t border-outline-variant/30 bg-surface-container-lowest px-container-margin py-4">
                  <dl className="mb-3 flex flex-col gap-2">
                    <div className="flex justify-between text-body-md text-on-surface-variant">
                      <dt>Subtotal</dt>
                      <dd>{formatCLP(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-body-md text-on-surface-variant">
                      <dt>Costo de envío</dt>
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
                    <div className="flex justify-between border-t border-outline-variant/30 pt-2 text-title-md font-bold text-primary">
                      <dt>Total</dt>
                      <dd>
                        <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }}>
                          {formatCLP(total)}
                        </motion.span>
                      </dd>
                    </div>
                  </dl>

                  <PillButton
                    className="w-full py-4 text-title-md"
                    onClick={() => {
                      closeCart()
                      navigate('/checkout')
                    }}
                  >
                    Ir a pagar · {formatCLP(total)}
                  </PillButton>

                  {floraForOrder > 0 && (
                    <p className="mt-3 flex items-center justify-center gap-1 font-label text-label-sm text-secondary">
                      <Icon name="eco" fill className="text-[14px]" />
                      Ganarás {formatFlora(floraForOrder)} Flora y evitarás{' '}
                      {formatKg(co2ForOrder)} kg de CO₂
                    </p>
                  )}
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
