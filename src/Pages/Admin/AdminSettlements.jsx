import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

function SettlementRow({ settlement, onMarkPaid }) {
  const salonName = settlement.salonId?.name || "Unknown salon";
  const ownerName = settlement.salonId?.ownerName || "";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#2A1B26]">{salonName}</p>
        {ownerName && <p className="text-xs text-[#8a7580]">{ownerName}</p>}
        <p className="text-xs text-[#8a7580]">
          {settlement.periodStart
            ? new Date(settlement.periodStart).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
            : "-"}{" "}
          –{" "}
          {settlement.periodEnd
            ? new Date(settlement.periodEnd).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
            : "-"}
        </p>
        <p className="text-xs text-[#8a7580]">{settlement.bookings?.length || 0} bookings</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-[#2A1B26]">
          ₹{(settlement.totalAmount || 0).toLocaleString("en-IN")}
        </p>
        <StatusBadge status={settlement.status || "Pending"} />
        {settlement.status !== "Paid" && (
          <button
            onClick={() => onMarkPaid(settlement._id)}
            className="text-xs bg-[#B23A5C] text-white px-3 py-1.5 rounded-lg hover:opacity-90"
          >
            Mark paid
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminSettlements() {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSettlements();
  }, []);

  const fetchSettlements = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/settlements");
      setSettlements(data.settlements || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load settlements");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await API.patch(`/settlements/${id}/pay`);
      fetchSettlements();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to mark settlement as paid");
    }
  };

  const totalAmount = settlements.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const paidCount = settlements.filter((s) => s.status === "Paid").length;
  const pendingCount = settlements.length - paidCount;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Settlements" subtitle="Salon payout batches">
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Total amount" value={`₹${totalAmount.toLocaleString("en-IN")}`} tint="bg-[#F3E9EC]" />
          <MetricCard label="Paid" value={paidCount} tint="bg-[#E9F3EA]" />
          <MetricCard label="Pending" value={pendingCount} tint="bg-[#FDF2E1]" />
        </div>

        <Panel title="All settlements" className="mt-4">
          {settlements.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No settlements found.</p>
          ) : (
            settlements.map((s) => (
              <SettlementRow key={s._id} settlement={s} onMarkPaid={handleMarkPaid} />
            ))
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}