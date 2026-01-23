import React from "react";

const AttractivePopularProducts = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-popular-products-photo-books.webp";

  const popularProducts = [
    { 
      name: "Photo Albums",
      badge: "Best Seller",
      color: "from-blue-400 to-cyan-400",
      price: 299
    },
    { 
      name: "Name Pencils",
      badge: "Personalized",
      color: "from-yellow-400 to-orange-400",
      price: 199
    },
    { 
      name: "Mobile Cases",
      badge: "Trending",
      color: "from-purple-400 to-pink-400",
      price: 349
    },
    { 
      name: "Fridge Magnets",
      badge: "New Arrival",
      color: "from-red-400 to-pink-400",
      price: 149
    },
    { 
      name: "Photo Frames",
      badge: "Premium",
      color: "from-green-400 to-emerald-400",
      price: 249
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-orange-50 to-white py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 opacity-30"
            style={{
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Animated Heading */}
        <div className="text-center mb-10">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              POPULAR
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent ml-3">
                PRODUCTS
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm">
            Discover our most loved personalized items, crafted with premium materials
          </p>
        </div>

        {/* Cards Grid - 5 per row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularProducts.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100">
                {/* Image Container */}
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.color} shadow-sm`}>
                      {item.badge}
                    </span>
                  </div>
                  
                  {/* Number Indicator */}
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-gray-900 font-bold text-xs">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 text-center">
                  {/* Product Name */}
                  <div className="relative inline-block mb-1">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">From</div>
                    <div className="text-base font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹{item.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="group relative bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-2.5 px-8 rounded-full hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-xs">View All Products</span>
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default AttractivePopularProducts;