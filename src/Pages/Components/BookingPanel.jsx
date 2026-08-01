import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

const TABS = ["New", "Accepted", "Ongoing", "Completed", "Cancelled"];

const ALL_BOOKINGS = {
  New: [
    { customer: "Riya Kapoor", service: "Bridal Makeup", when: "26 Jun, 09:00 AM", status: "New" },
  ],
  Accepted: [
    { customer: "Priya Sharma", service: "Facial", when: "26 Jun, 09:00 AM", status: "Accepted" },
    { customer: "Neha Gupta", service: "Hair Spa", when: "26 Jun, 10:30 AM", status: "Accepted" },
    { customer: "Arjun Singh", service: "Clean Up", when: "26 Jun, 12:00 PM", status: "Accepted" },
    { customer: "Aarav Verma", service: "Hair Spa", when: "26 Jun, 03:00 PM", status: "Accepted" },
    { customer: "Pooja Mehta", service: "Body Massage", when: "26 Jun, 04:00 PM", status: "Accepted" },
  ],
  Ongoing: [
    { customer: "Priya Sharma", service: "Facial", when: "Today, 10:00 AM", status: "Ongoing" },
  ],
  Completed: [
    { customer: "Kavya Nair", service: "Manicure", when: "24 Jun, 11:00 AM", status: "Completed" },
  ],
  Cancelled: [],
};

const STATUS_STYLES = {
  New: "bg-sky-50 text-sky-600",
  Accepted: "bg-emerald-50 text-emerald-600",
  Ongoing: "bg-amber-50 text-amber-600",
  Completed: "bg-slate-100 text-slate-500",
  Cancelled: "bg-rose-50 text-rose-500",
};

export default function BookingsPanel() {
  const [tab, setTab] = useState("Accepted");
  const bookings = ALL_BOOKINGS[tab];

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-800">Bookings</h2>
        <button className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-600">
          + New Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-slate-50 p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === t
                ? "bg-white text-rose-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table (desktop) */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-400">
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Service</th>
              <th className="pb-2 font-medium">Date &amp; Time</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b, i) => (
              <tr key={i}>
                <td className="py-2.5 font-medium text-slate-700">
                  {b.customer}
                </td>
                <td className="py-2.5 text-slate-500">{b.service}</td>
                <td className="py-2.5 text-slate-500">{b.when}</td>
                <td className="py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <button className="hover:text-rose-500" aria-label="Call customer">
                      <Phone size={15} />
                    </button>
                    <button className="hover:text-rose-500" aria-label="Message customer">
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-400">
            No bookings in this stage.
          </p>
        )}
      </div>

      {/* Cards (mobile) */}
      <div className="space-y-3 sm:hidden">
        {bookings.map((b, i) => (
          <div key={i} className="rounded-xl border border-slate-100 p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-700">{b.customer}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[b.status]}`}
              >
                {b.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{b.service}</p>
            <p className="text-xs text-slate-400">{b.when}</p>
            <div className="mt-2 flex items-center gap-3 text-slate-400">
              <button className="flex items-center gap-1 text-xs hover:text-rose-500">
                <Phone size={14} /> Call
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-rose-500">
                <MessageCircle size={14} /> Message
              </button>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-400">
            No bookings in this stage.
          </p>
        )}
      </div>
    </div>
  );
}