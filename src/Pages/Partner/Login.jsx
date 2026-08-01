import React, { useState } from "react";
import API from "../../api/axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/salons/login", {
        email: form.username.trim(),
        password: form.password,
      });

      if (response.data.success) {
        localStorage.setItem("partnerToken", response.data.token);
        localStorage.setItem("currentPartner", JSON.stringify(response.data.salon));
        navigate("/partner/dashboard-home");
        return;
      }

      setError(response.data.message || "Incorrect email or password.");
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      if (!err.response) {
        const partners = JSON.parse(localStorage.getItem("partners")) || [];

        const matchedPartner = partners.find(
          (p) =>
            p.email.toLowerCase() === form.username.trim().toLowerCase() &&
            p.password === form.password
        );

        if (!matchedPartner) {
          setError("Incorrect email or password.");
          return;
        }

        localStorage.setItem("partnerToken", "true");
        localStorage.setItem("currentPartner", JSON.stringify(matchedPartner));
        navigate("/partner/dashboard-home");
        return;
      }

      setError(backendMessage || "Incorrect email or password.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #EDEBF7 0%, #F6C6D4 30%, #F4879B 55%, #F3A8C0 75%, #EDEBF7 100%)",
      }}
    >
      <div
        className="w-full max-w-[380px] rounded-[28px] px-8 pt-10 pb-8 backdrop-blur-xl border border-white/40 shadow-xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(244,168,192,0.35) 100%)",
        }}
      >
        <h1 className="text-[28px] font-bold text-[#2A1B3D] mb-8">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3.5 rounded-2xl bg-white/40 placeholder:text-[#6B5A73]/80 text-[#2A1B3D] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#7A4B6B]/40 focus:bg-white/55 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Password"
              className="w-full px-4 pr-11 py-3.5 rounded-2xl bg-white/40 placeholder:text-[#6B5A73]/80 text-[#2A1B3D] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#7A4B6B]/40 focus:bg-white/55 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B5A73]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-[13px] text-[#8B1E3F] font-medium -mt-1">{error}</p>
          )}

          <label className="flex items-center gap-2 text-[13px] text-[#2A1B3D] pt-1 select-none cursor-pointer">
            <span
              onClick={() => setRemember((r) => !r)}
              className={`w-[16px] h-[16px] rounded flex items-center justify-center border ${
                remember ? "bg-[#2A1B3D] border-[#2A1B3D]" : "border-[#6B5A73]/60 bg-white/30"
              }`}
            >
              {remember && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            Remember me
          </label>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white shadow-md transition hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #3D1F4A 0%, #2A1330 100%)",
            }}
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/partner/forgot-password" className="text-[13px] text-[#2A1B3D]/80 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#2A1B3D]/25" />
          <span className="text-[13px] font-medium text-[#2A1B3D]/70">Or</span>
          <div className="flex-1 h-px bg-[#2A1B3D]/25" />
        </div> */}

        {/* <div className="space-y-3">
          <button
            type="button"
            onClick={() => console.log("Continue with Google")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/70 hover:bg-white/90 transition shadow-sm"
          >
            <span className="w-6 h-6 rounded-full bg-[#2A1B3D] flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 18 18">
                <path fill="#fff" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
                <path fill="#fff" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
                <path fill="#fff" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
                <path fill="#fff" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
              </svg>
            </span>
            {/* <span className="text-[#2A1B3D] font-medium text-[14px]">Continue With Google</span> */}
          {/* </button> */}

          {/* <button
            type="button"
            onClick={() => console.log("Continue with Facebook")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/70 hover:bg-white/90 transition shadow-sm"
          >
            <span className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" fill="white"/>
              </svg>
            </span>
            {/* <span className="text-[#2A1B3D] font-medium text-[14px]">Continue With Facebook</span> */}
          {/* </button> 
        </div> */} 

        <div className="text-center mt-8">
          <a href="/partner/register" className="text-[13px] font-semibold text-[#2A1B3D] underline underline-offset-2">
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}