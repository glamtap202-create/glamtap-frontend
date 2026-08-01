import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useRef, useEffect, useContext } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import services from "../../data/services";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [showServices, setShowServices] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);

  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    { name: "Waxing", path: "/services/waxing" },
    { name: "Facial", path: "/services/facial" },
    { name: "Clean Up", path: "/services/clean-up" },
    { name: "Bleach & D-Tan", path: "/services/bleach-d-tan" },
    { name: "Threading & Facewax", path: "/services/threading-facewax" },
    { name: "Hair", path: "/services/hair" },
    { name: "Body Massage", path: "/services/body-massage" },
    { name: "Body Polishing", path: "/services/body-polishing" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPricing = (service) => {
    if (service.options && service.prices) {
      const firstKey = Object.keys(service.prices)[0];
      const priceObj = service.prices[firstKey] || {};
      return { price: priceObj.price ?? 0, oldPrice: priceObj.oldPrice ?? 0 };
    }
    return { price: service.price ?? 0, oldPrice: service.oldPrice ?? 0 };
  };

  const getDiscountPercent = (service) => {
    const { price, oldPrice } = getPricing(service);
    if (!oldPrice) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  const filterServices = (term) => {
    if (!term.trim()) return [];
    const q = term.trim().toLowerCase();
    return services
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q)
      )
      .slice(0, 6);
  };

  const searchResults = useMemo(() => filterServices(searchTerm), [searchTerm]);
  const mobileSearchResults = useMemo(
    () => filterServices(mobileSearchTerm),
    [mobileSearchTerm]
  );

  const goToService = (id) => {
    navigate(`/service/${id}`);
    setSearchTerm("");
    setShowSearchResults(false);
    setMobileSearchTerm("");
    setShowMobileSearchResults(false);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (term, e) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate(`/services?search=${encodeURIComponent(term.trim())}`);
    setShowSearchResults(false);
    setShowMobileSearchResults(false);
    setMenuOpen(false);
  };

  const renderDropdown = (term, results, onPick) => (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border z-50 max-h-80 overflow-y-auto">
      {results.length > 0 ? (
        results.map((svc) => {
          const { price, oldPrice } = getPricing(svc);
          const discount = getDiscountPercent(svc);
          return (
            <div
              key={svc.id}
              onClick={() => onPick(svc.id)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 cursor-pointer"
            >
              <img
                src={svc.image}
                alt={svc.name}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{svc.name}</p>
                <div className="flex items-center gap-2 text-xs">
                  {oldPrice > 0 && (
                    <span className="line-through text-gray-400">
                      ₹{oldPrice}
                    </span>
                  )}
                  <span className="font-semibold">₹{price}</span>
                  {discount > 0 && (
                    <span className="text-pink-600 font-medium">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="px-4 py-3 text-sm text-gray-500">
          No results for "{term}"
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-pink-500 text-white">
        <div className="max-w-7xl mx-auto h-auto min-h-[3rem] px-3 md:px-6 py-2 flex items-center justify-between gap-2">
          <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0">
            <div className="inline-flex animate-marquee">
              <span className="flex shrink-0">
                <p className="text-xs sm:text-sm md:text-base font-medium px-8">
                  Get 10% OFF on your first Appointment
                </p>
              </span>
              <span className="flex shrink-0">
                <p className="text-xs sm:text-sm md:text-base font-medium px-8">
                  Get 10% OFF on your first Appointment
                </p>
                <p className="text-xs sm:text-sm md:text-base font-medium px-8">
                  Get 10% OFF on your first Appointment
                </p>
                <p className="text-xs sm:text-sm md:text-base font-medium px-8">
                  Get 10% OFF on your first Appointment
                </p>
              </span>
            </div>
          </div>
           <div className="flex items-center justify-end gap-6 sm:gap-8 text-base sm:text-lg shrink-0">

          {/* <div className="flex items-center justify-end gap-6 sm:gap-8 text-base sm:text-lg shrink-0">
            <a
              href="https://www.facebook.com/glamtap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="cursor-pointer hover:scale-110 duration-300" />
            </a>

            <a
              href="https://www.instagram.com/glamtap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="cursor-pointer hover:scale-110 duration-300" />
            </a>

            <a
              href="https://www.youtube.com/@glamtap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="cursor-pointer hover:scale-110 duration-300" />
            </a> */}

            <Link
              to={isLoggedIn ? "/account" : "/signin"}
              aria-label={isLoggedIn ? "Dashboard" : "Sign in"}
            >
              <FaUser className="cursor-pointer hover:text-pink-100" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative">
              <FaShoppingCart className="cursor-pointer hover:text-pink-100" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center text-center shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-none whitespace-nowrap">
              <span className="text-pink-400">Glam</span>
              <span className="text-black">Tap</span>
            </h1>
            <p className="mt-1 text-[10px] sm:text-xs md:text-base text-gray-500 tracking-wide whitespace-nowrap">
              Tap Book Glow
            </p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `pb-1 transition ${isActive
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "hover:text-pink-500"
                }`
              }
            >
              Home
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button
                className={`flex items-center gap-2 pb-1 transition ${location.pathname.startsWith("/services")
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "hover:text-pink-500"
                  }`}
              >
                Services
                <FaChevronDown />
              </button>

              {showServices && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
                  {categories.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setShowServices(false)}
                      className="block px-5 py-3 hover:bg-pink-50 hover:text-pink-500"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `pb-1 transition ${isActive
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "hover:text-pink-500"
                }`
              }
            >
              Contact Us
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `pb-1 transition flex items-center gap-1 ${isActive
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "hover:text-pink-500"
                }`
              }
            >
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </NavLink>
          </nav>

          {/* Search (Desktop) */}
          <div ref={searchRef} className="hidden lg:block relative w-48 xl:w-64 shrink-0">
            <form
              onSubmit={(e) => handleSearchSubmit(searchTerm, e)}
              className="flex items-center border rounded-full px-4 py-2"
            >
              <FaSearch className="mr-2 text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => searchTerm && setShowSearchResults(true)}
                placeholder="Search..."
                className="outline-none w-full min-w-0"
              />
            </form>

            {showSearchResults &&
              searchTerm.trim() &&
              renderDropdown(searchTerm, searchResults, goToService)}
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-xl sm:text-2xl shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t shadow max-h-[80vh] overflow-y-auto">
            <Link to="/" className="block px-6 py-3" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <button
              className="w-full flex justify-between items-center px-6 py-3"
              onClick={() => setMobileServices(!mobileServices)}
            >
              Services
              <FaChevronDown
                className={`transition ${mobileServices ? "rotate-180" : ""}`}
              />
            </button>

            {mobileServices && (
              <div className="bg-pink-50">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileServices(false);
                    }}
                    className="block px-8 sm:px-10 py-3 hover:bg-pink-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/contact" className="block px-6 py-3" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>

            <Link
              to={isLoggedIn ? "/account" : "/signin"}
              className="block px-6 py-3"
              onClick={() => setMenuOpen(false)}
            >
              {isLoggedIn ? "My Account" : "Login"}
            </Link>

            <Link to="/cart" className="block px-6 py-3" onClick={() => setMenuOpen(false)}>
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>

            {/* Search (Mobile) */}
            <div className="px-4 sm:px-6 py-4 relative">
              <form
                onSubmit={(e) => handleSearchSubmit(mobileSearchTerm, e)}
                className="flex items-center border rounded-full px-4 py-2"
              >
                <FaSearch className="mr-2 text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={mobileSearchTerm}
                  onChange={(e) => {
                    setMobileSearchTerm(e.target.value);
                    setShowMobileSearchResults(true);
                  }}
                  placeholder="Search..."
                  className="outline-none w-full min-w-0"
                />
              </form>

              {showMobileSearchResults &&
                mobileSearchTerm.trim() &&
                renderDropdown(mobileSearchTerm, mobileSearchResults, goToService)}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;