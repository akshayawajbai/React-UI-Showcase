import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { NAV_ITEMS } from '../../data/sampleData'

export function OverviewSection() {
  return (
    <section id="overview" className="showcase-section">
      <div className="page-hero">
        <img src="/acme-logo.png" alt="ACME" className="page-hero__logo" />
        <h1 className="page-hero__title">ACME UI Design System</h1>
        <p className="page-hero__subtitle">
          A centralized showcase of reusable components, visual styles, and interaction patterns for ACME ERP.
        </p>
      </div>

      <div className="showcase-grid showcase-grid--3">
        <Card>
          <div className="showcase-stat">
            <span className="showcase-stat__label">Brand primary</span>
            <span className="showcase-stat__value" style={{ color: 'var(--acme-primary-text)' }}>
              #014A75
            </span>
            <span style={{ fontSize: 'var(--acme-fs-xs)', color: 'var(--acme-text-secondary)' }}>Primary blue, with #00ACD2 cyan for accents</span>
          </div>
        </Card>
        <Card>
          <div className="showcase-stat">
            <span className="showcase-stat__label">Sections</span>
            <span className="showcase-stat__value">{NAV_ITEMS.length}</span>
            <span style={{ fontSize: 'var(--acme-fs-xs)', color: 'var(--acme-text-secondary)' }}>Interactive reference areas</span>
          </div>
        </Card>
        <Card>
          <div className="showcase-stat">
            <span className="showcase-stat__label">Themes</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Badge status="info" dot>
                Light
              </Badge>
              <Badge status="active" dot>
                Dark
              </Badge>
            </div>
            <span style={{ fontSize: 'var(--acme-fs-xs)', color: 'var(--acme-text-secondary)', marginTop: 8 }}>
              Persisted via localStorage
            </span>
          </div>
        </Card>
      </div>

      <div className="showcase-panel" style={{ marginTop: 20 }}>
        <p className="showcase-block__title">How to use this showcase</p>
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)', fontSize: 'var(--acme-fs-sm)', lineHeight: 1.6 }}>
          This project is a visual and interaction reference only. Use the left navigation to jump between
          component categories, switch themes from the navbar, and exercise buttons, forms, tables, modals, and
          toasts with local demo state. No ERP business modules are included.
        </p>
      </div>
    </section>
  )
}
