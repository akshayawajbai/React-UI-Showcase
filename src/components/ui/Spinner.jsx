export function Spinner({ size = 'md', className = '', label = 'Loading' }) {
  return (
    <span
      className={`acme-spinner acme-spinner--${size} ${className}`.trim()}
      role="status"
      aria-label={label}
    />
  )
}
