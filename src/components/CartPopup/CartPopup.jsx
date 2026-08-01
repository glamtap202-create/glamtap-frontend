import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { X } from "lucide-react";

function CartPopup() {
  const {
    showPopup,
    closePopup,
    lastAddedItem,
    cart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cart.length === 0) {
      closePopup();
    }
  }, [cart.length, closePopup]);

  useEffect(() => {
    if (["/checkout", "/thank-you"].includes(location.pathname)) {
      closePopup();
    }
  }, [location.pathname, closePopup]);

  if (!showPopup || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white shadow-[0_16px_60px_rgba(0,0,0,0.18)] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-pink-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
            {cart.length}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {lastAddedItem.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {lastAddedItem.duration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={closePopup}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Close popup"
          >
            <X size={18} />
          </button>

          <button
            onClick={() => {
              closePopup();
              navigate("/cart");
            }}
            className="px-4 py-2 rounded-xl bg-pink-800 text-white text-sm font-semibold hover:bg-pink-900 transition"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPopup;