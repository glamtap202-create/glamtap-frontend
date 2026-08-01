import { navItems } from "./navItems";

export default function Sidebar({ active, onNavigate, open, onClose }) {
  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 shrink-0 transform border-r border-slate-200 bg-white
        transition-transform duration-200 ease-in-out lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-6 py-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              i
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              isomorphic
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Overview
            </p>
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.key)}
                      className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-brand-50 text-brand-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          size={18}
                          strokeWidth={2}
                          className={isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"}
                        />
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-500">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">
                Upgrade to Pro
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Unlock all modules and more storage.
              </p>
              <button className="mt-3 w-full rounded-lg bg-brand-600 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
