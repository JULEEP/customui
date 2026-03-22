import React from "react";

const GiftBanner = () => {
  const bannerImage =
    "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-gifting-banner-v1-d.webp";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div
        className="relative rounded-3xl overflow-hidden bg-cover bg-center min-h-[280px] md:min-h-[320px] shadow-[20px_20px_40px_#b8b9be,_-20px_-20px_40px_#ffffff]"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Simple overlay - just for depth, no text */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative Corner Elements - Minimal */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/40 rounded-tl-2xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/40 rounded-br-2xl"></div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-12px) rotate(3deg); 
          }
          66% { 
            transform: translateY(8px) rotate(-2deg); 
          }
        }
        
        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
};

export default GiftBanner;