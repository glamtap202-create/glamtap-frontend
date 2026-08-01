import StatCard from "./StatCard";

const PAYOUT_HISTORY = [
  { date: "20 Jun 2026", amount: "₹8,200", status: "Paid", txn: "TXN10234" },
  { date: "13 Jun 2026", amount: "₹6,450", status: "Paid", txn: "TXN10198" },
  { date: "06 Jun 2026", amount: "₹5,900", status: "Pending", txn: "TXN10156" },
];

const STATUS_STYLES = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function Earnings() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
        Earnings &amp; Wallet
      </h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total Earnings" value="₹2,46,000" tone="rose" />
        <StatCard label="Commission (5%)" value="₹49,000" tone="amber" />
        <StatCard label="Net Earnings" value="₹1,98,000" sublabel="This Month" tone="green" />
      </div>

      <div className="rounded-2xl border border-rose-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Payout History
          </h2>
          <button className="text-xs font-medium text-rose-500 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-slate-400">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAYOUT_HISTORY.map((p) => (
                <tr key={p.txn}>
                  <td className="py-2.5 text-slate-500">{p.date}</td>
                  <td className="py-2.5 font-medium text-slate-700">
                    {p.amount}
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-400">{p.txn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}