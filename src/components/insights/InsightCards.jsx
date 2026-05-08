import { ShoppingBag, TrendingUp, AlertCircle, TrendingDown } from 'lucide-react'
import useStore from '../../store/useStore'
import { getInsightStats } from '../../utils/computeChartData'
import { formatCurrency } from '../../utils/formatters'

const cardConfigs = [
  { label: 'Highest Spending', icon: ShoppingBag, iconBg: 'rgba(248,113,113,0.15)', iconColor: '#F87171', borderColor: '#F87171', accentColor: '#F87171' },
  { label: 'Best Income Month', icon: TrendingUp,  iconBg: 'rgba(52,211,153,0.15)',  iconColor: '#34D399', borderColor: '#34D399', accentColor: '#34D399' },
  { label: 'Largest Expense',   icon: AlertCircle, iconBg: 'rgba(245,158,11,0.15)', iconColor: '#F59E0B', borderColor: '#F59E0B', accentColor: '#F59E0B' },
  { label: 'Lowest Savings',    icon: TrendingDown,iconBg: 'rgba(124,111,255,0.15)',iconColor: '#7C6FFF', borderColor: '#7C6FFF', accentColor: '#7C6FFF' },
]

export default function InsightCards() {
  const transactions = useStore((s) => s.transactions)
  const stats = getInsightStats(transactions)

  const items = stats
    ? [
        { ...cardConfigs[0], category: stats.highestCategory?.[0] ?? '—', amount: stats.highestCategory ? formatCurrency(stats.highestCategory[1]) : '—' },
        { ...cardConfigs[1], category: stats.bestIncomeMonth?.label ?? '—', amount: stats.bestIncomeMonth ? formatCurrency(stats.bestIncomeMonth.total) : '—' },
        { ...cardConfigs[2], category: stats.largestExpense?.description ?? '—', amount: stats.largestExpense ? formatCurrency(stats.largestExpense.amount) : '—' },
        { ...cardConfigs[3], category: stats.lowestSavingsMonth?.label ?? '—', amount: stats.lowestSavingsMonth ? `${stats.lowestSavingsMonth.rate}%` : '—' },
      ]
    : cardConfigs.map((c) => ({ ...c, category: '—', amount: '—' }))

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="rounded-r-xl rounded-l-none border-l-[3px] p-4 flex flex-col justify-between min-h-[110px] bg-[var(--bg-card)]"
            style={{ borderLeftColor: item.borderColor }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: item.iconBg }}>
                <Icon size={14} color={item.iconColor} />
              </div>
              <p className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest leading-tight">
                {item.label}
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[var(--text-primary)]">{item.category}</p>
              <p className="text-xl font-semibold" style={{ color: item.accentColor }}>{item.amount}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
