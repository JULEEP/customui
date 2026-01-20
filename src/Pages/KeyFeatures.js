import React, { useState, useEffect } from 'react';

const KeyFeatures = () => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const fullTitle = "Smart Pharmacy Solutions for Modern Healthcare";
  
  const features = [
    {
      icon: '💊',
      title: 'Smart Medicine Ordering',
      description: 'AI-powered prescription management and automatic refill reminders',
      gradient: 'from-cyan-400 to-blue-500',
      stats: '10K+ Medicines'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery Network',
      description: '2-hour medicine delivery with real-time tracking and updates',
      gradient: 'from-purple-400 to-pink-500',
      stats: '2-Hour Delivery'
    },
    {
      icon: '📱',
      title: 'Mobile App Access',
      description: 'Order medicines anywhere, anytime with our intuitive mobile application',
      gradient: 'from-green-400 to-teal-500',
      stats: '50K+ Downloads'
    },
    {
      icon: '🔒',
      title: 'Secure & Compliant',
      description: 'HIPAA compliant pharmacy services with encrypted data protection',
      gradient: 'from-orange-400 to-red-500',
      stats: '100% Secure'
    },
    {
      icon: '👨‍⚕️',
      title: 'Pharmacy Support',
      description: '24/7 access to licensed pharmacists for medication consultations',
      gradient: 'from-indigo-400 to-purple-500',
      stats: '24/7 Support'
    },
    {
      icon: '📋',
      title: 'Digital Prescriptions',
      description: 'Upload and manage prescriptions digitally with AI validation',
      gradient: 'from-yellow-400 to-orange-500',
      stats: 'Auto-Validation'
    }
  ];

  // Pharmacy-related floating elements
  const pharmacyInstruments = [
    { icon: '💊', size: 'w-10 h-10', position: 'top-10 left-10', delay: 'delay-0' },
    { icon: '🏪', size: 'w-8 h-8', position: 'top-20 right-20', delay: 'delay-1000' },
    { icon: '🚚', size: 'w-9 h-9', position: 'bottom-20 left-20', delay: 'delay-2000' },
    { icon: '📦', size: 'w-7 h-7', position: 'bottom-10 right-10', delay: 'delay-1500' },
    { icon: '📱', size: 'w-8 h-8', position: 'top-1/3 left-1/4', delay: 'delay-500' },
    { icon: '🩺', size: 'w-6 h-6', position: 'bottom-1/3 right-1/4', delay: 'delay-2500' },
    { icon: '💡', size: 'w-9 h-9', position: 'top-1/4 right-1/3', delay: 'delay-3000' },
    { icon: '🔔', size: 'w-7 h-7', position: 'bottom-1/4 left-1/3', delay: 'delay-3500' }
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
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            <span className="text-white/80 font-medium">Powered by Clynix Pharmacy Network</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {animatedTitle}
            </span>
            <span className="animate-pulse text-white">|</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive pharmacy services powered by advanced technology for fast, 
            reliable, and secure medicine delivery right to your doorstep.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 h-full">
                {/* Animated Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${index === currentFeature ? 'animate-pulse' : ''}`}>
                    {feature.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                </div>

                {/* Feature Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-cyan-400 font-semibold text-sm">{feature.stats}</span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Demo Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Experience{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Seamless Pharmacy
                </span>
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                See how Clynix transforms medicine ordering and delivery with intelligent technology and fast service.
              </p>

              {/* Feature Showcase */}
              <div className="space-y-4">
                {[
                  'Fast 2-hour medicine delivery',
                  'Digital prescription management',
                  'Real-time order tracking',
                  '24/7 pharmacy support'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform hover:-translate-y-1 flex items-center">
                <i className="fas fa-play mr-3"></i>
                See How It Works
              </button>
            </div>

            {/* Right Side - Animated Visualization */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">Order Processing</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
                
                {/* Animated Progress Bars */}
                <div className="space-y-3">
                  {['Order Processing', 'Pharmacy Verification', 'Delivery Dispatch', 'Customer Satisfaction'].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>{item}</span>
                        <span className="text-cyan-400 font-semibold">
                          {['98.7%', '99.2%', '96.8%', '95.5%'][index]}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: ['98.7%', '99.2%', '96.8%', '95.5%'][index],
                            animation: `growWidth 2s ease-out ${index * 0.2}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: '50K+', label: 'Happy Customers', icon: '😊' },
            { number: '10K+', label: 'Medicines Available', icon: '💊' },
            { number: '2Hr', label: 'Delivery Promise', icon: '🚚' },
            { number: '24/7', label: 'Pharmacy Support', icon: '🏪' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
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
        @keyframes growWidth {
          from { width: 0%; }
          to { width: var(--target-width); }
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
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default KeyFeatures;