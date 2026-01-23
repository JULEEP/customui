import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
      navigate("/");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <div className="max-w-4xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-white hidden lg:flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-blue-100 text-lg">
                  Sign in to your PrintShoppy account and manage your orders, track deliveries, and access exclusive offers.
                </p>
              </div>
              
              <div className="space-y-6 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Fast Delivery</h3>
                    <p className="text-blue-100">Track your orders in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Exclusive Offers</h3>
                    <p className="text-blue-100">Member-only discounts & deals</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Easy Payments</h3>
                    <p className="text-blue-100">Secure & hassle-free checkout</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="italic">"Best printing service with amazing customer support!"</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 bg-white rounded-full mr-3"></div>
                  <div>
                    <p className="font-bold">Rahul Sharma</p>
                    <p className="text-sm text-blue-100">Premium Customer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="bg-white p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Access your PrintShoppy account</p>
                </div>
                
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <FaGoogle className="text-red-500" />
                    <span>Google</span>
                  </button>
                  
                  <button
                    onClick={handleFacebookLogin}
                    className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <FaFacebook className="text-blue-600" />
                    <span>Facebook</span>
                  </button>
                </div>
                
                <div className="flex items-center my-8">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4 text-gray-500">or continue with email</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                
                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold">
                      Sign up now
                    </Link>
                  </p>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <p className="text-center text-gray-600 font-medium mb-4">Trusted by 24+ Lakh Customers</p>
                  <div className="flex justify-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">🔒</div>
                      <p className="text-xs text-gray-600 mt-1">Secure</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">🚚</div>
                      <p className="text-xs text-gray-600 mt-1">Fast Delivery</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">⭐</div>
                      <p className="text-xs text-gray-600 mt-1">4.4/5 Rating</p>
                    </div>
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

export default LoginPage;