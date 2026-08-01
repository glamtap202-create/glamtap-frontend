import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import API from "../../api/axios";
import { AuthContext } from "../../Context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Agar user pehle se logged in hai, register form dikhane ki bajaye aage bhej do
  useEffect(() => {
    if (isLoggedIn) {
      if (location.state?.from) {
        navigate(location.state.from, {
          replace: true,
          state: location.state.checkoutState,
        });
      } else {
        navigate("/account", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/users/register", form);

      alert(data.message);

      // Booking flow ka state (from + checkoutState) signin tak carry karo
      // replace: true taaki /register history se hat jaaye
      navigate("/signin", { replace: true, state: location.state });
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#5a2430] flex items-center justify-center px-4 sm:px-5 relative">
      <button
        onClick={handleGoHome}
        aria-label="Close and go to home"
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
      >
        <X size={20} className="text-gray-600" />
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-sm sm:text-base"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-sm sm:text-base"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-sm sm:text-base"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-sm sm:text-base"
          />

          <button
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg text-sm sm:text-base"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-5 text-sm sm:text-base">
          Already have an account?

          <Link
            to="/signin"
            state={location.state}
            className="text-pink-600 ml-2"
          >
            Login
          </Link>
        </p>

        <button
          type="button"
          onClick={handleGoHome}
          className="w-full mt-4 text-sm text-gray-500 underline"
        >
          Continue without registering
        </button>

      </div>
    </div>
  );
}

export default Register;