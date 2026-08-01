import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import API from "../../api/axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const INDIAN_STATES = [
  "Delhi",
  "Uttar Pradesh",
  "Haryana",
  "Punjab",
  "Rajasthan",
  "Maharashtra",
  "Gujarat",
  "Bihar",
  "Madhya Pradesh",
  "West Bengal",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
];

// Har jagah ek hi jagah se image URL banao - path relative ho ya absolute, dono handle ho jaayenge
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
};

function Checkout() {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("Pay After Service");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const tax = subtotal * 0.1;

  const total = subtotal + tax;

  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Must be logged in — backend requires a token for /bookings
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to complete your booking.");
      navigate("/signin");
      return;
    }

    if (!form.firstName || !form.phone || !form.address) {
      alert("Please fill required details");
      return;
    }

    try {
      const bookingData = {
        userId: localStorage.getItem("userId") || null,

        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pin: form.pin,
        },

        services: cart.map((item) => ({
          serviceId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          waxType: item.waxType || null,
        })),

        bookingDate: new Date(),

        bookingTime: "10:00 AM - 11:00 AM",

        subtotal,
        tax,
        totalAmount: total,

        paymentMethod,

        notes: "",
      };

      const response = await API.post("/bookings", bookingData);

      navigate("/thank-you", {
        state: {
          confirmationId: response.data.booking._id,

          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          stateField: form.state,
          pin: form.pin,
          paymentMethod,

          subtotal,
          taxes: tax,
          total,

          items: cart.map((item) => ({
            id: item._id,
            name: item.name,
            image: getImageUrl(item.image),
            qty: item.quantity,
            price: item.price,
            provider: item.waxType || "",
          })),

          itemCount,
        },
      });
    } catch (error) {
      console.log(error.response?.data || error);
      // Show the real backend reason instead of a generic message
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
              GlamTap Checkout
            </h1>

            <h2 className="text-xl font-semibold mb-4">Email</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-5"
            />

            <h2 className="text-xl font-semibold mb-4">Service Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border p-3 rounded"
              />

              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="border p-3 rounded"
              >
                <option value="">State</option>

                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <input
                name="pin"
                placeholder="PIN"
                value={form.pin}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-4"
            />

            <h2 className="text-xl font-semibold mt-8">Payment</h2>

            <button
              onClick={() => setPaymentMethod("Pay After Service")}
              className="w-full mt-4 border p-4 rounded-xl text-sm sm:text-base"
            >
              Pay After Service (Cash / UPI)
            </button>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-fuchsia-700 text-white py-3.5 sm:py-4 rounded-xl"
            >
              Complete Your Booking
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-[#5a2430] text-white rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl mb-5 sm:mb-6">Order Summary</h2>

            {cart.map((item, index) => (
              <div
                key={`${item._id ?? index}-${item.waxType || "default"}`}
                className="flex gap-3 sm:gap-4 mb-4 sm:mb-5"
              >
                <img
                  src={getImageUrl(item.image)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover shrink-0"
                />

                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base break-words">{item.name}</h3>

                  <p className="text-sm">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <hr />

            <div className="mt-5 space-y-2">
              <p>Subtotal ₹{subtotal}</p>
              <p>Tax ₹{tax}</p>
              <h2 className="text-xl">Total ₹{total}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;