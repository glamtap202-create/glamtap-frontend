import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import CartProvider from "./Context/CartContext";
import CartPopup from "./components/CartPopup/CartPopup";

import Admin from "./Pages/Admin/Admin";
import AdminUsers from "./Pages/Admin/Adminusers";
import AdminComingSoon from "./Pages/Admin/AdminComingSoon";
import AdminBookings from "./Pages/Admin/AdminBookings";
import AdminServices from "./Pages/Admin/AdminServices";
import AdminCategories from "./Pages/Admin/AdminCategories";
import AdminPayments from "./Pages/Admin/AdminPayments";
import AdminSettlements from "./Pages/Admin/AdminSettlements";
import AdminCoupons from "./Pages/Admin/AdminCoupons";
import AdminReviews from "./Pages/Admin/AdminReviews";
import AdminPartners from "./Pages/Admin/AdminPartners";
import AdminPartnerApproval from "./Pages/Admin/AdminPartnerApproval";
import AdminSupportTickets from "./Pages/Admin/AdminSupportTickets";
import AdminCms from "./Pages/Admin/AdminCms";
import AdminReports from "./Pages/Admin/AdminReports";
import AdminSettings from "./Pages/Admin/AdminSettings";
import AdminRoles from "./Pages/Admin/AdminRoles";

import PartnerPanel from "./Pages/Admin/PartnerPanel";

// Main site pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignIn from "./Pages/SignIn/SignIn";
import Register from "./Pages/Register/Register";
import Services from "./Pages/Services/Services";
import ServiceDetails from "./Pages/ServiceDetails/ServiceDetails";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import ThankYou from "./Pages/Checkout/ThankYou";
import Account from "./Pages/Account/Account";
import AdminActivityLogs from "./Pages/Admin/AdminActivityLogs";
// Partner
import PartnerLogin from "./Pages/Partner/Login";
import PartnerRegister from "./Pages/Partner/Register";
import PartnerForgotPassword from "./Pages/Partner/ForgotPassword";
import AdminEnquiries from "./Pages/Admin/AdminEnquiries";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";

import CancellationRefundPolicy from "./Pages/CancellationRefundPolicy";


// Routes ke andar


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CartPopup />
          <Routes>
            {/* Main website */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:category" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/account" element={<Account />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
  path="/terms-and-conditions"
  element={<TermsConditions />}
/>
       <Route
  path="/cancellation-refund-policy"
  element={<CancellationRefundPolicy />}
/>
            {/* Partner */}
            <Route path="/partner/login" element={<PartnerLogin />} />
            <Route path="/partner/register" element={<PartnerRegister />} />
            <Route path="/partner/forgot-password" element={<PartnerForgotPassword />} />
            <Route path="/partner/dashboard-home" element={<PartnerPanel />} />
            <Route path="/partner-dashboard" element={<PartnerPanel />} />

            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/partner-approval" element={<AdminPartnerApproval />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/settlements" element={<AdminSettlements />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/support-tickets" element={<AdminSupportTickets />} />
            <Route path="/admin/notifications" element={<AdminComingSoon title="Notifications" />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="/admin/cms" element={<AdminCms />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/roles-permissions" element={<AdminRoles />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />

            {/* 404 */}
            <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h2>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;