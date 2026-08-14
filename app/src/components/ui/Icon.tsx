interface IconProps {
  name: string
  /** Usa la variante rellena de Material Symbols. */
  fill?: boolean
  className?: string
  style?: React.CSSProperties
}

/** Material Symbols Outlined, cargado por fuente desde index.html. */
export function Icon({ name, fill = false, className = '', style }: IconProps) {
  return (
    <span
      aria-hidden="true"
      data-fill={fill ? '1' : '0'}
      className={`material-symbols-outlined ${className}`}
      style={style}
    >
      {name}
    </span>
  )
}
