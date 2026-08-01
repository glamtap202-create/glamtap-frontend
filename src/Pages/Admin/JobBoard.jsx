import PageHeader from "../Components/PageHeader";

const jobs = [
  { title: "Frontend Engineer", dept: "Engineering", applicants: 42, status: "Open" },
  { title: "Salon Stylist - Delhi", dept: "Operations", applicants: 18, status: "Open" },
  { title: "Marketing Manager", dept: "Marketing", applicants: 27, status: "Interviewing" },
  { title: "Customer Support Lead", dept: "Support", applicants: 12, status: "Closed" },
];

const statusStyle = {
  Open: "bg-emerald-50 text-emerald-600",
  Interviewing: "bg-amber-50 text-amber-600",
  Closed: "bg-slate-100 text-slate-500",
};

export default function JobBoard() {
  return (
    <div>
      <PageHeader
        title="Job Board"
        subtitle="Manage open roles and track applicants."
        action={
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            + Post a job
          </button>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Applicants</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((j) => (
                <tr key={j.title}>
                  <td className="py-3 font-medium text-slate-700">{j.title}</td>
                  <td className="py-3 text-slate-500">{j.dept}</td>
                  <td className="py-3 text-slate-500">{j.applicants}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[j.status]}`}>
                      {j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
