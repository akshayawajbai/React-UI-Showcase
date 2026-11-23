import { useState } from 'react'
import {
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Pencil,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'
import { useToast } from '../../hooks/useToast'
import { Modal } from '../ui/Modal'

export function ButtonShowcase() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [openDemo, setOpenDemo] = useState(false)

  const exportExcel = () => {
    const csv = '"Action","Status"\n"Sample record","Ready"\n'
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'acme-export.csv'
    link.click()
    URL.revokeObjectURL(url)
    showToast({ type: 'success', title: 'Excel export', message: 'Spreadsheet file downloaded.' })
  }

  const exportPdf = () => {
    const html = `<!doctype html><html><head><title>ACME Export</title>
      <style>body{font-family:Arial,sans-serif;padding:32px}h1{font-size:18px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:8px}</style>
      </head><body><h1>ACME Export</h1><table><tr><th>Action</th><th>Status</th></tr><tr><td>Sample record</td><td>Ready</td></tr></table><script>window.print()<\/script></body></html>`
    const popup = window.open('', '_blank', 'noopener,noreferrer,width=720,height=640')
    if (!popup) {
      showToast({ type: 'error', title: 'PDF blocked', message: 'Allow pop-ups to print this as PDF.' })
      return
    }
    popup.document.write(html)
    popup.document.close()
    showToast({ type: 'info', title: 'PDF export', message: 'Print dialog opened. Choose Save as PDF.' })
  }

  const runLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast({ type: 'success', title: 'Refreshed', message: 'Content reloaded successfully.' })
    }, 1500)
  }

  return (
    <section id="buttons" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Buttons</h2>
        <p className="showcase-section__desc">
          Action patterns with consistent heights, variants, icons, and loading states.
        </p>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Variants</p>
        <div className="showcase-row">
          <Button variant="primary" onClick={() => showToast({ type: 'success', title: 'Primary', message: 'Primary action fired.' })}>
            Primary
          </Button>
          <Button variant="secondary" onClick={() => showToast({ type: 'info', title: 'Secondary', message: 'Secondary action fired.' })}>
            Secondary
          </Button>
          <Button variant="outline" onClick={() => showToast({ type: 'info', title: 'Outline', message: 'Outline action fired.' })}>
            Outline
          </Button>
          <Button variant="ghost" onClick={() => showToast({ type: 'info', title: 'Ghost', message: 'Ghost action fired.' })}>
            Ghost
          </Button>
          <Button variant="text" onClick={() => showToast({ type: 'info', title: 'Text', message: 'Text action fired.' })}>
            Text
          </Button>
          <Button variant="success" onClick={() => showToast({ type: 'success', title: 'Success', message: 'Completed successfully.' })}>
            Success
          </Button>
          <Button variant="warning" onClick={() => showToast({ type: 'warning', title: 'Warning', message: 'Please review before continuing.' })}>
            Warning
          </Button>
          <Button variant="danger" onClick={() => showToast({ type: 'error', title: 'Danger', message: 'Destructive action triggered.' })}>
            Danger
          </Button>
        </div>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Sizes & states</p>
        <div className="showcase-row">
          <Button size="sm" onClick={() => showToast({ type: 'info', title: 'Small', message: 'Small button size selected.' })}>
            Small
          </Button>
          <Button size="md" onClick={() => showToast({ type: 'info', title: 'Medium', message: 'Medium button size selected.' })}>
            Medium
          </Button>
          <Button size="lg" onClick={() => showToast({ type: 'info', title: 'Large', message: 'Large button size selected.' })}>
            Large
          </Button>
          <Button leftIcon={<Save size={16} />} onClick={() => showToast({ type: 'success', title: 'Saved', message: 'Changes were saved.' })}>
            Save
          </Button>
          <Button rightIcon={<Download size={16} />} variant="outline" onClick={() => showToast({ type: 'info', title: 'Download', message: 'Download started.' })}>
            Download
          </Button>
          <Button iconOnly aria-label="Edit" variant="ghost" onClick={() => showToast({ type: 'info', title: 'Edit', message: 'Edit mode enabled.' })}>
            <Pencil size={16} />
          </Button>
          <Button loading={loading} leftIcon={<RefreshCw size={16} />} onClick={runLoading}>
            Refresh
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Common actions</p>
        <div className="showcase-row">
          <Button leftIcon={<Plus size={16} />} onClick={() => showToast({ type: 'success', title: 'Add', message: 'Item added to the demo list.' })}>
            Add
          </Button>
          <Button variant="secondary" leftIcon={<Pencil size={16} />} onClick={() => showToast({ type: 'info', title: 'Edit', message: 'Editable fields unlocked.' })}>
            Edit
          </Button>
          <Button variant="outline" onClick={() => showToast({ type: 'success', title: 'Update', message: 'Record updated.' })}>
            Update
          </Button>
          <Button variant="danger" leftIcon={<Trash2 size={16} />} onClick={() => showToast({ type: 'warning', title: 'Delete', message: 'Open a confirmation before deleting.' })}>
            Delete
          </Button>
          <Button variant="ghost" leftIcon={<Eye size={16} />} onClick={() => setOpenDemo(true)}>
            Open / View
          </Button>
          <Button variant="secondary" leftIcon={<X size={16} />} onClick={() => showToast({ type: 'info', title: 'Cancelled', message: 'Action cancelled.' })}>
            Cancel
          </Button>
          <Button onClick={() => showToast({ type: 'success', title: 'Submitted', message: 'Form submitted successfully.' })}>
            Submit
          </Button>
          <Button variant="outline" onClick={() => showToast({ type: 'info', title: 'Closed', message: 'Panel closed.' })}>
            Close
          </Button>
          <Button variant="ghost" onClick={() => showToast({ type: 'warning', title: 'Removed', message: 'Selected item removed.' })}>
            Remove
          </Button>
          <Button variant="success" leftIcon={<FileSpreadsheet size={16} />} onClick={exportExcel}>
            Excel
          </Button>
          <Button variant="warning" leftIcon={<FileText size={16} />} onClick={exportPdf}>
            PDF
          </Button>
        </div>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Icon-only actions</p>
        <div className="showcase-row">
          <Tooltip content="View">
            <Button size="sm" iconOnly variant="ghost" aria-label="View" onClick={() => showToast({ type: 'info', title: 'View', message: 'Record opened.' })}>
              <Eye size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Edit">
            <Button size="sm" iconOnly variant="outline" aria-label="Edit" onClick={() => showToast({ type: 'info', title: 'Edit', message: 'Edit mode enabled.' })}>
              <Pencil size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Delete">
            <Button size="sm" iconOnly variant="danger" aria-label="Delete" onClick={() => showToast({ type: 'warning', title: 'Delete', message: 'Delete requested.' })}>
              <Trash2 size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Excel">
            <Button size="sm" iconOnly variant="success" aria-label="Export Excel" onClick={exportExcel}>
              <FileSpreadsheet size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="PDF">
            <Button size="sm" iconOnly variant="warning" aria-label="Export PDF" onClick={exportPdf}>
              <FileText size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Download">
            <Button size="sm" iconOnly variant="secondary" aria-label="Download" onClick={exportExcel}>
              <Download size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Print">
            <Button size="sm" iconOnly variant="outline" aria-label="Print" onClick={exportPdf}>
              <Printer size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Modal
        open={openDemo}
        onClose={() => setOpenDemo(false)}
        title="View sample"
        size="sm"
        footer={
          <Button variant="primary" onClick={() => setOpenDemo(false)}>
            Close
          </Button>
        }
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>
          This modal demonstrates the Open / View button interaction used throughout the showcase.
        </p>
      </Modal>
    </section>
  )
}
