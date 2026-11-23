import { AlertTriangle, BarChart3, CheckCircle2, Info, ShieldAlert, TrendingUp } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { useToast } from '../../hooks/useToast'
import { useTheme } from '../../hooks/useTheme'

export function CardShowcase() {
  const { showToast } = useToast()
  const { theme } = useTheme()

  return (
    <section id="cards" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Cards</h2>
        <p className="showcase-section__desc">
          Surfaces for grouping content, metrics, and actions with clear hierarchy.
        </p>
      </div>

      <div className="showcase-grid showcase-grid--3">
        <Card title="Basic card" subtitle="Default bordered surface">
          <p style={{ margin: 0, color: 'var(--acme-text-secondary)', fontSize: 'var(--acme-fs-sm)' }}>
            Use basic cards for grouped content and short descriptions.
          </p>
        </Card>

        <Card>
          <div className="showcase-stat">
            <span className="showcase-stat__label">Active sessions</span>
            <span className="showcase-stat__value">1,284</span>
            <span style={{ color: 'var(--acme-success)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={14} /> +12.4% this week
            </span>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'var(--acme-primary-subtle)',
                color: 'var(--acme-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BarChart3 size={18} />
            </span>
            <div>
              <h3 className="acme-card__title">Icon card</h3>
              <p className="acme-card__subtitle">Visual cue with supporting copy for feature highlights.</p>
            </div>
          </div>
        </Card>

        <Card title="Information" subtitle="Neutral guidance">
          <div style={{ display: 'flex', gap: 8, color: 'var(--acme-info)', fontSize: 14 }}>
            <Info size={16} style={{ marginTop: 2, flexShrink: 0 }} />
            Keep card content concise and action-oriented.
          </div>
        </Card>

        <Card
          title="Card with footer"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => showToast({ type: 'info', title: 'Dismissed' })}>
                Dismiss
              </Button>
              <Button size="sm" onClick={() => showToast({ type: 'success', title: 'Accepted' })}>
                Accept
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>
            Footer actions belong to the card context.
          </p>
        </Card>

        <Card
          title="Card with actions"
          actions={
            <Button size="sm" variant="outline" onClick={() => showToast({ type: 'info', title: 'Manage', message: 'Opened manage actions.' })}>
              Manage
            </Button>
          }
        >
          <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>
            Header actions keep primary controls visible.
          </p>
        </Card>

        <Card variant="border" title="Border card">
          <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>Stronger border emphasis.</p>
        </Card>

        <Card variant="shadow" title="Shadow card">
          <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>Elevated surface with soft shadow.</p>
        </Card>

        <Card variant="hover" title="Hover card">
          <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>
            Smooth lift, primary border accent, and soft shadow on hover.
          </p>
        </Card>

        <Card variant="success">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--acme-success-text)' }}>
            <CheckCircle2 size={18} />
            <strong>Success card</strong>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--acme-success-text)' }}>Operation completed without issues.</p>
        </Card>

        <Card variant="warning">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--acme-warning-text)' }}>
            <AlertTriangle size={18} />
            <strong>Warning card</strong>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--acme-warning-text)' }}>Review pending items before continuing.</p>
        </Card>

        <Card variant="error">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--acme-error-text)' }}>
            <ShieldAlert size={18} />
            <strong>Error card</strong>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--acme-error-text)' }}>Something needs attention right away.</p>
        </Card>
      </div>

      <div className="showcase-panel" style={{ marginTop: 16 }}>
        <p className="showcase-block__title">Dark theme card preview</p>
        <div
          style={{
            background: theme === 'dark' ? '#12171C' : '#1C242C',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Card title="Dark surface card" subtitle="Uses ACME dark surface tokens">
            <p style={{ margin: 0, fontSize: 14, color: 'var(--acme-text-secondary)' }}>
              Cards inherit theme variables so surfaces stay readable in both modes. Current theme: {theme}.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
