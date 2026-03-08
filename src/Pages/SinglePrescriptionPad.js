// SinglePrescriptionPad.jsx - Updated with cart functionality
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaStar, FaShippingFast, FaUndo, FaRupeeSign, FaGoogle, 
  FaSpinner, FaShoppingCart, FaArrowRight, FaGift,
  FaCheckCircle, FaTruck, FaShieldAlt, FaHeart,
  FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaUserMd, FaGraduationCap, FaIdCard, FaGlobe, FaImage
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const SinglePrescriptionPad = () => {
  const navigate = useNavigate();
  
  // Customer/Clinic Details State
  const [customerDetails, setCustomerDetails] = useState({
    clinicName: "",
    doctorName: "",
    qualification: "",
    registrationNumber: "",
    clinicAddress: "",
    cityState: "",
    pinCode: "",
    mobileNumber: "",
    phoneNumber: "",
    email: "",
    website: "",
    description: ""
  });

  const [quantity, setQuantity] = useState(50);
  const [paperType, setPaperType] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
    "Premium 80 GSM",
    "Super Premium 100 GSM",
    "Carbonless Duplicate",
    "Triplicate Carbonless",
    "Bond Paper 70 GSM"
  ];

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setShowDeliveryCheck(true);
      setTimeout(() => {
        setShowDeliveryCheck(false);
      }, 3000);
    } else {
      toast.error("Please enter a valid 6-digit pincode");
    }
  };

  const handleAddToCart = () => {
    // Validate required fields
    if (!customerDetails.clinicName || !customerDetails.doctorName || !customerDetails.mobileNumber) {
      toast.error("Please fill in Clinic Name, Doctor Name, and Mobile Number");
      return;
    }

    if (customerDetails.mobileNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (customerDetails.phoneNumber && customerDetails.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (customerDetails.pinCode && customerDetails.pinCode.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }

    if (!paperType) {
      toast.error("Please select paper type");
      return;
    }

    setIsAddingToCart(true);

    // Create cart item with all fields
    const cartItem = {
      id: Date.now(),
      productId: "prescription-pad",
      productType: "prescription-pad",
      name: "Premium Prescription Pad",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp",
      quantity: quantity,
      price: selectedProduct.price,
      paperType: paperType,
      customerDetails: {
        ...customerDetails,
        hasLogo: !!logoFile,
        logoPreview: logoPreview
      },
      selectedOptions: {
        paperType: paperType,
        quantity: quantity
      },
      timestamp: new Date().toISOString()
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item
    existingCart.push(cartItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Show success message
    toast.success("Prescription pad added to cart successfully!");
    
    setIsAddingToCart(false);

    // Navigate to cart after short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1500);
  };

  const calculatePrice = () => {
    return selectedProduct?.price || 750;
  };

  const promiseData = [
    {
      icon: <FaShippingFast className="text-2xl text-blue-600" />,
      title: "FREE SHIPPING",
      description: "Free shipping on all medical orders"
    },
    {
      icon: <FaUndo className="text-2xl text-green-600" />,
      title: "30 DAYS EASY RETURNS",
      description: "Hassle-free returns for medical pads"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-purple-600" />,
      title: "QUALITY GUARANTEE",
      description: "Premium medical grade paper"
    },
    {
      icon: <FaHeart className="text-2xl text-red-600" />,
      title: "MEDICAL STANDARDS",
      description: "Council approved formats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-center" />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            Home / Stationery / Prescription Pads / <span className="font-semibold">Premium Prescription Pad</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Product Info */}
            <div>
              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                PRESCRIPTION PAD
              </h1>

              {/* Google Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <FaGoogle className="text-blue-600" />
                <span className="text-gray-600">Our Customer Reviews</span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">4.4</span>
                  <span className="text-gray-600">(562704+)</span>
                </div>
              </div>

              {/* Customer/Clinic Details Form */}
              <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-bold">1</span>
                  </span>
                  Clinic & Doctor Details
                </h2>
                
                <div className="space-y-4">
                  {/* Clinic Name and Logo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaBuilding className="mr-2 text-teal-600" />
                        Clinic/Hospital Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="clinicName"
                        value={customerDetails.clinicName}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Enter clinic/hospital name"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaImage className="mr-2 text-purple-600" />
                        Clinic Logo
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50">
                          <span className="text-gray-600">
                            {logoFile ? logoFile.name : "Choose logo file"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </label>
                        {logoPreview && (
                          <div className="w-12 h-12 border-2 border-gray-300 rounded-lg overflow-hidden">
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Name and Qualification */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaUserMd className="mr-2 text-blue-600" />
                        Doctor's Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="doctorName"
                        value={customerDetails.doctorName}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Dr. Full Name"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaGraduationCap className="mr-2 text-green-600" />
                        Qualification
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        value={customerDetails.qualification}
                        onChange={handleCustomerDetailsChange}
                        placeholder="MBBS, MD, MS, etc."
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Registration and Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaIdCard className="mr-2 text-orange-600" />
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={customerDetails.registrationNumber}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Medical Council Registration No."
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-red-600" />
                        Clinic Address <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="clinicAddress"
                        value={customerDetails.clinicAddress}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Street, Area, Landmark"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* City/State and PIN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City & State</label>
                      <input
                        type="text"
                        name="cityState"
                        value={customerDetails.cityState}
                        onChange={handleCustomerDetailsChange}
                        placeholder="City, State"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={customerDetails.pinCode}
                        onChange={handleCustomerDetailsChange}
                        placeholder="PIN Code"
                        maxLength="6"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Mobile and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-green-600" />
                        Mobile Number <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={customerDetails.mobileNumber}
                        onChange={handleCustomerDetailsChange}
                        placeholder="10-digit mobile"
                        maxLength="10"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-purple-600" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={customerDetails.phoneNumber}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Clinic Phone"
                        maxLength="10"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Email and Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaEnvelope className="mr-2 text-yellow-600" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerDetails.email}
                        onChange={handleCustomerDetailsChange}
                        placeholder="clinic@email.com"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaGlobe className="mr-2 text-indigo-600" />
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={customerDetails.website}
                        onChange={handleCustomerDetailsChange}
                        placeholder="www.clinicwebsite.com"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Description/Special Instructions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      name="description"
                      value={customerDetails.description}
                      onChange={handleCustomerDetailsChange}
                      placeholder="Any special instructions for your prescription pads..."
                      rows="3"
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  PRESCRIPTION PAD PREVIEW
                </h3>
                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-teal-50 to-gray-100 rounded-lg overflow-hidden relative">
                  <img
                    src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
                    alt="Prescription Pad Template"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Ordering Panel */}
            <div className="space-y-6">
              {/* Product Configuration */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">2</span>
                  </span>
                  Select Options
                </h2>
                
                {/* Paper Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Paper Type <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    value={paperType}
                    onChange={(e) => setPaperType(e.target.value)}
                  >
                    <option value="">Select Paper Type</option>
                    {paperOptions.map((paper, index) => (
                      <option key={index} value={paper}>{paper}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity (Pads)
                  </label>
                  <select 
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {quantityOptions.map((option) => (
                      <option key={option.qty} value={option.qty}>
                        {option.qty} Pads - ₹{option.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Price:</span>
                    <span className="text-3xl font-bold text-gray-900">₹{calculatePrice()}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <FaTruck className="mr-2" />
                    Free Shipping
                  </p>
                </div>

                {/* Delivery Check */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check Delivery
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="flex-1 p-3 border-2 border-gray-300 rounded-l-xl focus:ring-2 focus:ring-teal-500"
                      maxLength="6"
                    />
                    <button
                      onClick={handleCheckDelivery}
                      className="px-6 bg-teal-600 text-white font-medium rounded-r-xl hover:bg-teal-700"
                    >
                      Check
                    </button>
                  </div>
                  {showDeliveryCheck && (
                    <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Delivery available in 5-7 days
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-4 ${
                    isAddingToCart 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700'
                  } text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center text-lg group`}
                >
                  {isAddingToCart ? (
                    <>
                      <FaSpinner className="animate-spin mr-3" />
                      ADDING TO CART...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="mr-3" />
                      ADD TO CART
                      <FaArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Free Gift Banner */}
                <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <FaGift className="text-orange-500 mr-3 text-xl" />
                    <div>
                      <span className="font-bold text-gray-900">FREE GIFT WORTH ₹299</span>
                      <p className="text-sm text-gray-600">Limited time offer!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Features */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Medical Grade Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-gray-700">Medical Council Approved</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-gray-700">HIPAA Compliant Design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-gray-700">Professional Medical Format</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-gray-700">Patient Information Fields</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {promiseData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrescriptionPad;