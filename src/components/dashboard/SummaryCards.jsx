import { useState, useRef } from "react";
import {
  PiggyBank,
  CreditCard,
  Banknote,
  Wifi,
  Crosshair,
  Edit2,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import useStore from "../../store/useStore";

const cards = [
  {
    id: "savings",
    title: "Savings",
    amount: 1050.44,
    change: "-10%",
    changeDir: "down",
    icon: PiggyBank,
    iconBg: "rgba(61,214,140,0.12)",
    iconColor: "#3DD68C",
  },
  {
    id: "expenses",
    title: "Expenses",
    amount: 200.31,
    change: "+2%",
    changeDir: "up",
    icon: CreditCard,
    iconBg: "rgba(248,113,113,0.12)",
    iconColor: "#FFA200",
  },
  {
    id: "income",
    title: "Income",
    amount: 21121.0,
    change: "+8%",
    changeDir: "up",
    icon: Banknote,
    iconBg: "rgba(108,99,255,0.12)",
    iconColor: "#6C63FF",
  },
];

/* ─── Edit Goal Modal ─── */
function EditGoalModal({ onClose }) {
  const { monthlyGoal, setMonthlyGoal } = useStore();
  const [value, setValue] = useState(String(monthlyGoal));

  const handleSave = () => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) setMonthlyGoal(parsed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 w-[360px] max-w-[calc(100vw-32px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">
          Set Monthly Goal
        </p>
        <p className="text-xs text-[var(--text-secondary)] mb-5">
          Update your monthly income target
        </p>

        <div className="relative mb-6">
          <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm pointer-events-none">
            ₹
          </span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full pl-7 pr-[14px] py-[10px] bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] text-sm outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="py-[9px] px-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-[13px] font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-[9px] px-4 rounded-lg border-0 bg-[#6C63FF] text-white text-[13px] font-semibold cursor-pointer"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Monthly Goal Card ─── */
function MonthlyGoalCard() {
  const { role, monthlyGoal } = useStore();
  const [editOpen, setEditOpen] = useState(false);

  const current = 28891.13;
  const goal = monthlyGoal;
  const pct = Math.min((current / goal) * 100, 100);
  const remaining = goal - current;
  const barColor = pct >= 80 ? "#3DD68C" : pct >= 50 ? "#F59E0B" : "#F87171";

  return (
    <>
      <div className="border-t border-r border-b border-l-[3px] border-[var(--border)] border-l-[#F59E0B] rounded-2xl p-3 md:p-4 lg:p-5 bg-[var(--bg-card)] flex flex-col shadow-md">
        {/* Top row */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-[8px] md:w-8 md:h-8 md:rounded-[9px] lg:w-9 lg:h-9 lg:rounded-[10px] bg-[rgba(245,158,11,0.12)] flex items-center justify-center shrink-0">
              <Crosshair size={16} color="#F59E0B" />
            </div>
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-secondary)] m-0">
              MONTHLY GOAL
            </p>
          </div>
          {role === "ADMIN" && (
            <Edit2
              size={16}
              className="text-[var(--text-muted)] cursor-pointer shrink-0"
              onClick={() => setEditOpen(true)}
            />
          )}
        </div>

        {/* Amount row */}
        <div className="flex items-baseline gap-1 flex-wrap mb-[2px]">
          <span className="text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] leading-none">
            {formatCurrency(current)}
          </span>
          <span className="text-sm text-[var(--text-muted)]">of</span>
          <span className="text-sm text-[var(--text-secondary)]">
            {formatCurrency(goal)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[rgba(255,255,255,0.08)] rounded-[4px] mt-3 mb-[6px] overflow-hidden shrink-0">
          <div
            className="h-full rounded-[4px] transition-[width] duration-[400ms] ease-in-out"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-[var(--text-muted)]">
            {formatCurrency(remaining)} remaining
          </span>
          <span className="text-xs font-bold" style={{ color: barColor }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>

      {editOpen && <EditGoalModal onClose={() => setEditOpen(false)} />}
    </>
  );
}

/* ─── Credit Balance Card ─── */
function CreditBalanceCard({ className = "" }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 4, y: -x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      ref={cardRef}
      className={`credit-card-balance relative overflow-hidden rounded-[20px] w-full flex flex-col p-3 min-[480px]:p-4 lg:p-5 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: hovered
          ? "0 16px 48px rgba(108,99,255,0.6), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "0 8px 32px rgba(108,99,255,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -4 : 0}px)`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Shine streak */}
      <div
        className="absolute top-[-50%] left-[-50%] w-[60%] h-[200%] pointer-events-none bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]"
        style={{
          transform: `rotate(15deg) translateX(${hovered ? "350%" : "-100%"})`,
          transition: hovered ? "transform 0.6s ease" : "none",
        }}
      />

      {/* Row 1: Top bar */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs min-[480px]:text-[12px] lg:text-[13px] font-semibold text-white tracking-[0.05em]">
          FinTrack
        </span>
        <div className="flex items-center gap-2">
          {/* Chip */}
          <div className="relative overflow-hidden shrink-0 rounded-[4px] bg-[linear-gradient(135deg,#D4AF37,#F5E06E,#B8860B)] w-[22px] h-[17px] md:w-[26px] md:h-[20px] lg:w-8 lg:h-6">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: [
                  "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
                  "linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "8px 8px",
              }}
            />
          </div>
          <Wifi size={16} color="rgba(255,255,255,0.4)" />
        </div>
      </div>

      {/* Row 2: Balance label */}
      <p className="text-[10px] text-[rgba(255,255,255,0.6)] uppercase tracking-[0.12em] mb-1">
        YOUR BALANCE
      </p>

      {/* Row 3: Balance amount — hero element */}
      <p className="text-2xl min-[480px]:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-white my-1 leading-none whitespace-nowrap">
        {formatCurrency(28891.13)}
      </p>

      {/* Row 4: % change badge */}
      <div className="flex items-center gap-[6px] mb-3 md:mb-[14px]">
        <span className="bg-[rgba(255,255,255,0.2)] text-white text-xs font-bold py-[2px] px-2 rounded-full leading-[1.6] inline-flex items-center">
          ↑ 15%
        </span>
        <span className="text-xs text-[rgba(255,255,255,0.6)]">
          vs last month
        </span>
      </div>

      {/* Row 5: Divider */}
      <div className="hidden min-[480px]:block border-t border-[rgba(255,255,255,0.12)] mb-3 md:mb-[14px]" />

      {/* Row 6: Two mini stats */}
      <div className="hidden min-[480px]:flex items-stretch">
        <div className="flex-1 pr-3 md:pr-4">
          <p className="text-[9px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.1em] mb-[2px]">
            THIS MONTH
          </p>
          <p className="text-[13px] md:text-sm lg:text-base font-bold text-white m-0">
            +₹1,240
          </p>
        </div>
        <div className="w-px bg-[rgba(255,255,255,0.12)] shrink-0" />
        <div className="flex-1 pl-3 md:pl-4">
          <p className="text-[9px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.1em] mb-[2px]">
            LAST MONTH
          </p>
          <p className="text-[13px] md:text-sm lg:text-base font-bold text-white m-0">
            +₹1,050
          </p>
        </div>
      </div>

      {/* Row 7: Divider */}
      <div className="hidden min-[480px]:block border-t border-[rgba(255,255,255,0.12)] mt-3 md:mt-[14px]" />

      {/* Row 8: Bottom bar — pushed to bottom */}
      <div className="hidden min-[480px]:flex justify-between items-end mt-auto pt-3 md:pt-[14px]">
        <div>
          <p className="text-[9px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.1em] mb-[2px]">
            CARD HOLDER
          </p>
          <p className="text-[11px] md:text-xs lg:text-[13px] font-semibold text-white tracking-[0.08em] m-0">
            RAKSHIT SHEORAN
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.1em] mb-[2px]">
            AS OF
          </p>
          <p className="text-[10px] md:text-xs font-semibold text-white m-0">
            {today}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Side Card ─── */
function SideCard({ card }) {
  const Icon = card.icon;
  const isUp = card.changeDir === "up";
  const pct = card.change.replace(/^[+-]/, "");
  const arrow = isUp ? "↑" : "↓";
  const badgeBg = isUp ? "rgba(61,214,140,0.12)" : "rgba(248,113,113,0.12)";
  const badgeColor = isUp ? "#3DD68C" : "#F87171";

  return (
    <div className="rounded-2xl p-3 md:p-4 lg:p-5 flex flex-col bg-[var(--bg-card)] border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] shadow-md">
      <div className="flex items-center gap-[10px] mb-[10px]">
        <div
          className="w-[30px] h-[30px] rounded-[8px] md:w-8 md:h-8 md:rounded-[9px] lg:w-9 lg:h-9 lg:rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: card.iconBg }}
        >
          <Icon size={16} color={card.iconColor} />
        </div>
        <p className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-[0.6px] uppercase m-0 text-[var(--text-secondary)]">
          {card.title}
        </p>
      </div>
      <p className="text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] leading-none tracking-[-0.4px] mb-2">
        {formatCurrency(card.amount)}
      </p>
      <div className="flex items-center gap-[7px] flex-nowrap mt-auto">
        <span
          className="inline-flex items-center text-[10px] md:text-[11px] font-bold py-[2px] px-2 rounded-full leading-[1.6] shrink-0"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {arrow} {pct}
        </span>
        <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] whitespace-nowrap">
          vs last month
        </span>
      </div>
    </div>
  );
}

/* ─── Summary Cards Grid ─── */
export default function SummaryCards() {
  const [savings, expenses, income] = cards;

  return (
    <div className="grid grid-cols-2 gap-[14px]">
      {/* Credit Card — col 1, rows 1+2 */}
      <CreditBalanceCard className="[grid-row:span_2]" />

      {/* Savings — col 2, row 1 */}
      <SideCard card={savings} />

      {/* Expenses — col 2, row 2 */}
      <SideCard card={expenses} />

      {/* Goals — col 1, row 3 */}
      <MonthlyGoalCard />

      {/* Income — col 2, row 3 */}
      <SideCard card={income} />
    </div>
  );
}
