import { useState } from 'react'
import { X } from 'lucide-react'
import useStore from '../../store/useStore'

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Rent', 'Salary', 'Freelance', 'Other']

const defaultForm = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
}

const AddTransactionModal = ({ transaction = null, onClose }) => {
  const { addTransaction, editTransaction } = useStore()
  const isEditing = transaction !== null

  const [form, setForm] = useState(
    isEditing
      ? {
          description: transaction.description,
          amount: transaction.amount,
          category: transaction.category,
          type: transaction.type,
          date: transaction.date,
        }
      : defaultForm
  )
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.description.trim()) {
      setError('Description is required')
      return
    }
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      setError('Enter a valid amount')
      return
    }
    setError('')

    if (isEditing) {
      editTransaction(transaction.id, {
        ...form,
        amount: parseFloat(form.amount),
      })
    } else {
      addTransaction({
        id: Date.now(),
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
        status: 'Completed',
      })
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4 bg-[var(--bg-card)] border border-[var(--border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-[var(--text-muted)]" />
          </button>
        </div>

        {error && (
          <p className="text-xs text-[#F87171] bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text-secondary)]">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Monthly Salary"
              className="w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[#6C63FF]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text-secondary)]">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 5000"
              className="w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[#6C63FF]"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-[var(--text-secondary)]">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-[var(--text-secondary)]">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] outline-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text-secondary)]">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[#6C63FF] [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-sm text-white bg-[#6C63FF] cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionModal
