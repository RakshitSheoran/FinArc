import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils/formatters";

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
];

const data = [
  { name: "Food", value: 840 },
  { name: "Rent", value: 1500 },
  { name: "Transport", value: 320 },
  { name: "Entertainment", value: 260 },
  { name: "Utilities", value: 180 },
  { name: "Health", value: 210 },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const color = COLORS[data.findIndex((d) => d.name === item.name)];
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold mb-1" style={{ color }}>
        {item.name}
      </p>
      <p className="text-[13px] font-bold text-[var(--text-primary)]">
        {formatCurrency(item.value)}
      </p>
      <p className="text-[11px] text-[var(--text-muted)]">
        {((item.value / total) * 100).toFixed(1)}% of total
      </p>
    </div>
  );
}

export default function SpendingDonut() {
  return (
    <div className="card flex flex-col gap-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base text-[var(--text-primary)]">
          Spending breakdown
        </h2>
        <button className="text-xs font-semibold text-[var(--accent)]">
          See All
        </button>
      </div>

      {/* Donut */}
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={92}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[11px] font-semibold text-[var(--text-muted)]">
            Total Spent
          </p>
          <p className="text-xl font-extrabold text-[var(--text-primary)]">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2.5">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                style={{ background: COLORS[i] }}
              />
              <span className="text-[13px] text-[var(--text-secondary)]">
                {item.name}
              </span>
            </div>
            <span className="text-[13px] font-semibold text-[var(--text-primary)]">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
