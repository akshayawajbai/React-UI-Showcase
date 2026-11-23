import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
}) {
  useEffect(() => {
    if (!open || !closeOnEscape) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeOnEscape, onClose])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="acme-modal-overlay"
      role="presentation"
      onClick={() => {
        if (closeOnOverlay) onClose?.()
      }}
    >
      <div
        className={`acme-modal acme-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="acme-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="acme-modal__header">
          <h2 id="acme-modal-title" className="acme-modal__title">
            {title}
          </h2>
          <Button variant="ghost" size="sm" iconOnly aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <div className="acme-modal__body">{children}</div>
        {footer && <div className="acme-modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
