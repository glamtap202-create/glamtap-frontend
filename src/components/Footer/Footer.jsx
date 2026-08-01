import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-400 to-pink-600 text-white mt-10">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-3xl font-serif mb-6">Company</h2>

          <ul className="space-y-3 text-lg">
            <li>
              <Link to="/privacy-policy" className="hover:text-pink-200">
                » Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms" className="hover:text-pink-200">
                » Terms & Conditions
              </Link>
            </li>

            <li>
              <Link to="/payment-policy" className="hover:text-pink-200">
                » Payment Policy
              </Link>
            </li>

            <li>
              <Link to="/refund-policy" className="hover:text-pink-200">
                » Cancellation & Refund Policy
              </Link>
            </li>

            {/* NEW */}
            <li>
              <Link
                to="/partner/register"
                className="font-semibold hover:text-yellow-200"
              >
                » Become a Partner
              </Link>
            </li>

            <li>
              <Link
                to="/partner/login"
                className="font-semibold hover:text-yellow-200"
              >
                » Partner Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="text-center">
          <div className="inline-block bg-white rounded-xl px-6 py-3">
            <h2 className="text-4xl font-serif text-pink-600">
              GlamTap
            </h2>

            <p className="text-gray-600">Tap Book Glow</p>
          </div>

          <p className="mt-8 leading-8 text-lg">
            GlamTap brings together modern beauty,
            relaxing spa experiences, and professional
            grooming under one roof. From everyday
            self-care to special occasions, we provide
            high-quality services with attention to
            hygiene, comfort, and detail.
          </p>
        </div>

        {/* Download */}
        <div>
          <h2 className="text-3xl font-serif mb-5">
            Download Our App
          </h2>

          <div className="flex gap-3 mb-5">
            <button className="bg-black rounded-lg px-4 py-3 flex items-center gap-2">
              <FaGooglePlay />
              Google Play
            </button>

            <button className="bg-black rounded-lg px-4 py-3 flex items-center gap-2">
              <FaApple />
              App Store
            </button>
          </div>

          <p className="text-lg">
            Download the app and enjoy a smoother
            beauty experience.
          </p>

          <h3 className="mt-8 mb-4 text-2xl">
            Show some love on social media
          </h3>

          <div className="flex gap-5 text-2xl">
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
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      {/* <div className="max-w-7xl mx-auto px-6 py-4 border-t border-pink-300 flex gap-8 flex-wrap justify-center">
        <Link to="/" className="hover:text-pink-200">Home</Link>

        <Link to="/services" className="hover:text-pink-200">Services</Link>

        <Link to="/contact" className="hover:text-pink-200">Contact Us</Link>

        <Link to="/cart" className="hover:text-pink-200">Cart</Link>

        <Link
          to="/partner/login"
          className="font-semibold text-yellow-200 hover:text-white"
        >
          Partner Login
        </Link>
      </div> */}
    </footer>
  );
}

export default Footer;