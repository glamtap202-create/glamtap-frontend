import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Search } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

const STATUS_COLORS = {
  confirmed: "#4CAF7D",
  completed: "#4CAF7D",
  pending: "#E3A33B",
  cancelled: "#D9534F",
  ongoing: "#8B6FC9",
};

function BookingRow({ booking }) {
  return (
    <div className="border-b border-[#F3E9EC] last:border-0 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-[#8a7580]">
          {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          · {booking.bookingTime}
        </span>
        <StatusBadge status={booking.status} />
      </div>
      <div className="space-y-0.5">
        {booking.services.map((s, i) => (
          <p key={i} className="text-sm text-[#2A1B26]">
            {s.name} × {s.quantity}
            {s.waxType ? ` (${s.waxType})` : ""} — ₹{s.price}
          </p>
        ))}
      </div>
      <p className="text-xs text-[#8a7580] mt-1.5">
        Total: <span className="font-medium text-[#2A1B26]">₹{booking.totalAmount}</span> · {booking.paymentMethod} · {booking.paymentStatus}
      </p>
    </div>
  );
}

function RecentBookingRow({ booking }) {
  const name = `${booking.customer.firstName} ${booking.customer.lastName}`.trim();
  const firstService = booking.services?.[0]?.name || "-";
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F3E9EC] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#2A1B26]">{name || "Guest"}</p>
        <p className="text-xs text-[#8a7580]">{firstService}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-[#8a7580]">
          {new Date(booking.bookingDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
        </p>
        <StatusBadge status={booking.status} />
      </div>
    </div>
  );
}

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/bookings");
      setBookings(data.bookings);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const groupByUser = () => {
    const groups = {};
    bookings.forEach((booking) => {
      const key = booking.userId?._id || booking.customer.phone;
      if (!groups[key]) {
        groups[key] = {
          name: `${booking.customer.firstName} ${booking.customer.lastName}`.trim(),
          email: booking.customer.email,
          phone: booking.customer.phone,
          address: `${booking.customer.address}, ${booking.customer.city}, ${booking.customer.state} - ${booking.customer.pin}`,
          bookings: [],
        };
      }
      groups[key].bookings.push(booking);
    });
    return Object.values(groups);
  };

  // ---- Revenue by date (for line chart) ----
  const buildRevenueSeries = () => {
    const byDate = {};
    bookings.forEach((b) => {
      const d = new Date(b.bookingDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      byDate[d] = (byDate[d] || 0) + (b.totalAmount || 0);
    });
    return Object.entries(byDate)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);
  };

  // ---- Bookings by status (for donut chart) ----
  const buildStatusBreakdown = () => {
    const counts = {};
    bookings.forEach((b) => {
      const key = (b.status || "pending").toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([status, value]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value,
      color: STATUS_COLORS[status] || "#B23A5C",
    }));
  };

  const now = new Date();
  const users = groupByUser();
  const totalBookings = bookings.length;
  const totalUsers = users.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const upcomingCount = bookings.filter((b) => new Date(b.bookingDate) >= now).length;
  const revenueSeries = buildRevenueSeries();
  const statusBreakdown = buildStatusBreakdown();
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 6);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Dashboard" subtitle="Live data from your bookings API">
        <div className="flex justify-end -mt-14 mb-4">
          <div className="flex items-center gap-2 bg-white border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52]/60">
            <Search size={15} />
            Search
          </div>
        </div>

        {/* Top metric cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total customers" value={totalUsers} tint="bg-[#F3E9EC]" />
          <MetricCard label="Total bookings" value={totalBookings} tint="bg-[#EFE9F7]" />
          <MetricCard label="Upcoming bookings" value={upcomingCount} tint="bg-[#FDF2E1]" />
          <MetricCard label="Total revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} tint="bg-[#E9F3EA]" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          <Panel title="Revenue overview" className="col-span-2">
            {revenueSeries.length === 0 ? (
              <p className="text-sm text-[#8a7580]">Not enough data yet.</p>
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

          <Panel title="Bookings overview">
            {statusBreakdown.length === 0 ? (
              <p className="text-sm text-[#8a7580]">No bookings yet.</p>
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

        {/* Recent bookings */}
        <Panel title="Recent bookings">
          {recentBookings.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No bookings yet.</p>
          ) : (
            recentBookings.map((b) => <RecentBookingRow key={b._id} booking={b} />)
          )}
        </Panel>

        {/* Per-customer detailed breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-[#2A1B26] mb-3" style={{ fontFamily: "Georgia, serif" }}>
            All customers
          </h2>
          {users.length === 0 && (
            <Panel>
              <p className="text-sm text-[#8a7580]">No bookings found.</p>
            </Panel>
          )}
          <div className="space-y-5">
            {users.map((user, index) => {
              const upcoming = user.bookings.filter((b) => new Date(b.bookingDate) >= now);
              const past = user.bookings.filter((b) => new Date(b.bookingDate) < now);
              return (
                <Panel key={index}>
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#F3E9EC]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F3E9EC] text-[#B23A5C] flex items-center justify-center font-medium">
                        {(user.name || "G").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[#2A1B26]">{user.name || "Guest"}</p>
                        <p className="text-xs text-[#8a7580]">{user.phone}{user.email ? ` · ${user.email}` : ""}</p>
                        <p className="text-xs text-[#8a7580]">{user.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium text-[#5c4a52]/70 mb-1">Upcoming bookings ({upcoming.length})</p>
                      {upcoming.length === 0 ? (
                        <p className="text-xs text-[#8a7580]">No upcoming bookings</p>
                      ) : (
                        upcoming.map((booking) => <BookingRow key={booking._id} booking={booking} />)
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#5c4a52]/70 mb-1">Previous bookings ({past.length})</p>
                      {past.length === 0 ? (
                        <p className="text-xs text-[#8a7580]">No previous bookings</p>
                      ) : (
                        past.map((booking) => <BookingRow key={booking._id} booking={booking} />)
                      )}
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
      </AdminPageShell>
    </div>
  );
}