import React, { useState, useEffect } from 'react';

const AutoSliderBanner = () => {
  const bannerImages = [
    "https://th.bing.com/th/id/OIP.rNvyXj99pYvceYwb2tlTLQHaDG?w=1000&h=400&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.rNvyXj99pYvceYwb2tlTLQHaDG?w=1000&h=400&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.rNvyXj99pYvceYwb2tlTLQHaDG?w=1000&h=400&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.rNvyXj99pYvceYwb2tlTLQHaDG?w=1000&h=400&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? bannerImages.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
  };

  const capsuleItems = [
    {
      icon: "💰",
      title: "Get Great Discounts",
      description: "Save more with our special offers"
    },
    {
      icon: "🚚",
      title: "Next Day Delivery",
      description: "Delivering to your doorstep"
    },
    {
      icon: "🤝",
      title: "Our Promise",
      description: "To make you happy with your order"
    }
  ];

  return (
    <div className="relative">
      {/* बैनर - हाइट कम की */}
      <div className="relative w-full overflow-hidden h-[300px]">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((img, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img 
                src={img} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={goToPrevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={goToNextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* कैप्सूल डिव - ऊपर उठाया हुआ */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -top-10">
          <div className="bg-white rounded-full shadow-lg border border-gray-300 p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
            {capsuleItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center p-4 ${
                  index < capsuleItems.length - 1 ? 'md:border-r md:border-gray-200' : ''
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-600 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSliderBanner;