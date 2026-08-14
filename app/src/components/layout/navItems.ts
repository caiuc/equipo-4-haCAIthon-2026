export interface NavItem {
  to: string
  label: string
  icon: string
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/explorar', label: 'Explorar', icon: 'explore' },
  { to: '/devoluciones', label: 'Devolver', icon: 'recycling' },
  { to: '/ranking', label: 'Ranking', icon: 'leaderboard' },
  { to: '/perfil', label: 'Perfil', icon: 'person' },
]
