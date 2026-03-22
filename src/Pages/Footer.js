import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  MessageCircle,
} from "lucide-react";

const FooterExact = () => {
  return (
    <footer className="relative mt-24">
      {/* Claymorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.1)'
            }}
          />
        ))}
      </div>

      {/* CURVED WRAPPER with Claymorphism */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-[40px] shadow-[20px_20px_40px_rgba(0,0,0,0.3),_-20px_-20px_40px_rgba(255,255,255,0.05)] pt-16 relative">
        <div className="max-w-7xl mx-auto px-6 text-white relative z-10">

          {/* TRUST BAR with Claymorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center border-b border-white/10 pb-10">
            <Trust icon={<ShieldCheck size={26} />} text="PREMIUM QUALITY ASSURED" />
            <Divider />
            <Trust icon={<Truck size={26} />} text="FREE AND FAST DELIVERY" />
            <Divider />
            <Trust icon={<RotateCcw size={26} />} text="30 DAYS RETURN POLICY" />
          </div>

          {/* FOLLOW + SUPPORT with Claymorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-14 border-b border-white/10">
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-wide mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                FOLLOW US
              </h3>
              <div className="flex justify-center gap-10">
                <Social icon={<Facebook />} label="Facebook" />
                <Social icon={<Twitter />} label="Twitter" />
                <Social icon={<Instagram />} label="Instagram" />
                <Social icon={<Youtube />} label="Youtube" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-wide mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SUPPORT
              </h3>
              <p className="text-gray-400 mb-8">
                Got Questions? We're Here To Help
              </p>
              <div className="flex justify-center gap-14">
                <Support icon={<Phone />} label="Phone" />
                <Support icon={<MessageCircle />} label="Whatsapp" />
              </div>
            </div>
          </div>

          {/* PAYMENTS with Claymorphism */}
          <div className="py-14 border-b border-white/10 text-center">
            <h3 className="text-2xl font-semibold tracking-wide mb-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              100% SECURE PAYMENTS
            </h3>

            <div className="flex flex-wrap justify-center gap-8">
              {[
                "gpay-v1",
                "phone-pey-v1",
                "paytm-v1",
                "bhim-upi-v1",
                "mastercard-v1",
                "visa-electron-v2",
                "mastro-v1",
                "visa-v1",
              ].map((logo, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.05)] flex items-center justify-center border border-white/20 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={`https://cdn.printshoppy.com/image/catalog/v7/svg/home-page/${logo}.svg`}
                    alt={logo}
                    className="h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* WHITE LINK PANEL with Claymorphism */}
          <div className="bg-white/10 backdrop-blur-md text-white rounded-[28px] mt-16 px-12 py-14 mb-12 shadow-[20px_20px_40px_rgba(0,0,0,0.2),_-20px_-20px_40px_rgba(255,255,255,0.05)] border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
              <FooterCol title="COMPANY" links={["About Us", "T&C's", "Refer & Earn"]} />
              <FooterCol
                title="BEST SELLERS"
                links={["Wall Photo Frames", "Photo Stands", "Mobile Cases", "Photo Mugs"]}
              />
              <FooterCol
                title="SUPPORT"
                links={["Contact Us", "Track Order", "Return Order", "FAQ's"]}
              />
              <FooterCol
                title="MORE INFO"
                links={["My Account", "Order History", "Your Credits"]}
              />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-12px) rotate(2deg); 
          }
          66% { 
            transform: translateY(8px) rotate(-1deg); 
          }
        }
        
        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </footer>
  );
};

/* HELPERS with Claymorphism */
const Trust = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.05)] border border-white/20 group-hover:scale-110 transition-all duration-300">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <p className="text-xs tracking-widest font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{text}</p>
  </div>
);

const Divider = () => (
  <div className="hidden md:block w-px h-12 bg-white/20 mx-auto" />
);

const Social = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 text-sm group">
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.05)] border border-white/20 group-hover:scale-110 transition-all duration-300">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{label}</span>
  </div>
);

const Support = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 text-sm group">
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.05)] border border-white/20 group-hover:scale-110 transition-all duration-300">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{label}</span>
  </div>
);

const FooterCol = ({ title, links }) => (
  <div className="group">
    <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/30 w-fit pb-1 group-hover:border-white transition-all duration-300">
      {title}
    </h4>
    <ul className="space-y-4 text-sm">
      {links.map((l, i) => (
        <li key={i} className="text-gray-400 hover:text-white hover:underline cursor-pointer transition-all duration-300">
          {l}
        </li>
      ))}
    </ul>
  </div>
);

export default FooterExact;