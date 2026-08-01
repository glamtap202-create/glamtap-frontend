import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "../Components/PageHeader";

const data = [
  { month: "Feb", income: 320000, expense: 210000 },
  { month: "Mar", income: 410000, expense: 260000 },
  { month: "Apr", income: 380000, expense: 240000 },
  { month: "May", income: 460000, expense: 300000 },
  { month: "Jun", income: 520000, expense: 310000 },
  { month: "Jul", income: 498000, expense: 295000 },
];

export default function Financial() {
  return (
    <div>
      <PageHeader title="Financial" subtitle="Income vs expenses over the last 6 months." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total income</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹25.9L</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total expenses</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹16.2L</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Net savings</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">₹9.7L</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Income vs Expense</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a5fe8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4a5fe8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#4a5fe8" fill="url(#income)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="expense" stroke="#f97316" fill="url(#expense)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
