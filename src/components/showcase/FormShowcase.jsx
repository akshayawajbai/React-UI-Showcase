import { useState } from 'react'
import { Folder, Lock, Mail, Search, Settings, User } from 'lucide-react'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Select'
import { CustomSelect } from '../ui/CustomSelect'
import { MultiSelect } from '../ui/MultiSelect'
import { DatePicker } from '../ui/DatePicker'
import { TagsInput } from '../ui/TagsInput'
import { Toggle } from '../ui/Toggle'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useToast } from '../../hooks/useToast'
import { CATEGORY_OPTIONS, MULTI_SELECT_OPTIONS } from '../../data/sampleData'

const emptyForm = {
  name: '',
  email: '',
  password: '',
  amount: '',
  notes: '',
  category: '',
  tags: [],
  notify: true,
  plan: 'standard',
  startDate: '',
  agree: false,
}

const ICON_OPTIONS = [
  { value: 'user', label: 'User profile', icon: <User size={14} /> },
  { value: 'folder', label: 'Workspace', icon: <Folder size={14} /> },
  { value: 'settings', label: 'Settings', icon: <Settings size={14} /> },
]

const GROUPED_OPTIONS = [
  {
    label: 'Finance',
    options: ['Invoices', 'Payments', 'Budgets'],
  },
  {
    label: 'Operations',
    options: ['Inventory', 'Vendors', 'Logistics'],
  },
]

export function FormShowcase({ onExternalSubmit }) {
  const { showToast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [mode, setMode] = useState('add')
  const [errors, setErrors] = useState({})
  const [newsletter, setNewsletter] = useState(true)
  const [basicSelect, setBasicSelect] = useState('')
  const [searchSelect, setSearchSelect] = useState('')
  const [iconSelect, setIconSelect] = useState('')
  const [groupedSelect, setGroupedSelect] = useState('')
  const [galleryDate, setGalleryDate] = useState('')
  const [galleryTags, setGalleryTags] = useState(['Dashboard', 'Reports'])
  const [basicMulti, setBasicMulti] = useState(['Dashboard'])
  const [searchMulti, setSearchMulti] = useState([])
  const [groupedMulti, setGroupedMulti] = useState([])

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.category) next.category = 'Select a category.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleAdd = () => {
    setMode('add')
    setForm(emptyForm)
    setErrors({})
    showToast({ type: 'info', title: 'Add mode', message: 'Form cleared for a new record.' })
  }

  const handleEdit = () => {
    setMode('edit')
    setForm({
      name: 'Northwind Supplies',
      email: 'ops@northwind.example',
      password: '••••••••',
      amount: '1250',
      notes: 'Preferred vendor for quarterly restock.',
      category: 'Operations',
      tags: ['Dashboard', 'Reports'],
      notify: true,
      plan: 'premium',
      startDate: '2026-03-01',
      agree: true,
    })
    showToast({ type: 'info', title: 'Edit mode', message: 'Sample record loaded into the form.' })
  }

  const handleSave = () => {
    if (!validate()) {
      showToast({ type: 'error', title: 'Validation failed', message: 'Please correct the highlighted fields.' })
      return
    }
    onExternalSubmit?.(form)
    showToast({
      type: 'success',
      title: mode === 'edit' ? 'Updated' : 'Saved',
      message: mode === 'edit' ? 'Record updated successfully.' : 'Record saved successfully.',
    })
    if (mode === 'add') setForm(emptyForm)
    setMode('add')
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setErrors({})
    setMode('add')
    showToast({ type: 'warning', title: 'Cancelled', message: 'Form changes were discarded.' })
  }

  return (
    <section id="forms" className="showcase-section">
      <div className="showcase-section__header">
        <h2 className="showcase-section__title">Form Elements</h2>
        <p className="showcase-section__desc">
          Custom dropdowns, date pickers, tags, multi-selects, and validation patterns for ACME forms.
        </p>
      </div>

      <div className="showcase-grid showcase-grid--2">
        <Card title="Input gallery">
          <div style={{ display: 'grid', gap: 16 }}>
            <Input name="gallery-text" label="Text" placeholder="Enter full name" leftIcon={<User size={16} />} />
            <Input name="gallery-email" label="Email" type="email" placeholder="name@company.com" leftIcon={<Mail size={16} />} />
            <Input name="gallery-password" label="Password" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} />
            <Input name="gallery-number" label="Number" type="number" placeholder="0" />
            <Input name="gallery-search" label="Search" type="search" placeholder="Search records" leftIcon={<Search size={16} />} />
            <Textarea name="gallery-notes" label="Textarea" placeholder="Additional notes" />

            <CustomSelect
              label="Basic custom dropdown"
              options={CATEGORY_OPTIONS}
              value={basicSelect}
              onChange={setBasicSelect}
              searchable={false}
            />
            <CustomSelect
              label="Searchable dropdown"
              options={CATEGORY_OPTIONS}
              value={searchSelect}
              onChange={setSearchSelect}
              searchable
            />
            <CustomSelect
              label="Dropdown with icons"
              options={ICON_OPTIONS}
              value={iconSelect}
              onChange={setIconSelect}
            />
            <CustomSelect
              label="Grouped options"
              options={GROUPED_OPTIONS}
              value={groupedSelect}
              onChange={setGroupedSelect}
            />
            <CustomSelect label="Disabled dropdown" options={CATEGORY_OPTIONS} value="Operations" disabled />

            <DatePicker label="Custom date picker" value={galleryDate} onChange={setGalleryDate} />

            <TagsInput
              label="Tags"
              value={galleryTags}
              onChange={setGalleryTags}
              helperText="Press Enter to add. Backspace removes the last tag."
            />

            <MultiSelect
              label="Basic multi-select"
              options={MULTI_SELECT_OPTIONS}
              value={basicMulti}
              onChange={setBasicMulti}
              searchable={false}
            />
            <MultiSelect
              label="Searchable multi-select"
              options={MULTI_SELECT_OPTIONS}
              value={searchMulti}
              onChange={setSearchMulti}
            />
            <MultiSelect
              label="Grouped multi-select with chips"
              options={GROUPED_OPTIONS}
              value={groupedMulti}
              onChange={setGroupedMulti}
              helperText="Selected values appear as removable chips."
            />

            <label className="acme-check">
              <input type="checkbox" defaultChecked /> Remember preferences
            </label>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <label className="acme-radio">
                <input type="radio" name="demo-plan" defaultChecked /> Standard
              </label>
              <label className="acme-radio">
                <input type="radio" name="demo-plan" /> Premium
              </label>
            </div>
            <Toggle checked={newsletter} onChange={setNewsletter} label="Email notifications" />
            <Input name="gallery-disabled" label="Disabled input" value="Cannot edit" disabled onChange={() => {}} />
            <Input name="gallery-readonly" label="Read-only input" value="Read only value" readOnly onChange={() => {}} />
            <Input name="gallery-required" label="Required input" required placeholder="Required field" />
            <Input name="gallery-error" label="Error state" error="This field has an error." defaultValue="Invalid value" />
            <Input name="gallery-success" label="Success state" success="Looks good." defaultValue="Valid value" />
            <Input name="gallery-helper" label="With helper text" helperText="Use your work email address." placeholder="email@acme.com" />
          </div>
        </Card>

        <Card
          title="Working demo form"
          subtitle={mode === 'edit' ? 'Editing sample record' : 'Create or update a sample record'}
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <Input
              name="demo-name"
              label="Name"
              required
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              error={errors.name}
              leftIcon={<User size={16} />}
            />
            <Input
              name="demo-email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              error={errors.email}
              leftIcon={<Mail size={16} />}
            />
            <Input
              name="demo-password"
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              leftIcon={<Lock size={16} />}
            />
            <Input
              name="demo-amount"
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => setField('amount', e.target.value)}
            />
            <CustomSelect
              name="demo-category"
              label="Category"
              required
              options={CATEGORY_OPTIONS}
              value={form.category}
              onChange={(v) => setField('category', v)}
              error={errors.category}
            />
            <TagsInput label="Tags" value={form.tags} onChange={(tags) => setField('tags', tags)} />
            <MultiSelect
              label="Modules"
              options={MULTI_SELECT_OPTIONS}
              value={form.tags}
              onChange={(tags) => setField('tags', tags)}
              helperText="Synced with tags for demo purposes."
            />
            <Textarea
              name="demo-notes"
              label="Notes"
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
              placeholder="Optional notes"
            />
            <DatePicker
              label="Start date"
              value={form.startDate}
              onChange={(v) => setField('startDate', v)}
            />
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <label className="acme-radio">
                <input
                  type="radio"
                  name="form-plan"
                  checked={form.plan === 'standard'}
                  onChange={() => setField('plan', 'standard')}
                />
                Standard
              </label>
              <label className="acme-radio">
                <input
                  type="radio"
                  name="form-plan"
                  checked={form.plan === 'premium'}
                  onChange={() => setField('plan', 'premium')}
                />
                Premium
              </label>
            </div>
            <Toggle checked={form.notify} onChange={(v) => setField('notify', v)} label="Send confirmation" />
            <label className="acme-check">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setField('agree', e.target.checked)}
              />
              I confirm these demo values are accurate
            </label>
            <div className="showcase-row">
              <Button variant="secondary" onClick={handleAdd}>
                Add
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                Edit
              </Button>
              <Button onClick={handleSave}>{mode === 'edit' ? 'Update' : 'Save'}</Button>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
