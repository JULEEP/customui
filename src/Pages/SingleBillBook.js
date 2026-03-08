// SingleBillBook.jsx - Updated with more fields
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaStar, FaShippingFast, FaUndo, FaRupeeSign, FaGoogle, 
  FaSave, FaSpinner, FaShoppingCart, FaArrowRight, FaGift,
  FaCheckCircle, FaTruck, FaShieldAlt, FaHeart, FaBuilding,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaFileInvoice, FaTag
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const SingleBillBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Customer Details State - Expanded with more fields
  const [customerDetails, setCustomerDetails] = useState({
    companyName: "",
    address: "",
    mobile: "",
    alternateMobile: "", // Additional field
    email: "",
    gstNo: "", // Changed from gstin to gstNo
    description: "" // New field for order description/notes
  });
  
  const [quantity, setQuantity] = useState(1);
  const [selectedBillBook, setSelectedBillBook] = useState("");
  const [selectedBillBookType, setSelectedBillBookType] = useState("");
  const [selectedBookContains, setSelectedBookContains] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);
  const [billBook, setBillBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const API_BASE_URL = "https://designback.onrender.com";

  useEffect(() => {
    fetchBillBook();
  }, [id]);

  const fetchBillBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/billbook/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setBillBook(result.data);
      } else {
        throw new Error("Failed to fetch bill book");
      }
    } catch (err) {
      console.error("Error fetching bill book:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const defaultImage = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";

  const options = {
    billBooks: [
      "A4 Bill Book",
      "A5 Bill Book", 
      "Duplicate Bill Book",
      "Triplicate Bill Book",
      "All Originals Bill Book"
    ],
    billBookTypes: [
      "A4 Size - 21cm x 29.7cm",
      "A5 Size - 14.8cm x 21cm"
    ],
    bookContains: [
      "50 SET - 50 Originals + 50 Duplicates",
      "50 SET - 50 Originals + 50 Duplicates + 50 Triplicates",
      "100 SET - 100 Originals + 100 Duplicates",
      "100 Originals Only",
      "200 Originals Only"
    ],
    paperTypes: [
      "90 GSM Maplitho (Original)",
      "70 GSM Maplitho (Duplicate)",
      "70 GSM Maplitho (Triplicate)",
      "Multicolor Printing"
    ],
    serialNumbers: [
      "Sequential Numbering",
      "Custom Starting Number",
      "No Serial Number"
    ]
  };

  const handleBackClick = () => {
    navigate("/bill-books");
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = () => {
    // Validate required fields
    if (!customerDetails.companyName || !customerDetails.address || !customerDetails.mobile) {
      toast.error("Please fill in Company Name, Address, and Mobile Number");
      return;
    }

    if (customerDetails.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (customerDetails.alternateMobile && customerDetails.alternateMobile.length !== 10) {
      toast.error("Please enter a valid 10-digit alternate mobile number");
      return;
    }

    setIsAddingToCart(true);

    // Create cart item with all fields
    const cartItem = {
      id: Date.now(), // Unique ID for cart item
      productId: billBook._id,
      name: billBook.name,
      image: getImageUrl(),
      quantity: quantity,
      price: calculatePrice(),
      customerDetails: {
        companyName: customerDetails.companyName,
        address: customerDetails.address,
        mobile: customerDetails.mobile,
        alternateMobile: customerDetails.alternateMobile,
        email: customerDetails.email,
        gstNo: customerDetails.gstNo,
        description: customerDetails.description
      },
      selectedOptions: {
        billBook: selectedBillBook,
        billBookType: selectedBillBookType,
        bookContains: selectedBookContains,
        paperType: selectedPaperType,
        serialNumber: selectedSerialNumber
      },
      timestamp: new Date().toISOString()
    };

    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item
    existingCart.push(cartItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Show success message
    toast.success("Item added to cart successfully!");
    
    setIsAddingToCart(false);

    // Navigate to cart after short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1500);
  };

  const calculatePrice = () => {
    const basePrice = billBook?.textElements ? billBook.textElements.length * 100 + 500 : 750;
    return basePrice * quantity;
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

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

  const resetOptions = () => {
    setSelectedBillBook("");
    setSelectedBillBookType("");
    setSelectedBookContains("");
    setSelectedPaperType("");
    setSelectedSerialNumber("");
  };

  const promiseData = [
    {
      icon: <FaShippingFast className="text-2xl text-blue-600" />,
      title: "FREE SHIPPING",
      description: "About shipping charges, No worries its completely on us"
    },
    {
      icon: <FaUndo className="text-2xl text-green-600" />,
      title: "30 DAYS EASY RETURNS",
      description: "We Provide 30 days hassle free returns & refunds."
    },
    {
      icon: <FaShieldAlt className="text-2xl text-purple-600" />,
      title: "QUALITY GUARANTEE",
      description: "100% satisfaction guaranteed with premium quality"
    },
    {
      icon: <FaHeart className="text-2xl text-red-600" />,
      title: "CUSTOM DESIGN",
      description: "Personalized just the way you want it"
    }
  ];

  const getImageUrl = () => {
    if (!billBook?.file || imageError) return defaultImage;
    
    const filePath = billBook.file;
    
    if (filePath.startsWith('http')) {
      return filePath;
    }
    
    const cleanPath = filePath.replace(/\\/g, '/');
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    
    return `${API_BASE_URL}/${normalizedPath}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading bill book details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !billBook) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center bg-red-50 p-8 rounded-xl border border-red-200 max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Bill Book</h3>
            <p className="text-gray-600 mb-4">{error || "Bill book not found"}</p>
            <button
              onClick={handleBackClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Bill Books
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-center" />
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 group"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Bill Books
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {billBook.name}
                </h1>
                
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4 min-h-[400px] flex items-center justify-center border-2 border-gray-200 group">
                  <img
                    src={getImageUrl()}
                    alt={billBook.name}
                    className="max-h-[350px] max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  {billBook?.isEdited && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <FaCheckCircle className="mr-1" /> CUSTOMIZED
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center mb-4">
                  <FaGoogle className="text-blue-600 mr-3 text-xl" />
                  <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>
                  <span className="ml-2 font-bold text-gray-900 text-xl">4.4</span>
                  <span className="ml-2 text-gray-600 text-lg">(57042+ reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Premium Quality</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Fast Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Configuration */}
            <div className="space-y-6">
              {/* Customer Details Form - Enhanced with more fields */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </span>
                  Enter Your Details
                </h2>
                
                <div className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaBuilding className="mr-2 text-blue-600" />
                      Company Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={customerDetails.companyName}
                      onChange={handleCustomerDetailsChange}
                      placeholder="Enter your company name"
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-600" />
                      Address <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={customerDetails.address}
                      onChange={handleCustomerDetailsChange}
                      placeholder="Enter your full address"
                      rows="3"
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Mobile Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-green-600" />
                        Mobile <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={customerDetails.mobile}
                        onChange={handleCustomerDetailsChange}
                        placeholder="10-digit mobile"
                        maxLength="10"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-purple-600" />
                        Alternate Mobile
                      </label>
                      <input
                        type="tel"
                        name="alternateMobile"
                        value={customerDetails.alternateMobile}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Alternate number"
                        maxLength="10"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Email and GST */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaEnvelope className="mr-2 text-yellow-600" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerDetails.email}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Email address"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaFileInvoice className="mr-2 text-indigo-600" />
                        GST No.
                      </label>
                      <input
                        type="text"
                        name="gstNo"
                        value={customerDetails.gstNo}
                        onChange={handleCustomerDetailsChange}
                        placeholder="Enter GST number"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Description/Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaTag className="mr-2 text-pink-600" />
                      Description / Special Instructions
                    </label>
                    <textarea
                      name="description"
                      value={customerDetails.description}
                      onChange={handleCustomerDetailsChange}
                      placeholder="Any special instructions or notes for your order..."
                      rows="3"
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Product Configuration */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">2</span>
                  </span>
                  Customize Your Bill Book
                </h2>
                
                <div className="space-y-4">
                  {/* Bill Book Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bill Book Type</label>
                    <select
                      value={selectedBillBook}
                      onChange={(e) => setSelectedBillBook(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Bill Book Type</option>
                      {options.billBooks.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                    <select
                      value={selectedBillBookType}
                      onChange={(e) => setSelectedBillBookType(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Size</option>
                      {options.billBookTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Book Contains */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Book Contains</label>
                    <select
                      value={selectedBookContains}
                      onChange={(e) => setSelectedBookContains(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Pages/Sheets</option>
                      {options.bookContains.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Paper Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Type</label>
                    <select
                      value={selectedPaperType}
                      onChange={(e) => setSelectedPaperType(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Paper Type</option>
                      {options.paperTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Serial Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Serial Number</label>
                    <select
                      value={selectedSerialNumber}
                      onChange={(e) => setSelectedSerialNumber(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Serial Number Option</option>
                      {options.serialNumbers.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={resetOptions}
                    className="w-full py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Reset Options
                  </button>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">₹{calculatePrice()}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-bold text-xl">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delivery Check */}
                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="flex-1 p-3 border-2 border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      maxLength="6"
                    />
                    <button
                      onClick={handleCheckDelivery}
                      className="px-6 bg-blue-600 text-white font-medium rounded-r-xl hover:bg-blue-700"
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
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
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
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {promiseData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mr-3">
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

      <Footer />
    </div>
  );
};

export default SingleBillBook;