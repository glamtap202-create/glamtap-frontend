import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../Context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/users/login", form);

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (location.state?.from) {
        // Booking flow se aaya tha — wahin wapas, cart data ke saath
        navigate(location.state.from, { state: location.state.checkoutState });
      } else {
        navigate("/account");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-6"
          required
        />

        <button
          className="bg-pink-600 text-white w-full py-3 rounded"
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="text-center mt-5">
          Don't have an account?
          <Link to="/register" className="text-pink-600 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;