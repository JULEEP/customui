// SingleDoctorPrescription.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaStar, FaShippingFast, FaUndo, 
  FaSave, FaSpinner, FaShoppingCart, FaArrowRight,
  FaCheckCircle, FaShieldAlt, FaHeart, FaBuilding,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaTag,
  FaArrowLeft, FaPalette, FaLayerGroup, FaPrint, FaBarcode,
  FaEye, FaTimes, FaDownload, FaShare, FaUpload, FaGlobeAsia, FaIdCard,
  FaUserMd, FaGraduationCap, FaHospital, FaClock, FaRegIdCard
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const SingleDoctorPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Doctor Details State (like business details in bill book)
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "",
    qualification: "",
    hospitalName: "",
    address: "",
    phone: "",
    registrationNo: "",
    timing: "",
    logo: null
  });
  
  const [quantity, setQuantity] = useState(1);
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [selectedBookletType, setSelectedBookletType] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [userId, setUserId] = useState(null);

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

  // Fetch prescription template details
  const fetchPrescription = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/doctor-prescription/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setPrescription(result.data);
        // Pre-fill doctor details from template if available
        if (result.data) {
          setDoctorDetails(prev => ({
            ...prev,
            doctorName: result.data.doctorName || "",
            qualification: result.data.qualification || "",
            hospitalName: result.data.hospitalName || "",
            address: result.data.address || "",
            phone: result.data.phone || "",
            registrationNo: result.data.registrationNo || "",
            timing: result.data.timing || "",
            logo: result.data.logo || null
          }));
        }
      } else {
        throw new Error("Failed to fetch prescription pad");
      }
    } catch (err) {
      console.error("Error fetching prescription:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Save doctor details
  const handleSaveDoctorDetails = async () => {
    if (!userId) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    if (!doctorDetails.doctorName || !doctorDetails.hospitalName || !doctorDetails.phone) {
      toast.error("Please fill in Doctor Name, Hospital Name, and Phone Number");
      return;
    }

    if (doctorDetails.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSavingDetails(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('doctorName', doctorDetails.doctorName);
      formData.append('qualification', doctorDetails.qualification);
      formData.append('hospitalName', doctorDetails.hospitalName);
      formData.append('address', doctorDetails.address);
      formData.append('phone', doctorDetails.phone);
      formData.append('registrationNo', doctorDetails.registrationNo);
      formData.append('timing', doctorDetails.timing);
      
      if (doctorDetails.logo && typeof doctorDetails.logo !== 'string') {
        formData.append('logo', doctorDetails.logo);
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/doctor-details/${userId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Doctor details saved successfully!");
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
      } else {
        throw new Error(result.message || "Failed to save details");
      }
    } catch (err) {
      console.error("Error saving doctor details:", err);
      toast.error(err.message || "Failed to save doctor details");
    } finally {
      setIsSavingDetails(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      setDoctorDetails(prev => ({ ...prev, logo: file }));
      toast.success("Logo selected successfully!");
    }
  };

  const fetchPreviewImage = async () => {
    if (!userId) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    if (!doctorDetails.doctorName || !doctorDetails.hospitalName || !doctorDetails.phone) {
      toast.error("Please save your doctor details first to see the preview");
      return;
    }

    try {
      setPreviewLoading(true);
      setPreviewError(null);
      
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/auth/getprescriptionpreview/${userId}/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctorDetails)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.requiresDoctorDetails) {
          toast.error("Please save your doctor details first!");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data.overlaidImage) {
        setPreviewImage(result.data.overlaidImage);
        setShowPreviewModal(true);
      } else {
        throw new Error(result.message || "No preview image available");
      }
    } catch (err) {
      console.error("Error fetching preview:", err);
      setPreviewError(err.message);
      toast.error(err.message || "Failed to load preview image");
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewImage(null);
    setPreviewError(null);
  };

  const downloadPreviewImage = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.href = previewImage;
      link.download = `prescription-preview-${prescription?._id}.png`;
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
            title: 'Prescription Pad Preview',
            text: `Check out this prescription pad design`,
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

    if (!doctorDetails.doctorName || !doctorDetails.hospitalName || !doctorDetails.phone) {
      toast.error("Please fill in Doctor Name, Hospital Name, and Phone Number");
      return;
    }

    if (doctorDetails.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsAddingToCart(true);

    const cartItem = {
      id: Date.now(),
      userId: userId,
      productId: prescription._id,
      name: `${doctorDetails.doctorName} - Prescription Pad`,
      image: getImageUrl(),
      quantity: quantity,
      price: calculatePrice(),
      doctorDetails: {
        doctorName: doctorDetails.doctorName,
        qualification: doctorDetails.qualification,
        hospitalName: doctorDetails.hospitalName,
        address: doctorDetails.address,
        phone: doctorDetails.phone,
        registrationNo: doctorDetails.registrationNo,
        timing: doctorDetails.timing
      },
      selectedOptions: {
        prescriptionType: selectedPrescription,
        paperType: selectedPaperType,
        bookletType: selectedBookletType,
        serialNumber: selectedSerialNumber
      },
      timestamp: new Date().toISOString()
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success("Item added to cart!");
    setIsAddingToCart(false);
    setTimeout(() => navigate("/cart"), 1500);
  };

  const calculatePrice = () => {
    let basePrice = 750;
    if (prescription?.design?.showLogo) basePrice += 200;
    if (prescription?.design?.roundedCorners) basePrice += 100;
    if (prescription?.design?.shadow) basePrice += 100;
    if (prescription?.design?.border) basePrice += 50;
    return basePrice * quantity;
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setShowDeliveryCheck(true);
      setTimeout(() => setShowDeliveryCheck(false), 3000);
    } else {
      toast.error("Enter valid 6-digit pincode");
    }
  };

  const resetOptions = () => {
    setSelectedPrescription("");
    setSelectedPaperType("");
    setSelectedBookletType("");
    setSelectedSerialNumber("");
  };

  const getImageUrl = () => {
    if (prescription?.previewImage) {
      const previewPath = prescription.previewImage;
      if (previewPath.startsWith('http')) return previewPath;
      const cleanPath = previewPath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    
    if (prescription?.templateImage && !imageError) {
      const templatePath = prescription.templateImage;
      if (templatePath.startsWith('http')) return templatePath;
      const cleanPath = templatePath.replace(/\\/g, '/');
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      return `${API_BASE_URL}/${normalizedPath}`;
    }
    
    return "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";
  };

  const handleImageError = () => setImageError(true);

  const promiseData = [
    { icon: <FaShippingFast className="text-2xl text-blue-600" />, title: "FREE SHIPPING", description: "No worries, shipping on us" },
    { icon: <FaUndo className="text-2xl text-green-600" />, title: "30 DAYS RETURNS", description: "Hassle free returns & refunds" },
    { icon: <FaShieldAlt className="text-2xl text-purple-600" />, title: "QUALITY GUARANTEE", description: "100% satisfaction guaranteed" },
    { icon: <FaHeart className="text-2xl text-red-600" />, title: "CUSTOM DESIGN", description: "Personalized just for you" }
  ];

  const options = {
    prescriptionTypes: ["Standard Prescription Pad", "Premium Prescription Pad", "Carbonless Prescription Pad", "Duplicate Prescription Pad", "Triplicate Prescription Pad"],
    paperTypes: ["70 GSM Maplitho", "80 GSM Maplitho", "90 GSM Maplitho", "100 GSM Premium Paper", "Carbonless Paper"],
    bookletTypes: ["50 Sheets Pad", "100 Sheets Pad", "200 Sheets Pad", "500 Sheets Pad", "1000 Sheets Pad"],
    serialNumbers: ["Sequential Numbering", "Custom Starting Number", "No Serial Number"]
  };

  // Initialize
  useEffect(() => {
    if (!checkAuth()) return;
    fetchPrescription();
  }, [checkAuth, fetchPrescription]);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 max-w-md">
            <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Please Login</h3>
            <p className="text-gray-700 mb-4">You need to login first to view and purchase prescription pads.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all duration-300"
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
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/30 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff]">
            <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-700">Loading prescription pad details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !prescription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Prescription Pad</h3>
            <p className="text-gray-700 mb-4">{error || "Prescription pad not found"}</p>
            <button
              onClick={() => navigate("/prescriptions")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all duration-300"
            >
              Back to Prescription Pads
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      <Toaster position="top-center" />
      <Navbar />

      {showSuccessPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
            <FaCheckCircle className="text-2xl" />
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Your doctor details have been saved. You can now view the preview!</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/prescriptions")}
            className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium backdrop-blur-sm bg-white/30 px-5 py-2.5 rounded-2xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] transition-all duration-300 mb-8 group"
          >
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Prescription Pads
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Template Preview */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <div className="relative bg-gradient-to-br from-white/60 to-gray-100/60 rounded-2xl p-4 mb-4 min-h-[400px] flex items-center justify-center shadow-inner">
                  <img
                    src={getImageUrl()}
                    alt="Prescription Template"
                    className="max-h-[350px] max-w-full object-contain transform hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  {prescription.status === 'active' && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                      <FaCheckCircle className="mr-1" /> ACTIVE
                    </div>
                  )}
                </div>
                
                <button
                  onClick={fetchPreviewImage}
                  disabled={previewLoading}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 group"
                >
                  {previewLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      LOADING PREVIEW...
                    </>
                  ) : (
                    <>
                      <FaEye className="transform group-hover:scale-110 transition-transform" />
                      VIEW FULL PREVIEW
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Design Features Section */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaPalette className="mr-2 text-purple-600" />
                  Design Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Background Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: prescription.design?.backgroundColor }}></div>
                      <span className="text-xs">{prescription.design?.backgroundColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Text Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: prescription.design?.textColor }}></div>
                      <span className="text-xs">{prescription.design?.textColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Accent Color</span>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: prescription.design?.accentColor }}></div>
                      <span className="text-xs">{prescription.design?.accentColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 backdrop-blur-sm bg-white/30 rounded-xl">
                    <span className="text-sm text-gray-600">Font Family</span>
                    <span className="text-xs font-semibold">{prescription.design?.fontFamily}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {prescription.design?.roundedCorners && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-700 rounded-full">Rounded Corners</span>
                  )}
                  {prescription.design?.shadow && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-700 rounded-full">Shadow Effect</span>
                  )}
                  {prescription.design?.border && (
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-700 rounded-full">Border</span>
                  )}
                  {prescription.logoSettings?.show && (
                    <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-700 rounded-full">Logo Area</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Doctor Details Form (Like Business Details) */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span className="text-white font-bold text-sm">1</span>
                  </span>
                  Doctor Details
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaUserMd className="mr-2 text-indigo-600" />
                        Doctor Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={doctorDetails.doctorName}
                        onChange={(e) => setDoctorDetails(prev => ({ ...prev, doctorName: e.target.value }))}
                        placeholder="Enter doctor name"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaGraduationCap className="mr-2 text-purple-600" />
                        Qualification
                      </label>
                      <input
                        type="text"
                        value={doctorDetails.qualification}
                        onChange={(e) => setDoctorDetails(prev => ({ ...prev, qualification: e.target.value }))}
                        placeholder="e.g., MBBS, MD"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaHospital className="mr-2 text-red-600" />
                      Hospital Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={doctorDetails.hospitalName}
                      onChange={(e) => setDoctorDetails(prev => ({ ...prev, hospitalName: e.target.value }))}
                      placeholder="Enter hospital/clinic name"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-green-600" />
                      Address
                    </label>
                    <textarea
                      value={doctorDetails.address}
                      onChange={(e) => setDoctorDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter clinic/hospital address"
                      rows="2"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2 text-yellow-600" />
                        Phone <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        value={doctorDetails.phone}
                        onChange={(e) => setDoctorDetails(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="10-digit mobile"
                        maxLength="10"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaRegIdCard className="mr-2 text-blue-600" />
                        Registration No
                      </label>
                      <input
                        type="text"
                        value={doctorDetails.registrationNo}
                        onChange={(e) => setDoctorDetails(prev => ({ ...prev, registrationNo: e.target.value }))}
                        placeholder="Medical registration number"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaClock className="mr-2 text-pink-600" />
                      Clinic Timing
                    </label>
                    <input
                      type="text"
                      value={doctorDetails.timing}
                      onChange={(e) => setDoctorDetails(prev => ({ ...prev, timing: e.target.value }))}
                      placeholder="e.g., 10:00 AM - 6:00 PM"
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaUpload className="mr-2 text-orange-600" />
                      Doctor Logo / Stamp
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="w-full p-3 bg-white/50 backdrop-blur-sm border-2 border-dashed border-indigo-300 rounded-xl text-center hover:bg-white/70 transition-all duration-300">
                          <FaUpload className="mx-auto text-indigo-600 mb-1" />
                          <span className="text-sm text-gray-600">
                            {doctorDetails.logo && typeof doctorDetails.logo !== 'string' ? doctorDetails.logo.name : (doctorDetails.logo ? "Logo selected" : "Click to upload logo/stamp")}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveDoctorDetails}
                    disabled={isSavingDetails}
                    className={`w-full py-3 ${
                      isSavingDetails 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
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
                        SAVE DOCTOR DETAILS
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
                  Customize Your Prescription Pad
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaPrint className="mr-2 text-blue-600" />
                      Prescription Type
                    </label>
                    <select
                      value={selectedPrescription}
                      onChange={(e) => setSelectedPrescription(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Prescription Type</option>
                      {options.prescriptionTypes.map((option, index) => (
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
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Paper Type</option>
                      {options.paperTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaLayerGroup className="mr-2 text-green-600" />
                      Booklet Type
                    </label>
                    <select
                      value={selectedBookletType}
                      onChange={(e) => setSelectedBookletType(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Booklet Type</option>
                      {options.bookletTypes.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaBarcode className="mr-2 text-orange-600" />
                      Serial Number
                    </label>
                    <select
                      value={selectedSerialNumber}
                      onChange={(e) => setSelectedSerialNumber(e.target.value)}
                      className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
                    >
                      <option value="">Select Serial Number Option</option>
                      {options.serialNumbers.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={resetOptions}
                    className="w-full py-2 backdrop-blur-sm bg-white/50 text-gray-700 font-semibold rounded-xl hover:bg-white/70 transition-all duration-300 shadow-sm"
                  >
                    Reset Options
                  </button>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
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

                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="flex-1 p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-l-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-inner"
                      maxLength="6"
                    />
                    <button
                      onClick={handleCheckDelivery}
                      className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-r-xl hover:shadow-lg transition-all duration-300"
                    >
                      Check
                    </button>
                  </div>
                  {showDeliveryCheck && (
                    <div className="mt-2 p-2 bg-green-500/20 backdrop-blur-sm text-green-700 rounded-lg text-sm flex items-center border border-green-500/30">
                      <FaCheckCircle className="mr-2" />
                      Delivery available in 5-7 days
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-4 ${
                    isAddingToCart 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  } text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center text-lg group`}
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {promiseData.map((item, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 shadow-[12px_12px_24px_#b8b9be,_-12px_-12px_24px_#ffffff] border border-white/50 hover:shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/60 to-gray-100/60 rounded-full flex items-center justify-center mr-3 shadow-inner">
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

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaEye className="text-white" />
                Prescription Pad Preview
              </h3>
              <div className="flex gap-2">
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
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              {previewError ? (
                <div className="text-center py-12">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-gray-700">{previewError}</p>
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-[400px]">
                  <img
                    src={previewImage}
                    alt="Prescription Pad Preview"
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                    onError={() => setPreviewError("Failed to load preview image")}
                  />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50/50">
              <p className="text-center text-sm text-gray-600">
                This is how your prescription pad will look after printing
              </p>
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
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default SingleDoctorPrescription;