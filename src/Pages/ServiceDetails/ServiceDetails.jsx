import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Package } from "lucide-react";
import toast from "react-hot-toast"; // ya jo bhi toast library use ho rahi hai
import { CartContext } from "../../Context/CartContext";
import API from "../../api/axios";
import services from "../../data/services";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWax, setSelectedWax] = useState("Honey");
  const [qty, setQty] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const { addToCart } = useContext(CartContext);

  const fetchServiceDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get(`/services/${id}`);
      setService(res.data.service || res.data);
      return;
    } catch (serviceErr) {
      if (serviceErr.response?.status !== 404) {
        setError(serviceErr.response?.data?.message || serviceErr.message || "Unable to load service");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await API.get(`/combos/${id}`);
      setService(res.data.combo || res.data);
    } catch (comboErr) {
      setError(comboErr.response?.data?.message || comboErr.message || "Service not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedWax("Honey");
    setQty(1);
    setShowDetails(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return <h1 className="text-center py-20 text-3xl">Loading service...</h1>;
  }

  if (error || !service) {
    return <h1 className="text-center py-20 text-3xl">{error || "Service Not Found"}</h1>;
  }

  const current =
    service.options && service.prices
      ? service.prices[selectedWax] ?? Object.values(service.prices)[0]
      : {
          oldPrice: service.oldPrice,
          price: service.price,
        };

  const discount = current.oldPrice
    ? Math.round(
        ((current.oldPrice - current.price) / current.oldPrice) * 100
      )
    : 0;

  const getPricing = (svc) => {
    if (svc.options && svc.prices) {
      const firstKey = Object.keys(svc.prices)[0];
      const priceObj = svc.prices[firstKey] || {};
      return { price: priceObj.price ?? 0, oldPrice: priceObj.oldPrice ?? 0 };
    }
    return { price: svc.price ?? 0, oldPrice: svc.oldPrice ?? 0 };
  };

  const getDiscountPercent = (svc) => {
    if (svc.options) {
      const { price, oldPrice } = getPricing(svc);
      if (!oldPrice) return 0;
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return svc.discount ?? 0;
  };

  const relatedServices = services
    .filter((s) => s.id !== service.id)
    .sort((a, b) =>
      a.category === service.category ? -1 : b.category === service.category ? 1 : 0
    )
    .slice(0, 4);

  // Build the cart item once so Add to Cart and Buy Now stay in sync
  const buildCartItem = () => ({
    id: service._id || service.id,
    name: service.name,
    image: service.image || service.img,
    duration: service.duration,
    price: current.price,
    oldPrice: current.oldPrice,
    quantity: qty,
    waxType: service.options ? selectedWax : null,
  });

  const requireLogin = () => {
    const isLoggedIn = localStorage.getItem("authToken"); // apna actual auth key daalna
    if (!isLoggedIn) {
      toast.error("Please login to continue booking");
      navigate("/login", { state: { from: `/service/${service.id}` } });
      return false;
    }
    return true;
  };

  // 🔐 Login check + add to cart
  const handleAddToCart = () => {
    if (!requireLogin()) return;

    addToCart(buildCartItem());
    toast.success("Added to cart!");
  };

  // 🔐 Login check + add to cart + go straight to checkout/cart
  const handleBuyNow = () => {
    if (!requireLogin()) return;

    addToCart(buildCartItem());
    navigate("/cart");
  };

  return (
    <section className="bg-[#f8f5ef] min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <img
              src={service.image || service.img}
              alt={service.name}
              className="w-full h-[300px] object-cover rounded-2xl"
            />
          </div>

          <div>
            <p className="text-blue-600 font-medium">
              {service.booked} women booked
            </p>

            <h1 className="text-5xl font-light mt-3 leading-tight">
              {service.name}
            </h1>

            <div className="flex items-center gap-3 mt-6">
              <span className="line-through text-xl text-gray-500">
                ₹{current.oldPrice}
              </span>

              <span className="text-4xl font-bold">₹{current.price}</span>

              <span className="text-pink-600 font-semibold">
                {discount}% OFF
              </span>
            </div>

            <p className="text-gray-600 mt-6">{service.description}</p>

            {service.options && (
              <>
                <p className="mt-8 mb-3 text-gray-700">Select type of wax</p>

                <div className="flex gap-3 flex-wrap">
                  {Object.keys(service.prices).map((wax) => {
                    const waxPricing = service.prices[wax] || {};
                    const isSelected = selectedWax === wax;
                    return (
                      <button
                        key={wax}
                        onClick={() => setSelectedWax(wax)}
                        className={`px-6 py-3 rounded-xl border transition text-left ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        <div className="font-medium">
                          {wax === "RollOn" ? "Roll On Wax" : wax}
                        </div>
                        <div className="mt-0.5 flex items-baseline gap-1.5 text-sm">
                          <span className={isSelected ? "text-white" : "text-pink-600"}>
                            ₹{waxPricing.price}
                          </span>
                          {waxPricing.oldPrice ? (
                            <span
                              className={`line-through text-xs ${
                                isSelected ? "text-gray-300" : "text-gray-400"
                              }`}
                            >
                              ₹{waxPricing.oldPrice}
                            </span>
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="mt-8">
              <p className="text-gray-600 mb-3">Quantity</p>

              <div className="flex items-center border rounded-xl w-fit overflow-hidden">
                <button
                  onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
                  className="px-5 py-3 text-xl"
                >
                  −
                </button>

                <span className="px-6">{qty}</span>

                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-5 py-3 text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-xl border border-pink-600 text-pink-700 hover:bg-pink-50 text-lg font-medium"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-xl bg-pink-600 text-white hover:bg-pink-700 text-lg font-medium"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 text-center mt-10 gap-6">
              <div>
                <BadgeCheck size={36} className="mx-auto mb-2" />
                <p className="text-sm">Expert Female Partners</p>
              </div>

              <div>
                <ShieldCheck size={36} className="mx-auto mb-2" />
                <p className="text-sm">100% Safe & Hygienic</p>
              </div>

              <div>
                <Package size={36} className="mx-auto mb-2" />
                <p className="text-sm">Branded Products</p>
              </div>
            </div>

            {service.secondImage && (
              <img
                src={service.secondImage}
                alt={`${service.name} setup`}
                className="w-full rounded-xl object-cover mt-8"
              />
            )}

            {service.benefitsList && service.benefitsList.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {service.benefitsListTitle || "Benefits"}
                </h2>
                <div className="space-y-2">
                  {service.benefitsList.map((point, idx) => (
                    <p key={idx} className="text-gray-700">
                      ✓ {point}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {service.bodyParts && service.bodyParts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {service.bodyPartsTitle || "Body Parts Included"}
                </h2>
                <div className="grid grid-cols-3 gap-2 bg-white border border-gray-200 rounded-xl p-3">
                  {service.bodyParts.map((part, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden">
                      <img
                        src={part.image}
                        alt={part.label}
                        className="w-full h-24 object-cover"
                      />
                      <span className="absolute bottom-1 left-2 text-white text-xs font-medium drop-shadow">
                        {part.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.spaOilImage && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {service.spaOilTitle || "Your Spa Oil"}
                </h2>
                <img
                  src={service.spaOilImage}
                  alt={service.spaOilTitle || "Spa Oil"}
                  className="w-full rounded-xl object-cover"
                />
              </div>
            )}

            {service.howItWorksSteps && service.howItWorksSteps.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {service.howItWorksTitle || "How it Works"}
                </h2>
                <div className="space-y-5">
                  {service.howItWorksSteps.map((step, idx) => (
                    <div key={idx}>
                      <p className="font-semibold text-gray-900">
                        Step {idx + 1}: {step.title}
                      </p>
                      <p className="text-gray-700 mt-1">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.careList && service.careList.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {service.careListTitle || "Before & After Care"}
                </h2>
                <div className="space-y-2">
                  {service.careList.map((point, idx) => (
                    <p key={idx} className="text-gray-700">
                      ✓ {point}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-8">
                {service.productImage && (
                  <img
                    src={service.productImage}
                    alt={`${service.name} product`}
                    className="w-full rounded-xl object-cover mb-6"
                  />
                )}

                <h2 className="text-2xl font-bold text-pink-600 mb-4">
                  {service.benefitsTitle || `Benefits of ${service.name}`}
                </h2>
                <div className="space-y-2">
                  {service.benefits.map((item, idx) => (
                    <p key={idx} className="text-gray-700">
                      ✓ {item.title}
                      {item.text ? `: ${item.text}` : ""}
                    </p>
                  ))}
                </div>

                {service.benefitsImage && (
                  <img
                    src={service.benefitsImage}
                    alt={`${service.name} benefits`}
                    className="w-full rounded-xl object-cover mt-6"
                  />
                )}

                {service.aftercare && service.aftercare.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Aftercare</h3>
                    {service.aftercare.map((line, idx) => (
                      <p key={idx} className="text-gray-700">
                        ✓ {line}
                      </p>
                    ))}
                  </div>
                )}

                {service.recommended && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Recommended
                    </h3>
                    <p className="text-gray-700">{service.recommended}</p>
                  </div>
                )}

                {service.beforeYouBook && service.beforeYouBook.length > 0 && (
                  <div className="mt-6">
                    <hr className="mb-6" />
                    <h3 className="text-xl font-semibold mb-2">
                      Before You Book
                    </h3>
                    {service.beforeYouBook.map((line, idx) => (
                      <p key={idx} className="text-gray-700">
                        • {line}
                      </p>
                    ))}

                    {service.beforeYouBookImage && (
                      <img
                        src={service.beforeYouBookImage}
                        alt={`${service.name} info`}
                        className="w-full rounded-xl object-cover mt-6"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {!service.benefits &&
              !service.benefitsList &&
              !service.bodyParts &&
              !service.howItWorksSteps && (
              <>
                <button
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="mt-10 text-pink-700 font-medium hover:underline"
                >
                  {showDetails ? "Hide full details ↑" : "View full details →"}
                </button>

                {showDetails && (
                  <>
                    <div className="mt-6 flex gap-3">
                      <img
                        src="/images/Honey.webp"
                        alt="Honey Charm Hot Wax"
                        className="w-75 h-40 rounded-xl flex-shrink-0"
                      />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <img
                        src="/images/Rica1.webp"
                        alt="Rica Wax"
                        className="w-75 h-40 rounded-xl flex-shrink-0"
                      />
                    </div>

                    <div className="mt-6">
                      <h1>How it works</h1>
                      <img
                        src="/images/waxing.webp"
                        alt="How it works"
                        className="w-full rounded-xl object-cover"
                      />
                    </div>

                    <div className="mt-8 flex gap-3">
                      <img
                        src="/images/WaxUnder.webp"
                        alt="White Chocolate Wax"
                        className="w-75 h-40 rounded-xl flex-shrink-0"
                      />
                    </div>

                    <div className="mt-4">
                      <p>Aftercare Tips</p>
                      <h1>✓ Apply moisturizer after your session</h1>
                      <h2>✓ Avoid perfumes &amp; scrubs for a few hours</h2>
                      <p>✓ Avoid hot showers immediately after waxing</p>
                      <img
                        src="/images/discpoble.webp"
                        alt="How it works"
                        className="w-full rounded-xl object-cover"
                      />
                    </div>

                    <div className="mt-4">
                      <p>Please Note:</p>
                      <h1>✓ An air-conditioned room is recommended</h1>
                      <h2>✓ Avoid if prone to skin reactions</h2>
                      <p>✓ Results may differ by skin &amp; hair type</p>
                      <h3>✓ Area with wound &amp; cut won't be waxed</h3>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You may also like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedServices.map((svc) => {
                const { price, oldPrice } = getPricing(svc);
                const svcDiscount = getDiscountPercent(svc);

                return (
                  <div
                    key={svc.id}
                    onClick={() => navigate(`/service/${svc.id}`)}
                    className="cursor-pointer"
                  >
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-40 object-cover rounded-xl"
                    />

                    <h3 className="mt-3 font-semibold text-gray-900 text-[15px] leading-5">
                      {svc.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-gray-500 text-sm">
                        ₹{oldPrice}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₹{price}
                      </span>
                      <span className="text-pink-600 text-sm font-medium">
                        {svcDiscount}% OFF
                      </span>
                    </div>

                    <p className="text-xs text-blue-600 mt-1">
                      {svc.booked} women booked
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceDetails;