import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Star } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AdminPageShell, Panel, MetricCard } from "./AdminUI";

function Stars({ rating = 0 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "fill-[#D9A441] text-[#D9A441]" : "text-[#E5DADD]"}
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/reviews");
      // reviewController returns a plain array
      setReviews(Array.isArray(data) ? data : data.reviews || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c4a52]">Loading…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-[#B23A2A]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF6F4] flex" style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui" }}>
      <AdminSidebar />
      <AdminPageShell title="Reviews" subtitle="Customer feedback on services">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Total reviews" value={reviews.length} tint="bg-[#F3E9EC]" />
          <MetricCard label="Average rating" value={`${avgRating} ★`} tint="bg-[#FDF2E1]" />
        </div>

        <Panel title="All reviews" className="mt-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-[#8a7580]">No reviews found.</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="py-3 border-b border-[#F3E9EC] last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-[#2A1B26]">
                    {r.userId?.name || "Anonymous"}
                  </p>
                  <Stars rating={r.rating} />
                </div>
                <p className="text-xs text-[#8a7580] mb-1">{r.serviceId?.name || "-"}</p>
                {r.comment && <p className="text-sm text-[#2A1B26]">{r.comment}</p>}
              </div>
            ))
          )}
        </Panel>
      </AdminPageShell>
    </div>
  );
}