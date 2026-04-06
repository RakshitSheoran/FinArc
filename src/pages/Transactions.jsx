import { useState } from 'react'
import { Plus } from 'lucide-react'
import useStore from '../store/useStore'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'

export default function Transactions() {
  const { role } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const isAdmin = role === 'ADMIN'

  return (
    <div className="flex flex-col gap-5">

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">
 
        <div className="flex items-center gap-3 flex-wrap px-5 py-3 border-b border-[var(--border)]">
          <TransactionFilters />

          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 shrink-0 rounded-xl font-semibold transition-colors bg-[var(--accent)] text-white border-0 px-4 py-2 text-[13.5px] cursor-pointer hover:bg-[var(--accent-hover)]"
            >
              <Plus size={15} strokeWidth={2.5} />
              Add Transaction
            </button>
          )}
        </div>


        <TransactionTable />
      </div>

      {modalOpen && <AddTransactionModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
