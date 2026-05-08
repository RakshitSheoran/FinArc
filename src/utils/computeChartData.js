// All helpers take the raw transactions array from the store and return chart-ready data.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── helpers ────────────────────────────────────────────────────────────────

function toMonth(dateStr) {
  return new Date(dateStr).getMonth(); // 0-based
}

function toYear(dateStr) {
  return new Date(dateStr).getFullYear();
}

// Returns last N months as { month (0-based), year } objects, ending with current month
function lastNMonths(n) {
  const result = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ month: d.getMonth(), year: d.getFullYear(), label: MONTHS[d.getMonth()] });
  }
  return result;
}

// ─── Analytics Chart (area chart) ──────────────────────────────────────────

export function getAnalyticsData(transactions, period = "Monthly") {
  if (period === "6 Months") {
    const months = lastNMonths(6);
    return months.map(({ month, year, label }) => {
      const slice = transactions.filter(
        (t) => toMonth(t.date) === month && toYear(t.date) === year
      );
      return {
        name: label,
        Income: slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
        Expenses: slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
      };
    });
  }

  if (period === "Monthly") {
    const now = new Date();
    // Group by week of current month (week 1-5)
    const weeks = [
      { name: "Wk 1", days: [1, 7] },
      { name: "Wk 2", days: [8, 14] },
      { name: "Wk 3", days: [15, 21] },
      { name: "Wk 4", days: [22, 28] },
      { name: "Wk 5", days: [29, 31] },
    ];
    const thisMonth = transactions.filter(
      (t) => toMonth(t.date) === now.getMonth() && toYear(t.date) === now.getFullYear()
    );
    return weeks.map(({ name, days }) => {
      const slice = thisMonth.filter((t) => {
        const d = new Date(t.date).getDate();
        return d >= days[0] && d <= days[1];
      });
      return {
        name,
        Income: slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
        Expenses: slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
      };
    });
  }

  // Weekly — last 7 days
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    const dayLabel = DAYS[d.getDay()];
    const slice = transactions.filter((t) => {
      const td = new Date(t.date);
      return (
        td.getDate() === d.getDate() &&
        td.getMonth() === d.getMonth() &&
        td.getFullYear() === d.getFullYear()
      );
    });
    return {
      name: dayLabel,
      Income: slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      Expenses: slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    };
  });
}

// ─── Monthly Savings Chart (bar chart) ─────────────────────────────────────

export function getMonthlySavingsData(transactions) {
  const months = lastNMonths(6);
  return months.map(({ month, year, label }) => {
    const slice = transactions.filter(
      (t) => toMonth(t.date) === month && toYear(t.date) === year
    );
    const income = slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { name: label, savings: Math.max(0, income - expense) };
  });
}

// ─── Spending Donut ─────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  Food: "#6C63FF",
  Rent: "#F59E0B",
  Transport: "#10B981",
  Entertainment: "#EF4444",
  Utilities: "#3B82F6",
  Health: "#EC4899",
  Other: "#8B5CF6",
};

export function getSpendingByCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const totals = {};
  expenses.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });
  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#8B5CF6",
  }));
}

// ─── Insight Cards ──────────────────────────────────────────────────────────

export function getInsightStats(transactions) {
  if (!transactions.length) return null;

  // Highest spending category
  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // Best income month (last 6)
  const months = lastNMonths(6);
  const monthlyIncome = months.map(({ month, year, label }) => {
    const total = transactions
      .filter((t) => t.type === "income" && toMonth(t.date) === month && toYear(t.date) === year)
      .reduce((s, t) => s + t.amount, 0);
    return { label, total };
  });
  const bestIncomeMonth = monthlyIncome.sort((a, b) => b.total - a.total)[0];

  // Largest single expense
  const expenses = transactions.filter((t) => t.type === "expense");
  const largestExpense = expenses.sort((a, b) => b.amount - a.amount)[0];

  // Lowest savings month (last 6)
  const monthlySavings = months.map(({ month, year, label }) => {
    const slice = transactions.filter(
      (t) => toMonth(t.date) === month && toYear(t.date) === year
    );
    const income = slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const rate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
    return { label, rate };
  });
  const lowestSavingsMonth = monthlySavings.sort((a, b) => a.rate - b.rate)[0];

  return { highestCategory, bestIncomeMonth, largestExpense, lowestSavingsMonth };
}

// ─── Monthly Comparison Chart (6-month income vs expenses bar) ─────────────

export function getMonthlyComparison(transactions) {
  const months = lastNMonths(6);
  return months.map(({ month, year, label }) => {
    const slice = transactions.filter(
      (t) => toMonth(t.date) === month && toYear(t.date) === year
    );
    return {
      month: label,
      Income: slice.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      Expenses: slice.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    };
  });
}

// ─── Category Trend Chart (multi-line, last 6 months) ───────────────────────

const TREND_CATEGORIES = ["Food", "Rent", "Transport", "Entertainment"];

export function getCategoryTrends(transactions) {
  const months = lastNMonths(6);
  return months.map(({ month, year, label }) => {
    const row = { month: label };
    TREND_CATEGORIES.forEach((cat) => {
      row[cat] = transactions
        .filter(
          (t) =>
            t.type === "expense" &&
            t.category === cat &&
            toMonth(t.date) === month &&
            toYear(t.date) === year
        )
        .reduce((s, t) => s + t.amount, 0);
    });
    return row;
  });
}

// ─── Weekly Spend Chart (Mon-Sun of current week) ───────────────────────────

export function getWeeklySpend(transactions) {
  const now = new Date();
  // Start of current week (Monday)
  const dayOfWeek = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const label = DAYS[d.getDay()];
    const total = transactions
      .filter((t) => {
        const td = new Date(t.date);
        return (
          t.type === "expense" &&
          td.getDate() === d.getDate() &&
          td.getMonth() === d.getMonth() &&
          td.getFullYear() === d.getFullYear()
        );
      })
      .reduce((s, t) => s + t.amount, 0);
    return { day: label, amount: total };
  });
}
