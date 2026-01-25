import React from "react";
import { useNavigate } from "react-router-dom";

const CashReceiptList = () => {
  const navigate = useNavigate();
  
  const cashReceiptProducts = [
    { 
      id: 1, 
      name: "Standard Cash Receipt", 
      price: "₹750/-", 
      description: "Standard cash receipts for daily business transactions",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 2, 
      name: "Premium Cash Receipt", 
      price: "₹950/-", 
      description: "Premium quality cash receipts with better paper",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 3, 
      name: "Duplicate Cash Receipt", 
      price: "₹1,200/-", 
      description: "Duplicate cash receipts with carbon copy",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 4, 
      name: "Triplicate Cash Receipt", 
      price: "₹1,500/-", 
      description: "Triplicate cash receipts for record keeping",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 5, 
      name: "Custom Cash Receipt", 
      price: "From ₹1,000/-", 
      description: "Customized cash receipts with your company details",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 6, 
      name: "Numbered Cash Receipt", 
      price: "₹1,100/-", 
      description: "Pre-numbered cash receipts for security",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 7, 
      name: "Carbonless Cash Receipt", 
      price: "₹1,300/-", 
      description: "Carbonless cash receipts for clean copies",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 8, 
      name: "Bulk Cash Receipt Pack", 
      price: "₹3,500/-", 
      description: "Pack of 500 cash receipts",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 9, 
      name: "Shop Cash Receipt", 
      price: "₹850/-", 
      description: "Cash receipts for retail shops and stores",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      id: 10, 
      name: "Office Cash Receipt", 
      price: "₹900/-", 
      description: "Professional cash receipts for offices",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
  ];

  const handleStartDesign = (productId = 1) => {
    navigate(`/receipt/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                CASH RECEIPT TEMPLATES
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Professional cash receipts for maintaining proper financial records. Whether you need standard, duplicate, triplicate, or custom receipts, we offer a wide range of options to suit your business needs. Perfect for shops, offices, and all types of businesses.
              </p>
              <button 
                onClick={() => handleStartDesign(1)}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Design
                <span className="text-xl">→</span>
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-orange-50 to-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
                    alt="Cash Receipt Template"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cashReceiptProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-orange-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-200 to-transparent opacity-30 rounded-tl-full"></div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
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
                
                {/* Action Button - Only Start Design */}
                <div className="mt-6">
                  <button 
                    onClick={() => handleStartDesign(product.id)}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Receipt Types Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            RECEIPT TYPES FOR BUSINESS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-lg">📄</span>
                </div>
                <h3 className="font-bold text-gray-900">Single Copy</h3>
              </div>
              <p className="text-gray-600 text-sm">Standard single copy receipts for basic transactions.</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-white rounded-xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-lg">📋</span>
                </div>
                <h3 className="font-bold text-gray-900">Duplicate</h3>
              </div>
              <p className="text-gray-600 text-sm">Duplicate receipts with carbon copy for customer and business.</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-6 border border-yellow-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">📑</span>
                </div>
                <h3 className="font-bold text-gray-900">Triplicate</h3>
              </div>
              <p className="text-gray-600 text-sm">Triplicate receipts for detailed record keeping.</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg">🔢</span>
                </div>
                <h3 className="font-bold text-gray-900">Numbered</h3>
              </div>
              <p className="text-gray-600 text-sm">Pre-numbered receipts for security and tracking.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-orange-600 text-xl">💰</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Professional Design</h3>
            <p className="text-gray-600">Clean, professional layouts with all necessary financial fields.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your cash receipts delivered within 5-7 business days.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🎨</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Custom Details</h3>
            <p className="text-gray-600">Add your company name, address, phone, logo, and tax details.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Design Your Cash Receipts?
          </h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Create professional cash receipts that ensure proper financial documentation. Customize with your company details, choose paper quality, and select copy options.
          </p>
          <button 
            onClick={() => handleStartDesign(1)}
            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Start Custom Design Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashReceiptList;