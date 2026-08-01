import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Search, Trash2 } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

export default function AdminPartners() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    try {
      await API.delete(`/salons/${id}`);
      fetchSalons();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete partner");
    }
  };

  const filtered = salons.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.city?.toLowerCase().includes(search.toLowerCase())
  );

  const approvedCount = salons.filter((s) => s.approvalStatus === "Approved").length;
  const pendingCount = salons.filter((s) => s.approvalStatus === "Pending").length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Partners" subtitle="All registered salon partners">
        <div className="flex justify-end -mt-14 mb-4">
          <div className="flex items-center gap-2 bg-white border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52]/60">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search partner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[#2A1B26]"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Total partners" value={salons.length} tint="bg-[#F3E9EC]" />
          <MetricCard label="Approved" value={approvedCount} tint="bg-[#E9F3EA]" />
          <MetricCard label="Pending" value={pendingCount} tint="bg-[#FDF2E1]" />
        </div>

        <Panel title="All partners" className="mt-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No partners found.</p>
          ) : (
            filtered.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#2A1B26]">{s.name}</p>
                  <p className="text-xs text-[#8a7580]">{s.ownerName} · {s.city}</p>
                  <p className="text-xs text-[#8a7580]">{s.phone}{s.email ? ` · ${s.email}` : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={s.approvalStatus} />
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-1.5 rounded-lg hover:bg-[#FBEAE7] text-[#B23A2A]"
                  >
                    <Trash2 size={14} />
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