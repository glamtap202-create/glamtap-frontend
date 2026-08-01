import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Wallet,
  Star,
  Settings,
  LogOut,
  Search,
  Clock,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

/*
  PARTNER PANEL — FRONTEND ONLY (mock data)
  ------------------------------------------
  No partner backend exists yet, so all numbers/lists below are placeholders
  clearly marked in the `mock*` variables. Once partner auth + APIs exist,
  replace the mock blocks with real API calls (same pattern as Account.jsx:
  useEffect -> API.get(...) -> setState), and remove the mock objects.
*/

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "My Bookings", icon: CalendarCheck },
  { key: "services", label: "My Services", icon: Sparkles },
  { key: "earnings", label: "Earnings", icon: Wallet },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "settings", label: "Settings", icon: Settings },
];

// MOCK DATA — replace with real API responses once partner backend exists
const mockPartner = {
  businessName: "Elite Beauty Salon",
  ownerName: "Rahul Mehta",
  email: "rahul@elitebeauty.com",
};

const mockStats = [
  { label: "Assigned Bookings", value: 5, icon: CalendarCheck, bg: "bg-pink-50", fg: "text-pink-600" },
  { label: "Completed", value: 3, icon: CheckCircle2, bg: "bg-emerald-50", fg: "text-emerald-600" },
  { label: "Total Earnings", value: "₹18,450", icon: IndianRupee, bg: "bg-violet-50", fg: "text-violet-600" },
  { label: "Avg. Rating", value: "4.7", icon: Star, bg: "bg-amber-50", fg: "text-amber-600" },
];

const mockBookings = [
  { id: "B01", customer: "Priya Sharma", service: "Hydra Facial", date: "24 Jul 2026", time: "02:30 PM", status: "Confirmed", amount: 999 },
  { id: "B02", customer: "Arfa Khan", service: "Full Arm & Leg Waxing", date: "24 Jul 2026", time: "10:00 AM", status: "Pending", amount: 3960 },
  { id: "B03", customer: "Sneha Rao", service: "Gold Facial", date: "23 Jul 2026", time: "01:00 PM", status: "Completed", amount: 899 },
];

const statusBg = (status) => {
  switch (status) {
    case "Pending": return "bg-amber-50 text-amber-600";
    case "Confirmed": return "bg-blue-50 text-blue-600";
    case "Completed": return "bg-emerald-50 text-emerald-600";
    case "Cancelled": return "bg-red-50 text-red-600";
    default: return "bg-gray-50 text-gray-500";
  }
};

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentPartner");
    if (saved) {
      try {
        setPartner(JSON.parse(saved));
      } catch (err) {
        setPartner(null);
      }
    }
  }, []);

  const actualPartner = partner || mockPartner;

  return (
    <div className="min-h-screen bg-[#faf7f9] flex">

      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 bg-[#1c1626] text-gray-300 px-5 py-7 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[#ec2f7b] flex items-center justify-center text-white font-bold">G</div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm">
              GlamTap <span className="text-amber-400">Partner</span>
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                activeTab === key
                  ? "bg-[#ec2f7b] text-white font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <button className="flex items-center justify-center gap-2 text-sm font-semibold bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2.5 rounded-xl mt-4">
          <LogOut size={15} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 px-6 sm:px-10 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome back, {actualPartner.ownerName} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">{actualPartner.businessName || actualPartner.name}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 w-56">
            <Search size={15} className="text-gray-400" />
            <input placeholder="Search bookings..." className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400" />
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockStats.map(({ label, value, icon: Icon, bg, fg }) => (
                <div key={label} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-50">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${fg} shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 truncate">{label}</p>
                    <p className="text-base font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div>
              <div className="flex items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900">Recent Bookings</h3>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="ml-auto text-xs font-semibold text-[#ec2f7b]"
                >
                  View All
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow border border-gray-50 divide-y divide-gray-50">
                {mockBookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{b.customer}</p>
                      <p className="text-xs text-gray-500 truncate">{b.service}</p>
                    </div>
                    <p className="hidden sm:flex items-center gap-1 text-xs text-gray-400 w-40 shrink-0">
                      <Clock size={12} /> {b.date} · {b.time}
                    </p>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${statusBg(b.status)}`}>
                      {b.status}
                    </span>
                    <p className="text-sm font-bold text-gray-900 w-16 text-right shrink-0">₹{b.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow border border-gray-50 divide-y divide-gray-50">
            {mockBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{b.customer}</p>
                  <p className="text-xs text-gray-500 truncate">{b.service}</p>
                </div>
                <p className="hidden sm:flex items-center gap-1 text-xs text-gray-400 w-40 shrink-0">
                  <Clock size={12} /> {b.date} · {b.time}
                </p>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${statusBg(b.status)}`}>
                  {b.status}
                </span>
                <p className="text-sm font-bold text-gray-900 w-16 text-right shrink-0">₹{b.amount}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-white rounded-2xl shadow border border-gray-50 p-8 text-center text-gray-400 text-sm">
            Services management UI goes here — needs a partner-services API.
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="bg-white rounded-2xl shadow border border-gray-50 p-8 text-center text-gray-400 text-sm">
            Earnings & settlement breakdown goes here — needs a partner-earnings API.
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl shadow border border-gray-50 p-8 text-center text-gray-400 text-sm">
            Customer reviews for this partner go here — needs a partner-reviews API.
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl shadow border border-gray-50 p-8 max-w-xl">
            <h2 className="text-xl font-bold mb-6">Business Profile</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Business Name</p>
                <p className="text-base font-medium">{actualPartner.businessName || actualPartner.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Owner Name</p>
                <p className="text-base font-medium">{actualPartner.ownerName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-base font-medium">{actualPartner.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}