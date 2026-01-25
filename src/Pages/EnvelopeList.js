import React from "react";
import { useNavigate } from "react-router-dom";

const EnvelopeList = () => {
  const navigate = useNavigate();
  
  const envelopeProducts = [
    { 
      id: 1, 
      name: "Premium A4 Envelope", 
      price: "₹950/-", 
      description: "High-quality premium A4 size envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 2, 
      name: "Standard DL Envelope", 
      price: "₹900/-", 
      description: "Standard DL size business envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 3, 
      name: "Corporate C4 Envelope", 
      price: "₹1,200/-", 
      description: "Corporate C4 size heavy-duty envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 4, 
      name: "Window Envelope", 
      price: "₹1,100/-", 
      description: "Window envelopes for invoices and statements",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 5, 
      name: "Colored Envelope Set", 
      price: "₹1,350/-", 
      description: "Set of 5 colored premium envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 6, 
      name: "Embossed Envelope", 
      price: "₹1,500/-", 
      description: "Luxury embossed envelopes with foil printing",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 7, 
      name: "Security Envelope", 
      price: "₹1,050/-", 
      description: "Security envelopes with privacy pattern",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 8, 
      name: "Eco-Friendly Envelope", 
      price: "₹1,250/-", 
      description: "Recycled eco-friendly paper envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 9, 
      name: "Custom Printed Envelope", 
      price: "From ₹1,400/-", 
      description: "Fully customized printed envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
    { 
      id: 10, 
      name: "Bulk Envelope Pack", 
      price: "₹4,500/-", 
      description: "Pack of 50 standard business envelopes",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
    },
  ];

  const handleProductClick = (productId) => {
    navigate(`/envelope/${productId}`);
  };

  const handleCustomizeClick = (productId, e) => {
    e.stopPropagation();
    navigate(`/envelope/${productId}/customize`);
  };

  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    alert(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ENVELOPES COLLECTION
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Premium quality envelopes for all your business needs. Custom printing available with your company logo and details.
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {envelopeProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
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
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={(e) => handleAddToCart(product.id, e)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
                    onClick={(e) => handleCustomizeClick(product.id, e)}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Need Custom Envelopes?
          </h2>
          <p className="mb-6 opacity-90">
            Get personalized envelopes with your company logo and information printed in high quality.
          </p>
          <button 
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/custom-envelope-design")}
          >
            Start Custom Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeList;