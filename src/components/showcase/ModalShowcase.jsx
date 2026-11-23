import { useState } from 'react'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { useToast } from '../../hooks/useToast'

export function ModalShowcase() {
  const { showToast } = useToast()
  const [open, setOpen] = useState(null)
  const [formName, setFormName] = useState('')

  const close = () => setOpen(null)

  return (
    <section id="modals" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Modals & Dialogs</h2>
        <p className="showcase-section__desc">
          Overlay dialogs with Escape and outside-click support for confirmations and forms.
        </p>
      </div>

      <div className="showcase-row">
        <Button onClick={() => setOpen('basic')}>Basic modal</Button>
        <Button variant="secondary" onClick={() => setOpen('confirm')}>
          Confirmation
        </Button>
        <Button variant="danger" onClick={() => setOpen('delete')}>
          Delete confirmation
        </Button>
        <Button variant="success" onClick={() => setOpen('success')}>
          Success modal
        </Button>
        <Button variant="outline" onClick={() => setOpen('info')}>
          Information modal
        </Button>
        <Button variant="ghost" onClick={() => setOpen('form')}>
          Form modal
        </Button>
        <Button size="sm" onClick={() => setOpen('sm')}>
          Small
        </Button>
        <Button size="sm" onClick={() => setOpen('md')}>
          Medium
        </Button>
        <Button size="sm" onClick={() => setOpen('lg')}>
          Large
        </Button>
      </div>

      <Modal
        open={open === 'basic'}
        onClose={close}
        title="Basic modal"
        footer={<Button onClick={close}>Close</Button>}
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>
          A simple dialog for short messages and secondary content.
        </p>
      </Modal>

      <Modal
        open={open === 'confirm'}
        onClose={close}
        title="Confirm action"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                showToast({ type: 'success', title: 'Confirmed' })
                close()
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>Do you want to continue with this action?</p>
      </Modal>

      <Modal
        open={open === 'delete'}
        onClose={close}
        title="Delete confirmation"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                showToast({ type: 'success', title: 'Deleted', message: 'Item removed from demo state.' })
                close()
              }}
            >
              Confirm Delete
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>
          This will permanently remove the selected demo item.
        </p>
      </Modal>

      <Modal
        open={open === 'success'}
        onClose={close}
        title="Success"
        size="sm"
        footer={<Button variant="success" onClick={close}>Done</Button>}
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>The operation completed successfully.</p>
      </Modal>

      <Modal
        open={open === 'info'}
        onClose={close}
        title="Information"
        size="sm"
        footer={<Button variant="outline" onClick={close}>Got it</Button>}
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>
          Use information modals for guidance that does not require a destructive decision.
        </p>
      </Modal>

      <Modal
        open={open === 'form'}
        onClose={close}
        title="Form modal"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!formName.trim()) {
                  showToast({ type: 'error', title: 'Name required' })
                  return
                }
                showToast({ type: 'success', title: 'Saved', message: `${formName} was saved.` })
                setFormName('')
                close()
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <Input
          label="Display name"
          required
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter a name"
        />
      </Modal>

      <Modal open={open === 'sm'} onClose={close} title="Small modal" size="sm" footer={<Button onClick={close}>Close</Button>}>
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>max-width: 400px</p>
      </Modal>
      <Modal open={open === 'md'} onClose={close} title="Medium modal" size="md" footer={<Button onClick={close}>Close</Button>}>
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>max-width: 560px</p>
      </Modal>
      <Modal open={open === 'lg'} onClose={close} title="Large modal" size="lg" footer={<Button onClick={close}>Close</Button>}>
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>max-width: 720px</p>
      </Modal>
    </section>
  )
}
