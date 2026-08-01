import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard } from "./AdminUI";

export default function AdminPartnerApproval() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/salons");
      setSalons(data.salons || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`/salons/${id}/approve`);
      fetchSalons();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to approve partner");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.patch(`/salons/${id}/reject`);
      fetchSalons();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to reject partner");
    }
  };

  const pendingSalons = salons.filter((s) => s.approvalStatus === "Pending");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Partner approval" subtitle="Review and approve new salon partners">
        <MetricCard label="Pending approvals" value={pendingSalons.length} tint="bg-[#FDF2E1]" />

        <Panel title="Pending partners" className="mt-4">
          {pendingSalons.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No pending approvals. All caught up!</p>
          ) : (
            pendingSalons.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#2A1B26]">{s.name}</p>
                  <p className="text-xs text-[#8a7580]">{s.ownerName} · {s.city}</p>
                  <p className="text-xs text-[#8a7580]">{s.phone}{s.email ? ` · ${s.email}` : ""}</p>
                  <p className="text-xs text-[#8a7580]">{s.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(s._id)}
                    className="text-xs bg-[#2E7D4F] text-white px-3 py-1.5 rounded-lg hover:opacity-90"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(s._id)}
                    className="text-xs bg-[#B23A2A] text-white px-3 py-1.5 rounded-lg hover:opacity-90"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}