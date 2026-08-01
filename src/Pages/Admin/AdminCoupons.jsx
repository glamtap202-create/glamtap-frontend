import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard, StatusBadge } from "./AdminUI";

const emptyForm = {
  code: "",
  discountType: "Percentage",
  discountValue: "",
  minOrderAmount: "",
  maxDiscountAmount: "",
  validFrom: "",
  validTill: "",
  usageLimit: "",
  isActive: true,
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/coupons");
      setCoupons(data.coupons || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      code: c.code || "",
      discountType: c.discountType || "Percentage",
      discountValue: c.discountValue ?? "",
      minOrderAmount: c.minOrderAmount ?? "",
      maxDiscountAmount: c.maxDiscountAmount ?? "",
      validFrom: c.validFrom ? c.validFrom.slice(0, 10) : "",
      validTill: c.validTill ? c.validTill.slice(0, 10) : "",
      usageLimit: c.usageLimit ?? "",
      isActive: c.isActive ?? true,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
        discountValue: Number(form.discountValue),
        minOrderAmount: Number(form.minOrderAmount) || 0,
        maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
      };
      if (editing) {
        await API.put(`/coupons/${editing._id}`, payload);
      } else {
        await API.post("/coupons", payload);
      }
      setShowForm(false);
      fetchCoupons();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save coupon");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await API.delete(`/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  const activeCount = coupons.filter((c) => c.isActive).length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Coupons" subtitle="Discount codes for checkout">
        <div className="flex justify-end -mt-14 mb-4">
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 bg-[#B23A5C] text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90"
          >
            <Plus size={15} /> Add coupon
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Total coupons" value={coupons.length} tint="bg-[#F3E9EC]" />
          <MetricCard label="Active" value={activeCount} tint="bg-[#E9F3EA]" />
        </div>

        <Panel title="All coupons" className="mt-4">
          {coupons.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No coupons found.</p>
          ) : (
            coupons.map((c) => (
              <div key={c._id} className="flex items-center justify-between py-3 border-b border-[#F3E9EC] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#2A1B26]">{c.code}</p>
                  <p className="text-xs text-[#8a7580]">
                    {c.discountType === "Percentage" ? `${c.discountValue}% off` : `₹${c.discountValue} off`}
                    {c.minOrderAmount ? ` · min ₹${c.minOrderAmount}` : ""}
                  </p>
                  <p className="text-xs text-[#8a7580]">
                    Used {c.usedCount || 0}
                    {c.usageLimit ? ` / ${c.usageLimit}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={c.isActive ? "Active" : "Suspended"} />
                  <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-[#F3E9EC] text-[#5c4a52]">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="p-1.5 rounded-lg hover:bg-[#FBEAE7] text-[#B23A2A]">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </Panel>
      </AdminPageShell>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
                {editing ? "Edit coupon" : "Add coupon"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X size={18} className="text-[#8a7580]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#5c4a52]/70">Code</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Discount type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none bg-white"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Value</label>
                  <input
                    type="number"
                    required
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Min order (₹)</label>
                  <input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Max discount (₹)</label>
                  <input
                    type="number"
                    value={form.maxDiscountAmount}
                    onChange={(e) => setForm({ ...form, maxDiscountAmount: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Valid from</label>
                  <input
                    type="date"
                    required
                    value={form.validFrom}
                    onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5c4a52]/70">Valid till</label>
                  <input
                    type="date"
                    required
                    value={form.validTill}
                    onChange={(e) => setForm({ ...form, validTill: e.target.value })}
                    className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#5c4a52]/70">Usage limit (blank = unlimited)</label>
                <input
                  type="number"
                  value={form.usageLimit}
                  onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                  className="w-full mt-1 border border-[#EEE3E7] rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-[#2A1B26]">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Active
              </label>
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