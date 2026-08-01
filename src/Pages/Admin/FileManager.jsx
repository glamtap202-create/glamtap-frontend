import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import StatCard from "../Components/StatCard";
import PageHeader from "../Components/PageHeader";

const stats = [
  { label: "Total Images", value: "36,476 GB", percent: 32, trend: "up", trendValue: "+32.40%", ringColor: "#4a5fe8" },
  { label: "Total Videos", value: "53,406 GB", percent: 48, trend: "down", trendValue: "-18.45%", ringColor: "#4a5fe8" },
  { label: "Total Documents", value: "90,875 GB", percent: 89, trend: "up", trendValue: "+20.34%", ringColor: "#ef4444" },
  { label: "Total Musics", value: "63,076 GB", percent: 55, trend: "up", trendValue: "+14.45%", ringColor: "#4a5fe8" },
];

const chartData = [
  { month: "Jan", image: 4000, video: 2400, docs: 1600, music: 1000 },
  { month: "Feb", image: 5200, video: 4600, docs: 5100, music: 3400 },
  { month: "Mar", image: 6400, video: 6800, docs: 4000, music: 2000 },
  { month: "Apr", image: 3400, video: 4200, docs: 6600, music: 3000 },
  { month: "May", image: 4600, video: 4000, docs: 5200, music: 3200 },
  { month: "Jun", image: 6800, video: 6200, docs: 4800, music: 5800 },
  { month: "Jul", image: 6600, video: 4400, docs: 4000, music: 3200 },
  { month: "Aug", image: 3400, video: 5600, docs: 6200, music: 4200 },
  { month: "Sep", image: 4400, video: 5800, docs: 6400, music: 2200 },
  { month: "Oct", image: 4600, video: 5000, docs: 3400, music: 3600 },
  { month: "Nov", image: 3600, video: 2400, docs: 3200, music: 2400 },
  { month: "Dec", image: 6400, video: 6000, docs: 4600, music: 2400 },
];

const files = [
  { name: "Brand Guidelines.pdf", type: "Document", size: "4.2 MB", updated: "2 hours ago" },
  { name: "Product Shoot - Final", type: "Image folder", size: "1.1 GB", updated: "Yesterday" },
  { name: "Q3 Highlights.mp4", type: "Video", size: "640 MB", updated: "3 days ago" },
  { name: "Podcast Ep. 12.mp3", type: "Music", size: "58 MB", updated: "5 days ago" },
];

export default function FileManager() {
  const usedPercent = 78;
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (usedPercent / 100) * circumference;

  return (
    <div>
      <PageHeader
        title="File Manager"
        subtitle="An overview of everything stored across your workspace."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Total Storage used</p>
              <p className="mt-1 flex items-center gap-2 text-2xl font-bold text-slate-900">
                105,000 GB
                <span className="text-xs font-semibold text-emerald-500">↗ 32.40% last year</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Legend color="#3730a3" label="Image" />
              <Legend color="#4a5fe8" label="Video" />
              <Legend color="#93a5fb" label="Documents" />
              <Legend color="#dbe2fd" label="Musics" />
            </div>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid vertical={false} stroke="#eef1f6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="image" stackId="a" fill="#3730a3" radius={[0, 0, 0, 0]} />
                <Bar dataKey="video" stackId="a" fill="#4a5fe8" />
                <Bar dataKey="docs" stackId="a" fill="#93a5fb" />
                <Bar dataKey="music" stackId="a" fill="#dbe2fd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-col items-center py-4">
            <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#eef1f6" strokeWidth="16" />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#4a5fe8"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="-mt-32 text-center">
              <p className="text-3xl font-extrabold text-slate-900">78 GB</p>
              <p className="text-xs text-slate-400">Used of 100</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-200" /> Available storage
              </span>
              <span className="font-semibold text-slate-700">22%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-brand-600" /> Total used storage
              </span>
              <span className="font-semibold text-slate-700">78%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold text-slate-800">Recent files</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Size</th>
                <th className="pb-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((f) => (
                <tr key={f.name}>
                  <td className="py-3 font-medium text-slate-700">{f.name}</td>
                  <td className="py-3 text-slate-500">{f.type}</td>
                  <td className="py-3 text-slate-500">{f.size}</td>
                  <td className="py-3 text-slate-500">{f.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
