import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { CardSkeleton, TableSkeleton } from '../ui/Skeleton'
import { Progress } from '../ui/Progress'
import { Card } from '../ui/Card'
import { AccountingLoader } from '../ui/AccountingLoader'
import { useToast } from '../../hooks/useToast'

export function LoadingShowcase() {
  const { showToast } = useToast()
  const [btnLoading, setBtnLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [progress, setProgress] = useState(35)
  const [showSkeletons, setShowSkeletons] = useState(true)
  const [accountingLoading, setAccountingLoading] = useState(true)

  useEffect(() => {
    if (!pageLoading) return undefined
    const t = setTimeout(() => {
      setPageLoading(false)
      showToast({
        type: 'success',
        title: 'Page loaded',
        message: 'Page content finished loading.',
      })
    }, 1800)
    return () => clearTimeout(t)
  }, [pageLoading, showToast])

  useEffect(() => {
    if (!overlay) return undefined
    const t = setTimeout(() => {
      setOverlay(false)
      showToast({
        type: 'success',
        title: 'Ready',
        message: 'Full-page loading overlay completed.',
      })
    }, 2000)
    return () => clearTimeout(t)
  }, [overlay, showToast])

  return (
    <section id="loading" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Loading Effects</h2>
        <p className="showcase-section__desc">
          Spinners, skeletons, progress indicators, and full-page overlays for async states.
        </p>
      </div>

      <div className="showcase-row" style={{ marginBottom: 20 }}>
        <Button
          loading={btnLoading}
          onClick={() => {
            setBtnLoading(true)
            showToast({
              type: 'info',
              title: 'Loading',
              message: 'Button loading state started.',
            })
            setTimeout(() => {
              setBtnLoading(false)
              showToast({
                type: 'success',
                title: 'Done',
                message: 'Button loading finished successfully.',
              })
            }, 1500)
          }}
        >
          Button loading
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setPageLoading(true)
            showToast({
              type: 'info',
              title: 'Page loading',
              message: 'Fetching page content…',
            })
          }}
        >
          Page loading
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOverlay(true)
            showToast({
              type: 'warning',
              title: 'Please wait',
              message: 'Full-page overlay is active.',
            })
          }}
        >
          Full-page overlay
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setShowSkeletons((v) => {
              const next = !v
              showToast({
                type: 'info',
                title: next ? 'Skeletons shown' : 'Skeletons hidden',
                message: next
                  ? 'Card and table skeleton placeholders are visible.'
                  : 'Skeleton placeholders were hidden.',
              })
              return next
            })
          }}
        >
          Toggle skeletons
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setProgress((p) => {
              const next = p >= 100 ? 10 : p + 20
              showToast({
                type: next >= 100 ? 'success' : 'info',
                title: next >= 100 ? 'Upload complete' : 'Progress updated',
                message: next >= 100 ? 'Upload reached 100%.' : `Upload progress is now ${next}%.`,
              })
              return next
            })
          }}
        >
          Advance progress
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setAccountingLoading(true)
            showToast({
              type: 'info',
              title: 'Accounting sync',
              message: 'Custom accounting loader started.',
            })
            setTimeout(() => {
              setAccountingLoading(false)
              showToast({
                type: 'success',
                title: 'Books ready',
                message: 'Ledgers and balances finished syncing.',
              })
            }, 3200)
          }}
        >
          Accounting loader
        </Button>
      </div>

      <div className="showcase-grid showcase-grid--3">
        <Card title="Circular spinner">
          <div className="showcase-row">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Card>

        <Card title="Progress bar">
          <Progress value={progress} label="Upload progress" />
          <div style={{ marginTop: 16 }}>
            <Progress indeterminate label="Indeterminate" />
          </div>
        </Card>

        <Card title="Page loading state">
          {pageLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
              <Spinner size="lg" />
              <span style={{ fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>Loading page content…</span>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
              Trigger “Page loading” to preview this state.
            </p>
          )}
        </Card>
      </div>

      <div className="showcase-grid showcase-grid--2" style={{ marginTop: 16 }}>
        <Card title="Accounting loader" subtitle="Custom loader for ledgers, invoices, and balances">
          {accountingLoading ? (
            <AccountingLoader />
          ) : (
            <div style={{ padding: '20px 8px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 12px', fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
                Accounting data is ready. Run the loader again to preview.
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setAccountingLoading(true)
                  setTimeout(() => setAccountingLoading(false), 3200)
                }}
              >
                Replay accounting loader
              </Button>
            </div>
          )}
        </Card>
        <Card title="Accounting loader sizes">
          <div className="showcase-row" style={{ alignItems: 'flex-start', justifyContent: 'space-around' }}>
            <AccountingLoader size="sm" label="Small" sublabel="Inline sync" />
            <AccountingLoader size="md" label="Medium" sublabel="Panel sync" />
          </div>
        </Card>
      </div>

      {showSkeletons && (
        <div className="showcase-grid showcase-grid--2" style={{ marginTop: 16 }}>
          <div>
            <p className="showcase-block__title">Card skeleton</p>
            <CardSkeleton />
          </div>
          <div>
            <p className="showcase-block__title">Table skeleton</p>
            <TableSkeleton rows={4} />
          </div>
        </div>
      )}

      {overlay && (
        <div className="acme-overlay-loader" role="alert" aria-busy="true">
          <Spinner size="lg" />
          <p style={{ margin: 0 }}>Loading application…</p>
        </div>
      )}
    </section>
  )
}
