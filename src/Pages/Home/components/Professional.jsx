// import { useState, useEffect } from "react";
import {
  FaStar,
  // FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";


function Professional() {
  const reviews = [
    {
      name: "Ananya Sharma",
      feedback: "Salon experience.",
      points: [
        "Professional arrived on time.",
        "Booking process was smooth.",
        "Service was hygienic.",
        "Products used were of good quality.",
        "Staff was polite and professional.",
      ],
    },
    {
      name: "Neha Verma",
      feedback: "Very Professional Service.",
      points: [
        "Excellent facial service.",
        "Professional explained every step.",
        "Clean and sanitized equipment.",
        "Great attention to detail.",
        "Will book again.",
      ],
    },
    {
      name: "Riya Gupta",
      feedback: "Highly Recommended.",
      points: [
        "Waxing service was painless.",
        "Professional was very friendly.",
        "Arrived exactly on schedule.",
        "Maintained proper hygiene.",
        "Highly recommended.",
      ],
    },
    {
      name: "Sneha Kapoor",
      feedback: "Amazing Service Experience.",
      points: [
        "Amazing manicure and pedicure.",
        "Neat and clean setup.",
        "Premium quality products.",
        "Very satisfied with the service.",
        "Worth every penny.",
      ],
    },
    {
      name: "Pooja Singh",
      feedback: "Excellent Home Service.",
      points: [
        "Quick and hassle-free booking.",
        "Professional behavior.",
        "Excellent cleanup service.",
        "Home service experience was comfortable.",
        "Will recommend to friends.",
      ],
    },
    {
      name: "Radhika Sharma",
      feedback: "Outstanding Professional Experience.",
      points: [
        "The professional arrived exactly on time.",
        "The products used were clean and of high quality.",
        "The service was smooth, relaxing, and professionally done.",
      ],
    },
  ];



  return (
    <section className="py-2 bg-white rounded-[24px] overflow-hidden">
      {/* Heading */}
      <div className="text-center mt-9 mb-9">
  <h2 className="text-4xl md:text-5xl font-serif font-bold text-black">
    Testimonials
  </h2>

  <p className="text-base text-gray-600 mt-3 max-w-2xl mx-auto">
    Hear what our happy clients say about their GlamTap experience.
  </p>
</div>
      <div className="relative">



        {/* Cards */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="w-[320px] h-[420px] bg-white rounded-2xl p-6 shadow-lg flex-shrink-0 flex flex-col justify-between"
              >
                <h3 className="text-2xl font-semibold text-center">
                  {review.name}
                </h3>

                <div className="flex justify-center gap-1 mt-4 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-pink-700 text-2xl"
                    />
                  ))}
                </div>

                <ul className="space-y-2 text-base text-gray-800">
                  {review.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-700 font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-center text-pink-700 font-bold text-lg">
                  {review.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Professional;