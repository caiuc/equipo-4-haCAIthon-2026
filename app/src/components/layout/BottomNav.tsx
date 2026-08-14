import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { navItems } from './navItems'
import { Icon } from '../ui/Icon'
import { useApp } from '../../store/AppStore'

/** Barra de navegación inferior (solo móvil), con píldora activa animada. */
export function BottomNav() {
  const { containers } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full rounded-t-xl border-t border-outline-variant/20 bg-surface-container-lowest/95 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 shadow-[0px_-4px_20px_rgba(17,108,74,0.06)] backdrop-blur-xl lg:hidden">
      <ul className="flex items-center justify-around px-2">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              className="relative flex flex-col items-center gap-1 py-1 text-center"
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex h-8 w-14 items-center justify-center">
                    {isActive && (
                      <motion.span
                        layoutId="bottom-nav-pill"
                        className="absolute inset-0 rounded-full bg-secondary-container"
                        transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                      />
                    )}
                    <motion.span
                      animate={isActive ? { scale: 1.06, y: -1 } : { scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                      className="relative"
                    >
                      <Icon
                        name={item.icon}
                        fill={isActive}
                        className={`text-[22px] ${
                          isActive ? 'text-secondary' : 'text-on-surface-variant'
                        }`}
                      />
                      {item.to === '/devoluciones' && containers.length > 0 && (
                        <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 font-label text-[9px] font-bold text-on-secondary">
                          {containers.length}
                        </span>
                      )}
                    </motion.span>
                  </span>
                  <span
                    className={`font-label text-[11px] leading-none ${
                      isActive ? 'font-bold text-secondary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
