import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import API from "../../../api/axios"; // path check kar lena
import { CartContext } from "../../../Context/CartContext"; // path check kar lena

const API_BASE_URL = "http://localhost:5000";

function ServiceCarousel() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  // NEW: jis service ka option-panel (Honey/Rica/RollOn) khula hua hai,
  // uski id yahan store hoti hai. Baaki kuch nahi badla.
  const [selectingServiceId, setSelectingServiceId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Back se home pe aane par jo category open thi wahi sheet dobara khol do
  useEffect(() => {
    if (location.state?.openCategory) {
      handleCategoryClick(location.state.openCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

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
    combo: "Combo Package",
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

  // FIX: images uploaded in the frontend's own /public folder should NOT be
  // prefixed with the backend API_BASE_URL (that only works on localhost).
  const getServiceImage = (service) => {
    const path = service.image || service.img;
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    return path;
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

  // FIX: same reasoning as getServiceImage above.
  const getCategoryImage = (item) => {
    if (!item.image) return "/placeholder.png";
    if (item.image.startsWith("http")) return item.image;
    return item.image;
  };

  // FIX: Combo Package services live in the SAME "services" collection as
  // Waxing, Facial, CleanUp, etc (with category: "Combo Package") — not in
  // a separate /combos endpoint. The special-case branch that called
  // /combos has been removed. Combo Package now flows through the exact
  // same category-filter logic as every other category below.
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
    setSelectingServiceId(null);

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

  // "Add" click pe pehle login check karo — login hai to hi cart mein add ho
  const handleAddToCart = (service, optionKey, optionValue) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add services to your cart");
      navigate("/signin", {
        state: {
          from: location.pathname,
          checkoutState: { openCategory: selectedCategory },
        },
      });
      return;
    }

    // NEW: agar service ke multiple options hain (Honey/Rica/RollOn), to
    // jo option choose hua uska price/oldPrice aur waxType cart item mein
    // save karo. Options na hone par pehle jaisa hi normal add hoga.
    if (optionKey && optionValue) {
      addToCart({
        ...service,
        waxType: optionKey,
        price: optionValue.price,
        oldPrice: optionValue.oldPrice,
        quantity: 1,
      });
      setSelectingServiceId(null);
      return;
    }

    addToCart({ ...service, quantity: 1 });
  };

  // NEW: "Add" button click hone par — agar service ke options hain to
  // seedha add karne ke bajaye pehle option-panel khol do.
  const handleAddClick = (service) => {
    if (service.options && service.prices) {
      setSelectingServiceId(service._id || service.id);
      return;
    }
    handleAddToCart(service);
  };

  const handleQuantity = (serviceId, type) => {
    if (type === "inc") {
      increaseQuantity(serviceId);
    } else {
      decreaseQuantity(serviceId);
    }
  };

  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return "";
    return mediaPath.startsWith("http") ? mediaPath : `${API_BASE_URL}${mediaPath}`;
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

  // NEW: options wale service ke liye inline "Choose an option to add to
  // cart" panel — jaisa screenshot mein tha. Baaki design ko touch nahi kiya.
  const renderOptionPanel = (service) => {
    if (!service.options || !service.prices) return null;

    const serviceId = service._id || service.id;
    if (selectingServiceId !== serviceId) return null;

    const options = Object.entries(service.prices).filter(
      ([, value]) => value && value.price != null
    );

    return (
      <div className="mt-3 border rounded-xl p-3 sm:p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-gray-700">Choose an option to add to cart</p>
          <button
            onClick={() => setSelectingServiceId(null)}
            className="text-xs sm:text-sm text-gray-500 underline"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {options.map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAddToCart(service, key, value)}
              className="border rounded-xl bg-white hover:bg-pink-50 px-3 py-2 text-left transition"
            >
              <p className="text-sm font-semibold text-gray-800">{key}</p>
              <p className="text-sm">
                <span className="text-pink-600 font-bold">₹{value.price}</span>
                {value.oldPrice ? (
                  <span className="line-through text-gray-400 ml-1">₹{value.oldPrice}</span>
                ) : null}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Checkout: current sheet state history mein save karo, phir cart page pe jao
  const handleCheckout = () => {
    navigate(location.pathname, {
      replace: true,
      state: { openCategory: selectedCategory },
    });
    navigate("/cart");
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setSelectingServiceId(null);
    if (location.state?.openCategory) {
      navigate(location.pathname, { replace: true, state: null });
    }
  };

  const currentCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const currentCartTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

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
          <div className="flex-1" onClick={closeSheet} />

          <div className="bg-white rounded-t-3xl max-h-[85vh] h-full flex flex-col w-full max-w-3xl mx-auto overflow-hidden shadow-2xl transition-transform duration-300 translate-y-0">
            <div className="p-4 sm:p-5 border-b flex justify-between items-center bg-pink-100/50">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {selectedCategory?.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">Select services to add to your order</p>
              </div>
              <button
                onClick={closeSheet}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {loadingServices ? (
                <p className="text-center py-12 text-gray-400 font-medium">Fetching services...</p>
              ) : services.length === 0 ? (
                <p className="text-center py-12 text-gray-400">No services found for this category.</p>
              ) : (
                services.map((service) => {
                  const cartItem = cart.find((item) => item._id === service._id && !item.waxType);
                  return (
                    <div
                      key={service._id || service.id}
                      className="bg-gray-50 hover:bg-pink-50/30 p-4 rounded-2xl border border-gray-100 transition"
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
                        <div className="flex-shrink-0">
                          {cartItem && !service.options ? (
                            <div className="flex items-center gap-2 bg-pink-600 text-white rounded-xl px-3 py-1.5 shadow">
                              <button
                                onClick={() => handleQuantity(service._id, "dec")}
                                className="p-1 hover:bg-pink-700 rounded transition"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-sm min-w-[20px] text-center">{cartItem.quantity}</span>
                              <button
                                onClick={() => handleQuantity(service._id, "inc")}
                                className="p-1 hover:bg-pink-700 rounded transition"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddClick(service)}
                              className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow"
                            >
                              <Plus size={16} /> Add
                            </button>
                          )}
                        </div>
                      </div>

                      {renderOptionPanel(service)}
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
                        {currentCartQty} {currentCartQty === 1 ? "Item" : "Items"} Selected
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-xl sm:text-2xl font-bold text-pink-600">₹{currentCartTotal}</p>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
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