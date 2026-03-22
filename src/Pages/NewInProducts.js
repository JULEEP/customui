import React from "react";

const NewInProducts = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-new-in-acrylic-writing-pads.webp";

  const newProducts = [
    {
      name: "Acrylic Writing Pads",
      originalPrice: "₹1,699/-",
      discountedPrice: "₹799/-",
      bgColor: "from-blue-500 to-cyan-500",
      badge: "Hot Deal",
      badgeColor: "from-red-500 to-orange-500"
    },
    {
      name: "Photo Lamps",
      originalPrice: "₹499/-",
      discountedPrice: "₹299/-",
      bgColor: "from-pink-500 to-rose-500",
      badge: "Limited Stock",
      badgeColor: "from-purple-500 to-pink-500"
    },
    {
      name: "Name Wallets",
      bgColor: "from-green-500 to-emerald-500",
      comingSoon: true,
      badge: "Coming Soon",
      badgeColor: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 px-4 relative overflow-hidden">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 70 + 30}px`,
              height: `${Math.random() * 70 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Heading with Claymorphism */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl px-10 py-4 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
                NEW
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-3">
                  IN
                </span>
              </h2>
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff]"></div>
          </div>
        </div>

        {/* Products Grid with Claymorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newProducts.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
            >
              {/* Claymorphism Card */}
              <div className="relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform group-hover:-translate-y-2 border border-white/50">
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  
                  {/* Badge with Claymorphism */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${product.badgeColor} shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] border border-white/30`}>
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  {/* Product Name */}
                  <div className="relative inline-block mb-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </div>

                  {/* Pricing */}
                  {product.comingSoon ? (
                    <div className="space-y-2">
                      <div className="inline-block px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] border border-white/50">
                        <span className="text-gray-700 font-medium text-sm">Coming Soon</span>
                      </div>
                      <div className="mt-3 text-gray-600 text-xs">Be the first to know!</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                        {product.discountedPrice}
                      </div>
                      <div className="text-gray-500 line-through text-base">
                        {product.originalPrice}
                      </div>
                      <div className="inline-block px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full">
                        <span className="text-green-700 text-xs font-semibold">Save ₹{parseInt(product.originalPrice.replace(/[^0-9]/g, '')) - parseInt(product.discountedPrice.replace(/[^0-9]/g, ''))}/-</span>
                      </div>
                    </div>
                  )}

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
              </div>
            </div>
          ))}
        </div>

        {/* View All Button with Claymorphism */}
        <div className="text-center mt-12">
          <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-10 rounded-full shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-white/30">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-sm">Explore All New Arrivals</span>
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
      `}</style>
    </div>
  );
};

export default NewInProducts;