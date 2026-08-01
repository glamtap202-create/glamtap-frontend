import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Trash2 } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/contact");
      setEnquiries(data.contacts || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/contact/${id}`, { status });
      fetchEnquiries();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await API.delete(`/contact/${id}`);
      fetchEnquiries();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete enquiry");
    }
  };

  const newCount = enquiries.filter((e) => e.status === "new").length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Enquiries" subtitle="Contact form submissions from the website">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Total enquiries" value={enquiries.length} tint="bg-[#F3E9EC]" />
          <MetricCard label="New" value={newCount} tint="bg-[#E9F3EA]" />
        </div>

        <Panel title="All enquiries" className="mt-4">
          {enquiries.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No enquiries yet.</p>
          ) : (
            enquiries.map((e) => (
              <div key={e._id} className="flex items-start justify-between py-3 border-b border-[#F3E9EC] last:border-0">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#2A1B26]">{e.name || "No name"}</p>
                    <StatusBadge
                      status={
                        e.status === "new" ? "New" : e.status === "contacted" ? "Contacted" : "Closed"
                      }
                    />
                  </div>
                  <p className="text-xs text-[#8a7580] mt-0.5">{e.email}</p>
                  {e.phone && <p className="text-xs text-[#8a7580]">{e.phone}</p>}
                  {e.service && (
                    <p className="text-xs text-[#8a7580] mt-1">
                      Service: <span className="capitalize">{e.service}</span>
                    </p>
                  )}
                  {e.comment && (
                    <p className="text-sm text-[#5c4a52] mt-1.5">{e.comment}</p>
                  )}
                  <p className="text-[11px] text-[#b3a3ab] mt-1.5">
                    {e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={e.status || "new"}
                    onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                    className="text-xs border border-[#EEE3E7] rounded-lg px-2 py-1.5 outline-none bg-white text-[#2A1B26]"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => handleDelete(e._id)}
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