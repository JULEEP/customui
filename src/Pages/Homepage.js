import React from "react";
import Navbar from "./Navbar";
import AIHomepage from "./AIHomepage";
import KeyFeatures from "./KeyFeatures";
import WhyChooseAlludeAI from "./WhyUs";
import AboutAlludeAI from "./AboutUs";
import ContactUs from "./ContactUs";
import DownloadApp from "./DownloadApp";
import Footer from "./Footer";
import CategoriesDropdown from "./CategoriesDropdown";
import AutoSliderBanner from "./AutoSliderBanner";
import VisitingCardEditor from "./VisitingCardEditor";
import PrintShoppySearch from "./PrintShoppySearch";
import SimplePopularProducts from "./SimplePopularProducts";
import NewInProducts from "./NewInProducts";
import PhotoAlbumsPrints from "./PhotoAlbumsPrints";
import BusinessNeeds from "./BusinessNeeds";
import GiftBanner from "./GiftBanner";
import VisionHomegrownSection from "./VisionHomegrownSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* ONLY Navbar Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main Content - NOT fixed */}
      <div className="pt-20"> {/* pt-20 for navbar height */}
        <PrintShoppySearch />
        <SimplePopularProducts />
        <NewInProducts />
        <PhotoAlbumsPrints />
         <BusinessNeeds />
        <GiftBanner />
         <VisionHomegrownSection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;