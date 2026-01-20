import React from "react";
import {
  RefreshCcw,
  Truck,
  BadgeCheck,
} from "lucide-react";

const VisionHomegrownSection = () => {
  return (
    <div className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Icons Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-14">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center">
              <RefreshCcw size={28} />
            </div>
            <p className="text-gray-800 font-medium">
              Easy 30-Day Return Policy
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center">
              <Truck size={28} />
            </div>
            <p className="text-gray-800 font-medium">
              Express Delivery
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center">
              <BadgeCheck size={28} />
            </div>
            <p className="text-gray-800 font-medium">
              100% Quality Assured
            </p>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* OUR VISION */}
          <div className="bg-white rounded-2xl shadow-sm p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              OUR VISION
            </h3>

            <p className="text-gray-600 leading-relaxed mb-5">
              In line with our vision, we wish to be recognized as an
              organization renowned for its creative solutions,
              innovation, and quality.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We also aim to re-calibrate the benchmark standards in
              designing and printing products tailored to meet the
              needs of a diverse customer base.
            </p>
          </div>

          {/* WE ARE HOMEGROWN */}
          <div className="rounded-2xl p-10 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <h3 className="text-3xl font-extrabold mb-6 flex items-center gap-3">
              <span className="text-orange-500">🇮🇳</span>
              WE ARE <span className="text-orange-400">HOMEGROWN.</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
              <ul className="space-y-3 list-disc list-inside text-gray-200">
                <li>Printing your memories since 2015</li>
                <li>Everything is personalised</li>
              </ul>

              <ul className="space-y-3 list-disc list-inside text-gray-200">
                <li>Guaranteed high quality products</li>
                <li>Free delivery All Over India</li>
              </ul>
            </div>

            <div className="border-t border-gray-600 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="text-2xl font-bold">24 Lakh +</h4>
                <p className="text-gray-300 text-sm">Happy Customers</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">56704 +</h4>
                <p className="text-gray-300 text-sm">Google Reviews</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">57 Lakh +</h4>
                <p className="text-gray-300 text-sm">Products Delivered</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">50000 +</h4>
                <p className="text-gray-300 text-sm">5-Star Ratings</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VisionHomegrownSection;
