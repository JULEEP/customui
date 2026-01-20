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
    <footer className="bg-transparent mt-24">
      {/* CURVED BLACK WRAPPER */}
      <div className="bg-black rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.4)] pt-16">
        <div className="max-w-7xl mx-auto px-6 text-white">

          {/* TRUST BAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center border-b border-white/20 pb-10">
            <Trust icon={<ShieldCheck size={26} />} text="PREMIUM QUALITY ASSURED" />
            <Divider />
            <Trust icon={<Truck size={26} />} text="FREE AND FAST DELIVERY" />
            <Divider />
            <Trust icon={<RotateCcw size={26} />} text="30 DAYS RETURN POLICY" />
          </div>

          {/* FOLLOW + SUPPORT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-14 border-b border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-wide mb-8">
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
              <h3 className="text-2xl font-semibold tracking-wide mb-1">
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

          {/* PAYMENTS (TEXT → IMAGES ONLY) */}
          <div className="py-14 border-b border-white/20 text-center">
            <h3 className="text-2xl font-semibold tracking-wide mb-10">
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
                  className="bg-white rounded-xl px-5 py-4 shadow-md flex items-center justify-center"
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

          {/* WHITE LINK PANEL */}
          <div className="bg-white text-black rounded-[28px] mt-16 px-12 py-14 mb-12">
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
    </footer>
  );
};

/* HELPERS – UNCHANGED */

const Trust = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-4">
    {icon}
    <p className="text-xs tracking-widest font-medium">{text}</p>
  </div>
);

const Divider = () => (
  <div className="hidden md:block w-px h-12 bg-white/30 mx-auto" />
);

const Social = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 text-sm">
    <div className="bg-white text-black p-4 rounded-xl shadow">
      {icon}
    </div>
    {label}
  </div>
);

const Support = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 text-sm">
    <div className="bg-white text-black p-5 rounded-2xl shadow">
      {icon}
    </div>
    {label}
  </div>
);

const FooterCol = ({ title, links }) => (
  <div>
    <h4 className="font-semibold text-lg mb-6 border-b-2 border-black w-fit pb-1">
      {title}
    </h4>
    <ul className="space-y-4 text-sm">
      {links.map((l, i) => (
        <li key={i} className="hover:underline cursor-pointer">
          {l}
        </li>
      ))}
    </ul>
  </div>
);

export default FooterExact;
