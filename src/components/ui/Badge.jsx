export function Badge({ status = 'info', size = 'md', dot = false, children, className = '' }) {
  const classes = ['acme-badge', `acme-badge--${status}`, `acme-badge--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes}>
      {dot && <span className="acme-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
