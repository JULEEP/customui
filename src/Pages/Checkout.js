// Checkout.jsx - Updated to handle both product types
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaCheckCircle, FaTruck, FaCreditCard, FaLock,
  FaArrowLeft, FaMapMarkerAlt, FaUser, FaBox,
  FaBuilding, FaPhone, FaEnvelope, FaFileInvoice,
  FaStethoscope, FaHospital, FaUserMd, FaGraduationCap,
  FaIdCard, FaGlobe, FaImage, FaTag
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    email: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('checkoutCart')) || [];
    if (items.length === 0) {
      navigate('/cart');
    }
    setCartItems(items);
    setLoading(false);
  }, [navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseInt(item.price) || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // Free shipping
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'address', 'city', 'state', 'pincode', 'mobile'];
    for (let field of required) {
      if (!deliveryDetails[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (deliveryDetails.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (deliveryDetails.pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    setProcessing(true);

    // Create order object
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      deliveryDetails: deliveryDetails,
      paymentMethod: paymentMethod,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    existingOrders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutCart');

    // Show success message
    toast.success('Order placed successfully!');
    
    setProcessing(false);

    // Navigate to my orders
    setTimeout(() => {
      navigate('/my-orders');
    }, 1500);
  };

  const getProductIcon = (item) => {
    if (item.productType === 'prescription-pad') {
      return <FaStethoscope className="text-teal-600 mr-2" />;
    }
    return <FaFileInvoice className="text-blue-600 mr-2" />;
  };

  const getProductTypeDisplay = (item) => {
    if (item.productType === 'prescription-pad') {
      return 'Prescription Pad';
    }
    return 'Bill Book';
  };

  const getCustomerDetailsSummary = (item) => {
    if (item.productType === 'prescription-pad') {
      return (
        <div className="text-sm text-gray-600 space-y-1 mt-1">
          <p className="flex items-center">
            <FaHospital className="mr-2 text-teal-600 text-xs" />
            <span className="font-medium">Clinic:</span> {item.customerDetails?.clinicName || 'N/A'}
          </p>
          <p className="flex items-center">
            <FaUserMd className="mr-2 text-blue-600 text-xs" />
            <span className="font-medium">Doctor:</span> {item.customerDetails?.doctorName || 'N/A'}
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-green-600 text-xs" />
            <span className="font-medium">Mobile:</span> {item.customerDetails?.mobileNumber}
          </p>
        </div>
      );
    } else {
      return (
        <div className="text-sm text-gray-600 space-y-1 mt-1">
          <p className="flex items-center">
            <FaBuilding className="mr-2 text-blue-600 text-xs" />
            <span className="font-medium">Company:</span> {item.customerDetails?.companyName || 'N/A'}
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-green-600 text-xs" />
            <span className="font-medium">Mobile:</span> {item.customerDetails?.mobile}
          </p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
            onClick={() => navigate('/cart')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 group"
          >
            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Details */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaTruck className="text-blue-600 mr-3" />
                  Delivery Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={deliveryDetails.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={deliveryDetails.mobile}
                        onChange={handleInputChange}
                        maxLength="10"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryDetails.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={deliveryDetails.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={deliveryDetails.pincode}
                        onChange={handleInputChange}
                        maxLength="6"
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={deliveryDetails.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaCreditCard className="text-blue-600 mr-3" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-bold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      disabled
                      className="mr-3"
                    />
                    <div>
                      <span className="font-bold text-gray-900">Online Payment</span>
                      <p className="text-sm text-gray-600">Coming soon...</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaBox className="mr-2 text-blue-600" />
                  Order Summary
                </h2>

                {/* Items */}
                <div className="max-h-96 overflow-y-auto mb-4 space-y-4 pr-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center">
                              {getProductIcon(item)}
                              <p className="font-medium text-gray-900">{item.name}</p>
                            </div>
                            <p className="text-xs text-gray-500">{getProductTypeDisplay(item)}</p>
                            {getCustomerDetailsSummary(item)}
                            <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-blue-600">
                          ₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {/* Selected Options */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            value && (
                              <span key={key} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {value}
                              </span>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className={`w-full ${
                    processing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  } text-white font-bold py-4 rounded-xl transition-all shadow-lg mb-3 transform hover:-translate-y-1`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      PLACING ORDER...
                    </div>
                  ) : (
                    'PLACE ORDER'
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <FaLock className="mr-2 text-green-600" />
                  Secure Checkout
                </div>

                {/* Features */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaCheckCircle className="text-green-600 mr-2" />
                    100% Safe & Secure
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTruck className="text-blue-600 mr-2" />
                    Free Shipping on all orders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;