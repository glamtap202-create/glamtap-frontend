import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel } from "./AdminUI";

const MODULES = [
  "users", "partners", "bookings", "services", "categories",
  "payments", "settlements", "coupons", "reviews", "support-tickets",
  "cms", "reports", "settings",
];

const ACTIONS = ["view", "add", "edit", "delete"];

const emptyForm = { name: "", description: "", permissions: {} };

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/roles");
      setRoles(data.roles);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (role) => {
    setForm({
      name: role.name,
      description: role.description || "",
      permissions: role.permissions || {},
    });
    setEditingId(role._id);
    setShowForm(true);
  };

  const togglePermission = (module, action) => {
    const current = form.permissions[module] || [];
    const updated = current.includes(action)
      ? current.filter((a) => a !== action)
      : [...current, action];
    setForm({
      ...form,
      permissions: { ...form.permissions, [module]: updated },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await API.put(`/roles/${editingId}`, form);
      } else {
        await API.post("/roles", form);
      }
      setShowForm(false);
      fetchRoles();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save role");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this role?")) return;
    try {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete role");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Roles & permissions" subtitle="Define admin roles and what each one can access">
        <div className="flex justify-end -mt-14 mb-4">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-[#B23A5C] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#9c3350] transition-colors"
          >
            <Plus size={16} /> New role
          </button>
        </div>

        {error && (
          <Panel>
            <p className="text-sm text-[#B23A2A]">{error}</p>
          </Panel>
        )}

        <Panel title="Roles">
          {roles.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No roles yet. Click "New role" to add one.</p>
          ) : (
            <div className="space-y-1">
              {roles.map((role) => {
                const moduleCount = Object.keys(role.permissions || {}).filter(
                  (m) => (role.permissions[m] || []).length > 0
                ).length;
                return (
                  <div
                    key={role._id}
                    className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#2A1B26]">{role.name}</p>
                      <p className="text-xs text-[#8a7580]">
                        {role.description || "No description"} · {moduleCount} module{moduleCount !== 1 ? "s" : ""} configured
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(role)}
                        className="p-1.5 rounded-lg hover:bg-[#F3E9EC] text-[#5c4a52]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(role._id)}
                        className="p-1.5 rounded-lg hover:bg-[#FBEAE7] text-[#B23A2A]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </AdminPageShell>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#8a7580] hover:text-[#2A1B26]"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-[#2A1B26] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {editingId ? "Edit role" : "New role"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Role name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                  placeholder="e.g. Manager, Support Staff"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70 mb-2 block">Permissions</label>
                <div className="border border-[#EEE3E7] rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FBF6F4] text-left">
                        <th className="px-3 py-2 text-xs font-medium text-[#5c4a52]/70">Module</th>
                        {ACTIONS.map((a) => (
                          <th key={a} className="px-3 py-2 text-xs font-medium text-[#5c4a52]/70 text-center capitalize">
                            {a}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MODULES.map((mod) => (
                        <tr key={mod} className="border-t border-[#F3E9EC]">
                          <td className="px-3 py-2 capitalize text-[#2A1B26]">{mod.replace("-", " ")}</td>
                          {ACTIONS.map((action) => (
                            <td key={action} className="px-3 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={(form.permissions[mod] || []).includes(action)}
                                onChange={() => togglePermission(mod, action)}
                                className="accent-[#B23A5C]"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#B23A5C] text-white text-sm py-2.5 rounded-xl hover:bg-[#9c3350] transition-colors disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save role"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}