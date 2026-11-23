import { Spinner } from './Spinner'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  leftIcon = null,
  rightIcon = null,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'acme-btn',
    `acme-btn--${variant}`,
    `acme-btn--${size}`,
    iconOnly ? 'acme-btn--icon' : '',
    loading ? 'is-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <>
          {leftIcon}
          {children}
          {!iconOnly && rightIcon}
        </>
      )}
    </button>
  )
}
