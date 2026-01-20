import React, { useState, useEffect } from 'react';

const ContactUs = () => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [currentContact, setCurrentContact] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const fullTitle = "Get in Touch with Clynix Pharmacy";
  
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us an email anytime for medicine orders or support',
      details: 'simcurarx@gmail.com',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with our pharmacy support team',
      details: '+91 8309056333',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant answers from our pharmacy assistants',
      details: 'Available 24/7',
      gradient: 'from-green-400 to-teal-500'
    },
  ];

  const faqs = [
    {
      question: 'How fast is your medicine delivery?',
      answer: 'We guarantee 2-hour delivery for all medicine orders in service areas.'
    },
    {
      question: 'Are your medicines authentic?',
      answer: 'Yes, all medicines are sourced from licensed pharmacies and verified for authenticity.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'We work with major insurance providers and offer flexible payment options.'
    },
    {
      question: 'Can I upload my prescription digitally?',
      answer: 'Yes, you can easily upload prescriptions through our app or website.'
    }
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
    const contactInterval = setInterval(() => {
      setCurrentContact((prev) => (prev + 1) % contactMethods.length);
    }, 3000);

    return () => clearInterval(contactInterval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
            <span className="text-white/80 font-medium">We're Here to Help You 24/7</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {animatedTitle}
            </span>
            <span className="animate-pulse text-white">|</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about medicine delivery, prescriptions, or our pharmacy services?
            Our team is ready to provide fast and reliable support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl border border-white/10 transition-all duration-500 transform ${
                      index === currentContact ? 'scale-105 bg-white/10' : 'bg-white/5'
                    } hover:scale-105 hover:bg-white/10 group`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center text-xl text-white transform group-hover:scale-110 transition-transform duration-300 ${index === currentContact ? 'animate-pulse' : ''}`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{method.title}</h4>
                        <p className="text-cyan-400 font-medium">{method.details}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mt-3">
                      {method.description}
                    </p>
                    {index === currentContact && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                        {faq.question}
                      </h4>
                      <span className="text-cyan-400 transform group-hover:rotate-180 transition-transform duration-300">
                        ▼
                      </span>
                    </div>
                    <p className="text-gray-300 mt-2 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '24/7', label: 'Pharmacy Support', icon: '🏪' },
                { number: '2h', label: 'Delivery Promise', icon: '🚚' },
                { number: '95%', label: 'Satisfaction Rate', icon: '⭐' },
                { number: '50K+', label: 'Happy Customers', icon: '😊' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form (Compact Height) */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 h-fit">
            <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
            <p className="text-gray-300 mb-6">We'll get back to you as soon as possible</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-white font-medium mb-2 group-hover:text-cyan-300 transition-colors duration-300 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-white font-medium mb-2 group-hover:text-cyan-300 transition-colors duration-300 text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-white font-medium mb-2 group-hover:text-cyan-300 transition-colors duration-300 text-sm">
                  Subject *
                </label>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 focus:bg-gradient-to-r focus:from-cyan-500/30 focus:to-purple-600/30 transition-all duration-300 backdrop-blur-sm text-sm appearance-none"
                  >
                    <option value="" className="bg-gray-800">Select a topic</option>
                    <option value="order" className="bg-gray-800">Medicine Order</option>
                    <option value="delivery" className="bg-gray-800">Delivery Inquiry</option>
                    <option value="prescription" className="bg-gray-800">Prescription Help</option>
                    <option value="support" className="bg-gray-800">Customer Support</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-white font-medium mb-2 group-hover:text-cyan-300 transition-colors duration-300 text-sm">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                  placeholder="Tell us about your medicine needs or any questions..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center group text-sm"
              >
                <i className="fas fa-paper-plane mr-2 transform group-hover:translate-x-1 transition-transform"></i>
                Send Message
              </button>

              <p className="text-gray-400 text-xs text-center">
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </div>
        </div>

        {/* Privacy Contact Banner */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-6 border border-cyan-400/30 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-white">Privacy & Data Protection</h3>
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            For any privacy-related concerns or inquiries, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-white font-bold text-lg bg-green-500/20 px-4 py-2 rounded-xl border border-green-400/50">
              📧 Email: simcurarx@gmail.com
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            We take your privacy seriously and handle all personal and medical data with the utmost care.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
            <i className="fas fa-shopping-cart mr-2"></i>
            Order Medicines Now
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/20">
            <i className="fas fa-mobile-alt mr-2"></i>
            Download App
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/20">
            <i className="fas fa-question-circle mr-2"></i>
            Track Order
          </button>
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

export default ContactUs;