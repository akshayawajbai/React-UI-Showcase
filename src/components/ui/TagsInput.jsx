import { useId, useState } from 'react'
import { X } from 'lucide-react'

export function TagsInput({
  label,
  value = [],
  onChange,
  placeholder = 'Type and press Enter',
  helperText,
  disabled = false,
  className = '',
  id,
}) {
  const generatedId = useId()
  const fieldId = id || generatedId
  const [draft, setDraft] = useState('')

  const addTag = (raw) => {
    const tag = raw.trim()
    if (!tag) return
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft('')
      return
    }
    onChange?.([...value, tag])
    setDraft('')
  }

  const removeTag = (tag) => {
    onChange?.(value.filter((t) => t !== tag))
  }

  return (
    <div className={`acme-field ${className}`.trim()}>
      {label && (
        <label className="acme-label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="acme-tags-input" onClick={() => document.getElementById(fieldId)?.focus()}>
        {value.map((tag) => (
          <span key={tag} className="acme-tag">
            {tag}
            <button
              type="button"
              className="acme-tag__remove"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={() => removeTag(tag)}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          id={fieldId}
          className="acme-tags-input__field"
          value={draft}
          disabled={disabled}
          placeholder={value.length ? '' : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag(draft)
            } else if (e.key === 'Backspace' && !draft && value.length) {
              removeTag(value[value.length - 1])
            }
          }}
        />
      </div>
      {helperText && <p className="acme-helper">{helperText}</p>}
    </div>
  )
}
