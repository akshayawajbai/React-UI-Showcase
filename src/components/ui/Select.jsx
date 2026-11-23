import { CustomSelect } from './CustomSelect'
import { useId } from 'react'

/** @deprecated Prefer CustomSelect — kept as a compatible wrapper for showcase forms. */
export function Select({
  label,
  options = [],
  helperText,
  error,
  success,
  required = false,
  placeholder = 'Select an option',
  className = '',
  id,
  value,
  onChange,
  disabled,
  searchable = true,
  ...props
}) {
  return (
    <CustomSelect
      id={id}
      label={label}
      options={options}
      value={value || ''}
      onChange={(next) => onChange?.({ target: { value: next, name: props.name } })}
      placeholder={placeholder}
      helperText={error || success || helperText}
      error={error}
      required={required}
      disabled={disabled}
      searchable={searchable}
      className={className}
    />
  )
}

export function Textarea({
  label,
  helperText,
  error,
  success,
  required = false,
  className = '',
  id,
  ...props
}) {
  const generatedId = useId()
  const areaId = id || props.name || generatedId
  const stateClass = error ? 'acme-textarea--error' : success ? 'acme-textarea--success' : ''
  const helpId = `${areaId}-help`

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={areaId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={areaId}
        className={`acme-textarea ${stateClass}`.trim()}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={helperText || error || success ? helpId : undefined}
        required={required}
        {...props}
      />
      {(error || success || helperText) && (
        <p id={helpId} className={`acme-helper ${error ? 'acme-helper--error' : ''} ${success ? 'acme-helper--success' : ''}`.trim()}>
          {error || success || helperText}
        </p>
      )}
    </div>
  )
}
