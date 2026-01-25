import React from "react";
import { useNavigate } from "react-router-dom";

const PrescriptionPadList = () => {
  const navigate = useNavigate();
  
  const prescriptionPadProducts = [
    { 
      id: 1, 
      name: "Standard Prescription Pad", 
      price: "₹750/-", 
      description: "Standard prescription pads for doctors and clinics",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 2, 
      name: "Premium Prescription Pad", 
      price: "₹950/-", 
      description: "Premium quality prescription pads with better paper",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 3, 
      name: "Hospital Prescription Pad", 
      price: "₹1,200/-", 
      description: "Prescription pads specifically for hospitals",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 4, 
      name: "Clinic Prescription Pad", 
      price: "₹850/-", 
      description: "Prescription pads designed for medical clinics",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 5, 
      name: "Dental Prescription Pad", 
      price: "₹900/-", 
      description: "Special prescription pads for dental clinics",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 6, 
      name: "Veterinary Prescription Pad", 
      price: "₹800/-", 
      description: "Prescription pads for veterinary doctors",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 7, 
      name: "Custom Prescription Pad", 
      price: "From ₹1,000/-", 
      description: "Fully customized prescription pads with your clinic details",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 8, 
      name: "Carbonless Prescription Pad", 
      price: "₹1,100/-", 
      description: "Carbonless duplicate prescription pads",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 9, 
      name: "Bulk Prescription Pad Pack", 
      price: "₹3,500/-", 
      description: "Pack of 50 prescription pads",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      id: 10, 
      name: "Emergency Prescription Pad", 
      price: "₹700/-", 
      description: "Emergency prescription pads for quick use",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
  ];

  const handleStartDesign = (productId = 1) => {
    navigate(`/prescriptionpad/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                PRESCRIPTION PAD TEMPLATES
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Professional prescription pads for doctors, clinics, and hospitals. Customizable with your clinic details, logo, and contact information. Perfect for maintaining professional standards and ensuring clear communication with patients.
              </p>
              <button 
                onClick={() => handleStartDesign(1)}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-3 px-8 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Design
                <span className="text-xl">→</span>
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-teal-50 to-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
                    alt="Prescription Pad Template"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {prescriptionPadProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-teal-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-200 to-transparent opacity-30 rounded-tl-full"></div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {product.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                
                {/* Action Button - Only Start Design */}
                <div className="mt-6">
                  <button 
                    onClick={() => handleStartDesign(product.id)}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Specialties Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            FOR MEDICAL SPECIALTIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-6 border border-teal-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 text-lg">👨‍⚕️</span>
                </div>
                <h3 className="font-bold text-gray-900">General Physicians</h3>
              </div>
              <p className="text-gray-600 text-sm">Standard prescription pads for general practitioners.</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👩‍⚕️</span>
                </div>
                <h3 className="font-bold text-gray-900">Specialists</h3>
              </div>
              <p className="text-gray-600 text-sm">Custom pads for cardiologists, neurologists, etc.</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">🏥</span>
                </div>
                <h3 className="font-bold text-gray-900">Hospitals</h3>
              </div>
              <p className="text-gray-600 text-sm">Hospital-grade prescription pads with multiple copies.</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🦷</span>
                </div>
                <h3 className="font-bold text-gray-900">Dental Clinics</h3>
              </div>
              <p className="text-gray-600 text-sm">Special prescription pads for dental procedures.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-teal-600 text-xl">📋</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Professional Design</h3>
            <p className="text-gray-600">Clean, professional layouts with all necessary medical fields.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your prescription pads delivered within 5-7 business days.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🎨</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Custom Details</h3>
            <p className="text-gray-600">Add your clinic name, address, phone, logo, and registration details.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Design Your Prescription Pad?
          </h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Create professional prescription pads that reflect your medical practice. Customize with your clinic details, choose paper quality, and add security features.
          </p>
          <button 
            onClick={() => handleStartDesign(1)}
            className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Start Custom Design Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPadList;