import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/formatters";

const transactions = [
  {
    id: 1,
    name: "Whole Foods Market",
    category: "Food",
    date: "2024-01-15",
    amount: -84.5,
    type: "expense",
  },
  {
    id: 2,
    name: "Monthly Salary",
    category: "Income",
    date: "2024-01-14",
    amount: 5200.0,
    type: "income",
  },
  {
    id: 3,
    name: "Netflix",
    category: "Entertainment",
    date: "2024-01-13",
    amount: -15.99,
    type: "expense",
  },
  {
    id: 4,
    name: "Electric Bill",
    category: "Utilities",
    date: "2024-01-12",
    amount: -94.2,
    type: "expense",
  },
  {
    id: 5,
    name: "Freelance Payment",
    category: "Income",
    date: "2024-01-10",
    amount: 1200.0,
    type: "income",
  },
];

export default function RecentTransactions() {
  const navigate = useNavigate();

  return (
    <div className="card flex flex-col gap-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base text-[var(--text-primary)]">
          Recent Transactions
        </h2>
        <button
          className="text-xs font-semibold text-[var(--accent)]"
          onClick={() => { window.scrollTo(0, 0); navigate("/transactions"); }}
        >
          See All
        </button>
      </div>

      <div className="flex flex-col">
        {transactions.map((tx, i) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 py-3"
            style={{
              borderBottom:
                i < transactions.length - 1
                  ? "1px solid var(--border)"
                  : "none",
            }}
          >
            {/* Neutral category avatar */}
            <div className="flex items-center justify-center shrink-0 rounded-full font-bold text-sm w-9 h-9 bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary)]">
              {tx.category[0]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-[var(--text-primary)]">
                {tx.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatDate(tx.date)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="text-sm font-bold"
                style={{ color: tx.type === "income" ? "#3DD68C" : "#F87171" }}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </span>
              <span className="text-[10px] font-bold py-[2px] px-[7px] rounded-full bg-[rgba(61,214,140,0.12)] text-[#3DD68C]">
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
