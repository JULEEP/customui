import React from "react";

const PhotoAlbumsPrints = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-photo-books-premium-photo-books-v1.webp";

  const products = [
    {
      name: "Premium Photo Albums",
      price: "From ₹999/-",
      badge: "Best Quality",
      badgeColor: "from-indigo-500 to-purple-500"
    },
    {
      name: "Snapbooks",
      price: "From ₹399/-",
      badge: "Trending",
      badgeColor: "from-pink-500 to-rose-500"
    },
    {
      name: "Glossy Polaroid Prints",
      price: "From 30 @ ₹300/-",
      badge: "Best Seller",
      badgeColor: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 px-4 relative overflow-hidden">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 70 + 40}px`,
              height: `${Math.random() * 70 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Title with Claymorphism */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl px-10 py-4 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                PHOTO ALBUMS
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-3">
                  & PRINTS
                </span>
              </h1>
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff]"></div>
          </div>
        </div>

        {/* Products Grid with Claymorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
            >
              {/* Claymorphism Card */}
              <div className="relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform group-hover:-translate-y-2 border border-white/50">
                
                {/* Image Section with Claymorphism */}
                <div className="relative overflow-hidden">
                  <div className="h-56 bg-white/30 backdrop-blur-sm flex items-center justify-center p-6">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full max-h-44 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-3 left-3 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-sm"></div>
                  <div className="absolute bottom-3 right-3 w-12 h-12 bg-gradient-to-tl from-pink-400/20 to-orange-400/20 rounded-full blur-sm"></div>
                  
                  {/* Badge with Claymorphism */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${product.badgeColor} shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] border border-white/30`}>
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Product Info with Claymorphism */}
                <div className="p-6 text-center">
                  {/* Product Name */}
                  <div className="relative inline-block mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-3">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      {product.price}
                    </div>
                  </div>

                  {/* Hover Action Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-indigo-600 flex items-center justify-center space-x-1">
                      <span>Shop Now</span>
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-400/30 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button with Claymorphism */}
        <div className="text-center mt-12">
          <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-10 rounded-full shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-white/30">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-sm">Explore All Photo Albums</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-12px) rotate(2deg); 
          }
          66% { 
            transform: translateY(8px) rotate(-1deg); 
          }
        }
        
        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
        
        /* Custom drop shadow for images */
        .drop-shadow-lg {
          filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.02));
        }
      `}</style>
    </div>
  );
};

export default PhotoAlbumsPrints;