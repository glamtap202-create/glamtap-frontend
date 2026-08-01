import { useEffect, useState } from "react";
import API from "../../api/axios";
import { X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved", "Closed"];

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/support-tickets");
      setTickets(data.tickets || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const openTicket = (t) => {
    setSelected(t);
    setReplyText(t.adminReply || "");
  };

  const handleUpdate = async (status) => {
    try {
      await API.patch(`/support-tickets/${selected._id}`, {
        status,
        adminReply: replyText,
      });
      setSelected(null);
      fetchTickets();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update ticket");
    }
  };

  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Support tickets" subtitle="Customer & partner queries">
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Open" value={openCount} tint="bg-[#FBEAE7]" />
          <MetricCard label="In progress" value={inProgressCount} tint="bg-[#FDF2E1]" />
          <MetricCard label="Resolved" value={resolvedCount} tint="bg-[#E9F3EA]" />
        </div>

        <Panel title="All tickets" className="mt-4">
          {tickets.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No tickets found.</p>
          ) : (
            tickets.map((t) => (
              <button
                key={t._id}
                onClick={() => openTicket(t)}
                className="w-full text-left flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0 hover:bg-[#FBF6F4] rounded-lg px-2 -mx-2"
              >
                <div>
                  <p className="text-sm font-medium text-[#2A1B26]">{t.subject}</p>
                  <p className="text-xs text-[#8a7580]">
                    {t.userId?.name || "Unknown"} · {new Date(t.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8a7580]">{t.priority}</span>
                  <StatusBadge status={t.status} />
                </div>
              </button>
            ))
          )}
        </Panel>
      </AdminPageShell>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
                {selected.subject}
              </h3>
              <button onClick={() => setSelected(null)}>
                <X size={18} className="text-[#8a7580]" />
              </button>
            </div>
            <p className="text-xs text-[#8a7580] mb-1">
              From: {selected.userId?.name || "Unknown"} ({selected.userId?.email})
            </p>
            <p className="text-sm text-[#2A1B26] bg-[#FBF6F4] rounded-xl p-3 my-3">{selected.message}</p>

            <label className="text-xs text-[#5c4a52]/70">Admin reply</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              className="w-full mt-1 mb-4 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
            />

            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleUpdate(s)}
                  className={`text-xs px-3 py-1.5 rounded-lg ${
                    selected.status === s
                      ? "bg-[#B23A5C] text-white"
                      : "bg-[#F3E9EC] text-[#5c4a52] hover:bg-[#EEE3E7]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}