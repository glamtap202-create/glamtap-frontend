import { useState, useContext, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ServiceCarousel from "../Home/components/ServiceCarousel";
import { ShieldCheck, BadgeCheck, Package } from "lucide-react";
import { CartContext } from "../../Context/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Services() {
  const { addToCart, cart } = useContext(CartContext);
  const { category } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showSort, setShowSort] = useState(false);
  const [toast, setToast] = useState(null);

  const normalizeCategory = (value = "") =>
    value
      .trim()
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/[^a-z0-9]/g, "");

  const getPricing = (service) => {
    if (service.options && service.prices) {
      const firstKey = Object.keys(service.prices)[0];
      const priceObj = service.prices[firstKey] || {};
      return {
        price: priceObj.price ?? 0,
        oldPrice: priceObj.oldPrice ?? 0,
      };
    }
    return {
      price: service.price ?? 0,
      oldPrice: service.oldPrice ?? 0,
    };
  };

  const fetchServices = async () => {
    setLoadingServices(true);
    setApiError(null);

    try {
      if (!category) {
        const res = await API.get("/services");
        setServices(res.data.services || res.data || []);
        return;
      }

      const normalizedCategory = category.replace(/-/g, " ").toLowerCase().trim();
      if (normalizedCategory.includes("combo")) {
        const res = await API.get("/combos");
        setServices(res.data.combos || res.data || []);
        return;
      }

      try {
        const res = await API.get(`/services/category/${encodeURIComponent(category)}`);
        const servicesBySlug = res.data.services || res.data || [];
        if (servicesBySlug.length > 0) {
          setServices(servicesBySlug);
          return;
        }
      } catch (err) {
        console.warn("Service category slug fetch failed", err);
      }

      const res = await API.get(`/services/filter?category=${encodeURIComponent(normalizedCategory)}`);
      setServices(res.data.services || res.data || []);
    } catch (err) {
      console.error("Error fetching services", err);
      setApiError(err.response?.data?.message || err.message || "Unable to load services");
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [category]);

  const getDiscountPercent = (service) => {
    if (service.options) {
      const { price, oldPrice } = getPricing(service);
      if (!oldPrice) return 0;
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return service.discount ?? 0;
  };

  const filteredServices = useMemo(() => {
    const list = [...services];

    if (sortBy === "priceLowHigh") {
      list.sort((a, b) => getPricing(a).price - getPricing(b).price);
    } else if (sortBy === "priceHighLow") {
      list.sort((a, b) => getPricing(b).price - getPricing(a).price);
    }

    return list;
  }, [services, sortBy]);

  const handleAddToCart = (e, service) => {
    e.stopPropagation();

    if (!addToCart) {
      console.error("addToCart missing — CartProvider not wrapping the app?");
      alert("Cart is not working right now. Please refresh the page.");
      return;
    }

    const { price, oldPrice } = getPricing(service);

    addToCart({
      _id: service._id || service.id,
      name: service.name,
      image: service.image || service.img,
      duration: service.duration,
      price,
      oldPrice,
      quantity: 1,
      waxType: null,
    });

    setToast({
      name: service.name,
      image: service.image,
      duration: service.duration,
    });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#f8f5ef] min-h-screen py-6 sm:py-8 relative">
        {toast && (
          <div className="fixed top-24 right-6 z-50 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                ✓ Item added to your cart
              </span>
              <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img src={toast.image} alt={toast.name} className="w-14 h-14 rounded-md object-cover" />
              <div>
                <p className="text-[11px] uppercase text-gray-500">{toast.duration}</p>
                <p className="text-sm font-semibold">{toast.name}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="w-full border border-pink-500 text-pink-600 font-medium rounded-lg py-2 mb-1"
            >
              View cart ({cart?.length ?? 0})
            </button>

            <button
              onClick={() => setToast(null)}
              className="w-full text-sm text-gray-600 underline"
            >
              Continue shopping
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ServiceCarousel />

          <div className="text-center mt-8 mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold capitalize">
              {category
                ? `${category.replace(/-/g, " ")} Services`
                : "All Beauty Services"}
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Professional salon services at your home
            </p>
          </div>

          <div className="flex items-center justify-between mb-6 relative">
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
              >
                Filter: Price
                <span className="text-xs">▾</span>
              </button>

              {showSort && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10 min-w-[160px]">
                  <button
                    onClick={() => {
                      setSortBy("priceLowHigh");
                      setShowSort(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "priceLowHigh" ? "text-pink-600 font-medium" : ""
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("priceHighLow");
                      setShowSort(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "priceHighLow" ? "text-pink-600 font-medium" : ""
                    }`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("featured");
                      setShowSort(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "featured" ? "text-pink-600 font-medium" : ""
                    }`}
                  >
                    Featured
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1.5 bg-white text-sm outline-none"
              >
                <option value="featured">Featured</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
              <span className="hidden sm:inline text-gray-500">
                {filteredServices.length} products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {filteredServices.map((service) => {
              const { price, oldPrice } = getPricing(service);
              const discount = getDiscountPercent(service);

              return (
                <div
                  key={service.id}
                  onClick={() => navigate(`/service/${service._id || service.id}`)}
                  className="w-full max-w-[250px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover"
                  />

                  <div className="p-2 flex flex-col flex-1">
                    <h2 className="text-[15px] font-semibold leading-5 h-10 overflow-hidden">
                      {service.name}
                    </h2>

                    <p className="text-[11px] uppercase text-gray-500 mt-1">
                      {service.duration}
                    </p>

                    <p className="text-[13px] text-gray-700 mt-1 h-10 overflow-hidden">
                      {service.description || "\u00A0"}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="line-through text-gray-500 text-sm">
                        ₹{oldPrice}
                      </span>

                      <span className="text-lg font-bold">₹{price}</span>

                      <span className="text-pink-600 text-sm font-medium">
                        {discount}% OFF
                      </span>
                    </div>

                    <p className="text-xs text-blue-600 mt-1">
                      {service.booked} women booked
                    </p>

                    <button
                      onClick={(e) => {
                        if (service.options) {
                          e.stopPropagation();
                          navigate(`/service/${service._id || service.id}`);
                        } else {
                          handleAddToCart(e, service);
                        }
                      }}
                      className="mt-3 w-full h-10 rounded-lg border border-pink-500 text-pink-600 font-medium"
                    >
                      {service.options ? "Choose Options" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                No Services Found
              </h2>

              <p className="text-gray-500 mt-3 text-sm sm:text-base">
                Please select another category.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Services;