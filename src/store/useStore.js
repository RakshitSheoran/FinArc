import { create } from "zustand";

const useStore = create((set) => ({
  role: "ADMIN",
  toggleRole: () =>
    set((state) => ({ role: state.role === "ADMIN" ? "VIEWER" : "ADMIN" })),

  transactions: [],

  filters: {
    search: "",
    category: "All",
    type: "All",
    month: "All",
  },
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  darkMode: localStorage.getItem("darkMode") !== "false",
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.darkMode;
      localStorage.setItem("darkMode", String(next));
      return { darkMode: next };
    }),

  monthlyGoal: Number(localStorage.getItem("monthlyGoal")) || 25000,
  setMonthlyGoal: (amount) =>
    set(() => {
      localStorage.setItem("monthlyGoal", String(amount));
      return { monthlyGoal: amount };
    }),
}));

export default useStore;
