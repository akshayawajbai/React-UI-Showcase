export function Avatar({ name = '', size = 'md', src, className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <span className={`acme-avatar acme-avatar--${size} ${className}`.trim()} aria-label={name || 'User avatar'}>
      {src ? <img src={src} alt={name} /> : initials || '?'}
    </span>
  )
}
