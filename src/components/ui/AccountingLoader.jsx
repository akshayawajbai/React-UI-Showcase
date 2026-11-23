export function AccountingLoader({
  label = 'Preparing accounting data…',
  sublabel = 'Syncing ledgers, invoices, and balances',
  size = 'md',
  className = '',
}) {
  return (
    <div className={`acme-accounting-loader acme-accounting-loader--${size} ${className}`.trim()} role="status" aria-live="polite">
      <div className="acme-accounting-loader__visual" aria-hidden="true">
        <div className="acme-accounting-loader__ledger">
          <span className="acme-accounting-loader__line" />
          <span className="acme-accounting-loader__line" />
          <span className="acme-accounting-loader__line" />
          <span className="acme-accounting-loader__line" />
        </div>
        <div className="acme-accounting-loader__coin acme-accounting-loader__coin--a">₹</div>
        <div className="acme-accounting-loader__coin acme-accounting-loader__coin--b">$</div>
        <div className="acme-accounting-loader__ring" />
      </div>
      {(label || sublabel) && (
        <div className="acme-accounting-loader__copy">
          {label && <p className="acme-accounting-loader__label">{label}</p>}
          {sublabel && <p className="acme-accounting-loader__sublabel">{sublabel}</p>}
        </div>
      )}
    </div>
  )
}
