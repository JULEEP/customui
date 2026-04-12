import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, Receipt } from "lucide-react";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";

const CashReceiptList = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://designback.onrender.com/api/admin/receipts";

  // Fetch receipts from API
  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setReceipts(response.data.data);
      } else {
        setError("Failed to fetch receipts");
      }
    } catch (err) {
      console.error("Error fetching receipts:", err);
      setError(err.response?.data?.message || "Error fetching receipts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleViewDetails = (receiptId) => {
    navigate(`/receipt/${receiptId}`);
  };

  // Get random price
  const getPrice = () => {
    const prices = ["₹750/-", "₹850/-", "₹950/-", "₹1,100/-", "₹1,250/-"];
    return prices[Math.floor(Math.random() * prices.length)];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-orange-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">Loading receipts...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center shadow-xl">
              <div className="text-red-600 text-6xl mb-4 animate-bounce">⚠️</div>
              <h2 className="text-2xl font-bold text-red-700 mb-3">Error Loading Receipts</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchReceipts}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                Try Again 🔄
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-1 rounded-2xl">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <span className="text-orange-600 font-semibold">✨ Premium Quality ✨</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  CASH RECEIPT TEMPLATES
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Professional cash receipts for maintaining proper financial records. 
                  Perfect for shops, offices, and all types of businesses.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl">
                  <div className="flex items-center justify-center h-40 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 animate-pulse"></div>
                    <Receipt className="w-28 h-28 text-orange-500 drop-shadow-2xl animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid - Small Cards */}
          {receipts.length === 0 ? (
            <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-2xl">
              <div className="text-gray-400 text-6xl mb-4 animate-bounce">📋</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Receipts Found</h3>
              <p className="text-gray-500">No receipts available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {receipts.map((receipt, index) => (
                <div 
                  key={receipt._id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Preview Image - Smaller */}
                  <div className="relative h-40 bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <div className="absolute inset-0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transition-all duration-700 z-10"></div>
                    {receipt.previewImage ? (
                      <img
                        src={`https://designback.onrender.com${receipt.previewImage}`}
                        alt="Cash Receipt"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/200x160?text=No+Preview";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Receipt className="w-12 h-12 text-orange-300 animate-pulse" />
                      </div>
                    )}
                    
                    {/* Price Badge - Small */}
                    <div className="absolute top-2 right-2 z-20">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        {getPrice()}
                      </div>
                    </div>
                  </div>

                  {/* View Details Button - Small */}
                  <div className="p-3">
                    <button 
                      onClick={() => handleViewDetails(receipt._id)}
                      className="relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-semibold py-2 text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                      <span className="relative z-10 flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Receipt Types Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              RECEIPT TYPES FOR BUSINESS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 border border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">📄</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Single Copy</h3>
                </div>
                <p className="text-gray-600 text-xs">Standard single copy receipts.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-amber-50 to-white rounded-xl p-4 border border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Duplicate</h3>
                </div>
                <p className="text-gray-600 text-xs">Duplicate receipts with carbon copy.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-yellow-50 to-white rounded-xl p-4 border border-yellow-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">📑</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Triplicate</h3>
                </div>
                <p className="text-gray-600 text-xs">Triplicate receipts for record keeping.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-red-50 to-white rounded-xl p-4 border border-red-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">🔢</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Numbered</h3>
                </div>
                <p className="text-gray-600 text-xs">Pre-numbered for security.</p>
              </div>
            </div>
          </div>

          {/* Features Section - Compact */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">💰</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Professional Design</h3>
              <p className="text-gray-600 text-xs">Clean, professional layouts.</p>
            </div>
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Fast Delivery</h3>
              <p className="text-gray-600 text-xs">5-7 business days delivery.</p>
            </div>
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">🎨</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Custom Details</h3>
              <p className="text-gray-600 text-xs">Add your company details.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default CashReceiptList;