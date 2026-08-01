import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, StatusBadge } from "./AdminUI";

const emptyForm = { title: "", slug: "", content: "", status: "draft" };

export default function AdminCms() {
  const [cmsPages, setCmsPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCms();
  }, []);

  const fetchCms = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/cms");
      setCmsPages(data.cmsPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load CMS pages");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (page) => {
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
    });
    setEditingId(page._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await API.put(`/cms/${editingId}`, form);
      } else {
        await API.post("/cms", form);
      }
      setShowForm(false);
      fetchCms();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save CMS page");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this CMS page?")) return;
    try {
      await API.delete(`/cms/${id}`);
      fetchCms();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete CMS page");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="CMS" subtitle="Manage static pages and content">
        <div className="flex justify-end -mt-14 mb-4">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-[#B23A5C] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#9c3350] transition-colors"
          >
            <Plus size={16} /> New page
          </button>
        </div>

        {error && (
          <Panel>
            <p className="text-sm text-[#B23A2A]">{error}</p>
          </Panel>
        )}

        <Panel title="Pages">
          {cmsPages.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No CMS pages yet. Click "New page" to add one.</p>
          ) : (
            <div className="space-y-1">
              {cmsPages.map((page) => (
                <div
                  key={page._id}
                  className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2A1B26]">{page.title}</p>
                    <p className="text-xs text-[#8a7580]">/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={page.status} />
                    <button
                      onClick={() => openEditForm(page)}
                      className="p-1.5 rounded-lg hover:bg-[#F3E9EC] text-[#5c4a52]"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(page._id)}
                      className="p-1.5 rounded-lg hover:bg-[#FBEAE7] text-[#B23A2A]"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </AdminPageShell>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#8a7580] hover:text-[#2A1B26]"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-[#2A1B26] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {editingId ? "Edit page" : "New page"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Slug (e.g. about-us)</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Content</label>
                <textarea
                  required
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#5c4a52]/70">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B23A5C]"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#B23A5C] text-white text-sm py-2.5 rounded-xl hover:bg-[#9c3350] transition-colors disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}