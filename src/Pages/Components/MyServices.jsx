import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const INITIAL_SERVICES = [
  { id: 1, name: "Hydra Facial", duration: "45 min", price: 1499, active: true },
  { id: 2, name: "Gold Facial", duration: "60 min", price: 1899, active: true },
  { id: 3, name: "Wax Wax", duration: "30 min", price: 499, active: true },
  { id: 4, name: "Hair Spa", duration: "50 min", price: 1299, active: false },
  { id: 5, name: "Body Massage", duration: "60 min", price: 1999, active: true },
];

export default function MyServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);

  const toggle = (id) =>
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">My Services</h2>
        <button className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-600">
          + Add Service
        </button>
      </div>

      <ul className="divide-y divide-slate-100">
        {services.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-700">
                {s.name}
              </p>
              <p className="text-xs text-slate-400">
                {s.duration} &middot; ₹{s.price.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                role="switch"
                aria-checked={s.active}
                onClick={() => toggle(s.id)}
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  s.active ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    s.active ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
              <button className="text-slate-400 hover:text-rose-500" aria-label="Edit">
                <Pencil size={15} />
              </button>
              <button className="text-slate-400 hover:text-rose-500" aria-label="Delete">
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}