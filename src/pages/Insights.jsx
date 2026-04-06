import InsightCards from '../components/insights/InsightCards'
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart'
import CategoryTrendChart from '../components/insights/CategoryTrendChart'
import WeeklySpendChart from '../components/insights/WeeklySpendChart'

export default function Insights() {
  return (
    <div className="flex flex-col gap-5">

      <InsightCards />


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyComparisonChart />
        <CategoryTrendChart />
      </div>


      <WeeklySpendChart />
    </div>
  )
}
