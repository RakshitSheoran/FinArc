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

export default function RecentTransactionsTable() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h2
          className="font-bold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Recent Transactions
        </h2>
        <button
          className="text-xs font-semibold"
          style={{ color: "var(--accent)" }}
          onClick={() => navigate("/transactions")}
        >
          See All
        </button>
      </div>

      {/* Rows */}
      {transactions.map((tx, i) => (
        <div
          key={tx.id}
          className="flex items-center gap-3 sm:gap-4 transition-colors"
          style={{
            height: 52,
            padding: "0 20px",
            borderBottom:
              i < transactions.length - 1 ? "1px solid var(--border)" : "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.025)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {/* Icon circle */}
          <div
            className="flex items-center justify-center shrink-0 rounded-full font-bold text-sm"
            style={{
              width: 34,
              height: 34,
              background: "rgba(255,255,255,0.06)",
              color: "var(--text-secondary)",
            }}
          >
            {tx.category[0]}
          </div>

          {/* Name + date */}
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {tx.name}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {formatDate(tx.date)}
            </p>
          </div>

          {/* Category badge — hidden on mobile */}
          <span
            className="hidden sm:inline-flex shrink-0"
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {tx.category}
          </span>

          {/* Amount */}
          <span
            className="text-sm font-bold shrink-0"
            style={{
              color: tx.type === "income" ? "#3DD68C" : "#F87171",
              minWidth: 80,
              textAlign: "right",
            }}
          >
            {tx.type === "income" ? "+" : "-"}
            {formatCurrency(tx.amount)}
          </span>

          {/* Status badge — hidden on small screens */}
          <span
            className="hidden md:inline-flex shrink-0"
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 99,
              background: "rgba(61,214,140,0.12)",
              color: "#3DD68C",
            }}
          >
            Completed
          </span>
        </div>
      ))}
    </div>
  );
}
