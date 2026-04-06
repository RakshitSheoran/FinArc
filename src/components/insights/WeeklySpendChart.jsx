import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts'

const BAR_DEFAULT = 'rgba(108,99,255,0.3)'
const BAR_PEAK    = '#F59E0B'

const data = [
  { day: 'Mon', amount: 420 },
  { day: 'Tue', amount: 285 },
  { day: 'Wed', amount: 610 },
  { day: 'Thu', amount: 390 },
  { day: 'Fri', amount: 780 },
  { day: 'Sat', amount: 520 },
  { day: 'Sun', amount: 310 },
]

const maxDay = data.reduce((max, d) => (d.amount > max.amount ? d : max), data[0])

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const isPeak = label === maxDay.day
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-1">{label}</p>
      <p
        className="text-[13px] font-bold"
        style={{ color: isPeak ? BAR_PEAK : 'var(--accent)' }}
      >
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  )
}

export default function WeeklySpendChart() {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h2 className="font-bold text-base text-[var(--text-primary)]">Weekly Spending</h2>
        <div className="text-right">
          <p className="text-[11px] text-[var(--text-muted)]">Peak day</p>
          <p className="text-[13px] font-bold text-[#F59E0B]">
            {maxDay.day} — ₹{maxDay.amount}
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.day}
                fill={entry.day === maxDay.day ? BAR_PEAK : BAR_DEFAULT}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
