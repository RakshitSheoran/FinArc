const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("finarc_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || data.message || "Request failed");
  return data;
}

export const api = {
  // Auth
  register: (body) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: (body) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),

  // Health (for cold-start warm-up ping)
  health: () => request("/health"),

  // Transactions
  getTransactions: () => request("/api/transactions"),
  addTransaction: (body) =>
    request("/api/transactions", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  editTransaction: (id, body) =>
    request(`/api/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteTransaction: (id) =>
    request(`/api/transactions/${id}`, { method: "DELETE" }),

  // Goals
  getGoal: () => request("/api/goals"),
  updateGoal: (amount) =>
    request("/api/goals", { method: "PUT", body: JSON.stringify({ amount }) }),
};
