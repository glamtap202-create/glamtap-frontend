// import React from "react";
// import { X, Star, Eye } from "lucide-react";

// function DetailModal({ pkg, onClose }) {
//   if (!pkg) return null;

//   const renderList = (title, list) =>
//     list?.length > 0 && (
//       <div className="mt-4">
//         <h4 className="text-sm font-semibold text-stone-800">{title}</h4>
//         <ul className="mt-1.5 space-y-1">
//           {list.map((item, i) => (
//             <li key={i} className="text-sm text-stone-600 flex gap-1.5">
//               <span className="text-pink-600">•</span> {item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           <img
//             src={pkg.img}
//             alt={pkg.name}
//             className="w-full h-56 object-cover rounded-t-2xl"
//           />
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="p-5">
//           <h2 className="font-serif text-2xl text-stone-900">{pkg.name}</h2>

//           <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
//             {pkg.rating && (
//               <span className="flex items-center gap-1">
//                 <Star size={14} className="fill-yellow-400 text-yellow-400" />
//                 {pkg.rating} ({pkg.reviews || 0} reviews)
//               </span>
//             )}
//             {pkg.views && (
//               <span className="flex items-center gap-1">
//                 <Eye size={14} />
//                 {pkg.views} views
//               </span>
//             )}
//           </div>

//           <div className="mt-4 flex items-center gap-3">
//             <span className="text-2xl font-semibold text-stone-900">
//               ₹{pkg.price}
//             </span>
//             {pkg.oldPrice && (
//               <span className="text-base text-stone-400 line-through">
//                 ₹{pkg.oldPrice}
//               </span>
//             )}
//           </div>

//           {renderList("What's Included", pkg.items)}
//           {renderList("Why It's Important", pkg.whyImportant)}
//           {renderList("Recommended For", pkg.recommendedFor)}
//           {renderList("Benefits", pkg.benefits)}
//           {renderList("Salontym Suggestion", pkg.salontymSuggestion)}
//           {renderList("Yours To Take", pkg.yoursToTake)}
//           {renderList("Why Salontym", pkg.whySalontym)}
//           {renderList("Note", pkg.note)}
//           {renderList("Important", pkg.formalWarning)}

//           <button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DetailModal;


import React from "react";
import { X, Star, Eye } from "lucide-react";

function DetailModal({ pkg, onClose, onAddToCart }) {
  if (!pkg) return null;

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
            src={pkg.img}
            alt={pkg.name}
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
          <h2 className="font-serif text-2xl text-stone-900">{pkg.name}</h2>

          <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
            {pkg.rating && (
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {pkg.rating} ({pkg.reviews || 0} reviews)
              </span>
            )}
            {pkg.views && (
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {pkg.views} views
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold text-stone-900">
              ₹{pkg.price}
            </span>
            {pkg.oldPrice && (
              <span className="text-base text-stone-400 line-through">
                ₹{pkg.oldPrice}
              </span>
            )}
          </div>

          {renderList("What's Included", pkg.items)}
          {renderList("Why It's Important", pkg.whyImportant)}
          {renderList("Recommended For", pkg.recommendedFor)}
          {renderList("Benefits", pkg.benefits)}
          {renderList("Salontym Suggestion", pkg.salontymSuggestion)}
          {renderList("Yours To Take", pkg.yoursToTake)}
          {renderList("Why Salontym", pkg.whySalontym)}
          {renderList("Note", pkg.note)}
          {renderList("Important", pkg.formalWarning)}

          <button
            onClick={() => {
              onAddToCart(pkg);
              onClose();
            }}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;