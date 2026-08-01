import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Ongoing", "Completed", "Cancelled"];

function BookingRow({ booking, onStatusChange }) {
  const customerName =
    booking.userId?.name ||
    `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`.trim() ||
    "Guest";

  const firstService = booking.services?.[0]?.name || booking.services?.[0]?.serviceId?.name || "-";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#2A1B26]">{customerName}</p>
        <p className="text-xs text-[#8a7580]">
          {firstService}
          {booking.services?.length > 1 ? ` +${booking.services.length - 1} more` : ""}
        </p>
        <p className="text-xs text-[#8a7580]">
          {booking.bookingDate
            ? new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}{" "}
          {booking.bookingTime ? `· ${booking.bookingTime}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-[#2A1B26]">
          ₹{booking.totalAmount?.toLocaleString("en-IN") || 0}
        </p>
        <select
          value={booking.status || "Pending"}
          onChange={(e) => onStatusChange(booking._id, e.target.value)}
          className="text-xs border border-[#EEE3E7] rounded-lg px-2 py-1.5 outline-none bg-white text-[#2A1B26]"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <StatusBadge status={booking.status} />
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const handleStatusChange = async (id, newStatus) => {
    // optimistic update
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );
    try {
      await API.patch(`/bookings/${id}/status`, { status: newStatus });
    } catch (err) {
      console.log(err);
      // revert on failure
      fetchBookings();
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const customerName =
      b.userId?.name ||
      `${b.customer?.firstName || ""} ${b.customer?.lastName || ""}`.trim() ||
      "";
    const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || (b.status || "Pending").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const pendingCount = bookings.filter((b) => (b.status || "").toLowerCase() === "pending").length;
  const completedCount = bookings.filter((b) => (b.status || "").toLowerCase() === "completed").length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Bookings" subtitle="Manage all customer bookings">
        <div className="flex justify-end items-center gap-3 -mt-14 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-[#EEE3E7] rounded-xl px-3 py-2 outline-none bg-white text-[#5c4a52]"
          >
            <option value="All">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 bg-white border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52]/60">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[#2A1B26]"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total bookings" value={totalBookings} tint="bg-[#EFE9F7]" />
          <MetricCard label="Pending" value={pendingCount} tint="bg-[#FDF2E1]" />
          <MetricCard label="Completed" value={completedCount} tint="bg-[#E9F3EA]" />
          <MetricCard label="Total revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} tint="bg-[#F3E9EC]" />
        </div>

        <Panel title="All bookings">
          {filteredBookings.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No bookings found.</p>
          ) : (
            filteredBookings.map((b) => (
              <BookingRow key={b._id} booking={b} onStatusChange={handleStatusChange} />
            ))
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}