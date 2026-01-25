import React, { useState } from "react";

const SinglePrescriptionPad = () => {
  const [quantity, setQuantity] = useState(50);
  const [paperType, setPaperType] = useState("Premium");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);
  
  // Editable fields for prescription pad customization
  const [clinicName, setClinicName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [qualification, setQualification] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // Quantity options and pricing
  const quantityOptions = [
    { qty: 50, price: 750 },
    { qty: 100, price: 1200 },
    { qty: 150, price: 1650 },
    { qty: 200, price: 2000 },
    { qty: 300, price: 2850 }
  ];

  const selectedProduct = quantityOptions.find(item => item.qty === quantity);

  // Paper options
  const paperOptions = [
    "--- Please Select ---",
    "Premium 80 GSM",
    "Super Premium 100 GSM",
    "Carbonless Duplicate",
    "Triplicate Carbonless",
    "Bond Paper 70 GSM"
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
      product: "Prescription Pad",
      clinicName,
      doctorName,
      qualification,
      registrationNumber,
      address: `${clinicAddress}, ${cityState}, PIN: ${pinCode}`,
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
    alert(`Added to cart: ${quantity} prescription pads for Dr. ${doctorName}`);
    console.log("Cart item:", cartItem);
  };

  const handleStartDesign = () => {
    alert("Design saved! You can now customize your prescription pad.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          Home / Stationery / Prescription Pads / <span className="font-semibold">Premium Prescription Pad</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              PRESCRIPTION PAD TEMPLATES
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
                CUSTOMIZE YOUR PRESCRIPTION PAD
              </h2>
              
              {/* Editable Fields Grid */}
              <div className="space-y-6">
                {/* Row 1: Clinic Name and Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Clinic/Hospital Name</label>
                    <input
                      type="text"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter clinic/hospital name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Clinic Logo</label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                        <span className="text-gray-600">
                          {logoFile ? logoFile.name : "Select logo file"}
                        </span>
                        <span className="text-teal-600 font-medium">Choose File</span>
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

                {/* Row 2: Doctor Name and Qualification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Doctor's Name</label>
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Dr. Full Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Qualification</label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="MBBS, MD, MS, etc."
                    />
                  </div>
                </div>

                {/* Row 3: Registration and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Registration Number</label>
                    <input
                      type="text"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Medical Council Registration No."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Clinic Address</label>
                    <input
                      type="text"
                      value={clinicAddress}
                      onChange={(e) => setClinicAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Street, Area, Landmark"
                    />
                  </div>
                </div>

                {/* Row 4: City and PIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">City & State</label>
                    <input
                      type="text"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">PIN Code</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="PIN Code"
                      maxLength="6"
                    />
                  </div>
                </div>

                {/* Row 5: Contact Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Mobile Number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Clinic Phone Number"
                    />
                  </div>
                </div>

                {/* Row 6: Email and Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="clinic@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Website</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="www.clinicwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Start Design Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleStartDesign}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Start Design
                </button>
              </div>
            </div>

            {/* Product Image - BELOW EDITABLE FIELDS */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                PRESCRIPTION PAD PREVIEW
              </h3>
              <div className="flex items-center justify-center h-96 bg-gradient-to-br from-teal-50 to-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
                  alt="Prescription Pad Template"
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-200 to-transparent opacity-20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-200 to-transparent opacity-20 rounded-tl-full"></div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                PRODUCT DETAILS
              </h2>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  PRESCRIPTION PAD TYPE
                </h3>
                <div className="text-gray-700 mb-4">
                  Standard Prescription Pad<br />
                  A4 Size (21cm x 29.7cm)
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">PAD FEATURES</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Premium 80-100 GSM Paper</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Carbonless Duplicate/Triplicate Options</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Pre-printed Serial Numbers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Perforated Pages for Easy Tear</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">Spiral Binding or Glue Binding</span>
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
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Per Pad Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quantityOptions.map((item) => (
                          <tr key={item.qty} className={`${item.qty === quantity ? 'bg-teal-50' : ''}`}>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.qty} Pads</td>
                            <td className="border border-gray-300 px-4 py-3 font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-600">₹{(item.price/item.qty).toFixed(0)} per pad</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">MEDICAL FIELDS INCLUDED</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Patient Name & Age</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Date & Registration No.</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Diagnosis Section</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Medication Details</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Dosage Instructions</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Doctor's Signature Space</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Next Visit Date</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Clinic Contact Info</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">DELIVERY TIME</h4>
                  <div className="flex items-center justify-center bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">5-7 Days</div>
                      <div className="text-gray-600 mt-2">Standard Medical Delivery</div>
                      <div className="text-sm text-gray-500">Priority delivery available for hospitals</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">PROFESSIONAL MEDICAL STANDARDS</h4>
                  <p className="text-gray-600 italic">
                    Designed according to medical council guidelines with proper fields for patient information, diagnosis, treatment, and follow-up. Includes space for doctor's signature and clinic stamp.
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">₹{selectedProduct?.price}</span>
                  <span className="text-green-600 font-semibold ml-3">Free Shipping</span>
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {selectedProduct && `₹${(selectedProduct.price/selectedProduct.qty).toFixed(0)} per pad`}
                </div>
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
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    1
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 1</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    2
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 2</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Quantity (Pads)</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
                  <select 
                    className="w-full px-4 py-3 focus:outline-none appearance-none bg-white"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {quantityOptions.map((option) => (
                      <option key={option.qty} value={option.qty}>{option.qty} Pads</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-4 rounded-lg mb-6 hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-md hover:shadow-lg"
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
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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

              {/* Medical Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Medical Council Approved</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">HIPAA Compliant Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Professional Medical Format</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrescriptionPad;