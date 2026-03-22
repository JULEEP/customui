import React from "react";

const AttractivePopularProducts = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-popular-products-photo-books.webp";

  const popularProducts = [
    { 
      name: "Photo Albums",
      badge: "Best Seller",
      color: "from-blue-500 to-cyan-500",
      price: 299
    },
    { 
      name: "Name Pencils",
      badge: "Personalized",
      color: "from-yellow-500 to-orange-500",
      price: 199
    },
    { 
      name: "Mobile Cases",
      badge: "Trending",
      color: "from-purple-500 to-pink-500",
      price: 349
    },
    { 
      name: "Fridge Magnets",
      badge: "New Arrival",
      color: "from-red-500 to-pink-500",
      price: 149
    },
    { 
      name: "Photo Frames",
      badge: "Premium",
      color: "from-green-500 to-emerald-500",
      price: 249
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 relative overflow-hidden">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading with Claymorphism */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl px-8 py-4 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                POPULAR
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-3">
                  PRODUCTS
                </span>
              </h2>
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff]"></div>
          </div>
        </div>

        {/* Cards Grid - 5 per row with Claymorphism */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularProducts.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
            >
              {/* Claymorphism Card */}
              <div className="relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform group-hover:-translate-y-2 border border-white/50">
                {/* Image Container */}
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Badge with Claymorphism */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.color} shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] border border-white/30`}>
                      {item.badge}
                    </span>
                  </div>
                  
                  {/* Number Indicator with Claymorphism */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff] border border-white/50">
                    <span className="text-gray-800 font-bold text-xs">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  {/* Product Name */}
                  <div className="relative inline-block mb-2">
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-2">
                    <div className="text-xs text-gray-600">From</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Hover Action Indicator */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-indigo-600">View Details →</span>
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
              <span className="text-sm">View All Products</span>
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
            transform: translateY(-15px) rotate(3deg); 
          }
          66% { 
            transform: translateY(10px) rotate(-2deg); 
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

export default AttractivePopularProducts;