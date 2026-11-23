import { useCallback, useMemo, useState } from 'react'
import { ToastViewport } from '../components/ui/Toast'
import { ToastContext } from './toast-context'

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(({ type = 'info', title, message, duration = 3500 }) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, type, title, message, duration }])
    return id
  }, [])

  const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}
