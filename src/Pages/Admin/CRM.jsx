import PageHeader from "../Components/PageHeader";

const pipeline = [
  { stage: "New leads", count: 24, value: "₹8.4L" },
  { stage: "Contacted", count: 16, value: "₹5.1L" },
  { stage: "Proposal sent", count: 9, value: "₹3.9L" },
  { stage: "Won", count: 5, value: "₹2.6L" },
];

const contacts = [
  { name: "Ishaan Bhatt", company: "Bhatt Textiles", stage: "Proposal sent", email: "ishaan@bhatttex.com" },
  { name: "Ritu Chawla", company: "Chawla Interiors", stage: "Contacted", email: "ritu@chawlainteriors.com" },
  { name: "Farhan Ali", company: "Ali Foods", stage: "Won", email: "farhan@alifoods.in" },
  { name: "Simran Kaur", company: "Kaur Logistics", stage: "New lead", email: "simran@kaurlog.com" },
];

export default function CRM() {
  return (
    <div>
      <PageHeader title="CRM" subtitle="Track your sales pipeline and contacts." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {pipeline.map((p) => (
          <div key={p.stage} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-sm text-slate-500">{p.stage}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{p.count}</p>
            <p className="text-xs text-slate-400">{p.value} pipeline value</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Contacts</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contacts.map((c) => (
                <tr key={c.name}>
                  <td className="py-3 font-medium text-slate-700">{c.name}</td>
                  <td className="py-3 text-slate-500">{c.company}</td>
                  <td className="py-3 text-slate-500">{c.email}</td>
                  <td className="py-3 text-slate-500">{c.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
