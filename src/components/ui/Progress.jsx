export function Progress({ value = 0, indeterminate = false, label }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div>
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 'var(--acme-fs-sm)',
            color: 'var(--acme-text-secondary)',
          }}
        >
          <span>{label}</span>
          {!indeterminate && <span>{clamped}%</span>}
        </div>
      )}
      <div
        className={`acme-progress ${indeterminate ? 'acme-progress--indeterminate' : ''}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div className="acme-progress__bar" style={indeterminate ? undefined : { width: `${clamped}%` }} />
      </div>
    </div>
  )
}
