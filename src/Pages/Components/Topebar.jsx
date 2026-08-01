import { Menu, Bell } from "lucide-react";

export default function Topebar({ onMenuClick, title }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-rose-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            GlamTap Partner Panel
          </p>
          <p className="text-xs text-slate-400">Salon / Beautician</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-lg p-1.5 text-slate-500 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-600">
          GT
        </div>
      </div>
    </header>
  );
}