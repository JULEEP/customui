import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaHome, FaStar, FaBox, FaCrown, FaInfoCircle } from "react-icons/fa";

const PrintShoppyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Features", href: "#features", icon: <FaStar /> },
    { name: "Premium", href: "#premium", icon: <FaCrown /> },
    { name: "Collections", href: "#collections", icon: <FaBox /> },
    { name: "About", href: "#about", icon: <FaInfoCircle /> },
  ];

  const stats = [
    { icon: "🏆", text: "EST. 2015" },
    { icon: "👑", text: "Trusted By Millions" },
    { icon: "🖼️", text: "1 Crore+ Photos Printed" },
    { icon: "✨", text: "Premium Materials" },
    { icon: "🚚", text: "Free Shipping" },
    { icon: "⭐", text: "4.4/5 Rating" },
  ];

  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
    setIsMenuOpen(false);
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 🔥 MARQUEE CSS (INLINE – SAME FILE) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          transform: translateY(-2px);
        }
        .nav-link.active {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          color: white;
        }
        .login-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .register-btn {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: linear-gradient(135deg, #FF416C, #FF4B2B);
          color: white;
          font-size: 10px;
          font-weight: bold;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(255, 65, 108, 0.3);
        }
        .logo-glow {
          animation: logoPulse 2s ease-in-out infinite alternate;
        }
        @keyframes logoPulse {
          0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
        }
        .icon-btn {
          transition: all 0.3s ease;
        }
        .icon-btn:hover {
          transform: scale(1.1);
        }
      `}</style>

      <nav className="bg-white shadow-xl fixed w-full z-50">
        {/* 🔹 Main Navbar */}
        <div className="bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo - Clickable */}
              <div 
                className="flex items-center space-x-4 cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl shadow-lg logo-glow">
                  CD
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    <span className="text-gray-900">CUSTOM</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                      DESIGN
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600 font-medium mt-1">
                    ✨ Premium Printing Since 2015
                  </p>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="nav-link font-semibold text-gray-700 hover:text-blue-600 flex items-center space-x-2"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-3">
                {/* Icons */}
                <div className="flex items-center space-x-3">
                  {/* Wishlist */}
                  <div className="relative">
                    <button
                      onClick={handleWishlistClick}
                      className="icon-btn p-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-full transition-all"
                      title="Wishlist"
                    >
                      <FaHeart className="text-red-500 text-xl" />
                    </button>
                    <span className="badge">3</span>
                  </div>

                  {/* Cart */}
                  <div className="relative">
                    <button
                      onClick={handleCartClick}
                      className="icon-btn p-3 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-full transition-all"
                      title="Cart"
                    >
                      <FaShoppingCart className="text-blue-600 text-xl" />
                    </button>
                    <span className="badge">5</span>
                  </div>

                  {/* User Profile */}
                  <button
                    onClick={handleLoginClick}
                    className="hidden md:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors icon-btn"
                    title="Account"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                      <FaUser className="text-lg" />
                    </div>
                  </button>

                  {/* Login/Register Buttons */}
                  <div className="hidden md:flex items-center space-x-3">
                    <button
                      onClick={handleLoginClick}
                      className="login-btn text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="register-btn text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Register
                    </button>
                  </div>

                  {/* Mobile Toggle */}
                  <button
                    className="lg:hidden p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full shadow-sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="w-6 h-0.5 bg-gray-700"></span>
                      <span className="w-6 h-0.5 bg-gray-700"></span>
                      <span className="w-6 h-0.5 bg-gray-700"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-xl">
            {/* Mobile Menu Items */}
            <div className="p-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 mb-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-blue-600 text-xl">{item.icon}</span>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Mobile Stats */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="grid grid-cols-3 gap-2">
                {stats.slice(0, 6).map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-2xl mb-1">{stat.icon}</span>
                    <span className="text-xs font-medium text-gray-700 leading-tight">{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="p-4 bg-white border-t">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleLoginClick}
                  className="login-btn text-white py-3.5 rounded-xl font-semibold text-lg"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="register-btn text-white py-3.5 rounded-xl font-semibold text-lg"
                >
                  Register
                </button>
              </div>
              
              {/* Mobile Icons Row */}
              <div className="flex justify-center space-x-8 mt-6">
                <div className="relative">
                  <button
                    onClick={handleWishlistClick}
                    className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-full"
                  >
                    <FaHeart className="text-red-500 text-2xl" />
                  </button>
                  <span className="badge">3</span>
                </div>
                
                <div className="relative">
                  <button
                    onClick={handleCartClick}
                    className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full"
                  >
                    <FaShoppingCart className="text-blue-600 text-2xl" />
                  </button>
                  <span className="badge">5</span>
                </div>
                
                <button
                  onClick={handleLoginClick}
                  className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full"
                >
                  <FaUser className="text-purple-600 text-2xl" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔥 RUNNING BLACK STATS BAR (24×7) */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden border-t border-gray-700">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, loopIndex) => (
              <div
                key={loopIndex}
                className="flex items-center space-x-10 px-6 py-3"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center text-white/90 text-sm font-medium"
                  >
                    <span className="text-xl mr-3">{stat.icon}</span>
                    <span>{stat.text}</span>
                    <span className="mx-8 text-white/20">|</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Add spacing for fixed navbar */}
      <div className="pt-32"></div>
    </>
  );
};

export default PrintShoppyNavbar;