export default function StatCard({ label, value, percent = 0, trend, trendValue, ringColor }) {
  const isUp = trend === "up";
  const circumference = 2 * Math.PI * 26;
  const safePercent = Number.isFinite(percent) ? percent : 0;
  const offset = circumference - (safePercent / 100) * circumference;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        <p
          className={`mt-1 flex items-center gap-1 text-xs font-medium ${
            isUp ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {isUp ? "↗" : "↘"} {trendValue}
          <span className="font-normal text-slate-400">last month</span>
        </p>
      </div>

      <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#eef1f6" strokeWidth="7" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke={ringColor}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <text
          x="32"
          y="34"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#1e293b"
          transform="rotate(90 32 32)"
        >
          {safePercent}%
        </text>
      </svg>
    </div>
  );
}