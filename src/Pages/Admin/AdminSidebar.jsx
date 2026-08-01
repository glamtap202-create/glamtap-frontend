import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Handshake, ShieldCheck, CalendarCheck, Sparkles,
  Tags, CreditCard, Percent, Ticket, MessageSquareText, Headset, Bell,
  FileText, BarChart3, Settings, KeyRound, History, LogOut, Mail,
} from "lucide-react";
export const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Partners", icon: Handshake, path: "/admin/partners" },
  { label: "Partner approval", icon: ShieldCheck, path: "/admin/partner-approval" },
  { label: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
  { label: "Services", icon: Sparkles, path: "/admin/services" },
  { label: "Categories", icon: Tags, path: "/admin/categories" },
  { label: "Payments", icon: CreditCard, path: "/admin/payments" },
  { label: "Settlements", icon: Percent, path: "/admin/settlements" },
  { label: "Coupons", icon: Ticket, path: "/admin/coupons" },
  { label: "Reviews", icon: MessageSquareText, path: "/admin/reviews" },
   { label: "Enquiries", icon: Mail, path: "/admin/enquiries" },
  { label: "Support tickets", icon: Headset, path: "/admin/support-tickets" },
  { label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { label: "CMS", icon: FileText, path: "/admin/cms" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "Roles & permissions", icon: KeyRound, path: "/admin/roles-permissions" },
  { label: "Activity logs", icon: History, path: "/admin/activity-logs" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // remove your actual auth key(s) here
    localStorage.removeItem("user");    // remove any other stored user/session data
    navigate("/", { replace: true });   // send to home/login, replace so back button can't return to admin
  };

  return (
    <aside className="w-64 shrink-0 bg-[#241222] text-[#EFE3E9] flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-8 h-8 rounded-full bg-[#B23A5C] flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="text-lg font-semibold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
          GlamTap <span className="text-[#D9A441]">Admin</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-0.5">
        {adminNav.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-colors ${
                isActive
                  ? "bg-[#B23A5C] text-white font-medium"
                  : "text-[#EFE3E9]/70 hover:bg-white/5 hover:text-[#EFE3E9]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout is an action, not a route — separate from nav map */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#EFE3E9]/70 hover:bg-white/5 hover:text-[#EFE3E9] transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}