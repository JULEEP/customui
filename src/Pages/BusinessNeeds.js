import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessNeedsExact = () => {
  const navigate = useNavigate();
  
  // Updated products array with correct images including Wedding Cards
  const products = [
    { 
      name: "Prescription Pads", 
      price: "From ₹750/-",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      name: "Bill Books", 
      price: "From ₹750/-",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp"
    },
    { 
      name: "Notepad", 
      price: "From ₹750/-",
      image: "https://rendering.mcp.cimpress.com/v2/vp/preview?category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3Dtrue%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-VSYISJHX%252F19%252Ftemplates%252Fs5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%253Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7%253Fculture%253Den-us%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255Bbackside%25255D%253DCardboard%2526optionSelections%25255Bsize%25255D%253D4%2522%2Bx%2B5.5%2522%2526optionSelections%25255BProduct%2BOrientation%25255D%253DVertical&merchant_metadata=s5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%3Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fscenes%3Agenerate%3Fdata%3DrY%252FBasMwEET%252FZc7CSGlSgr6hlEJ6Kzko1mKL2pKR1iSp0b8XyabtpfTSyzIzaGefFlyd5R768eEo0JPreoY%252B7vYCaQgMvWAyHUErgdGk9xLwfSJocHQjchZog2e61bepNzZci2rDEGIREVoKdHVe6jTQ6iCzgPHdQDWyLrHx7WqS%252Byiikaq0TzHYua3tGyqUakd800Ltm11N0nxJHA3TD8zn4AlZrLgVzHOYY4J%252BW9AOIZGF5jiTQGIT%252BSU4X6%252FdoCEbdajN9%252FWMLG77cpjjibqRPK9d270n5%252Bk1QIC8%252Fb1rMzmLvxeVbI7%252FsfnFn8%252F5nHP%252BBA%253D%253D&width=1236&showerr=true&bgcolor=f3f3f3"
    }, 
    { 
      name: "Wedding Cards", 
      price: "From ₹850/-",
      image: "data:image/webp;base64,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"
    }
  ];

  const handleProductClick = (productName) => {
    if (productName === "Bill Books") {
      navigate("/billbooks");
    } else if (productName === "Envelopes") {
      navigate("/envelopes");
    } else if (productName === "Letterheads") {
      navigate("/letterheads");
    } else if (productName === "Visiting Cards") {
      navigate("/visitingcards");
    } else if (productName === "Prescription Pads") {
      navigate("/prescriptionpads");
    } else if (productName === "Cash Receipts") {
      navigate("/receipts");
    } else if (productName === "Wedding Cards") {
      navigate("/weddingcards");
    }
  };

  const handleBannerClick = () => {
    navigate("/flex-items");
  };

  const handleCapsuleClick = () => {
    navigate("/flex");
  };

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 px-4 relative overflow-hidden">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading with Claymorphism */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl px-10 py-4 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                BUSINESS
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-3">
                  NEEDS
                </span>
              </h2>
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff]"></div>
          </div>
        </div>

        {/* Banner Section with Claymorphism */}
        <div 
          className="mb-12 cursor-pointer transform hover:scale-105 transition-all duration-500"
          onClick={handleBannerClick}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300">
            <img
              src="https://trbahadurpur.com/wp-content/uploads/2023/05/SCHOOL-BANNER-10052023.jpg"
              alt="School Banner - Alpha Education Centre"
              className="w-full h-auto object-cover"
            />
            {/* Overlay with click indicator */}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-bold text-lg shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300">
                Click to View All Flex Items →
              </div>
            </div>
          </div>
        </div>

        {/* ADD DESIGN Button - Right Side */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/add-design")}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {/* Animated background effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            
            {/* Plus icon */}
            <span className="text-xl font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            
            {/* Text */}
            <span className="text-sm md:text-base tracking-wide">ADD DESIGN</span>
            
            {/* Arrow icon */}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </button>
        </div>

        {/* Products Grid with Claymorphism */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.name)}
            >
              {/* Claymorphism Card */}
              <div className="relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform group-hover:-translate-y-2 border border-white/50">
                
                {/* Image Container */}
                <div className="mb-4 h-56 bg-gradient-to-br from-white/60 to-gray-100/60 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Decorative gradient corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-tl-full"></div>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 mx-auto"></div>
              </div>
            </div>
          ))}
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
        
        /* Hide scrollbar but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BusinessNeedsExact;