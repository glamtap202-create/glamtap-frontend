import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Check, X, Share2 } from "lucide-react";
import { CartContext } from "../../../Context/CartContext";

const ITEMS = [
  {
    id: 1,
    title: "Korean Touch",
    subtitle: "Luxury Facial, Luxury Manicure & Pedicure",
    images: [
      "https://i.pinimg.com/736x/e5/b1/b2/e5b1b2c63ddbb5a776235ce86b56a1b0.jpg",
      "https://i.pinimg.com/736x/13/4f/9d/134f9d5aabb2b3162e47bfe621f81a07.jpg",
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&q=80",
    ],
    img: "https://i.pinimg.com/736x/e5/b1/b2/e5b1b2c63ddbb5a776235ce86b56a1b0.jpg",
    features: [
      "Facial- Korean Glass Includes 9 Steps",
      "Manicure & Pedicure - Korean Includes 10 Steps",
    ],
    price: 2199,
    mrp: 4498,
    save: 2299,
    duration: "01 hr : 45 mins",
  },
  {
    id: 2,
    title: "Korean Glass Facial",
    subtitle: "Korean Glass Facial",
    // banner: "KOREAN\nGLASS FACIAL",
    // bannerSub: "Glass Skin, Naturally You.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    features: ["Includes 9 steps", "For all skin types"],
    price: 1299,
    mrp: 2499,
    save: 1200,
    duration: "01 hr : 0 mins",
  },
  {
    id: 3,
    title: "Korean Body Polishing",
    subtitle: "10 Steps Kit",
    // banner: "Body Polishing",
    // bannerSub: "10 Steps kit",
    img: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&q=80",
    features: [
      "Steps- 10 steps body polishing kit.",
      "Overview- Full body exfoliation for smoother skin.",
      "Benefits- Boosts cell renewal and hydration.",
    ],
    price: 1699,
    mrp: 3398,
    save: 1699,
    duration: "01 hr : 15 mins",
  },
  {
    id: 4,
    title: "Korean Glow Hands & Feet",
    subtitle: "Korean Mani & Pedi",
    // banner: "KOREAN\nGLOW",
    // bannerSub: "Hands & Feet",
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
    features: ["Korean Manicure & Pedicure", "Includes 10 Steps"],
    price: 1049,
    mrp: 1999,
    save: 950,
    duration: "50 mins",
  },
  {
    id: 5,
    title: "Korean Mani Magic",
    subtitle: "Korean Manicure",
    // banner: "Elegant & Minimal",
    // bulletBanner: [
    //   "Nourish your nails,",
    //   "Shine with Korean perfection,",
    //   "Gentle care for every hand.",
    // ],
    img: "https://i.pinimg.com/1200x/bd/6e/a8/bd6ea81b68a690d849e0b0ddc0b47c93.jpg",
    features: ["Korean manicure", "Includes 10 Steps"],
    price: 649,
    mrp: 1199,
    save: 550,
    duration: "30 mins",
  },
  {
    id: 6,
    title: "Korean Pedi Vibes",
    subtitle: "Korean Pedicure",
    // banner: "KOREAN PEDICURE",
    // bannerSub: "INCLUDES 10 STEPS",
    img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80",
    features: ["Korean pedicure", "Includes 10 Steps"],
    price: 699,
    mrp: 1299,
    save: 600,
    duration: "35 mins",
  },
];

const MAX_QTY_PER_ITEM = 5;

function LimitModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 sm:p-6">
        <h2 className="text-pink-700 font-bold text-base sm:text-lg mb-3">Service limit</h2>
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
          You can add up to 5 exclusive services at once.
        </p>
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mt-3">
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

function CardMedia({ item }) {
  if (item.images) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={item.images[0]}
          alt={item.title}
          className="row-span-2 w-full h-full object-cover"
          loading="lazy"
        />
        <img
          src={item.images[1]}
          alt={`${item.title} detail`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <img
          src={item.images[2]}
          alt={`${item.title} detail`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {item.bulletBanner ? (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-1/2 pointer-events-none">
          <p className="text-rose-500 font-bold text-[10px] sm:text-xs italic leading-tight mb-1">
            ❤ {item.banner}
          </p>
          <ul className="text-[9px] sm:text-[10px] text-gray-700 space-y-0.5">
            {item.bulletBanner.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        </div>
      ) : item.banner ? (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-1/2 pointer-events-none">
          <p className="text-amber-500 font-extrabold text-xs sm:text-sm md:text-base italic drop-shadow-sm leading-tight whitespace-pre-line">
            {item.banner}
          </p>
          {item.bannerSub && (
            <p className="text-[9px] sm:text-[10px] text-gray-700 mt-0.5 leading-tight">
              {item.bannerSub}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function ItemDetailModal({ item, qty, onQtyChange, onClose, onCheckout }) {
  const increase = () => onQtyChange(Math.min(MAX_QTY_PER_ITEM, qty + 1));
  const decrease = () => onQtyChange(Math.max(0, qty - 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
          >
            <X size={18} />
          </button>
          <button className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1.5 bg-pink-800 hover:bg-pink-900 text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors">
            <Share2 size={12} />
            Share & Earn
          </button>
        </div>

        <div className="p-3.5 sm:p-4 md:p-5">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">{item.title}</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{item.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-sm sm:text-lg text-gray-900">
                ₹{item.price.toLocaleString("en-IN")}/-
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 line-through">
                ₹{item.mrp.toLocaleString("en-IN")}/-
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 sm:mt-4 flex-wrap gap-2 sm:gap-3">
            {item.duration && (
              <span className="flex items-center gap-1.5 bg-pink-50 text-pink-800 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
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

          <div className="mt-4 sm:mt-5">
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2">Service Details</h4>
            <ul className="space-y-1.5">
              {item.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <Check size={13} className="text-pink-700 shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 p-3.5 sm:p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => {
              if (qty === 0) onQtyChange(1);
              onCheckout();
            }}
            className="w-full bg-pink-800 hover:bg-pink-900 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-colors text-sm sm:text-base"
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
      <CardMedia item={item} />

      <div className="p-2.5 sm:p-3 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
          {item.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{item.subtitle}</p>

        <ul className="mt-1.5 sm:mt-2 space-y-1">
          {item.features.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
              <Check size={11} className="text-pink-700 shrink-0 mt-0.5" strokeWidth={3} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ₹{item.price.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
            ₹{item.mrp.toLocaleString("en-IN")}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">
            Save ₹{item.save.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <button
            onClick={() => onViewDetails(item)}
            className="flex-1 border border-gray-300 rounded-full py-1.5 text-[10px] sm:text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>

          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="flex-1 bg-pink-800 hover:bg-pink-900 text-white rounded-full py-1.5 text-[10px] sm:text-xs font-semibold transition-colors"
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-pink-800 text-white rounded-full px-1.5 sm:px-2 py-1">
              <button
                onClick={onDecrease}
                className="p-1 hover:bg-pink-900 rounded-full transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="font-semibold text-[11px] sm:text-xs">{qty}</span>
              <button
                onClick={onIncrease}
                className="p-1 hover:bg-pink-900 rounded-full transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={13} />
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
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-[95%] max-w-xl">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-800 font-bold text-xs sm:text-sm">
          {entries.length}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{label}</p>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs flex-wrap">
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
          className="shrink-0 border border-gray-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default function KoreanGlow() {
  const [cart, setCart] = useState({});
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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
    <div className="bg-gray-50 py-4 sm:py-6 px-3 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
            Korean Glow
          </h1>
          <div className="h-1 w-14 sm:w-16 mt-2 rounded-full bg-gradient-to-r from-pink-700 to-yellow-500" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              qty={getQty(item.id)}
              onAdd={() => setQty(item.id, () => 1)}
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
            addToCart(mapToCartItem(detailItem, getQty(detailItem.id) || 1));
            setDetailItem(null);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
}