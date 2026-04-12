import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, Search, Stethoscope } from "lucide-react";
import Navbar from "../Pages/Navbar";

const PrescriptionPadList = () => {
  const navigate = useNavigate();
  const [prescriptionPads, setPrescriptionPads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://designback.onrender.com/api/admin/doctorprescriptions";

  const fetchPrescriptionPads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?search=${searchTerm}`);
      if (response.data.success) {
        setPrescriptionPads(response.data.data);
      } else {
        setError("Failed to fetch prescription pads");
      }
    } catch (err) {
      console.error("Error fetching prescription pads:", err);
      setError(err.response?.data?.message || "Error fetching prescription pads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptionPads();
  }, [searchTerm]);

  const handleViewDetails = (padId) => {
    navigate(`/prescriptionpad/${padId}`);
  };

  // Random price generator (since API doesn't have price field)
  const getRandomPrice = () => {
    const prices = ["₹750/-", "₹850/-", "₹950/-", "₹1,100/-", "₹1,250/-", "₹1,500/-"];
    return prices[Math.floor(Math.random() * prices.length)];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-teal-500 border-t-transparent shadow-lg"></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">Loading prescription pads...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center shadow-xl">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-700 mb-3">Error Loading Prescription Pads</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchPrescriptionPads}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                Try Again 🔄
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  PRESCRIPTION PAD TEMPLATES
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Professional prescription pads for doctors, clinics, and hospitals. 
                  Customizable with your clinic details, logo, and contact information.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl">
                  <div className="flex items-center justify-center h-40 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl overflow-hidden relative">
                    <Stethoscope className="w-28 h-28 text-teal-500 drop-shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="max-w-md mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search prescription pads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-4 text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg transition-all duration-300"
                />
                <Search className="absolute left-5 top-4 h-6 w-6 text-teal-500" />
              </div>
            </div>
          </div>

          {/* Product Grid - Only Image, Price & Button */}
          {prescriptionPads.length === 0 ? (
            <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-2xl">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Prescription Pads Found</h3>
              <p className="text-gray-500">No prescription pads available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {prescriptionPads.map((pad, index) => (
                <div 
                  key={pad._id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Preview Image Only */}
                  <div className="relative h-64 bg-gradient-to-br from-teal-100 to-blue-100 overflow-hidden">
                    {pad.previewImage ? (
                      <img
                        src={`https://designback.onrender.com${pad.previewImage}`}
                        alt="Prescription Pad"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=No+Preview";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Stethoscope className="w-20 h-20 text-teal-300" />
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        {getRandomPrice()}
                      </div>
                    </div>
                  </div>

                  {/* Only View Details Button */}
                  <div className="p-5">
                    <button 
                      onClick={() => handleViewDetails(pad._id)}
                      className="relative w-full bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                      <Eye className="w-5 h-5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Medical Specialties Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              FOR MEDICAL SPECIALTIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">👨‍⚕️</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">General Physicians</h3>
                </div>
                <p className="text-gray-600 text-sm">Standard prescription pads for general practitioners.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">👩‍⚕️</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Specialists</h3>
                </div>
                <p className="text-gray-600 text-sm">Custom pads for cardiologists, neurologists, etc.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🏥</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Hospitals</h3>
                </div>
                <p className="text-gray-600 text-sm">Hospital-grade prescription pads with multiple copies.</p>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🦷</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Dental Clinics</h3>
                </div>
                <p className="text-gray-600 text-sm">Special prescription pads for dental procedures.</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">📋</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Professional Design</h3>
              <p className="text-gray-600">Clean, professional layouts with all necessary medical fields.</p>
            </div>
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your prescription pads delivered within 5-7 business days.</p>
            </div>
            <div className="group bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Custom Details</h3>
              <p className="text-gray-600">Add your clinic name, address, phone, logo, and registration details.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionPadList;