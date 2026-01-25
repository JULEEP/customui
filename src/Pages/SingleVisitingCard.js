import React, { useState } from "react";

const SingleVisitingCard = () => {
  const [quantity, setQuantity] = useState(100);
  const [paperType, setPaperType] = useState("Premium");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);
  
  // Editable fields for visiting card customization
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // Quantity options and pricing
  const quantityOptions = [
    { qty: 100, price: 399, originalPrice: 499 },
    { qty: 200, price: 699, originalPrice: 899 },
    { qty: 300, price: 999, originalPrice: 1299 },
    { qty: 500, price: 1499, originalPrice: 1999 },
    { qty: 1000, price: 2499, originalPrice: 3299 }
  ];

  const selectedProduct = quantityOptions.find(item => item.qty === quantity);

  // Paper options
  const paperOptions = [
    "--- Please Select ---",
    "Premium 350 GSM",
    "Super Premium 400 GSM",
    "Matt Finish 350 GSM",
    "Glossy Finish 350 GSM",
    "Linen Finish 350 GSM"
  ];

  const handleCheckDelivery = () => {
    if (pickupLocation) {
      alert(`Delivery available for: ${pickupLocation}`);
    } else {
      alert("Please enter pickup location");
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

  const handleAddToCart = () => {
    const cartItem = {
      product: "Visiting Card",
      name,
      designation,
      companyName,
      address: `${addressLine1}, ${addressLine2}`,
      contact: {
        mobile: mobileNumber,
        phone: phoneNumber,
        email,
        website
      },
      hasLogo: !!logoFile,
      paperType,
      quantity,
      price: selectedProduct?.price
    };
    alert(`Added to cart: ${quantity} visiting cards for ${name}`);
    console.log("Cart item:", cartItem);
  };

  const handleStartDesign = () => {
    alert("Design saved! You can now customize your visiting card.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          Home / Stationery / Visiting Cards / <span className="font-semibold">Premium Visiting Card</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              VISITING CARD TEMPLATES
            </h1>

            {/* Google Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-600 text-sm font-medium">Our Customer Reviews On Google</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <span className="font-bold text-gray-900">4.4</span>
                <span className="text-gray-600">(562704+)</span>
              </div>
            </div>

            {/* Editable Fields Section - ABOVE IMAGE */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                CUSTOMIZE YOUR VISITING CARD
              </h2>
              
              {/* Editable Fields Grid */}
              <div className="space-y-6">
                {/* Row 1: Name and Designation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Full Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Designation"
                    />
                  </div>
                </div>

                {/* Row 2: Company Name and Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Company Logo</label>
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

                {/* Address Fields - Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 1</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address, Building"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Address Line 2</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Area, City, PIN"
                    />
                  </div>
                </div>

                {/* Contact Info - Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* Contact Info - Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="yourname@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Website</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="www.companyname.com"
                    />
                  </div>
                </div>
              </div>

              {/* Start Design Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleStartDesign}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Start Design
                </button>
              </div>
            </div>

            {/* Product Image - BELOW EDITABLE FIELDS */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                VISITING CARD PREVIEW
              </h3>
              <div className="flex items-center justify-center h-96 bg-gradient-to-br from-purple-50 to-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src="https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
                  alt="Visiting Card Template"
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-transparent opacity-20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-200 to-transparent opacity-20 rounded-tl-full"></div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                PRODUCT DETAILS
              </h2>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  VISITING CARD TYPE
                </h3>
                <div className="text-gray-700 mb-4">
                  Standard Business Card<br />
                  3.5" x 2" (89mm x 51mm)
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">CARD FEATURES</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Premium 350 GSM Card Stock</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Double-sided Color Printing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">UV Coating / Spot UV Available</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Matt / Glossy / Linen Finish Options</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Rounded Corners Available</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">PRICING</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Original Price</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">You Save</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quantityOptions.map((item) => (
                          <tr key={item.qty} className={`${item.qty === quantity ? 'bg-purple-50' : ''}`}>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.qty}</td>
                            <td className="border border-gray-300 px-4 py-3 font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-500 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</td>
                            <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">₹{(item.originalPrice - item.price).toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">PRINTING FEATURES</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Full Color Both Sides</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">High Resolution Printing</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">CMYK Color Mode</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Bleed Area Included</span>
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
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">DELIVERY TIME</h4>
                  <div className="flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">3-5 Days</div>
                      <div className="text-gray-600 mt-2">Standard Delivery</div>
                      <div className="text-sm text-gray-500">Express delivery available</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">PROFESSIONAL FINISHING</h4>
                  <p className="text-gray-600 italic">
                    Premium finishing with UV coating, spot UV, embossing options available for that extra professional touch.
                  </p>
                </div>
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
                <label className="block text-gray-700 mb-2 font-semibold">PAPER TYPE</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                >
                  {paperOptions.map((paper, index) => (
                    <option key={index} value={paper}>
                      {paper}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price with Discount */}
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">₹{selectedProduct?.price}</span>
                  <span className="text-gray-500 line-through text-xl ml-3">₹{selectedProduct?.originalPrice}</span>
                  <span className="text-green-600 font-semibold ml-3">Save ₹{selectedProduct && selectedProduct.originalPrice - selectedProduct.price}</span>
                </div>
                <div className="text-green-600 font-semibold mt-2">Free Shipping</div>
              </div>

              {/* Free Gift Banner */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">FREE GIFT WORTH ₹299</span>
                    <p className="text-sm text-gray-600 mt-1">Limited time offer!</p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    1
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 1</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    2
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 2</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
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
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-lg mb-6 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add to cart
              </button>

              {/* Delivery Check */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Check Delivery</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Enter your pickup location:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
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

export default SingleVisitingCard;