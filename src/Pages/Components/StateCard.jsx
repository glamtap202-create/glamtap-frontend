export default function StateCard({ label, value, tone = "rose", sublabel }) {
  const tones = {
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-sky-50 text-sky-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className={`rounded-2xl p-4 ${tones[tone]}`}>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="mt-1 text-xl font-bold sm:text-2xl">{value}</p>
      {sublabel && <p className="mt-0.5 text-[11px] opacity-70">{sublabel}</p>}
    </div>
  );
}
