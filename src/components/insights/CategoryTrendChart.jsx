import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const lines = [
  { key: 'Food',          color: '#6C63FF' },
  { key: 'Rent',          color: '#3DD68C' },
  { key: 'Transport',     color: '#F59E0B' },
  { key: 'Entertainment', color: '#F87171' },
]

const data = [
  { month: 'Jul', Food: 620, Rent: 1500, Transport: 280, Entertainment: 190 },
  { month: 'Aug', Food: 740, Rent: 1500, Transport: 320, Entertainment: 240 },
  { month: 'Sep', Food: 690, Rent: 1500, Transport: 260, Entertainment: 210 },
  { month: 'Oct', Food: 810, Rent: 1500, Transport: 390, Entertainment: 300 },
  { month: 'Nov', Food: 760, Rent: 1500, Transport: 340, Entertainment: 270 },
  { month: 'Dec', Food: 840, Rent: 1500, Transport: 320, Entertainment: 260 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-[6px]">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-[13px] font-semibold" style={{ color: p.stroke }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-1">
      {payload.map((p) => (
        <div key={p.value} className="flex items-center gap-1.5">
          <span
            className="inline-block w-5 h-[2px] rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function CategoryTrendChart() {
  return (
    <div className="card flex flex-col gap-1">
      <div className="mb-4">
        <h2 className="text-[15px] font-bold text-[var(--text-primary)] mb-[3px]">
          Category Trends
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">Category spending over time</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 4, left: -10, bottom: 0 }}>
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
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
          <Legend content={<CustomLegend />} />
          {lines.map(({ key, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
