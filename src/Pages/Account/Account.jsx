import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  LayoutDashboard,
  User,
  LogOut,
  Calendar,
  CheckCircle2,
  XCircle,
  Wallet,
  Clock,
  Repeat,
  Star,
  Gift,
  Headphones,
  Home,
  Menu,
  X,
} from "lucide-react";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const profile = await API.get("/users/profile");
      setUser(profile.data.user);

      const bookingRes = await API.get("/bookings/my-bookings");
      setBookings(bookingRes.data.bookings);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

   const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const cancelBooking = async (id) => {
    try {
      await API.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: "Cancelled" } : booking
        )
      );
    } catch (error) {
      console.log(error);
      alert("Unable to cancel booking");
    }
  };

  const getImageUrl = (img) =>
    img?.startsWith("http") ? img : `http://localhost:5000${img}`;

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#c9970f";
      case "Confirmed":
        return "#1d6fd6";
      case "Completed":
        return "#1a9c53";
      case "Cancelled":
        return "#d92d2d";
      default:
        return "#888";
    }
  };

  const statusBg = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50";
      case "Confirmed":
        return "bg-blue-50";
      case "Completed":
        return "bg-emerald-50";
      case "Cancelled":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pink-50">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!user) return null;

  // ---- Derived data (all real, from bookings/user - nothing fabricated) ----
  const upcomingBookings = bookings
    .filter((b) => b.status === "Pending" || b.status === "Confirmed")
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));

  const nextBooking = upcomingBookings[0];

  const completedCount = bookings.filter((b) => b.status === "Completed").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;
  const totalSpent = bookings.reduce(
    (sum, b) => sum + (b.paymentStatus === "Paid" ? b.totalAmount : 0),
    0
  );

  const stats = [
    { label: "Upcoming Bookings", value: upcomingBookings.length, icon: Calendar, bg: "bg-pink-50", fg: "text-pink-600" },
    { label: "Completed Bookings", value: completedCount, icon: CheckCircle2, bg: "bg-emerald-50", fg: "text-emerald-600" },
    { label: "Cancelled Bookings", value: cancelledCount, icon: XCircle, bg: "bg-red-50", fg: "text-red-600" },
    { label: "Total Paid", value: `₹${totalSpent}`, icon: Wallet, bg: "bg-violet-50", fg: "text-violet-600" },
  ];

  // Quick actions - wired to real navigation/tabs; no fake data behind them
  const quickActions = [
    { label: "Book Again", icon: Repeat, bg: "bg-pink-50", fg: "text-pink-600", onClick: () => setActiveTab("dashboard") },
    { label: "Home", icon: Home, bg: "bg-sky-50", fg: "text-sky-600", onClick: () => navigate("/") },
    { label: "All Services", icon: Star, bg: "bg-violet-50", fg: "text-violet-600", onClick: () => navigate("/services/all") },
    { label: "Contact Us", icon: Gift, bg: "bg-amber-50", fg: "text-amber-600", onClick: () => navigate("/contact") },
    { label: "Support", icon: Headphones, bg: "bg-emerald-50", fg: "text-emerald-600", onClick: () => navigate("/contact") },
  ];

  const sidebarNav = [
    { key: "home", label: "Home", icon: Home, path: "/" },
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "profile", label: "Profile", icon: User },
  ];

  const handleSidebarClick = (item) => {
    setIsSidebarOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    setActiveTab(item.key);
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{user.name}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {sidebarNav.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => handleSidebarClick({ key, path })}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
              !path && activeTab === key
                ? "bg-pink-50 text-pink-600 font-semibold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl mt-4"
      >
        <LogOut size={15} />
        Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#faf7f9] flex flex-col lg:flex-row overflow-x-hidden">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="w-72 max-w-[80vw] bg-white h-full px-5 py-6 flex flex-col shadow-2xl">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end p-2 rounded-full hover:bg-gray-100 mb-2"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* DESKTOP FULL-HEIGHT SIDEBAR */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-gray-100 px-5 py-8 flex-col">
        {SidebarContent}
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8">

        {/* Welcome banner */}
        <div className="rounded-2xl bg-gradient-to-r from-pink-100 via-pink-50 to-white p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Look good, feel great!</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {stats.map(({ label, value, icon: Icon, bg, fg }) => (
              <div key={label} className="bg-white rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-sm">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${bg} ${fg} shrink-0`}>
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">{label}</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow p-5 sm:p-8 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="text-base sm:text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-base sm:text-lg break-words">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-base sm:text-lg">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-base sm:text-lg capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-6 sm:space-y-8">

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {quickActions.map(({ label, icon: Icon, bg, fg, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    className="bg-white border border-gray-100 rounded-2xl py-4 px-2 text-center transition-shadow hover:shadow-md active:scale-95"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${bg} ${fg}`}>
                      <Icon size={18} />
                    </div>
                    <p className="text-[11px] font-semibold text-gray-600">{label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming booking highlight */}
            {nextBooking && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Upcoming Booking</h3>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={getImageUrl(nextBooking.services[0]?.image)}
                    alt={nextBooking.services[0]?.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {nextBooking.services.map((s) => s.name).join(", ")}
                    </h4>
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock size={12} />
                      {new Date(nextBooking.bookingDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {nextBooking.bookingTime}
                    </p>
                    <span
                      className={`inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${statusBg(nextBooking.status)}`}
                      style={{ color: statusColor(nextBooking.status) }}
                    >
                      {nextBooking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                    <span className="text-base font-bold text-gray-900">
                      ₹{nextBooking.totalAmount}
                    </span>
                    {nextBooking.status === "Pending" && (
                      <button
                        onClick={() => cancelBooking(nextBooking._id)}
                        className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* All bookings */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">My Bookings</h3>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-8 sm:p-10 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold">No Orders Found</h2>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    You haven't booked any services yet.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {bookings.map((booking) => {
                    const visibleImages = booking.services.slice(0, 4);
                    const extraCount = booking.services.length - 4;

                    return (
                      <div
                        key={booking._id}
                        className="bg-white rounded-2xl shadow p-4 sm:p-5"
                      >
                        <div className="flex gap-2 mb-4">
                          {visibleImages.map((item, index) => {
                            const isLast =
                              index === visibleImages.length - 1 && extraCount > 0;
                            return (
                              <div
                                key={index}
                                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0"
                              >
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                                {isLast && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-bold text-sm text-white">
                                    +{extraCount}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${statusBg(booking.status)}`}
                          style={{ color: statusColor(booking.status) }}
                        >
                          {booking.status}
                        </span>

                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm flex-wrap">
                          <span>{booking._id.slice(-6).toUpperCase()}</span>
                          <span>·</span>
                          <span>₹{booking.totalAmount} INR</span>
                          <span className="border border-gray-300 rounded-full px-2.5 py-0.5 text-xs">
                            {booking.paymentStatus === "Paid" ? "Paid" : "Due"}
                          </span>
                        </div>

                        <p className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                          <Clock size={12} />
                          {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          · {booking.bookingTime}
                        </p>

                        <p className="text-gray-700 text-xs mt-1 truncate">
                          {booking.services.map((s) => s.name).join(", ")}
                        </p>

                        <div className="flex flex-wrap justify-end gap-2 mt-4">
                          {booking.status === "Pending" && (
                            <button
                              onClick={() => cancelBooking(booking._id)}
                              className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-full text-xs"
                            >
                              Cancel
                            </button>
                          )}
                          <button className="border border-pink-400 text-pink-600 hover:bg-pink-600 hover:text-white px-4 py-1.5 rounded-full text-xs">
                            Buy again
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;