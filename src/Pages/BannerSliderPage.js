import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaGift, FaRing, FaCandyCane } from "react-icons/fa";

const BannerSliderPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideIntervalRef = useRef(null);
  const sliderRef = useRef(null);

  // Updated slides with Valentine's theme
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80",
      title: "Valentine's Day",
      subtitle: "Special Collection",
      description: "Surprise Your Special One With The Perfect Valentine's Day Gift",
      buttonText: "Shop Now",
      icon: <FaHeart className="text-pink-500" />
    },
    {
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80",
      title: "Romantic Bouquets",
      subtitle: "Flower Collection",
      description: "Express Your Love With Beautiful Flower Arrangements",
      buttonText: "Shop Flowers",
      icon: <FaGift className="text-red-500" />
    },
    {
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80",
      title: "Love Coupons",
      subtitle: "Custom Vouchers",
      description: "Create Personalized Love Coupons For Your Partner",
      buttonText: "Create Now",
      icon: <FaRing className="text-pink-600" />
    },
    {
      image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80",
      title: "Sweet Treats",
      subtitle: "Chocolate Collection",
      description: "Indulge In Premium Chocolates & Candies",
      buttonText: "Explore",
      icon: <FaCandyCane className="text-red-400" />
    }
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (isAutoPlaying) {
      clearInterval(slideIntervalRef.current);
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideIntervalRef.current);
    setIsAutoPlaying(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
    startAutoPlay();
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [isAutoPlaying]);

  return (
    <div className="mt-8 mb-8 mx-4 md:mx-6 lg:mx-8">
      {/* Claymorphism Slider Container */}
      <div 
        className="relative overflow-hidden rounded-3xl shadow-[20px_20px_40px_rgba(0,0,0,0.2),_-20px_-20px_40px_rgba(255,255,255,0.5)] backdrop-blur-sm"
        onMouseEnter={stopAutoPlay} 
        onMouseLeave={resumeAutoPlay}
      >
        <div className="relative h-[50vh] max-h-[500px] min-h-[400px] overflow-hidden">
          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full relative">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Text Content Overlay with Claymorphism */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
                  <div className="max-w-2xl text-left space-y-4">
                    {/* Animated Icon */}
                    <div className="animate-bounce inline-block">
                      <div className="bg-white/30 backdrop-blur-md rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.3)]">
                        <div className="text-3xl">
                          {slide.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title with Claymorphism Effect */}
                    <div className="space-y-2">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 drop-shadow-md">
                        {slide.subtitle}
                      </h2>
                    </div>
                    
                    {/* Description */}
                    <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-lg leading-relaxed">
                      {slide.description}
                    </p>
                    
                    {/* Button with Claymorphism */}
                    <button className="group relative mt-4 px-8 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-4px_-4px_8px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/30 border border-white/30">
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>{slide.buttonText}</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons with Claymorphism */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 backdrop-blur-md hover:bg-white/50 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-4px_-4px_8px_rgba(255,255,255,0.3)] border border-white/30"
          >
            <FaChevronLeft className="text-white text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 backdrop-blur-md hover:bg-white/50 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-4px_-4px_8px_rgba(255,255,255,0.3)] border border-white/30"
          >
            <FaChevronRight className="text-white text-xl" />
          </button>

          {/* Slide Dots with Claymorphism */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                } rounded-full backdrop-blur-sm`}
              />
            ))}
          </div>

          {/* Decorative Claymorphism Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default BannerSliderPage;