import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Scissors,
  UserCog,
  Wallet,
  Star,
  Tag,
  MapPin,
  Clock,
  Bell,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarCheck },
  { key: "customers", label: "Customers", icon: Users },
  { key: "services", label: "Services Management", icon: Scissors },
  { key: "beauticians", label: "Beauticians Management", icon: UserCog },
  { key: "earnings", label: "Earnings & Wallet", icon: Wallet },
  { key: "reviews", label: "Reviews & Ratings", icon: Star },
  { key: "offers", label: "Coupons & Offers", icon: Tag },
  { key: "areas", label: "Service Areas", icon: MapPin },
  { key: "hours", label: "Working Hours & Availability", icon: Clock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "profile", label: "Settings & Profile", icon: Settings },
  { key: "support", label: "Support & Help", icon: LifeBuoy },
];

export default function Sidebar({ active, onNavigate, open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("partnerToken");
    navigate("/", { replace: true });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 shrink-0 transform bg-white border-r border-rose-100
          transition-transform duration-200 ease-out
          lg:static lg:translate-x-0 lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-6 py-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white font-bold">
              G
            </div>
            <span className="text-lg font-semibold text-slate-800">
              GlamTap
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                const isActive = active === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => {
                        onNavigate(key);
                        onClose?.();
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-rose-50 text-rose-600"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className={isActive ? "text-rose-500" : "text-slate-400"}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-rose-100 px-3 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            >
              <LogOut size={18} className="text-slate-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}