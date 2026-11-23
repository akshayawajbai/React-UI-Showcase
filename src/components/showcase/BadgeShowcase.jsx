import { Badge } from '../ui/Badge'

const STATUSES = [
  { status: 'active', label: 'Active' },
  { status: 'inactive', label: 'Inactive' },
  { status: 'pending', label: 'Pending' },
  { status: 'approved', label: 'Approved' },
  { status: 'rejected', label: 'Rejected' },
  { status: 'draft', label: 'Draft' },
  { status: 'completed', label: 'Completed' },
  { status: 'warning', label: 'Warning' },
  { status: 'error', label: 'Error' },
]

export function BadgeShowcase() {
  return (
    <section id="badges" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Badges</h2>
        <p className="showcase-section__desc">
          Compact status indicators with optional dots and multiple sizes.
        </p>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Status badges</p>
        <div className="showcase-row">
          {STATUSES.map((item) => (
            <Badge key={item.status} status={item.status} dot>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Sizes</p>
        <div className="showcase-row">
          <Badge status="approved" size="sm">
            Small
          </Badge>
          <Badge status="pending" size="md">
            Medium
          </Badge>
          <Badge status="info" size="lg">
            Large
          </Badge>
          <Badge status="active" size="md">
            Without dot
          </Badge>
          <Badge status="error" size="md" dot>
            With dot
          </Badge>
        </div>
      </div>
    </section>
  )
}
