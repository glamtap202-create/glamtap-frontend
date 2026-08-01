import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

function PaymentRow({ payment }) {
  const customerName = payment.userId?.name || "Guest";
  const salonName = payment.salonId?.name || "-";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#2A1B26]">{customerName}</p>
        <p className="text-xs text-[#8a7580]">{salonName}</p>
        <p className="text-xs text-[#8a7580]">
          {payment.createdAt
            ? new Date(payment.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </p>
      </div>
      <div className="text-right flex items-center gap-3">
        <div>
          <p className="text-sm font-medium text-[#2A1B26]">
            ₹{(payment.amount || payment.bookingId?.totalAmount || 0).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-[#8a7580]">{payment.method || "-"}</p>
        </div>
        <StatusBadge status={payment.status} />
      </div>
    </div>
  );
}

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/payments");
      setPayments(data.payments || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter((p) => {
    const name = p.userId?.name || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || (p.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalAmount = payments.reduce(
    (sum, p) => sum + (p.amount || p.bookingId?.totalAmount || 0),
    0
  );
  const successCount = payments.filter((p) => (p.status || "").toLowerCase() === "success").length;
  const pendingCount = payments.filter((p) => (p.status || "").toLowerCase() === "pending").length;
  const failedCount = payments.filter((p) => (p.status || "").toLowerCase() === "failed").length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Payments" subtitle="All transactions across bookings">
        <div className="flex justify-end items-center gap-3 -mt-14 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-[#EEE3E7] rounded-xl px-3 py-2 outline-none bg-white text-[#5c4a52]"
          >
            <option value="All">All statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
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
          <MetricCard label="Total amount" value={`₹${totalAmount.toLocaleString("en-IN")}`} tint="bg-[#E9F3EA]" />
          <MetricCard label="Success" value={successCount} tint="bg-[#E9F3EA]" />
          <MetricCard label="Pending" value={pendingCount} tint="bg-[#FDF2E1]" />
          <MetricCard label="Failed" value={failedCount} tint="bg-[#FBEAE7]" />
        </div>

        <Panel title="All payments">
          {filtered.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No payments found.</p>
          ) : (
            filtered.map((p) => <PaymentRow key={p._id} payment={p} />)
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}