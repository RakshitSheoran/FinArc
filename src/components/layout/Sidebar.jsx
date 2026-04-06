import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart2,
  User,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
} from 'lucide-react'
import useStore from '../../store/useStore'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: BarChart2 },
]

const bottomLinks = [
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
]

export default function Sidebar() {
  const { role, toggleRole } = useStore()

  return (
    <aside className="h-screen flex flex-col fixed left-0 top-0 z-40 w-[240px] bg-[var(--bg-secondary)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-[64px] shrink-0 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]">
          <TrendingUp size={15} color="#fff" />
        </div>
        <span className="font-bold text-[17px] text-[var(--text-primary)]">
          FinTrack
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-[var(--border)]" />

      {/* Bottom section */}
      <div className="px-3 py-4 flex flex-col gap-0.5">
        {/* Role switcher */}
        <button onClick={toggleRole} className="sidebar-link" title="Click to switch role">
          <span
            className="badge"
            style={{
              background: role === 'ADMIN' ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.08)',
              color: role === 'ADMIN' ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            {role}
          </span>
          <span className="text-[13.5px] text-[var(--text-secondary)]">Switch Role</span>
        </button>

        {bottomLinks.map(({ icon: Icon, label }) => (
          <button key={label} className="sidebar-link">
            <Icon size={17} />
            {label}
          </button>
        ))}

        <button className="sidebar-link logout-btn">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}
