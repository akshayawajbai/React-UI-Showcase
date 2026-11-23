import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items = [], allowMultiple = false, defaultOpenFirst = true }) {
  const [openIds, setOpenIds] = useState(() => {
    if (defaultOpenFirst && items[0]?.id) return new Set([items[0].id])
    return new Set()
  })

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="acme-accordion">
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id} className="acme-accordion__item">
            <button
              type="button"
              className={`acme-accordion__trigger ${isOpen ? 'is-open' : ''}`}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              {item.title}
              <ChevronDown
                size={16}
                style={{
                  transition: 'transform 250ms ease',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  flexShrink: 0,
                }}
              />
            </button>
            <div className={`acme-accordion__panel ${isOpen ? 'is-open' : ''}`}>{item.content}</div>
          </div>
        )
      })}
    </div>
  )
}
