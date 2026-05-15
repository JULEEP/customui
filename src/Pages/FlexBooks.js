// FlexBooks.jsx - Alag Component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FlexBooks = () => {
  const navigate = useNavigate();
  const [flexBooks, setFlexBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API se data fetch karne ka function
  const fetchFlexBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://designback.onrender.com/api/admin/flexbooks");
      const result = await response.json();
      
      if (result.success) {
        setFlexBooks(result.data);
      } else {
        setError("Failed to fetch flex books");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlexBooks();
  }, []);

  const handleFlexBookClick = (flexBook) => {
    // Navigate to flex book details page with id
    navigate(`/flexbook/${flexBook._id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Flex Books...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center">
        <div className="text-center bg-white/40 backdrop-blur-md rounded-2xl p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchFlexBooks}
            className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-16 px-4 relative overflow-hidden min-h-screen">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full border border-white/50"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(184, 185, 190, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back
          </button>
          
          {/* Heading with NEW Blinking Tag */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl md:text-4xl font-black text-gray-800">FLEX BOOKS</span>
              <span className="relative">
                <span className="animate-ping absolute inset-0 rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-lg">
                  LIVE
                </span>
              </span>
            </div>
            <p className="text-gray-500 mt-3">Total {flexBooks.length} Flex Books Available</p>
          </div>
        </div>

        {/* ADD DESIGN Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/add-design")}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            <span className="text-xl font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            <span className="text-sm md:text-base tracking-wide">ADD DESIGN</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </button>
        </div>

        {/* Flex Books Grid - API se aaya data */}
        {flexBooks.length === 0 ? (
          <div className="text-center py-20 bg-white/30 backdrop-blur-md rounded-3xl">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-700">No Flex Books Found</h3>
            <p className="text-gray-500 mt-2">Create your first flex book by clicking ADD DESIGN</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flexBooks.map((book) => (
              <div 
                key={book._id} 
                className="group cursor-pointer"
                onClick={() => handleFlexBookClick(book)}
              >
                <div className="relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform group-hover:-translate-y-2 border border-white/50 h-full">
                  
                  {/* Preview Image */}
                  <div className="h-56 bg-gradient-to-br from-indigo-100/60 to-purple-100/60 overflow-hidden relative">
                    {book.previewImage ? (
                      <img
                        src={`https://designback.onrender.com/${book.previewImage}`}
                        alt={book.flexTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Preview</span>
                      </div>
                    )}
                    
                    {/* Decorative gradient corners */}
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-br-full"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-tl-full"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        book.status === 'active' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                  </div>

                  {/* Flex Book Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                      {book.flexTitle || "Untitled"}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {book.companyName}
                    </p>
                    
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {book.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>📅 {new Date(book.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        📍 {book.points?.length || 0} features
                      </span>
                    </div>
                    
                    {/* View Details Button */}
                    <button className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      View Details →
                    </button>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-12px) rotate(2deg); 
          }
          66% { 
            transform: translateY(8px) rotate(-1deg); 
          }
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
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

export default FlexBooks;