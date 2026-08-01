import PageHeader from "../Components/PageHeader";

const channels = [
  { name: "Instagram", followers: "24.6K", growth: "+3.2%" },
  { name: "Facebook", followers: "18.1K", growth: "+1.1%" },
  { name: "X (Twitter)", followers: "9.4K", growth: "-0.6%" },
  { name: "LinkedIn", followers: "6.7K", growth: "+4.8%" },
];

const posts = [
  { title: "Summer offer announcement", channel: "Instagram", engagement: "4.2K" },
  { title: "Behind the scenes reel", channel: "Instagram", engagement: "3.1K" },
  { title: "Customer testimonial", channel: "Facebook", engagement: "1.8K" },
  { title: "Hiring announcement", channel: "LinkedIn", engagement: "980" },
];

export default function SocialMedia() {
  return (
    <div>
      <PageHeader title="Social Media" subtitle="Follower growth and top performing posts." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {channels.map((c) => (
          <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-sm text-slate-500">{c.name}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{c.followers}</p>
            <p className={`text-xs font-medium ${c.growth.startsWith("-") ? "text-rose-500" : "text-emerald-500"}`}>
              {c.growth} this month
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Top posts</p>
        <ul className="divide-y divide-slate-100">
          {posts.map((p) => (
            <li key={p.title} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">{p.title}</p>
                <p className="text-xs text-slate-400">{p.channel}</p>
              </div>
              <span className="text-sm font-semibold text-brand-600">{p.engagement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
