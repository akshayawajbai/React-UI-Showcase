import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 0) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav className="acme-pagination" aria-label="Pagination">
      <button
        type="button"
        className="acme-pagination__btn"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onChange?.(page - 1)}
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`acme-pagination__btn ${p === page ? 'is-active' : ''}`}
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onChange?.(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="acme-pagination__btn"
        disabled={page >= pageCount}
        aria-label="Next page"
        onClick={() => onChange?.(page + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}
