// SingleWeddingCard.jsx - With All Wedding Details Fields in Customer Details
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
  FaAngleLeft, FaAngleRight, FaPlay, FaPause, FaUserTie, FaUserFriends,
  FaHourglassHalf, FaInfoCircle, FaUser, FaFemale, FaMale, FaPhoneAlt
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
  
  // Wedding Details State (jo tu enter karega)
  const [weddingDetails, setWeddingDetails] = useState({
    groomName: "",
    groomFatherName: "",
    groomMotherName: "",
    groomMobile: "",
    brideName: "",
    brideFatherName: "",
    brideMotherName: "",
    brideMobile: "",
    ceremonyDate: "",
    ceremonyTime: "",
    ceremonyVenue: "",
    ceremonyAddress: "",
    ceremonyContact: "",
    receptionDate: "",
    receptionTime: "",
    receptionVenue: "",
    receptionAddress: "",
    receptionContact: "",
    additionalInfo: "",
    dressCode: "",
    rsvpContact: "",
    rsvpBy: ""
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

  const pages = [
    { type: "front", label: "Front Cover", icon: "📖", bgGradient: "from-rose-500 to-pink-500" },
    { type: "inside", label: "Inside View", icon: "📄", bgGradient: "from-amber-500 to-orange-500" },
    { type: "back", label: "Back Cover", icon: "🔖", bgGradient: "from-purple-500 to-indigo-500" }
  ];

  const API_BASE_URL = "https://designback.onrender.com";

  const getUserIdFromStorage = useCallback(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.id) return user.id;
      } catch (e) {}
    }
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) return userIdFromStorage;
    return null;
  }, []);

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

  const fetchWeddingCard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/weddingcard/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setWeddingCard(result.data);
        // Agar card pehle se exist karta hai to uske details load kar le
        if (result.data) {
          setWeddingDetails({
            groomName: result.data.groomName || "",
            groomFatherName: result.data.groomFatherName || "",
            groomMotherName: result.data.groomMotherName || "",
            groomMobile: result.data.groomMobile || "",
            brideName: result.data.brideName || "",
            brideFatherName: result.data.brideFatherName || "",
            brideMotherName: result.data.brideMotherName || "",
            brideMobile: result.data.brideMobile || "",
            ceremonyDate: result.data.ceremonyDate || "",
            ceremonyTime: result.data.ceremonyTime || "",
            ceremonyVenue: result.data.ceremonyVenue || "",
            ceremonyAddress: result.data.ceremonyAddress || "",
            ceremonyContact: result.data.ceremonyContact || "",
            receptionDate: result.data.receptionDate || "",
            receptionTime: result.data.receptionTime || "",
            receptionVenue: result.data.receptionVenue || "",
            receptionAddress: result.data.receptionAddress || "",
            receptionContact: result.data.receptionContact || "",
            additionalInfo: result.data.additionalInfo || "",
            dressCode: result.data.dressCode || "",
            rsvpContact: result.data.rsvpContact || "",
            rsvpBy: result.data.rsvpBy || ""
          });
        }
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

  const fetchExistingCustomerDetails = useCallback(async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/user/${userId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
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

  // Save Customer + Wedding Details Together
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

    setIsSavingDetails(true);

    try {
      const token = localStorage.getItem("token");
      
      // Save Customer Details
      const customerResponse = await fetch(`${API_BASE_URL}/api/auth/user/${userId}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: customerDetails.fullName,
          address: customerDetails.address,
          mobile: customerDetails.mobile,
          alternateMobile: customerDetails.alternateMobile,
          email: customerDetails.email
        })
      });

      const customerResult = await customerResponse.json();
      
      if (!customerResult.success) {
        throw new Error(customerResult.message || "Failed to save customer details");
      }

      // Save Wedding Details
      const weddingResponse = await fetch(`${API_BASE_URL}/api/admin/weddingcard/${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(weddingDetails)
      });

      const weddingResult = await weddingResponse.json();

      if (weddingResult.success) {
        toast.success("Customer & Wedding details saved successfully!");
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
        fetchExistingCustomerDetails();
        fetchWeddingCard();
      } else {
        throw new Error(weddingResult.message || "Failed to save wedding details");
      }
    } catch (err) {
      console.error("Error saving details:", err);
      toast.error(err.message || "Failed to save details");
    } finally {
      setIsSavingDetails(false);
    }
  };

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

  const getPreviewImageUrl = (type) => {
    let imagePath = null;
    if (type === "front") imagePath = weddingCard?.frontPreview || weddingCard?.frontImage;
    else if (type === "inside") imagePath = weddingCard?.insidePreview || weddingCard?.insideImage;
    else if (type === "back") imagePath = weddingCard?.backPreview || weddingCard?.backImage;
    if (imagePath) {
      if (imagePath.startsWith('http')) return imagePath;
      const cleanPath = imagePath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    return getMainImageUrl();
  };

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
      setTimeout(() => { setIsFlipping(false); setFlipDirection(null); }, 300);
    }, 150);
  };

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
      setTimeout(() => { setIsFlipping(false); setFlipDirection(null); }, 300);
    }, 150);
  };

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
            text: `Check out this beautiful wedding card for ${weddingDetails.groomName || weddingCard?.groomName} & ${weddingDetails.brideName || weddingCard?.brideName}`,
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
    setIsAddingToCart(true);
    const cartItem = {
      id: Date.now(),
      userId: userId,
      productId: weddingCard?._id || id,
      productType: "wedding-card",
      name: `${weddingDetails.groomName || weddingCard?.groomName} & ${weddingDetails.brideName || weddingCard?.brideName} - Wedding Card`,
      image: getMainImageUrl(),
      quantity: quantity,
      price: calculatePrice(),
      customerDetails: { ...customerDetails },
      weddingDetails: { ...weddingDetails },
      selectedOptions: { cardType: selectedCardType, paperType: selectedPaperType, cardSize: selectedCardSize },
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

  useEffect(() => {
    if (!checkAuth()) return;
    fetchWeddingCard();
  }, [checkAuth, fetchWeddingCard]);

  useEffect(() => {
    if (userId) fetchExistingCustomerDetails();
  }, [userId, fetchExistingCustomerDetails]);

  useEffect(() => {
    return () => { if (autoPlayInterval.current) clearInterval(autoPlayInterval.current); };
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
            <button onClick={() => navigate("/login")} className="bg-gradient-to-r from-rose-600 to-amber-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all duration-300">Go to Login</button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-50">
      <Toaster position="top-center" />
      <Navbar />

      {showSuccessPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
            <FaCheckCircle className="text-2xl" />
            <div><p className="font-bold">Success!</p><p className="text-sm">Details saved successfully!</p></div>
          </div>
        </div>
      )}

      {showWishlistMessage && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
            <FaHeart className="text-2xl" />
            <div><p className="font-bold">Added to Wishlist!</p><p className="text-sm">You'll be notified about updates</p></div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate("/weddingcards")} className="flex items-center gap-2 text-rose-700 hover:text-rose-900 font-medium backdrop-blur-sm bg-white/30 px-5 py-2.5 rounded-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 mb-8 group">
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" /> Back to Wedding Cards
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-700 to-amber-700 bg-clip-text text-transparent mb-4 text-center">
                  {weddingDetails.groomName || weddingCard?.groomName} <span className="text-rose-500">❤️</span> {weddingDetails.brideName || weddingCard?.brideName}
                </h1>
                <div className="relative bg-gradient-to-br from-amber-100/40 to-rose-100/40 rounded-2xl p-6 mb-4 shadow-inner border border-white/40">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={() => openPreviewModal("front")} className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">📖 Open Book</button>
                    <div className="flex gap-2">
                      <button onClick={() => openPreviewModal("front")} className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70">Front</button>
                      <button onClick={() => openPreviewModal("inside")} className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70">Inside</button>
                      <button onClick={() => openPreviewModal("back")} className="px-3 py-1.5 rounded-lg bg-white/50 text-gray-700 text-xs font-medium hover:bg-white/70">Back</button>
                    </div>
                  </div>
                  <div className="relative perspective-1000">
                    <div className="relative bg-gradient-to-br from-amber-900/20 to-rose-900/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-300/50 shadow-xl min-h-[350px] flex flex-col items-center justify-center">
                      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-800/30 to-transparent rounded-l-2xl"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-amber-800/30 to-transparent rounded-r-2xl"></div>
                      <div className="relative w-full flex justify-center">
                        <img src={getMainImageUrl()} alt="Wedding Card" className="max-h-[280px] max-w-full object-contain transform hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl" onError={handleImageError} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-3 italic">💡 Click "Open Book" to flip through all pages automatically!</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button onClick={() => openPreviewModal("front")} className="py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">📖 Front Cover</button>
                  <button onClick={() => openPreviewModal("inside")} className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">📄 Inside View</button>
                  <button onClick={() => openPreviewModal("back")} className="py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">🔖 Back Cover</button>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details + All Wedding Fields */}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaUser className="mr-2 text-rose-600" />Full Name <span className="text-red-500 ml-1">*</span></label>
                    <input type="text" value={customerDetails.fullName} onChange={(e) => setCustomerDetails(prev => ({ ...prev, fullName: e.target.value }))} placeholder="Enter your full name" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaMapMarkerAlt className="mr-2 text-red-600" />Address <span className="text-red-500 ml-1">*</span></label>
                    <textarea value={customerDetails.address} onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))} placeholder="Enter your full address for delivery" rows="2" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaPhone className="mr-2 text-green-600" />Mobile <span className="text-red-500 ml-1">*</span></label>
                      <input type="tel" value={customerDetails.mobile} onChange={(e) => setCustomerDetails(prev => ({ ...prev, mobile: e.target.value }))} placeholder="10-digit mobile" maxLength="10" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaPhoneAlt className="mr-2 text-purple-600" />Alternate Mobile</label>
                      <input type="tel" value={customerDetails.alternateMobile} onChange={(e) => setCustomerDetails(prev => ({ ...prev, alternateMobile: e.target.value }))} placeholder="Alternate number" maxLength="10" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaEnvelope className="mr-2 text-yellow-600" />Email</label>
                    <input type="email" value={customerDetails.email} onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))} placeholder="Email address for order updates" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><FaTag className="mr-2 text-pink-600" />Special Instructions</label>
                    <textarea value={customerDetails.description} onChange={(e) => setCustomerDetails(prev => ({ ...prev, description: e.target.value }))} placeholder="Any special instructions for your wedding card order..." rows="2" className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-rose-500 shadow-inner" />
                  </div>
                </div>
              </div>

              {/* Wedding Details Form - All Fields */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span className="text-white font-bold text-sm">2</span>
                  </span>
                  Wedding Details
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {/* Groom Details */}
                  <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200">
                    <h3 className="font-bold text-rose-700 mb-3 flex items-center"><FaMale className="mr-2" /> Groom Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><label className="text-sm text-gray-600 block">Groom Name</label><input type="text" value={weddingDetails.groomName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, groomName: e.target.value }))} placeholder="Groom's full name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Father's Name</label><input type="text" value={weddingDetails.groomFatherName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, groomFatherName: e.target.value }))} placeholder="Groom's father name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Mother's Name</label><input type="text" value={weddingDetails.groomMotherName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, groomMotherName: e.target.value }))} placeholder="Groom's mother name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Mobile Number</label><input type="text" value={weddingDetails.groomMobile} onChange={(e) => setWeddingDetails(prev => ({ ...prev, groomMobile: e.target.value }))} placeholder="Groom's mobile" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                    </div>
                  </div>

                  {/* Bride Details */}
                  <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-200">
                    <h3 className="font-bold text-pink-700 mb-3 flex items-center"><FaFemale className="mr-2" /> Bride Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><label className="text-sm text-gray-600 block">Bride Name</label><input type="text" value={weddingDetails.brideName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, brideName: e.target.value }))} placeholder="Bride's full name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Father's Name</label><input type="text" value={weddingDetails.brideFatherName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, brideFatherName: e.target.value }))} placeholder="Bride's father name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Mother's Name</label><input type="text" value={weddingDetails.brideMotherName} onChange={(e) => setWeddingDetails(prev => ({ ...prev, brideMotherName: e.target.value }))} placeholder="Bride's mother name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Mobile Number</label><input type="text" value={weddingDetails.brideMobile} onChange={(e) => setWeddingDetails(prev => ({ ...prev, brideMobile: e.target.value }))} placeholder="Bride's mobile" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                    </div>
                  </div>

                  {/* Ceremony Details */}
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                    <h3 className="font-bold text-amber-700 mb-3 flex items-center"><FaCalendarAlt className="mr-2" /> Ceremony Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><label className="text-sm text-gray-600 block">Ceremony Date</label><input type="text" value={weddingDetails.ceremonyDate} onChange={(e) => setWeddingDetails(prev => ({ ...prev, ceremonyDate: e.target.value }))} placeholder="e.g., 25th November 2025" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Ceremony Time</label><input type="text" value={weddingDetails.ceremonyTime} onChange={(e) => setWeddingDetails(prev => ({ ...prev, ceremonyTime: e.target.value }))} placeholder="e.g., 7:00 PM onwards" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div className="md:col-span-2"><label className="text-sm text-gray-600 block">Ceremony Venue</label><input type="text" value={weddingDetails.ceremonyVenue} onChange={(e) => setWeddingDetails(prev => ({ ...prev, ceremonyVenue: e.target.value }))} placeholder="Venue name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div className="md:col-span-2"><label className="text-sm text-gray-600 block">Ceremony Address</label><textarea value={weddingDetails.ceremonyAddress} onChange={(e) => setWeddingDetails(prev => ({ ...prev, ceremonyAddress: e.target.value }))} placeholder="Full address" rows="2" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Contact Number</label><input type="text" value={weddingDetails.ceremonyContact} onChange={(e) => setWeddingDetails(prev => ({ ...prev, ceremonyContact: e.target.value }))} placeholder="Venue contact" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                    </div>
                  </div>

                  {/* Reception Details */}
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200">
                    <h3 className="font-bold text-purple-700 mb-3 flex items-center"><FaGift className="mr-2" /> Reception Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><label className="text-sm text-gray-600 block">Reception Date</label><input type="text" value={weddingDetails.receptionDate} onChange={(e) => setWeddingDetails(prev => ({ ...prev, receptionDate: e.target.value }))} placeholder="e.g., 26th November 2025" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Reception Time</label><input type="text" value={weddingDetails.receptionTime} onChange={(e) => setWeddingDetails(prev => ({ ...prev, receptionTime: e.target.value }))} placeholder="e.g., 8:00 PM" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div className="md:col-span-2"><label className="text-sm text-gray-600 block">Reception Venue</label><input type="text" value={weddingDetails.receptionVenue} onChange={(e) => setWeddingDetails(prev => ({ ...prev, receptionVenue: e.target.value }))} placeholder="Venue name" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div className="md:col-span-2"><label className="text-sm text-gray-600 block">Reception Address</label><textarea value={weddingDetails.receptionAddress} onChange={(e) => setWeddingDetails(prev => ({ ...prev, receptionAddress: e.target.value }))} placeholder="Full address" rows="2" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">Contact Number</label><input type="text" value={weddingDetails.receptionContact} onChange={(e) => setWeddingDetails(prev => ({ ...prev, receptionContact: e.target.value }))} placeholder="Venue contact" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200">
                    <h3 className="font-bold text-teal-700 mb-3 flex items-center"><FaInfoCircle className="mr-2" /> Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><label className="text-sm text-gray-600 block">Dress Code</label><input type="text" value={weddingDetails.dressCode} onChange={(e) => setWeddingDetails(prev => ({ ...prev, dressCode: e.target.value }))} placeholder="e.g., Traditional / Formal" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">RSVP Contact</label><input type="text" value={weddingDetails.rsvpContact} onChange={(e) => setWeddingDetails(prev => ({ ...prev, rsvpContact: e.target.value }))} placeholder="RSVP phone number" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div><label className="text-sm text-gray-600 block">RSVP By</label><input type="text" value={weddingDetails.rsvpBy} onChange={(e) => setWeddingDetails(prev => ({ ...prev, rsvpBy: e.target.value }))} placeholder="RSVP deadline" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                      <div className="md:col-span-2"><label className="text-sm text-gray-600 block">Additional Info</label><textarea value={weddingDetails.additionalInfo} onChange={(e) => setWeddingDetails(prev => ({ ...prev, additionalInfo: e.target.value }))} placeholder="Any other information" rows="2" className="w-full p-2 bg-white/50 rounded-lg border border-white/30" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization & Price Section */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span className="text-white font-bold text-sm">3</span>
                  </span>
                  Card Customization
                </h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label><select value={selectedCardType} onChange={(e) => setSelectedCardType(e.target.value)} className="w-full p-3 bg-white/50 rounded-xl"><option value="">Select Card Type</option>{options.cardTypes.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}</select></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Paper Type</label><select value={selectedPaperType} onChange={(e) => setSelectedPaperType(e.target.value)} className="w-full p-3 bg-white/50 rounded-xl"><option value="">Select Paper Type</option>{options.paperTypes.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}</select></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Card Size</label><select value={selectedCardSize} onChange={(e) => setSelectedCardSize(e.target.value)} className="w-full p-3 bg-white/50 rounded-xl"><option value="">Select Card Size</option>{options.cardSizes.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}</select></div>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <div className="flex justify-between items-center mb-4">
                  <div><span className="text-3xl font-bold bg-gradient-to-r from-rose-700 to-amber-700 bg-clip-text text-transparent">₹{calculatePrice()}</span><p className="text-xs text-gray-500 mt-1">Including all taxes</p></div>
                  <div className="flex items-center space-x-3">
                    <button onClick={decrementQuantity} className="w-10 h-10 backdrop-blur-sm bg-white/50 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/70 shadow-sm">-</button>
                    <span className="font-bold text-xl text-gray-800">{quantity}</span>
                    <button onClick={incrementQuantity} className="w-10 h-10 backdrop-blur-sm bg-white/50 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/70 shadow-sm">+</button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 text-center">{quantity >= 500 ? "🎉 15% Bulk Discount Applied!" : quantity >= 200 ? "🎉 10% Bulk Discount Applied!" : quantity >= 100 ? "🎉 5% Bulk Discount Applied!" : "Order 100+ cards for bulk discount"}</p>
                <div className="mb-4">
                  <div className="flex"><input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" className="flex-1 p-3 bg-white/50 rounded-l-xl" maxLength="6"/><button onClick={handleCheckDelivery} className="px-6 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-medium rounded-r-xl hover:shadow-lg">Check</button></div>
                  {showDeliveryCheck && <div className="mt-2 p-2 bg-green-500/20 text-green-700 rounded-lg text-sm flex items-center"><FaCheckCircle className="mr-2" />Delivery available in 5-7 business days</div>}
                </div>
                
                {/* SAVE ALL DETAILS BUTTON */}
                <button onClick={handleSaveCustomerDetails} disabled={isSavingDetails} className={`w-full py-4 mb-4 ${isSavingDetails ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'} text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2`}>
                  {isSavingDetails ? <><FaSpinner className="animate-spin" />SAVING ALL DETAILS...</> : <><FaSave />SAVE CUSTOMER & WEDDING DETAILS</>}
                </button>

                <div className="flex gap-3">
                  <button onClick={handleAddToWishlist} className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 group"><FaHeart className="transform group-hover:scale-110" />WISHLIST</button>
                  <button onClick={handleAddToCart} disabled={isAddingToCart} className={`flex-1 py-4 ${isAddingToCart ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 group`}>
                    {isAddingToCart ? <><FaSpinner className="animate-spin" />ADDING...</> : <><FaShoppingCart />ADD TO CART<FaArrowRight className="transform group-hover:translate-x-1" /></>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Promise Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {promiseData.map((item, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-3"><div className="w-12 h-12 bg-gradient-to-br from-white/60 to-amber-100/60 rounded-full flex items-center justify-center mr-3 shadow-inner">{item.icon}</div><h3 className="font-bold text-gray-800">{item.title}</h3></div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            <div className="flex justify-between items-center p-6 border-b border-amber-300 bg-gradient-to-r from-rose-700 to-amber-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><FaRing className="text-yellow-300" />{weddingDetails.groomName || weddingCard?.groomName} ❤️ {weddingDetails.brideName || weddingCard?.brideName}<span className="text-sm ml-2 text-yellow-200">- Wedding Card</span></h3>
              <div className="flex gap-2">
                <button onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay} className={`p-2 rounded-lg ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-500'} text-white hover:opacity-80`}>{isAutoPlaying ? <FaPause /> : <FaPlay />}</button>
                <button onClick={downloadPreviewImage} className="p-2 text-white hover:bg-white/20 rounded-lg"><FaDownload /></button>
                <button onClick={sharePreviewImage} className="p-2 text-white hover:bg-white/20 rounded-lg"><FaShare /></button>
                <button onClick={closePreviewModal} className="p-2 text-white hover:bg-white/20 rounded-lg"><FaTimes /></button>
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)] bg-gradient-to-br from-amber-50 to-rose-50">
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-700/20 to-amber-800/20 rounded-full -z-10"></div>
                <div className="relative perspective-1200">
                  <div className={`relative transition-all duration-500 transform-style-3d ${isFlipping ? (flipDirection === "next" ? "animate-flip-forward" : "animate-flip-backward") : ""}`}>
                    <div className="bg-white/90 rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
                      <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-rose-100 border-b border-amber-200">
                        <span className="text-sm font-medium text-gray-600">{pages[currentPage].icon} {pages[currentPage].label}</span>
                        <span className="text-sm text-gray-500">Page {currentPage + 1} of {pages.length}</span>
                      </div>
                      <div className="p-8 flex justify-center items-center min-h-[500px] bg-gradient-to-br from-white to-amber-50">
                        {previewLoading ? <div className="text-center py-12"><FaSpinner className="animate-spin text-4xl text-rose-600 mx-auto mb-4" /><p>Loading page...</p></div> : previewError ? <div className="text-center py-12"><div className="text-red-500 text-4xl mb-4">⚠️</div><p>{previewError}</p><button onClick={() => openPreviewModal(pages[currentPage].type)} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg">Retry</button></div> : <img src={previewImage} alt="Wedding Card Preview" className="max-w-full max-h-[550px] object-contain rounded-lg shadow-lg" />}
                      </div>
                      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-amber-100 to-rose-100 border-t border-amber-200">
                        <button onClick={prevPage} disabled={isFlipping} className="px-6 py-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg disabled:opacity-50"><FaAngleLeft /> Previous</button>
                        <div className="flex gap-2">{pages.map((_, idx) => <button key={idx} onClick={() => { if (!isFlipping && idx !== currentPage) { if (idx > currentPage) setFlipDirection("next"); else setFlipDirection("prev"); setCurrentPage(idx); setPreviewImage(getPreviewImageUrl(pages[idx].type)); setPreviewType(pages[idx].type); } }} className={`transition-all duration-300 ${idx === currentPage ? 'w-8 h-2 bg-rose-600 rounded-full' : 'w-2 h-2 bg-gray-400 rounded-full hover:bg-rose-400'}`} />)}</div>
                        <button onClick={nextPage} disabled={isFlipping} className="px-6 py-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg disabled:opacity-50">Next <FaAngleRight /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center"><p className="text-sm text-gray-600">💡 Pages flip automatically every 3 seconds! Click <FaPlay className="inline text-green-600" /> to start or <FaPause className="inline text-red-600" /> to stop auto-flip.</p></div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes flipForward { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(0deg); } }
        @keyframes flipBackward { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(90deg); } 100% { transform: rotateY(0deg); } }
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