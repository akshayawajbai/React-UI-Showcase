import { useEffect, useState } from 'react'
import { Filter, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import { Tooltip } from '../ui/Tooltip'
import { Accordion } from '../ui/Accordion'
import { Avatar } from '../ui/Avatar'
import { Dropdown, DropdownItem } from '../ui/Dropdown'
import { Progress } from '../ui/Progress'
import { EmptyState } from '../ui/EmptyState'
import { Divider } from '../ui/Divider'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { SAMPLE_USERS } from '../../data/sampleData'
import { useToast } from '../../hooks/useToast'

export function OtherComponentsShowcase() {
  const { showToast } = useToast()
  const [filter, setFilter] = useState('')
  const [showFab, setShowFab] = useState(true)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('other')
    if (!section) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.05 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const users = SAMPLE_USERS.filter((u) => u.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section id="other" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Other Components</h2>
        <p className="showcase-section__desc">
          Supporting UI primitives used throughout ACME experiences.
        </p>
      </div>

      <div className="showcase-grid showcase-grid--2">
        <div className="showcase-panel">
          <p className="showcase-block__title">Tooltip</p>
          <Tooltip content="Quick contextual help">
            <Button variant="outline" size="sm">
              Hover me
            </Button>
          </Tooltip>

          <Divider />

          <p className="showcase-block__title">Avatars</p>
          <div className="showcase-row">
            <Avatar name="Alex Morgan" size="sm" />
            <Avatar name="Jordan Lee" size="md" />
            <Avatar name="Sam Rivera" size="lg" />
          </div>

          <Divider />

          <p className="showcase-block__title">Icon buttons & action menu</p>
          <div className="showcase-row">
            <Tooltip content="Add item">
              <Button
                iconOnly
                variant="secondary"
                aria-label="Add"
                onClick={() => showToast({ type: 'success', title: 'Added' })}
              >
                <Plus size={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                iconOnly
                variant="ghost"
                aria-label="Delete"
                onClick={() => showToast({ type: 'warning', title: 'Delete requested' })}
              >
                <Trash2 size={16} />
              </Button>
            </Tooltip>
            <Dropdown
              trigger={
                <Button iconOnly variant="outline" aria-label="More actions">
                  <MoreHorizontal size={16} />
                </Button>
              }
            >
              {({ close }) => (
                <>
                  <DropdownItem
                    onClick={() => {
                      showToast({ type: 'info', title: 'Edited' })
                      close()
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      showToast({ type: 'success', title: 'Shared' })
                      close()
                    }}
                  >
                    Share
                  </DropdownItem>
                  <DropdownItem
                    danger
                    onClick={() => {
                      showToast({ type: 'error', title: 'Removed' })
                      close()
                    }}
                  >
                    Remove
                  </DropdownItem>
                </>
              )}
            </Dropdown>
          </div>
        </div>

        <div className="showcase-panel">
          <p className="showcase-block__title">Accordion</p>
          <Accordion
            defaultOpenFirst
            items={[
              {
                id: 'a1',
                title: 'What is the ACME UI Design Showcase?',
                content:
                  'It is a single-page visual and interaction reference for reusable ACME ERP frontend components, not the ERP product itself.',
              },
              {
                id: 'a2',
                title: 'Which font family should ACME screens use?',
                content:
                  'Rubik is the primary UI font. Roboto Slab can be used sparingly for alternate display headings when a stronger editorial tone is needed.',
              },
              {
                id: 'a3',
                title: 'How do light and dark themes work?',
                content:
                  'Theme tokens live in CSS variables and are toggled through ThemeContext. The selected theme persists in localStorage.',
              },
              {
                id: 'a4',
                title: 'Should forms use native select and date inputs?',
                content:
                  'No. ACME showcase forms use custom searchable dropdowns and a custom calendar date picker for consistent styling across browsers and themes.',
              },
              {
                id: 'a5',
                title: 'How should table row actions be presented?',
                content:
                  'Use a single three-dot action menu per row with View, Edit, and Delete items. Only one menu should be open at a time.',
              },
            ]}
          />
        </div>
      </div>

      <div className="showcase-grid showcase-grid--2" style={{ marginTop: 16 }}>
        <div className="showcase-panel">
          <p className="showcase-block__title">Progress indicator</p>
          <Progress value={72} label="Profile completion" />
        </div>
        <div className="showcase-panel">
          <p className="showcase-block__title">Search filters</p>
          <Input
            label="Filter users"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            leftIcon={<Search size={16} />}
            rightIcon={<Filter size={16} />}
            placeholder="Type a name"
          />
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {users.length === 0 ? (
              <EmptyState title="No users" description="No matches for the current filter." />
            ) : (
              users.map((u) => (
                <div
                  key={u.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 0',
                    borderBottom: '1px solid var(--acme-border)',
                  }}
                >
                  <Avatar name={u.name} size="sm" />
                  <div>
                    <div style={{ fontSize: 'var(--acme-fs-sm)', fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: 'var(--acme-fs-xs)', color: 'var(--acme-text-secondary)' }}>{u.role}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="showcase-panel" style={{ marginTop: 16 }}>
        <p className="showcase-block__title">Empty state & divider</p>
        <EmptyState
          title="Nothing selected"
          description="Choose a record or create a new demo item to get started."
          actionLabel="Create item"
          onAction={() => showToast({ type: 'success', title: 'Create started' })}
        />
        <Divider />
        <div className="showcase-row">
          <Button variant="outline" size="sm" onClick={() => setShowFab((v) => !v)}>
            {showFab ? 'Hide FAB' : 'Show FAB'}
          </Button>
        </div>
      </div>

      {showFab && (
        <button
          type="button"
          className={`acme-fab ${sectionVisible ? '' : 'is-hidden'}`.trim()}
          aria-label="Floating action"
          aria-hidden={!sectionVisible}
          tabIndex={sectionVisible ? 0 : -1}
          onClick={() => showToast({ type: 'success', title: 'FAB clicked', message: 'Floating action triggered.' })}
        >
          <Plus size={22} />
        </button>
      )}
    </section>
  )
}
