import { Star } from "lucide-react";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";

const TODAYS_APPOINTMENTS = [
  { time: "10:00 AM", name: "Priya Sharma", service: "Facial", status: "Ongoing" },
  { time: "11:30 AM", name: "Neha Gupta", service: "Hair Spa", status: "Confirmed" },
  { time: "1:00 PM", name: "Arjun Singh", service: "Clean Up", status: "Confirmed" },
  { time: "3:30 PM", name: "Aarav Verma", service: "Hair Spa", status: "Pending" },
];

const RECENT_REVIEWS = [
  { name: "Priya Sharma", rating: 5, text: "Amazing facial! Loved the service." },
  { name: "Neha Gupta", rating: 4, text: "Very good service." },
];

const STATUS_STYLES = {
  Ongoing: "bg-sky-50 text-sky-600",
  Confirmed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function DashboardHome() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Here's what's happening with your salon today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Today's Revenue" value="₹12,450" tone="rose" />
        <StatCard label="Today's Bookings" value="24" tone="blue" />
        <StatCard label="Pending Bookings" value="5" tone="amber" />
        <StatCard label="Rating" value="4.8" sublabel="out of 5" tone="green" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Today's appointments */}
        <div className="rounded-2xl border border-rose-100 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">
            Today's Appointments
          </h2>
          <ul className="divide-y divide-slate-100">
            {TODAYS_APPOINTMENTS.map((a) => (
              <li
                key={a.name + a.time}
                className="flex items-center justify-between gap-2 py-2.5 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-700">
                    {a.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {a.time} &middot; {a.service}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[a.status]}`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly revenue */}
        <div className="rounded-2xl border border-rose-100 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">
            Monthly Revenue
          </h2>
          <RevenueChart data={[8, 14, 10, 18, 15, 22, 19, 26, 23, 30, 27, 34]} />
        </div>
      </div>

      {/* Recent reviews */}
      <div className="rounded-2xl border border-rose-100 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          Recent Reviews
        </h2>
        <ul className="space-y-3">
          {RECENT_REVIEWS.map((r) => (
            <li key={r.name} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">
                {r.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-slate-700">
                    {r.name}
                  </p>
                  <span className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}