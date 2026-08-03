// import { useContext, useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { X } from "lucide-react";
// import API from "../../api/axios";
// import { AuthContext } from "../../Context/AuthContext";

// function SignIn() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, isLoggedIn } = useContext(AuthContext);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   // Agar user pehle se logged in hai (jaise back button se yahan aa gaya),
//   // to login form dikhane ki bajaye seedha aage bhej do — dobara login na maange
//   useEffect(() => {
//     if (isLoggedIn) {
//       if (location.state?.from) {
//         navigate(location.state.from, {
//           replace: true,
//           state: location.state.checkoutState,
//         });
//       } else {
//         navigate("/account", { replace: true });
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoggedIn]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const { data } = await API.post("/users/login", form);

//       login(data.user, data.token);

//       if (data.user.role === "admin") {
//         navigate("/admin", { replace: true });
//       } else if (location.state?.from) {
//         // Booking flow se aaya tha — wahin wapas, cart data ke saath
//         // replace: true taaki /signin history se hat jaaye, back dabane par dobara na aaye
//         navigate(location.state.from, {
//           replace: true,
//           state: location.state.checkoutState,
//         });
//       } else {
//         navigate("/account", { replace: true });
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoHome = () => {
//     navigate("/", { replace: true });
//   };

//   // Jab tak login-check chal raha hai (already logged-in redirect), form mat dikhao
//   if (isLoggedIn) return null;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 relative">
//       <button
//         onClick={handleGoHome}
//         aria-label="Close and go to home"
//         className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
//       >
//         <X size={20} className="text-gray-600" />
//       </button>

//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-[400px]"
//       >
//         <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h1>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border w-full p-3 rounded mb-4 text-sm sm:text-base"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="border w-full p-3 rounded mb-6 text-sm sm:text-base"
//           required
//         />

//         <button
//           className="bg-pink-600 text-white w-full py-3 rounded text-sm sm:text-base"
//           disabled={loading}
//         >
//           {loading ? "Logging..." : "Login"}
//         </button>

//         <p className="text-center mt-5 text-sm sm:text-base">
//           Don't have an account?
//           <Link
//             to="/register"
//             state={location.state}
//             className="text-pink-600 ml-2"
//           >
//             Register
//           </Link>
//         </p>

//         <button
//           type="button"
//           onClick={handleGoHome}
//           className="w-full mt-4 text-sm text-gray-500 underline"
//         >
//           Continue without login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import API from "../../api/axios";
import { AuthContext } from "../../Context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Ye flag batata hai ki isLoggedIn change humare apne handleLogin ki wajah se hua
  // (jisme hum khud navigate kar chuke hain), taaki neeche wala useEffect
  // dobara navigate karke race condition na banaye
  const justLoggedInRef = useRef(false);

  // Agar user pehle se logged in hai (jaise back button se yahan aa gaya),
  // to login form dikhane ki bajaye seedha aage bhej do — dobara login na maange
  useEffect(() => {
    if (isLoggedIn) {
      if (justLoggedInRef.current) {
        // Ye navigate humara apna handleLogin abhi kar chuka hai — dobara mat karo
        justLoggedInRef.current = false;
        return;
      }

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/users/login", form);

      // Flag set karo isse pehle ki login() call ho aur isLoggedIn change ho —
      // taaki upar wala useEffect ye navigate na dohraye
      justLoggedInRef.current = true;

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (location.state?.from) {
        // Booking flow se aaya tha — wahin wapas, cart data ke saath
        // replace: true taaki /signin history se hat jaaye, back dabane par dobara na aaye
        navigate(location.state.from, {
          replace: true,
          state: location.state.checkoutState,
        });
      } else {
        navigate("/account", { replace: true });
      }
    } catch (err) {
      justLoggedInRef.current = false; // login fail hua to flag reset kar do
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  // Jab tak login-check chal raha hai (already logged-in redirect), form mat dikhao
  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 relative">
      <button
        onClick={handleGoHome}
        aria-label="Close and go to home"
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
      >
        <X size={20} className="text-gray-600" />
      </button>

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-[400px]"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4 text-sm sm:text-base"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-6 text-sm sm:text-base"
          required
        />

        <button
          className="bg-pink-600 text-white w-full py-3 rounded text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="text-center mt-5 text-sm sm:text-base">
          Don't have an account?
          <Link
            to="/register"
            state={location.state}
            className="text-pink-600 ml-2"
          >
            Register
          </Link>
        </p>

        <button
          type="button"
          onClick={handleGoHome}
          className="w-full mt-4 text-sm text-gray-500 underline"
        >
          Continue without login
        </button>
      </form>
    </div>
  );
}

export default SignIn;