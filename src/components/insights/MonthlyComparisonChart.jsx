import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const INCOME_COLOR  = '#6C63FF'
const EXPENSE_COLOR = 'rgba(248,113,113,0.6)'

const data = [
  { month: 'Jul', income: 23500, expenses: 12300 },
  { month: 'Aug', income: 28100, expenses: 15600 },
  { month: 'Sep', income: 25400, expenses: 13800 },
  { month: 'Oct', income: 30200, expenses: 16400 },
  { month: 'Nov', income: 27600, expenses: 14900 },
  { month: 'Dec', income: 32100, expenses: 17800 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-[6px]">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-[13px] font-semibold" style={{ color: p.fill }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex items-center justify-center gap-5 mt-1">
      {payload.map((p) => (
        <div key={p.value} className="flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-[3px]"
            style={{ background: p.color }}
          />
          <span className="text-[11px] font-semibold text-[var(--text-secondary)] capitalize">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyComparisonChart() {
  return (
    <div className="card flex flex-col gap-1">
      <div className="mb-4">
        <h2 className="text-[15px] font-bold text-[var(--text-primary)] mb-[3px]">
          Income vs Expenses
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">Last 6 months comparison</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4} margin={{ top: 5, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="income"   name="Income"   fill={INCOME_COLOR}  radius={[5, 5, 0, 0]} maxBarSize={26} />
          <Bar dataKey="expenses" name="Expenses" fill={EXPENSE_COLOR} radius={[5, 5, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
