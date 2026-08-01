import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard } from "./AdminUI";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/categories");
      // categoryController returns a plain array, not { categories }
      setCategories(Array.isArray(data) ? data : data.categories || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "" });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name || "", description: cat.description || "" });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/categories/${editing._id}`, form);
      } else {
        await API.post("/categories", form);
      }
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Categories" subtitle="Manage service categories">
        <div className="flex justify-end -mt-14 mb-4">
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 bg-[#B23A5C] text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90"
          >
            <Plus size={15} /> Add category
          </button>
        </div>

        <MetricCard label="Total categories" value={categories.length} tint="bg-[#F3E9EC]" />

        <Panel title="All categories" className="mt-4">
          {categories.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No categories found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="border border-[#F3E9EC] rounded-xl p-4 flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2A1B26]">{cat.name}</p>
                    {cat.description && (
                      <p className="text-xs text-[#8a7580] mt-1">{cat.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 rounded-lg hover:bg-[#F3E9EC] text-[#5c4a52]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-1.5 rounded-lg hover:bg-[#FBEAE7] text-[#B23A2A]"
                    >
                      <Trash2 size={14} />
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
                {editing ? "Edit category" : "Add category"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X size={18} className="text-[#8a7580]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#5c4a52]/70">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[#5c4a52]/70">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#B23A5C] text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90"
              >
                {editing ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}