import { useEffect, useState } from "react";
import { Search, Trash2, Ban, CheckCircle, RefreshCw } from "lucide-react";

const API_URL = "http://localhost:5000/api/users"; // apna backend URL yahan daalo

export default function Adminusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      // agar API { users: [...] } bhejta hai to data.users, warna direct data
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError(err.message || "Users fetch nahi ho paye");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      await fetch(`${API_URL}/${id}/${isBlocked ? "unblock" : "block"}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: !isBlocked } : u))
      );
    } catch (err) {
      alert("Status update fail hua");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Is user ko delete karna hai?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Delete fail hua");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search)
  );

  return (
    <div className="p-6 bg-[#241222] min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 bg-[#B23A6B] hover:bg-[#9c3159] px-3 py-2 rounded-lg text-sm"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-[#2f1830] border border-[#4a2a4a] rounded-lg px-3 py-2 mb-4 w-full max-w-sm">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* States */}
      {loading && <p className="text-gray-400">Users load ho rahe hain...</p>}
      {error && (
        <p className="text-red-400">
          Error: {error} —{" "}
          <button onClick={fetchUsers} className="underline">
            retry karo
          </button>
        </p>
      )}
      {!loading && !error && filteredUsers.length === 0 && (
        <p className="text-gray-400">Koi user nahi mila.</p>
      )}

      {/* Table */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-[#3a1f3a]">
          <table className="w-full text-sm">
            <thead className="bg-[#2f1830] text-gray-300">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Joined</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-[#3a1f3a] hover:bg-[#2a1528]"
                >
                  <td className="px-4 py-3">{u.name || "—"}</td>
                  <td className="px-4 py-3">{u.email || "—"}</td>
                  <td className="px-4 py-3">{u.phone || "—"}</td>
                  <td className="px-4 py-3">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        u.isBlocked
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => handleBlockToggle(u._id, u.isBlocked)}
                      title={u.isBlocked ? "Unblock" : "Block"}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      {u.isBlocked ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Ban size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      title="Delete"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}