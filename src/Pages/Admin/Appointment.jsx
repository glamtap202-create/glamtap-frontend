import PageHeader from "../Components/PageHeader";
import { Clock, MapPin, Video } from "lucide-react";

const today = [
  { time: "09:00 AM", client: "Ananya Sharma", type: "In-person", topic: "Skin consultation", mode: "location" },
  { time: "11:30 AM", client: "Rohan Verma", type: "Video call", topic: "Follow-up review", mode: "video" },
  { time: "02:00 PM", client: "Meera Iyer", type: "In-person", topic: "Salon booking", mode: "location" },
];

const upcoming = [
  { date: "24 Jul", client: "Kabir Singh", topic: "Home service - haircut" },
  { date: "25 Jul", client: "Priya Nair", topic: "Bridal makeup trial" },
  { date: "27 Jul", client: "Aditya Rao", topic: "Consultation call" },
  { date: "29 Jul", client: "Sana Khan", topic: "Spa package" },
];

export default function Appointment() {
  return (
    <div>
      <PageHeader
        title="Appointment"
        subtitle="Manage today's schedule and upcoming bookings."
        action={
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            + New appointment
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="mb-4 text-sm font-semibold text-slate-800">Today · 23 Jul</p>
          <div className="space-y-3">
            {today.map((a) => (
              <div
                key={a.time}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-brand-700 shadow-card">
                    <Clock size={14} className="mb-1" />
                    {a.time}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{a.client}</p>
                    <p className="text-xs text-slate-500">{a.topic}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-card">
                  {a.mode === "video" ? <Video size={12} /> : <MapPin size={12} />}
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="mb-4 text-sm font-semibold text-slate-800">Upcoming</p>
          <ul className="space-y-4">
            {upcoming.map((u) => (
              <li key={u.client} className="flex gap-3">
                <div className="flex h-10 w-12 flex-col items-center justify-center rounded-lg bg-brand-50 text-[11px] font-bold text-brand-700">
                  {u.date}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{u.client}</p>
                  <p className="text-xs text-slate-500">{u.topic}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
