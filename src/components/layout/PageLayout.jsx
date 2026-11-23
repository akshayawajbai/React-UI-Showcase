import { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { NAV_ITEMS } from '../../data/sampleData'
import { initSmoothWheelScroll, smoothScrollTo } from '../../utils/smoothScroll'

export function PageLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState('overview')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Slower wheel / trackpad page scroll so browsing top → bottom feels calmer.
    return initSmoothWheelScroll({ speed: 0.38, friction: 0.085 })
  }, [])

  const navigateTo = (id) => {
    const navbar = document.querySelector('.acme-navbar')
    const offset = (navbar?.offsetHeight || 64) + 16
    setActiveId(id)
    smoothScrollTo(id, { duration: 1100, offset })
  }

  const filteredChildren =
    typeof children === 'function'
      ? children({ searchValue })
      : children

  return (
    <div style={{ minHeight: '100vh', background: 'var(--acme-bg)' }}>
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Sidebar
          activeId={activeId}
          onNavigate={navigateTo}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <main className="page-content" style={{ flex: 1, minWidth: 0, padding: '32px 28px 80px' }}>
          {filteredChildren}
        </main>
      </div>
    </div>
  )
}
