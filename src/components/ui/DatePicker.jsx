import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function parseISO(value) {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function DatePicker({
  label,
  value = '',
  onChange,
  placeholder = 'Select a date',
  disabled = false,
  required = false,
  helperText,
  error,
  className = '',
  id,
}) {
  const generatedId = useId()
  const fieldId = id || generatedId
  const rootRef = useRef(null)
  const selected = parseISO(value)
  const today = useMemo(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), t.getDate())
  }, [])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => selected || today)

  useEffect(() => {
    if (selected) setView(new Date(selected.getFullYear(), selected.getMonth(), 1))
  }, [value])

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

  const days = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const first = new Date(year, month, 1)
    const start = new Date(first)
    start.setDate(first.getDate() - first.getDay())
    const cells = []
    for (let i = 0; i < 42; i += 1) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      cells.push(date)
    }
    return cells
  }, [view])

  const display = selected
    ? selected.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : ''

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={fieldId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="acme-datepicker" ref={rootRef}>
        <div className="acme-input-wrap">
          <span className="acme-input-icon acme-input-icon--left">
            <CalendarDays size={16} />
          </span>
          <button
            id={fieldId}
            type="button"
            className="acme-input acme-input--with-icon-left acme-input--with-icon-right"
            style={{ textAlign: 'left', cursor: disabled ? 'not-allowed' : 'pointer' }}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => !disabled && setOpen((v) => !v)}
          >
            <span className={display ? '' : 'acme-cselect__placeholder'}>{display || placeholder}</span>
          </button>
          {value && !disabled && (
            <button
              type="button"
              className="acme-input-icon acme-input-icon--right"
              style={{ pointerEvents: 'auto', border: 'none', background: 'transparent', cursor: 'pointer' }}
              aria-label="Clear date"
              onClick={(e) => {
                e.stopPropagation()
                onChange?.('')
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {open && (
          <div className="acme-datepicker__panel" role="dialog" aria-label="Choose date">
            <div className="acme-datepicker__header">
              <button
                type="button"
                className="acme-btn acme-btn--ghost acme-btn--sm acme-btn--icon"
                aria-label="Previous month"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <p className="acme-datepicker__title">
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </p>
              <button
                type="button"
                className="acme-btn acme-btn--ghost acme-btn--sm acme-btn--icon"
                aria-label="Next month"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="acme-datepicker__grid">
              {WEEKDAYS.map((d) => (
                <div key={d} className="acme-datepicker__dow">
                  {d}
                </div>
              ))}
              {days.map((date) => {
                const outside = date.getMonth() !== view.getMonth()
                const isSelected = sameDay(date, selected)
                const isToday = sameDay(date, today)
                return (
                  <button
                    key={toISO(date)}
                    type="button"
                    className={`acme-datepicker__day ${outside ? 'is-outside' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      onChange?.(toISO(date))
                      setOpen(false)
                    }}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
            <div className="acme-datepicker__footer">
              <button
                type="button"
                className="acme-btn acme-btn--text acme-btn--sm"
                onClick={() => {
                  onChange?.(toISO(today))
                  setOpen(false)
                }}
              >
                Today
              </button>
              <button
                type="button"
                className="acme-btn acme-btn--text acme-btn--sm"
                onClick={() => {
                  onChange?.('')
                  setOpen(false)
                }}
              >
                Clear
              </button>
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
