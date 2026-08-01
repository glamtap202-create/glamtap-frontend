import React from "react";
import { Star, Eye, Plus } from "lucide-react";

function PackageCard({ pkg, onOpen }) {
  const discount =
    pkg.oldPrice && pkg.price
      ? Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100)
      : 0;

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      {/* image ab clickable hai — click karne se detail modal khulega */}
      <div className="relative cursor-pointer" onClick={() => onOpen(pkg)}>
        <img
          src={pkg.img}
          alt={pkg.name}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-serif text-lg text-stone-900 cursor-pointer"
          onClick={() => onOpen(pkg)}
        >
          {pkg.name}
        </h3>
        {pkg.tags && (
          <p className="text-xs text-stone-500 mt-0.5">{pkg.tags}</p>
        )}

        <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
          {pkg.rating && (
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {pkg.rating} ({pkg.reviews || 0})
            </span>
          )}
          {pkg.views && (
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {pkg.views}
            </span>
          )}
        </div>

        {pkg.items?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {pkg.items.slice(0, 3).map((item, i) => (
              <li key={i} className="text-xs text-stone-600 flex gap-1.5">
                <span className="text-pink-600">✓</span> {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-stone-900">
              ₹{pkg.price}
            </span>
            {pkg.oldPrice && (
              <span className="text-xs text-stone-400 line-through ml-2">
                ₹{pkg.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onOpen(pkg)}
            className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={14} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;