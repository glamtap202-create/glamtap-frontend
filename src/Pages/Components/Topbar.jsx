import { Search, Bell, Mail, Settings, Menu } from "lucide-react";

export default function Topbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg border border-slate-200 p-2 text-slate-500 lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="hidden text-sm font-semibold text-slate-800 lg:block lg:w-48">
        {title}
      </div>

      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search your page..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-14 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md bg-brand-600 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:inline">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50">
          <Mail size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>
        <button className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-50 sm:inline-flex">
          <Settings size={18} />
        </button>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Isomorphic"
          alt="User avatar"
          className="h-9 w-9 rounded-full border border-slate-200"
        />
      </div>
    </header>
  );
}
