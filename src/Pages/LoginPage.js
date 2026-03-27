import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaTimes, FaCheck } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Mobile Entry, 2: OTP Verification, 3: New Password
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("https://designback.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberMe");
          }
        }
        
        alert(data.message || "Login successful!");
        navigate("/home");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password Flow
  const handleSendOTP = async () => {
    setForgotError("");
    setForgotSuccess("");
    
    if (!mobile) {
      setForgotError("Please enter your mobile number");
      return;
    }
    
    if (!/^\d{10}$/.test(mobile)) {
      setForgotError("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setIsForgotLoading(true);
    
    try {
      const response = await fetch("https://designback.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: mobile })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setForgotSuccess("OTP sent successfully!");
        
        // Store the token and OTP
        if (data.token) {
          setResetToken(data.token);
        }
        
        // Store the generated OTP and auto-fill it
        if (data.otp) {
          setGeneratedOtp(data.otp);
          setOtp(data.otp); // Auto-fill the OTP field
        }
        
        setStep(2);
        setResendTimer(30);
        startResendTimer();
        
        // Focus on OTP input field
        setTimeout(() => {
          if (otpInputRef.current) {
            otpInputRef.current.focus();
          }
        }, 100);
      } else {
        setForgotError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotError("Network error. Please check your connection.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setForgotError("");
    setForgotSuccess("");
    
    if (!otp) {
      setForgotError("Please enter the OTP");
      return;
    }
    
    if (!/^\d{4}$/.test(otp)) {
      setForgotError("Please enter a valid 4-digit OTP");
      return;
    }
    
    // For demo: Auto-verify if OTP matches the generated one
    if (generatedOtp && otp === generatedOtp) {
      setForgotSuccess("OTP verified successfully!");
      setStep(3);
      return;
    }
    
    setIsForgotLoading(true);
    
    try {
      const response = await fetch("https://designback.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          mobile: mobile, 
          otp: otp,
          token: resetToken 
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setForgotSuccess("OTP verified successfully!");
        setStep(3);
      } else {
        setForgotError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setForgotError("Network error. Please check your connection.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
  setForgotError("");
  setForgotSuccess("");
  
  if (!newPassword) {
    setForgotError("Please enter new password");
    return;
  }
  
  if (newPassword.length < 6) {
    setForgotError("Password must be at least 6 characters long");
    return;
  }
  
  if (newPassword !== confirmPassword) {
    setForgotError("Passwords do not match");
    return;
  }
  
  setIsForgotLoading(true);
  
  try {
    const response = await fetch("https://designback.onrender.com/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        mobile: mobile,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      setForgotSuccess("Password reset successfully!");
      setTimeout(() => {
        setShowForgotModal(false);
        resetForgotForm();
        alert("Password has been reset successfully! Please login with your new password.");
      }, 2000);
    } else {
      setForgotError(data.message || "Failed to reset password. Please try again.");
    }
  } catch (error) {
    console.error("Password reset error:", error);
    setForgotError("Network error. Please check your connection.");
  } finally {
    setIsForgotLoading(false);
  }
};

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setForgotError("");
    setForgotSuccess("");
    
    setIsForgotLoading(true);
    
    try {
      const response = await fetch("https://designback.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: mobile })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setForgotSuccess("OTP resent successfully!");
        
        if (data.token) {
          setResetToken(data.token);
        }
        
        if (data.otp) {
          setGeneratedOtp(data.otp);
          setOtp(data.otp); // Auto-fill the OTP field again
        }
        
        setResendTimer(30);
        startResendTimer();
        
        // Focus on OTP input field
        setTimeout(() => {
          if (otpInputRef.current) {
            otpInputRef.current.focus();
          }
        }, 100);
      } else {
        setForgotError(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setForgotError("Network error. Please check your connection.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const resetForgotForm = () => {
    setMobile("");
    setOtp("");
    setGeneratedOtp("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setForgotError("");
    setForgotSuccess("");
    setResendTimer(0);
  };

  const closeModal = () => {
    setShowForgotModal(false);
    resetForgotForm();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] relative overflow-hidden flex items-center justify-center">
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

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {/* Glassmorphism Card */}
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-[20px_20px_40px_rgba(0,0,0,0.1),_-20px_-20px_40px_rgba(255,255,255,0.5)] border border-white/50">
            
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[8px_8px_16px_rgba(0,0,0,0.1),_-8px_-8px_16px_rgba(255,255,255,0.5)]">
                <span className="text-3xl">🎨</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Sign in to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-gray-800 placeholder-gray-400"
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
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-[8px_8px_16px_rgba(0,0,0,0.1),_-8px_-8px_16px_rgba(255,255,255,0.3)] disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-500 hover:text-indigo-600 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-white/30">
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div className="text-lg mb-1">🔒</div>
                  <p className="text-xs text-gray-500">Secure</p>
                </div>
                <div className="text-center">
                  <div className="text-lg mb-1">🚚</div>
                  <p className="text-xs text-gray-500">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="text-lg mb-1">⭐</div>
                  <p className="text-xs text-gray-500">4.4 Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-12px) rotate(2deg); }
            66% { transform: translateY(8px) rotate(-1deg); }
          }
        `}</style>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md p-8 shadow-2xl border border-white/50 animate-slideUp">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-xl flex items-center justify-center mr-3">
                  <FaLock className="text-white text-sm" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {step === 1 && "Reset Password"}
                  {step === 2 && "Verify OTP"}
                  {step === 3 && "Create New Password"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Step 1: Mobile Number Entry */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-800"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send a 4-digit OTP to this number
                  </p>
                </div>

                {forgotError && (
                  <div className="p-3 bg-red-100/80 border border-red-400 text-red-700 rounded-xl text-sm">
                    {forgotError}
                  </div>
                )}
                
                {forgotSuccess && (
                  <div className="p-3 bg-green-100/80 border border-green-400 text-green-700 rounded-xl text-sm">
                    {forgotSuccess}
                  </div>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={isForgotLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-70 flex items-center justify-center"
                >
                  {isForgotLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter 4-Digit OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCheck className="text-gray-400" />
                    </div>
                    <input
                      ref={otpInputRef}
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-800 text-center text-2xl tracking-widest"
                      placeholder="0000"
                      maxLength="4"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Enter the 4-digit OTP sent to +91 {mobile}
                  </p>
                  {generatedOtp && (
                    <p className="text-xs text-green-600 mt-1 text-center">
                      ✓ OTP auto-filled for demo
                    </p>
                  )}
                </div>

                {forgotError && (
                  <div className="p-3 bg-red-100/80 border border-red-400 text-red-700 rounded-xl text-sm">
                    {forgotError}
                  </div>
                )}
                
                {forgotSuccess && (
                  <div className="p-3 bg-green-100/80 border border-green-400 text-green-700 rounded-xl text-sm">
                    {forgotSuccess}
                  </div>
                )}

                <button
                  onClick={handleVerifyOTP}
                  disabled={isForgotLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-70 flex items-center justify-center"
                >
                  {isForgotLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <div className="text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isForgotLoading}
                    className="text-sm text-indigo-500 hover:text-indigo-600 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-800"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCheck className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-800"
                      placeholder="Confirm new password"
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

                {forgotError && (
                  <div className="p-3 bg-red-100/80 border border-red-400 text-red-700 rounded-xl text-sm">
                    {forgotError}
                  </div>
                )}
                
                {forgotSuccess && (
                  <div className="p-3 bg-green-100/80 border border-green-400 text-green-700 rounded-xl text-sm">
                    {forgotSuccess}
                  </div>
                )}

                <button
                  onClick={handleResetPassword}
                  disabled={isForgotLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-70 flex items-center justify-center"
                >
                  {isForgotLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <button
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default LoginPage;