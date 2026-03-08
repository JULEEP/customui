// AllFlexItems.jsx - Updated with single image for all cards
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaArrowLeft, FaMagic, FaRobot, FaSpinner, FaShoppingCart,
  FaArrowRight, FaCheckCircle, FaTruck, FaShieldAlt, FaGift,
  FaStar, FaRupeeSign
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const AllFlexItems = () => {
  const navigate = useNavigate();
  const [showAIDesign, setShowAIDesign] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [selectedFlex, setSelectedFlex] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    companyName: "",
    address: "",
    mobile: "",
    email: ""
  });
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Common banner image for all cards
  const bannerImage = "https://trbahadurpur.com/wp-content/uploads/2023/05/SCHOOL-BANNER-10052023.jpg";

  // Flex banner designs - all using the same image
  const [flexItems, setFlexItems] = useState([
    {
      id: 1,
      image: bannerImage,
      title: "Premium School Flex Banner",
      description: "High-quality flex banner for schools and educational institutions",
      price: 299,
      category: "Education",
      size: "3ft x 6ft",
      material: "Premium Flex (280 GSM)",
      features: ["Weather Resistant", "UV Protection", "High Resolution Print"]
    },
    {
      id: 2,
      image: bannerImage,
      title: "Business Promotion Flex",
      description: "Professional flex banner for business advertising and promotions",
      price: 349,
      category: "Business",
      size: "4ft x 6ft",
      material: "Super Premium Flex (340 GSM)",
      features: ["Tear Resistant", "Waterproof", "Fade Resistant"]
    },
    {
      id: 3,
      image: bannerImage,
      title: "Event Celebration Banner",
      description: "Colorful flex banner for events, parties, and celebrations",
      price: 399,
      category: "Events",
      size: "3ft x 8ft",
      material: "Premium Flex with Lamination",
      features: ["Glossy Finish", "Scratch Resistant", "Indoor/Outdoor Use"]
    },
    {
      id: 4,
      image: bannerImage,
      title: "Property/Real Estate Banner",
      description: "Professional banner for property promotions and real estate",
      price: 449,
      category: "Real Estate",
      size: "4ft x 8ft",
      material: "Heavy Duty Flex (400 GSM)",
      features: ["Extra Thick", "Wind Resistant", "Long Lasting"]
    },
    {
      id: 5,
      image: bannerImage,
      title: "Political Campaign Banner",
      description: "High-impact banner for political campaigns and rallies",
      price: 379,
      category: "Political",
      size: "3ft x 6ft",
      material: "Premium Flex with Matt Finish",
      features: ["Matt Finish", "Non-Reflective", "Easy to Read"]
    },
    {
      id: 6,
      image: bannerImage,
      title: "Retail Store Opening Banner",
      description: "Attractive banner for new store openings and offers",
      price: 329,
      category: "Retail",
      size: "3ft x 5ft",
      material: "Standard Flex (240 GSM)",
      features: ["Economical", "Good Quality", "Quick Turnaround"]
    },
    {
      id: 7,
      image: bannerImage,
      title: "Hospital/Clinic Banner",
      description: "Professional banner for healthcare facilities and clinics",
      price: 359,
      category: "Healthcare",
      size: "3ft x 6ft",
      material: "Premium Flex (280 GSM)",
      features: ["Clean Design", "Easy to Read", "Professional Look"]
    },
    {
      id: 8,
      image: bannerImage,
      title: "Hotel/Restaurant Banner",
      description: "Attractive banner for hotels, restaurants and cafes",
      price: 389,
      category: "Hospitality",
      size: "4ft x 6ft",
      material: "Super Premium Flex (340 GSM)",
      features: ["Vibrant Colors", "Appetizing Display", "Weather Resistant"]
    },
    {
      id: 9,
      image: bannerImage,
      title: "Festival/Seasonal Banner",
      description: "Colorful banner for festivals and seasonal promotions",
      price: 319,
      category: "Seasonal",
      size: "3ft x 5ft",
      material: "Premium Flex (280 GSM)",
      features: ["Festive Colors", "Eye-catching Design", "Limited Edition"]
    }
  ]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAIDesignClick = () => {
    setShowAIDesign(true);
    setPrompt("");
    setAiResponse("");
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setAiResponse("");
    
    // Simulate AI generating a design based on prompt
    setTimeout(() => {
      // Extract key information from prompt to create a meaningful title
      const words = prompt.split(' ');
      let category = "Custom";
      if (prompt.toLowerCase().includes('school') || prompt.toLowerCase().includes('education')) category = "Education";
      else if (prompt.toLowerCase().includes('business') || prompt.toLowerCase().includes('company')) category = "Business";
      else if (prompt.toLowerCase().includes('event') || prompt.toLowerCase().includes('party')) category = "Events";
      else if (prompt.toLowerCase().includes('real estate') || prompt.toLowerCase().includes('property')) category = "Real Estate";
      else if (prompt.toLowerCase().includes('political') || prompt.toLowerCase().includes('campaign')) category = "Political";
      else if (prompt.toLowerCase().includes('retail') || prompt.toLowerCase().includes('store')) category = "Retail";
      
      // Create a new flex design based on prompt
      const newDesign = {
        id: Date.now(),
        image: bannerImage, // Using the same banner image
        title: `AI Custom: ${words.slice(0, 5).join(' ')}${words.length > 5 ? '...' : ''}`,
        description: `Custom design created for: ${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}`,
        price: 499,
        category: category,
        size: "Custom Size (as per requirement)",
        material: "Premium Flex with UV Protection",
        features: ["AI Generated Design", "Custom Text", "Your Brand Colors", "High Quality Print"],
        isCustom: true,
        prompt: prompt
      };
      
      // Add to flexItems at the beginning
      setFlexItems(prev => [newDesign, ...prev]);
      
      setAiResponse(`✅ Design generated successfully! Your custom "${category}" flex banner has been added to the collection above. You can now customize it further or add to cart.`);
      setLoading(false);
      
      // Show success message
      toast.success("Custom design created! Check the new design at the top of the list.");
    }, 2000);
  };

  const handleViewDetails = (flex) => {
    setSelectedFlex(flex);
    setShowDetailsModal(true);
    setQuantity(1);
    setCustomerDetails({
      fullName: "",
      companyName: "",
      address: "",
      mobile: "",
      email: ""
    });
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = () => {
    // Validate customer details
    if (!customerDetails.fullName || !customerDetails.mobile) {
      toast.error("Please fill in Name and Mobile Number");
      return;
    }

    if (customerDetails.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsAddingToCart(true);

    // Create cart item
    const cartItem = {
      id: Date.now(),
      productId: selectedFlex.id,
      productType: "flex-banner",
      name: selectedFlex.title,
      image: selectedFlex.image,
      quantity: quantity,
      price: selectedFlex.price,
      category: selectedFlex.category,
      size: selectedFlex.size,
      material: selectedFlex.material,
      description: selectedFlex.description,
      features: selectedFlex.features,
      customerDetails: customerDetails,
      isCustom: selectedFlex.isCustom || false,
      customPrompt: selectedFlex.prompt || null,
      selectedOptions: {
        size: selectedFlex.size,
        material: selectedFlex.material,
        category: selectedFlex.category
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
    toast.success("Flex banner added to cart successfully!");
    
    setIsAddingToCart(false);
    setShowDetailsModal(false);

    // Navigate to cart after short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1500);
  };

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
            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Flex Banner Designs
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our premium collection of flex banner designs for every occasion
            </p>
          </div>

          {/* AI Design Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAIDesignClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center group"
            >
              <FaMagic className="mr-2 group-hover:rotate-12 transition-transform" />
              Create Custom Design with AI
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* AI Design Modal */}
          {showAIDesign && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaRobot className="mr-3 text-purple-600" />
                      AI Design Assistant
                    </h2>
                    <button
                      onClick={() => {
                        setShowAIDesign(false);
                        setPrompt("");
                        setAiResponse("");
                      }}
                      className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Describe your perfect flex banner design. Include colors, text, purpose, and any specific requirements.
                    </p>
                    
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="E.g., Create a school admission banner with blue and white theme, include school name 'Alpha Education', contact: 9876543210, courses offered: Nursery to 10th, with a smiling student image..."
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-32"
                    />

                    <button
                      onClick={handlePromptSubmit}
                      disabled={loading || !prompt.trim()}
                      className={`w-full ${
                        loading || !prompt.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      } text-white font-bold py-4 rounded-xl transition-all shadow-lg`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <FaSpinner className="animate-spin mr-2" />
                          Creating your design...
                        </div>
                      ) : (
                        'Generate Design'
                      )}
                    </button>

                    {aiResponse && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-green-700 flex items-center">
                          <FaCheckCircle className="mr-2 text-green-600 flex-shrink-0" />
                          {aiResponse}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      Our AI will create a custom flex banner design based on your requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Flex Items Grid - All using the same image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flexItems.map((item) => (
              <div key={item.id} className="group">
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>
                    {item.isCustom && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center">
                          <FaMagic className="mr-1" /> AI Custom
                        </span>
                      </div>
                    )}
                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-2 py-1 rounded-full">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-xs font-bold">4.5</span>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-50 transition-colors shadow-lg transform hover:scale-105"
                      >
                        View Details & Customize
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{item.features.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500">Size: {item.size}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 line-through">₹{item.price + 100}</span>
                        <span className="ml-2 text-xl font-bold text-purple-600">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details & Add to Cart Modal */}
          {showDetailsModal && selectedFlex && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Flex Banner Details</h2>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                      }}
                      className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Image */}
                    <div>
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden border-2 border-purple-200">
                        <img
                          src={selectedFlex.image}
                          alt={selectedFlex.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-2">Specifications:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <FaCheckCircle className="text-green-600 mr-2" />
                            <span className="font-medium">Size:</span> {selectedFlex.size}
                          </li>
                          <li className="flex items-center">
                            <FaCheckCircle className="text-green-600 mr-2" />
                            <span className="font-medium">Material:</span> {selectedFlex.material}
                          </li>
                          <li className="flex items-center">
                            <FaCheckCircle className="text-green-600 mr-2" />
                            <span className="font-medium">Category:</span> {selectedFlex.category}
                          </li>
                          {selectedFlex.isCustom && (
                            <li className="flex items-start">
                              <FaMagic className="text-purple-600 mr-2 mt-1" />
                              <span><span className="font-medium">Your Request:</span> {selectedFlex.prompt}</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Features */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-2">Features:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedFlex.features?.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Customer Details */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={customerDetails.fullName}
                            onChange={handleCustomerDetailsChange}
                            placeholder="Enter your full name"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company/Organization Name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={customerDetails.companyName}
                            onChange={handleCustomerDetailsChange}
                            placeholder="Enter company name (if any)"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            value={customerDetails.mobile}
                            onChange={handleCustomerDetailsChange}
                            placeholder="10-digit mobile number"
                            maxLength="10"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                          </label>
                          <textarea
                            name="address"
                            value={customerDetails.address}
                            onChange={handleCustomerDetailsChange}
                            placeholder="Enter delivery address"
                            rows="3"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={customerDetails.email}
                            onChange={handleCustomerDetailsChange}
                            placeholder="Email address"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        {/* Quantity */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Quantity
                          </label>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="font-bold text-xl w-12 text-center">{quantity}</span>
                            <button
                              onClick={() => setQuantity(prev => prev + 1)}
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Price per piece:</span>
                            <span className="text-xl font-bold text-purple-600">
                              <FaRupeeSign className="inline mr-1" />
                              {selectedFlex.price}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-purple-200">
                            <span className="font-bold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-purple-600">
                              <FaRupeeSign className="inline mr-1" />
                              {selectedFlex.price * quantity}
                            </span>
                          </div>
                          <p className="text-xs text-green-600 mt-2 flex items-center">
                            <FaTruck className="mr-1" />
                            Free Shipping
                          </p>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={handleAddToCart}
                          disabled={isAddingToCart}
                          className={`w-full py-4 ${
                            isAddingToCart 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
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
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <FaTruck className="text-purple-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900">Free Shipping</h3>
              </div>
              <p className="text-gray-600 text-sm">Free delivery on all flex banner orders</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <FaShieldAlt className="text-green-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
              </div>
              <p className="text-gray-600 text-sm">Premium quality flex with UV protection</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FaGift className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900">Free Design</h3>
              </div>
              <p className="text-gray-600 text-sm">Free design assistance with every order</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <FaCheckCircle className="text-orange-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900">Quick Delivery</h3>
              </div>
              <p className="text-gray-600 text-sm">24-48 hour express delivery available</p>
            </div>
          </div>

          {/* Bulk Order Info */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Need Bulk Orders?</h3>
            <p className="mb-4">Get special discounts for bulk orders of 50+ banners</p>
            <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllFlexItems;