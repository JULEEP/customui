import React, { useState, useEffect } from 'react';

const DownloadApp = () => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  const fullTitle = "Download Clynix Pharmacy App";
  
  const features = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Order medicines and get them delivered in under 2 hours',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: '💊',
      title: 'Medicine Orders',
      description: 'Easy prescription upload and medicine ordering process',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your medical data and prescriptions are completely secure',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: '👨‍⚕️',
      title: 'Pharmacy Support',
      description: '24/7 access to licensed pharmacists for consultations',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const appStats = [
    { number: '4.8', label: 'App Store Rating', icon: '⭐' },
    { number: '50K+', label: 'Downloads', icon: '📥' },
    { number: '95%', label: 'Satisfaction', icon: '😊' },
    { number: '2Hr', label: 'Delivery', icon: '🚚' }
  ];

  // Pharmacy floating icons
  const pharmacyFloatingIcons = [
    { icon: '💊', size: 'w-10 h-10', position: 'top-20 left-20', delay: 'delay-0' },
    { icon: '🏪', size: 'w-8 h-8', position: 'top-32 right-32', delay: 'delay-1000' },
    { icon: '🚚', size: 'w-9 h-9', position: 'bottom-32 left-32', delay: 'delay-2000' },
    { icon: '📦', size: 'w-7 h-7', position: 'bottom-20 right-20', delay: 'delay-1500' },
    { icon: '📱', size: 'w-8 h-8', position: 'top-1/2 left-1/4', delay: 'delay-500' },
    { icon: '🩺', size: 'w-6 h-6', position: 'bottom-1/3 right-1/4', delay: 'delay-2500' }
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setAnimatedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(featureInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 py-20 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Pharmacy Icons */}
      {pharmacyFloatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} ${item.size} bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-lg animate-float-slow ${item.delay} z-20`}
        >
          {item.icon}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            <span className="text-white/80 font-medium">Available on iOS & Android</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {animatedTitle}
            </span>
            <span className="animate-pulse text-white">|</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get your medicines delivered in 2 hours with our easy-to-use pharmacy app. 
            Order, track, and manage your medications from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 transition-all duration-500 transform ${
                    index === currentFeature ? 'scale-105 bg-white/15' : 'scale-100'
                  } hover:scale-105 hover:bg-white/15 group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${index === currentFeature ? 'animate-pulse' : ''}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {index === currentFeature && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              ))}
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {appStats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* App Store Button */}
                <button className="flex items-center justify-center space-x-3 bg-black/80 hover:bg-black/90 text-white py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 group border border-white/20 backdrop-blur-sm">
                  <div className="text-3xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping group-hover:animate-none"></div>
                </button>

                {/* Google Play Button */}
                <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 group border border-white/20 backdrop-blur-sm">
                  <div className="text-3xl">🤖</div>
                  <div className="text-left">
                    <div className="text-xs text-green-200">Get it on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping group-hover:animate-none"></div>
                </button>
              </div>

              {/* QR Code Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <h4 className="text-white font-semibold mb-3">Scan to Download</h4>
                <div className="bg-white p-4 rounded-xl inline-block transform hover:scale-105 transition-transform duration-300">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-4xl">
                    📲
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Point your camera at the QR code to download
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="relative">
            {/* Animated Phone Mockup */}
            <div 
              className={`relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-800 shadow-2xl transform transition-all duration-700 ${
                isPhoneHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
              }`}
              onMouseEnter={() => setIsPhoneHovered(true)}
              onMouseLeave={() => setIsPhoneHovered(false)}
            >
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
              
              {/* Phone Screen */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl overflow-hidden backdrop-blur-lg border border-white/10">
                {/* App Interface Simulation */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-sm">💊</span>
                      </div>
                      <span className="text-white font-bold">Clynix</span>
                    </div>
                    <div className="text-white text-sm">12:30</div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    {/* Welcome Message */}
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <h3 className="text-white font-bold text-lg mb-2">Welcome Back!</h3>
                      <p className="text-gray-300 text-sm">Your medicines are on the way!</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: '💊', label: 'Order', color: 'from-cyan-400 to-blue-500' },
                        { icon: '📋', label: 'Prescription', color: 'from-purple-400 to-pink-500' },
                        { icon: '🚚', label: 'Track', color: 'from-green-400 to-teal-500' },
                        { icon: '👨‍⚕️', label: 'Support', color: 'from-orange-400 to-red-500' }
                      ].map((action, index) => (
                        <div 
                          key={index}
                          className={`bg-gradient-to-r ${action.color} rounded-xl p-3 text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
                        >
                          <div className="text-2xl mb-1">{action.icon}</div>
                          <div className="text-white text-xs font-semibold">{action.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-3">Recent Orders</h4>
                      <div className="space-y-2">
                        {['Medicine Order - Delivered', 'Prescription Refill - In Progress', 'Vitamin Supplements - Preparing'].map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Status */}
                    <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-2">Delivery Status</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-cyan-600">🚚</span>
                        </div>
                        <div>
                          <div className="text-white text-sm">Out for delivery</div>
                          <div className="text-cyan-300 text-xs">ETA: 30 minutes</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Bar */}
                  <div className="flex justify-around pt-4 border-t border-white/10">
                    {['🏠', '🔍', '📦', '👤', '⚙️'].map((icon, index) => (
                      <button key={index} className="text-2xl text-gray-400 hover:text-white transition-colors duration-200">
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
            </div>

            {/* Floating Elements Around Phone */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-purple-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
            
            {/* App Icons Floating */}
            <div className="absolute -top-4 left-10 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-xl animate-float-slow">
              💊
            </div>
            <div className="absolute top-20 -right-4 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-lg animate-float-slow delay-500">
              🚚
            </div>
            <div className="absolute bottom-20 -left-4 w-11 h-11 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center text-lg animate-float-slow delay-1000">
              📱
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Trusted by 50,000+ Customers</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: '🔒', text: 'Secure Payments' },
                { icon: '🛡️', text: 'Data Protected' },
                { icon: '💊', text: 'Authentic Medicines' },
                { icon: '🚚', text: 'Fast Delivery' },
                { icon: '👨‍⚕️', text: 'Pharmacy Verified' }
              ].map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{badge.icon}</span>
                  <span className="text-white font-semibold">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-10px) rotate(2deg); 
          }
          66% { 
            transform: translateY(5px) rotate(-1deg); 
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DownloadApp;