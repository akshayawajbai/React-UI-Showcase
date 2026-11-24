import { useEffect, useRef, useState } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const ICON_COLORS = {
  success: 'var(--acme-success)',
  error: 'var(--acme-error)',
  warning: 'var(--acme-warning)',
  info: 'var(--acme-info)',
}

/** Must match the @keyframes name in components.css. */
const COUNTDOWN_ANIMATION = 'acme-toast-countdown'

/**
 * Auto-dismiss is driven by a CSS animation on the progress bar (see `.acme-toast__progress-bar`):
 * - the browser pauses it with `:hover` (real pointer devices only) and `:focus-within`,
 *   so it can never get stuck after a touch tap or a layout shift under a still mouse;
 * - the toast closes when that animation ends.
 */
function ToastItem({ toast, onClose }) {
  const [leaving, setLeaving] = useState(false)
  const leavingRef = useRef(false)
  const closeTimerRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const Icon = ICONS[toast.type] || Info
  const duration = toast.duration || 0

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const dismiss = () => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    // Matches the 200ms slide-out animation before the toast is removed.
    closeTimerRef.current = setTimeout(() => onCloseRef.current(toast.id), 180)
  }

  const handleCountdownEnd = (e) => {
    if (e.animationName === COUNTDOWN_ANIMATION) dismiss()
  }

  return (
    <div className={`acme-toast acme-toast--${toast.type} ${leaving ? 'is-leaving' : ''}`} role="status">
      <div className="acme-toast__content">
        <Icon size={18} style={{ color: ICON_COLORS[toast.type], flexShrink: 0, marginTop: 2 }} />
        <div className="acme-toast__body">
          {toast.title && <p className="acme-toast__title">{toast.title}</p>}
          {toast.message && <p className="acme-toast__message">{toast.message}</p>}
        </div>
        <button type="button" className="acme-toast__close" aria-label="Dismiss notification" onClick={dismiss}>
          <X size={16} />
        </button>
      </div>
      {duration > 0 && (
        <div className="acme-toast__progress" aria-hidden="true">
          <div
            className={`acme-toast__progress-bar acme-toast__progress-bar--${toast.type}`}
            style={{ animationDuration: `${duration}ms` }}
            onAnimationEnd={handleCountdownEnd}
          />
        </div>
      )}
    </div>
  )
}

export function ToastViewport({ toasts, onClose }) {
  if (!toasts?.length) return null
  return (
    <div className="acme-toast-viewport" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}
