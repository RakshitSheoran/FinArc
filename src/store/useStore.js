import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      // ── Auth ──────────────────────────────────────────────────────────────
      user: null,   // { id, name, email }
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem("finarc_token", token);
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("finarc_token");
        set({ user: null, token: null, transactions: [] });
      },

      // ── Transactions (synced from backend) ────────────────────────────────
      transactions: [],
      setTransactions: (list) => set({ transactions: list }),
      addTransactionLocal: (t) =>
        set((state) => ({ transactions: [t, ...state.transactions] })),
      editTransactionLocal: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),
      deleteTransactionLocal: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // ── Filters (local only) ──────────────────────────────────────────────
      filters: { search: "", category: "All", type: "All", month: "All" },
      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),

      // ── Theme ─────────────────────────────────────────────────────────────
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // ── Monthly Goal ──────────────────────────────────────────────────────
      monthlyGoal: 100000,
      setMonthlyGoal: (amount) => set({ monthlyGoal: amount }),
    }),
    {
      name: "FinArc-storage",
      // Only persist UI prefs + auth; transactions always come fresh from backend
      partialize: (state) => ({
        darkMode: state.darkMode,
        monthlyGoal: state.monthlyGoal,
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useStore;
