import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  ChevronDown,
  TrendingUp,
  Check,
} from 'lucide-react'

const roles = ['Admin', 'Analyst', 'Viewer']

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

function RoleSwitcher() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Admin')

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs">
          {selected[0]}
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="font-medium text-slate-100">{selected}</span>
          <span className="text-xs text-slate-500">Switch role</span>
        </div>
        <ChevronDown
          size={15}
          className={`ml-auto shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-slate-700 bg-slate-900 py-1 shadow-xl">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => { setSelected(role); setOpen(false) }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Check
                size={14}
                className={selected === role ? 'text-indigo-400' : 'invisible'}
              />
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
 
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
    
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="font-semibold text-slate-100 tracking-tight">FinanceOS</span>
        </div>

        <nav className="flex-1 space-y-1 p-3 pt-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>


        <div className="border-t border-slate-800 p-3">
          <RoleSwitcher />
        </div>
      </aside>


      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>


      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-800 bg-slate-900 md:hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-indigo-400' : 'text-slate-500'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
