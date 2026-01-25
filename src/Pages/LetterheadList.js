import React from "react";
import { useNavigate } from "react-router-dom";

const LetterheadList = () => {
  const navigate = useNavigate();
  
  const letterheadProducts = [
    { 
      id: 1, 
      name: "Premium Letterhead", 
      price: "₹600/-", 
      description: "High-quality premium letterheads for corporate use",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 2, 
      name: "Corporate Letterhead", 
      price: "₹750/-", 
      description: "Professional corporate letterheads with watermark",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 3, 
      name: "Executive Letterhead", 
      price: "₹900/-", 
      description: "Executive grade letterheads with embossed logo",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 4, 
      name: "Economy Letterhead", 
      price: "₹450/-", 
      description: "Budget-friendly letterheads for small businesses",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 5, 
      name: "Luxury Letterhead", 
      price: "₹1,200/-", 
      description: "Luxury letterheads with gold foil printing",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 6, 
      name: "Custom Letterhead", 
      price: "From ₹800/-", 
      description: "Fully customized letterheads with your design",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 7, 
      name: "Eco-Friendly Letterhead", 
      price: "₹550/-", 
      description: "Recycled paper letterheads for eco-conscious businesses",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 8, 
      name: "Legal Letterhead", 
      price: "₹950/-", 
      description: "Letterheads specifically designed for legal firms",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 9, 
      name: "Medical Letterhead", 
      price: "₹850/-", 
      description: "Letterheads for hospitals and medical clinics",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
    { 
      id: 10, 
      name: "Bulk Letterhead Pack", 
      price: "₹3,500/-", 
      description: "Pack of 100 standard letterheads",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
    },
  ];

  const handleStartDesign = (productId = 1) => {
    navigate(`/letterhead/${productId}`);
  };

  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    alert(`Added letterhead ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with image.png content */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                LETTERHEAD TEMPLATES
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                You cannot underestimate the importance of letterheads when it comes to representing your company, no matter what type of business you are running. Moreover, it conveys a positive impression of the company's professionalism to the customers or clients when they read the letters or conduct business with you.
              </p>
              <button 
                onClick={() => handleStartDesign(1)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Design
                <span className="text-xl">→</span>
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
                    alt="Letterhead Template"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {letterheadProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-72 bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-200 to-transparent opacity-30 rounded-tl-full"></div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {product.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                
                {/* Action Buttons - Only Start Design */}
                <div className="mt-6">
                  <button 
                    onClick={() => handleStartDesign(product.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">📄</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">High-quality paper with crisp printing for professional appearance.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your letterheads delivered within 5-7 business days.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">🎨</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Custom Design</h3>
            <p className="text-gray-600">Fully customizable designs to match your brand identity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterheadList;