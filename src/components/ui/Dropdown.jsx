import { useEffect, useRef, useState } from 'react'

export function Dropdown({
  trigger,
  children,
  align = 'right',
  className = '',
  open: openProp,
  onOpenChange,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen
  const setOpen = (next) => {
    const value = typeof next === 'function' ? next(open) : next
    if (!isControlled) setUncontrolledOpen(value)
    onOpenChange?.(value)
  }
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onScroll = (e) => {
      if (ref.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [open])

  return (
    <div className={`acme-dropdown ${className}`.trim()} ref={ref}>
      <div onClick={() => setOpen(!open)}>{typeof trigger === 'function' ? trigger({ open }) : trigger}</div>
      {open && (
        <div
          className={`acme-dropdown__menu ${align === 'left' ? 'acme-dropdown__menu--left' : ''}`}
          role="menu"
        >
          {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ children, onClick, danger = false, icon = null }) {
  return (
    <button
      type="button"
      role="menuitem"
      className={`acme-dropdown__item ${danger ? 'acme-dropdown__item--danger' : ''}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return <div className="acme-dropdown__divider" role="separator" />
}
