import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, BarChart2 } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: BarChart2 },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} className="flex-1">
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 py-3 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon size={20} />
              {label}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
