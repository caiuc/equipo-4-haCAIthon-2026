import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Entrada suave al aparecer en pantalla. Curva orgánica del sistema de diseño. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  as = 'div',
}: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/** Contenedor que escalona la entrada de sus hijos directos. */
export function Stagger({
  children,
  className = '',
  step = 0.07,
}: {
  children: ReactNode
  className?: string
  step?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  )
}
