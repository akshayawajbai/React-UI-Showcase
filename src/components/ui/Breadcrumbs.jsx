import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="acme-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {isLast || !item.href ? (
              <span className="acme-breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.href} onClick={(e) => item.onClick?.(e)}>
                {item.label}
              </a>
            )}
          </span>
        )
      })}
    </nav>
  )
}
