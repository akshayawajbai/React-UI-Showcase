import { useMemo, useState } from 'react'
import { ArrowDownUp, Download, Eye, FileSpreadsheet, FileText, MoreVertical, Pencil, Plus, Printer, Search, Trash2 } from 'lucide-react'
import { INITIAL_RECORDS, CATEGORY_OPTIONS } from '../../data/sampleData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { CustomSelect } from '../ui/CustomSelect'
import { DatePicker } from '../ui/DatePicker'
import { Avatar } from '../ui/Avatar'
import { Modal } from '../ui/Modal'
import { Pagination } from '../ui/Pagination'
import { EmptyState } from '../ui/EmptyState'
import { TableSkeleton } from '../ui/Skeleton'
import { Dropdown, DropdownItem } from '../ui/Dropdown'
import { Tooltip } from '../ui/Tooltip'
import { useToast } from '../../hooks/useToast'

const PAGE_SIZE = 4

const STATUS_MAP = {
  active: 'active',
  inactive: 'inactive',
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  draft: 'draft',
  completed: 'completed',
  warning: 'warning',
  error: 'error',
}

function statusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function TableShowcase() {
  const { showToast } = useToast()
  const [records, setRecords] = useState(INITIAL_RECORDS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortKey, setSortKey] = useState('createdDate')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)
  const [form, setForm] = useState({ id: '', name: '', category: '', status: 'active', createdDate: '' })

  const filtered = useMemo(() => {
    let list = [...records]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q),
      )
    }
    if (category) list = list.filter((r) => r.category === category)
    list.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [records, search, category, sortKey, sortDir])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (pageItems.every((r) => selected.includes(r.id))) {
      setSelected((prev) => prev.filter((id) => !pageItems.some((r) => r.id === id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...pageItems.map((r) => r.id)])])
    }
  }

  const openAdd = () => {
    const nextId = `REC-${1000 + records.length + 1}`
    setForm({
      id: nextId,
      name: '',
      category: CATEGORY_OPTIONS[0],
      status: 'draft',
      createdDate: new Date().toISOString().slice(0, 10),
    })
    setEditOpen(true)
    showToast({
      type: 'info',
      title: 'Add record',
      message: 'Fill in the form to create a new sample record.',
    })
  }

  const openEdit = (record) => {
    setForm({ ...record })
    setEditOpen(true)
  }

  const saveRecord = () => {
    if (!form.name.trim()) {
      showToast({ type: 'error', title: 'Name required', message: 'Please enter a name.' })
      return
    }
    setRecords((prev) => {
      const exists = prev.some((r) => r.id === form.id)
      if (exists) return prev.map((r) => (r.id === form.id ? { ...form } : r))
      return [{ ...form }, ...prev]
    })
    setEditOpen(false)
    showToast({
      type: 'success',
      title: records.some((r) => r.id === form.id) ? 'Updated' : 'Added',
      message: `${form.name} saved successfully.`,
    })
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setRecords((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    setSelected((prev) => prev.filter((id) => id !== deleteTarget.id))
    showToast({ type: 'success', title: 'Deleted', message: `${deleteTarget.name} was removed.` })
    setDeleteTarget(null)
  }

  const exportCsv = () => {
    const header = ['ID', 'Name', 'Category', 'Status', 'Created Date']
    const rows = filtered.map((r) => [r.id, r.name, r.category, r.status, r.createdDate])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'acme-table-export.csv'
    link.click()
    URL.revokeObjectURL(url)
    showToast({ type: 'success', title: 'Excel export', message: `${filtered.length} row(s) downloaded.` })
  }

  const exportPdf = () => {
    const body = filtered
      .map((r) => `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.category}</td><td>${r.status}</td><td>${r.createdDate}</td></tr>`)
      .join('')
    const html = `<!doctype html><html><head><title>ACME Table Export</title>
      <style>body{font-family:Arial,sans-serif;padding:32px}h1{font-size:18px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:8px;text-align:left}</style>
      </head><body><h1>ACME Records</h1><table><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Status</th><th>Created Date</th></tr></thead><tbody>${body}</tbody></table><script>window.print()<\/script></body></html>`
    const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700')
    if (!popup) {
      showToast({ type: 'error', title: 'PDF blocked', message: 'Allow pop-ups to print this table as PDF.' })
      return
    }
    popup.document.write(html)
    popup.document.close()
    showToast({ type: 'info', title: 'PDF export', message: 'Print dialog opened. Choose Save as PDF.' })
  }

  const simulateLoading = () => {
    setLoadingTable(true)
    showToast({
      type: 'info',
      title: 'Loading table',
      message: 'Table skeleton is loading…',
    })
    setTimeout(() => {
      setLoadingTable(false)
      showToast({
        type: 'success',
        title: 'Table ready',
        message: 'Table data finished loading.',
      })
    }, 1600)
  }

  return (
    <section id="tables" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Tables</h2>
        <p className="showcase-section__desc">
          Professional data tables with search, sort, filter, pagination, and CRUD demos.
        </p>
      </div>

      <div className="showcase-block">
        <p className="showcase-block__title">Style variants</p>
        <div className="showcase-grid showcase-grid--2">
          <div className="acme-table-wrap">
            <table className="acme-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 3).map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>
                      <Badge status={STATUS_MAP[r.status] || 'info'} size="sm" dot>
                        {statusLabel(r.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="acme-table-wrap">
            <table className="acme-table acme-table--striped acme-table--hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 3).map((r) => (
                  <tr key={`stripe-${r.id}`}>
                    <td>{r.name}</td>
                    <td>{r.category}</td>
                    <td>
                      <span className="acme-cell-user">
                        <Avatar name={r.name} size="sm" />
                        {r.name.split(' ')[0]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="acme-table-wrap">
            <table className="acme-table acme-table--bordered acme-table--compact">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Created</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 3).map((r) => (
                  <tr key={`border-${r.id}`}>
                    <td>{r.id}</td>
                    <td>{r.createdDate}</td>
                    <td>{r.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="showcase-panel">
            <p className="showcase-block__title">Empty / loading demos</p>
            <div className="showcase-row" style={{ marginBottom: 12 }}>
              <Button size="sm" variant="outline" onClick={simulateLoading}>
                Show loading skeleton
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setShowEmpty((v) => !v)}>
                Toggle empty state
              </Button>
            </div>
            {loadingTable ? (
              <TableSkeleton rows={4} />
            ) : showEmpty ? (
              <EmptyState
                title="No records found"
                description="Try adjusting filters or add a new sample record."
                actionLabel="Add record"
                onAction={openAdd}
              />
            ) : (
              <p style={{ margin: 0, fontSize: 'var(--acme-fs-sm)', color: 'var(--acme-text-secondary)' }}>
                Use the interactive table below for full CRUD behavior.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="showcase-panel">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, alignItems: 'end' }}>
          <div style={{ flex: '1 1 220px' }}>
            <Input
              label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              leftIcon={<Search size={16} />}
              placeholder="Search by ID, name, status..."
            />
          </div>
          <div style={{ flex: '1 1 180px' }}>
            <CustomSelect
              label="Filter category"
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={(v) => {
                setCategory(v)
                setPage(1)
              }}
              placeholder="All categories"
            />
          </div>
          <Button leftIcon={<Plus size={16} />} onClick={openAdd}>
            Add
          </Button>
          <Button variant="success" leftIcon={<FileSpreadsheet size={16} />} onClick={exportCsv}>
            Excel
          </Button>
          <Button variant="warning" leftIcon={<FileText size={16} />} onClick={exportPdf}>
            PDF
          </Button>
          <Tooltip content="Excel">
            <Button size="sm" iconOnly variant="success" aria-label="Export Excel" onClick={exportCsv}>
              <FileSpreadsheet size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="PDF">
            <Button size="sm" iconOnly variant="warning" aria-label="Export PDF" onClick={exportPdf}>
              <FileText size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Download">
            <Button size="sm" iconOnly variant="secondary" aria-label="Download" onClick={exportCsv}>
              <Download size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Print">
            <Button size="sm" iconOnly variant="outline" aria-label="Print" onClick={exportPdf}>
              <Printer size={16} />
            </Button>
          </Tooltip>
        </div>

        <div className="acme-table-wrap">
          <table className="acme-table acme-table--hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    aria-label="Select all on page"
                    checked={pageItems.length > 0 && pageItems.every((r) => selected.includes(r.id))}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="sortable" onClick={() => toggleSort('id')}>
                  ID <ArrowDownUp size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </th>
                <th className="sortable" onClick={() => toggleSort('name')}>
                  Name <ArrowDownUp size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </th>
                <th className="sortable" onClick={() => toggleSort('category')}>
                  Category
                </th>
                <th>Status</th>
                <th className="sortable" onClick={() => toggleSort('createdDate')}>
                  Created Date
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState title="No matching records" description="Clear search or filters to see results." />
                  </td>
                </tr>
              ) : (
                pageItems.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Select ${record.name}`}
                        checked={selected.includes(record.id)}
                        onChange={() => toggleSelect(record.id)}
                      />
                    </td>
                    <td>{record.id}</td>
                    <td>
                      <span className="acme-cell-user">
                        <Avatar name={record.name} size="sm" />
                        {record.name}
                      </span>
                    </td>
                    <td>{record.category}</td>
                    <td>
                      <Badge status={STATUS_MAP[record.status] || 'info'} size="sm" dot>
                        {statusLabel(record.status)}
                      </Badge>
                    </td>
                    <td>{record.createdDate}</td>
                    <td>
                      <Dropdown
                        align="right"
                        open={openMenuId === record.id}
                        onOpenChange={(next) => setOpenMenuId(next ? record.id : null)}
                        trigger={
                          <Button
                            size="sm"
                            variant="ghost"
                            iconOnly
                            aria-label={`Actions for ${record.name}`}
                            aria-haspopup="menu"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        }
                      >
                        {({ close }) => (
                          <>
                            <DropdownItem
                              icon={<Eye size={14} />}
                              onClick={() => {
                                setViewTarget(record)
                                close()
                                setOpenMenuId(null)
                              }}
                            >
                              View
                            </DropdownItem>
                            <DropdownItem
                              icon={<Pencil size={14} />}
                              onClick={() => {
                                openEdit(record)
                                close()
                                setOpenMenuId(null)
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              danger
                              icon={<Trash2 size={14} />}
                              onClick={() => {
                                setDeleteTarget(record)
                                close()
                                setOpenMenuId(null)
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </>
                        )}
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, flexWrap: 'wrap', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 'var(--acme-fs-xs)', color: 'var(--acme-text-secondary)' }}>
            {filtered.length} record(s) · {selected.length} selected
          </p>
          <Pagination page={Math.min(page, pageCount)} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={records.some((r) => r.id === form.id) ? 'Edit record' : 'Add record'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveRecord}>{records.some((r) => r.id === form.id) ? 'Update' : 'Save'}</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gap: 14 }}>
          <Input label="ID" value={form.id} readOnly />
          <Input label="Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <CustomSelect
            label="Category"
            options={CATEGORY_OPTIONS}
            value={form.category}
            onChange={(v) => setForm((f) => ({ ...f, category: v }))}
          />
          <CustomSelect
            label="Status"
            options={Object.keys(STATUS_MAP)}
            value={form.status}
            onChange={(v) => setForm((f) => ({ ...f, status: v }))}
          />
          <DatePicker
            label="Created Date"
            value={form.createdDate}
            onChange={(v) => setForm((f) => ({ ...f, createdDate: v }))}
          />
        </div>
      </Modal>

      <Modal
        open={Boolean(viewTarget)}
        onClose={() => setViewTarget(null)}
        title="View record"
        size="sm"
        footer={
          <Button variant="primary" onClick={() => setViewTarget(null)}>
            Close
          </Button>
        }
      >
        {viewTarget && (
          <div style={{ display: 'grid', gap: 8, fontSize: 'var(--acme-fs-sm)' }}>
            <p style={{ margin: 0 }}><strong>ID:</strong> {viewTarget.id}</p>
            <p style={{ margin: 0 }}><strong>Name:</strong> {viewTarget.name}</p>
            <p style={{ margin: 0 }}><strong>Category:</strong> {viewTarget.category}</p>
            <p style={{ margin: 0 }}><strong>Status:</strong> {statusLabel(viewTarget.status)}</p>
            <p style={{ margin: 0 }}><strong>Created:</strong> {viewTarget.createdDate}</p>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm delete"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--acme-text-secondary)' }}>
          Delete <strong>{deleteTarget?.name}</strong>? This demo action removes the record from local state only.
        </p>
      </Modal>
    </section>
  )
}
