import React from "react";
import {
  RefreshCcw,
  Truck,
  BadgeCheck,
} from "lucide-react";

const VisionHomegrownSection = () => {
  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-white py-14 relative overflow-hidden">
      {/* Background Purple Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-100 to-pink-100 opacity-30"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Top Icons Row with Purple Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-full border-2 border-purple-100 bg-white flex items-center justify-center shadow-lg shadow-purple-200/50 group-hover:shadow-xl group-hover:shadow-purple-300/60 transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-white flex items-center justify-center shadow-inner">
                <RefreshCcw size={30} className="text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              Easy 30-Day Return Policy
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-full border-2 border-purple-100 bg-white flex items-center justify-center shadow-lg shadow-purple-200/50 group-hover:shadow-xl group-hover:shadow-purple-300/60 transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-white flex items-center justify-center shadow-inner">
                <Truck size={30} className="text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              Express Delivery
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-full border-2 border-purple-100 bg-white flex items-center justify-center shadow-lg shadow-purple-200/50 group-hover:shadow-xl group-hover:shadow-purple-300/60 transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-white flex items-center justify-center shadow-inner">
                <BadgeCheck size={30} className="text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <p className="text-gray-800 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
              100% Quality Assured
            </p>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* OUR VISION Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 relative overflow-hidden border border-purple-50">
            {/* Purple Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
            {/* Background Pattern */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20"></div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                OUR VISION
              </span>
            </h3>

            <div className="space-y-5 relative z-10">
              <p className="text-gray-600 leading-relaxed text-lg">
                In line with our vision, we wish to be recognized as an
                organization renowned for its creative solutions,
                innovation, and quality.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                We also aim to re-calibrate the benchmark standards in
                designing and printing products tailored to meet the
                needs of a diverse customer base.
              </p>
            </div>

            {/* Decorative Icon */}
            <div className="absolute bottom-6 right-6 text-purple-200 opacity-40">
              <RefreshCcw size={80} />
            </div>
          </div>

          {/* WE ARE HOMEGROWN Card */}
          <div className="rounded-2xl p-10 text-white bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-3">
                <span className="text-4xl">🇮🇳</span>
                WE ARE <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">HOMEGROWN.</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <ul className="space-y-4">
                  {['Printing your memories since 2015', 'Everything is personalised'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-gray-200 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                <ul className="space-y-4">
                  {['Guaranteed high quality products', 'Free delivery All Over India'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-gray-200 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Section */}
              <div className="border-t border-purple-700 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "24 Lakh +", label: "Happy Customers" },
                  { value: "56704 +", label: "Google Reviews" },
                  { value: "57 Lakh +", label: "Products Delivered" },
                  { value: "50000 +", label: "5-Star Ratings" }
                ].map((stat, idx) => (
                  <div key={idx} className="group">
                    <h4 className="text-3xl font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 group-hover:bg-clip-text transition-all duration-300">
                      {stat.value}
                    </h4>
                    <p className="text-purple-200 text-sm group-hover:text-white transition-colors duration-300">
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default VisionHomegrownSection;