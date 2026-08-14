import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useApp } from '../store/AppStore'
import { formatFlora } from '../lib/format'
import { Icon } from './ui/Icon'
import { PillButton } from './ui/Bits'

type Phase = 'idle' | 'scanning' | 'done'

/**
 * Escáner de QR simulado. En la demo no accede a la cámara: reproduce el
 * flujo real (enfocar → leer código → acreditar Flora) con datos ficticios.
 */
export function ScannerModal() {
  const { scannerOpen, closeScanner, containers, returnContainer } = useApp()
  const [phase, setPhase] = useState<Phase>('idle')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (!scannerOpen) {
      setPhase('idle')
      setSelected(null)
      return
    }
    setSelected(containers[0]?.qrCodeId ?? null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeScanner()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [scannerOpen, closeScanner, containers])

  const container = containers.find((c) => c.qrCodeId === selected)

  const startScan = () => {
    if (!container) return
    setPhase('scanning')
    window.setTimeout(() => setPhase('done'), 1900)
  }

  const confirm = () => {
    if (container) returnContainer(container.qrCodeId)
    closeScanner()
  }

  return (
    <AnimatePresence>
      {scannerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-primary/50 backdrop-blur-sm sm:items-center"
          onClick={closeScanner}
        >
          <motion.div
            role="dialog"
            aria-label="Escanear envase"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="w-full min-w-0 max-w-md rounded-t-xl bg-background p-container-margin shadow-ambient-raised sm:rounded-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-headline-mobile font-bold text-primary">
                  Escanear envase
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Apunta al código QR del envase para registrar tu devolución.
                </p>
              </div>
              <button
                type="button"
                onClick={closeScanner}
                aria-label="Cerrar escáner"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-container"
              >
                <Icon name="close" className="text-primary" />
              </button>
            </div>

            {/* Visor */}
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-tertiary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(161,244,200,0.18),transparent_65%)]" />

              {/* Esquinas del encuadre */}
              {[
                'left-6 top-6 border-l-4 border-t-4 rounded-tl-lg',
                'right-6 top-6 border-r-4 border-t-4 rounded-tr-lg',
                'left-6 bottom-6 border-b-4 border-l-4 rounded-bl-lg',
                'right-6 bottom-6 border-b-4 border-r-4 rounded-br-lg',
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute h-12 w-12 border-secondary-fixed-dim ${pos}`}
                />
              ))}

              <AnimatePresence mode="wait">
                {phase === 'done' ? (
                  <motion.div
                    key="ok"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-secondary-fixed-dim" />
                      <Icon name="check" className="relative text-4xl text-on-secondary" />
                    </span>
                    <p className="text-title-md font-bold text-inverse-on-surface">
                      Envase verificado
                    </p>
                    <p className="font-label text-label-sm text-secondary-fixed-dim">
                      {container?.qrCodeId}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="scan"
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Icon
                      name="qr_code_2"
                      className="text-[120px] text-secondary-fixed-dim/25"
                    />
                    {phase === 'scanning' && (
                      <motion.span
                        initial={{ top: '12%' }}
                        animate={{ top: ['12%', '85%', '12%'] }}
                        transition={{ duration: 1.9, ease: 'easeInOut' }}
                        className="absolute left-6 right-6 h-0.5 bg-secondary-fixed-dim shadow-[0_0_18px_4px_rgba(134,215,173,0.7)]"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {containers.length === 0 ? (
              <p className="rounded-md bg-surface-container p-4 text-center text-body-md text-on-surface-variant">
                No tienes envases pendientes de devolución. ¡Todo en orden!
              </p>
            ) : (
              <>
                {phase !== 'done' && (
                  <ul className="mb-4 flex flex-col gap-2">
                    {containers.map((c) => (
                      <li key={c.qrCodeId}>
                        <button
                          type="button"
                          onClick={() => setSelected(c.qrCodeId)}
                          className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                            selected === c.qrCodeId
                              ? 'border-secondary bg-secondary-container/40'
                              : 'border-outline-variant/40 hover:bg-surface-container-low'
                          }`}
                        >
                          <Icon
                            name={
                              selected === c.qrCodeId
                                ? 'radio_button_checked'
                                : 'radio_button_unchecked'
                            }
                            className={
                              selected === c.qrCodeId ? 'text-secondary' : 'text-outline'
                            }
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-body-md font-semibold text-primary">
                              {c.type} · {c.merchantName}
                            </span>
                            <span className="block font-label text-label-sm text-on-surface-variant">
                              {c.qrCodeId}
                            </span>
                          </span>
                          <span className="shrink-0 font-label text-label-sm font-bold text-secondary">
                            +{formatFlora(c.floraReward)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {phase === 'done' ? (
                  <PillButton
                    variant="leaf"
                    icon="eco"
                    className="w-full py-4 text-title-md"
                    onClick={confirm}
                  >
                    Recibir {formatFlora(container?.floraReward ?? 0)} Flora
                  </PillButton>
                ) : (
                  <PillButton
                    className="w-full py-4 text-title-md"
                    icon="qr_code_scanner"
                    disabled={phase === 'scanning' || !container}
                    onClick={startScan}
                  >
                    {phase === 'scanning' ? 'Escaneando…' : 'Escanear código QR'}
                  </PillButton>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
