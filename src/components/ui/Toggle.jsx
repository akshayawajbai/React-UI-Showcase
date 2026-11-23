import { useId } from 'react'

export function Toggle({ checked, onChange, label, disabled = false, id }) {
  const generatedId = useId()
  const toggleId = id || generatedId

  return (
    <label className="acme-toggle" htmlFor={toggleId}>
      <input
        id={toggleId}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-checked={checked}
      />
      <span className="acme-toggle__track">
        <span className="acme-toggle__thumb" />
      </span>
      {label && <span className="acme-toggle__label">{label}</span>}
    </label>
  )
}
