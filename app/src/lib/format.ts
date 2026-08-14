const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

const decimal = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const integer = new Intl.NumberFormat('es-CL')

/** Precio en pesos chilenos: 8900 → "$8.900" */
export const formatCLP = (value: number) => clp.format(value)

/** Cantidad de Flora: 1250 → "1.250" */
export const formatFlora = (value: number) => integer.format(value)

/** Kilos de CO₂ con un decimal: 22.4 → "22,4" */
export const formatKg = (value: number) => decimal.format(value)

/** Porcentaje desde una razón: 0.94 → "94%" */
export const formatPercent = (ratio: number) => `${Math.round(ratio * 100)}%`

/** Distancia: 0.3 → "0,3 km"; 0 → "En tu puerta" */
export const formatDistance = (km: number) =>
  km === 0 ? 'En tu puerta' : `${decimal.format(km)} km`

/** Umbral oficial de Eco-Partner: más de 30% de ventas sustentables. */
export const ECO_PARTNER_THRESHOLD = 0.3

export const isEcoPartner = (ratio: number) => ratio > ECO_PARTNER_THRESHOLD
