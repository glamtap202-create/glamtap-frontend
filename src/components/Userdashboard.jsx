import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, ShoppingCart, User, Bell, ChevronDown, Calendar,
  CheckCircle2, Wallet, Sparkles, Repeat, Star, Gift, MapPin,
  Headphones, Clock, Ticket, LayoutDashboard, ClipboardList,
  Package, Heart, MapPinned, LogOut, Settings as SettingsIcon
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Bookings", icon: ClipboardList },
  { label: "My Orders", icon: Package },
  { label: "Wallet", icon: Wallet, badge: "₹850" },
  { label: "My Coupons", icon: Ticket },
  { label: "Wishlist", icon: Heart },
  { label: "Addresses", icon: MapPinned },
  { label: "Reviews", icon: Star },
  { label: "Refer & Earn", icon: Gift },
  { label: "Notifications", icon: Bell },
  { label: "Support", icon: Headphones },
  { label: "Settings", icon: SettingsIcon },
  // "Logout" removed from here — handled separately below
];

// ...(stats, quickActions, recentBookings, recommended unchanged)...

export default function UserDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#faf7f9] font-sans">
      {/* ...header unchanged... */}

      <div className="max-w-7xl mx-auto flex">
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-100 px-4 py-6 gap-1">
          {navItems.map(({ label, icon: Icon, badge }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                activeNav === label
                  ? "bg-pink-50 text-[#ec2f7b] font-semibold"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[9px] font-bold bg-[#ec2f7b] text-white px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}

          {/* Logout — separate, real action */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left text-gray-500 hover:bg-gray-50"
          >
            <LogOut size={17} />
            <span className="flex-1">Logout</span>
          </button>

          {/* ...refer & earn box unchanged... */}
        </aside>
        {/* ...rest unchanged... */}
      </div>
    </div>
  );
}