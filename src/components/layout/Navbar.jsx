import { Bell, HelpCircle, Menu, Moon, Search, Sun, User } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { Dropdown, DropdownDivider, DropdownItem } from '../ui/Dropdown'
import { Avatar } from '../ui/Avatar'
import { useToast } from '../../hooks/useToast'

export function Navbar({ onMenuClick, searchValue, onSearchChange }) {
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()

  return (
    <header className="acme-navbar">
      <button type="button" className="nav-icon-btn acme-menu-btn" aria-label="Open navigation" onClick={onMenuClick}>
        <Menu size={20} />
      </button>

      <a href="#overview" className="brand-mark" aria-label="ACME home">
        <img src="/acme-logo.png" alt="ACME" className="brand-mark__img" />
      </a>

      <div className="nav-search">
        <div className="acme-input-wrap">
          <span className="acme-input-icon acme-input-icon--left">
            <Search size={16} />
          </span>
          <input
            className="acme-input acme-input--with-icon-left"
            type="search"
            placeholder="Search components..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            aria-label="Global search"
          />
        </div>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          type="button"
          className="nav-icon-btn"
          aria-label="Notifications"
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Notifications',
              message: 'You have 3 unread design system updates.',
            })
          }
        >
          <Bell size={18} />
          <span className="nav-badge">3</span>
        </button>

        <button
          type="button"
          className="nav-icon-btn"
          aria-label="Help"
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Help',
              message: 'Browse sections in the sidebar to explore ACME UI patterns.',
            })
          }
        >
          <HelpCircle size={18} />
        </button>

        <button
          type="button"
          className="nav-icon-btn"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Dropdown
          trigger={
            <button type="button" className="nav-icon-btn" aria-label="User menu" style={{ width: 'auto', gap: 8, padding: '0 8px' }}>
              <Avatar name="Alex Morgan" size="sm" />
              <span className="nav-user-name" style={{ fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text)' }}>
                Alex Morgan
              </span>
            </button>
          }
        >
          {({ close }) => (
            <>
              <DropdownItem
                icon={<User size={14} />}
                onClick={() => {
                  showToast({ type: 'success', title: 'Profile', message: 'Opened profile demo.' })
                  close()
                }}
              >
                View profile
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  showToast({ type: 'info', title: 'Settings', message: 'Settings demo opened.' })
                  close()
                }}
              >
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                danger
                onClick={() => {
                  showToast({ type: 'warning', title: 'Signed out', message: 'Demo sign-out completed.' })
                  close()
                }}
              >
                Sign out
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  )
}
