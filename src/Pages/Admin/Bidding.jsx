import PageHeader from "../Components/PageHeader";
import { Gavel } from "lucide-react";

const auctions = [
  { item: "Vintage Camera Lens", currentBid: "₹8,400", bids: 14, timeLeft: "2h 12m" },
  { item: "Handmade Wooden Desk", currentBid: "₹22,000", bids: 9, timeLeft: "5h 40m" },
  { item: "Limited Edition Sneakers", currentBid: "₹15,750", bids: 27, timeLeft: "45m" },
  { item: "Antique Wall Clock", currentBid: "₹6,100", bids: 6, timeLeft: "1d 3h" },
];

export default function Bidding() {
  return (
    <div>
      <PageHeader
        title="Bidding"
        subtitle="Live auctions currently open on your marketplace."
        action={
          <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Gavel size={16} /> New auction
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {auctions.map((a) => (
          <div key={a.item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-slate-800">{a.item}</p>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                {a.timeLeft} left
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{a.currentBid}</p>
            <p className="text-xs text-slate-500">{a.bids} bids placed</p>
          </div>
        ))}
      </div>
    </div>
  );
}
