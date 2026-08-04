import React, { useState } from "react";
import { X, Star, Eye } from "lucide-react";

function ServiceDetailModal({ service, onClose, onAddToCart }) {
  const hasOptions =
    Array.isArray(service?.options) && service.options.length > 0 && !!service?.prices;

  // Build a clean list of { name, price, oldPrice } from service.options (names)
  // + service.prices (name -> {price, oldPrice}) — matches the real data shape.
  const optionList = hasOptions
    ? service.options.map((name) => {
        const p = service.prices?.[name] || {};
        return { name, price: p.price ?? 0, oldPrice: p.oldPrice ?? 0 };
      })
    : [];

  // Panel is closed by default — nothing extra shows until the user clicks Add to Cart
  const [showOptions, setShowOptions] = useState(false);

  if (!service) return null;

  const renderList = (title, list) =>
    list?.length > 0 && (
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-stone-800">{title}</h4>
        <ul className="mt-1.5 space-y-1">
          {list.map((item, i) => (
            <li key={i} className="text-sm text-stone-600 flex gap-1.5">
              <span className="text-pink-600">•</span> {item}
            </li>
          ))}
        </ul>
      </div>
    );

  const addOption = (opt) => {
    // Pass the service AND the chosen option separately — parent decides pricing.
    onAddToCart(service, { name: opt.name, price: opt.price, oldPrice: opt.oldPrice });
    onClose();
  };

  const handleAddToCartClick = () => {
    if (hasOptions) {
      // Open the option panel instead of adding directly — unchanged for simple services
      setShowOptions(true);
      return;
    }
    onAddToCart(service);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={service.image || service.img}
            alt={service.name}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <h2 className="font-serif text-2xl text-stone-900">{service.name}</h2>

          <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
            {service.rating && (
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {service.rating} ({service.reviews || 0} reviews)
              </span>
            )}
            {service.views && (
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {service.views} views
              </span>
            )}
          </div>

          {service.duration && (
            <p className="text-sm text-stone-500 mt-1 uppercase">{service.duration}</p>
          )}

          {/* Simple services: price shown exactly as before, nothing changed */}
          {!hasOptions && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-stone-900">
                ₹{service.price}
              </span>
              {service.oldPrice && (
                <span className="text-base text-stone-400 line-through">
                  ₹{service.oldPrice}
                </span>
              )}
            </div>
          )}

          {service.description && (
            <p className="text-sm text-stone-600 mt-3">{service.description}</p>
          )}

          {renderList("What's Included", service.items)}
          {renderList("Why It's Important", service.whyImportant)}
          {renderList("Recommended For", service.recommendedFor)}
          {renderList("Benefits", service.benefits)}
          {renderList("Salontym Suggestion", service.salontymSuggestion)}
          {renderList("Yours To Take", service.yoursToTake)}
          {renderList("Why Salontym", service.whySalontym)}
          {renderList("Note", service.note)}
          {renderList("Important", service.formalWarning)}

          {/* Option panel/container — hidden until "Add to Cart" is clicked, only for option-based services */}
          {hasOptions && showOptions && (
            <div className="mt-4 border border-stone-200 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-stone-800">
                  Choose an option to add to cart
                </p>
                <button
                  type="button"
                  onClick={() => setShowOptions(false)}
                  className="text-xs text-stone-500 underline"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {optionList.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => addOption(opt)}
                    className="flex-1 min-w-[90px] text-left px-3 py-2.5 rounded-xl border border-stone-200 hover:border-pink-600 hover:bg-pink-50 text-sm transition-colors"
                  >
                    <div className="font-medium text-stone-800">{opt.name}</div>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-pink-600 font-semibold">
                        ₹{opt.price}
                      </span>
                      {opt.oldPrice ? (
                        <span className="text-stone-400 line-through text-xs">
                          ₹{opt.oldPrice}
                        </span>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCartClick}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailModal;