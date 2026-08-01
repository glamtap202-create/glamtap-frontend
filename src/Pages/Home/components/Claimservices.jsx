import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";

function Claimservices() {
  const [loadingId, setLoadingId] = useState(null);
  const [claimedServiceId, setClaimedServiceId] = useState(null);
  const [isOfferUsed, setIsOfferUsed] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🕒 Timer States
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeObj, setTimeObj] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [isExpired, setIsExpired] = useState(false);

  const services = [
    {
      id: "65a123456789abcdef012345",
      title: "Half Legs by Cosbar honey",
      brand: "Wax by Cosbar Honey",
      price: "₹370/-",
      image: "https://i.pinimg.com/736x/53/35/b4/5335b4b7ed80f8622f6a44e9ee1c43d4.jpg",
    },
    {
      id: "65a123456789abcdef012346",
      title: "Underarms",
      brand: "by Rica Brazilian",
      price: "₹100/-",
      image: "https://i.pinimg.com/1200x/15/c3/d3/15c3d3f16b94702002465150f19f9434.jpg",
    },
    {
      id: "65a123456789abcdef012347",
      title: "Stomach",
      brand: "Wax by Cosbar honey",
      price: "₹320/-",
      image: "https://i.pinimg.com/736x/92/2f/35/922f3587a63bb3f2b761be6f876dc590.jpg",
    },
    {
      id: "65a123456789abcdef012348",
      title: "Eyebrow",
      brand: "Eyebrow Threading",
      price: "₹50/-",
      image: "https://i.pinimg.com/736x/7e/ce/a3/7ecea3ac6a931c1c172f8b96a5c8b4a0.jpg",
    },
  ];

  const sliderRef = useRef(null);

  // 1. Fetch Offer Status & Expiry Time
  useEffect(() => {
    const checkOfferStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/offers/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Offer Status Response:", data); // 👈 Debug log

        if (response.ok && data.success) {
          if (data.hasClaimedWelcomeOffer) {
            setIsOfferUsed(true);
          } else if (data.isOfferInCart) {
            setClaimedServiceId(data.claimedServiceId);
          }

          // Backend Expiry Logic check
          if (data.expiresAt) {
            setExpiresAt(data.expiresAt);
          } else if (data.isOfferInCart) {
            // Fallback: Agar backend me status me time miss ho gaya ho
            const dummyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
            setExpiresAt(dummyExpiry);
          }

          if (data.isExpired) {
            setIsExpired(true);
          }
        }
      } catch (error) {
        console.log("Status check error:", error);
      }
    };

    checkOfferStatus();
  }, []);

  // 2. 🕒 Live Digital Box Countdown
  useEffect(() => {
    if (!expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (isNaN(expiry) || diff <= 0) {
        setTimeObj({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsExpired(true);
        return false;
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeObj({
          days: d.toString().padStart(2, "0"),
          hours: h.toString().padStart(2, "0"),
          minutes: m.toString().padStart(2, "0"),
          seconds: s.toString().padStart(2, "0"),
        });
        return true;
      }
    };

    calculateTimeLeft();
    const interval = setInterval(() => {
      const isRunning = calculateTimeLeft();
      if (!isRunning) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // 3. Claim Offer Handler
  const handleClaimOffer = async (serviceId) => {
    setLoadingId(serviceId);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({ type: "error", text: "Kripya pehle login karein!" });
        setLoadingId(null);
        return;
      }

      const response = await fetch("http://localhost:5000/api/offers/claim-one-rupee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      const data = await response.json();
      console.log("Claim Response Data:", data); // 👈 Debug log

      if (response.ok && data.success) {
        setClaimedServiceId(serviceId);

        // Agar Backend expiresAt bhej raha hai toh wo use karo, nahi toh Instant 24hrs ka timer banao
        if (data.expiresAt) {
          setExpiresAt(data.expiresAt);
        } else {
          const default24HrExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          setExpiresAt(default24HrExpiry);
        }

        setMessage({ type: "success", text: "Offer Cart me add ho gaya!" });
      } else {
        setMessage({ type: "error", text: data.message || "Kuch galti hui!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server connection failed!" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto bg-pink-50/60 rounded-3xl p-8 border border-pink-100 shadow-sm">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Claim Your Free Services</h2>
        <p className="text-gray-600 mt-2 text-sm max-w-2xl">
          Unlock complimentary services and add one to your cart before the timer runs out. A calmer way to try Glamtap for the first time.
        </p>

        {/* Message Alert */}
        {message.text && (
          <div className={`mt-4 p-3 rounded-xl text-sm font-semibold ${message.type === "success" ? "bg-pink-200 text-pink-950" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}

        {/* Services Cards Container */}
        <div className="relative mt-8">
          <div ref={sliderRef} className="flex gap-5 overflow-x-auto scrollbar-hide py-2">
            {services.map((item) => {
              const isClaimed = claimedServiceId === item.id;
              const isLoading = loadingId === item.id;

              return (
                <div key={item.id} className="flex-shrink-0 w-[270px] h-[390px] rounded-3xl overflow-hidden relative shadow-md group">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col justify-end h-full">
                    <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-300 mt-0.5">{item.brand}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-pink-100 text-pink-800 px-3 py-0.5 rounded-full font-bold text-xs">FREE</span>
                      <span className="line-through text-gray-400 text-xs">{item.price}</span>
                    </div>

                    <div className="mt-4 flex flex-col items-start gap-2">
                      <button
                        onClick={() => handleClaimOffer(item.id)}
                        disabled={isLoading || isClaimed || isOfferUsed || isExpired || (claimedServiceId && !isClaimed)}
                        className={`px-5 py-2 rounded-full font-semibold text-xs transition-all flex items-center gap-1 ${
                          isExpired
                            ? "bg-red-600 text-white cursor-not-allowed opacity-80"
                            : isClaimed
                            ? "bg-pink-600 text-white cursor-default"
                            : isOfferUsed || claimedServiceId
                            ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                            : "bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                        }`}
                      >
                        {isLoading ? (
                          "Adding..."
                        ) : isExpired ? (
                          "Expired"
                        ) : isClaimed ? (
                          <>
                            <Check size={14} /> Added to Cart
                          </>
                        ) : isOfferUsed ? (
                          "Used"
                        ) : (
                          "Claim Now"
                        )}
                      </button>

                      {/* 🕒 Digital Box Timer - Sahi Ticking ke sath */}
                      {isClaimed && (
                        <div className="self-end flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs text-white border border-white/20 shadow-lg">
                          <span className="text-[11px] text-gray-300 font-medium">Expire In</span>
                          <div className="flex gap-1 font-mono font-extrabold text-pink-400 text-xs tracking-wider">
                            <span className="bg-pink-950/80 px-1.5 py-0.5 rounded-md border border-pink-700/60">{timeObj.days}</span>:
                            <span className="bg-pink-950/80 px-1.5 py-0.5 rounded-md border border-pink-700/60">{timeObj.hours}</span>:
                            <span className="bg-pink-950/80 px-1.5 py-0.5 rounded-md border border-pink-700/60">{timeObj.minutes}</span>:
                            <span className="bg-pink-950/80 px-1.5 py-0.5 rounded-md border border-pink-700/60">{timeObj.seconds}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Claimservices;