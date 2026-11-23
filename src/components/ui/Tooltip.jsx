export function Tooltip({ content, children }) {
  return (
    <span className="acme-tooltip">
      {children}
      <span className="acme-tooltip__content" role="tooltip">
        {content}
      </span>
    </span>
  )
}
