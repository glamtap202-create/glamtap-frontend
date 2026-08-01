import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import {
  Plus,
  Minus,
  Check,
  ChevronDown,
  Share2,
  X,
  MapPin,
  Calendar,
  ChevronLeft,
  ShoppingBag,
  Pencil,
  Trash2,
} from "lucide-react";
const PRODUCTS = [
  {
    id: "1",
    title: "Berry Bomb Ice Cream Facial",
    subtitle: "8 Steps Facial",
    features: ["Includes 8 steps", "Bleach friendly facial", "For All Skin Types"],
    price: 1199,
    mrp: 2022,
    save: 823,
    duration: "01 hr : 0 mins",
    coins: 70,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Extraction", "Massage", "Mask (Berry Bomb)", "Toning", "Moisturizing"],
    why: "Berry Bomb Ice Cream Facial cools and hydrates the skin while brightening dull, tired skin with antioxidant-rich berry extracts.",
    recommendedFor: ["Dull skin", "Dry skin", "Sun-tanned skin"],
    benefits : ["One of the most popular facials among women today,Improves skin texture and gives glowing skin,Has natural extracts and ingredients,Moisturizing and hydrating dry skin"],
    notes:["Steam is not included.Only mono sachet ( One time use ) Product will be handed over if left.,Rica Wax and Rica Brazilian wax box will not be handed over.,It is highly appreciated if you could inform our representative within 24 hours about any service reaction then only our team will take the proper action.,Eye Potli Compress is not included.,Personalize care and attention in the comfort of your own home only."],
    img: "https://i.pinimg.com/736x/ed/ad/97/edad974e1d9499506aa1ac6654299406.jpg",
  },
  {
    id: "2",
    title: "Gold Facial",
    subtitle: "Shine By Gold",
    features: ["Includes 8 Steps", "For All Skin Types"],
    price: 1149,
    mrp: 2199,
    save: 1050,
    duration: "01 hr : 0 mins",
    coins: 65,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Gold Massage", "Gold Mask", "Toning"],
    why: "Gold Facial gives your skin an instant radiant glow and helps reduce fine lines.",
    recommendedFor: ["Dull skin", "Aging skin"],
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80",
  },
  {
    id: "3",
    title: "Lift And Tighten",
    subtitle: "Skin Tightening Facial",
    features: ["Includes 6 steps", "For Skin Tightening", "For All Skin Types"],
    price: 799,
    mrp: 1050,
    save: 251,
    duration: "45 mins",
    coins: 45,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Lifting Massage", "Mask", "Toning"],
    why: "Lift And Tighten Facial firms sagging skin and improves elasticity for a youthful look.",
    recommendedFor: ["Sagging skin", "Aging skin"],
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    id: "4",
    title: "Fruity Radiance",
    subtitle: "Fruit Facial",
    features: ["Includes 6 Steps", "Instant Fruit Glow", "For All Skin Types"],
    price: 799,
    mrp: 1050,
    save: 251,
    duration: "45 mins",
    coins: 45,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Fruit Massage", "Fruit Mask", "Toning"],
    why: "Fruity Radiance gives an instant fresh glow using natural fruit extracts.",
    recommendedFor: ["Dull skin", "All skin types"],
    img: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&q=80",
  },
  {
    id: "5",
    title: "Luminous Glow",
    subtitle: "Insta Glow Facial",
    features: ["Includes 6 steps", "For Instant Glow", "For All Skin Types"],
    price: 899,
    mrp: 1199,
    save: 300,
    duration: "50 mins",
    coins: 50,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Glow Massage", "Glow Mask", "Toning"],
    why: "Luminous Glow Facial brightens the skin instantly, perfect before an event.",
    recommendedFor: ["Dull skin", "Occasion prep"],
    img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80",
  },
  {
    id: "6",
    title: "Tan Glow",
    subtitle: "AntiTan Facial",
    features: ["Includes 6 steps", "For Instant Tan Remove", "For All Skin Types"],
    price: 899,
    mrp: 1199,
    save: 300,
    duration: "50 mins",
    coins: 50,
    brand: "GlamTap",
    steps: ["Cleansing", "Scrub", "Steam", "Detan Massage", "Detan Mask", "Toning"],
    why: "Tan Glow Facial removes sun-tan and restores your skin's natural tone.",
    recommendedFor: ["Sun-tanned skin", "Outdoor workers"],
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
  },
];

const MAX_QTY_PER_ITEM = 5;
let nextCartId = 2;

/* ---------------- Last-minute add-on products ---------------- */
const ADDON_PRODUCTS = [
  {
    id: "addon-1",
    title: "O3+ Agelock Facial",
    subtitle: "by O3+ Professional",
    price: 1299,
    mrp: 2744,
    save: 1445,
    duration: "50 mins",
    brand: "O3+ Professional",
    features: ["Anti-ageing formula", "For All Skin Types"],
    img: "https://i.pinimg.com/736x/e5/b1/b2/e5b1b2c63ddbb5a776235ce86b56a1b0.jpg",
  },
  {
    id: "addon-2",
    title: "O3+ Bridal Facial",
    subtitle: "by O3+ Professional",
    price: 1799,
    mrp: 2999,
    save: 1200,
    duration: "01 hr : 10 mins",
    brand: "O3+ Professional",
    features: ["Bridal glow prep", "For All Skin Types"],
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
  },
  {
    id: "addon-3",
    title: "Pedicure",
    subtitle: "by Sara Rose",
    price: 555,
    mrp: 800,
    save: 245,
    duration: "40 mins",
    brand: "Sara Rose",
    features: ["Foot spa & massage", "Nail care included"],
    img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80",
  },
  {
    id: "addon-4",
    title: "Full Arms with Underarms",
    subtitle: "Wax by Rica",
    price: 489,
    mrp: 600,
    save: 111,
    duration: "30 mins",
    brand: "Rica",
    features: ["Smooth finish", "Rica wax"],
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80",
  },
  {
    id: "addon-5",
    title: "Full Arms with Underarms",
    subtitle: "Wax by Cosbar honey",
    price: 325,
    mrp: 450,
    save: 125,
    duration: "30 mins",
    brand: "Cosbar Honey",
    features: ["Honey wax", "Gentle on skin"],
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80",
  },
  {
    id: "addon-6",
    title: "Full Legs",
    subtitle: "Wax by Rica",
    price: 489,
    mrp: 600,
    save: 111,
    duration: "35 mins",
    brand: "Rica",
    features: ["Smooth finish", "Rica wax"],
    img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80",
  },
  {
    id: "addon-7",
    title: "Full Legs",
    subtitle: "Wax by Cosbar Honey",
    price: 299,
    mrp: 350,
    save: 51,
    duration: "35 mins",
    brand: "Cosbar Honey",
    features: ["Honey wax", "Gentle on skin"],
    img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80",
  },
  {
    id: "addon-8",
    title: "Bikini Wax",
    subtitle: "Wax by Cosbar honey",
    price: 555,
    mrp: 1120,
    save: 565,
    duration: "20 mins",
    brand: "Cosbar Honey",
    features: ["Honey wax", "Hygienic & quick"],
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80",
  },
  {
    id: "addon-9",
    title: "Bikini Line and Butt Line",
    subtitle: "Wax by Cosbar Honey",
    price: 660,
    mrp: 1200,
    save: 540,
    duration: "25 mins",
    brand: "Cosbar Honey",
    features: ["Honey wax", "Hygienic & quick"],
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80",
  },
  {
    id: "addon-10",
    title: "Chin",
    subtitle: "Wax by Rica Brazilian",
    price: 62,
    mrp: 145,
    save: 83,
    duration: "10 mins",
    brand: "Rica Brazilian",
    features: ["Quick touch-up", "Rica wax"],
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
  },
];

/* ---------------- Last-minute choice card ---------------- */
function AddonCard({ product, qty, onQtyChange, onViewDetails }) {
  const increase = (e) => {
    e.stopPropagation();
    onQtyChange(Math.min(MAX_QTY_PER_ITEM, qty + 1));
  };
  const decrease = (e) => {
    e.stopPropagation();
    onQtyChange(Math.max(0, qty - 1));
  };
  const add = (e) => {
    e.stopPropagation();
    onQtyChange(1);
  };

  return (
    <div className="relative shrink-0 w-36 sm:w-44 md:w-48 h-48 sm:h-56 rounded-xl overflow-hidden group cursor-pointer" onClick={() => onViewDetails(product)}>
      <img src={product.img} alt={product.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <button
        onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
        className="absolute top-2 right-2 bg-white/30 hover:bg-white/50 rounded-full p-1 text-white transition-colors"
        aria-label="View details"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="11" />
          <circle cx="12" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 text-white">
        <h4 className="font-bold text-xs sm:text-sm leading-tight line-clamp-2">{product.title}</h4>
        <p className="text-[10px] sm:text-[11px] text-white/70 mt-0.5">{product.subtitle}</p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-xs sm:text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-[9px] sm:text-[10px] text-white/60 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-pink-300 font-semibold mt-0.5">Save ₹{product.save.toLocaleString("en-IN")}</p>
      </div>

      {qty === 0 ? (
        <button
          onClick={add}
          className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-pink-700 hover:bg-pink-800 text-white rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Add to cart"
        >
          <Plus size={15} />
        </button>
      ) : (
        <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 flex items-center gap-1.5 bg-pink-800 text-white rounded-full px-1.5 py-1 shadow-md">
          <button onClick={decrease} className="p-0.5 hover:bg-pink-900 rounded-full transition-colors" aria-label="Decrease quantity">
            <Minus size={12} />
          </button>
          <span className="font-semibold text-[11px] w-3 text-center">{qty}</span>
          <button onClick={increase} className="p-0.5 hover:bg-pink-900 rounded-full transition-colors" aria-label="Increase quantity">
            <Plus size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Last-minute choice section ---------------- */
function LastMinuteChoice({ getQty, onQtyChange, onViewDetails }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 mb-4 sm:mb-6">
      <div className="bg-pink-900 text-white p-3.5 sm:p-4 md:p-5 flex items-center gap-2.5 sm:gap-3">
        <div className="bg-white/15 rounded-lg p-1.5 sm:p-2 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg md:text-xl">Last-minute choice</h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-pink-100 mt-0.5">
            Quick add-ons that pair well with your cart — same visit, one checkout.
          </p>
        </div>
      </div>
      <div className="bg-white p-3 sm:p-4">
        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          {ADDON_PRODUCTS.map((p) => (
            <AddonCard
              key={p.id}
              product={p}
              qty={getQty(p.id)}
              onQtyChange={(val) => onQtyChange(p.id, p, val)}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Limit Modal ---------------- */
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

/* ---------------- Hygiene Kit Info Modal ---------------- */
const HYGIENE_KIT_ITEMS = [
  "Gown",
  "Bedsheet",
  "Towel",
  "Tissue",
  "Bouffant Cap",
  "Mask",
  "Shoe Cover",
  "Cotton Pads",
  "Cotton Balls",
  "Gloves",
  "Facial Bend",
  "Wooden Spatula",
  "Garbage Bag",
  "Hair band",
];

function HygieneInfoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-extrabold text-base sm:text-lg text-gray-900 uppercase tracking-wide">
            Your Safety & Hygiene Is Our Priority
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full shrink-0">
            <X size={20} />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          We charge minimally to ensure your safety and hygiene remain our top priority.
        </p>

        <ul className="mt-4 space-y-2 sm:space-y-2.5">
          {HYGIENE_KIT_ITEMS.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-800">
              <Check size={14} className="text-pink-700 shrink-0" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[11px] sm:text-xs text-gray-500 mt-5">
          Note - Ensure the expert opens a new disposable kit during the service.
        </p>

        <button
          onClick={onClose}
          className="mt-5 border border-pink-700 text-pink-700 hover:bg-pink-50 font-semibold rounded-full px-6 py-2 text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------------- Accordion ---------------- */
function AccordionSection({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-t border-gray-200">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left">
        <span className="font-semibold text-gray-900 text-xs sm:text-sm">{title}</span>
        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-4 text-xs sm:text-sm text-gray-600">{children}</div>}
    </div>
  );
}

/* ---------------- Product Detail Modal ---------------- */
function ProductDetailModal({ product, qty, onQtyChange, onClose, onCheckout }) {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (name) => setOpenSection((prev) => (prev === name ? null : name));
  const increase = () => onQtyChange(Math.min(MAX_QTY_PER_ITEM, qty + 1));
  const decrease = () => onQtyChange(Math.max(0, qty - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={product.img} alt={product.title} className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-white/90 rounded-full p-1.5 hover:bg-white">
            <X size={18} />
          </button>
          <button className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 flex items-center gap-1.5 bg-pink-800 hover:bg-pink-900 text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors">
            <Share2 size={12} />
            Share & Earn
          </button>
        </div>

        <div className="p-3.5 sm:p-4 md:p-5">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">{product.title}</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{product.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-sm sm:text-lg text-gray-900">₹{product.price.toLocaleString("en-IN")}/-</div>
              <div className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}/-</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 sm:mt-4 flex-wrap gap-2 sm:gap-3">
            {product.duration && (
              <span className="flex items-center gap-1.5 bg-pink-50 text-pink-800 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                🕐 {product.duration}
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

          {product.coins && (
            <div className="flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-800">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">₹</span>
              {product.coins} Coin Cashback
            </div>
          )}

          <div className="mt-4 sm:mt-5">
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2">Service Details</h4>
            <ul className="space-y-1.5">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <Check size={13} className="text-pink-700 shrink-0" strokeWidth={3} />
                  {f} -
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            {product.brand && (
              <AccordionSection title="Brand" isOpen={openSection === "brand"} onToggle={() => toggleSection("brand")}>
                {product.brand}
              </AccordionSection>
            )}
            {product.steps && (
              <AccordionSection title="Steps" isOpen={openSection === "steps"} onToggle={() => toggleSection("steps")}>
                <ul className="space-y-1">
                  {product.steps.map((s, i) => <li key={i}>{i + 1}. {s}</li>)}
                </ul>
              </AccordionSection>
            )}
            {product.why && (
              <AccordionSection title={`Why ${product.title.split(" ").slice(0, 2).join(" ")}?`} isOpen={openSection === "why"} onToggle={() => toggleSection("why")}>
                {product.why}
              </AccordionSection>
            )}
            {product.recommendedFor && (
              <AccordionSection title="Recommended For" isOpen={openSection === "recommendedFor"} onToggle={() => toggleSection("recommendedFor")}>
                <ul className="space-y-1">
                  {product.recommendedFor.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </AccordionSection>
            )}
             {product.benefits && (
              <AccordionSection title="Benefits For" isOpen={openSection === "benefits"} onToggle={() => toggleSection("benefits")}>
                <ul className="space-y-1">
                  {product.benefits.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </AccordionSection>
            )}
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

/* ---------------- Product Card ---------------- */
function ProductCard({ product, qty, onQtyChange, onAddToCart, onViewDetails, onLimitReached }) {
  const increase = () => {
    if (qty >= MAX_QTY_PER_ITEM) {
      onLimitReached();
      return;
    }
    onQtyChange(qty + 1);
  };
  const addToCart = () => onAddToCart(product);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img src={product.img} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="p-2.5 sm:p-3 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">{product.title}</h3>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{product.subtitle}</p>

        <ul className="mt-1.5 sm:mt-2 space-y-1">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600">
              <Check size={11} className="text-pink-700 shrink-0" strokeWidth={3} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">
            Save ₹{product.save.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <button onClick={() => onViewDetails(product)} className="flex-1 border border-gray-300 rounded-full py-1.5 text-[10px] sm:text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            View Details
          </button>

          {qty === 0 ? (
            <button onClick={addToCart} className="flex-1 bg-pink-800 hover:bg-pink-900 text-white rounded-full py-1.5 text-[10px] sm:text-xs font-semibold transition-colors">
              Add To Cart
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-pink-800 text-white rounded-full px-1.5 sm:px-2 py-1">
              <button onClick={() => onQtyChange(Math.max(0, qty - 1))} className="p-1 hover:bg-pink-900 rounded-full transition-colors" aria-label="Decrease quantity">
                <Minus size={13} />
              </button>
              <span className="font-semibold text-[11px] sm:text-xs">{qty}</span>
              <button onClick={increase} className="p-1 hover:bg-pink-900 rounded-full transition-colors" aria-label="Increase quantity">
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Add Address Modal ---------------- */
function AddAddressModal({ onClose, onSave }) {
  const [flat, setFlat] = useState("");
  const [locality, setLocality] = useState("");
  const [search, setSearch] = useState("");

  const handleSave = () => {
    if (!flat.trim() || !locality.trim()) return;
    onSave({ flat, locality, search });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="font-serif text-lg sm:text-2xl text-gray-900">Add address</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Search your area, then add flat and locality so we can reach you without calls.
        </p>

        <div className="mt-4 sm:mt-5">
          <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-gray-500 mb-2">ADDRESS DETAILS</p>
          <input value={flat} onChange={(e) => setFlat(e.target.value)} placeholder="Flat / house / building no. *"
            className="w-full border border-gray-300 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-pink-700/30" />
          <input value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Locality / street / sector *"
            className="w-full border border-gray-300 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-700/30" />
        </div>

        <div className="mt-4 sm:mt-5">
          <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-gray-500 mb-2">SEARCH & SELECT ON MAP</p>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search area, landmark, or pin code"
            className="w-full border border-gray-300 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-700/30" />
        </div>

        <button onClick={handleSave} disabled={!flat.trim() || !locality.trim()}
          className="w-full mt-5 sm:mt-6 bg-pink-800 hover:bg-pink-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-colors text-sm sm:text-base">
          Save address
        </button>
      </div>
    </div>
  );
}

/* ---------------- View All Carts Modal (frontend-only switcher) ---------------- */
function AllCartsModal({ carts, activeCartId, onSwitch, onCreate, onRename, onDelete, onClose }) {
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [newCartName, setNewCartName] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);

  const startRename = (cart) => {
    setRenamingId(cart.id);
    setRenameValue(cart.name);
  };

  const confirmRename = (id) => {
    if (renameValue.trim()) onRename(id, renameValue.trim());
    setRenamingId(null);
  };

  const handleCreate = () => {
    if (!newCartName.trim()) return;
    onCreate(newCartName.trim());
    setNewCartName("");
    setShowNewInput(false);
  };

  const cartTotal = (cart) =>
    Object.values(cart.items).reduce((sum, i) => sum + i.price * i.qty, 0);

  const cartCount = (cart) =>
    Object.values(cart.items).reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-serif text-lg sm:text-2xl text-gray-900">Your carts</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">Switch, rename, or start a new cart.</p>

        <div className="space-y-2.5 sm:space-y-3">
          {carts.map((cart) => {
            const isActive = cart.id === activeCartId;
            const items = cartCount(cart);
            return (
              <div
                key={cart.id}
                className={`rounded-xl border p-3.5 sm:p-4 transition-colors ${
                  isActive ? "border-pink-700 bg-pink-50/50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => onSwitch(cart.id)}
                    className="flex items-start gap-2.5 sm:gap-3 flex-1 text-left min-w-0"
                  >
                    <div className={`p-2 rounded-full shrink-0 ${isActive ? "bg-pink-700 text-white" : "bg-gray-100 text-gray-500"}`}>
                      <ShoppingBag size={16} />
                    </div>
                    <div className="min-w-0">
                      {renamingId === cart.id ? (
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.key === "Enter" && confirmRename(cart.id)}
                          onBlur={() => confirmRename(cart.id)}
                          className="text-xs sm:text-sm font-semibold text-gray-900 border-b border-pink-600 focus:outline-none"
                        />
                      ) : (
                        <p className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                          {cart.name} {isActive && <span className="text-[10px] text-pink-700 font-normal ml-1">(active)</span>}
                        </p>
                      )}
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                        {items} item{items !== 1 ? "s" : ""} · ₹{cartTotal(cart).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startRename(cart)}
                      className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      aria-label="Rename cart"
                    >
                      <Pencil size={14} />
                    </button>
                    {carts.length > 1 && (
                      <button
                        onClick={() => onDelete(cart.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                        aria-label="Delete cart"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showNewInput ? (
          <div className="mt-4 flex gap-2">
            <input
              autoFocus
              value={newCartName}
              onChange={(e) => setNewCartName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Cart name (e.g. Wedding Prep)"
              className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-600/30"
            />
            <button
              onClick={handleCreate}
              className="bg-pink-800 hover:bg-pink-900 text-white text-xs sm:text-sm font-semibold px-4 rounded-lg transition-colors shrink-0"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewInput(true)}
            className="w-full mt-4 flex items-center justify-center gap-1.5 border border-dashed border-gray-300 text-gray-600 text-xs sm:text-sm font-semibold py-2.5 rounded-xl hover:border-pink-600 hover:text-pink-700 transition-colors"
          >
            <Plus size={15} /> Create new cart
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Slot Qty Stepper ---------------- */
function QtyDropdown({ value, onChange, max = 5 }) {
  const decrease = () => onChange(Math.max(1, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-pink-800 text-white rounded-full px-2 py-1.5">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= 1}
        className="p-1 hover:bg-pink-900 rounded-full transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Decrease hygiene kit quantity"
      >
        <Minus size={14} />
      </button>
      <span className="font-semibold text-sm w-4 text-center">{value}</span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="p-1 hover:bg-pink-900 rounded-full transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Increase hygiene kit quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

/* ---------------- Slot generator ---------------- */
const PEAK_FEE_BY_QTY = { 1: 0, 2: 100, 3: 150, 4: 200, 5: 250 };

function getPeakFee(qty) {
  return PEAK_FEE_BY_QTY[qty] ?? PEAK_FEE_BY_QTY[5];
}

function generateSlots() {
  const slots = [];
  let hour = 8;
  let minute = 0;
  const surgeSet = new Set(["08:00", "08:30", "09:00", "09:30", "06:00"]);

  const fmt = (h, m) => {
    const period = h >= 12 ? "PM" : "AM";
    let displayH = h % 12;
    if (displayH === 0) displayH = 12;
    return `${String(displayH).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
  };

  while (hour < 19) {
    const startLabel = fmt(hour, minute);
    let endHour = hour;
    let endMinute = minute + 15;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }
    const endLabel = fmt(endHour, endMinute);
    const key = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    slots.push({
      id: key,
      label: `${startLabel} - ${endLabel}`,
      isPeak: surgeSet.has(key),
    });

    minute += 15;
    if (minute >= 60) {
      minute -= 60;
      hour += 1;
    }
  }
  return slots;
}

const ALL_SLOTS = generateSlots();

/* ---------------- Cart Page (ab is file ke checkout flow se use nahi hota) ---------------- */
function CartPage({
  cart,
  carts,
  onQtyChange,
  onRemove,
  onBack,
  address,
  onOpenAddress,
  onSwitchCart,
  onCreateCart,
  onRenameCart,
  onDeleteCart,
  getQty,
  onAddonQtyChange,
  onViewDetails,
}) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAllCarts, setShowAllCarts] = useState(false);
  const [showHygieneInfo, setShowHygieneInfo] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hygieneQty, setHygieneQty] = useState(1);

  const HYGIENE_KIT_PRICE = 60;

  const items = Object.values(cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.mrp * i.qty, 0);
  const servicesTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = subtotal - servicesTotal;
  const coins = items.reduce((sum, i) => sum + (i.coins || 0) * i.qty, 0);
  const slotFee = selectedSlot && selectedSlot.isPeak ? getPeakFee(hygieneQty) : 0;
  const hygieneTotal = HYGIENE_KIT_PRICE * hygieneQty;
  const total = servicesTotal + hygieneTotal + slotFee;

  const today = new Date();
  const days = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
          <LastMinuteChoice getQty={getQty} onQtyChange={onAddonQtyChange} onViewDetails={onViewDetails} />
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center">"{cart.name}" is empty.</p>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <button onClick={onBack} className="flex items-center gap-1.5 bg-pink-800 hover:bg-pink-900 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors">
                <ChevronLeft size={16} /> Continue shopping
              </button>
              {carts.length > 1 && (
                <button onClick={() => setShowAllCarts(true)} className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-gray-50 transition-colors">
                  View all carts
                </button>
              )}
            </div>
            {showAllCarts && (
              <AllCartsModal
                carts={carts}
                activeCartId={cart.id}
                onSwitch={(id) => { onSwitchCart(id); setShowAllCarts(false); }}
                onCreate={onCreateCart}
                onRename={onRenameCart}
                onDelete={onDeleteCart}
                onClose={() => setShowAllCarts(false)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm font-semibold hover:text-pink-700">
            <ChevronLeft size={18} /> Back
          </button>
          <button
            onClick={() => setShowAllCarts(true)}
            className="flex items-center gap-1.5 border border-gray-300 rounded-full px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag size={14} /> View all carts
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 min-w-0">
            <LastMinuteChoice getQty={getQty} onQtyChange={onAddonQtyChange} onViewDetails={onViewDetails} />

            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="font-serif text-lg sm:text-2xl text-gray-900">Order summary</h2>
              <span className="text-[10px] sm:text-xs bg-pink-50 text-pink-700 font-semibold px-2 py-0.5 rounded-full">{cart.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Review services before booking your slot</p>

            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => {
                const serviceCharges = Math.round(item.price * item.qty * 0.3);
                const productCost = item.price * item.qty - serviceCharges;
                return (
                  <div key={item.productId} className="relative bg-white rounded-xl border border-pink-600/30 border-l-4 border-l-pink-700 p-3.5 sm:p-4">
                    <button
                      type="button"
                      onClick={() => onViewDetails(item)}
                      className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-pink-700 hover:bg-pink-800 text-white rounded-full p-1 transition-colors"
                      title="View details"
                      aria-label="View details"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="11" />
                        <circle cx="12" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
                      </svg>
                    </button>
                    <div className="flex gap-2.5 sm:gap-3">
                      <img src={item.img} alt={item.title} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0 pr-8">
                        <h3 className="font-bold text-gray-900 text-xs sm:text-sm">{item.title}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400">{item.subtitle}</p>
                        <p className="text-xs sm:text-sm mt-1 flex flex-wrap items-baseline gap-x-1.5">
                          <span className="font-bold text-gray-900">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{(item.mrp * item.qty).toLocaleString("en-IN")}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">· {item.duration}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 border border-gray-300 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
                        <button onClick={() => onQtyChange(item.productId, Math.max(0, item.qty - 1))} className="text-pink-700">
                          <Minus size={14} />
                        </button>
                        <span className="text-xs sm:text-sm font-semibold w-4 text-center">{item.qty}</span>
                        <button onClick={() => onQtyChange(item.productId, Math.min(MAX_QTY_PER_ITEM, item.qty + 1))} className="text-pink-700">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.productId)} className="text-red-600 text-xs sm:text-sm font-semibold hover:underline">
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 bg-gray-50 rounded-lg p-2.5 sm:p-3 flex flex-col gap-1">
                      <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                        <span>Service charges</span>
                        <span>₹{serviceCharges}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                        <span>Product cost</span>
                        <span>₹{productCost}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Safety & Hygiene Kit */}
              <div className="bg-white rounded-xl border border-pink-600/30 border-l-4 border-l-pink-700 p-3.5 sm:p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">Safety & Hygiene Kit</span>
                      <button
                        type="button"
                        onClick={() => setShowHygieneInfo(true)}
                        className="text-pink-700 hover:text-pink-900 shrink-0"
                        title="What's inside the hygiene kit"
                        aria-label="What's inside the hygiene kit"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="11" />
                          <circle cx="12" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm mt-1">
                      <span className="font-bold text-gray-900">₹{hygieneTotal.toLocaleString("en-IN")}</span>{" "}
                      <span className="text-[10px] sm:text-xs text-gray-500">(₹{HYGIENE_KIT_PRICE} × {hygieneQty})</span>
                    </p>
                  </div>
                  <QtyDropdown value={hygieneQty} onChange={setHygieneQty} />
                </div>
              </div>
            </div>

            {/* Date & time */}
            <div className="mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-gray-200">
              <div className="bg-pink-800 text-white p-4 sm:p-5">
                <h3 className="font-serif text-lg sm:text-xl">Date & time</h3>
                <p className="text-xs sm:text-sm text-pink-100 mt-0.5">Pick a day, then choose a slot</p>
              </div>
              <div className="bg-white p-3.5 sm:p-4 md:p-5">
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {days.map((d, i) => {
                    const isSelected = selectedDate === i;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedDate(i);
                          setSelectedSlot(null);
                        }}
                        className={`shrink-0 w-14 sm:w-16 rounded-xl border py-1.5 sm:py-2 flex flex-col items-center transition-colors ${
                          isSelected ? "bg-pink-800 border-pink-800 text-white" : "border-gray-200 text-gray-700 hover:border-pink-700"
                        }`}
                      >
                        <span className="text-[10px] sm:text-xs font-semibold">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span className="text-base sm:text-lg font-bold">{d.getDate()}</span>
                        <span className="text-[9px] sm:text-[10px]">{d.toLocaleDateString("en-US", { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>

                <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-4 sm:mt-5 mb-2.5 sm:mb-3">Available slots</h4>
                {selectedDate === null ? (
                  <p className="text-xs sm:text-sm text-gray-500">Select a date to see available slots.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                      {ALL_SLOTS.map((slot) => {
                        const isSelected = selectedSlot?.id === slot.id;
                        const feeForSlot = slot.isPeak ? getPeakFee(hygieneQty) : 0;
                        return (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`relative border rounded-lg py-2 sm:py-2.5 px-2 text-[11px] sm:text-xs font-semibold transition-colors ${
                              isSelected
                                ? "bg-pink-800 border-pink-800 text-white"
                                : "border-gray-200 text-gray-700 hover:border-pink-700"
                            }`}
                          >
                            {feeForSlot > 0 && (
                              <span className="absolute -top-2 -right-1.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                ₹{feeForSlot}
                              </span>
                            )}
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>
                    {selectedSlot && (
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-3">
                        Selected: <span className="font-semibold text-gray-800">{selectedSlot.label}</span>
                        {selectedSlot.isPeak && (
                          <span className="text-orange-600">
                            {" "}(peak-hour · {hygieneQty} kit{hygieneQty > 1 ? "s" : ""} → ₹{slotFee} fee)
                          </span>
                        )}
                      </p>
                    )}
                  </>
                )}
                <p className="text-[11px] sm:text-xs text-gray-400 mt-4 text-center">
                  Tip: avoid last-minute cancellation fees by picking a slot you can keep.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 lg:sticky lg:top-5">
              <h3 className="font-serif text-lg sm:text-xl text-gray-900">Price details</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 mb-4">
                Subtotal, discount, delivery, and your total before you choose a slot.
              </p>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-pink-700 font-medium">
                  <span>Discount</span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Safety & Hygiene Kit ({hygieneQty}x)</span>
                  <span>₹{hygieneTotal}</span>
                </div>
                {slotFee > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Peak-hour slot fee</span>
                    <span>₹{slotFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-gray-900 text-base sm:text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              {coins > 0 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 text-xs sm:text-sm text-gray-800">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">₹</span>
                  You will get {coins} Salontym Coins when the service is completed.
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-gray-500 mb-2">DELIVERY ADDRESS</p>
                {address ? (
                  <button onClick={() => setShowAddressModal(true)} className="w-full flex items-start justify-between gap-2 text-left">
                    <div className="flex items-start gap-2 min-w-0">
                      <MapPin size={16} className="text-pink-700 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-gray-900">Service location</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 truncate">{address.flat}, {address.locality}</p>
                      </div>
                    </div>
                    <ChevronDown size={16} className="-rotate-90 text-gray-400 mt-1 shrink-0" />
                  </button>
                ) : (
                  <button onClick={() => setShowAddressModal(true)} className="flex items-center gap-2 text-red-600 text-xs sm:text-sm font-semibold hover:underline">
                    <MapPin size={16} />
                    Select an address to continue
                  </button>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-gray-500 mb-2">DATE & TIME</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-red-600 font-semibold">
                  <Calendar size={16} className="shrink-0" />
                  <span>
                    {selectedSlot
                      ? `${days[selectedDate].toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}, ${selectedSlot.label}`
                      : "Pick date & time below"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={!address || !selectedSlot}
          className="w-full mt-5 sm:mt-6 bg-pink-800 hover:bg-pink-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl transition-colors text-sm sm:text-base"
        >
          Proceed to checkout
        </button>
      </div>

      {showAddressModal && (
        <AddAddressModal onClose={() => setShowAddressModal(false)} onSave={(addr) => { onOpenAddress(addr); setShowAddressModal(false); }} />
      )}

      {showAllCarts && (
        <AllCartsModal
          carts={carts}
          activeCartId={cart.id}
          onSwitch={(id) => { onSwitchCart(id); setShowAllCarts(false); }}
          onCreate={onCreateCart}
          onRename={onRenameCart}
          onDelete={onDeleteCart}
          onClose={() => setShowAllCarts(false)}
        />
      )}

      {showHygieneInfo && (
        <HygieneInfoModal onClose={() => setShowHygieneInfo(false)} />
      )}
    </div>
  );
}

/* ---------------- Main ---------------- */
function FacialsGrid() {
  const [page, setPage] = useState("grid"); // "grid" | "cart"
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [address, setAddress] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // FacialsGrid ke product object ko asli CartContext ke item shape mein convert karta hai
  const mapToCartItem = (product, qty) => ({
    _id: product.id,
    name: product.title,
    price: product.price,
    oldPrice: product.mrp,
    image: product.img,
    duration: product.duration,
    quantity: qty,
  });

  // Multiple carts, sab local state mai. Har cart: { id, name, items: { [productId]: {...product, qty} } }
  const [carts, setCarts] = useState([{ id: 1, name: "My Cart", items: {} }]);
  const [activeCartId, setActiveCartId] = useState(1);

  const activeCart = carts.find((c) => c.id === activeCartId);

  const getQty = (productId) => activeCart.items[productId]?.qty || 0;

  const setQty = (productId, product, value) => {
    setCarts((prev) =>
      prev.map((c) => {
        if (c.id !== activeCartId) return c;
        const newItems = { ...c.items };
        if (value <= 0) {
          delete newItems[productId];
        } else {
          newItems[productId] = { ...product, productId, qty: Math.min(MAX_QTY_PER_ITEM, value) };
        }
        return { ...c, items: newItems };
      })
    );
  };

  const handleCreateCart = (name) => {
    const id = nextCartId++;
    setCarts((prev) => [...prev, { id, name, items: {} }]);
    setActiveCartId(id);
  };

  const handleRenameCart = (id, name) => {
    setCarts((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };

  const handleDeleteCart = (id) => {
    setCarts((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (id === activeCartId && filtered.length > 0) {
        setActiveCartId(filtered[0].id);
      }
      return filtered;
    });
  };

  if (page === "cart") {
    return (
      <>
        <CartPage
          cart={activeCart}
          carts={carts}
          onQtyChange={(productId, value) => setQty(productId, activeCart.items[productId], value)}
          onRemove={(productId) => setQty(productId, null, 0)}
          onBack={() => setPage("grid")}
          address={address}
          onOpenAddress={setAddress}
          onSwitchCart={setActiveCartId}
          onCreateCart={handleCreateCart}
          onRenameCart={handleRenameCart}
          onDeleteCart={handleDeleteCart}
          getQty={getQty}
          onAddonQtyChange={(productId, product, val) => setQty(productId, product, val)}
          onViewDetails={setDetailProduct}
        />

        {detailProduct && (
          <ProductDetailModal
            product={detailProduct}
            qty={getQty(detailProduct.id)}
            onQtyChange={(val) => setQty(detailProduct.id, detailProduct, val)}
            onClose={() => setDetailProduct(null)}
            onCheckout={() => setDetailProduct(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-gray-50 py-4 sm:py-6 px-3 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2.5 sm:gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">Facials under 1299</h1>
            <div className="h-1 w-14 sm:w-16 mt-2 rounded-full bg-gradient-to-r from-pink-700 to-pink-400" />
          </div>
          <div className="text-[10px] sm:text-xs bg-white border border-gray-200 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold text-gray-700">
            Cart: {activeCart.name}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              qty={getQty(p.id)}
              onQtyChange={(val) => setQty(p.id, p, val)}
              onAddToCart={(product) => {
                addToCart(mapToCartItem(product, 1));
                setQty(product.id, product, 1);
              }}
              onViewDetails={setDetailProduct}
              onLimitReached={() => setShowLimitModal(true)}
            />
          ))}
        </div>
      </div>

      {showLimitModal && <LimitModal onClose={() => setShowLimitModal(false)} />}

      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          qty={getQty(detailProduct.id)}
          onQtyChange={(val) => setQty(detailProduct.id, detailProduct, val)}
          onClose={() => setDetailProduct(null)}
          onCheckout={() => {
            addToCart(mapToCartItem(detailProduct, getQty(detailProduct.id) || 1));
            setDetailProduct(null);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
}

export default FacialsGrid;