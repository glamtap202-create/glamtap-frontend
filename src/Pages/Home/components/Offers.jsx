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