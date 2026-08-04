import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const celebrities = [
  {
    name: "DIVYANKA TRIPATHI",
    caption: "On our HydraGlo Services",
    image: "https://i.pinimg.com/736x/18/5c/d5/185cd5738bc470aba9d7c322a4a96f7c.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/Divyanka291225.mp4",
  },
  {
    name: "EKTA KAPOOR",
    caption: "Trusts our Korean Glow Services",
    image: "https://i.pinimg.com/736x/92/28/94/922894723cc3324673704753259b9481.jpg",
     video: "https://cdn.yesmadam.com/images/live/react-native/EKTAKAPOOR291225.mp4",
  },
  {
    name: "POOJA & CHAAVI",
    caption: "YesMadam Salon Services at Home Will Make you Glow & Shine",
    image: "https://i.pinimg.com/736x/69/d6/7e/69d67e4606a42008ef35e3b04274136e.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/poojaxchhavi291225.mp4", // TODO: paste Pooja & Chaavi's real CDN .mp4 URL here
  },
  {
    name: "SHEFALI BAGGA",
    caption: "On our Hygienic Services",
    image: "https://i.pinimg.com/736x/a7/f8/e6/a7f8e6d44275a543d119639b34b68c9d.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/shefaliMonodose291225.mp4",
  },
  {
    name: "SAKSHI TANWAR",
    caption: "Loves our Home Services",
    image: "https://i.pinimg.com/736x/ac/51/39/ac5139eb69db0ffef36993a2d429de95.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/Sakshitanwar070226.mp4",
  },
  {
    name: "TANYA MITTAL",
    caption: "On our Grooming Services",
    image: "https://i.pinimg.com/1200x/24/80/0f/24800f38ad76df3d18bc16d8c43895f8.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/TanyaMittal070226.mp4",
  },
  {
    name: "SHWETA TIWARI",
    caption: "Trusts our Waxing Services",
    image: "https://i.pinimg.com/1200x/fb/92/08/fb92083bbfdfd9430f77149dce2ad77f.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/ShwetatiwariWaxing070226.mp4",
  },
  {
    name: "ANKITA LOKHANDE",
    caption: "On our Salon Services",
    image: "https://i.pinimg.com/736x/3f/41/17/3f41178d8b71a99fd7093ceefc5330bf.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/AnkitaLokhande070226.mp4",
  },
  {
    name: "SHRADDHA KAPOOR",
    caption: "Trusts YesMadam",
    image: "https://i.pinimg.com/1200x/25/8e/8c/258e8c065af6e774fd6e2ada1e351afd.jpg",
    video: "https://cdn.yesmadam.com/images/live/react-native/ShraddhaKapoor291225.mp4",
  },
];

export default function CelebritiesLoveUs() {
  const scrollRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (video) => {
    if (!video) return; // no video available yet for this celebrity
    setActiveVideo(video);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  return (
    <div className="w-full bg-white py-12 relative">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-10">
        Celebrities love us
      </h2>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:scale-105 transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Cards */}
        <div
  ref={scrollRef}
  className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar px-2"
  style={{ scrollbarWidth: "none" }}
>
         {celebrities.map((celeb, index) => (
 <div
  key={index}
  onClick={() => {
    if (celeb.video) {
      setActiveVideo(celeb.video);
    }
  }}
  className="relative flex-shrink-0
             w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[320px]
             h-[300px] sm:h-[360px] md:h-[430px] lg:h-[500px] xl:h-[520px]
             rounded-2xl overflow-hidden shadow-md cursor-pointer"
>
   <img
  src={celeb.image}
  alt={celeb.name}
  className="w-full h-full object-cover object-top"
/>

    {/* Bottom Text */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 sm:p-4 lg:p-5">
  <h3 className="text-white font-bold text-sm sm:text-lg lg:text-xl">
    {celeb.name}
  </h3>

  <p className="text-white text-[11px] sm:text-xs lg:text-sm leading-snug">
    {celeb.caption}
  </p>
</div>
  </div>
))}
</div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:scale-105 transition"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <video
            src={activeVideo}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}