import { useState } from 'react'
import { Icon } from './Icon'

interface SmartImageProps {
  src?: string
  alt: string
  className?: string
  /** Icono mostrado si la foto no carga (modo sin conexión, por ejemplo). */
  fallbackIcon?: string
  rounded?: string
}

/**
 * Imagen con carga progresiva: muestra un degradado "shimmer" mientras baja
 * y cae a un marcador orgánico si la URL remota falla.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  fallbackIcon = 'restaurant',
  rounded = '',
}: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    src ? 'loading' : 'error',
  )

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-secondary-container/70 via-surface-container to-primary-fixed/60 ${rounded} ${className}`}
      >
        <Icon name={fallbackIcon} className="text-3xl text-secondary/70" fill />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {status === 'loading' && (
        <div
          className="absolute inset-0 animate-shimmer bg-[length:200%_100%]"
          style={{
            backgroundImage:
              'linear-gradient(100deg, var(--color-surface-container) 30%, var(--color-surface-container-low) 50%, var(--color-surface-container) 70%)',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          status === 'ready' ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-sm'
        }`}
      />
    </div>
  )
}
