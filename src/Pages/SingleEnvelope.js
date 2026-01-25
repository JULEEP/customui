import React, { useState } from "react";

const SingleEnvelope = () => {
  const [quantity, setQuantity] = useState(100);
  const [pincode, setPincode] = useState("");
  const [selectedGift, setSelectedGift] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState("");

  // Envelope customization fields
  const [companyName, setCompanyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [addressLine4, setAddressLine4] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // Quantity options and pricing
  const quantityOptions = [
    { qty: 100, price: 900 },
    { qty: 200, price: 1800 },
    { qty: 300, price: 2700 },
    { qty: 500, price: 4500 },
    { qty: 1000, price: 9000 },
    { qty: 2000, price: 18000 }
  ];

  const selectedProduct = quantityOptions.find(item => item.qty === quantity);

  // Gift options
  const giftOptions = [
    { id: 1, name: "Premium Pen", value: "₹299" },
    { id: 2, name: "Notepad", value: "₹249" },
    { id: 3, name: "Keychain", value: "₹199" },
    { id: 4, name: "Sticker Pack", value: "₹159" }
  ];

  // Paper options
  const paperOptions = [
    "--- Please Select ---",
    "120 GSM Maplitho Paper",
    "150 GSM Premium Paper",
    "100 GSM Recycled Paper",
    "200 GSM Card Paper"
  ];

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      alert(`Delivery available for pincode: ${pincode}`);
    } else {
      alert("Please enter a valid 6-digit pincode");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartDesign = () => {
    // Here you would typically save the design and proceed
    const designData = {
      companyName,
      addressLine1,
      addressLine2,
      addressLine3,
      addressLine4,
      phoneNumber,
      email,
      hasLogo: !!logoFile,
      paperType: selectedPaper,
      quantity
    };
    
    alert("Design saved! Proceeding to checkout...");
    console.log("Design data:", designData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          Home / Stationery / Envelopes / <span className="font-semibold">Envelope Printing</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ENVELOPE TEMPLATES
            </h1>

            {/* Google Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xl">★★★★</span>
                <span className="text-yellow-400 text-xl">☆</span>
              </div>
              <span className="text-gray-900 font-bold text-lg">4.4</span>
              <span className="text-gray-600">(56704+)</span>
              <span className="text-blue-600 text-sm font-medium ml-2">Our Customer Reviews On Google</span>
            </div>

            {/* Editable Fields Section - FIRST */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                CUSTOMIZE YOUR ENVELOPE
              </h2>
              
              {/* Editable Fields Grid */}
              <div className="space-y-6">
                {/* Row 1: Company Name and Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Upload Logo</label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                        <span className="text-gray-600">
                          {logoFile ? logoFile.name : "Select logo file"}
                        </span>
                        <span className="text-blue-600 font-medium">Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                      {logoPreview && (
                        <div className="w-12 h-12 border border-gray-300 rounded-lg overflow-hidden">
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {logoPreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview("");
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Address Fields - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 1</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address, P.O. Box"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 2</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Apartment, suite, unit, building"
                    />
                  </div>
                </div>

                {/* Address Fields - Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 3</label>
                    <input
                      type="text"
                      value={addressLine3}
                      onChange={(e) => setAddressLine3(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Town"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 4</label>
                    <input
                      type="text"
                      value={addressLine4}
                      onChange={(e) => setAddressLine4(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="State, Province, Region"
                    />
                  </div>
                </div>

                {/* Contact Info - Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleStartDesign}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Preview Design
                </button>
              </div>
            </div>

            {/* Product Image - SECOND (नीचे) */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                ENVELOPE PREVIEW
              </h3>
              <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/envelope/envelope-141-600x600.webp"
                  alt="Envelope Template"
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-transparent opacity-20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-200 to-transparent opacity-20 rounded-tl-full"></div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                PRODUCT DETAILS
              </h2>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ENVELOPE PRINTING & CUTTING
                </h3>
                <div className="text-gray-700 mb-4">
                  22.8 cm x 10.2 cm
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">PRICING</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">120 GSM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quantityOptions.map((item) => (
                          <tr key={item.qty} className={`${item.qty === quantity ? 'bg-blue-50' : ''}`}>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.qty}</td>
                            <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Rs. {item.price.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="text-green-600 mr-2 mt-1">✓</div>
                    <span className="text-gray-700">Multi Color Printing</span>
                  </div>
                  <div className="flex items-start">
                    <div className="text-green-600 mr-2 mt-1">✓</div>
                    <span className="text-gray-700">Paper Quality: 120 GSM Maplitho Paper</span>
                  </div>
                  <div className="flex items-start">
                    <div className="text-green-600 mr-2 mt-1">✓</div>
                    <span className="text-gray-700">Size: Width - 22.8 cm & Height - 10.2 cm *</span>
                  </div>
                  <div className="flex items-start">
                    <div className="text-green-600 mr-2 mt-1">✓</div>
                    <span className="text-gray-700">Free Shipping</span>
                  </div>
                  <div className="flex items-start">
                    <div className="text-green-600 mr-2 mt-1">✓</div>
                    <span className="text-gray-700">10% Cashback</span>
                  </div>
                </div>

                <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300">
                  MORE INFO
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Ordering Panel */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit sticky top-6">
            
            {/* SELECT OPTIONS */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">SELECT OPTIONS</h3>
              
              {/* Paper Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">PAPER</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedPaper}
                  onChange={(e) => setSelectedPaper(e.target.value)}
                >
                  {paperOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">₹{selectedProduct?.price}</span>
                <span className="text-green-600 font-semibold ml-3">Free Shipping</span>
              </div>

              {/* Free Gift Banner */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">FREE GIFT WORTH ₹299</span>
                    <p className="text-sm text-gray-600 mt-1">Limited time offer!</p>
                  </div>
                  <div className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
                    81 gifts left today
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">1</div>
                  <span className="font-semibold text-gray-900">Pick gift</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {giftOptions.map((gift) => (
                    <div
                      key={gift.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-300 ${selectedGift === gift.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedGift(gift.id)}
                    >
                      <div className="font-medium text-gray-900">{gift.name}</div>
                      <div className="text-gray-600 text-sm">Worth {gift.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold mr-3">2</div>
                  <span className="font-semibold text-gray-900">Add to cart</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Qty:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-32">
                  <select 
                    className="w-full px-4 py-3 focus:outline-none appearance-none bg-white"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {quantityOptions.map((option) => (
                      <option key={option.qty} value={option.qty}>{option.qty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg mb-6 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg">
                ADD TO CART
              </button>

              {/* Delivery Check */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Check Delivery</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Enter your pincode to check delivery availability.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="Enter Pincode"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  />
                  <button
                    onClick={handleCheckDelivery}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-300"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEnvelope;