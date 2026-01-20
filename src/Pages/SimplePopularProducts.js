import React from "react";

const AttractivePopularProducts = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-popular-products-photo-books.webp";

  const popularProducts = [
    { 
      name: "Photo Albums",
      badge: "Best Seller",
      color: "from-blue-400 to-cyan-400"
    },
    { 
      name: "Name Pencils",
      badge: "Personalized",
      color: "from-yellow-400 to-orange-400"
    },
    { 
      name: "Mobile Cases",
      badge: "Trending",
      color: "from-purple-400 to-pink-400"
    },
    { 
      name: "Fridge Magnets",
      badge: "New Arrival",
      color: "from-red-400 to-pink-400"
    },
    { 
      name: "Photo Gallery Set",
      badge: "Premium",
      color: "from-green-400 to-emerald-400"
    },
    { 
      name: "Metal Name Plates",
      badge: "Elegant",
      color: "from-gray-400 to-indigo-400"
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-orange-50 to-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 opacity-40"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Animated Heading */}
        <div className="text-center mb-14">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              POPULAR
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent ml-3">
                PRODUCTS
              </span>
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm"></div>
          </div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Discover our most loved personalized items, crafted with premium materials and attention to detail
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularProducts.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 border border-white/20 backdrop-blur-sm">
                {/* Image Container with Overlay */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.color} shadow-lg`}>
                      {item.badge}
                    </span>
                  </div>
                  
                  {/* Number Indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-gray-900 font-bold text-sm">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-center relative">
                  {/* Animated Underline */}
                  <div className="relative inline-block">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                  
                  {/* Price Tag */}
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹{299 + index * 50}
                    </div>
                  </div>
                  
                  {/* Hover Action Button */}
                  <button className="mt-4 w-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-xl font-medium text-sm hover:shadow-xl">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-12 rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center space-x-3">
              <span>View All Products</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default AttractivePopularProducts;