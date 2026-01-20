import React from "react";
import Footer from "./Footer"; // import your Footer component

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-4 md:p-8 mx-auto mt-6 md:mt-10 max-w-4xl flex-grow">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: 20 August 2025</p>
          <div className="border-b border-gray-300 mt-4 mb-4"></div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
          <p>
            At <strong>VSD Cars</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your data when you use our App.
          </p>

          <h2 className="font-semibold text-blue-700">1. Collection of Personal Data</h2>
          <p>We collect personal data that you provide to us when you:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Create an account on the App</li>
            <li>Fill out a profile or registration form</li>
            <li>Upload content to the App</li>
            <li>Contact us with a question or request</li>
          </ul>
          <p>The personal data we collect may include:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Your name, profile image, and contact information</li>
            <li>Your Aadhar and Driving License</li>
            <li>Your current location</li>
            <li>Any other information you choose to provide to us</li>
          </ul>

          <h2 className="font-semibold text-blue-700">2. Use of Personal Data</h2>
          <ul className="list-disc list-inside ml-4">
            <li>To provide access to the App and its features</li>
            <li>For account creation and sign-up verification</li>
            <li>To display your profile information</li>
            <li>For customer verification using Aadhar and Driving License</li>
            <li>To suggest nearby available cars based on location</li>
            <li>To personalize your experience</li>
            <li>To respond to your support requests</li>
            <li>To improve the App functionality</li>
          </ul>

          <h2 className="font-semibold text-blue-700">3. Protection of Personal Data</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Encryption during transmission</li>
            <li>Secure server storage</li>
          </ul>

          <h2 className="font-semibold text-blue-700">4. Sharing of Personal Data</h2>
          <p>We may share your data with third-party service providers including:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Cloud storage providers</li>
            <li>Customer support platforms</li>
          </ul>
          <p>Also, we may share data with law enforcement if required by law.</p>

          <h2 className="font-semibold text-blue-700">5. Your Rights</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Access your personal data</li>
            <li>Delete your personal account</li>
          </ul>
          <p>
            Contact us:{" "}
            <a href="mailto:contact.vsdcars@gmail.com" className="text-blue-600 underline">
              contact.vsdcars@gmail.com
            </a>
          </p>
          <p>
            Or directly via Gmail:{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&to=contact.vsdcars@gmail.com"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to compose in Gmail
            </a>
          </p>

          <h2 className="font-semibold text-blue-700">6. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. For major changes, we’ll notify you via email or App notice.
            By using the App, you agree to the updated terms.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
