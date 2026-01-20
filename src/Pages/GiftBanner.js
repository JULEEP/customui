import React from "react";

const GiftBanner = () => {
  const bannerImage =
    "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-gifting-banner-v1-d.webp";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div
        className="relative rounded-2xl overflow-hidden bg-cover bg-center min-h-[280px] md:min-h-[320px]"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Overlay content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-xl px-8 md:px-12">
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftBanner;
