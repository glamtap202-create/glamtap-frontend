import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const {
    confirmationId = "—",
    firstName = "",
    lastName = "",
    email = "",
    address = "",
    city = "",
    stateField = "",
    pin = "",
    country = "India",
    phone = "",
    paymentMethod = "Pay After Service",
    total = 0,
    subtotal = 0,
    taxes = 0,
    items = [],
    itemCount = 0,
  } = state || {};

  const fullName = `${firstName} ${lastName}`.trim();
  const visibleItems = items.slice(0, 4);
  const remainingCount = items.length - visibleItems.length;

  // Show booking confirmation popup as soon as this page loads
  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Booking Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 sm:p-8 text-center relative animate-[fadeIn_0.2s_ease-out]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-fuchsia-50 flex items-center justify-center">
              <span className="text-fuchsia-700 text-3xl">✓</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Booking Confirmed!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Confirmation #{confirmationId}
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Thank you{fullName ? `, ${fullName}` : ""}! Your booking of{" "}
              {itemCount || items.length} service
              {(itemCount || items.length) > 1 ? "s" : ""} worth ₹
              {Number(total).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}{" "}
              has been placed successfully.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors text-white font-semibold rounded-md px-6 py-3"
            >
              Great, Thanks!
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="px-6 sm:px-10 py-6">
          <h1 className="text-2xl font-semibold mb-2">
            <span className="text-fuchsia-800">Glam</span>{" "}
            <span className="text-gray-900">tap</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left column */}
          <div className="px-6 sm:px-10 pb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-fuchsia-700 flex items-center justify-center flex-shrink-0">
                <span className="text-fuchsia-700 text-lg">✓</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  Confirmation #{confirmationId}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  Thank you{fullName ? `, ${fullName.toUpperCase()}` : ""}!
                </p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md p-5 mb-6">
              <p className="font-semibold text-gray-900 mb-1">
                Your order is confirmed
              </p>
              <p className="text-sm text-gray-500">
                You'll receive a confirmation email soon
              </p>
            </div>

            <div className="border border-gray-200 rounded-md p-5">
              <p className="font-semibold text-gray-900 mb-4">Order details</p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Contact information
                  </p>
                  <p className="text-sm text-gray-700">{email}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Payment method
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                      $
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {paymentMethod} · ₹
                    {Number(total).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    INR
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Billing address
                </p>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {fullName && <p>{fullName.toUpperCase()}</p>}
                  {(city || stateField || pin) && (
                    <p>
                      {[city, stateField, pin].filter(Boolean).join(" ")}
                    </p>
                  )}
                  {address && <p>{address}</p>}
                  {country && <p>{country}</p>}
                  {phone && <p>{phone}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-700">
                Need help?{" "}
                <a href="#" className="text-fuchsia-800 underline">
                  Contact us
                </a>
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors text-white font-semibold rounded-md px-6 py-3"
              >
                Continue shopping
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-10 text-xs text-gray-500 underline">
              <a href="#">Refund policy</a>
              <a href="#">Privacy policy</a>
              <a href="#">Terms of service</a>
              <a href="#">Contact</a>
            </div>
          </div>

          {/* Right column — order summary */}
          <div className="bg-[#5a2430] text-white px-6 sm:px-10 py-10">
            <div className="space-y-4 mb-6">
              {visibleItems.map((item, index) => (
                <div key={item.id ?? index} className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-md bg-white/10 flex-shrink-0 overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <span className="absolute -top-1 -right-1 bg-gray-300 text-gray-900 text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.qty || 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.provider && (
                      <p className="text-xs text-white/60">{item.provider}</p>
                    )}
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">
                    ₹
                    {Number(item.price).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>

            {remainingCount > 0 && (
              <button
                type="button"
                className="w-full text-center text-sm font-medium text-fuchsia-200 bg-white/10 hover:bg-white/20 transition-colors rounded-md py-2.5 mb-6"
              >
                View all {items.length} items
              </button>
            )}

            <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal · {itemCount || items.length} items</span>
                <span>
                  ₹
                  {Number(subtotal).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">Taxes & Fee ⓘ</span>
                <span>
                  ₹
                  {Number(taxes).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2">
                <span>Total</span>
                <span>
                  <span className="text-xs font-normal align-top mr-1">
                    INR
                  </span>
                  ₹
                  {Number(total).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;