export function TypographyShowcase() {
  return (
    <section id="typography" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Typography</h2>
        <p className="showcase-section__desc">
          Rubik is the primary ACME UI typeface. Roboto Slab is available as an alternate display option.
        </p>
      </div>

      <div className="showcase-grid showcase-grid--2">
        <div className="showcase-panel">
          <div className="showcase-block">
            <p className="showcase-block__title">Headings</p>
            <div className="typo-sample">
              <h1>Heading H1</h1>
              <p className="typo-meta">2.25rem / Bold / -0.03em</p>
            </div>
            <div className="typo-sample">
              <h2>Heading H2</h2>
              <p className="typo-meta">1.875rem / Bold</p>
            </div>
            <div className="typo-sample">
              <h3>Heading H3</h3>
              <p className="typo-meta">1.5rem / Semibold</p>
            </div>
            <div className="typo-sample">
              <h4>Heading H4</h4>
              <p className="typo-meta">1.25rem / Semibold</p>
            </div>
          </div>
        </div>

        <div className="showcase-panel">
          <div className="showcase-block">
            <p className="showcase-block__title">Section & card titles</p>
            <p style={{ fontSize: 'var(--acme-fs-xl)', fontWeight: 700, margin: '0 0 8px' }}>Section heading</p>
            <p style={{ fontSize: 'var(--acme-fs-md)', fontWeight: 600, margin: '0 0 16px' }}>Card heading</p>
            <p className="showcase-block__title">Body & supporting text</p>
            <p style={{ margin: '0 0 8px' }}>
              Body text — Primary interface copy for descriptions and content blocks.
            </p>
            <p style={{ margin: '0 0 8px', color: 'var(--acme-text-secondary)' }}>
              Secondary text — Supporting details and metadata.
            </p>
            <p style={{ margin: '0 0 8px', fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
              Small text — Captions, timestamps, and helper lines.
            </p>
            <label className="acme-label" style={{ display: 'block', marginBottom: 8 }}>
              Form label
            </label>
            <p style={{ margin: 0 }}>
              <a href="#typography">Inline link example</a>
            </p>
          </div>
        </div>
      </div>

      <div className="showcase-panel" style={{ marginTop: 16 }}>
        <p className="showcase-block__title">Weights & sizes</p>
        <div className="showcase-row">
          <span style={{ fontWeight: 400 }}>Regular 400</span>
          <span style={{ fontWeight: 500 }}>Medium 500</span>
          <span style={{ fontWeight: 600 }}>Semibold 600</span>
          <span style={{ fontWeight: 700 }}>Bold 700</span>
        </div>
        <div className="showcase-row" style={{ marginTop: 16 }}>
          <span style={{ fontSize: 'var(--acme-fs-xs)' }}>XS 12px</span>
          <span style={{ fontSize: 'var(--acme-fs-sm)' }}>SM 14px</span>
          <span style={{ fontSize: 'var(--acme-fs-base)' }}>Base 16px</span>
          <span style={{ fontSize: 'var(--acme-fs-md)' }}>MD 18px</span>
          <span style={{ fontSize: 'var(--acme-fs-lg)' }}>LG 20px</span>
          <span style={{ fontSize: 'var(--acme-fs-xl)' }}>XL 24px</span>
        </div>
      </div>

      <div className="showcase-panel" style={{ marginTop: 16 }}>
        <p className="showcase-block__title">Primary vs alternate</p>
        <p style={{ margin: '0 0 8px', fontFamily: 'var(--acme-font)', fontSize: '1.25rem', fontWeight: 600 }}>
          Rubik — primary ACME UI font
        </p>
        <p style={{ margin: 0, fontFamily: 'var(--acme-font-alt)', fontSize: '1.25rem', fontWeight: 600 }}>
          Roboto Slab — alternate display option
        </p>
      </div>
    </section>
  )
}
