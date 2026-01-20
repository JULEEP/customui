import React, { useState, useEffect } from 'react';

const AttractiveSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Canvas Frames');
  const [showCursor, setShowCursor] = useState(true);

  const searchExamples = [
    "Canvas Frames",
    "Car Dashboard Stands",
    "Photo Books", 
    "Personalized Mugs",
    "Calendar Prints",
    "Wall Art",
    "Acrylic Prints"
  ];

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Text rotation effect
  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let text = searchExamples[0];
    
    const animate = () => {
      const fullText = searchExamples[index];
      
      if (isDeleting) {
        text = fullText.substring(0, text.length - 1);
      } else {
        text = fullText.substring(0, text.length + 1);
      }
      
      setPlaceholderText(text);
      
      let speed = 100;
      
      if (!isDeleting && text === fullText) {
        speed = 2000; // Pause
        isDeleting = true;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        index = (index + 1) % searchExamples.length;
        speed = 500;
      } else if (isDeleting) {
        speed = 50;
      }
      
      setTimeout(animate, speed);
    };
    
    const timer = setTimeout(animate, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      console.log('Searching:', searchText);
    }
  };

  const handleExampleClick = (example) => {
    setSearchText(example);
  };

  return (
    <div className="py-10 px-4 rounded-2xl max-w-4xl mx-auto mt-32 mb-8"> {/* mt-32 added for top margin */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Products, 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
            Perfectly Personalized
          </span>
        </h1>
        <p className="text-gray-600 text-lg">For You</p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-6 py-4 text-gray-900 bg-transparent focus:outline-none text-lg placeholder-gray-400"
                  placeholder={`Search for ${placeholderText}${showCursor ? '|' : ''}`}
                />
                
                {/* Animated search icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 hover:opacity-90 transition-all duration-300 group"
              >
                Search
                <div className="h-1 w-0 group-hover:w-full bg-white/30 transition-all duration-300 mx-auto mt-1 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Search Tags */}
      <div className="text-center">
        <p className="text-gray-600 mb-3 text-sm font-medium">Try searching for:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {searchExamples.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(item)}
              className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 border border-blue-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttractiveSearch;