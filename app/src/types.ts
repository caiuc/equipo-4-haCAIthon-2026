/**
 * Modelos de dominio de GreenLoop.
 * Basados en los blueprints de ARCHITECTURE.md (§4), adaptados al frontend:
 * los "Green Points" se llaman **Flora** y los montos van en pesos chilenos.
 */

export type PackagingChoice = 'retornable' | 'compostable'

export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  unlocked: boolean
  unlockedAt?: string
}

export interface UserProfile {
  id: string
  name: string
  handle: string
  avatarUrl: string
  address: string
  flora: number
  totalCo2SavedKg: number
  currentStreakDays: number
  containersInCirculation: number
  returnedContainersCount: number
  wasteAvoidedItems: number
  tier: string
  nextTier: string
  floraToNextTier: number
  badges: Badge[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  co2Kg: number
  imageUrl?: string
  tag?: string
  category: string
  returnableAvailable: boolean
}

export interface Merchant {
  id: string
  slug: string
  name: string
  tagline: string
  category: string
  priceLevel: string
  imageUrl: string
  rating: number
  reviews: number
  deliveryTimeMin: number
  deliveryTimeMax: number
  distanceKm: number
  deliveryFee: number
  /** Proporción de ventas con packaging sustentable. > 0.30 ⇒ Eco-Partner. */
  sustainableSalesRatio: number
  packagingTag: string
  packagingIcon: string
  returnableAvailable: boolean
  returnableDiscount: number
  returnableFlora: number
  categories: string[]
  menu: MenuItem[]
}

export interface CartLine {
  itemId: string
  merchantId: string
  name: string
  price: number
  co2Kg: number
  quantity: number
  imageUrl?: string
}

export interface ActiveContainer {
  qrCodeId: string
  type: 'Bowl mediano' | 'Bowl grande' | 'Vaso térmico' | 'Bento'
  merchantName: string
  takenAt: string
  dueInDays: number
  floraReward: number
}

export interface DropOffSite {
  id: string
  name: string
  type: 'campus' | 'tienda' | 'repartidor'
  address: string
  hours: string
  distanceKm: number
  activeBins: number
  capacityUsed: number
}

export interface Reward {
  id: string
  name: string
  description: string
  cost: number
  icon: string
  accent: 'mint' | 'gold' | 'sage'
}

export interface LeaderboardEntry {
  id: string
  name: string
  avatarUrl: string
  co2Kg: number
  streakDays: number
  badge?: string
  isCurrentUser?: boolean
}

export interface MerchantRanking {
  id: string
  name: string
  logoUrl: string
  returnableRatio: number
  containersReturned: number
}

export interface FloraMovement {
  id: string
  label: string
  detail: string
  amount: number
  icon: string
  date: string
}
