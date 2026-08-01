import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard } from "./AdminUI";

const STATUS_COLORS = {
  confirmed: "#4CAF7D",
  completed: "#4CAF7D",
  pending: "#E3A33B",
  cancelled: "#D9534F",
  ongoing: "#8B6FC9",
};

export default function AdminReports() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("30"); // days

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [bookingsRes, paymentsRes, settlementsRes] = await Promise.allSettled([
        API.get("/bookings"),
        API.get("/payments"),
        API.get("/settlements"),
      ]);

      if (bookingsRes.status === "fulfilled") setBookings(bookingsRes.value.data.bookings || []);
      if (paymentsRes.status === "fulfilled") setPayments(paymentsRes.value.data.payments || []);
      if (settlementsRes.status === "fulfilled") setSettlements(settlementsRes.value.data.settlements || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // ---- Filter bookings by selected range ----
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - Number(range));
  const filteredBookings = bookings.filter((b) => new Date(b.bookingDate) >= cutoff);

  // ---- Revenue trend (daily) ----
  const buildRevenueSeries = () => {
    const byDate = {};
    filteredBookings.forEach((b) => {
      const d = new Date(b.bookingDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      byDate[d] = (byDate[d] || 0) + (b.totalAmount || 0);
    });
    return Object.entries(byDate)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // ---- Bookings by status ----
  const buildStatusBreakdown = () => {
    const counts = {};
    filteredBookings.forEach((b) => {
      const key = (b.status || "pending").toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([status, value]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value,
      color: STATUS_COLORS[status] || "#B23A5C",
    }));
  };

  // ---- Top services ----
  const buildTopServices = () => {
    const counts = {};
    filteredBookings.forEach((b) => {
      b.services?.forEach((s) => {
        if (!counts[s.name]) counts[s.name] = { name: s.name, bookings: 0, revenue: 0 };
        counts[s.name].bookings += s.quantity || 1;
        counts[s.name].revenue += s.price || 0;
      });
    });
    return Object.values(counts)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  };

  const totalRevenue = filteredBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalBookings = filteredBookings.length;
  const avgOrderValue = totalBookings ? Math.round(totalRevenue / totalBookings) : 0;
  const totalSettlementsPaid = settlements
    .filter((s) => s.status === "paid")
    .reduce((sum, s) => sum + (s.amount || 0), 0);

  const revenueSeries = buildRevenueSeries();
  const statusBreakdown = buildStatusBreakdown();
  const topServices = buildTopServices();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Reports" subtitle="Revenue, bookings and performance insights">
        <div className="flex justify-end -mt-14 mb-4">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52] bg-white outline-none"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 1 year</option>
          </select>
        </div>

        {error && (
          <Panel>
            <p className="text-sm text-[#B23A2A]">{error}</p>
          </Panel>
        )}

        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} tint="bg-[#E9F3EA]" />
          <MetricCard label="Total bookings" value={totalBookings} tint="bg-[#EFE9F7]" />
          <MetricCard label="Avg. order value" value={`₹${avgOrderValue.toLocaleString("en-IN")}`} tint="bg-[#FDF2E1]" />
          <MetricCard label="Settlements paid" value={`₹${totalSettlementsPaid.toLocaleString("en-IN")}`} tint="bg-[#F3E9EC]" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          <Panel title="Revenue trend" className="col-span-2">
            {revenueSeries.length === 0 ? (
              <p className="text-sm text-[#8a7580]">Not enough data for this range.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={revenueSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3E9EC" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8a7580" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#8a7580" }} />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                    contentStyle={{ borderRadius: 10, border: "1px solid #EEE3E7", fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#B23A5C" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Panel>

          <Panel title="Bookings by status">
            {statusBreakdown.length === 0 ? (
              <p className="text-sm text-[#8a7580]">No bookings in this range.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    {statusBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #EEE3E7", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Panel>
        </div>

        {/* Top services */}
        <Panel title="Top services by revenue">
          {topServices.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No service data in this range.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topServices}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3E9EC" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8a7580" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#8a7580" }} />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                    contentStyle={{ borderRadius: 10, border: "1px solid #EEE3E7", fontSize: 12 }}
                  />
                  <Bar dataKey="revenue" fill="#B23A5C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-1">
                {topServices.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#F3E9EC] last:border-0">
                    <p className="text-sm text-[#2A1B26]">{s.name}</p>
                    <p className="text-xs text-[#8a7580]">
                      {s.bookings} bookings · <span className="font-medium text-[#2A1B26]">₹{s.revenue.toLocaleString("en-IN")}</span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}