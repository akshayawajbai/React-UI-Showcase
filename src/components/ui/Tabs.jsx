export function Tabs({ tabs = [], activeId, onChange, orientation = 'horizontal' }) {
  return (
    <div
      className={`acme-tabs ${orientation === 'vertical' ? 'acme-tabs--vertical' : ''}`}
      role="tablist"
      aria-orientation={orientation}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeId === tab.id}
          className={`acme-tabs__tab ${activeId === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange?.(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
