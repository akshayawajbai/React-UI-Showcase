import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'

function normalizeOptions(options = []) {
  const flat = []
  options.forEach((opt) => {
    if (opt?.options) {
      opt.options.forEach((child) => {
        flat.push({
          value: child.value ?? child,
          label: child.label ?? child,
          icon: child.icon,
          group: opt.label,
        })
      })
    } else if (typeof opt === 'string') {
      flat.push({ value: opt, label: opt })
    } else {
      flat.push({ value: opt.value, label: opt.label ?? opt.value, icon: opt.icon, group: opt.group })
    }
  })
  return flat
}

export function CustomSelect({
  label,
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  searchable = true,
  clearable = true,
  disabled = false,
  required = false,
  helperText,
  error,
  className = '',
  id,
}) {
  const generatedId = useId()
  const selectId = id || generatedId
  const rootRef = useRef(null)
  const searchRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const flat = useMemo(() => normalizeOptions(options), [options])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return flat
    return flat.filter((o) => o.label.toLowerCase().includes(q) || String(o.value).toLowerCase().includes(q))
  }, [flat, query])

  const selected = flat.find((o) => o.value === value)

  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((item) => {
      const key = item.group || ''
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    })
    return [...map.entries()]
  }, [filtered])

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onScroll = (e) => {
      // Keep list scrollable; close when the page itself moves so the panel doesn't drift.
      if (rootRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [open])

  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchRef.current?.focus(), 10)
    }
    if (!open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open, searchable])

  const selectValue = (next) => {
    onChange?.(next)
    setOpen(false)
  }

  const onTriggerKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
    }
  }

  const onListKeyDown = (e) => {
    if (!filtered.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectValue(filtered[activeIndex]?.value ?? '')
    }
  }

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={selectId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`acme-cselect ${open ? 'is-open' : ''}`} ref={rootRef}>
        <button
          id={selectId}
          type="button"
          className="acme-cselect__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={onTriggerKeyDown}
        >
          <span className={`acme-cselect__value ${selected ? '' : 'acme-cselect__placeholder'}`}>
            {selected ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {selected.icon}
                {selected.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--acme-text-muted)' }}>
            {clearable && value && !disabled && (
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear selection"
                onClick={(e) => {
                  e.stopPropagation()
                  selectValue('')
                }}
              >
                <X size={14} />
              </span>
            )}
            <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
          </span>
        </button>

        {open && (
          <div className="acme-cselect__panel" role="listbox" onKeyDown={onListKeyDown}>
            {searchable && (
              <div className="acme-cselect__search">
                <div className="acme-input-wrap">
                  <span className="acme-input-icon acme-input-icon--left">
                    <Search size={14} />
                  </span>
                  <input
                    ref={searchRef}
                    className="acme-input acme-input--with-icon-left"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setActiveIndex(0)
                    }}
                    placeholder="Search..."
                    aria-label="Search options"
                  />
                </div>
              </div>
            )}
            <div className="acme-cselect__list">
              {filtered.length === 0 ? (
                <div className="acme-cselect__empty">No results found</div>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group || 'default'}>
                    {group && <div className="acme-cselect__group-label">{group}</div>}
                    {items.map((item) => {
                      const flatIndex = filtered.findIndex((f) => f.value === item.value)
                      const isSelected = item.value === value
                      return (
                        <button
                          key={item.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`acme-cselect__option ${isSelected ? 'is-selected' : ''} ${flatIndex === activeIndex ? 'is-active' : ''}`}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={() => selectValue(item.value)}
                        >
                          {item.icon}
                          <span style={{ flex: 1 }}>{item.label}</span>
                          {isSelected && <Check size={14} />}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`acme-helper ${error ? 'acme-helper--error' : ''}`.trim()}>{error || helperText}</p>
      )}
    </div>
  )
}
