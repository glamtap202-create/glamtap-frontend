function Categories() {
  const categories = [
    { id: 1, name: "Waxing", video: "/video/waxing.mp4" },
    { id: 2, name: "CleanUp", video: "/video/cleanup.mp4" },
    { id: 3, name: "Hair", video: "/video/hair.mp4" },
    { id: 4, name: "Threading", video: "/video/threading.mp4" },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10">
        Beauty Services
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <video
              className="w-full h-40 sm:h-52 md:h-56 lg:h-64 object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={category.video} type="video/mp4" />
            </video>

            <div className="p-3 sm:p-4">
              <h3 className="text-center text-sm sm:text-lg md:text-xl font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;