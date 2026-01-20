import React, { useState, useEffect } from 'react';

const WhyChooseAlludeAI = () => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [activeReason, setActiveReason] = useState(0);
  
  const fullTitle = "Why Customers Choose Clynix Pharmacy";
  
  const reasons = [
    {
      icon: '🚚',
      title: 'Lightning Fast Delivery',
      description: 'Get your medicines delivered in under 2 hours with our optimized delivery network across the city.',
      gradient: 'from-cyan-400 to-blue-500',
      features: ['2-Hour Delivery Promise', 'Real-time Tracking', 'Same Day Service']
    },
    {
      icon: '💊',
      title: 'Authentic Medicines',
      description: '100% genuine medicines sourced directly from certified manufacturers and trusted pharmacies.',
      gradient: 'from-purple-400 to-pink-500',
      features: ['100% Genuine Products', 'Direct from Manufacturers', 'Quality Guaranteed']
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your medical data and prescriptions are protected with enterprise-grade security and privacy.',
      gradient: 'from-green-400 to-teal-500',
      features: ['Encrypted Data', 'Privacy Protected', 'Secure Payments']
    },
    {
      icon: '👨‍⚕️',
      title: 'Pharmacy Support',
      description: '24/7 access to licensed pharmacists for medication advice and consultation.',
      gradient: 'from-orange-400 to-red-500',
      features: ['24/7 Pharmacist Support', 'Medication Advice', 'Prescription Help']
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer, 2+ years",
      text: "Clynix has been a lifesaver for my monthly medications. The 2-hour delivery is incredible!",
      avatar: "😊"
    },
    {
      name: "Dr. Michael Chen",
      role: "Family Physician",
      text: "I recommend Clynix to all my patients for reliable medicine delivery and professional service.",
      avatar: "👨‍⚕️"
    },
    {
      name: "Robert Martinez",
      role: "Caregiver for elderly parents",
      text: "Managing multiple medications for my parents has never been easier. The refill reminders are perfect.",
      avatar: "👴"
    }
  ];

  // Pharmacy floating icons
  const pharmacyFloatingIcons = [
    { icon: '💊', size: 'w-10 h-10', position: 'top-20 left-20', delay: 'delay-0' },
    { icon: '🏪', size: 'w-8 h-8', position: 'top-32 right-32', delay: 'delay-1000' },
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
    const reasonInterval = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasons.length);
    }, 5000);

    return () => clearInterval(reasonInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 pt-20 overflow-hidden relative">
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
            <span className="text-white/80 font-medium">Trusted by 50,000+ Customers Nationwide</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {animatedTitle}
            </span>
            <span className="animate-pulse text-white">|</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Clynix for fast, reliable, and secure medicine delivery. 
            Experience healthcare convenience like never before.
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${
                index === activeReason ? 'scale-105' : 'scale-100'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 h-full">
                {/* Icon and Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${reason.gradient} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${index === activeReason ? 'animate-pulse' : ''}`}>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {reason.description}
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  {reason.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 group">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active State Glow */}
              {index === activeReason && (
                <div className={`absolute inset-0 bg-gradient-to-r ${reason.gradient} rounded-3xl blur-xl opacity-30 animate-pulse -z-10`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Comparative Advantage Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              See the{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Clynix Advantage
              </span>
            </h3>
            <p className="text-gray-300 text-lg">
              Compare how we provide better service than traditional pharmacies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                metric: 'Delivery Time',
                clynix: '2 hours',
                traditional: '1-2 days',
                improvement: '90% faster',
                color: 'text-green-400'
              },
              {
                metric: 'Availability',
                clynix: '24/7 Service',
                traditional: 'Limited hours',
                improvement: 'Always available',
                color: 'text-green-400'
              },
              {
                metric: 'Convenience',
                clynix: 'Home Delivery',
                traditional: 'Visit store',
                improvement: 'No travel needed',
                color: 'text-green-400'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-white mb-4">{item.metric}</div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 rounded-xl">
                    <div className="text-cyan-400 font-bold text-lg">Clynix</div>
                    <div className="text-white text-xl font-semibold">{item.clynix}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="text-gray-400">Traditional Pharmacy</div>
                    <div className="text-gray-300">{item.traditional}</div>
                  </div>
                  <div className={`text-sm font-semibold ${item.color}`}>
                    {item.improvement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex space-x-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience Better Pharmacy Service?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of customers who trust Clynix for fast, reliable medicine delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center justify-center transform hover:-translate-y-1">
                <i className="fas fa-shopping-cart mr-3"></i>
                Order Medicines Now
              </button>
              <button className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-mobile-alt mr-3"></i>
                Download App
              </button>
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

export default WhyChooseAlludeAI;