import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { navItems } from './navItems'
import { FloraBadge } from './FloraBadge'
import { Icon } from '../ui/Icon'
import { useApp } from '../../store/AppStore'
import { currentUser } from '../../data/mock'
import { SmartImage } from '../ui/SmartImage'

/** Barra superior: selector de dirección + saldo de Flora (móvil) y navegación (escritorio). */
export function TopAppBar() {
  const { itemCount, openCart } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/25 bg-background/85 backdrop-blur-xl">
      {/* Móvil */}
      <div className="flex items-center justify-between gap-3 px-container-margin py-3 lg:hidden">
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-lg p-1 text-left transition-colors hover:bg-surface-container-low"
        >
          <Icon name="location_on" fill className="shrink-0 text-[22px] text-primary" />
          <span className="flex min-w-0 flex-col">
            <span className="font-label text-[11px] leading-none text-on-surface-variant">
              Entregar en
            </span>
            <span className="flex items-center gap-1">
              <span className="truncate text-body-md font-bold text-primary">
                {currentUser.address}
              </span>
              <Icon name="expand_more" className="shrink-0 text-[16px] text-primary" />
            </span>
          </span>
        </button>
        <FloraBadge onClick={() => navigate('/devoluciones')} />
      </div>

      {/* Escritorio */}
      <div className="hidden items-center justify-between gap-8 py-3 lg:flex page">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <motion.span
            whileHover={{ rotate: -12, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"
          >
            <Icon name="eco" fill className="text-[22px] text-secondary-fixed" />
          </motion.span>
          <span className="flex flex-col leading-none">
            <span className="text-title-md font-extrabold tracking-tight text-primary">
              RIU
            </span>
            <span className="font-label text-[10px] text-on-surface-variant">
              Buena comida. Mejor planeta.
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-body-md font-semibold transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary-container"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <FloraBadge onClick={() => navigate('/devoluciones')} />
          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-lowest shadow-ambient transition-shadow hover:shadow-ambient-raised"
          >
            <Icon name="shopping_bag" className="text-[22px] text-primary" />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 font-label text-[10px] font-bold text-on-secondary"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
          <Link
            to="/perfil"
            aria-label="Ver perfil"
            className="h-11 w-11 overflow-hidden rounded-full border-2 border-secondary-fixed-dim transition-transform hover:scale-105"
          >
            <SmartImage
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              fallbackIcon="person"
              className="h-full w-full"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
