import {
  AlignLeft,
  BadgeCheck,
  BellRing,
  Component,
  FormInput,
  LayoutDashboard,
  LayoutGrid,
  Loader2,
  MousePointerClick,
  Navigation,
  SquareStack,
  Table2,
  Type,
} from 'lucide-react'
import { NAV_ITEMS } from '../../data/sampleData'

const ICONS = {
  overview: LayoutDashboard,
  typography: Type,
  buttons: MousePointerClick,
  cards: SquareStack,
  forms: FormInput,
  tables: Table2,
  navigation: Navigation,
  badges: BadgeCheck,
  toasts: BellRing,
  loading: Loader2,
  modals: LayoutGrid,
  other: Component,
}

export function Sidebar({ activeId, onNavigate, mobileOpen, onClose }) {
  const handleClick = (id) => {
    onNavigate?.(id)
    onClose?.()
  }

  const content = (
    <nav className="acme-sidebar__nav" aria-label="Showcase sections">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.id] || AlignLeft
        return (
          <button
            key={item.id}
            type="button"
            className={`acme-sidebar__link ${activeId === item.id ? 'is-active' : ''}`}
            onClick={() => handleClick(item.id)}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            <Icon size={16} />
            {item.label}
          </button>
        )
      })}
    </nav>
  )

  return (
    <>
      <aside className="acme-sidebar acme-sidebar--desktop" aria-label="Desktop sidebar">
        {content}
      </aside>

      {mobileOpen && <div className="acme-sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`acme-sidebar acme-sidebar--mobile ${mobileOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation drawer"
        aria-hidden={!mobileOpen}
      >
        {content}
      </aside>
    </>
  )
}
