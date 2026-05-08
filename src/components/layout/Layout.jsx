import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'
import useStore from '../../store/useStore'
import { api } from '../../services/api'

export default function Layout() {
  const darkMode = useStore((s) => s.darkMode)
  const setTransactions = useStore((s) => s.setTransactions)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  useEffect(() => {
    api.getTransactions()
      .then((data) => setTransactions(data))
      .catch(() => {})
  }, [setTransactions])

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">

      <div className="hidden md:block">
        <Sidebar />
      </div>

  
      <div className="flex flex-col flex-1 md:ml-[240px] min-h-screen min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6 bg-[var(--bg-primary)]">
          <Outlet />
        </main>
      </div>

   
      <BottomNav />
    </div>
  )
}
