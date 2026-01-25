import React from "react";
import { useNavigate } from "react-router-dom";

const VisitingCardList = () => {
  const navigate = useNavigate();
  
  const visitingCardProducts = [
    { 
      id: 1, 
      name: "Business Cards Standard", 
      price: "₹399/-", 
      originalPrice: "₹499/-",
      description: "Standard business cards with professional finish",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 2, 
      name: "Embossed Foil Business Cards", 
      price: "₹899/-", 
      originalPrice: "₹1099/-",
      description: "Premium business cards with embossed foil finish",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 3, 
      name: "Embossed Spot UV Business Cards", 
      price: "₹799/-", 
      originalPrice: "₹999/-",
      description: "Business cards with embossed spot UV coating",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 4, 
      name: "High Texture Luxury Visiting Cards", 
      price: "₹1299/-", 
      originalPrice: "₹1599/-",
      description: "Luxury visiting cards with high texture finish",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 5, 
      name: "Sandwich Business Card Printing", 
      price: "₹1499/-", 
      originalPrice: "₹1899/-",
      description: "Premium sandwich business cards with dual layers",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 6, 
      name: "Ultra Thick Business Cards", 
      price: "₹999/-", 
      originalPrice: "₹1299/-",
      description: "Ultra thick business cards for premium feel",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 7, 
      name: "Corporate Business Cards", 
      price: "₹599/-", 
      originalPrice: "₹749/-",
      description: "Professional corporate business cards",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 8, 
      name: "Eco-Friendly Business Cards", 
      price: "₹499/-", 
      originalPrice: "₹649/-",
      description: "Environment friendly recycled paper cards",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 9, 
      name: "Digital Business Cards", 
      price: "₹699/-", 
      originalPrice: "₹899/-",
      description: "Business cards with QR code and digital features",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      id: 10, 
      name: "Bulk Business Card Pack", 
      price: "₹2,999/-", 
      originalPrice: "₹3,999/-",
      description: "Pack of 1000 premium business cards",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
  ];

  const handleStartDesign = (productId = 1) => {
    navigate(`/visitingcard/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                BUSINESS CARD TEMPLATES
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Make a powerful first impression with professionally designed business cards. From standard to luxury finishes, we offer a wide range of options including embossed foil, spot UV, high texture, sandwich printing, and ultra thick cards to represent your brand with excellence.
              </p>
              <button 
                onClick={() => handleStartDesign(1)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Design
                <span className="text-xl">→</span>
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-purple-50 to-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
                    alt="Business Card Template"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visitingCardProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-purple-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-200 to-transparent opacity-30 rounded-tl-full"></div>
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                    Save ₹{parseInt(product.originalPrice.replace(/[^0-9]/g, '')) - parseInt(product.price.replace(/[^0-9]/g, ''))}
                  </div>
                )}
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
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
                
                {/* Original Price with Strikethrough */}
                {product.originalPrice && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                  </div>
                )}
                
                {/* Action Button - Only Start Design */}
                <div className="mt-6">
                  <button 
                    onClick={() => handleStartDesign(product.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Card Types Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            BUSINESS CARD TYPES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📇</span>
                </div>
                <h3 className="font-bold text-gray-900">Standard Cards</h3>
              </div>
              <p className="text-gray-600 text-sm">Professional business cards with standard finish, perfect for everyday use.</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">✨</span>
                </div>
                <h3 className="font-bold text-gray-900">Premium Cards</h3>
              </div>
              <p className="text-gray-600 text-sm">Embossed foil, spot UV, and luxury finishes for premium brand representation.</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">🏢</span>
                </div>
                <h3 className="font-bold text-gray-900">Corporate Cards</h3>
              </div>
              <p className="text-gray-600 text-sm">Professional corporate designs with company branding and professional finish.</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-6 border border-yellow-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">🌱</span>
                </div>
                <h3 className="font-bold text-gray-900">Eco-Friendly</h3>
              </div>
              <p className="text-gray-600 text-sm">Environmentally friendly cards made from recycled and sustainable materials.</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-6 border border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-lg">📱</span>
                </div>
                <h3 className="font-bold text-gray-900">Digital Cards</h3>
              </div>
              <p className="text-gray-600 text-sm">Modern cards with QR codes, NFC tags, and digital profile integration.</p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-white rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">📦</span>
                </div>
                <h3 className="font-bold text-gray-900">Bulk Orders</h3>
              </div>
              <p className="text-gray-600 text-sm">Cost-effective bulk packages for large organizations and corporate clients.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">💼</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">350-400 GSM card stock with professional finishing for lasting impression.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your business cards delivered within 3-5 business days across India.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-pink-600 text-xl">🎨</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Custom Design</h3>
            <p className="text-gray-600">Fully customizable designs to match your brand identity perfectly.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Design Your Business Card?
          </h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Create professional business cards that make a lasting impression. Choose from embossed foil, spot UV, high texture, sandwich printing, or ultra thick options.
          </p>
          <button 
            onClick={() => handleStartDesign(1)}
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Start Custom Design Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitingCardList;