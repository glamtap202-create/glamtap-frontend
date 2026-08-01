import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Hero from "./components/Hero";
import ServiceCarousel from "./components/ServiceCarousel";
import Categories from "./components/Categories";
import Offers from "./components/Offers";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Claimservices from "./components/Claimservices";
import Download from "./components/Download";
import Professional from "./components/Professional";
import CelebritiesLoveUs from "./components/CelebritiesLoveUs";
import BestSellingPackages from "./components/Bestsellingpackages";
import FacialsGrid from "./components/Facialsgrid";
import OmgDeals from "./components/Omgdeals";
import BeBold from "./components/Bebold";
import KoreanGlow from "./components/Koreanglow";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceCarousel />
      <Categories />
      <CelebritiesLoveUs />
      <BestSellingPackages />
      <FacialsGrid />
      <OmgDeals />
      <BeBold />
      <KoreanGlow />
      <Offers />
      <WhyChooseUs />
      <Testimonials />
      <Claimservices />
      <Download />
      <Professional />
      <Footer />
    </>
  );
}

export default Home;