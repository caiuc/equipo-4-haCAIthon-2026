import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import {
  activeContainers as seedContainers,
  currentUser,
  floraHistory as seedHistory,
  merchants,
} from '../data/mock'
import type {
  ActiveContainer,
  CartLine,
  FloraMovement,
  MenuItem,
  Merchant,
  PackagingChoice,
} from '../types'

/* ── Estado ─────────────────────────────────────────────────────────────── */

interface State {
  flora: number
  co2SavedKg: number
  streakDays: number
  lines: CartLine[]
  merchantId: string | null
  packaging: PackagingChoice
  favorites: string[]
  containers: ActiveContainer[]
  returnedCount: number
  history: FloraMovement[]
  redeemed: string[]
}

const initialState: State = {
  flora: currentUser.flora,
  co2SavedKg: currentUser.totalCo2SavedKg,
  streakDays: currentUser.currentStreakDays,
  lines: [],
  merchantId: null,
  packaging: 'retornable',
  favorites: ['m-green-bowl'],
  containers: seedContainers,
  returnedCount: currentUser.returnedContainersCount,
  history: seedHistory,
  redeemed: [],
}

type Action =
  | { type: 'add'; merchant: Merchant; item: MenuItem }
  | { type: 'setQty'; itemId: string; quantity: number }
  | { type: 'clearCart' }
  | { type: 'setPackaging'; packaging: PackagingChoice }
  | { type: 'toggleFavorite'; merchantId: string }
  | { type: 'placeOrder'; flora: number; co2Kg: number; container?: ActiveContainer }
  | { type: 'returnContainer'; qrCodeId: string }
  | { type: 'redeem'; rewardId: string; name: string; cost: number }

const movement = (
  label: string,
  detail: string,
  amount: number,
  icon: string,
): FloraMovement => ({
  id: `f-${Math.random().toString(36).slice(2, 9)}`,
  label,
  detail,
  amount,
  icon,
  date: 'Recién',
})

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      // Un pedido pertenece a un solo comercio: cambiar de local reinicia el carrito.
      const sameMerchant = state.merchantId === action.merchant.id
      const lines = sameMerchant ? state.lines : []
      const existing = lines.find((l) => l.itemId === action.item.id)
      const nextLines = existing
        ? lines.map((l) =>
            l.itemId === action.item.id ? { ...l, quantity: l.quantity + 1 } : l,
          )
        : [
            ...lines,
            {
              itemId: action.item.id,
              merchantId: action.merchant.id,
              name: action.item.name,
              price: action.item.price,
              co2Kg: action.item.co2Kg,
              quantity: 1,
              imageUrl: action.item.imageUrl,
            },
          ]
      return { ...state, merchantId: action.merchant.id, lines: nextLines }
    }

    case 'setQty': {
      const nextLines = state.lines
        .map((l) => (l.itemId === action.itemId ? { ...l, quantity: action.quantity } : l))
        .filter((l) => l.quantity > 0)
      return {
        ...state,
        lines: nextLines,
        merchantId: nextLines.length ? state.merchantId : null,
      }
    }

    case 'clearCart':
      return { ...state, lines: [], merchantId: null }

    case 'setPackaging':
      return { ...state, packaging: action.packaging }

    case 'toggleFavorite':
      return {
        ...state,
        favorites: state.favorites.includes(action.merchantId)
          ? state.favorites.filter((id) => id !== action.merchantId)
          : [...state.favorites, action.merchantId],
      }

    case 'placeOrder':
      return {
        ...state,
        lines: [],
        merchantId: null,
        flora: state.flora + action.flora,
        co2SavedKg: Math.round((state.co2SavedKg + action.co2Kg) * 10) / 10,
        containers: action.container
          ? [action.container, ...state.containers]
          : state.containers,
        history: action.flora
          ? [
              movement(
                'Pedido con envase retornable',
                'Ganaste Flora al elegir envase retornable',
                action.flora,
                'shopping_bag',
              ),
              ...state.history,
            ]
          : state.history,
      }

    case 'returnContainer': {
      const container = state.containers.find((c) => c.qrCodeId === action.qrCodeId)
      if (!container) return state
      return {
        ...state,
        containers: state.containers.filter((c) => c.qrCodeId !== action.qrCodeId),
        flora: state.flora + container.floraReward,
        returnedCount: state.returnedCount + 1,
        co2SavedKg: Math.round((state.co2SavedKg + 0.3) * 10) / 10,
        history: [
          movement(
            'Envase devuelto',
            `${container.merchantName} · ${container.type}`,
            container.floraReward,
            'recycling',
          ),
          ...state.history,
        ],
      }
    }

    case 'redeem':
      if (state.flora < action.cost) return state
      return {
        ...state,
        flora: state.flora - action.cost,
        redeemed: [...state.redeemed, action.rewardId],
        history: [
          movement('Canje de recompensa', action.name, -action.cost, 'redeem'),
          ...state.history,
        ],
      }

    default:
      return state
  }
}

/* ── Contexto ───────────────────────────────────────────────────────────── */

export interface Toast {
  id: number
  title: string
  detail?: string
  flora?: number
  icon: string
}

interface AppContextValue extends State {
  merchant: Merchant | null
  itemCount: number
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  co2ForOrder: number
  floraForOrder: number
  toasts: Toast[]
  cartOpen: boolean
  scannerOpen: boolean
  addItem: (merchant: Merchant, item: MenuItem) => void
  setQty: (itemId: string, quantity: number) => void
  clearCart: () => void
  setPackaging: (packaging: PackagingChoice) => void
  toggleFavorite: (merchantId: string) => void
  placeOrder: () => void
  returnContainer: (qrCodeId: string) => void
  redeem: (rewardId: string, name: string, cost: number) => boolean
  openCart: () => void
  closeCart: () => void
  openScanner: () => void
  closeScanner: () => void
  pushToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [scannerOpen, setScannerOpen] = useState(false)

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random()
      // Como máximo dos avisos a la vez: más que eso tapa el contenido.
      setToasts((prev) => [...prev, { ...toast, id }].slice(-2))
      window.setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const merchant = useMemo(
    () => merchants.find((m) => m.id === state.merchantId) ?? null,
    [state.merchantId],
  )

  const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0)
  const subtotal = state.lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
  const deliveryFee = state.lines.length ? (merchant?.deliveryFee ?? 1490) : 0

  const usesReturnable = state.packaging === 'retornable' && !!merchant?.returnableAvailable
  const discount = usesReturnable && state.lines.length ? (merchant?.returnableDiscount ?? 0) : 0
  const total = Math.max(0, subtotal + deliveryFee - discount)

  // Cada envase retornable evita ~0,3 kg de CO₂ frente a uno de un solo uso.
  const co2ForOrder =
    Math.round(
      (state.lines.reduce((sum, l) => sum + l.co2Kg * l.quantity, 0) * 0.25 +
        (usesReturnable ? 0.3 * itemCount : 0)) *
        10,
    ) / 10
  const floraForOrder = usesReturnable ? (merchant?.returnableFlora ?? 0) * itemCount : 0

  const addItem = useCallback(
    (m: Merchant, item: MenuItem) => {
      dispatch({ type: 'add', merchant: m, item })
      pushToast({ title: `${item.name} agregado`, detail: m.name, icon: 'add_shopping_cart' })
    },
    [pushToast],
  )

  const placeOrder = useCallback(() => {
    if (!state.lines.length || !merchant) return
    const container: ActiveContainer | undefined = usesReturnable
      ? {
          qrCodeId: `GL-${Math.floor(1000 + Math.random() * 8999)}-BOWL`,
          type: 'Bowl mediano',
          merchantName: merchant.name,
          takenAt: 'Hoy',
          dueInDays: 5,
          floraReward: merchant.returnableFlora,
        }
      : undefined
    dispatch({ type: 'placeOrder', flora: floraForOrder, co2Kg: co2ForOrder, container })
  }, [co2ForOrder, floraForOrder, merchant, state.lines.length, usesReturnable])

  const returnContainer = useCallback(
    (qrCodeId: string) => {
      const container = state.containers.find((c) => c.qrCodeId === qrCodeId)
      dispatch({ type: 'returnContainer', qrCodeId })
      if (container) {
        pushToast({
          title: '¡Envase devuelto!',
          detail: `${container.merchantName} · ${container.type}`,
          flora: container.floraReward,
          icon: 'recycling',
        })
      }
    },
    [pushToast, state.containers],
  )

  const redeem = useCallback(
    (rewardId: string, name: string, cost: number) => {
      if (state.flora < cost) {
        pushToast({ title: 'Flora insuficiente', detail: name, icon: 'lock' })
        return false
      }
      dispatch({ type: 'redeem', rewardId, name, cost })
      pushToast({ title: '¡Recompensa canjeada!', detail: name, flora: -cost, icon: 'redeem' })
      return true
    },
    [pushToast, state.flora],
  )

  const value: AppContextValue = {
    ...state,
    merchant,
    itemCount,
    subtotal,
    deliveryFee,
    discount,
    total,
    co2ForOrder,
    floraForOrder,
    toasts,
    cartOpen,
    scannerOpen,
    addItem,
    setQty: (itemId, quantity) => dispatch({ type: 'setQty', itemId, quantity }),
    clearCart: () => dispatch({ type: 'clearCart' }),
    setPackaging: (packaging) => dispatch({ type: 'setPackaging', packaging }),
    toggleFavorite: (merchantId) => dispatch({ type: 'toggleFavorite', merchantId }),
    placeOrder,
    returnContainer,
    redeem,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openScanner: () => setScannerOpen(true),
    closeScanner: () => setScannerOpen(false),
    pushToast,
    dismissToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}
