import { Button } from '../ui/Button'
import { useToast } from '../../hooks/useToast'

export function ToastShowcase() {
  const { showToast } = useToast()

  return (
    <section id="toasts" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Toast Notifications</h2>
        <p className="showcase-section__desc">
          Transient feedback with auto-dismiss, close actions, and entrance/exit animation.
        </p>
      </div>

      <div className="showcase-panel">
        <div className="showcase-row">
          <Button
            variant="success"
            onClick={() =>
              showToast({
                type: 'success',
                title: 'Success',
                message: 'Your changes were saved successfully.',
              })
            }
          >
            Success toast
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showToast({
                type: 'error',
                title: 'Error',
                message: 'Unable to complete the requested action.',
              })
            }
          >
            Error toast
          </Button>
          <Button
            variant="warning"
            onClick={() =>
              showToast({
                type: 'warning',
                title: 'Warning',
                message: 'Please review required fields before continuing.',
              })
            }
          >
            Warning toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showToast({
                type: 'info',
                title: 'Information',
                message: 'New design tokens are available in this showcase.',
              })
            }
          >
            Information toast
          </Button>
        </div>
      </div>
    </section>
  )
}
