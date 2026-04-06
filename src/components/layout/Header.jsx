import { useLocation } from "react-router-dom";
import { Bell, MessageSquare, ChevronDown, Sun, Moon } from "lucide-react";
import useStore from "../../store/useStore";

const routeTitles = {
  "/": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export default function Header() {
  const { pathname } = useLocation();
  const { darkMode, toggleDarkMode } = useStore();

  const title = routeTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-[64px] shrink-0 flex items-center px-6 gap-4 bg-[var(--bg-secondary)] border-b border-[var(--border)]">

      <h1 className="font-bold text-[18px] shrink-0 mr-2 text-[var(--text-primary)]">
        {title}
      </h1>

      <div className="flex-1" />


      <div className="flex items-center gap-1">

        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors relative text-[var(--text-secondary)] hover:bg-[var(--bg-card)]">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </button>


        <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors text-[var(--text-secondary)] hover:bg-[var(--bg-card)]">
          <MessageSquare size={17} />
        </button>


        <div className="w-px h-6 mx-1 bg-[var(--border)]" />


        <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-colors hover:bg-[var(--bg-card)]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 bg-[var(--accent)]">
            RS
          </div>
          <span className="text-sm font-semibold hidden md:block text-[var(--text-primary)]">
            Rakshit Sheoran
          </span>
          <ChevronDown
            size={14}
            className="hidden md:block text-[var(--text-muted)]"
          />
        </button>
      </div>
    </header>
  );
}
