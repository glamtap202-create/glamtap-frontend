import PageHeader from "../Components/PageHeader";

const projects = [
  { name: "Website Revamp", owner: "Neha Kapoor", progress: 72, status: "On track", due: "12 Aug" },
  { name: "Mobile App v2", owner: "Arjun Mehta", progress: 45, status: "At risk", due: "02 Sep" },
  { name: "Salon Booking API", owner: "Divya Rao", progress: 90, status: "On track", due: "28 Jul" },
  { name: "Loyalty Program", owner: "Karan Malhotra", progress: 20, status: "Delayed", due: "15 Sep" },
];

const statusStyle = {
  "On track": "bg-emerald-50 text-emerald-600",
  "At risk": "bg-amber-50 text-amber-600",
  Delayed: "bg-rose-50 text-rose-600",
};

export default function Project() {
  return (
    <div>
      <PageHeader
        title="Project"
        subtitle="Track progress across all active projects."
        action={
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            + New project
          </button>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Progress</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.name}>
                  <td className="py-3 font-medium text-slate-700">{p.name}</td>
                  <td className="py-3 text-slate-500">{p.owner}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-brand-600" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{p.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
