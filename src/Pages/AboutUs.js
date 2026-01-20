import React, { useState, useEffect } from 'react';

const AboutAlludeAI = () => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [currentMilestone, setCurrentMilestone] = useState(0);
  
  const fullTitle = "Revolutionizing Pharmacy Services Through Technology";
  
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Clynix was founded by healthcare entrepreneurs with a vision to make medicine delivery fast, reliable, and accessible to everyone.',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'First Service Launch',
      description: 'Launched our 2-hour medicine delivery service in major metropolitan areas with 100+ pharmacy partners.',
      icon: '💊'
    },
    {
      year: '2022',
      title: 'National Expansion',
      description: 'Expanded to 50+ cities across the country and served over 100,000 satisfied customers.',
      icon: '🏪'
    },
    {
      year: '2023',
      title: 'Mobile App & AI',
      description: 'Launched our mobile app with AI-powered features and reached 500,000+ medicine deliveries.',
      icon: '📱'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      expertise: 'Healthcare Technology & Operations',
      avatar: '👩‍💼',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Medical Director',
      expertise: 'Pharmacy Services & Medication Safety',
      avatar: '👨‍⚕️',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Raj Patel',
      role: 'Head of Operations',
      expertise: 'Logistics & Delivery Network',
      avatar: '👨‍💻',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      name: 'Emily Davis',
      role: 'Technology Director',
      expertise: 'Mobile Platforms & Security',
      avatar: '👩‍🔬',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const values = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'We guarantee 2-hour medicine delivery because we understand that health cannot wait.'
    },
    {
      icon: '💊',
      title: 'Quality Assurance',
      description: 'Every medicine is sourced from licensed pharmacies and verified for authenticity and quality.'
    },
    {
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'Your medical information and prescriptions are protected with the highest security standards.'
    },
    {
      icon: '👥',
      title: 'Customer First',
      description: 'We prioritize customer needs with 24/7 support and personalized medication management.'
    }
  ];

  // Pharmacy floating elements
  const pharmacyFloatingIcons = [
    { icon: '💊', size: 'w-10 h-10', position: 'top-20 left-20', delay: 'delay-0' },
    { icon: '🏪', size: 'w-8 h-8', position: 'top-32 right-32', delay: 'delay-1000' },
    { icon: '🚚', size: 'w-9 h-9', position: 'bottom-32 left-32', delay: 'delay-2000' },
    { icon: '📦', size: 'w-7 h-7', position: 'bottom-20 right-20', delay: 'delay-1500' },
    { icon: '📱', size: 'w-8 h-8', position: 'top-1/2 left-1/4', delay: 'delay-500' },
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
    const milestoneInterval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % milestones.length);
    }, 4000);

    return () => clearInterval(milestoneInterval);
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
            <span className="text-white/80 font-medium">Delivering Health Since 2020</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {animatedTitle}
            </span>
            <span className="animate-pulse text-white">|</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Clynix was born from a simple yet powerful mission: to make healthcare accessible by delivering 
            authentic medicines to your doorstep with unprecedented speed and reliability.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                🎯
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To provide fast, reliable, and secure medicine delivery that enhances healthcare accessibility 
              and improves the lives of our customers through innovative technology and exceptional service.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                🔭
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              A future where everyone has instant access to authentic medicines and professional pharmacy 
              services, making healthcare convenient and stress-free for individuals and families everywhere.
            </p>
          </div>
        </div>

        {/* Our Journey - Timeline */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <p className="text-gray-300 text-lg">
              From startup to trusted pharmacy delivery partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-500 transform ${
                  index === currentMilestone ? 'scale-105 bg-white/10' : 'scale-100'
                } hover:scale-105 hover:bg-white/10 group`}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {milestone.icon}
                </div>
                <div className="text-cyan-400 font-bold text-2xl mb-2">{milestone.year}</div>
                <div className="text-white font-semibold text-lg mb-3">{milestone.title}</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {milestone.description}
                </p>
                {index === currentMilestone && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Leadership Team
              </span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming pharmacy services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group text-center"
              >
                <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {member.avatar}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{member.name}</h4>
                <div className="text-cyan-400 font-semibold mb-2">{member.role}</div>
                <div className="text-gray-300 text-sm">{member.expertise}</div>
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Core Values
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">{value.title}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Join Us in Transforming Pharmacy Services
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Experience the future of medicine delivery. Fast, reliable, and secure pharmacy services at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center justify-center transform hover:-translate-y-1">
                <i className="fas fa-shopping-cart mr-3"></i>
                Order Medicines Now
              </button>
              <button className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-mobile-alt mr-3"></i>
                Download Our App
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

export default AboutAlludeAI;
