import { useId } from 'react'

export function Input({
  label,
  helperText,
  error,
  success,
  required = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) {
  const generatedId = useId()
  const inputId = id || props.name || generatedId
  const stateClass = error ? 'acme-input--error' : success ? 'acme-input--success' : ''
  const iconLeft = leftIcon ? 'acme-input--with-icon-left' : ''
  const iconRight = rightIcon ? 'acme-input--with-icon-right' : ''
  const helpId = `${inputId}-help`

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={inputId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="acme-input-wrap">
        {leftIcon && <span className="acme-input-icon acme-input-icon--left">{leftIcon}</span>}
        <input
          id={inputId}
          className={`acme-input ${stateClass} ${iconLeft} ${iconRight}`.trim()}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={helperText || error || success ? helpId : undefined}
          required={required}
          {...props}
        />
        {rightIcon && <span className="acme-input-icon acme-input-icon--right">{rightIcon}</span>}
      </div>
      {(error || success || helperText) && (
        <p
          id={helpId}
          className={`acme-helper ${error ? 'acme-helper--error' : ''} ${success ? 'acme-helper--success' : ''}`.trim()}
        >
          {error || success || helperText}
        </p>
      )}
    </div>
  )
}
