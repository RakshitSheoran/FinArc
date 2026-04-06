import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const data = [
  { month: "Nov", savings: 1200 },
  { month: "Dec", savings: 800 },
  { month: "Jan", savings: 2100 },
  { month: "Feb", savings: 1750 },
  { month: "Mar", savings: 3200 },
  { month: "Apr", savings: 2800 },
];

const LOW_THRESHOLD = 1000;
const VIOLET = "#6C63FF";
const ROSE = "#F87171";

const avg = Math.round(data.reduce((s, d) => s + d.savings, 0) / data.length);

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { month, savings } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-1">
        {month}
      </p>
      <p
        className="text-[13px] font-bold"
        style={{ color: savings < LOW_THRESHOLD ? ROSE : VIOLET }}
      >
        Savings: {formatCurrency(savings)}
      </p>
    </div>
  );
}

export default function MonthlySavingsChart() {
  return (
    <div className="flex flex-col gap-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-md">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-base text-[var(--text-primary)]">
            Monthly Savings
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-[2px]">
            Your net savings per month
          </p>
        </div>

        <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-[10px] px-3 py-[6px] text-right shrink-0">
          <p className="text-[11px] text-[var(--text-secondary)] mb-[2px]">
            Avg. Monthly Savings
          </p>
          <p className="text-base font-bold text-[var(--text-primary)] leading-none">
            {formatCurrency(avg)}
          </p>
        </div>
      </div>


      <div className="h-[200px] sm:h-[220px] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--border)"
              strokeOpacity={0.4}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 11,
                fontFamily: "Plus Jakarta Sans",
              }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 11,
                fontFamily: "Plus Jakarta Sans",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="savings" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.savings < LOW_THRESHOLD ? ROSE : VIOLET}
                  fillOpacity={entry.savings < LOW_THRESHOLD ? 0.85 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
