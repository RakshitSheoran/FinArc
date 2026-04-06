import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'
import useStore from '../../store/useStore'
import { formatCurrency, formatDate } from '../../utils/formatters'

const allTransactions = [
  { id: 1,  date: '2024-01-15', description: 'Whole Foods Market',  category: 'Food',          type: 'Expense', amount: -84.50,   month: 'January' },
  { id: 2,  date: '2024-01-14', description: 'Monthly Salary',       category: 'Income',        type: 'Income',  amount: 5200.00,  month: 'January' },
  { id: 3,  date: '2024-01-13', description: 'Netflix Subscription', category: 'Entertainment', type: 'Expense', amount: -15.99,   month: 'January' },
  { id: 4,  date: '2024-01-12', description: 'Electric Bill',        category: 'Utilities',     type: 'Expense', amount: -94.20,   month: 'January' },
  { id: 5,  date: '2024-01-11', description: 'Freelance Project',    category: 'Income',        type: 'Income',  amount: 1200.00,  month: 'January' },
  { id: 6,  date: '2024-01-10', description: 'Uber Ride',            category: 'Transport',     type: 'Expense', amount: -18.40,   month: 'January' },
  { id: 7,  date: '2024-01-09', description: 'Rent Payment',         category: 'Rent',          type: 'Expense', amount: -1500.00, month: 'January' },
  { id: 8,  date: '2024-01-08', description: 'Amazon Purchase',      category: 'Shopping',      type: 'Expense', amount: -67.30,   month: 'January' },
  { id: 9,  date: '2024-01-07', description: 'Gym Membership',       category: 'Health',        type: 'Expense', amount: -45.00,   month: 'January' },
  { id: 10, date: '2024-01-06', description: 'Dividend Income',      category: 'Income',        type: 'Income',  amount: 320.00,   month: 'January' },
]

const PAGE_SIZE = 6

function CategoryPill({ children }) {
  return (
    <span className="inline-flex items-center bg-[rgba(255,255,255,0.05)] border border-[var(--border)] text-[var(--text-secondary)] text-[11px] font-semibold px-[10px] py-[3px] rounded-full tracking-[0.1px] whitespace-nowrap">
      {children}
    </span>
  )
}

function TypePill({ type }) {
  const isIncome = type === 'Income'
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-[10px] py-[3px] rounded-full tracking-[0.1px] whitespace-nowrap ${
        isIncome
          ? 'bg-[rgba(61,214,140,0.12)] text-[#3DD68C]'
          : 'bg-[rgba(248,113,113,0.12)] text-[#F87171]'
      }`}
    >
      {type}
    </span>
  )
}

export default function TransactionTable() {
  const { filters, role } = useStore()
  const [page, setPage] = useState(1)
  const isAdmin = role === 'ADMIN'

  const filtered = allTransactions.filter((tx) => {
    const matchSearch =
      !filters.search ||
      tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      tx.category.toLowerCase().includes(filters.search.toLowerCase())
    const matchCategory = filters.category === 'All' || tx.category === filters.category
    const matchType = filters.type === 'All' || tx.type === filters.type
    const matchMonth = filters.month === 'All' || tx.month === filters.month
    return matchSearch && matchCategory && matchType && matchMonth
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

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
                    <p className="text-[13px] text-[var(--text-muted)]">Try adjusting your filters</p>
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
                      style={{ color: tx.type === 'Income' ? '#3DD68C' : '#F87171' }}
                    >
                      {tx.type === 'Income' ? '+' : '-'}
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-[11px]">
                      <div className="flex items-center gap-1.5">
                        <button className="flex items-center justify-center rounded-lg transition-colors w-7 h-7 text-[var(--text-muted)] hover:bg-[rgba(108,99,255,0.14)] hover:text-[var(--accent)]">
                          <Pencil size={13} />
                        </button>
                        <button className="flex items-center justify-center rounded-lg transition-colors w-7 h-7 text-[var(--text-muted)] hover:bg-[rgba(248,113,113,0.14)] hover:text-[#F87171]">
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

      {/* Pagination */}
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
    </>
  )
}
