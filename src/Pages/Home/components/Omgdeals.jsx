import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Minus, Check, X } from "lucide-react";
import { CartContext } from "../../../Context/CartContext";
import { AuthContext } from "../../../Context/AuthContext";

const DEALS = [
  {
    id: 1,
    title: "No Shave Zone",
    subtitle: "Wax By Rica & Rica Brazilian",
    // banner: "No Shave Zone",
    // bannerSub: "Wax By Rica & Rica Brazilian",
    bannerImg:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
    features: [
      "Waxing- Full arms & Full legs by Rica white chocolate",
      "Intimate Waxing- Bikini & Underarms by Rica Brazilian",
    ],
    price: 1599,
    mrp: 2616,
    save: 1017,
    duration: "01 hr : 15 mins",
  },
  {
    id: 2,
    title: "Glowfinity",
    subtitle: "Luxury Facial, Waxing, Mani, Pedi, & Threading",
    // banner: "Glowfinity",
    // bannerSub: "Luxury Facial, Waxing, Mani, Pedi, & Threading",
    bannerImg:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    features: [
      "Facial- Korean Glass Includes 9 Steps",
      "Waxing- Full Arms & Full legs by Rica White Chocolate",
      "Intimate Waxing- Underarms by Rica Brazilian",
    ],
    price: 3349,
    mrp: 5774,
    save: 2425,
    duration: "01 hr : 45 mins",
  },
  {
    id: 3,
    title: "Wedding Day Glamm",
    subtitle: "Facial, Waxing, Detan, Threading & Massage",
    images: [
      "https://i.pinimg.com/736x/33/5d/ef/335def073614cda443d466417ac4a195.jpg",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=300&q=80",
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=300&q=80",
    ],
    img: "https://i.pinimg.com/736x/33/5d/ef/335def073614cda443d466417ac4a195.jpg",
    features: [
      "Facial- Korean Glass Facial includes 9 steps",
      "Detan- Face & Neck",
      "Waxing- Full Arms & Full Legs by Rica white chocolate",
    ],
    price: 2399,
    mrp: 4675,
    save: 2276,
    duration: "02 hrs : 0 mins",
  },
  {
    id: 4,
    title: "Waxing Rituals",
    subtitle: "Waxing, Detan, Threading, Mani & Pedi",
    banner: "",
    bannerImg:
      "https://i.pinimg.com/736x/c7/1d/70/c71d7048ef2998fbc85ad1efd3422f70.jpg",
    img: "https://i.pinimg.com/736x/c7/1d/70/c71d7048ef2998fbc85ad1efd3422f70.jpg",
    features: [
      "Waxing- Full Arms & Full Legs by Rica white chocolate",
      "Intimate Waxing- Underarms by Rica Brazilian",
      "Manicure & Pedicure- Cosbar Ocean Hydra includes 5 Steps",
    ],
    price: 2399,
    mrp: 4323,
    save: 1924,
    duration: "01 hr : 50 mins",
  },
];

const MAX_QTY_PER_ITEM = 5;

function LimitModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h2 className="text-pink-700 font-bold text-lg mb-3">Service limit</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          You can add up to 5 exclusive services at once.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mt-3">
          Choose your ideal services now, and add more whenever you're ready to
          elevate your experience.
        </p>
        <button
          onClick={onClose}
          className="mt-5 bg-pink-800 hover:bg-pink-900 text-white font-semibold rounded-full px-6 py-2 text-sm transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function DealDetailModal({ deal, qty, onQtyChange, onClose, onCheckout }) {
  const increase = () => onQtyChange(Math.min(MAX_QTY_PER_ITEM, qty + 1));
  const decrease = () => onQtyChange(Math.max(0, qty - 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {deal.images ? (
            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-48 sm:h-56 overflow-hidden rounded-t-2xl">
              {deal.images.slice(0, 4).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${deal.title} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          ) : (
            <img
              src={deal.bannerImg}
              alt={deal.title}
              className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900">{deal.title}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{deal.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-lg text-gray-900">
                ₹{deal.price.toLocaleString("en-IN")}/-
              </div>
              <div className="text-xs text-gray-400 line-through">
                ₹{deal.mrp.toLocaleString("en-IN")}/-
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            {deal.duration && (
              <span className="flex items-center gap-1.5 bg-pink-50 text-pink-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                🕐 {deal.duration}
              </span>
            )}
            <div className="flex items-center gap-2 bg-pink-800 text-white rounded-full px-2 py-1">
              <button onClick={decrease} className="p-1 hover:bg-pink-900 rounded-full transition-colors">
                <Minus size={14} />
              </button>
              <span className="font-semibold text-sm w-4 text-center">{qty}</span>
              <button onClick={increase} className="p-1 hover:bg-pink-900 rounded-full transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Service Details</h4>
            <ul className="space-y-1.5">
              {deal.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={14} className="text-pink-700 shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => {
              if (qty === 0) onQtyChange(1);
              onCheckout();
            }}
            className="w-full bg-pink-800 hover:bg-pink-900 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

function DealCard({ deal, qty, onAdd, onIncrease, onDecrease, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {deal.images ? (
        <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {deal.images.slice(0, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${deal.title} ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ))}
        </div>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50">
          <img
            src={deal.bannerImg}
            alt={deal.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {deal.banner && (
            <div className="absolute top-3 left-3 right-1/2 pointer-events-none">
              <p className="text-amber-500 font-extrabold text-base sm:text-lg italic drop-shadow-sm leading-tight">
                {deal.banner}
              </p>
              <p className="text-[10px] text-gray-700 mt-0.5 leading-tight">
                {deal.bannerSub}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">
          {deal.title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{deal.subtitle}</p>

        <ul className="mt-2 space-y-1">
          {deal.features.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
              <Check size={12} className="text-pink-700 shrink-0 mt-0.5" strokeWidth={3} />
              <span className="line-clamp-2">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            ₹{deal.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{deal.mrp.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">
            Save ₹{deal.save.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <button
            onClick={() => onViewDetails(deal)}
            className="flex-1 border border-gray-300 rounded-full py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>

          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="flex-1 bg-pink-800 hover:bg-pink-900 text-white rounded-full py-1.5 text-xs font-semibold transition-colors"
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-pink-800 text-white rounded-full px-2 py-1">
              <button
                onClick={onDecrease}
                className="p-1 hover:bg-pink-900 rounded-full transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="font-semibold text-xs">{qty}</span>
              <button
                onClick={onIncrease}
                className="p-1 hover:bg-pink-900 rounded-full transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartBar({ cart, deals, onViewCart }) {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  if (entries.length === 0) return null;

  const names = entries.map(([id]) => deals.find((d) => d.id === Number(id))?.title);
  const totalPrice = entries.reduce(
    (sum, [id, q]) => sum + (deals.find((d) => d.id === Number(id))?.price || 0) * q,
    0
  );
  const totalMrp = entries.reduce(
    (sum, [id, q]) => sum + (deals.find((d) => d.id === Number(id))?.mrp || 0) * q,
    0
  );
  const totalSave = totalMrp - totalPrice;

  const label =
    names.length > 2
      ? `${names[0]}, ${names[1]}, ${names.length - 2} more...`
      : names.join(", ");

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-800 font-bold text-sm">
          {entries.length}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">{label}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-gray-900">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-gray-400 line-through">
              ₹{totalMrp.toLocaleString("en-IN")}
            </span>
            <span className="text-pink-700 font-semibold">
              Save ₹{totalSave.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <button
          onClick={onViewCart}
          className="shrink-0 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default function OmgDeals() {
  const [cart, setCart] = useState({});
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [detailDeal, setDetailDeal] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  // Login ke baad wapas is page pe aane par, agar koi deal pending thi
  // to uska detail modal phir se khol do — Add to Cart/Checkout khud
  // user dabayega, silently cart mein add nahi karna
  useEffect(() => {
    const pendingDeal = location.state?.checkoutState?.pendingDeal;
    if (pendingDeal) {
      setDetailDeal(pendingDeal);
      // state clear kar do taaki refresh/back navigation pe modal dobara na khule
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Agar user logged in nahi hai, to signin pe bhej do — pending deal
  // state mein save karke, taaki login ke baad wapas yahi modal khule
  const requireLogin = (deal) => {
    navigate("/signin", {
      state: {
        from: location.pathname,
        checkoutState: { pendingDeal: deal },
      },
    });
  };

  // DEALS ka object ko asli CartContext ke item shape mein convert karta hai
  const mapToCartItem = (deal, qty) => ({
    _id: deal.id,
    name: deal.title,
    price: deal.price,
    oldPrice: deal.mrp,
    image: deal.img,
    duration: deal.duration,
    quantity: qty,
  });

  const setQty = (id, updater) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, updater(current));
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (deal) => {
    if (!isLoggedIn) {
      requireLogin(deal);
      return;
    }
    setQty(deal.id, () => 1);
  };

  const handleIncrease = (id) => {
    const current = cart[id] || 0;
    if (current >= MAX_QTY_PER_ITEM) {
      setShowLimitModal(true);
      return;
    }
    setQty(id, (q) => q + 1);
  };

  const getQty = (id) => cart[id] || 0;

  const handleViewCart = () => {
    Object.entries(cart)
      .filter(([, q]) => q > 0)
      .forEach(([id, q]) => {
        const deal = DEALS.find((d) => d.id === Number(id));
        if (deal) addToCart(mapToCartItem(deal, q));
      });
    navigate("/cart");
  };

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            OMG!! DEALS
          </h1>
          <div className="h-1 w-16 mt-2 rounded-full bg-gradient-to-r from-pink-700 to-yellow-500" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {DEALS.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              qty={getQty(deal.id)}
              onAdd={() => handleAdd(deal)}
              onIncrease={() => handleIncrease(deal.id)}
              onDecrease={() => setQty(deal.id, (q) => q - 1)}
              onViewDetails={setDetailDeal}
            />
          ))}
        </div>
      </div>

      <CartBar cart={cart} deals={DEALS} onViewCart={handleViewCart} />

      {showLimitModal && (
        <LimitModal onClose={() => setShowLimitModal(false)} />
      )}

      {detailDeal && (
        <DealDetailModal
          deal={detailDeal}
          qty={getQty(detailDeal.id)}
          onQtyChange={(val) => setQty(detailDeal.id, () => val)}
          onClose={() => setDetailDeal(null)}
          onCheckout={() => {
            if (!isLoggedIn) {
              requireLogin(detailDeal);
              return;
            }
            addToCart(mapToCartItem(detailDeal, getQty(detailDeal.id) || 1));
            setDetailDeal(null);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
}