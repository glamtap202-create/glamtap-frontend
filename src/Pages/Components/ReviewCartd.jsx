import { Star } from "lucide-react";

const BREAKDOWN = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 14 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

const REVIEWS = [
  { name: "Priya Sharma", rating: 5, text: "Amazing facial! Loved the service." },
  { name: "Neha Gupta", rating: 4, text: "Very good service." },
];

export default function ReviewsCard() {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-slate-800">Reviews</h2>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl font-bold text-slate-800">4.8</span>
        <div>
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="text-xs text-slate-400">out of 5 (124 reviews)</p>
        </div>
      </div>

      <div className="mb-4 space-y-1.5">
        {BREAKDOWN.map((b) => (
          <div key={b.stars} className="flex items-center gap-2 text-xs">
            <span className="w-8 text-slate-400">{b.stars} Star</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className="w-8 text-right text-slate-400">{b.pct}%</span>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {REVIEWS.map((r) => (
          <li key={r.name} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-slate-700">{r.name}</p>
              <span className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>
            <p className="text-sm text-slate-500">{r.text}</p>
            <button className="mt-0.5 text-xs font-medium text-rose-500 hover:underline">
              Reply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}