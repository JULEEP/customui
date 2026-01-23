import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PrintShoppySearch from "./PrintShoppySearch";
import SimplePopularProducts from "./SimplePopularProducts";
import NewInProducts from "./NewInProducts";
import PhotoAlbumsPrints from "./PhotoAlbumsPrints";
import BusinessNeeds from "./BusinessNeeds";
import GiftBanner from "./GiftBanner";
import VisionHomegrownSection from "./VisionHomegrownSection";
import BannerSliderPage from "./BannerSliderPage";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* ONLY Navbar Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main Content - NOT fixed */}
      <div className="pt-20 mt-8"> {/* pt-20 for navbar height */}
        <BannerSliderPage />
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