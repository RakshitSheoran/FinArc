import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import useStore from '../store/useStore'
import { api } from '../services/api'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'

export default function Transactions() {
  const { setTransactions } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getTransactions()
      .then((data) => setTransactions(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [setTransactions])

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">

        <div className="flex items-center gap-3 flex-wrap px-5 py-3 border-b border-[var(--border)]">
          <TransactionFilters />
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 shrink-0 rounded-xl font-semibold transition-colors bg-[var(--accent)] text-white border-0 px-4 py-2 text-[13.5px] cursor-pointer hover:bg-[var(--accent-hover)]"
          >
            <Plus size={15} strokeWidth={2.5} />
            Add Transaction
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[var(--text-muted)] text-sm">
            Loading transactions...
          </div>
        ) : (
          <TransactionTable />
        )}
      </div>

      {modalOpen && <AddTransactionModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
