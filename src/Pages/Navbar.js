import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHeart, FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus,
  FaTrophy, FaUsers, FaCamera, FaGem, FaTruck, FaStarHalfAlt,
  FaPalette, FaHome, FaSignOutAlt, FaUserCircle, FaStore,
  FaClipboardList, FaGift, FaHistory
} from "react-icons/fa";

const PrintShoppyNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  // Check if user is logged in on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab("home");
    navigate("/");
  };

  const stats = [
    { icon: <FaTrophy className="text-yellow-400" />, text: "EST. 2015" },
    { icon: <FaUsers className="text-blue-400" />, text: "Trusted By Millions" },
    { icon: <FaCamera className="text-purple-400" />, text: "1 Crore+ Photos Printed" },
    { icon: <FaGem className="text-indigo-400" />, text: "Premium Materials" },
    { icon: <FaTruck className="text-green-400" />, text: "Free Shipping" },
    { icon: <FaStarHalfAlt className="text-yellow-500" />, text: "4.4/5 Rating" },
  ];

  const handleLoginClick = () => navigate("/");
  const handleRegisterClick = () => navigate("/register");
  const handleWishlistClick = () => {
    setActiveTab("wishlist");
    navigate("/wishlist");
  };
  const handleCartClick = () => {
    setActiveTab("cart");
    navigate("/cart");
  };
  const handleLogoClick = () => {
    setActiveTab("home");
    navigate("/home");
  };
  const handleHomeClick = () => {
    setActiveTab("home");
    navigate("/home");
  };
  const handleProfileClick = () => {
    setActiveTab("profile");
    navigate("/my-profile");
  };
  const handleOrdersClick = () => {
    setActiveTab("orders");
    navigate("/orders");
  };
  const handleLogout = () => logout();

  return (
    <>
      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .icon-btn {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          box-shadow: 4px 4px 8px rgba(184, 185, 190, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.5);
        }
        
        .icon-btn:hover {
          transform: scale(1.05);
          box-shadow: 6px 6px 12px rgba(184, 185, 190, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.6);
        }
        
        .login-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          box-shadow: 6px 6px 12px rgba(102, 126, 234, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 8px 8px 16px rgba(102, 126, 234, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.6);
        }
        
        .register-btn {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          box-shadow: 6px 6px 12px rgba(240, 147, 251, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 8px 8px 16px rgba(240, 147, 251, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.6);
        }
        
        .logout-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 6px 6px 12px rgba(239, 68, 68, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 8px 8px 16px rgba(239, 68, 68, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.6);
        }
        
        .badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background: linear-gradient(135deg, #FF416C, #FF4B2B);
          color: white;
          font-size: 9px;
          font-weight: bold;
          min-width: 16px;
          height: 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 8px rgba(255, 65, 108, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.5);
          animation: badgePulse 1.5s ease-in-out infinite;
        }
        
        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .logo-glow {
          animation: logoPulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes logoPulse {
          0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }

        /* Desktop Styles */
        .desktop-icons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Modern Bottom Navigation - Clean 4 Icon Design */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);
          z-index: 100;
          padding: 10px 20px 14px;
        }

        .bottom-nav-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          max-width: 350px;
          margin: 0 auto;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 0;
          border-radius: 12px;
          transition: all 0.2s ease;
          background: transparent;
          color: #9CA3AF;
          position: relative;
          cursor: pointer;
          flex: 1;
        }
        
        .bottom-nav-item:hover {
          transform: translateY(-2px);
        }
        
        .bottom-nav-item.active {
          color: #8B5CF6;
        }
        
        .bottom-nav-item.active .nav-icon-wrapper {
          transform: scale(1.05);
        }
        
        .nav-icon-wrapper {
          position: relative;
          transition: all 0.2s ease;
        }
        
        .nav-icon {
          transition: all 0.2s ease;
          font-size: 24px;
        }
        
        .bottom-nav-item.active .nav-icon {
          filter: drop-shadow(0 2px 6px rgba(139, 92, 246, 0.3));
        }
        
        .nav-label {
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          letter-spacing: 0.3px;
        }
        
        /* Active indicator dot */
        .active-dot {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #8B5CF6;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.2s ease;
        }
        
        .bottom-nav-item.active .active-dot {
          opacity: 1;
          bottom: -6px;
        }
        
        /* Mobile Logout Button */
        .mobile-logout-btn {
          position: fixed;
          bottom: 85px;
          right: 20px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          z-index: 101;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
        }
        
        .mobile-logout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
        }
        
        /* Responsive */
        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
          .mobile-logout-btn {
            display: none !important;
          }
        }
        
        @media (max-width: 767px) {
          .desktop-icons {
            display: none !important;
          }
          body {
            padding-bottom: 70px;
          }
          .mobile-logout-btn {
            display: ${isLoggedIn ? 'flex' : 'none'};
          }
        }
      `}</style>

      <nav className="fixed w-full z-50">
        {/* Main Navbar */}
        <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <div 
                className="flex items-center space-x-2 md:space-x-4 cursor-pointer group"
                onClick={handleLogoClick}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] logo-glow">
                  CD
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">
                    <span className="text-gray-800">CUSTOM</span>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-1 md:ml-2">
                      DESIGN
                    </span>
                  </h1>
                  <p className="text-[10px] md:text-xs text-gray-600 font-medium mt-0.5 md:mt-1 flex items-center">
                    <FaPalette className="mr-1 text-indigo-500 text-[8px] md:text-xs" />
                    Premium Printing Since 2015
                  </p>
                </div>
              </div>

              {/* Desktop Icons - Hidden on Mobile */}
              <div className="desktop-icons">
                <div className="relative">
                  <button
                    onClick={handleWishlistClick}
                    className="icon-btn p-2 md:p-3 rounded-full transition-all"
                  >
                    <FaHeart className="text-red-500 text-lg md:text-xl" />
                  </button>
                  <span className="badge">3</span>
                </div>

                <div className="relative">
                  <button
                    onClick={handleCartClick}
                    className="icon-btn p-2 md:p-3 rounded-full transition-all"
                  >
                    <FaShoppingCart className="text-indigo-600 text-lg md:text-xl" />
                  </button>
                  <span className="badge">5</span>
                </div>

                {isLoggedIn && user ? (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="icon-btn p-2 md:p-3 rounded-full transition-all"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                        <FaUserCircle className="text-base md:text-xl" />
                      </div>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="logout-btn text-white px-4 md:px-6 py-1.5 md:py-2.5 rounded-full font-semibold text-sm md:text-base"
                    >
                      <FaSignOutAlt className="inline mr-1 md:mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="icon-btn p-2 md:p-3 rounded-full transition-all"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                        <FaUser className="text-base md:text-lg" />
                      </div>
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="login-btn text-white px-4 md:px-6 py-1.5 md:py-2.5 rounded-full font-semibold text-sm md:text-base"
                    >
                      <FaSignInAlt className="inline mr-1 md:mr-2" />
                      Login
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="register-btn text-white px-4 md:px-6 py-1.5 md:py-2.5 rounded-full font-semibold text-sm md:text-base"
                    >
                      <FaUserPlus className="inline mr-1 md:mr-2" />
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Running Stats Bar */}
        <div className="bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm overflow-hidden border-t border-white/10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, loopIndex) => (
              <div key={loopIndex} className="flex items-center space-x-10 px-6 py-2 md:py-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center text-white/90 text-xs md:text-sm font-medium">
                    <div className="text-base md:text-xl mr-2 md:mr-3">{stat.icon}</div>
                    <span>{stat.text}</span>
                    <span className="mx-6 md:mx-8 text-white/20">|</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Clean Mobile Bottom Navigation - 4 Icons like Home, Wishlist, Cart, Profile */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          {/* Home */}
          <button 
            onClick={handleHomeClick} 
            className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          >
            <div className="nav-icon-wrapper">
              <FaHome className="nav-icon" />
              <div className="active-dot"></div>
            </div>
            <span className="nav-label">Home</span>
          </button>

          {/* Wishlist with Badge */}
          <button 
            onClick={handleWishlistClick} 
            className={`bottom-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
          >
            <div className="nav-icon-wrapper relative">
              <FaHeart className="nav-icon" />
              <span className="badge">3</span>
              <div className="active-dot"></div>
            </div>
            <span className="nav-label">Wishlist</span>
          </button>

          {/* Cart with Badge */}
          <button 
            onClick={handleCartClick} 
            className={`bottom-nav-item ${activeTab === 'cart' ? 'active' : ''}`}
          >
            <div className="nav-icon-wrapper relative">
              <FaShoppingCart className="nav-icon" />
              <span className="badge">5</span>
              <div className="active-dot"></div>
            </div>
            <span className="nav-label">Cart</span>
          </button>

          {/* Profile / Account */}
          <button
            onClick={isLoggedIn ? handleProfileClick : handleLoginClick}
            className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <div className="nav-icon-wrapper">
              {isLoggedIn ? <FaUserCircle className="nav-icon" /> : <FaUser className="nav-icon" />}
              <div className="active-dot"></div>
            </div>
            <span className="nav-label">{isLoggedIn ? "Profile" : "Account"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Logout Button - Only visible when logged in */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="mobile-logout-btn"
          aria-label="Logout"
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      )}

      {/* Spacing */}
      <div className="pt-16 md:pt-20 pb-20"></div>
    </>
  );
};

export default PrintShoppyNavbar;