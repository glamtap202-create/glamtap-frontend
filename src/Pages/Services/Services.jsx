import { useState, useContext, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ServiceCarousel from "../Home/components/ServiceCarousel";
import { ShieldCheck, BadgeCheck, Package } from "lucide-react";
import { CartContext } from "../../Context/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ServiceDetailModal from "./ServiceDetailModal";

function Services() {
  const { addToCart, cart } = useContext(CartContext);
  const { category } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showSort, setShowSort] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [optionsOpenId, setOptionsOpenId] = useState(null);

  // TODO: agar app mein AuthContext hai to isko us context ke isLoggedIn/user
  // se replace kar dena — abhi localStorage token check kar rahe hain
  const isLoggedIn = () => !!localStorage.getItem("token");

  // Category name/slug ko bahut lenient tarah se normalize karta hai —
  // spaces, hyphens, "&" aur case sab ignore ho jaate hain, taaki
  // "Clean Up", "clean-up", "clean up", "CleanUp" sab ek jaise match ho
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

      // Attempt 1: category slug se seedha fetch (jaise "clean-up")
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

      // Attempt 2: normalized (space-separated) category se filter query
      const res = await API.get(`/services/filter?category=${encodeURIComponent(normalizedCategory)}`);
      const servicesByFilter = res.data.services || res.data || [];
      if (servicesByFilter.length > 0) {
        setServices(servicesByFilter);
        return;
      }

      // Attempt 3 (fallback): agar upar dono attempts 0 results dein
      // (jaise category naming backend ke DB mein thoda alag ho —
      // spacing/case/hyphen ka mismatch), to saare services fetch
      // karke client-side lenient matching se filter karo. Ye sirf
      // tabhi chalta hai jab attempt 1 aur 2 dono fail ho chuke hon,
      // isliye already-working categories iske paas pahunchte hi nahi
      // aur unka behavior bilkul same rehta hai.
      try {
        const allRes = await API.get("/services");
        const allServices = allRes.data.services || allRes.data || [];
        const targetKey = normalizeCategory(normalizedCategory);
        const clientFiltered = allServices.filter((s) => {
          const serviceCategory = s.category || s.categoryName || "";
          return normalizeCategory(serviceCategory) === targetKey;
        });
        setServices(clientFiltered);
      } catch (fallbackErr) {
        console.warn("Client-side category fallback failed", fallbackErr);
        setServices(servicesByFilter);
      }
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

  // Core add-to-cart logic, event-independent taaki modal se bhi
  // (jahan click event nahi hota) isko reuse kiya ja sake.
  //
  // overrideOption (optional): { name, price, oldPrice } — jab user modal ke
  // option-panel se ek specific option (Honey/Rica/RollOn) choose karta hai,
  // to uski exact price/name yahan use hoti hai. Jab overrideOption nahi diya
  // jata (sabhi purane/simple-service calls), behavior bilkul pehle jaisa hi
  // rehta hai — getPricing() se hi price aati hai.
  const addServiceToCart = (service, overrideOption = null) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (!addToCart) {
      console.error("addToCart missing — CartProvider not wrapping the app?");
      alert("Cart is not working right now. Please refresh the page.");
      return;
    }

    const { price, oldPrice } = overrideOption
      ? { price: overrideOption.price, oldPrice: overrideOption.oldPrice }
      : getPricing(service);

    addToCart({
      _id: service._id || service.id,
      name: service.name,
      image: service.image || service.img,
      duration: service.duration,
      price,
      oldPrice,
      quantity: 1,
      waxType: overrideOption ? overrideOption.name : null,
    });
  };

  const handleAddToCart = (e, service) => {
    e.stopPropagation();
    addServiceToCart(service);
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#f8f5ef] min-h-screen py-6 sm:py-8 relative">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                    }}
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
                        e.stopPropagation();
                        if (service.options) {
                          const cardId = service._id || service.id;
                          setOptionsOpenId(optionsOpenId === cardId ? null : cardId);
                        } else {
                          handleAddToCart(e, service);
                        }
                      }}
                      className="mt-3 w-full h-10 rounded-lg border border-pink-500 text-pink-600 font-medium"
                    >
                      {service.options ? "Choose Options" : "Add to Cart"}
                    </button>

                    {/* Inline option panel — only for option-based services, only when opened for this card */}
                    {service.options &&
                      optionsOpenId === (service._id || service.id) && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 border border-stone-200 rounded-lg p-2"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-xs font-medium text-stone-700">
                              Choose an option to add to cart
                            </p>
                            <button
                              type="button"
                              onClick={() => setOptionsOpenId(null)}
                              className="text-xs text-stone-500 underline"
                            >
                              Close
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {Object.keys(service.prices || {}).map((wax) => {
                              const p = service.prices[wax] || {};
                              return (
                                <button
                                  key={wax}
                                  type="button"
                                  onClick={() => {
                                    addServiceToCart(service, {
                                      name: wax,
                                      price: p.price,
                                      oldPrice: p.oldPrice,
                                    });
                                    setOptionsOpenId(null);
                                  }}
                                  className="flex-1 min-w-[70px] text-left px-2 py-1.5 rounded-lg border border-stone-200 hover:border-pink-600 hover:bg-pink-50 text-xs transition-colors"
                                >
                                  <div className="font-medium text-stone-800">
                                    {wax === "RollOn" ? "Roll On" : wax}
                                  </div>
                                  <div className="flex items-baseline gap-1 mt-0.5">
                                    <span className="text-pink-600 font-semibold">
                                      ₹{p.price}
                                    </span>
                                    {p.oldPrice ? (
                                      <span className="text-stone-400 line-through text-[10px]">
                                        ₹{p.oldPrice}
                                      </span>
                                    ) : null}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
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

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onAddToCart={(svc, option) => addServiceToCart(svc, option)}
        />
      )}

      <Footer />
    </>
  );
}

export default Services;