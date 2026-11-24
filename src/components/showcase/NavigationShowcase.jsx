import { useState } from 'react'
import { ChevronDown, Settings, User } from 'lucide-react'
import { Breadcrumbs } from '../ui/Breadcrumbs'
import { Tabs } from '../ui/Tabs'
import { Pagination } from '../ui/Pagination'
import { Dropdown, DropdownDivider, DropdownItem } from '../ui/Dropdown'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { useToast } from '../../hooks/useToast'
import { smoothScrollTo } from '../../utils/smoothScroll'

const H_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'activity', label: 'Activity' },
]

const V_TABS = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'billing', label: 'Billing' },
]

export function NavigationShowcase() {
  const { showToast } = useToast()
  const [hTab, setHTab] = useState('overview')
  const [vTab, setVTab] = useState('general')
  const [page, setPage] = useState(2)

  return (
    <section id="navigation" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Navigation</h2>
        <p className="showcase-section__desc">
          Navbar, sidebar, breadcrumbs, tabs, pagination, and menu patterns.
        </p>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Navbar example</p>
        <div className="demo-navbar">
          <div className="brand-mark">
            <img src={`${import.meta.env.BASE_URL}acme-logo.png`} alt="ACME" className="brand-mark__img" />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button size="sm" variant="ghost" onClick={() => showToast({ type: 'info', title: 'Docs' })}>
              Docs
            </Button>
            <Button size="sm" variant="ghost" onClick={() => showToast({ type: 'info', title: 'Support' })}>
              Support
            </Button>
            <Avatar name="Alex Morgan" size="sm" />
          </div>
        </div>
      </div>

      <div className="showcase-grid showcase-grid--2">
        <div className="showcase-block">
          <p className="showcase-block__title">Sidebar example</p>
          <div className="demo-sidebar">
            {['Overview', 'Typography', 'Buttons', 'Tables'].map((label, i) => (
              <button
                key={label}
                type="button"
                className={`acme-sidebar__link ${i === 0 ? 'is-active' : ''}`}
                onClick={() => showToast({ type: 'info', title: label, message: 'Sidebar navigation demo.' })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="showcase-block">
          <p className="showcase-block__title">Breadcrumbs</p>
          <div className="showcase-panel">
            <Breadcrumbs
              items={[
                {
                  label: 'Home',
                  href: '#overview',
                  onClick: (e) => {
                    e.preventDefault()
                    smoothScrollTo('overview', { duration: 1100, offset: 80 })
                  },
                },
                { label: 'Design System', href: '#navigation' },
                { label: 'Navigation' },
              ]}
            />
          </div>

          <p className="showcase-block__title" style={{ marginTop: 24 }}>
            User profile menu
          </p>
          <Dropdown
            align="left"
            trigger={
              <Button variant="secondary" rightIcon={<ChevronDown size={14} />}>
                <Avatar name="Alex Morgan" size="sm" /> Alex Morgan
              </Button>
            }
          >
            {({ close }) => (
              <>
                <DropdownItem
                  icon={<User size={14} />}
                  onClick={() => {
                    showToast({ type: 'success', title: 'Profile opened' })
                    close()
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  icon={<Settings size={14} />}
                  onClick={() => {
                    showToast({ type: 'info', title: 'Settings opened' })
                    close()
                  }}
                >
                  Settings
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem
                  danger
                  onClick={() => {
                    showToast({ type: 'warning', title: 'Signed out' })
                    close()
                  }}
                >
                  Sign out
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="showcase-grid showcase-grid--2" style={{ marginTop: 8 }}>
        <div className="showcase-panel">
          <p className="showcase-block__title">Horizontal tabs</p>
          <Tabs tabs={H_TABS} activeId={hTab} onChange={setHTab} />
          <p style={{ marginTop: 16, fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
            Selected: <strong style={{ color: 'var(--acme-text)' }}>{hTab}</strong>
          </p>
        </div>
        <div className="showcase-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="showcase-block__title">Vertical tabs</p>
            <Tabs tabs={V_TABS} activeId={vTab} onChange={setVTab} orientation="vertical" />
          </div>
          <div style={{ flex: '1 1 160px', paddingTop: 28, fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
            Content for <strong style={{ color: 'var(--acme-text)' }}>{vTab}</strong> settings panel.
          </div>
        </div>
      </div>

      <div className="showcase-block" style={{ marginTop: 24 }}>
        <p className="showcase-block__title">Pagination & dropdown menus</p>
        <div className="showcase-row">
          <Pagination page={page} pageCount={5} onChange={setPage} />
          <Dropdown
            align="left"
            trigger={
              <Button variant="outline" rightIcon={<ChevronDown size={14} />}>
                Actions
              </Button>
            }
          >
            {({ close }) => (
              <>
                <DropdownItem onClick={() => { showToast({ type: 'success', title: 'Exported' }); close() }}>
                  Export
                </DropdownItem>
                <DropdownItem onClick={() => { showToast({ type: 'info', title: 'Duplicated' }); close() }}>
                  Duplicate
                </DropdownItem>
                <DropdownItem danger onClick={() => { showToast({ type: 'error', title: 'Archived' }); close() }}>
                  Archive
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </section>
  )
}
