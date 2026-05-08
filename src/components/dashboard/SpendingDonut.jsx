import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useStore from "../../store/useStore";
import { getSpendingByCategory } from "../../utils/computeChartData";
import { formatCurrency } from "../../utils/formatters";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold mb-1" style={{ color: item.color }}>{item.name}</p>
      <p className="text-[13px] font-bold text-[var(--text-primary)]">{formatCurrency(item.value)}</p>
    </div>
  );
}

export default function SpendingDonut() {
  const transactions = useStore((s) => s.transactions);
  const data = getSpendingByCategory(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="card flex flex-col gap-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base text-[var(--text-primary)]">Spending breakdown</h2>
        <button className="text-xs font-semibold text-[var(--accent)]">See All</button>
      </div>

      {transactions.length === 0 || data.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-sm text-[var(--text-muted)]">
          Add expense transactions to see breakdown
        </div>
      ) : (
        <>
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={68} outerRadius={92} paddingAngle={2} dataKey="value" strokeWidth={0}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">Total Spent</p>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">{formatCurrency(total)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ background: item.color }} />
                  <span className="text-[13px] text-[var(--text-secondary)]">{item.name}</span>
                </div>
                <span className="text-[13px] font-semibold text-[var(--text-primary)]">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
