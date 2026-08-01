import React, { useState } from "react";
import API from "../../api/axios";
import { ArrowLeft, ChevronDown, Eye, EyeOff, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COUNTRY_CODES = [
  { code: "+91", label: "IN" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "AE" },
];

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    city: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.password.length >= 6 &&
    agreed;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    const requestBody = {
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      ownerName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      email: form.email.trim(),
      password: form.password,
      address: form.address.trim(),
      city: form.city.trim(),
      phone: `${countryCode}${form.phone.trim()}`,
    };

    try {
      const response = await API.post("/salons/register", requestBody);

      if (response.data.success) {
        navigate("/partner/login");
        return;
      }

      setError(response.data.message || "Registration failed. Please try again.");
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      if (!err.response) {
        // Fallback to localStorage if backend is not available
        const existingPartners = JSON.parse(localStorage.getItem("partners")) || [];
        const existingPartner = existingPartners.find(
          (p) => p.email.toLowerCase() === form.email.trim().toLowerCase()
        );

        if (existingPartner) {
          setError("This email is already registered.");
          return;
        }

        const newPartner = {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: `${countryCode}${form.phone}`,
          email: form.email,
          password: form.password,
          address: form.address,
          city: form.city,
        };

        const updatedPartners = [...existingPartners, newPartner];
        localStorage.setItem("partners", JSON.stringify(updatedPartners));
        localStorage.setItem("partnerToken", "true");
        localStorage.setItem("currentPartner", JSON.stringify(newPartner));
        navigate("/partner/dashboard-home");
        return;
      }

      setError(backendMessage || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F4F5] flex flex-col">
      <div className="relative flex items-center justify-center py-6 px-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"
        >
          <ArrowLeft size={20} className="text-[#1A1A1A]" />
        </button>
        <span className="text-[15px] font-bold tracking-[0.15em] text-[#1A1A1A]">
          PARTNER<span className="font-normal text-[#6B6F76]"> HUB</span>
        </span>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-sm px-8 sm:px-10 py-9 mt-2">
          <h1 className="text-[26px] font-bold text-[#1A1A1A] mb-7">
            Sign up to partner
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  First name
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Your first name"
                  className="w-full px-3.5 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Last name
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Your last name"
                  className="w-full px-3.5 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Mobile number
                </label>
                <div className="flex">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryMenu((s) => !s)}
                      className="flex items-center gap-1 h-full px-3 py-3 rounded-l-lg border border-r-0 border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px]"
                    >
                      {countryCode}
                      <ChevronDown size={15} className="text-[#6B6F76]" />
                    </button>
                    {showCountryMenu && (
                      <div className="absolute z-10 mt-1 w-28 bg-white border border-[#D6D8DC] rounded-lg shadow-md overflow-hidden">
                        {COUNTRY_CODES.map((c) => (
                          <button
                            type="button"
                            key={c.code}
                            onClick={() => {
                              setCountryCode(c.code);
                              setShowCountryMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-[#F4F4F5] flex justify-between"
                          >
                            <span>{c.code}</span>
                            <span className="text-[#9AA0A6]">{c.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="Mobile number"
                    className="w-full px-3.5 py-3 rounded-r-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3.5 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Business address"
                  className="w-full px-3.5 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="City"
                  className="w-full px-3.5 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-10px)]">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3.5 pr-10 py-3 rounded-lg border border-[#D6D8DC] bg-white text-[#1A1A1A] text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6F76] hover:text-[#1A1A1A]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium -mt-1">{error}</p>
            )}

            <label className="flex items-start gap-2.5 text-sm text-[#1A1A1A] pt-1 select-none cursor-pointer">
              <span
                onClick={() => setAgreed((a) => !a)}
                className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded flex items-center justify-center border ${
                  agreed
                    ? "bg-[#3B82F6] border-[#3B82F6]"
                    : "border-[#9AA0A6] bg-white"
                }`}
              >
                {agreed && <Check size={13} className="text-white" strokeWidth={3} />}
              </span>
              <span>
                I agree to the{" "}
                <a href="/privacy" className="text-[#3B82F6] hover:underline">
                  privacy policy
                </a>
                ,{" "}
                <a href="/terms" className="text-[#3B82F6] hover:underline">
                  website terms
                </a>{" "}
                and{" "}
                <a href="/booking-terms" className="text-[#3B82F6] hover:underline">
                  booking terms
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3.5 rounded-lg bg-[#D6D8DC] text-[#8A8F96] font-semibold text-[15px] transition enabled:bg-[#1A1A1A] enabled:text-white enabled:hover:bg-[#000] disabled:cursor-not-allowed"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-sm text-[#6B6F76] mt-6">
            Already have a partner account?{" "}
            <a href="/partner/login" className="text-[#3B82F6] font-medium hover:underline">
              Sign in now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}