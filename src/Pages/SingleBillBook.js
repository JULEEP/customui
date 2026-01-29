import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaShippingFast, FaUndo, FaRupeeSign, FaGoogle, FaSave, FaSpinner } from "react-icons/fa";

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
  const [billBook, setBillBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [editingFields, setEditingFields] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

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
        const initialFields = {};
        if (result.data.textElements) {
          result.data.textElements.forEach((element, index) => {
            initialFields[index] = element.text;
          });
        }
        setEditingFields(initialFields);
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

  const updateBillBook = async () => {
    try {
      setSaving(true);
      setSaveMessage("");
      setSaveSuccess(false);

      // Prepare updated text elements
      const updatedTextElements = billBook.textElements.map((element, index) => ({
        ...element,
        text: editingFields[index] || element.text
      }));

      // Call update API
      const response = await fetch(`${API_BASE_URL}/api/admin/billbook/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textElements: updatedTextElements,
          isEdited: true
        })
      });

      const result = await response.json();

      if (result.success) {
        setSaveSuccess(true);
        setSaveMessage(result.message);
        
        // Update local state with new data
        setBillBook(result.data);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setSaveMessage("");
          setSaveSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to update bill book");
      }
    } catch (err) {
      console.error("Error updating bill book:", err);
      setSaveSuccess(false);
      setSaveMessage(`Error: ${err.message}`);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 5000);
    } finally {
      setSaving(false);
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

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${billBook?.name} to cart!`);
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

  const getImageUrl = () => {
    if (!billBook?.file || imageError) return defaultImage;
    
    const filePath = billBook.file;
    
    // Check if it's already a full URL
    if (filePath.startsWith('http')) {
      return filePath;
    }
    
    // Handle different path formats
    const cleanPath = filePath.replace(/\\/g, '/');
    
    // Remove leading slash if present
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    
    return `${API_BASE_URL}/${normalizedPath}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleFieldChange = (index, value) => {
    setEditingFields(prev => ({
      ...prev,
      [index]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="mt-22">
          <div className="py-8 px-4 mt-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Loading bill book details...</p>
                </div>
              </div>
            </div>
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
        <div className="mt-22">
          <div className="py-8 px-4 mt-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center h-96">
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="mt-22">
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

            {/* Save Message */}
            {saveMessage && (
              <div className={`mb-6 p-4 rounded-xl border ${saveSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                <div className="flex items-center">
                  {saveSuccess ? (
                    <span className="mr-3 text-green-500">✓</span>
                  ) : (
                    <span className="mr-3 text-red-500">⚠</span>
                  )}
                  <span>{saveMessage}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image with Editable Fields */}
              <div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                  {/* Title */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">BILL BOOK / INVOICE DESIGNS</h1>
                  
                  {/* Main Image - BADA */}
                  <div className="relative bg-white rounded-2xl p-4 mb-8 min-h-[600px] flex items-center justify-center overflow-hidden border border-gray-300">
                    <img
                      src={getImageUrl()}
                      alt={billBook.name}
                      className="max-h-[550px] max-w-full object-contain"
                      onError={handleImageError}
                      key={billBook?.file} // Key forces re-render when image changes
                    />
                    {billBook?.isEdited && (
                      <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ EDITED
                      </div>
                    )}
                  </div>
                  
                  {/* Editable Fields */}
                  <div className="space-y-4 mb-6">
                    {billBook.textElements && billBook.textElements.map((element, index) => (
                      <div key={element.id} className="mb-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                            Field {index + 1}
                          </span>
                          <div className="ml-4 text-xs text-gray-500">
                            Font: {element.fontFamily}, Size: {element.fontSize}px, 
                            Color: <span className="inline-block w-3 h-3 rounded-full ml-1" style={{ backgroundColor: element.color }}></span>
                            {element.isBold && <span className="ml-2 font-bold">Bold</span>}
                            {element.isItalic && <span className="ml-2 italic">Italic</span>}
                            {element.isUnderline && <span className="ml-2 underline">Underline</span>}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={editingFields[index] || element.text}
                          onChange={(e) => handleFieldChange(index, e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Edit text for field ${index + 1}`}
                        />
                      </div>
                    ))}
                    
                    {/* Save Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={updateBillBook}
                        disabled={saving}
                        className={`w-full py-4 ${
                          saving 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                        } text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center text-lg group`}
                      >
                        {saving ? (
                          <>
                            <FaSpinner className="animate-spin mr-3" />
                            SAVING...
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-3" />
                            SAVE CHANGES
                            <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Click to save all text field changes to the database.
                      </p>
                    </div>
                  </div>
                  
                  {/* Reviews Section */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <FaGoogle className="text-blue-600 mr-3 text-xl" />
                      <h3 className="text-lg font-bold text-gray-900">Our Customer Reviews On Google</h3>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                        ))}
                      </div>
                      <span className="ml-2 font-bold text-gray-900 text-xl">4.4</span>
                      <span className="ml-2 text-gray-600 text-lg">(57042+)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Configuration Options */}
              <div>
                {/* Price Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{billBook.name}</h1>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      ₹{billBook.textElements ? billBook.textElements.length * 100 + 500 : 750}/-
                    </div>
                    <div className="flex items-center justify-center text-green-600 font-semibold">
                      <FaShippingFast className="mr-2" />
                      Free Shipping
                    </div>
                  </div>
                  
                  {/* Free Gift Banner */}
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 rounded-xl mb-6">
                    <div className="font-bold text-xl mb-1">FREE GIFT WORTH ₹299</div>
                    <div className="text-sm mb-2">Limited time offer!</div>
                    <div className="flex items-center text-xs">
                      <div className="flex-1 bg-white/30 h-1 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 font-bold">127 gifts left today</span>
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

                {/* SELECT OPTIONS */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SELECT OPTIONS</h2>
                  
                  <div className="space-y-5">
                    {/* BILL BOOK */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">BILL BOOK</label>
                      <div className="relative">
                        <select
                          value={selectedBillBook}
                          onChange={(e) => setSelectedBillBook(e.target.value)}
                          className="w-full p-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="">---- Please Select ---</option>
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">BILL BOOK TYPE</label>
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">EACH BOOK CONTAINS</label>
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">PAPER TYPE</label>
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">SERIAL NUMBER</label>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleBillBook;