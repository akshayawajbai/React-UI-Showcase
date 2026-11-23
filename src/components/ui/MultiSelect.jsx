import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'

function normalizeOptions(options = []) {
  const flat = []
  options.forEach((opt) => {
    if (opt?.options) {
      opt.options.forEach((child) => {
        flat.push({
          value: child.value ?? child,
          label: child.label ?? child,
          group: opt.label,
        })
      })
    } else if (typeof opt === 'string') {
      flat.push({ value: opt, label: opt })
    } else {
      flat.push({ value: opt.value, label: opt.label ?? opt.value, group: opt.group })
    }
  })
  return flat
}

export function MultiSelect({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = 'Select items',
  searchable = true,
  disabled = false,
  helperText,
  className = '',
  id,
  showSelectAll = true,
}) {
  const generatedId = useId()
  const selectId = id || generatedId
  const rootRef = useRef(null)
  const searchRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const flat = useMemo(() => normalizeOptions(options), [options])
  const selectedSet = useMemo(() => new Set(value), [value])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return flat
    return flat.filter((o) => o.label.toLowerCase().includes(q))
  }, [flat, query])

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
    if (open && searchable) setTimeout(() => searchRef.current?.focus(), 10)
    if (!open) setQuery('')
  }, [open, searchable])

  const toggle = (itemValue) => {
    const next = selectedSet.has(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue]
    onChange?.(next)
  }

  const clearAll = () => onChange?.([])
  const selectAllFiltered = () => {
    const next = new Set(value)
    filtered.forEach((item) => next.add(item.value))
    onChange?.([...next])
  }

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className={`acme-cselect ${open ? 'is-open' : ''}`} ref={rootRef}>
        <button
          id={selectId}
          type="button"
          className="acme-cselect__trigger"
          style={{ height: 'auto', minHeight: 40, paddingTop: 6, paddingBottom: 6 }}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
        >
          <div className="acme-cselect__chips">
            {value.length === 0 && <span className="acme-cselect__placeholder">{placeholder}</span>}
            {value.map((val) => {
              const item = flat.find((o) => o.value === val)
              return (
                <span key={val} className="acme-tag">
                  {item?.label || val}
                  <button
                    type="button"
                    className="acme-tag__remove"
                    aria-label={`Remove ${item?.label || val}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggle(val)
                    }}
                  >
                    <X size={12} />
                  </button>
                </span>
              )
            })}
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--acme-text-muted)', flexShrink: 0 }}>
            <span style={{ fontSize: 11 }}>{value.length}</span>
            <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
          </span>
        </button>

        {open && (
          <div className="acme-cselect__panel" role="listbox" aria-multiselectable="true">
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
                    onChange={(e) => setQuery(e.target.value)}
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
                      const checked = selectedSet.has(item.value)
                      return (
                        <button
                          key={item.value}
                          type="button"
                          role="option"
                          aria-selected={checked}
                          className={`acme-cselect__option ${checked ? 'is-selected' : ''}`}
                          onClick={() => toggle(item.value)}
                        >
                          <input type="checkbox" checked={checked} readOnly tabIndex={-1} aria-hidden="true" />
                          <span style={{ flex: 1 }}>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="acme-cselect__footer">
              {showSelectAll ? (
                <button type="button" className="acme-btn acme-btn--text acme-btn--sm" onClick={selectAllFiltered}>
                  Select all
                </button>
              ) : (
                <span />
              )}
              <button type="button" className="acme-btn acme-btn--text acme-btn--sm" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
      {helperText && <p className="acme-helper">{helperText}</p>}
    </div>
  )
}
