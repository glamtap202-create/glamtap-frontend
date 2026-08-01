import PageHeader from "../Components/PageHeader";

const kpis = [
  { label: "Revenue (MTD)", value: "₹42.8L", trendValue: "+12.3%", trend: "up" },
  { label: "Net Profit", value: "₹9.6L", trendValue: "+4.1%", trend: "up" },
  { label: "Active Employees", value: "186", trendValue: "-1.2%", trend: "down" },
  { label: "Customer NPS", value: "62", trendValue: "+6 pts", trend: "up" },
];

const departments = [
  { name: "Sales", target: 82 },
  { name: "Operations", target: 64 },
  { name: "Marketing", target: 71 },
  { name: "Customer Success", target: 90 },
];

export default function Executive() {
  return (
    <div>
      <PageHeader title="Executive" subtitle="High-level performance summary for leadership." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-sm text-slate-500">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{k.value}</p>
            <p className={`mt-1 text-xs font-medium ${k.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
              {k.trend === "up" ? "↗" : "↘"} {k.trendValue} <span className="text-slate-400">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Department target achievement</p>
        <div className="space-y-4">
          {departments.map((d) => (
            <div key={d.name}>
              <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                <span>{d.name}</span>
                <span>{d.target}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${d.target}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
