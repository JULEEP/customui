import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessNeedsExact = () => {
  const navigate = useNavigate();
  
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";

  const products = [
    { name: "Prescription Pads", price: "From ₹750/-" },
    { name: "Bill Books", price: "From ₹750/-" },
    { name: "Letterheads", price: "From ₹600/-" },
    { name: "Cash Receipts", price: "From ₹750/-" },
    { name: "Payment Vouchers", price: "From ₹750/-" },
    { name: "Envelopes", price: "From ₹900/-" },
    { name: "Mousepads", price: "₹399/- ₹299/-" },
    { name: "Pen & Keychain", price: "₹599/- ₹399/-" },
    { name: "Metal Pens", price: "From ₹175/- Each*" },
    { name: "Name Pencils", price: "From ₹149/- Each Pack*" }
  ];

  const handleProductClick = (productName) => {
    if (productName === "Bill Books") {
      navigate("/billbooks");
    }
    // Add other product navigations here if needed
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          BUSINESS NEEDS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group"
              onClick={() => handleProductClick(product.name)}
            >
              {/* Card with exact PrintShoppy image style */}
              <div className={`bg-white rounded-2xl p-5 border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 ${
                product.name === "Bill Books" ? "cursor-pointer hover:border-blue-500" : ""
              }`}>
                
                {/* Image container like PrintShoppy */}
                <div className="mb-4 h-56 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden relative">
                  {/* Main image with exact positioning */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Gradient overlay corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-transparent opacity-30 rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-200 to-transparent opacity-30 rounded-tl-full"></div>
                </div>

                {/* Product info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessNeedsExact;