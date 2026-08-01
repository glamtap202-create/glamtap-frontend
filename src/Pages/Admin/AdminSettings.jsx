import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel } from "./AdminUI";

const emptyForm = {
  platformCommission: 0,
  taxPercentage: 0,
  siteEmail: "",
  sitePhone: "",
  siteAddress: "",
  supportEmail: "",
};

export default function AdminSettings() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/settings");
      setForm({
        platformCommission: data.settings.platformCommission ?? 0,
        taxPercentage: data.settings.taxPercentage ?? 0,
        siteEmail: data.settings.siteEmail || "",
        sitePhone: data.settings.sitePhone || "",
        siteAddress: data.settings.siteAddress || "",
        supportEmail: data.settings.supportEmail || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setSavedMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await API.put("/settings", form);
      setSavedMsg("Settings saved successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Settings" subtitle="Platform configuration and site details">
        {error && (
          <Panel>
            <p className="text-sm text-[#B23A2A]">{error}</p>
          </Panel>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Panel title="Commission & tax">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Platform commission (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={form.platformCommission}
                  onChange={(e) => handleChange("platformCommission", Number(e.target.value))}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Tax / GST (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={form.taxPercentage}
                  onChange={(e) => handleChange("taxPercentage", Number(e.target.value))}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
            </div>
          </Panel>

          <Panel title="Site contact information">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Site email</label>
                <input
                  type="email"
                  value={form.siteEmail}
                  onChange={(e) => handleChange("siteEmail", e.target.value)}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Site phone</label>
                <input
                  type="text"
                  value={form.sitePhone}
                  onChange={(e) => handleChange("sitePhone", e.target.value)}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Support email</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-[#5c4a52]/70">Site address</label>
                <textarea
                  rows={2}
                  value={form.siteAddress}
                  onChange={(e) => handleChange("siteAddress", e.target.value)}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
            </div>
          </Panel>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#B23A5C] text-white text-sm px-6 py-2.5 rounded-xl hover:bg-[#9c3350] transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save settings"}
            </button>
            {savedMsg && <span className="text-sm text-[#2E7D4F]">{savedMsg}</span>}
          </div>
        </form>
      </AdminPageShell>
    </div>
  );
}