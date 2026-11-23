import { Inbox } from 'lucide-react'
import { Button } from './Button'

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display yet.',
  actionLabel,
  onAction,
  icon,
}) {
  return (
    <div className="acme-empty">
      <div className="acme-empty__icon">{icon || <Inbox size={24} />}</div>
      <h3 className="acme-empty__title">{title}</h3>
      <p className="acme-empty__desc">{description}</p>
      {actionLabel && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
