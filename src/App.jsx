import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { PageLayout } from './components/layout/PageLayout'
import { OverviewSection } from './components/showcase/OverviewSection'
import { TypographyShowcase } from './components/showcase/TypographyShowcase'
import { ButtonShowcase } from './components/showcase/ButtonShowcase'
import { CardShowcase } from './components/showcase/CardShowcase'
import { FormShowcase } from './components/showcase/FormShowcase'
import { TableShowcase } from './components/showcase/TableShowcase'
import { NavigationShowcase } from './components/showcase/NavigationShowcase'
import { BadgeShowcase } from './components/showcase/BadgeShowcase'
import { ToastShowcase } from './components/showcase/ToastShowcase'
import { LoadingShowcase } from './components/showcase/LoadingShowcase'
import { ModalShowcase } from './components/showcase/ModalShowcase'
import { OtherComponentsShowcase } from './components/showcase/OtherComponentsShowcase'
import { NAV_ITEMS } from './data/sampleData'

function ShowcaseContent({ searchValue }) {
  const query = searchValue.trim().toLowerCase()
  const matches = (id, labels = []) => {
    if (!query) return true
    const haystack = [id, ...labels].join(' ').toLowerCase()
    return haystack.includes(query)
  }

  const sections = [
    { id: 'overview', node: <OverviewSection />, labels: ['design system', 'overview'] },
    { id: 'typography', node: <TypographyShowcase />, labels: ['fonts', 'headings', 'text'] },
    { id: 'buttons', node: <ButtonShowcase />, labels: ['actions', 'cta'] },
    { id: 'cards', node: <CardShowcase />, labels: ['surfaces', 'stats'] },
    { id: 'forms', node: <FormShowcase />, labels: ['inputs', 'select', 'validation'] },
    { id: 'tables', node: <TableShowcase />, labels: ['data', 'grid', 'records'] },
    { id: 'navigation', node: <NavigationShowcase />, labels: ['tabs', 'menu', 'breadcrumb'] },
    { id: 'badges', node: <BadgeShowcase />, labels: ['status', 'chips'] },
    { id: 'toasts', node: <ToastShowcase />, labels: ['notifications', 'alerts'] },
    { id: 'loading', node: <LoadingShowcase />, labels: ['spinner', 'skeleton', 'progress'] },
    { id: 'modals', node: <ModalShowcase />, labels: ['dialogs', 'confirm'] },
    { id: 'other', node: <OtherComponentsShowcase />, labels: ['tooltip', 'accordion', 'avatar', 'fab'] },
  ]

  const visible = sections.filter((s) => matches(s.id, s.labels))

  return (
    <>
      {query && (
        <div className="showcase-panel" style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
            Showing {visible.length} of {NAV_ITEMS.length} sections matching &quot;{searchValue}&quot;.
          </p>
        </div>
      )}
      {visible.length === 0 ? (
        <div className="showcase-panel">
          <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>No sections match your search.</p>
        </div>
      ) : (
        visible.map((section) => <div key={section.id}>{section.node}</div>)
      )}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PageLayout>{({ searchValue }) => <ShowcaseContent searchValue={searchValue} />}</PageLayout>
      </ToastProvider>
    </ThemeProvider>
  )
}
