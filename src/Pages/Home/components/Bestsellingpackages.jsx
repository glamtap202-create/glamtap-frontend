// import React, { useState, useEffect } from "react";
// import API from "../../../api/axios";
// import {
//   Star,
//   Eye,
//   Plus,
//   Check,
//   ArrowLeft,
//   Minus,
//   ChevronDown,
//   Share2,
// } from "lucide-react";
// import PackageCard from "./PackageCard";      // 👈 ye add karo
// import DetailModal from "./DetailModal";

// function BestSellingPackages() {
//   const [packages, setPackages] = useState([]);
//   const [activePkg, setActivePkg] = useState(null);

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       const res = await API.get("/combos");
//       console.log("API Response:", res.data);  

//       if (res.data.success) {
//         setPackages(res.data.combos);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section className="w-full bg-gradient-to-br from-pink-50/40 via-white to-pink-50/40 py-10 sm:py-16 px-4">
//       <div className="max-w-5xl mx-auto text-center">
//         <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest text-pink-700 border border-pink-600/40 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
//           CURATED FAVORITES
//         </span>

//         <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight px-2">
//           Bachat Damaka most-Selling,
//           <br className="hidden sm:block" />
//           {" "}To convert Faster
//         </h2>

//         <p className="max-w-2xl mx-auto mt-3 sm:mt-5 text-stone-500 text-sm sm:text-base lg:text-lg px-2">
//           High-performing combinations with clear value, social proof, and a
//           cleaner premium presentation.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 mt-8 sm:mt-12 text-left items-stretch">
//           {packages.map((pkg) => (
//             <PackageCard
//               key={pkg._id}
//               pkg={pkg}
//               onOpen={setActivePkg}
//             />
//           ))}
//         </div>
//       </div>

//       {activePkg && (
//         <DetailModal
//           pkg={activePkg}
//           onClose={() => setActivePkg(null)}
//         />
//       )}
//     </section>
//   );
// }

// export default BestSellingPackages;


import React, { useState, useEffect, useContext } from "react";
import API from "../../../api/axios";
import { CartContext } from "../../../Context/CartContext"; // path check kar lein
import PackageCard from "./PackageCard";
import DetailModal from "./DetailModal";

function BestSellingPackages() {
  const [packages, setPackages] = useState([]);
  const [activePkg, setActivePkg] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await API.get("/combos");
      console.log("API Response:", res.data);

      if (res.data.success) {
        setPackages(res.data.combos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-pink-50/40 via-white to-pink-50/40 py-10 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest text-pink-700 border border-pink-600/40 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
          CURATED FAVORITES
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight px-2">
          Bachat Damaka most-Selling,
          <br className="hidden sm:block" />
          {" "}To convert Faster
        </h2>

        <p className="max-w-2xl mx-auto mt-3 sm:mt-5 text-stone-500 text-sm sm:text-base lg:text-lg px-2">
          High-performing combinations with clear value, social proof, and a
          cleaner premium presentation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 mt-8 sm:mt-12 text-left items-stretch">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              pkg={pkg}
              onOpen={setActivePkg}
            />
          ))}
        </div>
      </div>

      {activePkg && (
        <DetailModal
          pkg={activePkg}
          onClose={() => setActivePkg(null)}
          onAddToCart={addToCart}
        />
      )}
    </section>
  );
}

export default BestSellingPackages;
