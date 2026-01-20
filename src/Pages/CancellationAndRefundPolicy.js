import React from "react";
import Footer from "./Footer"; // Importing the Footer component

const CancellationAndRefundPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <div className="p-6 md:p-12 mx-auto mt-6 md:mt-10 max-w-4xl flex-grow">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-700">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: 20 August 2025</p>
          <div className="border-b border-gray-300 mt-4 mb-4"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
          <p>
            At <strong>VSD Cars</strong>, we aim to provide a seamless car rental experience. This Cancellation & Refund Policy outlines the terms and conditions for cancelling bookings and requesting refunds.
          </p>

          <h2 className="font-semibold text-red-700">1. Cancellation Policy</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Bookings can be cancelled up to 24 hours before the scheduled pickup time for a full refund.</li>
            <li>Cancellations made within 24 hours of the pickup time will incur a 50% cancellation fee.</li>
            <li>No-show or failure to pick up the vehicle without prior cancellation will result in no refund.</li>
          </ul>

          <h2 className="font-semibold text-red-700">2. Refund Policy</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Refunds will be processed to the original payment method within 7-10 business days.</li>
            <li>In case of vehicle unavailability due to unforeseen circumstances, a full refund will be issued.</li>
            <li>Refunds are not applicable for services rendered, including fuel charges, tolls, or fines incurred during the rental period.</li>
          </ul>

          <h2 className="font-semibold text-red-700">3. How to Cancel</h2>
          <p>
            To cancel your booking, please contact our customer support team at{" "}
            <a href="mailto:contact.vsdcars@gmail.com" className="text-blue-600 underline">
              contact.vsdcars@gmail.com
            </a>{" "}
            or call us at +91 94249 77848. Provide your booking reference number and the reason for cancellation.
          </p>

          <h2 className="font-semibold text-red-700">4. Force Majeure</h2>
          <p>
            In the event of circumstances beyond our control, such as natural disasters, strikes, or government restrictions, we reserve the right to cancel bookings without liability. In such cases, a full refund will be issued.
          </p>

          <h2 className="font-semibold text-red-700">5. Contact Us</h2>
          <p>
            For any questions or concerns regarding our Cancellation & Refund Policy, please reach out to us at:
          </p>
          <p>Email: <a href="mailto:contact.vsdcars@gmail.com" className="text-blue-600 underline">contact.vsdcars@gmail.com</a></p>
          <p>Phone: +91 94249 77848</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CancellationAndRefundPolicy;
