import SummaryCards from '../components/dashboard/SummaryCards'
import AnalyticsChart from '../components/dashboard/AnalyticsChart'
import MonthlySavingsChart from '../components/dashboard/MonthlySavingsChart'
import SpendingDonut from '../components/dashboard/SpendingDonut'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
      {/* Left column */}
      <div className="flex flex-col gap-5 min-w-0">
        <SummaryCards />
        <AnalyticsChart />
        <MonthlySavingsChart />
      </div>

      {/* Right panel — stacks below on mobile/tablet, sidebar on xl+ */}
      <div className="flex flex-col gap-5 min-w-0">
        <SpendingDonut />
        <RecentTransactions />
      </div>
    </div>
  )
}
