import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeddingCardsGrid = () => {
  const navigate = useNavigate();
  const [weddingCards, setWeddingCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API base URL - using absolute URL for production
  const API_BASE_URL = "https://designback.onrender.com";

  useEffect(() => {
    fetchWeddingCards();
  }, []);

  const fetchWeddingCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/weddingcards`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Transform API data to match component structure
        const transformedData = result.data.map(card => ({
          id: card._id,
          // Card title/name - combine groom and bride names
          name: `${card.groomName || "Groom"} & ${card.brideName || "Bride"}`,
          // Use frontPreview or frontImage for thumbnail
          image: card.frontPreview ? `${API_BASE_URL}${card.frontPreview}` : 
                 card.frontImage ? `${API_BASE_URL}${card.frontImage}` : 
                 "https://cdn.printshoppy.com/image/cache/catalog/product-image/wedding-cards/wedding-card-16-600x800.webp",
          // Price range based on card complexity
          price: `₹${Math.floor(Math.random() * 500) + 850}/-`,
          // Description with wedding date and venue
          description: `${card.groomName || "Groom"} & ${card.brideName || "Bride"} - ${card.ceremonyDate || "Date TBA"} at ${card.ceremonyVenue?.substring(0, 40) || "Venue"}`,
          // Colors based on design
          colors: [card.design?.accentColor || "#d4af37", card.design?.textColor || "#5a3e2b", card.design?.backgroundColor || "#fff8f0"],
          // Wedding specific fields
          groomName: card.groomName,
          brideName: card.brideName,
          ceremonyDate: card.ceremonyDate,
          ceremonyVenue: card.ceremonyVenue,
          receptionDate: card.receptionDate,
          receptionVenue: card.receptionVenue,
          ceremonyTime: card.ceremonyTime,
          dressCode: card.dressCode,
          rsvpContact: card.rsvpContact,
          rsvpBy: card.rsvpBy,
          additionalInfo: card.additionalInfo,
          // Store all text styles
          textStyles: card.textStyles || {},
          // Store original data
          originalData: card,
          // Status
          status: card.status,
          // Language
          language: card.language,
          // Background color for card display
          backgroundColor: card.design?.backgroundColor || "#fff8f0"
        }));
        
        setWeddingCards(transformedData);
      } else {
        throw new Error("Failed to fetch wedding cards");
      }
    } catch (err) {
      console.error("Error fetching wedding cards:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/wedding-cards/${id}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // Helper function to format date for display
  const formatWeddingDate = (dateString) => {
    if (!dateString) return "Date TBA";
    // If it's already a formatted string like "25th November 2025", return as is
    if (dateString.match(/\d+(st|nd|rd|th)\s+\w+\s+\d{4}/)) {
      return dateString;
    }
    // Otherwise try to parse as date
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
    } catch(e) {}
    return dateString;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft transition-all duration-300"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Wedding Cards Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mb-4"></div>
              <p className="text-gray-700">Loading beautiful wedding cards...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Wedding Cards Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Wedding Cards</h3>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchWeddingCards}
                className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-all duration-300 shadow-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (weddingCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Wedding Cards Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="text-gray-500 text-6xl mb-4">💒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Wedding Cards Available</h3>
              <p className="text-gray-600">No wedding cards have been created yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with claymorphism style */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          {/* Back button - hidden on mobile screens */}
          <button
            onClick={handleBackClick}
            className="hidden sm:flex items-center gap-2 text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-5 py-2.5 rounded-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300"
          >
            ← Back to Business Needs
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-rose-700 to-amber-700 bg-clip-text text-transparent mb-2">
              Wedding Cards Gallery
            </h1>
            <p className="text-gray-600 backdrop-blur-sm bg-white/30 px-3 sm:px-4 py-1 rounded-full inline-block shadow-soft text-sm sm:text-base">
              {weddingCards.length} {weddingCards.length === 1 ? 'card' : 'cards'} available for your special day
            </p>
          </div>
          
          {/* Empty div for spacing on desktop */}
          <div className="hidden sm:block w-32"></div>
        </div>

        {/* Gallery Grid with Claymorphism Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {weddingCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Claymorphism Card with wedding theme */}
              <div 
                className="bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 border border-white/30 h-full flex flex-col"
                style={{ backgroundColor: `${card.backgroundColor}80` || 'rgba(255, 248, 240, 0.4)' }}
              >
                
                {/* Image Container with Soft Edges */}
                <div className="mb-4 sm:mb-5 h-44 sm:h-52 bg-gradient-to-br from-white/60 to-amber-100/60 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md transform group-hover:scale-105 transition-transform duration-300 rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://cdn.printshoppy.com/image/cache/catalog/product-image/wedding-cards/wedding-card-16-600x800.webp";
                      }}
                    />
                  </div>
                  
                  {/* Status Badge */}
                  {card.status === 'active' && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm bg-opacity-80">
                        Active
                      </span>
                    </div>
                  )}
                  
                  {/* Language indicator */}
                  {card.language && (
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                      <span className="bg-white/80 text-gray-700 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {card.language === 'hi' ? 'हिंदी' : card.language === 'en' ? 'English' : card.language}
                      </span>
                    </div>
                  )}
                  
                  {/* Wedding ring decorative element */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full opacity-20 blur-sm"></div>
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-tl from-pink-400 to-orange-400 rounded-full opacity-20 blur-sm"></div>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                    {card.groomName} <span className="text-rose-500 text-sm">❤️</span> {card.brideName}
                  </h3>
                  
                  {/* Wedding Date - Prominent */}
                  <div className="flex items-center justify-center gap-1 text-rose-600 text-xs sm:text-sm font-medium">
                    <span>📅</span>
                    <span>{formatWeddingDate(card.ceremonyDate)}</span>
                  </div>
                  
                  {/* Venue Preview */}
                  {card.ceremonyVenue && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      📍 {card.ceremonyVenue.length > 40 ? card.ceremonyVenue.substring(0, 40) + '...' : card.ceremonyVenue}
                    </p>
                  )}
                  
                  {/* Reception info if available */}
                  {card.receptionDate && (
                    <div className="text-xs text-amber-600">
                      Reception: {formatWeddingDate(card.receptionDate)}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                      {card.price}
                    </div>
                    <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                      💝 Wedding
                    </span>
                  </div>
                  
                  {/* Color Chips */}
                  <div className="mt-2 flex flex-wrap justify-center gap-1 sm:gap-1.5">
                    {card.colors.length > 0 && (
                      card.colors.slice(0, 3).map((color, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 sm:px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/50 shadow-sm flex items-center gap-1"
                        >
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-gray-700">
                            {idx === 0 ? 'Accent' : idx === 1 ? 'Text' : 'Bg'}
                          </span>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Dress Code if available */}
                  {card.dressCode && (
                    <div className="text-xs text-gray-500 italic">
                      👗 {card.dressCode}
                    </div>
                  )}
                </div>

                {/* View Details Indicator */}
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <span className="text-xs text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view card details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section with Claymorphism - Wedding Theme */}
        <div className="mt-12 sm:mt-16 backdrop-blur-sm bg-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Why Choose Our Wedding Cards?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">✨</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Fully Customizable</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Personalize with names, dates & venues</p>
              </div>
            </div>
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">🎨</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Elegant Designs</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Traditional & modern wedding themes</p>
              </div>
            </div>
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">📦</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Premium Quality</h4>
                <p className="text-gray-600 text-xs sm:text-sm">High-quality paper & printing</p>
              </div>
            </div>
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">🚚</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Quick Delivery</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Fast shipping across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default WeddingCardsGrid;