import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    if (!formData.phone || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration successful! Welcome to PrintShoppy!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
            {/* Left Side - Registration Form */}
            <div className="bg-white p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join 24+ Lakh happy PrintShoppy customers</p>
                </div>
                
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step === 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      <span className="font-bold">1</span>
                    </div>
                    <span className="text-sm mt-2">Basic Info</span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-4 bg-gray-300">
                    <div className={`h-full transition-all duration-500 ${step === 2 ? 'w-full bg-gradient-to-r from-blue-600 to-purple-600' : 'w-0'}`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step === 2 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      <span className="font-bold">2</span>
                    </div>
                    <span className="text-sm mt-2">Account Details</span>
                  </div>
                </div>
                
                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-6">
                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-700">
                          By signing up, you agree to receive marketing emails from PrintShoppy. You can unsubscribe at any time.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-3">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                            placeholder="Enter your delivery address"
                            rows="3"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Must be at least 8 characters with letters and numbers
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                          I agree to the{" "}
                          <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </>
                  )}
                  
                  <div className="flex space-x-4">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 py-3.5 px-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all"
                      >
                        ← Back
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${step === 1 ? 'w-full' : 'flex-1'} py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        step === 1 ? "Continue →" : "Create Account"
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold">
                      Sign in
                    </Link>
                  </p>
                </div>
                
                {/* Benefits */}
                <div className="mt-10 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 text-center">Why Join PrintShoppy?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl">
                      <div className="text-blue-600 font-bold mb-1">🎁</div>
                      <p className="text-sm">Welcome Offer 10% OFF</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-xl">
                      <div className="text-purple-600 font-bold mb-1">🚚</div>
                      <p className="text-sm">Free Shipping</p>
                    </div>
                    <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 rounded-xl">
                      <div className="text-pink-600 font-bold mb-1">⭐</div>
                      <p className="text-sm">Exclusive Deals</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl">
                      <div className="text-green-600 font-bold mb-1">💳</div>
                      <p className="text-sm">Easy Returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Benefits */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 text-white hidden lg:flex flex-col justify-center">
              <div className="mb-12">
                <h1 className="text-5xl font-bold mb-6">Join Our Community</h1>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Become part of India's fastest growing printing community. Get access to premium features and exclusive benefits.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                    <span className="text-2xl">👑</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Premium Membership</h3>
                    <p className="text-indigo-100">Get 10% cashback on every order and priority customer support.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Order Tracking</h3>
                    <p className="text-indigo-100">Real-time tracking for all your orders from production to delivery.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Custom Designs</h3>
                    <p className="text-indigo-100">Access to our design tools and templates for personalized products.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">⭐</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-300">★</span>
                      ))}
                    </div>
                    <p className="text-indigo-100 mt-1">4.4/5 from 56,704+ reviews</p>
                  </div>
                </div>
                <p className="italic">"Creating an account was the best decision. The exclusive discounts are amazing!"</p>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-white rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold">Priya Patel</p>
                    <p className="text-sm text-indigo-100">Business Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RegisterPage;