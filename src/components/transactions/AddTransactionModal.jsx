import { useState } from 'react'
import { X } from 'lucide-react'

const categories = ['Food', 'Entertainment', 'Utilities', 'Transport', 'Rent', 'Shopping', 'Health', 'Income']

const inputClass = 'bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] rounded-[10px] py-[9px] px-[13px] text-[13.5px] outline-none w-full'

export default function AddTransactionModal({ onClose }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'Expense',
    date: new Date().toISOString().split('T')[0],
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)]"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-5 bg-[var(--bg-card)] border border-[var(--border)] shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-[var(--text-primary)]">Add Transaction</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-primary)]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">
                Description
              </label>
              <input
                type="text"
                placeholder="e.g. Grocery store"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">
                Amount (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Category + Type row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className={`${inputClass} !px-[10px] cursor-pointer`}
                >
                  {categories.map((c) => (
                    <option key={c} value={c} style={{ background: '#1E2128' }}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => set('type', e.target.value)}
                  className={`${inputClass} !px-[10px] cursor-pointer`}
                >
                  <option value="Expense" style={{ background: '#1E2128' }}>Expense</option>
                  <option value="Income" style={{ background: '#1E2128' }}>Income</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.04)]"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 btn-primary justify-center py-2.5 rounded-xl text-sm">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
