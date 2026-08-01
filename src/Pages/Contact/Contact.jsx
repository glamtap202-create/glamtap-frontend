import { useState } from "react";
import API from "../../api/axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    comment: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await API.post("/contact", formData);

      setMessage("Thank you! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        comment: "",
        agreed: false,
      });
    } catch (error) {
      console.error("Contact submit error:", error?.response?.data || error?.message || error);
      const backendMessage = error?.response?.data?.message;
      setMessage(
        backendMessage || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#fdfbf5] py-10 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <p className="text-pink-500 font-semibold tracking-widest text-xs sm:text-sm uppercase mb-2 sm:mb-3">
          Get in Touch
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-3 sm:mb-4">
          Contact <span className="text-pink-400">us</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-10 md:mb-12 max-w-xl">
          Have a question or want to book an appointment? Fill out the form below and we'll get back to you shortly.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-4 sm:space-y-6 bg-white/60 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-pink-100"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                required
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-gray-500"
              >
                <option value="" disabled>Select a service</option>
                <option value="waxing">Waxing</option>
                <option value="facial">Facial</option>
                <option value="clean-up">Clean Up</option>
                <option value="hair">Hair</option>
                <option value="body-massage">Body Massage</option>
                <option value="other">Other</option>
              </select>
            </div>

            <textarea
              rows="5"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none resize-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
            ></textarea>

            <label className="flex items-start gap-2 text-xs sm:text-sm text-gray-500">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-1 accent-pink-500"
              />
              I agree to be contacted regarding my enquiry.
            </label>

            {message && (
              <p className="text-sm text-pink-600 font-medium">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-pink-500 text-white shadow-lg shadow-pink-200 rounded-xl px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-pink-600 hover:shadow-pink-300 active:scale-95 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;