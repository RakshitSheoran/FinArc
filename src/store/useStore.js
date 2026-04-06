import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      editTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      role: "ADMIN",
      toggleRole: () =>
        set((state) => ({
          role: state.role === "ADMIN" ? "VIEWER" : "ADMIN",
        })),

      filters: {
        search: "",
        category: "All",
        type: "All",
        month: "All",
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      monthlyGoal: 100000,
      setMonthlyGoal: (amount) => set({ monthlyGoal: amount }),
    }),
    {
      name: "FinArc-storage",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
        monthlyGoal: state.monthlyGoal,
      }),
    },
  ),
);

export default useStore;
