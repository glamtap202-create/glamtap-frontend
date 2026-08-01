import PageHeader from "../Components/PageHeader";

const affiliates = [
  { name: "Nikhil Joshi", referrals: 128, earnings: "₹64,200", rate: "12%" },
  { name: "Pooja Reddy", referrals: 96, earnings: "₹48,800", rate: "10%" },
  { name: "Aman Gupta", referrals: 74, earnings: "₹31,500", rate: "10%" },
  { name: "Tanya Sethi", referrals: 52, earnings: "₹22,900", rate: "8%" },
];

export default function Affiliate() {
  return (
    <div>
      <PageHeader
        title="Affiliate"
        subtitle="Monitor referral performance and payouts."
        action={
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Export report
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total affiliates</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">248</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Total referrals (MTD)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">1,842</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Commission paid out</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹3.2L</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Top affiliates</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Referrals</th>
                <th className="pb-3 font-medium">Earnings</th>
                <th className="pb-3 font-medium">Commission rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {affiliates.map((a) => (
                <tr key={a.name}>
                  <td className="py-3 font-medium text-slate-700">{a.name}</td>
                  <td className="py-3 text-slate-500">{a.referrals}</td>
                  <td className="py-3 text-slate-500">{a.earnings}</td>
                  <td className="py-3 text-slate-500">{a.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
