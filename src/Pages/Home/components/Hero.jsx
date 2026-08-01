import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Hero() {
  const images = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full px-3 sm:px-5 md:px-8 lg:px-12 py-4 sm:py-6">
      {/* Banner Box - background color image se match */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl group 
                      bg-[#F8F0E8]
                      aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5.5] lg:aspect-[21/6.5]">
        
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${current * (100 / images.length)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full shrink-0 flex items-center justify-center bg-[#F8F0E8]"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 
                     bg-white/90 hover:bg-white text-gray-800 rounded-full 
                     p-2 sm:p-3 shadow-lg opacity-0 group-hover:opacity-100 
                     transition-all duration-300"
        >
          <ChevronLeft size={22} className="sm:size-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 
                     bg-white/90 hover:bg-white text-gray-800 rounded-full 
                     p-2 sm:p-3 shadow-lg opacity-0 group-hover:opacity-100 
                     transition-all duration-300"
        >
          <ChevronRight size={22} className="sm:size-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-pink-500 w-7 sm:w-9"
                  : "bg-white/80 hover:bg-white w-2 sm:w-2.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;