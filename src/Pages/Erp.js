import React from "react";
import {
  TagIcon,
  ChartBarIcon,
  ClockIcon,
  UserAddIcon,
  ShieldCheckIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { InView } from "react-intersection-observer";
import 'animate.css';

const SchoolERP = () => {
  const features = [
    {
      icon: <TagIcon className="w-8 h-8 text-yellow-500" />,
      title: "Create Custom Coupons",
      description: "Vendors can easily generate discount codes with flexible rules and values.",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-yellow-500" />,
      title: "Set Expiry & Usage Limits",
      description: "Control validity periods, redemption limits, and user eligibility.",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-yellow-500" />,
      title: "Track Performance",
      description: "Get real-time insights into coupon redemptions and campaign effectiveness.",
    },
    {
      icon: <UserAddIcon className="w-8 h-8 text-yellow-500" />,
      title: "User-Friendly Redemption",
      description: "Customers can apply discounts at checkout online or in-store effortlessly.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-yellow-500" />,
      title: "Secure & Reliable",
      description: "Encrypted processing ensures all transactions are safe and trustworthy.",
    },
    {
      icon: <CogIcon className="w-8 h-8 text-yellow-500" />,
      title: "Vendor Control Panel",
      description: "Manage all campaigns, coupons, and analytics in a centralized dashboard.",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-blue-900 to-blue-300"> {/* Updated background */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to <span className="text-yellow-300">Discount Application</span>
        </h2>
        <p className="text-lg text-yellow-100 mb-4">
          Our powerful platform allows <span className="font-bold">vendors</span> to create customized coupons and promotional codes with ease.
        </p>
        <p className="text-lg text-yellow-100 mb-4">
          Vendors can manage discount campaigns, set expiration dates, usage limits, and track redemptions in real-time.
        </p>
        <p className="text-lg text-yellow-100 mb-4">
          Users can effortlessly apply these coupons at checkout and enjoy exclusive savings – whether shopping online or in-store.
        </p>
        <p className="text-lg text-yellow-100 mb-10">
          It's fast, efficient, and a win-win for both businesses and customers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <InView key={index} triggerOnce={true} threshold={0.5}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={`bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-lg transform transition-transform hover:-translate-y-2 ${
                    inView ? "animate__animated animate__fadeInUp" : ""
                  }`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4 shadow">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
                </div>
              )}
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolERP;
