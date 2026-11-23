export function Card({
  children,
  variant = 'default',
  className = '',
  title,
  subtitle,
  footer,
  actions,
  ...props
}) {
  const classes = ['acme-card', variant !== 'default' ? `acme-card--${variant}` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {(title || subtitle || actions) && (
        <div className="acme-card__header">
          <div>
            {title && <h3 className="acme-card__title">{title}</h3>}
            {subtitle && <p className="acme-card__subtitle">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="acme-card__body">{children}</div>
      {footer && <div className="acme-card__footer">{footer}</div>}
    </div>
  )
}
