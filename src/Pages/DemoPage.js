import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const DemoPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    demoFor: "", // Default selected option
    demoDate: "",
    demoTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://school-backend-1-2xki.onrender.com/api/admin/create-demo", formData);
      showPopup(response.data.message, "success");
      setFormData({ fullName: "", email: "", phone: "", address: "", demoFor: "", demoDate: "", demoTime: "" });
    } catch (error) {
      showPopup(error.response?.data?.message || "Something went wrong!", "error");
    }
    setLoading(false);
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Static Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-6 mt-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-purple-900 mb-4">Request For a Demo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            
            <select name="demoFor" value={formData.demoFor} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400">
              <option value="" disabled>Demo For</option>
              <option value="For School">For School</option>
              <option value="For Coaching">For Coaching</option>
              <option value="For Library">For Library</option>
            </select>
            
            <input type="date" name="demoDate" value={formData.demoDate} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <input type="time" name="demoTime" value={formData.demoTime} onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
            <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition" disabled={loading}>
              {loading ? "Submitting..." : "Request Demo"}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Popup */}
      {popup.show && (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default DemoPage;
