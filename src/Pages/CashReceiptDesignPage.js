import React, { useState } from "react";

const CashReceiptDesignPage = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "", slogan: "", address: "", mobile: "", email: "", website: ""
  });

  const [formData, setFormData] = useState({
    cashReceipt: "", cashReceiptType: "", eachBookContains: "", paperType: "",
    serialNumber: "", instructionsToPrinter: "", quantity: 3, selectedGift: "",
    deliveryPincode: ""
  });

  const [price, setPrice] = useState(750);
  const [giftsLeft, setGiftsLeft] = useState(57);

  const cashReceiptOptions = [
    { value: "", label: "--- Please Select ---" },
    { value: "standard", label: "Standard Cash Receipt" },
    { value: "premium", label: "Premium Cash Receipt" },
    { value: "custom", label: "Custom Cash Receipt" }
  ];

  const cashReceiptTypeOptions = [
    { value: "", label: "--- Please Select ---" },
    { value: "duplicate", label: "Duplicate Receipt Books" },
    { value: "triplicate", label: "Triplicate Receipt Books" },
    { value: "all-originals", label: "All Originals Receipt Books" }
  ];

  const eachBookContainsOptions = [
    { value: "", label: "--- Please Select ---" },
    { value: "50-50", label: "50 Originals + 50 Duplicates" },
    { value: "50-50-50", label: "50 Originals + 50 Duplicates + 50 Triplicates" }
  ];

  const paperTypeOptions = [
    { value: "", label: "--- Please Select ---" },
    { value: "90-gsm", label: "90 GSM Maplitho (Original)" },
    { value: "70-gsm", label: "70 GSM Maplitho (Duplicate/Triplicate)" }
  ];

  const serialNumberOptions = [
    { value: "", label: "--- Please Select ---" },
    { value: "with-serial", label: "With Serial Numbers" },
    { value: "without-serial", label: "Without Serial Numbers" },
    { value: "custom-start", label: "Custom Starting Number" }
  ];

  const quantityOptions = [3, 5, 10, 20, 50];

  const gifts = [
    { id: 1, name: "Pen Set", value: "pen-set", icon: "✒️" },
    { id: 2, name: "Note Pad", value: "note-pad", icon: "📒" },
    { id: 3, name: "Stapler", value: "stapler", icon: "📎" },
    { id: 4, name: "File Folder", value: "file-folder", icon: "📁" }
  ];

  const pricingTable = {
    3: { duplicate: 750, triplicate: 1126, "all-originals": 938 },
    5: { duplicate: 1250, triplicate: 1877, "all-originals": 1564 },
    10: { duplicate: 2500, triplicate: 3754, "all-originals": 3127 },
    20: { duplicate: 5000, triplicate: 7508, "all-originals": 6254 },
    50: { duplicate: 12500, triplicate: 18770, "all-originals": 15635 }
  };

  const handleCompanyDetailsChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "quantity" || name === "cashReceiptType") updatePrice();
  };

  const updatePrice = () => {
    const qty = formData.quantity;
    const type = formData.cashReceiptType;
    if (qty && type && pricingTable[qty] && pricingTable[qty][type]) {
      setPrice(pricingTable[qty][type]);
    }
  };

  const handleGiftSelect = (giftValue) => {
    setFormData(prev => ({ ...prev, selectedGift: giftValue }));
    setGiftsLeft(prev => prev - 1);
  };

  const handleReset = () => {
    setCompanyDetails({
      companyName: "", slogan: "", address: "", mobile: "", email: "", website: ""
    });
    setFormData({
      cashReceipt: "", cashReceiptType: "", eachBookContains: "", paperType: "",
      serialNumber: "", instructionsToPrinter: "", quantity: 3, selectedGift: "",
      deliveryPincode: ""
    });
    setPrice(750);
  };

  const handleAddToCart = () => {
    alert(`Added to cart!\nTotal: ₹${price}\nQuantity: ${formData.quantity}`);
  };

  const handleCheckDelivery = () => {
    if (formData.deliveryPincode.length === 6) {
      alert(`Delivery available for pincode: ${formData.deliveryPincode}`);
    } else {
      alert("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-6 px-3">
      <div className="max-w-7xl mx-auto">
        
        {/* Attractive Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-wide">CASH RECEIPT TEMPLATES</h1>
          </div>
          <div className="mt-4 bg-white rounded-xl p-4 inline-block shadow-md border border-amber-200">
            <p className="text-gray-700 font-medium">
              Our Customer Reviews On{" "}
              <a href="https://www.google.com" className="text-blue-600 hover:underline font-bold">
                Google
              </a>
            </p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full">
                <span className="font-bold text-lg">4.4</span>
                <span className="ml-1 text-amber-100">(56,704+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column - Company Details & Product Preview */}
          <div className="lg:w-3/5 space-y-6">
            
            {/* Company Details Card */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">COMPANY DETAILS</h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">🏷️</span> Company Name
                    </label>
                    <input type="text" name="companyName" value={companyDetails.companyName}
                      onChange={handleCompanyDetailsChange} placeholder="Your Company Name"
                      className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">💬</span> Slogan / Tagline
                    </label>
                    <input type="text" name="slogan" value={companyDetails.slogan}
                      onChange={handleCompanyDetailsChange} placeholder="Your Company Slogan"
                      className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-orange-500">📍</span> Address
                  </label>
                  <textarea name="address" value={companyDetails.address}
                    onChange={handleCompanyDetailsChange} placeholder="Full Company Address"
                    rows="3"
                    className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">📱</span> Mobile
                    </label>
                    <input type="text" name="mobile" value={companyDetails.mobile}
                      onChange={handleCompanyDetailsChange} placeholder="+91"
                      className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">📧</span> Email
                    </label>
                    <input type="email" name="email" value={companyDetails.email}
                      onChange={handleCompanyDetailsChange} placeholder="contact@company.com"
                      className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">🌐</span> Website
                    </label>
                    <input type="url" name="website" value={companyDetails.website}
                      onChange={handleCompanyDetailsChange} placeholder="www.company.com"
                      className="w-full p-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Preview Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">PRODUCT PREVIEW</h2>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-8 border-2 border-dashed border-amber-300">
                  <div className="flex items-center justify-center">
                    <img 
                      src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-196-600x600.webp"
                      alt="Cash Receipt Design"
                      className="w-full max-w-md h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-bold">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Options & Order */}
          <div className="lg:w-2/5 space-y-6">
            
            {/* Select Options Card */}
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">⚙️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">SELECT OPTIONS</h2>
              </div>

              <div className="space-y-5">
                {[
                  { label: "CASH RECEIPT", name: "cashReceipt", options: cashReceiptOptions, icon: "📋" },
                  { label: "CASH RECEIPT TYPE", name: "cashReceiptType", options: cashReceiptTypeOptions, icon: "📑" },
                  { label: "EACH BOOK CONTAINS", name: "eachBookContains", options: eachBookContainsOptions, icon: "📚" },
                  { label: "PAPER TYPE", name: "paperType", options: paperTypeOptions, icon: "📄" },
                  { label: "SERIAL NUMBER", name: "serialNumber", options: serialNumberOptions, icon: "🔢" },
                ].map((field) => (
                  <div key={field.name} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                    <label className="block text-gray-800 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-emerald-500">{field.icon}</span> {field.label}
                    </label>
                    <select name={field.name} value={formData[field.name]}
                      onChange={handleFormDataChange}
                      className="w-full p-3 border-2 border-emerald-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                  <label className="block text-gray-800 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-emerald-500">✍️</span> INSTRUCTIONS TO PRINTER
                  </label>
                  <textarea name="instructionsToPrinter" value={formData.instructionsToPrinter}
                    onChange={handleFormDataChange} placeholder="Any special printing instructions..."
                    rows="3"
                    className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" />
                </div>

                <button onClick={handleReset}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-xl font-bold text-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <span>🔄</span> Reset All Options
                </button>
              </div>
            </div>

            {/* Price & Cart Card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl font-extrabold text-white mb-2">₹{price}</div>
                <div className="text-amber-100 text-lg font-medium">Free Shipping 🚚</div>
                <div className="text-white/80 text-sm mt-1">All Inclusive Price</div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <h3 className="text-white font-bold mb-3 text-lg">📦 SELECT QUANTITY</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {quantityOptions.map(qty => (
                    <button key={qty} type="button"
                      onClick={() => handleFormDataChange({ target: { name: "quantity", value: qty } })}
                      className={`p-3 rounded-lg font-bold transition-all duration-300 ${
                        formData.quantity === qty
                          ? "bg-white text-orange-600 shadow-xl scale-105"
                          : "bg-orange-700/50 text-white hover:bg-orange-600"
                      }`}>
                      {qty} Books
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Gift Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6 border border-amber-300/30">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-white mb-1">🎁 FREE GIFT WORTH ₹299</div>
                  <div className="text-amber-200 text-sm">Limited Time Offer! ⏰</div>
                  <div className="text-white/90 text-sm mt-2">{giftsLeft} gifts left today</div>
                </div>

                {/* Gift Selection */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {gifts.map(gift => (
                    <button key={gift.id} type="button" onClick={() => handleGiftSelect(gift.value)}
                      disabled={giftsLeft === 0}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        formData.selectedGift === gift.value
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                          : "bg-white/20 hover:bg-white/30 text-white"
                      } ${giftsLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <div className="text-2xl mb-1">{gift.icon}</div>
                      <div className="font-medium text-sm">{gift.name}</div>
                    </button>
                  ))}
                </div>

                {/* Steps */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-orange-600 rounded-full flex items-center justify-center font-bold shadow">1</div>
                    <span className="text-white font-medium">Add to Cart</span>
                  </div>
                  <div className="h-px flex-1 bg-white/30 mx-4"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-200 text-orange-600 rounded-full flex items-center justify-center font-bold shadow">2</div>
                    <span className="text-white font-medium">Pick Gift</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-extrabold text-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3">
                <span className="text-2xl">🛒</span> ADD TO CART
                <span className="text-amber-200">→</span>
              </button>
            </div>

            {/* Delivery Check Card */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🚚</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">CHECK DELIVERY</h2>
              </div>
              
              <div className="space-y-4">
                <input type="text" name="deliveryPincode" value={formData.deliveryPincode}
                  onChange={handleFormDataChange} placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  className="w-full p-4 border-2 border-purple-300 rounded-xl text-center text-lg font-bold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" />
                <button onClick={handleCheckDelivery}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  ✅ Check Delivery Availability
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section - Attractive Design */}
        <div className="mt-10">
          
          {/* Product Details Card */}
          <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl p-8 shadow-xl border border-sky-200 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📋</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">PRODUCT DETAILS</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm">
                  <h3 className="text-xl font-bold text-sky-700 mb-2 flex items-center gap-2">
                    <span>📐</span> CASH RECEIPT TYPE
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">A5</p>
                  <p className="text-gray-600">14.8cm x 21cm</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm">
                  <h3 className="text-xl font-bold text-sky-700 mb-3 flex items-center gap-2">
                    <span>📚</span> A5 CASH RECEIPT BOOK
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 font-medium">Duplicate Receipt Books.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 font-medium">Triplicate Receipt Books.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 font-medium">All Originals Receipt Books.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm">
                  <h3 className="text-xl font-bold text-sky-700 mb-3 flex items-center gap-2">
                    <span>🎨</span> EACH BOOK CONTAINS
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex gap-3 mb-2">
                        <span className="bg-white border border-pink-200 text-pink-600 px-3 py-1 rounded-full">White</span>
                        <span className="bg-pink-100 border border-pink-300 text-pink-700 px-3 py-1 rounded-full">Pink</span>
                      </div>
                      <p className="font-bold text-gray-800">50 Originals + 50 Duplicates</p>
                    </div>
                    <div>
                      <div className="flex gap-3 mb-2">
                        <span className="bg-white border border-amber-200 text-amber-600 px-3 py-1 rounded-full">White</span>
                        <span className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-3 py-1 rounded-full">Yellow</span>
                        <span className="bg-pink-100 border border-pink-300 text-pink-700 px-3 py-1 rounded-full">Pink</span>
                      </div>
                      <p className="font-bold text-gray-800">50 Originals + 50 Duplicates + 50 Triplicates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Table Card */}
          <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-xl border border-emerald-200 mb-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">PRICING TABLE</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    <th className="p-4 text-left text-lg font-bold rounded-l-xl">Quantity</th>
                    <th className="p-4 text-left text-lg font-bold">Duplicate</th>
                    <th className="p-4 text-left text-lg font-bold">Triplicate</th>
                    <th className="p-4 text-left text-lg font-bold rounded-r-xl">All Originals</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(pricingTable).map(([qty, prices]) => (
                    <tr key={qty} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-4 border-b font-bold text-gray-800">{qty} Books</td>
                      <td className="p-4 border-b">
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold">
                          Rs. {prices.duplicate}
                        </span>
                      </td>
                      <td className="p-4 border-b">
                        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold">
                          Rs. {prices.triplicate}
                        </span>
                      </td>
                      <td className="p-4 border-b">
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
                          Rs. {prices["all-originals"]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* More Info Card */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-xl border border-orange-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">ℹ️</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">CASH RECEIPT BOOK AFTER FINISHING</h2>
                <h3 className="text-xl font-bold text-orange-600 mt-2">MORE INFO</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "🎨 Multi Color Printing",
                "📄 Original Paper Quality : 90 GSM Maplitho",
                "📄 Duplicate Paper Quality : 70 GSM Maplitho",
                "📄 Triplicate Paper Quality : 70 GSM Maplitho",
                "📐 A5 Size (small) : Width - 21 cm & Height - 14.8 cm *",
                "🚚 Free Shipping",
                "💰 10% Cashback",
                "✅ Premium Quality Finish",
                "⚡ Quick Delivery"
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.split(' ')[0]}</div>
                    <span className="text-gray-700 font-medium">{item.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReceiptDesignPage;