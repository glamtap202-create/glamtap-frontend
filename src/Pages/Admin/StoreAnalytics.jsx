import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "../Components/PageHeader";

const data = [
  { day: "Mon", visitors: 1200, sales: 320 },
  { day: "Tue", visitors: 1900, sales: 410 },
  { day: "Wed", visitors: 1600, sales: 380 },
  { day: "Thu", visitors: 2400, sales: 520 },
  { day: "Fri", visitors: 2100, sales: 600 },
  { day: "Sat", visitors: 3000, sales: 780 },
  { day: "Sun", visitors: 2600, sales: 690 },
];

export default function StoreAnalytics() {
  return (
    <div>
      <PageHeader title="Store Analytics" subtitle="Visitor traffic and sales conversion for your store." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Store visitors (7d)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">14,800</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Conversion rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">3.9%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Avg. order value</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹1,240</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Visitors vs Sales</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#4a5fe8" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
