import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import API from "../../../api/axios"; // path check kar lena
import { AuthContext } from "../../../Context/AuthContext";
import { CartContext } from "../../../Context/CartContext";
const API_BASE_URL =
  import.meta.env.VITE_API_SERVER || "https://api.glamtap.in";

function ServiceCarousel() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    cartCount,
    cartTotal,
  } = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  // Kis service ka option-selection panel khula hai (Honey/Rica/RollOn)
  const [optionPanelForId, setOptionPanelForId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setError(false);
      const res = await API.get("/categories");
      setCategories(res.data.categories || res.data || []);
    } catch (err) {
      console.log("Category Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const CATEGORY_ALIASES = {
    facial: "Facial",
    "clean up": "CleanUp",
    cleanup: "CleanUp",
    waxing: "Waxing",
    // combo: "Combo Package",
    "combo package": "Combo Package",
  };

  const getCategorySlug = (item) => {
    const raw = item.slug || item.name || item.category || item._id || item.id || "";
    return raw
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const getServiceImage = (service) => {
    const path = service.image || service.img;
    if (!path) return "/placeholder.png";
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  };

  const getServiceDescription = (service) => {
    return (
      service.description ||
      service.about ||
      service.content?.about ||
      service.content?.includes ||
      ""
    );
  };

  const getCategoryImage = (item) => {
    if (!item.image) return "/placeholder.png";
    return item.image.startsWith("http")
      ? item.image
      : `${API_BASE_URL}${item.image}`;
  };

  const fetchServicesByCategory = async (category) => {
    const aliasKey = category.name?.toString().toLowerCase().trim();

    const categorySlug = getCategorySlug(category);
    const namesToTry = [category.name || category.title || category.category];

    if (aliasKey && CATEGORY_ALIASES[aliasKey]) {
      namesToTry.push(CATEGORY_ALIASES[aliasKey]);
    }

    try {
      const res = await API.get(`/services/category/${encodeURIComponent(categorySlug)}`);
      const servicesFromSlug = res.data.services || res.data || [];
      if (servicesFromSlug.length > 0) return servicesFromSlug;
    } catch (error) {
      console.warn("Category slug fetch failed, trying filter fallback", error);
    }

    for (const name of namesToTry.filter(Boolean)) {
      try {
        const res = await API.get(`/services/filter?category=${encodeURIComponent(name)}`);
        const servicesFromFilter = res.data.services || res.data || [];
        if (servicesFromFilter.length > 0) return servicesFromFilter;
      } catch (error) {
        console.warn("Category filter fallback failed for", name, error);
      }
    }

    return [];
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setIsSheetOpen(true);
    setLoadingServices(true);
    setOptionPanelForId(null);

    try {
      const fetchedServices = await fetchServicesByCategory(category);
      setServices(fetchedServices);
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  // Ek hi jagah se cart mein add karta hai (price sahi se compute karke)
  // waxType field CartContext/Cart.jsx ke saath consistent rakha hai taaki
  // quantity grouping aur +/- controls sahi variant pe kaam karein
  const addServiceToCart = (service, optionKey) => {
    const hasOptions = service.options && service.prices;
    const price = hasOptions ? service.prices[optionKey]?.price : service.price;

    addToCart({
      ...service,
      price,
      waxType: hasOptions ? optionKey : null,
    });

    setOptionPanelForId(null);
  };

  // "Add" button click
  const handleAddClick = (service) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    const hasOptions = service.options && service.prices;

    if (hasOptions) {
      setOptionPanelForId((prev) => (prev === service._id ? null : service._id));
      return;
    }

    addServiceToCart(service);
  };

  const handleOptionSelect = (service, optionKey) => {
    addServiceToCart(service, optionKey);
  };

  const renderServicePrice = (service) => {
    if (service.options && service.prices) {
      return (
        <div className="space-y-1">
          {Object.entries(service.prices)
            .filter(([, value]) => value && value.price != null)
            .map(([key, value]) => (
              <div key={key} className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{key}:</span> ₹{value.price}
                {value.oldPrice ? <span className="line-through ml-2 text-gray-400">₹{value.oldPrice}</span> : null}
              </div>
            ))}
        </div>
      );
    }

    return <span className="text-pink-600 font-bold text-base sm:text-lg mt-2 block">₹{service.price}</span>;
  };

  return (
    <>
      <section className="py-8 bg-[#fdfbf7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Categories</h2>
          </div>
          {loading ? (
            <p className="text-center text-sm text-gray-400">Loading categories...</p>
          ) : error ? (
            <p className="text-center text-sm text-red-400">
              Failed to load categories.{" "}
              <button onClick={fetchCategories} className="underline text-pink-600">
                Retry
              </button>
            </p>
          ) : categories.length === 0 ? (
            <p className="text-center text-sm text-gray-400">No categories found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-5 gap-5">
              {categories.map((item, idx) => (
                <div
                  key={item._id || item.slug || idx}
                  onClick={() => handleCategoryClick(item)}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-center">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
                      <img
                        src={getCategoryImage(item)}
                        alt={item.name || "Category"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.png";
                        }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <h3 className="mt-2 text-center text-sm sm:text-base font-medium text-gray-700 group-hover:text-pink-600 transition">
                    {item.name}
                  </h3>
                </div>
              ))}

              {/* Hydra Facial card */}
              <div className="group cursor-pointer">
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
                    <img
                      src="/images/hydrafacial.jpg"
                      alt="Hydra Facial"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="mt-2 text-center text-sm sm:text-base font-medium text-gray-700 group-hover:text-pink-600 transition">
                  Hydra Facial
                </h3>
              </div>
            </div>
          )}
        </div>
      </section>

      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm">
          <div className="flex-1" onClick={() => setIsSheetOpen(false)} />

          <div className="bg-white rounded-t-3xl max-h-[85vh] h-full flex flex-col w-full max-w-3xl mx-auto overflow-hidden shadow-2xl transition-transform duration-300 translate-y-0">
            <div className="p-4 sm:p-5 border-b flex justify-between items-center bg-pink-100/50">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {selectedCategory?.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">Select services to add to your order</p>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {loadingServices ? (
                <p className="text-center py-12 text-gray-400 font-medium">Fetching services...</p>
              ) : services.length === 0 ? (
                <p className="text-center py-12 text-gray-400">
                  No services found for this category.
                </p>
              ) : (
                services.map((service) => {
                  const hasOptions = service.options && service.prices;
                  const isOptionPanelOpen = optionPanelForId === service._id;

                  // Is service ke jitne bhi variants (Honey/Rica/RollOn ya simple) cart mein hain
                  const cartMatches = cart.filter((item) => item._id === service._id);
                  const simpleMatch = !hasOptions ? cartMatches[0] : null;

                  return (
                    <div
                      key={service._id || service.id}
                      className="flex flex-col gap-3 bg-gray-50 hover:bg-pink-50/30 p-4 rounded-2xl border border-gray-100 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                          <img
                            src={getServiceImage(service)}
                            alt={service.name || service.title || "Unnamed Service"}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.png";
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 sm:text-lg truncate">{service.name || service.title || "Unnamed Service"}</h4>
                          {service.category && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Category: {service.category}</p>
                          )}
                          {service.duration && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Duration: {service.duration}</p>
                          )}
                          {getServiceDescription(service) ? (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{getServiceDescription(service)}</p>
                          ) : null}
                          <div className="mt-2">{renderServicePrice(service)}</div>
                          {(service.rating || service.totalReviews) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {service.rating ? `Rating: ${service.rating}` : ""}
                              {service.totalReviews ? ` • ${service.totalReviews} reviews` : ""}
                            </p>
                          )}
                        </div>

                        {/* Right side control: Add button / qty stepper / options-add button */}
                        <div className="flex-shrink-0">
                          {!hasOptions && simpleMatch ? (
                            <div className="flex items-center border border-pink-200 rounded-xl">
                              <button
                                onClick={() => decreaseQuantity(service._id, null)}
                                className="px-3 py-2 text-pink-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 text-sm font-semibold">{simpleMatch.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(service._id, null)}
                                className="px-3 py-2 text-pink-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : !isOptionPanelOpen ? (
                            <button
                              onClick={() => handleAddClick(service)}
                              className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow"
                            >
                              <Plus size={16} /> Add
                            </button>
                          ) : null}
                        </div>
                      </div>

                      {/* Options wali service: jo variants pehle se cart mein hain, unke apne +/- controls */}
                      {hasOptions && cartMatches.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-xl p-3 space-y-2">
                          {cartMatches.map((variant) => (
                            <div
                              key={variant.waxType || "default"}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-700">
                                <span className="font-semibold">{variant.waxType}</span> — ₹{variant.price}
                              </span>
                              <div className="flex items-center border border-pink-200 rounded-xl">
                                <button
                                  onClick={() => decreaseQuantity(service._id, variant.waxType)}
                                  className="px-2.5 py-1.5 text-pink-600"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="px-3 font-semibold">{variant.quantity}</span>
                                <button
                                  onClick={() => increaseQuantity(service._id, variant.waxType)}
                                  className="px-2.5 py-1.5 text-pink-600"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => setOptionPanelForId(service._id)}
                            className="text-xs text-pink-600 underline"
                          >
                            + Add another option
                          </button>
                        </div>
                      )}

                      {/* Options choose karne ka panel */}
                      {isOptionPanelOpen && hasOptions && (
                        <div className="bg-white border border-pink-200 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium text-sm">
                              Choose an option to add to cart
                            </span>
                            <button
                              onClick={() => setOptionPanelForId(null)}
                              className="text-xs text-gray-500 underline"
                            >
                              Close
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(service.prices)
                              .filter(([, value]) => value && value.price != null)
                              .map(([key, value]) => (
                                <button
                                  key={key}
                                  onClick={() => handleOptionSelect(service, key)}
                                  className="flex flex-col items-start border border-gray-300 hover:border-pink-500 rounded-xl px-3 py-2 text-sm transition text-left"
                                >
                                  <span className="font-semibold text-gray-800">{key}</span>
                                  <span className="text-pink-600 font-bold">
                                    ₹{value.price}{" "}
                                    {value.oldPrice ? (
                                      <span className="line-through text-gray-400 font-normal ml-1">
                                        ₹{value.oldPrice}
                                      </span>
                                    ) : null}
                                  </span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order Summary</p>
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        {cartCount} {cartCount === 1 ? "Item" : "Items"} in Cart
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-xl sm:text-2xl font-bold text-pink-600">₹{cartTotal}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsSheetOpen(false);
                    navigate("/cart");
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 sm:py-3.5 rounded-2xl font-bold text-base sm:text-lg transition shadow-lg active:scale-[0.99]"
                >
                  View Cart & Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceCarousel;
