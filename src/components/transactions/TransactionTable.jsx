import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'
import useStore from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/formatters'
import AddTransactionModal from './AddTransactionModal'

const PAGE_SIZE = 6

function CategoryPill({ children }) {
  return (
    <span className="inline-flex items-center bg-[rgba(255,255,255,0.05)] border border-[var(--border)] text-[var(--text-secondary)] text-[11px] font-semibold px-[10px] py-[3px] rounded-full tracking-[0.1px] whitespace-nowrap">
      {children}
    </span>
  )
}

function TypePill({ type }) {
  const isIncome = type === 'income'
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-[10px] py-[3px] rounded-full tracking-[0.1px] whitespace-nowrap ${
        isIncome
          ? 'bg-[rgba(61,214,140,0.12)] text-[#3DD68C]'
          : 'bg-[rgba(248,113,113,0.12)] text-[#F87171]'
      }`}
    >
      {isIncome ? 'Income' : 'Expense'}
    </span>
  )
}

export default function TransactionTable() {
  const { transactions, filters, role, deleteTransaction } = useStore()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [page, setPage] = useState(1)
  const isAdmin = role === 'ADMIN'

  const filtered = transactions.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes((filters.search || '').toLowerCase())
    const matchCategory =
      !filters.category || filters.category === 'All'
        ? true
        : t.category === filters.category
    const matchType =
      !filters.type || filters.type === 'All'
        ? true
        : t.type === filters.type
    const matchMonth =
      !filters.month || filters.month === 'All'
        ? true
        : new Date(t.date + 'T00:00:00').toLocaleString('en-US', { month: 'long' }) === filters.month
    return matchSearch && matchCategory && matchType && matchMonth
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Date', 'Description', 'Category', 'Type', 'Amount', ...(isAdmin ? ['Actions'] : [])].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-[11px] text-[11px] font-bold tracking-[0.5px] uppercase text-[var(--text-muted)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="px-5 py-14 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center rounded-2xl w-14 h-14 bg-[rgba(255,255,255,0.04)] mb-1">
                      <Inbox size={26} className="text-[var(--text-muted)]" />
                    </div>
                    <p className="text-[15px] font-semibold text-[var(--text-secondary)]">
                      No transactions found
                    </p>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      {transactions.length === 0
                        ? 'Add your first transaction using the button above'
                        : 'Try adjusting your filters'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((tx, i) => (
                <tr
                  key={tx.id}
                  className="transition-[background] duration-[120ms] hover:bg-[rgba(255,255,255,0.025)]"
                  style={{
                    borderBottom: i < paged.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <td className="px-5 py-[11px] text-[13px] text-[var(--text-secondary)] whitespace-nowrap">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-5 py-[11px]">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {tx.description}
                    </span>
                  </td>
                  <td className="px-5 py-[11px]">
                    <CategoryPill>{tx.category}</CategoryPill>
                  </td>
                  <td className="px-5 py-[11px]">
                    <TypePill type={tx.type} />
                  </td>
                  <td className="px-5 py-[11px] text-right">
                    <span
                      className="text-sm font-bold"
                      style={{ color: tx.type === 'income' ? '#3DD68C' : '#F87171' }}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-[11px]">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingTransaction(tx)}
                          className="flex items-center justify-center rounded-lg transition-colors w-7 h-7 text-[var(--text-muted)] hover:bg-[rgba(108,99,255,0.14)] hover:text-[var(--accent)]"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="flex items-center justify-center rounded-lg transition-colors w-7 h-7 text-[var(--text-muted)] hover:bg-[rgba(248,113,113,0.14)] hover:text-[#F87171]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="flex items-center justify-between px-5 py-[10px] border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)]">
          {filtered.length === 0
            ? 'No results'
            : `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="flex items-center gap-1 rounded-lg disabled:opacity-40 px-3 py-[5px] bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] text-xs font-semibold cursor-pointer"
          >
            <ChevronLeft size={12} /> Previous
          </button>
          <span className="text-xs font-semibold text-[var(--text-secondary)] px-1">
            {safePage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="flex items-center gap-1 rounded-lg disabled:opacity-40 px-3 py-[5px] bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] text-xs font-semibold cursor-pointer"
          >
            Next <ChevronRight size={12} />
          </button>
        </div>
      </div>


      {editingTransaction && (
        <AddTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  )
}
