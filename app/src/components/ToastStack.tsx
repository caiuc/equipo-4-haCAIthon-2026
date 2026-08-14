import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../store/AppStore'
import { formatFlora } from '../lib/format'
import { Icon } from './ui/Icon'

/** Notificaciones flotantes: confirmaciones de carrito, Flora y canjes. */
export function ToastStack() {
  const { toasts, dismissToast } = useApp()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-container-margin md:bottom-8"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            layout
            type="button"
            onClick={() => dismissToast(toast.id)}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-full bg-inverse-surface py-2.5 pl-3 pr-4 text-left shadow-ambient-raised"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-fixed">
              <Icon name={toast.icon} fill className="text-[18px] text-on-secondary-fixed" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-body-md font-semibold text-inverse-on-surface">
                {toast.title}
              </span>
              {toast.detail && (
                <span className="block truncate font-label text-label-sm text-inverse-on-surface/70">
                  {toast.detail}
                </span>
              )}
            </span>
            {toast.flora !== undefined && (
              <span
                className={`shrink-0 font-label text-label-sm font-bold ${
                  toast.flora >= 0 ? 'text-secondary-fixed-dim' : 'text-error-container'
                }`}
              >
                {toast.flora > 0 ? '+' : ''}
                {formatFlora(toast.flora)} Flora
              </span>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
