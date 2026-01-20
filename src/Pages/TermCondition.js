import React from "react";
import Footer from "./Footer"; // Import your existing footer

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: 20 August 2025</p>
        <div className="space-y-5 text-sm sm:text-base text-gray-800 leading-relaxed">

          <p>
            These Terms and Conditions ("Terms") govern your use of the VSD Cars application ("App"). By accessing or using the App, you agree to comply with and be bound by these Terms.
          </p>

          <h2 className="font-semibold text-purple-700">1. Acceptance of Terms</h2>
          <p>
            By creating an account or using any part of the App, you accept these Terms in full. If you disagree with any part of the Terms, you must not use the App.
          </p>

          <h2 className="font-semibold text-purple-700">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and possess a valid Driving License and Aadhar to use the App’s services.
          </p>

          <h2 className="font-semibold text-purple-700">3. User Responsibilities</h2>
          <ul className="list-disc list-inside ml-4">
            <li>You agree to provide accurate and complete information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You must not misuse the App or its features in any illegal or unauthorized way.</li>
          </ul>

          <h2 className="font-semibold text-purple-700">4. Verification & Documents</h2>
          <p>
            We require users to upload their Aadhar and Driving License for identity and driving eligibility verification. These documents are securely stored and used only for the intended verification purpose.
          </p>

          <h2 className="font-semibold text-purple-700">5. Booking & Usage</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Users must ensure the vehicle is handled with care during the booking period.</li>
            <li>Any damage caused during the rental period may result in charges as per company policy.</li>
            <li>Location data may be used to suggest nearby available vehicles.</li>
          </ul>

          <h2 className="font-semibold text-purple-700">6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account for any breach of these Terms or misuse of the App, with or without notice.
          </p>

          <h2 className="font-semibold text-purple-700">7. Limitation of Liability</h2>
          <p>
            VSD Cars is not liable for any indirect, incidental, or consequential damages arising from your use of the App.
          </p>

          <h2 className="font-semibold text-purple-700">8. Updates to Terms</h2>
          <p>
            These Terms may be updated periodically. Continued use of the App after such updates constitutes your agreement to the revised Terms.
          </p>

          <h2 className="font-semibold text-purple-700">9. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, please contact us at:{" "}
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

export default TermsAndConditions;
