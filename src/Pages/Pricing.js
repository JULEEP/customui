import React, { useState } from "react";
import { BiCheck } from "react-icons/bi"; // Import check icon
import { BiX } from "react-icons/bi"; // Import the X icon for closing popup

const PricingCart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChoosePlan = (planName) => {
    setSelectedPlan(planName);
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked, but no action taken.");
  };

  // Define the single plan with all features included
  const planDetails = {
    name: "Poster Design Plan",
    price: "499.00",
    originalPrice: "₹870.00",
    features: [
      "Posters Design",
      "High-Resolution Files",
      "Unlimited Revisions",
      "Priority Email Support",
      "Simple Design",
      "Standard Templates",
      "Custom Branding for Posters",
      "High-Quality Design Files for Print & Web",
      "24/7 Customer Support",
      "Free Consultation for Design Ideas",
      "Access to Premium Templates", // New feature added
      "Multiple File Formats for Download", // New feature added
      "Design Customization Options", // New feature added
      "Priority Support", // New feature added
      "Exclusive Updates on New Templates" // New feature added
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 flex justify-center items-center">
      <div className="container mx-auto px-6 sm:px-8 grid grid-cols-1 gap-8 justify-center">
        {/* Title and Divider */}
        <div className="col-span-full text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Choose Your Poster Design Plan</h2>
          <div className="h-px bg-purple-600 w-24 mx-auto"></div>
        </div>

        {/* Single Plan */}
        <div className="bg-white border-2 border-purple-600 rounded-xl p-4 relative w-full max-w-xs mx-auto">
          <div className="text-left mb-6">
            <div className="text-2xl font-bold text-blue-900 mb-2 mt-8">{planDetails.name}</div>
            <div className="text-sm text-purple-600 font-bold mb-4 mt-2">All features included in this plan.</div>
            <div className="flex items-center mb-2 mt-4">
              <div className="text-sm font-semibold text-gray-600 mr-3 line-through">{planDetails.originalPrice}</div>
              <div className="text-xl text-blue-600 font-bold">50% OFF</div>
            </div>
            <div className="text-3xl font-bold mt-4">
              <span className="text-xl text-blue-900">₹</span>
              <span className="text-blue-900">{planDetails.price}</span>{" "}
              <span className="text-sm text-gray-600">/ Year</span>
            </div>
            <div
              onClick={() => handleChoosePlan(planDetails.name)}
              className="mt-4 py-2 px-4 border-2 text-center border-purple-600 text-blue-600 rounded-md cursor-pointer hover:bg-purple-600 hover:text-white transition duration-300"
            >
              Choose Plan
            </div>
          </div>
          <div className="my-4 h-px bg-gray-400 w-full mx-auto"></div>
          <div className="space-y-2 mt-4">
            <div>
              <h3 className="text-sm font-semibold text-purple-800 mb-2">Top Features</h3>
              <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                {planDetails.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <BiCheck className="text-purple-600 text-xs mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Plan Selection Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="text-2xl text-blue-900 font-semibold mb-4">
                Your Selected Plan: {selectedPlan}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-gray-300 p-3 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full border border-gray-300 p-3 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any Message"
                    className="w-full border border-gray-300 p-3 rounded-md"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="py-2 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                  >
                    Send Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <BiX />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCart;
