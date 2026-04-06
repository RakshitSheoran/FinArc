import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import useStore from '../../store/useStore'

const categories = ['All', 'Food', 'Income', 'Entertainment', 'Utilities', 'Transport', 'Rent', 'Shopping', 'Health']
const types = ['All', 'Income', 'Expense']
const months = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative inline-flex items-center">
      <SlidersHorizontal
        size={12}
        className="absolute left-[10px] text-[var(--text-muted)] pointer-events-none z-[1]"
      />
      <ChevronDown
        size={12}
        className="absolute right-[9px] text-[var(--text-muted)] pointer-events-none z-[1]"
      />
      <select
        value={value}
        onChange={onChange}
        className={`appearance-none bg-transparent border-0 py-[7px] pr-[28px] pl-[26px] text-[13px] font-medium outline-none cursor-pointer ${
          value !== 'All' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
        }`}
      >
        {options.map(({ value: v, label }) => (
          <option key={v} value={v} style={{ background: '#1E2128', color: '#F1F3F7' }}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function TransactionFilters() {
  const { filters, setFilter } = useStore()

  const categoryOptions = categories.map((c) => ({ value: c, label: c === 'All' ? 'All Categories' : c }))
  const typeOptions     = types.map((t)  => ({ value: t, label: t === 'All' ? 'All Types' : t }))
  const monthOptions    = months.map((m) => ({ value: m, label: m === 'All' ? 'All Months' : m }))

  return (
    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
      {/* Search */}
      <div className="relative flex-1 min-w-[160px]">
        <Search
          size={13}
          className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="bg-transparent border-0 text-[var(--text-primary)] py-[7px] pr-3 pl-[30px] text-[13px] outline-none w-full"
        />
      </div>

      {/* Divider */}
      <div className="w-px h-[22px] bg-[var(--border)] shrink-0" />

      {/* Dropdowns */}
      <FilterSelect
        value={filters.category}
        onChange={(e) => setFilter('category', e.target.value)}
        options={categoryOptions}
      />
      <div className="w-px h-[22px] bg-[var(--border)] shrink-0" />
      <FilterSelect
        value={filters.type}
        onChange={(e) => setFilter('type', e.target.value)}
        options={typeOptions}
      />
      <div className="w-px h-[22px] bg-[var(--border)] shrink-0" />
      <FilterSelect
        value={filters.month}
        onChange={(e) => setFilter('month', e.target.value)}
        options={monthOptions}
      />
    </div>
  )
}
