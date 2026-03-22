import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BillBooksGrid = () => {
  const navigate = useNavigate();
  const [billBooks, setBillBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API base URL
  const API_BASE_URL = "http://localhost:4050";

  useEffect(() => {
    fetchBillBooks();
  }, []);

  const fetchBillBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/allbillbooks`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Transform API data to match component structure
        const transformedData = result.data.map(book => ({
          id: book._id,
          name: book.name,
          // Handle image path - convert backslashes to forward slashes and prepend base URL
          image: `${API_BASE_URL}/${book.file.replace(/\\/g, '/')}`,
          // Generate price based on text elements count or use default
          price: `₹${(book.textElements?.length * 100 + 500)}/-`,
          // Use description from text elements or default
          description: book.textElements?.find(t => t.text.includes("Description"))?.text || 
                      book.textElements?.[0]?.text || 
                      "Custom bill book with multiple text elements",
          // Generate colors array based on text element colors
          colors: [...new Set(book.textElements?.map(t => t.color).slice(0, 3) || [])]
                  .map(color => color || "Default"),
          // Calculate pages based on text elements count
          pages: Math.max(50, book.textElements?.length * 20),
          // Store all text elements for modal view
          textElements: book.textElements || [],
          // Store original data
          originalData: book
        }));
        
        setBillBooks(transformedData);
      } else {
        throw new Error("Failed to fetch bill books");
      }
    } catch (err) {
      console.error("Error fetching bill books:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/bill-books/${id}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            {/* Back button - hidden on mobile */}
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-indigo-700 hover:text-indigo-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft transition-all duration-300"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Bill Books Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-700">Loading beautiful bill books...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            {/* Back button - hidden on mobile */}
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-indigo-700 hover:text-indigo-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Bill Books Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Bill Books</h3>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchBillBooks}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg"
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
  if (billBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            {/* Back button - hidden on mobile */}
            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center text-indigo-700 hover:text-indigo-900 font-medium backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-soft"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1">
              Bill Books Gallery
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="text-gray-500 text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bill Books Available</h3>
              <p className="text-gray-600">No bill books have been created yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with claymorphism style */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          {/* Back button - hidden on mobile screens */}
          <button
            onClick={handleBackClick}
            className="hidden sm:flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium backdrop-blur-sm bg-white/30 px-5 py-2.5 rounded-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300"
          >
            ← Back to Business Needs
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
              Bill Books Gallery
            </h1>
            <p className="text-gray-600 backdrop-blur-sm bg-white/30 px-3 sm:px-4 py-1 rounded-full inline-block shadow-soft text-sm sm:text-base">
              {billBooks.length} {billBooks.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
          
          {/* Empty div for spacing on desktop */}
          <div className="hidden sm:block w-32"></div>
        </div>

        {/* Gallery Grid with Claymorphism Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {billBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleCardClick(book.id)}
              className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Claymorphism Card */}
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 border border-white/30">
                
                {/* Image Container with Soft Edges */}
                <div className="mb-4 sm:mb-5 h-44 sm:h-52 bg-gradient-to-br from-white/60 to-gray-100/60 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";
                      }}
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-20 blur-sm"></div>
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-tl from-pink-400 to-orange-400 rounded-full opacity-20 blur-sm"></div>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight line-clamp-2">
                    {book.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {book.price}
                    </div>
                    <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                      📄 {book.pages} pages
                    </span>
                  </div>
                  
                  {/* Color Chips */}
                  <div className="mt-2 flex flex-wrap justify-center gap-1 sm:gap-1.5">
                    {book.colors.length > 0 ? (
                      book.colors.slice(0, 3).map((color, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 sm:px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/50 shadow-sm"
                          style={{ 
                            backgroundColor: color.startsWith('#') ? `${color}30` : '#f3f4f6',
                            color: color.startsWith('#') ? color : '#4b5563'
                          }}
                        >
                          {color.startsWith('#') ? `🎨 ${idx + 1}` : color}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs px-2 sm:px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm">
                        🎨 Custom Colors
                      </span>
                    )}
                    {book.colors.length > 3 && (
                      <span className="text-xs px-2 sm:px-2.5 py-1 rounded-full bg-white/50">
                        +{book.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Details Indicator */}
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section with Claymorphism */}
        <div className="mt-12 sm:mt-16 backdrop-blur-sm bg-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Why Choose Our Bill Books?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Fully Customizable</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Add custom text, logos, and colors</p>
              </div>
            </div>
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Multiple Text Elements</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Add unlimited text fields</p>
              </div>
            </div>
            <div className="flex items-start gap-3 backdrop-blur-sm bg-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Professional Templates</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Pre-designed for business needs</p>
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

export default BillBooksGrid;