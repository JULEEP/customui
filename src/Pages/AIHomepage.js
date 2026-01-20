import React, { useState, useEffect } from 'react';

const AIHomepage = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentUser, setCurrentUser] = useState(0);
  const fullText = "Revolutionizing Patient Care with Intelligent Clinical Solutions";

  const userTypes = [
    { 
      type: "Patients", 
      description: "Get prescribed medicines delivered safely to your home",
      icon: "👨‍⚕️",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      type: "Pharmacies", 
      description: "Expand your reach with digital medicine delivery",
      icon: "🏪",
      color: "from-purple-500 to-pink-500"
    },
    { 
      type: "Doctors", 
      description: "Prescribe medicines digitally to your patients",
      icon: "🎓",
      color: "from-green-500 to-teal-500"
    },
    { 
      type: "Caregivers", 
      description: "Manage medications for your loved ones easily",
      icon: "🏥",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Medicine and pharmacy related icons for floating animation
  const pharmacyInstruments = [
    { icon: '💊', size: 'w-10 h-10', position: 'top-10 left-10', delay: 'delay-0' },
    { icon: '🏪', size: 'w-8 h-8', position: 'top-20 right-20', delay: 'delay-1000' },
    { icon: '🚚', size: 'w-9 h-9', position: 'bottom-20 left-20', delay: 'delay-2000' },
    { icon: '📦', size: 'w-7 h-7', position: 'bottom-10 right-10', delay: 'delay-1500' },
    { icon: '📋', size: 'w-8 h-8', position: 'top-1/3 left-1/4', delay: 'delay-500' },
    { icon: '🩺', size: 'w-6 h-6', position: 'bottom-1/3 right-1/4', delay: 'delay-2500' },
    { icon: '💡', size: 'w-9 h-9', position: 'top-1/4 right-1/3', delay: 'delay-3000' },
    { icon: '🔔', size: 'w-7 h-7', position: 'bottom-1/4 left-1/3', delay: 'delay-3500' }
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userInterval = setInterval(() => {
      setCurrentUser((prev) => (prev + 1) % userTypes.length);
    }, 3000);

    return () => clearInterval(userInterval);
  }, []);

  return (
    <div id="home" className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 pt-20 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Pharmacy Elements */}
      {pharmacyInstruments.map((instrument, index) => (
        <div
          key={index}
          className={`absolute ${instrument.position} ${instrument.size} bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-lg animate-float-slow ${instrument.delay} z-20`}
        >
          {instrument.icon}
        </div>
      ))}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Animated Main Heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-sm text-white/80 font-medium">Trusted by 50,000+ Customers Nationwide</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {animatedText}
                </span>
                <span className="animate-pulse text-white">|</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Clynix delivers authentic medicines, healthcare products, and expert pharmacy services 
                directly to your home. Fast, reliable, and completely secure medication management powered by advanced AI technology.
              </p>

              {/* Animated User Type */}
              <div className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className={`text-4xl transform transition-all duration-500 ${userTypes[currentUser].color}`}>
                  {userTypes[currentUser].icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">
                    Perfect for {userTypes[currentUser].type}
                  </div>
                  <div className="text-gray-400">
                    {userTypes[currentUser].description}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🚚', text: 'Fast Delivery', sub: 'Within 2 hours' },
                { icon: '💊', text: 'Authentic Medicines', sub: '100% genuine' },
                { icon: '🔒', text: 'Secure Payments', sub: 'Safe & encrypted' },
                { icon: '👨‍⚕️', text: 'Pharmacy Support', sub: '24/7 available' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  <div>
                    <div className="text-white font-semibold">{feature.text}</div>
                    <div className="text-gray-400 text-sm">{feature.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center justify-center transform hover:-translate-y-1">
                <i className="fas fa-shopping-cart mr-3 animate-pulse"></i>
                Order Medicines Now
                <i className="fas fa-arrow-right ml-3 transform group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-mobile-alt mr-3"></i>
                Download App
              </button>
            </div>
          </div>

          {/* Right Side - Advanced Glassmorphism Cards */}
          <div className="relative">
            {/* Main Interactive Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: '💊', title: 'Medicine Order', desc: 'Easy ordering', color: 'from-cyan-400 to-blue-500', pulse: true },
                  { icon: '🚚', title: 'Fast Delivery', desc: '2-hour service', color: 'from-purple-400 to-pink-500', pulse: false },
                  { icon: '📱', title: 'Mobile App', desc: 'Order anywhere', color: 'from-green-400 to-teal-500', pulse: true },
                  { icon: '👨‍⚕️', title: 'Pharmacy Chat', desc: 'Expert advice', color: 'from-orange-400 to-red-500', pulse: false },
                  { icon: '📋', title: 'Prescription', desc: 'Digital upload', color: 'from-indigo-400 to-purple-500', pulse: true },
                  { icon: '🔔', title: 'Refill Reminder', desc: 'Never run out', color: 'from-yellow-400 to-orange-500', pulse: false }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="text-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className={`relative w-20 h-20 mx-auto bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3 ${item.pulse ? 'animate-pulse' : ''}`}>
                      {item.icon}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-white font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Glass Elements */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-cyan-500/20 rounded-3xl blur-xl animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-3xl blur-xl animate-bounce delay-1000"></div>
            
            {/* Rotating Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
          </div>
        </div>

        {/* Advanced Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { number: '50K+', label: 'Happy Customers', icon: '😊', gradient: 'from-cyan-400 to-blue-500' },
            { number: '10K+', label: 'Medicines Available', icon: '💊', gradient: 'from-purple-400 to-pink-500' },
            { number: '2Hr', label: 'Delivery Promise', icon: '🚚', gradient: 'from-green-400 to-teal-500' },
            { number: '24/7', label: 'Pharmacy Support', icon: '🏪', gradient: 'from-orange-400 to-red-500' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-300 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-15px) rotate(3deg); 
          }
          66% { 
            transform: translateY(10px) rotate(-2deg); 
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AIHomepage;