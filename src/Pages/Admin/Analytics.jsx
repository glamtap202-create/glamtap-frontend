import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "../Components/PageHeader";

const data = [
  { source: "Organic", visits: 5200 },
  { source: "Direct", visits: 3100 },
  { source: "Social", visits: 2400 },
  { source: "Referral", visits: 1600 },
  { source: "Email", visits: 980 },
];

export default function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Traffic sources and overall site performance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total sessions</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">13,280</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Bounce rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">38.4%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Avg. session duration</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">3m 42s</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Traffic by source</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="source" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="visits" fill="#4a5fe8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
