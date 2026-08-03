import { useEffect, useState } from "react";
import API from "../../../api/axios";

function Offers() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await API.get("/brands");

      console.log("Brands:", res.data);

      if (res.data.brands) {
        setBrands(res.data.brands);
      } else {
        setBrands(res.data);
      }

    } catch (error) {
      console.log("Brand error:", error);
    }
  };

  // Agar backend URL se image load na ho (404), to filename nikal ke
  // frontend ke apne public/images/ folder se try karo.
  // Ye sirf broken images ko fix karega — jo already sahi load ho rahi
  // hain unpe ye function trigger hi nahi hoga.
  const handleImgError = (e, brand) => {
    const alreadyTriedFallback = e.target.dataset.fallbackTried;
    if (alreadyTriedFallback) {
      // fallback bhi fail ho gaya, ab kuch aur mat karo (infinite loop se bachne ke liye)
      return;
    }

    const rawPath = brand.logo || "";
    // path ke aakhri hisse se sirf filename nikal lo
    const filename = rawPath.split("/").pop();

    if (filename) {
      e.target.dataset.fallbackTried = "true";
      e.target.src = `/images/${filename}`;
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-black mb-3">
          Best Brands We Use
        </h2>

        <p className="text-xl italic text-gray-600 mb-10">
          We use best Brands in 1-Time use packs
        </p>


        <div className="overflow-hidden">

          <div className="flex w-max animate-marquee">

            {[...brands, ...brands].map((brand,index)=>(

              <div
                key={index}
                className="w-80 h-40 bg-white border border-pink-200 flex items-center justify-center shrink-0 hover:bg-pink-50 transition-all duration-300"
              >

               <img
  src={
    brand.logo?.startsWith("http")
    ? brand.logo
    : `${import.meta.env.VITE_API_URL}${brand.logo}`
  }
  alt={brand.name}
  onError={(e) => handleImgError(e, brand)}
  className="w-60 h-28 object-contain transition-transform duration-300 hover:scale-110"
/>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Offers;