function Testimonials() {
  const features = [
    {
      title: "Affordable Price",
      image: "/images/A.png",
    },
    {
      title: "On Time Services",
      image: "/images/B.jpg",
    },
    {
      title: "Trained & Verified\nBeauticians",
      image: "/images/C.jpg",
    },
    {
      title: "Safe & Hygienic\nServices",
      image: "/images/D.jpg",
    },
    {
      title: "One-Time Product\nMono-dose used",
      image: "/images/E.jpg",
    },
    {
      title: "One Time Disposable\nUse",
      image: "/images/dustbin.jpg",
    },
  ];

  return (
    <section className="bg-pink-100 rounded-2xl lg:rounded-3xl py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-12">
        Why Choose Glam Tap?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="relative h-36 sm:h-44 md:h-48 lg:h-56 overflow-hidden rounded-2xl lg:rounded-3xl group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 px-3 sm:px-4 text-center">
              <h3 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold whitespace-pre-line">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;