import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { AppProvider } from './store/AppStore'
import { TopAppBar } from './components/layout/TopAppBar'
import { BottomNav } from './components/layout/BottomNav'
import { CartDrawer } from './components/CartDrawer'
import { ScannerModal } from './components/ScannerModal'
import { ToastStack } from './components/ToastStack'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { RestaurantDetail } from './pages/RestaurantDetail'
import { Returns } from './pages/Returns'
import { Leaderboard } from './pages/Leaderboard'
import { Profile } from './pages/Profile'
import { Checkout } from './pages/Checkout'
import { OrderConfirmed } from './pages/OrderConfirmed'

/** Vuelve arriba al cambiar de ruta. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/** Transición de entrada/salida compartida por todas las páginas. */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/explorar" element={<Page><Explore /></Page>} />
        <Route path="/restaurante/:slug" element={<Page><RestaurantDetail /></Page>} />
        <Route path="/devoluciones" element={<Page><Returns /></Page>} />
        <Route path="/ranking" element={<Page><Leaderboard /></Page>} />
        <Route path="/perfil" element={<Page><Profile /></Page>} />
        <Route path="/checkout" element={<Page><Checkout /></Page>} />
        <Route path="/pedido-confirmado" element={<Page><OrderConfirmed /></Page>} />
        <Route path="*" element={<Page><Home /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <TopAppBar />
        <main className="flex-1 pb-[96px] lg:pb-stack-lg">
          <AnimatedRoutes />
        </main>
        <BottomNav />
      </div>
      <CartDrawer />
      <ScannerModal />
      <ToastStack />
    </AppProvider>
  )
}
