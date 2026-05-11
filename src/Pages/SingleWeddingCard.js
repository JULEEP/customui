// SingleWeddingCard.jsx - With Auto Page Flip & No Validation
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaStar, FaShippingFast, FaUndo, 
  FaSave, FaSpinner, FaShoppingCart, FaArrowRight,
  FaCheckCircle, FaShieldAlt, FaHeart, FaHeartBroken,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaTag, FaCalendarAlt, FaClock,
  FaArrowLeft, FaPalette, FaLayerGroup, FaPrint, FaBarcode,
  FaEye, FaTimes, FaDownload, FaShare, FaUpload, FaGlobeAsia, FaIdCard,
  FaUsers, FaVenusMars, FaRing, FaGift, FaBuilding,
  FaAngleLeft, FaAngleRight, FaPlay, FaPause
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const SingleWeddingCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Customer Details State
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    address: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    description: ""
  });
  
  const [quantity, setQuantity] = useState(50);
  const [selectedCardType, setSelectedCardType] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [selectedCardSize, setSelectedCardSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);
  const [weddingCard, setWeddingCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState("front");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  
  // Book flip states
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef(null);

  // Pages array for the book
  const pages = [
    { type: "front", label: "Front Cover", icon: "📖", bgGradient: "from-rose-500 to-pink-500" },
    { type: "inside", label: "Inside View", icon: "📄", bgGradient: "from-amber-500 to-orange-500" },
    { type: "back", label: "Back Cover", icon: "🔖", bgGradient: "from-purple-500 to-indigo-500" }
  ];

  const API_BASE_URL = "https://designback.onrender.com";

  // Get user ID from localStorage
  const getUserIdFromStorage = useCallback(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.id) {
          return user.id;
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      return userIdFromStorage;
    }
    
    return null;
  }, []);

  // Check if user is logged in
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    const uid = getUserIdFromStorage();
    
    if (!token || !uid) {
      toast.error("Please login to continue");
      navigate("/login");
      return false;
    }
    
    setUserId(uid);
    return true;
  }, [navigate, getUserIdFromStorage]);

  // Fetch wedding card details
  const fetchWeddingCard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/weddingcard/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setWeddingCard(result.data);
      } else {
        throw new Error("Failed to fetch wedding card");
      }
    } catch (err) {
      console.error("Error fetching wedding card:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch existing customer details
  const fetchExistingCustomerDetails = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const userData = result.data;
          setCustomerDetails(prev => ({
            ...prev,
            fullName: userData.fullName || userData.name || "",
            address: userData.address || "",
            email: userData.email || "",
            mobile: userData.mobile || userData.phone || ""
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching customer details:", err);
    }
  }, [userId]);

  // Save customer details
  const handleSaveCustomerDetails = async () => {
    if (!userId) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    if (!customerDetails.fullName || !customerDetails.address || !customerDetails.mobile) {
      toast.error("Please fill in Full Name, Address, and Mobile Number");
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

    setIsSavingDetails(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: customerDetails.fullName,
          address: customerDetails.address,
          mobile: customerDetails.mobile,
          alternateMobile: customerDetails.alternateMobile,
          email: customerDetails.email
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Customer details saved successfully!");
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
        fetchExistingCustomerDetails();
      } else {
        throw new Error(result.message || "Failed to save details");
      }
    } catch (err) {
      console.error("Error saving customer details:", err);
      toast.error(err.message || "Failed to save customer details");
    } finally {
      setIsSavingDetails(false);
    }
  };

  // Get main preview image URL
  const getMainImageUrl = () => {
    if (weddingCard?.frontPreview) {
      const previewPath = weddingCard.frontPreview;
      if (previewPath.startsWith('http')) return previewPath;
      const cleanPath = previewPath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    
    if (weddingCard?.frontImage && !imageError) {
      const frontPath = weddingCard.frontImage;
      if (frontPath.startsWith('http')) return frontPath;
      const cleanPath = frontPath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    
    return "https://cdn.printshoppy.com/image/cache/catalog/product-image/wedding-cards/wedding-card-16-600x800.webp";
  };

  // Get specific preview image - NO VALIDATION
  const getPreviewImageUrl = (type) => {
    let imagePath = null;
    
    if (type === "front") {
      imagePath = weddingCard?.frontPreview || weddingCard?.frontImage;
    } else if (type === "inside") {
      imagePath = weddingCard?.insidePreview || weddingCard?.insideImage;
    } else if (type === "back") {
      imagePath = weddingCard?.backPreview || weddingCard?.backImage;
    }
    
    if (imagePath) {
      if (imagePath.startsWith('http')) return imagePath;
      const cleanPath = imagePath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    
    return getMainImageUrl();
  };

  // Preload images for smooth flipping
  const preloadImages = useCallback(() => {
    const imageUrls = pages.map(page => getPreviewImageUrl(page.type));
    for (const url of imageUrls) {
      const img = new Image();
      img.src = url;
    }
  }, [pages]);

  // Fetch image for a specific page - NO VALIDATION
  const fetchPageImage = async (type) => {
    setPreviewLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/getweddingcard/${userId}/${id}?type=${type}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data.overlaidImage) {
          return result.data.overlaidImage;
        }
      }
    } catch (err) {
      console.error("Error fetching preview:", err);
    }
    return getPreviewImageUrl(type);
  };

  // Auto play function
  const startAutoPlay = useCallback(() => {
    if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    setIsAutoPlaying(true);
    autoPlayInterval.current = setInterval(() => {
      setCurrentPage(prev => {
        const next = (prev + 1) % pages.length;
        const newImage = getPreviewImageUrl(pages[next].type);
        setPreviewImage(newImage);
        setPreviewType(pages[next].type);
        return next;
      });
    }, 3000);
  }, [pages]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
    setIsAutoPlaying(false);
  }, []);

  // Handle page flip - next page
  const nextPage = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setFlipDirection("next");
    
    setTimeout(() => {
      const nextPageIndex = (currentPage + 1) % pages.length;
      const newImage = getPreviewImageUrl(pages[nextPageIndex].type);
      setPreviewImage(newImage);
      setCurrentPage(nextPageIndex);
      setPreviewType(pages[nextPageIndex].type);
      
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 300);
    }, 150);
  };

  // Handle page flip - previous page
  const prevPage = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setFlipDirection("prev");
    
    setTimeout(() => {
      const prevPageIndex = (currentPage - 1 + pages.length) % pages.length;
      const newImage = getPreviewImageUrl(pages[prevPageIndex].type);
      setPreviewImage(newImage);
      setCurrentPage(prevPageIndex);
      setPreviewType(pages[prevPageIndex].type);
      
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 300);
    }, 150);
  };

  // Open preview modal - NO VALIDATION
  const openPreviewModal = async (initialType = "front") => {
    setPreviewLoading(true);
    setPreviewError(null);
    
    const initialIndex = pages.findIndex(p => p.type === initialType);
    setCurrentPage(initialIndex >= 0 ? initialIndex : 0);
    
    const image = getPreviewImageUrl(pages[initialIndex >= 0 ? initialIndex : 0].type);
    
    if (image) {
      setPreviewImage(image);
      setPreviewType(pages[initialIndex >= 0 ? initialIndex : 0].type);
      setShowPreviewModal(true);
      preloadImages();
      startAutoPlay();
    } else {
      setPreviewError("Failed to load preview image");
    }
    
    setPreviewLoading(false);
  };

  const closePreviewModal = () => {
    stopAutoPlay();
    setShowPreviewModal(false);
    setPreviewImage(null);
    setPreviewError(null);
    setCurrentPage(0);
  };

  const downloadPreviewImage = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.href = previewImage;
      link.download = `wedding-card-${pages[currentPage].type}-${weddingCard?._id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started!");
    }
  };

  const sharePreviewImage = async () => {
    if (previewImage) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Wedding Card Preview',
            text: `Check out this beautiful wedding card for ${weddingCard?.groomName} & ${weddingCard?.brideName}`,
            url: previewImage,
          });
        } else {
          navigator.clipboard.writeText(previewImage);
          toast.success("Preview link copied!");
        }
      } catch (err) {
        console.error("Error sharing:", err);
        toast.error("Failed to share");
      }
    }
  };

  const handleAddToCart = () => {
    if (!userId) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    if (!customerDetails.fullName || !customerDetails.address || !customerDetails.mobile) {
      toast.error("Please fill in Full Name, Address, and Mobile Number");
      return;
    }

    if (customerDetails.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsAddingToCart(true);

    const cartItem = {
      id: Date.now(),
      userId: userId,
      productId: weddingCard._id,
      productType: "wedding-card",
      name: `${weddingCard.groomName} & ${weddingCard.brideName} - Wedding Card`,
      image: getMainImageUrl(),
      quantity: quantity,
      price: calculatePrice(),
      customerDetails: {
        fullName: customerDetails.fullName,
        address: customerDetails.address,
        mobile: customerDetails.mobile,
        alternateMobile: customerDetails.alternateMobile,
        email: customerDetails.email,
        description: customerDetails.description
      },
      weddingDetails: {
        groomName: weddingCard.groomName,
        brideName: weddingCard.brideName,
        ceremonyDate: weddingCard.ceremonyDate,
        ceremonyVenue: weddingCard.ceremonyVenue,
        receptionDate: weddingCard.receptionDate
      },
      selectedOptions: {
        cardType: selectedCardType,
        paperType: selectedPaperType,
        cardSize: selectedCardSize
      },
      timestamp: new Date().toISOString()
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success("Wedding card added to cart!");
    setIsAddingToCart(false);
    setTimeout(() => navigate("/cart"), 1500);
  };

  const calculatePrice = () => {
    let basePrice = 850;
    
    if (selectedPaperType === "Premium Matte") basePrice += 200;
    if (selectedPaperType === "Silk Finish") basePrice += 300;
    if (selectedPaperType === "Gold Foil") basePrice += 500;
    
    if (selectedCardSize === "Large (7x10 inches)") basePrice += 150;
    if (selectedCardSize === "Extra Large (8x12 inches)") basePrice += 250;
    
    if (weddingCard?.design?.showLogo) basePrice += 150;
    if (weddingCard?.logoSettings?.show) basePrice += 100;
    
    let discount = 0;
    if (quantity >= 500) discount = 0.15;
    else if (quantity >= 200) discount = 0.10;
    else if (quantity >= 100) discount = 0.05;
    
    let finalPrice = basePrice * quantity;
    finalPrice = finalPrice * (1 - discount);
    
    return Math.round(finalPrice);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 10);
  const decrementQuantity = () => setQuantity(prev => prev > 10 ? prev - 10 : 10);

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setShowDeliveryCheck(true);
      setTimeout(() => setShowDeliveryCheck(false), 3000);
    } else {
      toast.error("Enter valid 6-digit pincode");
    }
  };

  const handleAddToWishlist = () => {
    setShowWishlistMessage(true);
    setTimeout(() => setShowWishlistMessage(false), 3000);
    toast.success("Added to wishlist!");
  };

  const handleImageError = () => setImageError(true);

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    return dateString;
  };

  const promiseData = [
    { icon: <FaShippingFast className="text-2xl text-blue-600" />, title: "FREE SHIPPING", description: "Free delivery across India" },
    { icon: <FaUndo className="text-2xl text-green-600" />, title: "EASY RETURNS", description: "7 days return policy" },
    { icon: <FaShieldAlt className="text-2xl text-purple-600" />, title: "QUALITY GUARANTEE", description: "Premium quality printing" },
    { icon: <FaHeart className="text-2xl text-red-600" />, title: "CUSTOM DESIGN", description: "Personalized wedding cards" }
  ];

  const options = {
    cardTypes: ["Premium Wedding Card", "Classic Wedding Card", "Royal Wedding Card", "Modern Wedding Card", "Traditional Wedding Card"],
    paperTypes: ["Standard Matte (300 GSM)", "Premium Matte (350 GSM)", "Silk Finish", "Gold Foil", "Rose Gold Foil", "Textured Paper"],
    cardSizes: ["Standard (5x7 inches)", "Large (7x10 inches)", "Extra Large (8x12 inches)"]
  };

  // Initialize
  useEffect(() => {
    if (!checkAuth()) return;
    fetchWeddingCard();
  }, [checkAuth, fetchWeddingCard]);

  // Fetch customer details when userId is set
  useEffect(() => {
    if (userId) {
      fetchExistingCustomerDetails();
    }
  }, [userId, fetchExistingCustomerDetails]);

  // Cleanup auto-play on unmount
  useEffect(() => {
    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 max-w-md">
            <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Please Login</h3>
            <p className="text-gray-700 mb-4">You need to login first to view and purchase wedding cards.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-rose-600 to-amber-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/30 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff]">
            <FaSpinner className="animate-spin text-4xl text-rose-600 mx-auto mb-4" />
            <p className="text-gray-700">Loading wedding card details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !weddingCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Wedding Card</h3>
            <p className="text-gray-700 mb-4">{error || "Wedding card not found"}</p>
            <button
              onClick={() => navigate("/weddingcards")}
              className="bg-gradient-to-r from-rose-600 to-amber-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all duration-300"
            >
              Back to Wedding Cards
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-50">
      <Toaster position="top-center" />
      <Navbar />

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
            <FaCheckCircle className="text-2xl" />
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Your details have been saved!</p>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Message */}
      {showWishlistMessage && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
            <FaHeart className="text-2xl" />
            <div>
              <p className="font-bold">Added to Wishlist!</p>
              <p className="text-sm">You'll be notified about updates</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/weddingcards")}
            className="flex items-center gap-2 text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-5 py-2.5 rounded-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 mb-8 group"
          >
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Wedding Cards
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Card Preview with Book Flip Effect */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-700 to-amber-700 bg-clip-text text-transparent mb-4 text-center">
                  {weddingCard.groomName} <span className="text-rose-500">❤️</span> {weddingCard.brideName}
                </h1>
                
                {/* Book Preview Section */}
                <div className="relative bg-gradient-to-br from-amber-100/40 to-rose-100/40 rounded-2xl p-6 mb-4 shadow-inner border border-white/40">
                  {/* Page Navigation Buttons */}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => openPreviewModal("front")}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      📖 Open Book
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openPreviewModal("front")}
                        className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70 transition-all duration-300"
                      >
                        Front
                      </button>
                      <button
                        onClick={() => openPreviewModal("inside")}
                        className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70 transition-all duration-300"
                      >
                        Inside
                      </button>
                      <button
                        onClick={() => openPreviewModal("back")}
                        className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70 transition-all duration-300"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  
                  {/* Book Cover Style Preview */}
                  <div className="relative perspective-1000">
                    <div className="relative bg-gradient-to-br from-amber-900/20 to-rose-900/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-300/50 shadow-xl min-h-[350px] flex flex-col items-center justify-center">
                      {/* Decorative book spine effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-800/30 to-transparent rounded-l-2xl"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-amber-800/30 to-transparent rounded-r-2xl"></div>
                      
                      {/* Main Preview Image */}
                      <div className="relative w-full flex justify-center">
                        <img
                          src={getMainImageUrl()}
                          alt={`${weddingCard.groomName} & ${weddingCard.brideName} Wedding Card`}
                          className="max-h-[280px] max-w-full object-contain transform hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl"
                          onError={handleImageError}
                        />
                      </div>
                      
                      {/* Page indicator */}
                      <div className="mt-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-3 italic">
                        💡 Click "Open Book" to flip through all pages automatically!
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick View Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button
                    onClick={() => openPreviewModal("front")}
                    className="py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-sm hover:from-rose-600 hover:to-pink-600 flex items-center justify-center gap-2"
                  >
                    📖 Front Cover
                  </button>
                  <button
                    onClick={() => openPreviewModal("inside")}
                    className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-sm hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2"
                  >
                    📄 Inside View
                  </button>
                  <button
                    onClick={() => openPreviewModal("back")}
                    className="py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-sm hover:from-purple-600 hover:to-indigo-600 flex items-center justify-center gap-2"
                  >
                    🔖 Back Cover
                  </button>
                </div>
              </div>

              {/* Wedding Details Section */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaRing className="mr-2 text-rose-600" />
                  Wedding Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                    <FaCalendarAlt className="text-rose-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Ceremony Date & Time</p>
                      <p className="text-gray-700">{formatDate(weddingCard.ceremonyDate)}</p>
                      {weddingCard.ceremonyTime && <p className="text-sm text-gray-500">{weddingCard.ceremonyTime}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                    <FaMapMarkerAlt className="text-amber-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Ceremony Venue</p>
                      <p className="text-gray-700">{weddingCard.ceremonyVenue}</p>
                      {weddingCard.ceremonyAddress && <p className="text-sm text-gray-500">{weddingCard.ceremonyAddress}</p>}
                      {weddingCard.ceremonyContact && <p className="text-sm text-gray-500">📞 {weddingCard.ceremonyContact}</p>}
                    </div>
                  </div>
                  
                  {weddingCard.receptionDate && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">Reception</p>
                        <p className="text-gray-700">{formatDate(weddingCard.receptionDate)} at {weddingCard.receptionTime}</p>
                        <p className="text-gray-700">{weddingCard.receptionVenue}</p>
                        {weddingCard.receptionAddress && <p className="text-sm text-gray-500">{weddingCard.receptionAddress}</p>}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                    <FaUsers className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Families</p>
                      <p className="text-gray-700">
                        {weddingCard.groomFatherName && `${weddingCard.groomFatherName}`}
                        {weddingCard.groomMotherName && ` & ${weddingCard.groomMotherName}`}
                      </p>
                      <p className="text-gray-700">
                        {weddingCard.brideFatherName && `${weddingCard.brideFatherName}`}
                        {weddingCard.brideMotherName && ` & ${weddingCard.brideMotherName}`}
                      </p>
                    </div>
                  </div>
                  
                  {weddingCard.dressCode && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                      <FaTag className="text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Dress Code</p>
                        <p className="text-gray-700">{weddingCard.dressCode}</p>
                      </div>
                    </div>
                  )}
                  
                  {weddingCard.rsvpContact && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                      <FaPhone className="text-indigo-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">RSVP</p>
                        <p className="text-gray-700">Contact: {weddingCard.rsvpContact}</p>
                        {weddingCard.rsvpBy && <p className="text-sm text-gray-500">By: {weddingCard.rsvpBy}</p>}
                      </div>
                    </div>
                  )}
                  
                  {weddingCard.additionalInfo && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-sm bg-white/30 rounded-xl">
                      <FaGift className="text-pink-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Additional Information</p>
                        <p className="text-gray-700">{weddingCard.additionalInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Design Features Section */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaPalette className="mr-2 text-purple-600" />
                  Card Design Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Background Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: weddingCard.design?.backgroundColor }}></div>
                      <span className="text-xs">{weddingCard.design?.backgroundColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Text Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: weddingCard.design?.textColor }}></div>
                      <span className="text-xs">{weddingCard.design?.textColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Accent Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: weddingCard.design?.accentColor }}></div>
                      <span className="text-xs">{weddingCard.design?.accentColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Font Family</span>
                    <span className="text-xs font-semibold">{weddingCard.design?.fontFamily}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {weddingCard.logoSettings?.show && (
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-700 rounded-full">✨ Logo Included</span>
                  )}
                  {weddingCard.logoSettings?.shape === 'circle' && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-700 rounded-full">⚪ Circular Logo</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details Form */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span className="text-white font-bold text-sm">1</span>
                  </span>
                  Customer Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaUsers className="mr-2 text-rose-600" />
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerDetails.fullName}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-600" />
                      Address <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your full address for delivery"
                      rows="3"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-green-600" />
                        Mobile <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.mobile}
                        onChange={(e) => setCustomerDetails(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="10-digit mobile"
                        maxLength="10"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-purple-600" />
                        Alternate Mobile
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.alternateMobile}
                        onChange={(e) => setCustomerDetails(prev => ({ ...prev, alternateMobile: e.target.value }))}
                        placeholder="Alternate number"
                        maxLength="10"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-yellow-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address for order updates"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaTag className="mr-2 text-pink-600" />
                      Special Instructions
                    </label>
                    <textarea
                      value={customerDetails.description}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Any special instructions for your wedding card order..."
                      rows="2"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>

                  <button
                    onClick={handleSaveCustomerDetails}
                    disabled={isSavingDetails}
                    className={`w-full py-3 ${
                      isSavingDetails 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                    } text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2`}
                  >
                    {isSavingDetails ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        SAVING DETAILS...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        SAVE CUSTOMER DETAILS
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Configuration */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span className="text-white font-bold text-sm">2</span>
                  </span>
                  Customize Your Wedding Card
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaPrint className="mr-2 text-blue-600" />
                      Card Type
                    </label>
                    <select
                      value={selectedCardType}
                      onChange={(e) => setSelectedCardType(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Card Type</option>
                      {options.cardTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaPalette className="mr-2 text-purple-600" />
                      Paper Type
                    </label>
                    <select
                      value={selectedPaperType}
                      onChange={(e) => setSelectedPaperType(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Paper Type</option>
                      {options.paperTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaLayerGroup className="mr-2 text-orange-600" />
                      Card Size
                    </label>
                    <select
                      value={selectedCardSize}
                      onChange={(e) => setSelectedCardSize(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Card Size</option>
                      {options.cardSizes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-rose-700 to-amber-700 bg-clip-text text-transparent">
                      ₹{calculatePrice()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">*Including all taxes</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 backdrop-blur-sm bg-white/50 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/70 transition-all duration-300 shadow-sm"
                    >
                      -
                    </button>
                    <span className="font-bold text-xl text-gray-800">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 backdrop-blur-sm bg-white/50 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/70 transition-all duration-300 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {quantity >= 500 ? "🎉 15% Bulk Discount Applied!" : 
                   quantity >= 200 ? "🎉 10% Bulk Discount Applied!" : 
                   quantity >= 100 ? "🎉 5% Bulk Discount Applied!" : 
                   "Order 100+ cards for bulk discount"}
                </p>

                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="flex-1 p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-l-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      maxLength="6"
                    />
                    <button
                      onClick={handleCheckDelivery}
                      className="px-6 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-medium rounded-r-xl hover:shadow-lg transition-all duration-300"
                    >
                      Check
                    </button>
                  </div>
                  {showDeliveryCheck && (
                    <div className="mt-2 p-2 bg-green-500/20 backdrop-blur-sm text-green-700 rounded-lg text-sm flex items-center border border-green-500/30">
                      <FaCheckCircle className="mr-2" />
                      Delivery available in 5-7 business days
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToWishlist}
                    className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:from-pink-600 hover:to-rose-600 group"
                  >
                    <FaHeart className="transform group-hover:scale-110 transition-transform" />
                    WISHLIST
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`flex-1 py-4 ${
                      isAddingToCart 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    } text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center text-lg group`}
                  >
                    {isAddingToCart ? (
                      <>
                        <FaSpinner className="animate-spin mr-3" />
                        ADDING...
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

          {/* Promise Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {promiseData.map((item, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/60 to-amber-100/60 rounded-full flex items-center justify-center mr-3 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Flip Preview Modal with Auto Flip */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            {/* Book Header */}
            <div className="flex justify-between items-center p-6 border-b border-amber-300 bg-gradient-to-r from-rose-700 to-amber-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaRing className="text-yellow-300" />
                {weddingCard.groomName} ❤️ {weddingCard.brideName}
                <span className="text-sm ml-2 text-yellow-200">- Wedding Card</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
                  className={`p-2 rounded-lg transition-all duration-300 ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-500'} text-white hover:opacity-80`}
                  title={isAutoPlaying ? "Stop Auto Flip" : "Start Auto Flip"}
                >
                  {isAutoPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
                </button>
                <button
                  onClick={downloadPreviewImage}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="Download Preview"
                >
                  <FaDownload className="text-lg" />
                </button>
                <button
                  onClick={sharePreviewImage}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="Share Preview"
                >
                  <FaShare className="text-lg" />
                </button>
                <button
                  onClick={closePreviewModal}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="Close"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>
            
            {/* Book Content with Flip Effect */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)] bg-gradient-to-br from-amber-50 to-rose-50">
              {/* Book Container */}
              <div className="relative max-w-4xl mx-auto">
                {/* Book Spine Decoration */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-700/20 to-amber-800/20 rounded-full -z-10"></div>
                
                {/* Book Pages Container */}
                <div className="relative perspective-1200">
                  <div className={`relative transition-all duration-500 transform-style-3d ${isFlipping ? (flipDirection === "next" ? "animate-flip-forward" : "animate-flip-backward") : ""}`}>
                    {/* Current Page Display */}
                    <div className="bg-white/90 rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
                      {/* Page Number Indicator */}
                      <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200">
                        <span className="text-sm font-medium text-gray-600">
                          {pages[currentPage].icon} {pages[currentPage].label}
                        </span>
                        <span className="text-sm text-gray-500">
                          Page {currentPage + 1} of {pages.length}
                        </span>
                      </div>
                      
                      {/* Page Image */}
                      <div className="p-8 flex justify-center items-center min-h-[500px] bg-gradient-to-br from-white to-amber-50">
                        {previewLoading ? (
                          <div className="text-center py-12">
                            <FaSpinner className="animate-spin text-4xl text-rose-600 mx-auto mb-4" />
                            <p className="text-gray-700">Loading page...</p>
                          </div>
                        ) : previewError ? (
                          <div className="text-center py-12">
                            <div className="text-red-500 text-4xl mb-4">⚠️</div>
                            <p className="text-gray-700">{previewError}</p>
                            <button
                              onClick={() => openPreviewModal(pages[currentPage].type)}
                              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg"
                            >
                              Retry
                            </button>
                          </div>
                        ) : (
                          <img
                            src={previewImage}
                            alt={`Wedding Card - ${pages[currentPage].label}`}
                            className="max-w-full max-h-[550px] object-contain rounded-lg shadow-lg"
                          />
                        )}
                      </div>
                      
                      {/* Page Flip Navigation */}
                      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-amber-100 to-rose-100 border-t border-amber-200">
                        <button
                          onClick={prevPage}
                          disabled={isFlipping}
                          className="px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg transform hover:-translate-x-1 disabled:opacity-50"
                        >
                          <FaAngleLeft /> Previous
                        </button>
                        
                        {/* Page Dots */}
                        <div className="flex gap-2">
                          {pages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!isFlipping && idx !== currentPage) {
                                  if (idx > currentPage) {
                                    setFlipDirection("next");
                                  } else {
                                    setFlipDirection("prev");
                                  }
                                  setCurrentPage(idx);
                                  const newImage = getPreviewImageUrl(pages[idx].type);
                                  setPreviewImage(newImage);
                                  setPreviewType(pages[idx].type);
                                }
                              }}
                              className={`transition-all duration-300 ${
                                idx === currentPage
                                  ? 'w-8 h-2 bg-rose-600 rounded-full'
                                  : 'w-2 h-2 bg-gray-400 rounded-full hover:bg-rose-400'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <button
                          onClick={nextPage}
                          disabled={isFlipping}
                          className="px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transform hover:translate-x-1 disabled:opacity-50"
                        >
                          Next <FaAngleRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Book Decorative Elements */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-24 bg-gradient-to-r from-amber-800/40 to-transparent rounded-r-full"></div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-24 bg-gradient-to-l from-amber-800/40 to-transparent rounded-l-full"></div>
              </div>
              
              {/* Book Description */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  💡 Pages flip automatically every 3 seconds! Click <FaPlay className="inline text-green-600" /> to start or <FaPause className="inline text-red-600" /> to stop auto-flip.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes flipForward {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes flipBackward {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-flip-forward { animation: flipForward 0.4s ease-in-out; }
        .animate-flip-backward { animation: flipBackward 0.4s ease-in-out; }
        .perspective-1000 { perspective: 1000px; }
        .perspective-1200 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default SingleWeddingCard;