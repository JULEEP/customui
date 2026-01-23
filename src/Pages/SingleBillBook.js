import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaShippingFast, FaUndo, FaRupeeSign, FaGoogle } from "react-icons/fa";

const SingleBillBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedBillBook, setSelectedBillBook] = useState("");
  const [selectedBillBookType, setSelectedBillBookType] = useState("");
  const [selectedBookContains, setSelectedBookContains] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);

  const defaultImage = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";

  const billBook = {
    id: parseInt(id),
    name: "Premium Carbon Copy Bill Book",
    price: "₹750",
    description: "Professional bill book with carbon copy feature for all your business needs.",
  };

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

  const pricingTable = [
    { quantity: "3 Books", a5: "₹750", a4: "₹1500" },
    { quantity: "5 Books", a5: "₹1250", a4: "₹2500" },
    { quantity: "10 Books", a5: "₹2500", a4: "₹5000" },
    { quantity: "20 Books", a5: "₹5000", a4: "₹10000" },
    { quantity: "50 Books", a5: "₹12500", a4: "₹25000" }
  ];

  const handleBackClick = () => {
    navigate("/bill-books");
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${billBook.name} to cart!`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setShowDeliveryCheck(true);
      setTimeout(() => {
        setShowDeliveryCheck(false);
      }, 3000);
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
      icon: <FaRupeeSign className="text-2xl text-yellow-600" />,
      title: "10% CASHBACK",
      description: "With every order placed, you'll receive 10% cashback"
    }
  ];

  const statsData = [
    { value: "24 LAKH +", label: "Happy Customers" },
    { value: "57 LAKH +", label: "Products Delivered" },
    { value: "56704 +", label: "Google Reviews" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Import Navbar */}

      {/* Add margin top to separate from navbar */}
      <div className="mt-22"> {/* यहाँ margin top add किया है */}
        <div className="py-8 px-4 mt-8">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 group"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              Back to Bill Books
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Product Image */}
              <div className="lg:col-span-1">
                {/* Main Product Image */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 rounded-2xl p-8 mb-6 h-80 flex items-center justify-center relative overflow-hidden group">
                  <img
                    src={defaultImage}
                    alt={billBook.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                </div>
                
                {/* Reviews Section */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <FaGoogle className="text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">Our Customer Reviews On Google</h3>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                      ))}
                    </div>
                    <span className="ml-2 font-bold text-gray-900">4.4</span>
                    <span className="ml-2 text-gray-600">(56704+)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Based on verified customer reviews</span>
                  </div>
                </div>

                {/* PrintShoppy Promise */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-2">🤝</span>
                    PRINTSHOPPY PROMISE
                  </h3>
                  <p className="mb-4 text-blue-100">
                    We stand behind every product we make. If our products fail to live up to your standards, you can return them for a replacement or refund.
                  </p>
                  <div className="flex items-center bg-white/20 p-3 rounded-lg">
                    <span className="font-bold mr-2">✅</span>
                    <span className="font-medium">No Questions Asked</span>
                  </div>
                </div>
              </div>

              {/* Middle Column - Configuration Options */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Bill Book / Invoice Designs</h1>
                  <p className="text-gray-600 mb-6">{billBook.description}</p>
                  
                  {/* Configuration Options */}
                  <div className="space-y-5">
                    {/* BILL BOOK */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">1</span>
                        BILL BOOK
                      </label>
                      <div className="relative">
                        <select
                          value={selectedBillBook}
                          onChange={(e) => setSelectedBillBook(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">--- Please Select ---</option>
                          {options.billBooks.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* BILL BOOK TYPE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">2</span>
                        BILL BOOK TYPE
                      </label>
                      <div className="relative">
                        <select
                          value={selectedBillBookType}
                          onChange={(e) => setSelectedBillBookType(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">--- Please Select ---</option>
                          {options.billBookTypes.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* EACH BOOK CONTAINS */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">3</span>
                        EACH BOOK CONTAINS
                      </label>
                      <div className="relative">
                        <select
                          value={selectedBookContains}
                          onChange={(e) => setSelectedBookContains(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">--- Please Select ---</option>
                          {options.bookContains.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* PAPER TYPE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">4</span>
                        PAPER TYPE
                      </label>
                      <div className="relative">
                        <select
                          value={selectedPaperType}
                          onChange={(e) => setSelectedPaperType(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">--- Please Select ---</option>
                          {options.paperTypes.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* SERIAL NUMBER */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">5</span>
                        SERIAL NUMBER
                      </label>
                      <div className="relative">
                        <select
                          value={selectedSerialNumber}
                          onChange={(e) => setSelectedSerialNumber(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">--- Please Select ---</option>
                          {options.serialNumbers.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* INSTRUCTIONS TO PRINTER */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">INSTRUCTIONS TO PRINTER</label>
                      <textarea
                        placeholder="Add any special instructions for printing..."
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                        rows="4"
                      />
                    </div>

                    {/* Reset Options Button */}
                    <button
                      onClick={resetOptions}
                      className="w-full py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all border border-gray-300 flex items-center justify-center"
                    >
                      <span className="mr-2">🔄</span>
                      Reset options
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing and Actions */}
              <div className="lg:col-span-1">
                {/* Price Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6 hover:shadow-lg transition-shadow duration-300">
                  {/* Price Header */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">{billBook.price}</div>
                    <div className="flex items-center justify-center text-green-600 font-semibold">
                      <FaShippingFast className="mr-2" />
                      Free Shipping
                    </div>
                  </div>
                  
                  {/* Free Gift Banner */}
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="font-bold text-xl mb-1">FREE GIFT WORTH ₹299</div>
                      <div className="text-sm mb-2">Limited time offer!</div>
                      <div className="flex items-center text-xs">
                        <div className="flex-1 bg-white/30 h-1 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="ml-2 font-bold">127 gifts left today</span>
                      </div>
                    </div>
                  </div>

                  {/* Step Process */}
                  <div className="mb-6">
                    <div className="flex mb-3">
                      <div className="w-1/2 pr-2">
                        <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-l-xl rounded-r-lg relative">
                          <div className="absolute -top-2 -left-2 bg-blue-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                            1
                          </div>
                          <div className="text-lg">Add to cart</div>
                          <div className="text-sm opacity-90">Step - 1</div>
                        </button>
                      </div>
                      <div className="w-1/2 pl-2">
                        <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-r-xl rounded-l-lg relative opacity-80">
                          <div className="absolute -top-2 -left-2 bg-purple-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                            2
                          </div>
                          <div className="text-lg">Pick gift</div>
                          <div className="text-sm opacity-90">Step - 2</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Quantity:</span>
                      <span className="text-xl font-bold text-gray-900">{quantity}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-xl p-1">
                      <button
                        onClick={decrementQuantity}
                        className="w-12 h-12 bg-white rounded-l-lg flex items-center justify-center text-2xl font-bold text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        -
                      </button>
                      <div className="flex-1 h-12 flex items-center justify-center font-bold text-lg">
                        {quantity} {quantity === 1 ? 'Book' : 'Books'}
                      </div>
                      <button
                        onClick={incrementQuantity}
                        className="w-12 h-12 bg-white rounded-r-lg flex items-center justify-center text-2xl font-bold text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg mb-6 flex items-center justify-center text-lg group"
                  >
                    <span className="mr-3">🛒</span>
                    ADD TO CART
                    <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {/* Delivery Check */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Check Delivery</h3>
                    <p className="text-sm text-gray-600 mb-3">Enter your pincode to check delivery availability.</p>
                    <div className="flex">
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter Pincode"
                        className="flex-1 p-3 border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength="6"
                      />
                      <button
                        onClick={handleCheckDelivery}
                        className="px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-r-lg hover:from-blue-600 hover:to-blue-700"
                      >
                        Check
                      </button>
                    </div>
                    {showDeliveryCheck && (
                      <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                        <span className="mr-2">✅</span>
                        Delivery available to your pincode within 5-7 days
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    PRODUCT DETAILS
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <span className="text-blue-600 font-bold">📏</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">BILL BOOK TYPE</h4>
                        <p className="text-gray-600">A5 - 14.8cm x 21cm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <span className="text-green-600 font-bold">📄</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">EACH BOOK CONTAINS</h4>
                        <p className="text-gray-600">50 SET - 50 Originals + 50 Duplicates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <span className="text-purple-600 font-bold">🎨</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">PAPER QUALITY</h4>
                        <p className="text-gray-600">Original: 90 GSM Maplitho</p>
                        <p className="text-gray-600">Duplicate: 70 GSM Maplitho</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PrintShoppy Features Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {promiseData.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Information Section */}
            <div className="mt-12 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">PRODUCT DETAILS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bill Book Types */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📐</span>
                    BILL BOOK TYPE
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-bold">A4</span>
                        <span className="ml-2 text-gray-600">21cm x 29.7cm</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-bold">A5</span>
                        <span className="ml-2 text-gray-600">14.8cm x 21cm</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">A4 BILL BOOK</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          <span>Duplicate Bill Books.</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          <span>Triplicate Bill Books.</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          <span>All Originals.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Each Book Contains */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">📦</span>
                    EACH BOOK CONTAINS
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">50 SET</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                          <span>50 Originals + 50 Duplicates.</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                          <span>50 Originals + 50 Duplicates + 50 Triplicates.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">100 SET</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                          <span>100 Originals + 100 Duplicates.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing Table */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">💰</span>
                  PRICING
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left font-bold text-gray-700 border-b">Quantity</th>
                        <th className="p-4 text-left font-bold text-gray-700 border-b">A5 Size</th>
                        <th className="p-4 text-left font-bold text-gray-700 border-b">A4 Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingTable.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-4 border-b font-medium">{row.quantity}</td>
                          <td className="p-4 border-b font-bold text-blue-600">{row.a5}</td>
                          <td className="p-4 border-b font-bold text-purple-600">{row.a4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* More Info */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">ℹ️</span>
                  MORE INFO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Multi Color Printing</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Original Paper Quality : 90 GSM Maplitho</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Duplicate Paper Quality : 70 GSM Maplitho</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Triplicate Paper Quality : 70 GSM Maplitho</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>A5 Size : Width - 14.8 cm & Height - 21 cm</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>A4 Size : Width - 21 cm & Height - 29.7 cm</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>10% Cashback</span>
                  </div>
                </div>
              </div>
              
              {/* Bill Book After Finishing */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">BILL BOOK AFTER FINISHING</h3>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 h-80 flex flex-col items-center justify-center border-2 border-dashed border-blue-200">
                  <div className="text-6xl mb-4">📚</div>
                  <div className="text-2xl font-bold text-gray-700 mb-2">Professional Finishing</div>
                  <p className="text-gray-600 text-center max-w-md">
                    High-quality binding and finishing for durable and professional bill books
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Footer */}
      <Footer />
    </div>
  );
};

export default SingleBillBook;