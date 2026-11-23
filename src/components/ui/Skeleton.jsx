export function Skeleton({ width = '100%', height = 16, className = '', style = {} }) {
  return (
    <div
      className={`acme-skeleton ${className}`.trim()}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="acme-card">
      <div className="acme-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Skeleton height={20} width="40%" />
        <Skeleton height={14} width="80%" />
        <Skeleton height={14} width="65%" />
        <Skeleton height={36} width="30%" style={{ marginTop: 8 }} />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="acme-table-wrap">
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Skeleton height={18} width="100%" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} height={36} width="100%" />
        ))}
      </div>
    </div>
  )
}
