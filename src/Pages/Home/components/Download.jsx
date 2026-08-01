function Download() {
  return (
    <section className="bg-pink-100 py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-4">
              Download Our App
            </h2>

            <h3 className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-4">
              Book salon services anytime, anywhere — right from your phone.
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-7 lg:leading-8 mb-4">
              Our app lets you schedule appointments, explore packages,
              access exclusive offers, and manage your bookings effortlessly —
              all from the comfort of your home.
            </p>

            <p className="text-lg sm:text-xl font-bold text-black mb-6">
              Download the app and enjoy a smoother beauty experience.
            </p>

            <div className="flex justify-center lg:justify-start flex-wrap gap-4">
              <img
                src="/images/app.webp"
                alt="Google Play"
                className="h-12 sm:h-14 md:h-16 cursor-pointer hover:scale-105 transition"
              />

              <img
                src="/images/stor.webp"
                alt="App Store"
                className="h-12 sm:h-14 md:h-16 cursor-pointer hover:scale-105 transition"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center order-1 lg:order-2">
            <img
              src="/images/a.webp"
              alt="Download App"
              className="w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] object-contain rounded-[10%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Download;