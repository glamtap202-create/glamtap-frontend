import PageHeader from "../Components/PageHeader";

const orders = [
  { id: "#10234", customer: "Vikram Anand", amount: "₹2,499", status: "Delivered" },
  { id: "#10235", customer: "Sneha Pillai", amount: "₹1,150", status: "Processing" },
  { id: "#10236", customer: "Rahul Deshmukh", amount: "₹4,800", status: "Shipped" },
  { id: "#10237", customer: "Anjali Menon", amount: "₹899", status: "Cancelled" },
];

const statusStyle = {
  Delivered: "bg-emerald-50 text-emerald-600",
  Processing: "bg-amber-50 text-amber-600",
  Shipped: "bg-brand-50 text-brand-700",
  Cancelled: "bg-rose-50 text-rose-600",
};

export default function ECommerce() {
  return (
    <div>
      <PageHeader title="E-Commerce" subtitle="Orders and store performance at a glance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total orders</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">1,284</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Revenue (MTD)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹18.6L</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Return rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">2.1%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">New customers</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">312</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Recent orders</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 font-medium text-slate-700">{o.id}</td>
                  <td className="py-3 text-slate-500">{o.customer}</td>
                  <td className="py-3 text-slate-500">{o.amount}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[o.status]}`}>
                      {o.status}
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
