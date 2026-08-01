import { BrowserRouter, Routes, Route } from "react-router-dom";
import PartnerDashboard from "../Pages/PartnerDashboard/PartnerDashboard";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import Cart from "../ Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Login from "../Pages/Login/Login";
import Contact from "../Pages/Contact/Contact";
import Admin from "../Pages/Admin/Admin";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminPartners from "../Pages/Admin/AdminPartners";
import AdminPartnerApproval from "../Pages/Admin/AdminPartnerApproval";
import AdminComingSoon from "../Pages/Admin/AdminComingSoon";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/bookings" element={<Admin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/partners" element={<AdminPartners />} />
        <Route path="/admin/partner-approval" element={<AdminPartnerApproval />} />
        <Route path="/admin/:section" element={<AdminComingSoon />} />
        <Route path="/partner" element={<PartnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
