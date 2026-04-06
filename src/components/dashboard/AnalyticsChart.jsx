import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const chartData = {
  Weekly: [
    { label: "Sun", income: 3200, expenses: 1800 },
    { label: "Mon", income: 4100, expenses: 2400 },
    { label: "Tue", income: 2800, expenses: 1200 },
    { label: "Wed", income: 5600, expenses: 3100 },
    { label: "Thu", income: 4800, expenses: 2700 },
    { label: "Fri", income: 6200, expenses: 3800 },
    { label: "Sat", income: 3900, expenses: 2100 },
  ],
  Monthly: [
    { label: "Jan", income: 18400, expenses: 9200 },
    { label: "Feb", income: 22100, expenses: 11400 },
    { label: "Mar", income: 19800, expenses: 8700 },
    { label: "Apr", income: 24600, expenses: 13200 },
    { label: "May", income: 21300, expenses: 10800 },
    { label: "Jun", income: 26800, expenses: 14100 },
    { label: "Jul", income: 23500, expenses: 12300 },
    { label: "Aug", income: 28100, expenses: 15600 },
    { label: "Sep", income: 25400, expenses: 13800 },
    { label: "Oct", income: 30200, expenses: 16400 },
    { label: "Nov", income: 27600, expenses: 14900 },
    { label: "Dec", income: 32100, expenses: 17800 },
  ],
  "6 Months": [
    { label: "Jul", income: 23500, expenses: 12300 },
    { label: "Aug", income: 28100, expenses: 15600 },
    { label: "Sep", income: 25400, expenses: 13800 },
    { label: "Oct", income: 30200, expenses: 16400 },
    { label: "Nov", income: 27600, expenses: 14900 },
    { label: "Dec", income: 32100, expenses: 17800 },
  ],
};

const periods = ["Weekly", "Monthly", "6 Months"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="text-xs font-semibold mb-2 text-[var(--text-muted)]">
        {label}
      </p>
      {payload.map((p) => (
        <p
          key={p.dataKey}
          className="text-sm font-semibold"
          style={{ color: p.color }}
        >
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: ₹
          {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function AnalyticsChart() {
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [period, setPeriod] = useState("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = chartData[period];

  return (
    <div className="card flex flex-col gap-4 shadow-md">
  
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-base text-[var(--text-primary)]">
          Analytics
        </h2>
        <div className="flex items-center gap-2">
       
          <button
            onClick={() => setShowIncome((v) => !v)}
            className={`badge transition-all ${
              showIncome
                ? "bg-[rgba(108,99,255,0.18)] text-[var(--accent)] border border-[rgba(108,99,255,0.35)]"
                : "bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)] border border-[var(--border)]"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setShowExpenses((v) => !v)}
            className={`badge transition-all ${
              showExpenses
                ? "bg-[rgba(245,158,11,0.15)] text-[var(--amber)] border border-[rgba(245,158,11,0.35)]"
                : "bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)] border border-[var(--border)]"
            }`}
          >
            Expenses
          </button>

    
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {period}
              <ChevronDown size={12} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-20 w-32 bg-[var(--bg-secondary)] border border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                      period === p
                        ? "text-[var(--accent)] bg-[rgba(108,99,255,0.1)]"
                        : "text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.04)]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="h-[200px] sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 4, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--accent)"
                  stopOpacity={0.28}
                />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--amber)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--amber)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "Plus Jakarta Sans",
              }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "Plus Jakarta Sans",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            />
            {showIncome && (
              <Area
                type="monotone"
                dataKey="income"
                stroke="var(--accent)"
                strokeWidth={2.5}
                fill="url(#incomeGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
              />
            )}
            {showExpenses && (
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="var(--amber)"
                strokeWidth={2.5}
                fill="url(#expensesGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "var(--amber)", strokeWidth: 0 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
