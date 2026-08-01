import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard } from "./AdminUI";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/services");
      setServices(data.services || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", category: "", price: "", description: "" });
    setShowForm(true);
  };

  const openEdit = (svc) => {
    setEditing(svc);
    setForm({
      name: svc.name || "",
      category: svc.category || "",
      price: svc.price || "",
      description: svc.description || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editing) {
        await API.put(`/services/${editing._id}`, payload);
      } else {
        await API.post("/services", payload);
      }
      setShowForm(false);
      fetchServices();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await API.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete service");
    }
  };

  const filtered = services.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Services" subtitle="Manage all services offered">
        <div className="flex justify-end items-center gap-3 -mt-14 mb-4">
          <div className="flex items-center gap-2 bg-white border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm text-[#5c4a52]/60">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[#2A1B26]"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 bg-[#B23A5C] text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90"
          >
            <Plus size={15} /> Add service
          </button>
        </div>

        <MetricCard label="Total services" value={services.length} tint="bg-[#F3E9EC]" />

        <Panel title="All services" className="mt-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No services found.</p>
          ) : (
            filtered.map((s) => (
              <div
                key={s._id}
                className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#2A1B26]">{s.name}</p>
                  <p className="text-xs text-[#8a7580]">{s.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-[#2A1B26]">₹{s.price}</p>
                  <button
                    onClick={() => openEdit(s)}
                    className="p-1.5 rounded-lg hover:bg-[#F3E9EC] text-[#5c4a52]"
                  >
                    <Pencil size={14} />
                  </button>
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

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
                {editing ? "Edit service" : "Add service"}
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
                <label className="text-xs text-[#5c4a52]/70">Category</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[#5c4a52]/70">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
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