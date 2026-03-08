// Cart.jsx - Updated to handle both product types
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaShoppingCart, FaTrash, FaArrowRight, FaPlus, FaMinus,
  FaTruck, FaShieldAlt, FaGift, FaArrowLeft, FaBuilding,
  FaUserMd, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFileInvoice,
  FaBox, FaStethoscope, FaHospital, FaUser
} from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    setLoading(false);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    toast.success('Cart updated!');
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    toast.success('Item removed from cart');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseInt(item.price) || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal; // Free shipping
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
    // Save cart to localStorage for checkout
    localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/bill-books');
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

  const getCustomerDetails = (item) => {
    if (item.productType === 'prescription-pad') {
      return (
        <div className="space-y-1">
          <p className="text-sm text-gray-600 flex items-center">
            <FaHospital className="mr-2 text-teal-600 text-xs" />
            <span className="font-medium">Clinic:</span> {item.customerDetails?.clinicName || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <FaUserMd className="mr-2 text-blue-600 text-xs" />
            <span className="font-medium">Doctor:</span> {item.customerDetails?.doctorName || 'N/A'}
          </p>
          {item.customerDetails?.qualification && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaUser className="mr-2 text-purple-600 text-xs" />
              <span className="font-medium">Qualification:</span> {item.customerDetails.qualification}
            </p>
          )}
          {item.customerDetails?.registrationNumber && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaFileInvoice className="mr-2 text-orange-600 text-xs" />
              <span className="font-medium">Reg No.:</span> {item.customerDetails.registrationNumber}
            </p>
          )}
          <p className="text-sm text-gray-600 flex items-center">
            <FaPhone className="mr-2 text-green-600 text-xs" />
            <span className="font-medium">Mobile:</span> {item.customerDetails?.mobileNumber || item.customerDetails?.mobile}
          </p>
          {item.customerDetails?.email && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaEnvelope className="mr-2 text-yellow-600 text-xs" />
              <span className="font-medium">Email:</span> {item.customerDetails.email}
            </p>
          )}
          {item.customerDetails?.clinicAddress && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-red-600 text-xs" />
              <span className="font-medium">Address:</span> {item.customerDetails.clinicAddress}
              {item.customerDetails?.cityState && `, ${item.customerDetails.cityState}`}
              {item.customerDetails?.pinCode && ` - ${item.customerDetails.pinCode}`}
            </p>
          )}
          {item.customerDetails?.description && (
            <p className="text-sm text-gray-600 mt-2 italic border-t pt-2 border-gray-100">
              <span className="font-medium">Notes:</span> {item.customerDetails.description}
            </p>
          )}
          {item.customerDetails?.hasLogo && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              Logo uploaded
            </p>
          )}
        </div>
      );
    } else {
      // Bill Book details
      return (
        <div className="space-y-1">
          <p className="text-sm text-gray-600 flex items-center">
            <FaBuilding className="mr-2 text-blue-600 text-xs" />
            <span className="font-medium">Company:</span> {item.customerDetails?.companyName || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <FaPhone className="mr-2 text-green-600 text-xs" />
            <span className="font-medium">Mobile:</span> {item.customerDetails?.mobile}
          </p>
          {item.customerDetails?.alternateMobile && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaPhone className="mr-2 text-purple-600 text-xs" />
              <span className="font-medium">Alt Mobile:</span> {item.customerDetails.alternateMobile}
            </p>
          )}
          {item.customerDetails?.email && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaEnvelope className="mr-2 text-yellow-600 text-xs" />
              <span className="font-medium">Email:</span> {item.customerDetails.email}
            </p>
          )}
          <p className="text-sm text-gray-600 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-600 text-xs" />
            <span className="font-medium">Address:</span> {item.customerDetails?.address}
          </p>
          {item.customerDetails?.gstNo && (
            <p className="text-sm text-gray-600 flex items-center">
              <FaFileInvoice className="mr-2 text-orange-600 text-xs" />
              <span className="font-medium">GST:</span> {item.customerDetails.gstNo}
            </p>
          )}
          {item.customerDetails?.description && (
            <p className="text-sm text-gray-600 mt-2 italic border-t pt-2 border-gray-100">
              <span className="font-medium">Notes:</span> {item.customerDetails.description}
            </p>
          )}
        </div>
      );
    }
  };

  const getSelectedOptions = (item) => {
    if (item.productType === 'prescription-pad') {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.paperType && (
            <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
              {item.paperType}
            </span>
          )}
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            Qty: {item.quantity} pads
          </span>
        </div>
      );
    } else {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.selectedOptions?.billBook && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {item.selectedOptions.billBook}
            </span>
          )}
          {item.selectedOptions?.billBookType && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {item.selectedOptions.billBookType}
            </span>
          )}
          {item.selectedOptions?.paperType && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {item.selectedOptions.paperType}
            </span>
          )}
          {item.selectedOptions?.bookContains && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              {item.selectedOptions.bookContains}
            </span>
          )}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 mr-3" />
              Your Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cartItems.length === 0 
                ? 'Your cart is empty' 
                : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
              }
            </p>
          </div>

          {cartItems.length === 0 ? (
            // Empty Cart View
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-5xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Start shopping for bill books or prescription pads!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/bill-books')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Shop Bill Books
                </button>
                <button
                  onClick={() => navigate('/prescription-pads')}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Shop Prescription Pads
                </button>
              </div>
            </div>
          ) : (
            // Cart with Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {getProductIcon(item)}
                              <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                              {getProductTypeDisplay(item)}
                            </p>
                            
                            {/* Customer Details */}
                            {getCustomerDetails(item)}
                            
                            {/* Selected Options */}
                            {getSelectedOptions(item)}
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Qty:</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600 mr-2">Price:</span>
                            <span className="font-bold text-lg text-blue-600">
                              ₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaBox className="mr-2 text-blue-600" />
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate max-w-[150px]">
                          {item.name} (x{item.quantity})
                        </span>
                        <span className="font-medium">
                          ₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold">₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600 font-bold">FREE</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-2xl text-blue-600">
                          ₹{calculateTotal().toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 mb-3 flex items-center justify-center group"
                  >
                    PROCEED TO CHECKOUT
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center"
                  >
                    <FaArrowLeft className="mr-2" />
                    Continue Shopping
                  </button>

                  {/* Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaTruck className="text-green-600 mr-2" />
                      Free shipping on all orders
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaShieldAlt className="text-blue-600 mr-2" />
                      Secure checkout
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGift className="text-purple-600 mr-2" />
                      Free gift with every order
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500">
                      Cash on Delivery available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;