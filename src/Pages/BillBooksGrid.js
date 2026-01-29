import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BillBooksGrid = () => {
  const navigate = useNavigate();
  const [billBooks, setBillBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API base URL
  const API_BASE_URL = "https://designback.onrender.com";

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
          pages: Math.max(50, book.textElements?.length * 20)
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-4xl font-bold text-gray-900 text-center">
              Bill Books Collection
            </h1>
            <div className="w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading bill books...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-4xl font-bold text-gray-900 text-center">
              Bill Books Collection
            </h1>
            <div className="w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center bg-red-50 p-8 rounded-xl border border-red-200 max-w-md">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Bill Books</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchBillBooks}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Business Needs
            </button>
            <h1 className="text-4xl font-bold text-gray-900 text-center">
              Bill Books Collection
            </h1>
            <div className="w-32"></div>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bill Books Available</h3>
              <p className="text-gray-600">No bill books have been created yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Business Needs
          </button>
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Bill Books Collection
            <span className="block text-lg font-normal text-gray-600 mt-2">
              {billBooks.length} {billBooks.length === 1 ? 'item' : 'items'} available
            </span>
          </h1>
          <div className="w-32"></div> {/* For spacing */}
        </div>

        {/* Grid of bill books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {billBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleCardClick(book.id)}
              className="bg-white rounded-2xl p-4 border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Image container */}
              <div className="mb-4 h-48 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Fallback image if the image fails to load
                      e.target.src = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";
                    }}
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-200 to-transparent opacity-30 rounded-tl-full"></div>
              </div>

              {/* Product info */}
              <div className="text-center">
                <h3 className="text-md font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                  {book.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {book.price}
                  </div>
                  <span className="text-sm text-gray-500">
                    {book.pages} pages
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {book.colors.length > 0 ? (
                    book.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                        style={{ 
                          backgroundColor: color.startsWith('#') ? `${color}20` : undefined,
                          color: color.startsWith('#') ? color : undefined
                        }}
                      >
                        {color.startsWith('#') ? `Color ${idx + 1}` : color}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      Custom Colors
                    </span>
                  )}
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Bill Books?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Fully Customizable</h4>
                <p className="text-gray-600">Add custom text, logos, and colors</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Multiple Text Elements</h4>
                <p className="text-gray-600">Add unlimited text fields</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Professional Templates</h4>
                <p className="text-gray-600">Pre-designed for business needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillBooksGrid;