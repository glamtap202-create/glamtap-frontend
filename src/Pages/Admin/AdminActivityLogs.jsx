import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel } from "./AdminUI";

export default function AdminActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/activity-logs");
      setLogs(data.logs);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  const modules = ["all", ...new Set(logs.map((l) => l.module))];
  const filteredLogs = moduleFilter === "all" ? logs : logs.filter((l) => l.module === moduleFilter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Activity logs" subtitle="Track admin actions across the platform">
        <div className="flex justify-end -mt-14 mb-4">
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52] bg-white outline-none capitalize"
          >
            {modules.map((m) => (
              <option key={m} value={m} className="capitalize">
                {m === "all" ? "All modules" : m.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <Panel>
            <p className="text-sm text-[#B23A2A]">{error}</p>
          </Panel>
        )}

        <Panel title={`Recent activity (${filteredLogs.length})`}>
          {filteredLogs.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No activity logged yet.</p>
          ) : (
            <div className="space-y-1">
              {filteredLogs.map((log) => (
                <div
                  key={log._id}
                  className="flex items-start justify-between py-3 border-b border-[#F3E9EC] last:border-0"
                >
                  <div>
                    <p className="text-sm text-[#2A1B26]">{log.action}</p>
                    <p className="text-xs text-[#8a7580] mt-0.5">
                      {log.adminName} · <span className="capitalize">{log.module.replace("-", " ")}</span>
                      {log.details ? ` · ${log.details}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-[#8a7580] whitespace-nowrap ml-4">
                    {new Date(log.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}