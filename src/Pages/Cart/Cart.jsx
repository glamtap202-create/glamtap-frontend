import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CartContext } from "../../Context/CartContext";

// FIX: images uploaded in the frontend's own /public folder should NOT be
// prefixed with the backend API URL — that only resolves correctly when the
// image is actually served by the backend. Paths like "/images/wax5.webp"
// live in this app's own public/ folder, so they should be used as-is.
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  return path;
};

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Agar login flow se wapas aaye hain (Cart -> Signin -> Cart), to pehle se
  // selected date/slot restore kar do taaki user ko dobara select na karna pade
  const restoredState = location.state;

  const [date, setDate] = useState(
    restoredState?.date ? new Date(restoredState.date) : new Date()
  );
  const [slot, setSlot] = useState(restoredState?.slot || "");

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const grandTotal = subtotal;

  const handleConfirmSlot = () => {
    if (!slot) {
      alert("Please select a time slot");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue booking");
      navigate("/signin", {
        state: {
          // Login ke baad wapas cart pe hi bhejo, checkout pe nahi
          from: "/cart",
          checkoutState: { cart, subtotal, grandTotal, date, slot },
        },
      });
      return;
    }

    navigate("/checkout", {
      state: {
        cart,
        subtotal,
        grandTotal,
        date,
        slot,
      },
    });
  };

  return (
    <div className="bg-[#f8f5ef] min-h-screen py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light">Your Cart</h1>

          <Link to="/" className="text-green-700 underline text-sm sm:text-base">
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <h2 className="text-2xl sm:text-3xl font-semibold">Your cart is empty</h2>

            <Link
              to="/"
              className="inline-block mt-6 bg-black text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {cart.map((item, index) => (
                <div
                  key={`${item._id ?? item.id ?? index}-${
                    item.waxType || "default"
                  }`}
                  className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 border-b py-5 sm:py-6"
                >
                  <div className="flex gap-4 sm:gap-5 flex-1">
                    <img
                      src={getImageUrl(item.image)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                      alt={item.name}
                      className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">
                        {item.duration}
                      </p>

                      <h2 className="text-base sm:text-xl font-semibold break-words">{item.name}</h2>

                      {item.waxType && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm">
                          Wax Type : {item.waxType}
                        </p>
                      )}

                      <div className="flex gap-3 mt-2 sm:mt-3">
                        <span className="text-lg sm:text-xl font-bold text-pink-700">
                          ₹{item.price}
                        </span>

                        {item.oldPrice && (
                          <span className="line-through text-gray-400 text-sm sm:text-base">
                            ₹{item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center border rounded-xl">
                      <button
                        onClick={() =>
                          decreaseQuantity(item._id, item.waxType)
                        }
                        className="px-3 sm:px-4 py-2 text-lg sm:text-xl"
                      >
                        -
                      </button>

                      <span className="px-4 sm:px-5 text-sm sm:text-base">{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id, item.waxType)
                        }
                        className="px-3 sm:px-4 py-2 text-lg sm:text-xl"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold sm:mt-4 text-sm sm:text-base">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeItem(item._id, item.waxType)}
                      className="text-red-500 text-xs sm:text-sm sm:mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
                <div className="flex justify-between mb-3 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <div className="mt-6 sm:mt-8">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Select Service Date</h3>

                  <div className="overflow-x-auto">
                    <Calendar value={date} onChange={setDate} className="!w-full !border-0 sm:!border" />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Choose Time Slot</h3>

                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  >
                    <option value="">Select Time</option>
                    <option>8:00 AM - 9:00 AM</option>
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 1:00 PM</option>
                    <option>1:00 PM - 2:00 PM</option>
                    <option>2:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 4:00 PM</option>
                    <option>4:00 PM - 5:00 PM</option>
                    <option>5:00 PM - 6:00 PM</option>
                  </select>
                </div>

                <button
                  onClick={handleConfirmSlot}
                  className="w-full mt-6 bg-pink-700 text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base"
                >
                  Confirm Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
//fg
export default Cart;