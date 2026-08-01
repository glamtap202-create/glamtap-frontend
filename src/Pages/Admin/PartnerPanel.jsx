import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import DashboardHome from "../Components/DashboardHome";
import BookingsPanel from "../Components/BookingPanel";
import Earnings from "../Components/Earnings";
import MyServices from "../Components/MyServices";
import ReviewsCard from "../Components/ReviewCartd";
import ProfileSettings from "../Components/ProfileSettings";
import Topebar from "../Components/Topebar";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  bookings: "Bookings",
  services: "Services Management",
  earnings: "Earnings & Wallet",
  profile: "Settings & Profile",
  reviews: "Reviews & Ratings",
};

export default function PartnerPanel() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <DashboardHome />
              <BookingsPanel />
            </div>
            <div className="space-y-4">
              <MyServices />
              <ReviewsCard />
            </div>
          </div>
        );
      case "bookings":
        return <BookingsPanel />;
      case "services":
        return <MyServices />;
      case "earnings":
        return <Earnings />;
      case "profile":
        return <ProfileSettings />;
      case "reviews":
        return <ReviewsCard />;
      default:
        return (
          <div className="rounded-2xl border border-rose-100 bg-white p-8 text-center text-sm text-slate-400">
            This section is coming soon.
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-rose-50/40">
      <div className="flex flex-1">
        <Sidebar
          active={active}
          onNavigate={setActive}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topebar
            onMenuClick={() => setSidebarOpen(true)}
            title={PAGE_TITLES[active] ?? "Dashboard"}
          />
          <main className="flex-1 p-4 sm:p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}