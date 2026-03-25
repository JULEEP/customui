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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError("");
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // API Call
      const response = await fetch("https://designback.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          address: formData.address
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        
        alert("Registration successful! Welcome to PrintShoppy!");
        // Navigate to login page
        navigate("/");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] relative overflow-hidden flex items-center justify-center py-12">
      {/* Floating Glass Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-md rounded-full border border-white/40"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.05), -6px -6px 12px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Glassmorphism Card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-[20px_20px_40px_rgba(0,0,0,0.1),_-20px_-20px_40px_rgba(255,255,255,0.5)] border border-white/50">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[8px_8px_16px_rgba(0,0,0,0.1),_-8px_-8px_16px_rgba(255,255,255,0.5)]">
              <span className="text-2xl">🎨</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
            <p className="text-gray-600 text-sm">Sign up to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Registration Form - 2 columns layout */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Row 3: Address - Full Width */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-2">
                  <FaMapMarkerAlt className="text-gray-400 text-xs" />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm resize-none"
                  placeholder="Enter your delivery address"
                  rows="2"
                />
              </div>
            </div>
            
            {/* Row 4: Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-8 pr-10 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-400 text-xs" /> : <FaEye className="text-gray-400 text-xs" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-8 pr-10 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400 text-xs" /> : <FaEye className="text-gray-400 text-xs" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-3.5 w-3.5 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-indigo-500 hover:text-indigo-600 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-indigo-500 hover:text-indigo-600 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-[8px_8px_16px_rgba(0,0,0,0.1),_-8px_-8px_16px_rgba(255,255,255,0.3)] disabled:opacity-70 flex items-center justify-center text-sm"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          
          {/* Login Link */}
          <div className="mt-5 text-center">
            <p className="text-gray-600 text-xs">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500 hover:text-indigo-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(6px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;