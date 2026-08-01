import { useEffect, useState } from "react";
import API from "../../../api/axios"; // path check kar lena

import {
  FaUserCheck,
  FaDownload,
  FaSpa,
  FaMapMarkerAlt,
  FaRegStar,
} from "react-icons/fa";

function WhyChooseUs() {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");

      // Agar response { success:true, stats:{...} } hai
      if (res.data.stats) {
        setStatsData(res.data.stats);
      } else {
        setStatsData(res.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (!statsData) {
    return (
      <section className="py-12 bg-white text-center">
        <p className="text-gray-500">Loading achievements...</p>
      </section>
    );
  }

  const stats = [
    {
      icon: <FaUserCheck className="text-gray-800" />,
      number: `${statsData.professionals || 0}+`,
      title: "Professionals",
    },
    {
      icon: <FaDownload className="text-gray-800" />,
      number: `${statsData.downloads || 0}+`,
      title: "App Download",
    },
    {
      icon: <FaSpa className="text-gray-800" />,
      number: `${statsData.completed || 0}+`,
      title: "Bookings Completed",
    },
    {
      icon: <FaMapMarkerAlt className="text-gray-800" />,
      number: `${statsData.cities || 0}+`,
      title: "Cities in India",
    },
    {
      icon: <FaRegStar className="text-gray-800" />,
      number: `${statsData.rating || 0} ★`,
      title: "India's Top Rated\nBeauty App",
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 lg:mb-16">
          Achievements so far
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {stats.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mx-auto rounded-full bg-pink-50 flex items-center justify-center mb-4 sm:mb-5 lg:mb-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {item.number}
              </h3>

              <p className="mt-2 text-sm sm:text-base lg:text-xl text-gray-600 whitespace-pre-line">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;