import React, { useState } from "react";

const PrintShoppyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const topLinks = [
    { name: "Contact Us", href: "#contact" },
    { name: "FAQ's", href: "#faq" },
    { name: "Track Order", href: "#track" },
  ];

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Premium", href: "#premium" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
  ];

  const stats = [
    { icon: "🏆", text: "EST. 2015" },
    { icon: "👑", text: "Trusted By Millions" },
    { icon: "🖼️", text: "1 Crore+ Photos Printed" },
    { icon: "✨", text: "Premium Materials" },
  ];

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
      `}</style>

      <nav className="bg-white shadow-lg fixed w-full z-50">
        {/* 🔹 Top Strip */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-end py-1.5 space-x-6">
              {topLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-white hover:text-blue-100"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Main Navbar */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl">
                  CD
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold">
                    CUSTOM
                    <span className="text-blue-600">DESIGN</span>
                  </h1>
                  <p className="text-xs text-gray-500">
                    Premium Printing Since 2015
                  </p>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-semibold text-gray-700 hover:text-blue-600"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Right Buttons */}
              <div className="flex items-center space-x-3">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hidden md:block">
                  Login / Register
                </button>

                {/* Mobile Toggle */}
                <button
                  className="lg:hidden text-2xl"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}

        {/* 🔥 RUNNING BLACK STATS BAR (24×7) */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, loopIndex) => (
              <div
                key={loopIndex}
                className="flex items-center space-x-10 px-6 py-3"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center text-white/90 text-sm font-medium"
                  >
                    <span className="text-lg mr-2">{stat.icon}</span>
                    <span>{stat.text}</span>
                    <span className="mx-6 text-white/30">•</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrintShoppyNavbar;
