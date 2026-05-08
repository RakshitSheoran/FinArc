import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { api } from "../services/api";
import useStore from "../store/useStore";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, token } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isWakingUp, setIsWakingUp] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  // Silently ping the backend on mount to warm it up before user submits
  useEffect(() => {
    api.health().catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Show "waking up" banner if backend takes too long
    const wakeTimer = setTimeout(() => setIsWakingUp(true), 4000);

    try {
      const data = await api.login({ email, password });
      clearTimeout(wakeTimer);
      setAuth(data.user, data.token);
      navigate("/", { replace: true });
    } catch (err) {
      clearTimeout(wakeTimer);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
      setIsWakingUp(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--accent)]">
            <TrendingUp size={18} color="#fff" />
          </div>
          <span className="font-bold text-2xl text-[var(--text-primary)]">FinArc</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Sign in to your account</p>

          {/* Cold start warning */}
          {isWakingUp && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
              Server is waking up — this takes ~30 seconds on first load. Please wait...
            </div>
          )}

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[var(--accent)] font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
