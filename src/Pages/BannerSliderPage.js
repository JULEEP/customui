import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
      buttonText: "Shop Now"
    },
    {
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=80",
      title: "Romantic Bouquets",
      subtitle: "Flower Collection",
      description: "Express Your Love With Beautiful Flower Arrangements",
      buttonText: "Shop Flowers"
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
    <div className="mt-6 mb-4 mx-4 md:mx-6 lg:mx-8 rounded-2xl overflow-hidden shadow-xl mt-8">
      <div 
        className="relative overflow-hidden h-[50vh] max-h-[450px] min-h-[350px]" 
        onMouseEnter={stopAutoPlay} 
        onMouseLeave={resumeAutoPlay}
      >
        {/* Slider Container */}
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-red-900/40 z-10"></div>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Text Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-12 lg:px-16">
                <div className="max-w-xl text-left space-y-3">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-3">
                    {slide.subtitle}
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-white mb-6 max-w-lg">
                    {slide.description}
                  </p>
                  <button className="bg-white text-pink-700 hover:bg-pink-50 px-6 py-2 rounded-full text-base md:text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl shadow-md">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Compact */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full transition-all hover:scale-110"
        >
          <FaChevronLeft className="text-pink-700 text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full transition-all hover:scale-110"
        >
          <FaChevronRight className="text-pink-700 text-xl" />
        </button>

        {/* Slide Dots - Compact */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white w-5' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Slide Counter - Removed for cleaner look */}
        
        {/* Auto-play Controls - Removed for cleaner look */}
      </div>
    </div>
  );
};

export default BannerSliderPage;