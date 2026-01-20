import React from "react";
import Footer from "./Footer"; // Assuming you have a Footer component

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-4 md:p-8 mx-auto mt-6 md:mt-10 max-w-4xl flex-grow">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Shipping Policy</h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: 20 August 2025</p>
          <div className="border-b border-gray-300 mt-4 mb-4"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
          <p>
            At <strong>VSD Cars</strong>, we are committed to delivering your bookings smoothly and on time. This Shipping Policy outlines the terms related to vehicle delivery and pick-up services.
          </p>

          <h2 className="font-semibold text-blue-700">1. Delivery Options</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Vehicle delivery is available to your specified location within our service area.</li>
            <li>Delivery charges, if any, will be communicated during the booking process.</li>
            <li>Delivery times are estimates and may vary due to traffic or unforeseen delays.</li>
          </ul>

          <h2 className="font-semibold text-blue-700">2. Pick-Up & Return</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Vehicles must be returned to the agreed location at the end of the rental period.</li>
            <li>Late returns may incur additional charges as per company policy.</li>
            <li>Any damage or issues must be reported immediately upon return.</li>
          </ul>

          <h2 className="font-semibold text-blue-700">3. Shipping Restrictions</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Delivery and pick-up services are limited to our operational zones only.</li>
            <li>We do not offer international shipping or delivery outside authorized areas.</li>
          </ul>

          <h2 className="font-semibold text-blue-700">4. Responsibility</h2>
          <p>
            You are responsible for inspecting the vehicle upon delivery and reporting any pre-existing damage immediately. Failure to report may result in liability for damages.
          </p>

          <h2 className="font-semibold text-blue-700">5. Contact Us</h2>
          <p>
            For questions or concerns about shipping and delivery, please contact us at:{" "}
            <a href="mailto:contact.vsdcars@gmail.com" className="text-blue-600 underline">
              contact.vsdcars@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
