import PageHeader from "../Components/PageHeader";

const shipments = [
  { id: "SHP-3821", destination: "Mumbai, MH", status: "In transit", eta: "24 Jul" },
  { id: "SHP-3822", destination: "Bengaluru, KA", status: "Delivered", eta: "22 Jul" },
  { id: "SHP-3823", destination: "Jaipur, RJ", status: "Pending pickup", eta: "26 Jul" },
  { id: "SHP-3824", destination: "Kolkata, WB", status: "In transit", eta: "25 Jul" },
];

const statusStyle = {
  Delivered: "bg-emerald-50 text-emerald-600",
  "In transit": "bg-brand-50 text-brand-700",
  "Pending pickup": "bg-amber-50 text-amber-600",
};

export default function Logistics() {
  return (
    <div>
      <PageHeader title="Logistics" subtitle="Track shipments across your delivery network." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Active shipments</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">312</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">On-time delivery rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">94.2%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Avg. delivery time</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">2.4 days</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Recent shipments</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Shipment ID</th>
                <th className="pb-3 font-medium">Destination</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 font-medium text-slate-700">{s.id}</td>
                  <td className="py-3 text-slate-500">{s.destination}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
