import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Minus, Check, X } from "lucide-react";
import { CartContext } from "../../../Context/CartContext";
import { AuthContext } from "../../../Context/AuthContext";

const ITEMS = [
  {
    id: 1,
    title: "Bikini Wax",
    subtitle: "Wax By Cosbar Honey",
    img: "https://i.pinimg.com/736x/c7/1d/70/c71d7048ef2998fbc85ad1efd3422f70.jpg",
    features: ["Cosbar Honey Dark Chocolate"],
    price: 555,
    mrp: 1120,
    save: 565,
    duration: "20 mins",
  },
  {
    id: 2,
    title: "Bikini Line And Butt Line",
    subtitle: "Wax By Cosbar Honey",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80",
    features: [
      "Cosbar Honey Dark Chocolate",
      "Remove unwanted hair from Intimate border area",
    ],
    price: 660,
    mrp: 1200,
    save: 540,
    duration: "25 mins",
  },
  {
    id: 3,
    title: "Butt Wax",
    subtitle: "Wax By Rica Brazilian",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    features: [
      "Rica Brazilian( Peel Off )Wax",
      "Avocado Butter",
      "Remove unwanted hair from Intimate area",
    ],
    price: 559,
    mrp: 1499,
    save: 940,
    duration: "25 mins",
  },
  {
    id: 4,
    title: "No Shave Zone",
    subtitle: "Wax By Rica & Rica Brazilian",
    // banner: "No Shave Zone",
    // bannerSub: "Wax By Rica & Rica Brazilian",
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
    id: 5,
    title: "Smooth & Clean",
    subtitle: "Facial, Waxing, Algaemask & Threading",
    img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80",
    features: [
      "Facial- Tan Glow Includes 6 Steps",
      "Algaemask- Goji Berry Moisture",
      "Waxing- Full Arms & Full Legs by Cosbar Gel Wax",
    ],
    price: 1499,
    mrp: 2899,
    save: 1400,
    duration: "01 hr : 30 mins",
  },
  {
    id: 6,
    title: "Full Body",
    subtitle: "Bleach By Hydra Cream Bleach",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    features: [
      "Hydra Cream Bleach",
      "Excluding Face",
      "Helps Lighting the color of Body hair",
    ],
    price: 899,
    mrp: 1599,
    save: 700,
    duration: "40 mins",
  },
  {
    id: 7,
    title: "A Solution For Glow",
    subtitle: "Facial, Waxing, Detan &Threading",
    img: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&q=80",
    features: [
      "Facial- Luminous Glow Includes 6 Steps",
      "Detan- Face & Neck",
      "Waxing- Full Arms & Full Legs by Rica",
    ],
    price: 1699,
    mrp: 3299,
    save: 1600,
    duration: "01 hr : 40 mins",
  },
  {
    id: 8,
    title: "Full Back",
    subtitle: "Waxing By Rica White Chocolate",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    features: ["Waxing- Full Back by Rica White Chocolate"],
    price: 699,
    mrp: 1199,
    save: 500,
    duration: "30 mins",
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

function ItemDetailModal({ item, qty, onQtyChange, onClose, onCheckout }) {
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
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
          />
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
              <h2 className="font-bold text-lg sm:text-xl text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{item.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-lg text-gray-900">
                ₹{item.price.toLocaleString("en-IN")}/-
              </div>
              <div className="text-xs text-gray-400 line-through">
                ₹{item.mrp.toLocaleString("en-IN")}/-
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            {item.duration && (
              <span className="flex items-center gap-1.5 bg-pink-50 text-pink-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                🕐 {item.duration}
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
              {item.features.map((f, i) => (
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

function ItemCard({ item, qty, onAdd, onIncrease, onDecrease, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.banner && (
          <div className="absolute top-3 left-3 right-1/2 pointer-events-none">
            <p className="text-amber-500 font-extrabold text-base sm:text-lg italic drop-shadow-sm leading-tight">
              {item.banner}
            </p>
            <p className="text-[10px] text-gray-700 mt-0.5 leading-tight">
              {item.bannerSub}
            </p>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>

        <ul className="mt-2 space-y-1">
          {item.features.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
              <Check size={12} className="text-pink-700 shrink-0 mt-0.5" strokeWidth={3} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            ₹{item.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{item.mrp.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">
            Save ₹{item.save.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <button
            onClick={() => onViewDetails(item)}
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

function CartBar({ cart, items, onViewCart }) {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  if (entries.length === 0) return null;

  const names = entries.map(([id]) => items.find((d) => d.id === Number(id))?.title);
  const totalPrice = entries.reduce(
    (sum, [id, q]) => sum + (items.find((d) => d.id === Number(id))?.price || 0) * q,
    0
  );
  const totalMrp = entries.reduce(
    (sum, [id, q]) => sum + (items.find((d) => d.id === Number(id))?.mrp || 0) * q,
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

export default function BeBold() {
  const [cart, setCart] = useState({});
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  // Login ke baad wapas is page pe aane par, agar koi item pending tha
  // to uska detail modal phir se khol do — Add to Cart/Checkout khud
  // user dabayega, silently cart mein add nahi karna
  useEffect(() => {
    const pendingItem = location.state?.checkoutState?.pendingItem;
    if (pendingItem) {
      setDetailItem(pendingItem);
      // state clear kar do taaki refresh/back navigation pe modal dobara na khule
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Agar user logged in nahi hai, to signin pe bhej do — pending item
  // state mein save karke, taaki login ke baad wapas yahi modal khule
  const requireLogin = (item) => {
    navigate("/signin", {
      state: {
        from: location.pathname,
        checkoutState: { pendingItem: item },
      },
    });
  };

  // ITEMS ka object ko asli CartContext ke item shape mein convert karta hai
  const mapToCartItem = (item, qty) => ({
    _id: item.id,
    name: item.title,
    price: item.price,
    oldPrice: item.mrp,
    image: item.img,
    duration: item.duration,
    quantity: qty,
  });

  const setQty = (id, updater) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, updater(current));
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (item) => {
    if (!isLoggedIn) {
      requireLogin(item);
      return;
    }
    setQty(item.id, () => 1);
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
        const item = ITEMS.find((i) => i.id === Number(id));
        if (item) addToCart(mapToCartItem(item, q));
      });
    navigate("/cart");
  };

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Be Bold
          </h1>
          <div className="h-1 w-16 mt-2 rounded-full bg-gradient-to-r from-pink-700 to-yellow-500" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              qty={getQty(item.id)}
              onAdd={() => handleAdd(item)}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => setQty(item.id, (q) => q - 1)}
              onViewDetails={setDetailItem}
            />
          ))}
        </div>
      </div>

      <CartBar cart={cart} items={ITEMS} onViewCart={handleViewCart} />

      {showLimitModal && (
        <LimitModal onClose={() => setShowLimitModal(false)} />
      )}

      {detailItem && (
        <ItemDetailModal
          item={detailItem}
          qty={getQty(detailItem.id)}
          onQtyChange={(val) => setQty(detailItem.id, () => val)}
          onClose={() => setDetailItem(null)}
          onCheckout={() => {
            if (!isLoggedIn) {
              requireLogin(detailItem);
              return;
            }
            addToCart(mapToCartItem(detailItem, getQty(detailItem.id) || 1));
            setDetailItem(null);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
}