# FinArc
FinArc — Finance Dashboard
A clean, interactive finance dashboard built as a frontend assignment. FinArc allows users to track financial activity, visualize spending patterns, and manage transactions — all with a polished dark-themed UI and role-based access control.

Screenshots

Add screenshots here after deployment


Features
Dashboard

Credit card style balance card with real-time date, monthly stats and card holder info
Summary cards — Savings, Expenses, Income with % change vs last month
Savings Target card with dynamic progress bar and Admin-only goal setting
Analytics area chart — Income vs Expenses with Weekly / Monthly / 6-Month toggle
Monthly Savings bar chart with low-savings month highlighting
Spending Breakdown donut chart by category
Recent Transactions strip with live data

Transactions

Full transaction table with Date, Description, Category, Type and Amount
Search by description
Filter by Category, Type and Month
Sortable columns
Pagination
Add, Edit and Delete transactions (Admin only)
Empty state handling

Insights

Highest Spending Category
Best Income Month
Largest Single Expense
Lowest Savings Month
Income vs Expenses grouped bar chart (last 6 months)
Category Trend line chart (multi-line, last 6 months)
Weekly Spending bar chart with peak day highlight

Role Based UI

Switch between Admin and Viewer roles from the sidebar
Admin — full access to add, edit and delete transactions, set savings target
Viewer — read only access, no mutation controls visible
Role persisted in Zustand store with localStorage

Additional

Dark mode by default with light mode toggle
Fully responsive — desktop sidebar, mobile bottom navigation
Indian Rupee (₹) formatting with en-IN locale
localStorage persistence for transactions, role, filters and savings target


Tech Stack
PurposeLibraryFrameworkReact 18 + ViteStylingTailwind CSSChartsRechartsState ManagementZustandRoutingReact Router DOMIconsLucide React

Getting Started
Prerequisites

Node.js v18 or above
npm or yarn

Installation
bash# Clone the repository
git clone https://github.com/RakshitSheoran/FinArc.git

# Navigate to the project directory
cd FinArc

# Install dependencies
npm install

# Start the development server
npm run dev
The app will be running at http://localhost:5173
Build for Production
bashnpm run build

Project Structure
src/
├── components/
│   ├── layout/          # Sidebar, Header, Layout, BottomNav
│   ├── dashboard/       # SummaryCards, AnalyticsChart, SpendingDonut
│   │                    # MonthlySavingsChart, RecentTransactions
│   ├── transactions/    # TransactionTable, TransactionFilters
│   │                    # AddTransactionModal
│   └── insights/        # InsightCards, MonthlyComparisonChart
│                        # CategoryTrendChart, WeeklySpendChart
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useStore.js      # Zustand store — transactions, role, filters
├── data/
│   └── mockData.js      # Mock transaction dataset
└── utils/
    └── formatters.js    # Currency and date formatting utilities

State Management
Zustand was chosen over Context API for the following reasons:

No boilerplate — store setup is minimal and readable
No Provider wrapping required
Built-in localStorage persistence via persist middleware
Selective re-renders — components only re-render when their slice of state changes
Scales well for this scope without the overhead of Redux

The store manages:

transactions — full transaction array with add, edit, delete actions
role — current active role (Admin / Viewer) with toggle action
filters — search query, category, type and month filters
darkMode — theme preference
monthlyGoal — savings target amount set by Admin


Role Based UI
No backend authentication is used. Roles are simulated entirely on the frontend:

Role state lives in Zustand and persists to localStorage
Switching roles via the sidebar pill badge instantly updates all UI
Admin controls (add, edit, delete buttons and the savings target edit icon) are conditionally rendered based on role === 'ADMIN'
Viewer sees a fully read-only interface with no mutation affordances


Design Decisions

Dark greyish theme — #111318 background keeps the UI professional without the harshness of pure black
Restrained color palette — Violet (primary), Emerald (income), Rose (expense), Amber (secondary data only)
Credit card balance card — replaces a plain summary card with a premium, memorable UI element
CSS variables in index.css — all theme tokens defined once, referenced via Tailwind arbitrary values
No inline styles except for runtime-dynamic values like progress bar widths and chart colors
