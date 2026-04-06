# FinArc — Personal Finance Dashboard

## Overview

FinArc is a personal finance dashboard built as a frontend-focused project to demonstrate real-world application structure and UI engineering skills. It allows users to manage transactions, track income and expenses, and view financial insights through interactive charts.

The application is built as a single-page app with a strong focus on component reusability, state management, and responsive design.

---

## Features

- Dashboard with financial summaries and charts  
- Add, edit, and delete transactions (role-based access)  
- Filter transactions by search, category, type, and month  
- Insights page with spending trends and comparisons  
- Dark and light mode support  
- Persistent state using localStorage  
- Responsive layout for mobile and desktop  

---

## Tech Stack

- React (with Vite)
- Tailwind CSS (v4, CSS-first setup)
- Zustand (state management + persistence)
- Recharts (charts)
- React Router (routing)

---

## Project Structure

```bash
src/
├── components/
├── pages/
├── store/
├── utils/
├── data/
├── App.jsx
├── main.jsx
```

---

## State Management

The app uses Zustand for global state. It manages:

- Transactions  
- Filters  
- Dark mode  
- Monthly goal  
- User role (Admin / Viewer)  

Selected parts of the state are persisted in localStorage so data remains after refresh.

---

## Role System

The app includes a simple role-based UI:

- Admin can add, edit, and delete transactions  
- Viewer can only view data  

This is handled entirely on the frontend for demonstration purposes.

---

## Pages

**Dashboard**  
Shows summary cards, charts, and a preview of recent transactions.

**Transactions**  
Includes filtering, pagination, and a table with full CRUD functionality (Admin only).

**Insights**  
Displays trends like monthly comparisons, category breakdowns, and weekly spending.

---

## Styling

- Built using Tailwind CSS v4  
- Uses CSS variables for theming  
- Dark/light mode handled via a class on the root element  
- Reusable utility classes for cards, buttons, and layout  

---

## Running the Project

```bash
git clone https://github.com/your-username/finarc.git
cd finarc
npm install
npm run dev
```

---

## Notes

- Charts and some dashboard data are currently static (mock data)  
- Transactions and goal features are fully interactive  
- Designed as a frontend-heavy project rather than a full-stack app  

---

## Possible Improvements

- Backend integration (API + database)  
- Authentication  
- Real-time updates  
- Export functionality  
- Budget tracking features  

---

## Author

Rakshit Sheoran
