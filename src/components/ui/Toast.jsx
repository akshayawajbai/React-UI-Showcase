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

function ToastItem({ toast, onClose }) {
  const [leaving, setLeaving] = useState(false)
  const [progress, setProgress] = useState(100)
  const remainingRef = useRef(toast.duration || 0)
  const startedRef = useRef(Date.now())
  const frameRef = useRef(null)
  const closeTimerRef = useRef(null)
  const leavingRef = useRef(false)
  const pausedRef = useRef(false)
  const onCloseRef = useRef(onClose)
  const Icon = ICONS[toast.type] || Info
  const duration = toast.duration || 0

  onCloseRef.current = onClose

  const dismiss = () => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    closeTimerRef.current = setTimeout(() => onCloseRef.current(toast.id), 180)
  }

  useEffect(() => {
    if (!duration) return undefined

    const tick = () => {
      if (pausedRef.current || leavingRef.current) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = Date.now() - startedRef.current
      const left = Math.max(0, remainingRef.current - elapsed)
      setProgress((left / duration) * 100)
      if (left <= 0) {
        dismiss()
        return
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    startedRef.current = Date.now()
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [duration, toast.id])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (!duration || leavingRef.current) return
    const elapsed = Date.now() - startedRef.current
    remainingRef.current = Math.max(0, remainingRef.current - elapsed)
    pausedRef.current = true
  }

  const handleMouseLeave = () => {
    if (!duration || leavingRef.current) return
    startedRef.current = Date.now()
    pausedRef.current = false
  }

  return (
    <div
      className={`acme-toast acme-toast--${toast.type} ${leaving ? 'is-leaving' : ''}`}
      role="status"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            style={{
              width: `${progress}%`,
              transition: pausedRef.current ? 'none' : 'width 80ms linear',
            }}
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
