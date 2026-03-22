import React from "react";
import {
  RefreshCcw,
  Truck,
  BadgeCheck,
} from "lucide-react";

const VisionHomegrownSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 relative overflow-hidden">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
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

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Top Icons Row with Claymorphism - Dark Purple Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="flex flex-col items-center gap-4 group">
            <div className="relative">
              {/* Claymorphism Outer Ring */}
              <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] border border-white/50 flex items-center justify-center group-hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/60 to-gray-100/60 flex items-center justify-center shadow-inner">
                  <RefreshCcw size={32} className="text-purple-800 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              Easy 30-Day Return Policy
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 group">
            <div className="relative">
              {/* Claymorphism Outer Ring */}
              <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] border border-white/50 flex items-center justify-center group-hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/60 to-gray-100/60 flex items-center justify-center shadow-inner">
                  <Truck size={32} className="text-purple-800 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              Express Delivery
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 group">
            <div className="relative">
              {/* Claymorphism Outer Ring */}
              <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] border border-white/50 flex items-center justify-center group-hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/60 to-gray-100/60 flex items-center justify-center shadow-inner">
                  <BadgeCheck size={32} className="text-purple-800 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              100% Quality Assured
            </p>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* OUR VISION Card with Claymorphism */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-500 p-8 relative overflow-hidden border border-white/50 group">
            {/* Claymorphism Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-full"></div>
            
            {/* Background Pattern */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-2xl"></div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-6 relative z-10">
              <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                OUR VISION
              </span>
            </h3>

            <div className="space-y-5 relative z-10">
              <p className="text-gray-700 leading-relaxed text-lg">
                In line with our vision, we wish to be recognized as an
                organization renowned for its creative solutions,
                innovation, and quality.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                We also aim to re-calibrate the benchmark standards in
                designing and printing products tailored to meet the
                needs of a diverse customer base.
              </p>
            </div>

            {/* Decorative Icon with Claymorphism */}
            <div className="absolute bottom-6 right-6 text-indigo-300/30">
              <RefreshCcw size={80} className="group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full"></div>
          </div>

          {/* WE ARE HOMEGROWN Card with Claymorphism */}
          <div className="bg-gradient-to-br from-gray-800/90 via-purple-800/90 to-gray-900/90 backdrop-blur-md rounded-3xl p-8 text-white relative overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-500 border border-white/20 group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-purple-400 to-transparent rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-3">
                <span className="text-4xl drop-shadow-lg">🇮🇳</span>
                WE ARE <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">HOMEGROWN.</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <ul className="space-y-4">
                  {['Printing your memories since 2015', 'Everything is personalised'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover/item:scale-110 transition-transform">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-gray-200 text-lg group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>

                <ul className="space-y-4">
                  {['Guaranteed high quality products', 'Free delivery All Over India'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover/item:scale-110 transition-transform">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-gray-200 text-lg group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Section with Claymorphism */}
              <div className="border-t border-white/20 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "24 Lakh +", label: "Happy Customers" },
                  { value: "56704 +", label: "Google Reviews" },
                  { value: "57 Lakh +", label: "Products Delivered" },
                  { value: "50000 +", label: "5-Star Ratings" }
                ].map((stat, idx) => (
                  <div key={idx} className="group/stat">
                    <h4 className="text-2xl md:text-3xl font-bold mb-1 group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-orange-400 group-hover/stat:to-yellow-400 group-hover/stat:bg-clip-text transition-all duration-300">
                      {stat.value}
                    </h4>
                    <p className="text-purple-200 text-sm group-hover/stat:text-white transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

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

export default VisionHomegrownSection;