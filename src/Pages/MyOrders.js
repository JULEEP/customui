// MyOrders.jsx - Updated to handle both product types
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FaBox, FaTruck, FaCheckCircle, FaClock,
  FaMapMarkerAlt, FaRupeeSign, FaEye, FaShoppingBag,
  FaBuilding, FaPhone, FaEnvelope, FaFileInvoice, FaTag,
  FaUser, FaAddressCard, FaMobile, FaInfoCircle,
  FaStethoscope, FaHospital, FaUserMd, FaGraduationCap,
  FaIdCard, FaGlobe, FaImage, FaCreditCard
} from "react-icons/fa";
import { format } from 'date-fns';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed':
        return <FaCheckCircle className="text-blue-600" />;
      case 'Shipped':
        return <FaTruck className="text-purple-600" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
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

  const renderCustomerDetails = (item) => {
    if (item.productType === 'prescription-pad') {
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 flex items-start">
            <FaHospital className="mt-1 mr-3 text-teal-600 flex-shrink-0" />
            <span><span className="font-medium">Clinic:</span> {item.customerDetails?.clinicName || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-start">
            <FaUserMd className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
            <span><span className="font-medium">Doctor:</span> {item.customerDetails?.doctorName || 'N/A'}</span>
          </p>
          {item.customerDetails?.qualification && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaGraduationCap className="mt-1 mr-3 text-green-600 flex-shrink-0" />
              <span><span className="font-medium">Qualification:</span> {item.customerDetails.qualification}</span>
            </p>
          )}
          {item.customerDetails?.registrationNumber && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaIdCard className="mt-1 mr-3 text-orange-600 flex-shrink-0" />
              <span><span className="font-medium">Reg No.:</span> {item.customerDetails.registrationNumber}</span>
            </p>
          )}
          <p className="text-sm text-gray-600 flex items-start">
            <FaPhone className="mt-1 mr-3 text-green-600 flex-shrink-0" />
            <span><span className="font-medium">Mobile:</span> {item.customerDetails?.mobileNumber}</span>
          </p>
          {item.customerDetails?.phoneNumber && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaPhone className="mt-1 mr-3 text-purple-600 flex-shrink-0" />
              <span><span className="font-medium">Phone:</span> {item.customerDetails.phoneNumber}</span>
            </p>
          )}
          {item.customerDetails?.email && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaEnvelope className="mt-1 mr-3 text-yellow-600 flex-shrink-0" />
              <span><span className="font-medium">Email:</span> {item.customerDetails.email}</span>
            </p>
          )}
          {item.customerDetails?.website && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaGlobe className="mt-1 mr-3 text-indigo-600 flex-shrink-0" />
              <span><span className="font-medium">Website:</span> {item.customerDetails.website}</span>
            </p>
          )}
          {item.customerDetails?.clinicAddress && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-red-600 flex-shrink-0" />
              <span>
                <span className="font-medium">Address:</span> {item.customerDetails.clinicAddress}
                {item.customerDetails?.cityState && `, ${item.customerDetails.cityState}`}
                {item.customerDetails?.pinCode && ` - ${item.customerDetails.pinCode}`}
              </span>
            </p>
          )}
          {item.customerDetails?.hasLogo && (
            <p className="text-sm text-green-600 flex items-start">
              <FaImage className="mt-1 mr-3 text-green-600 flex-shrink-0" />
              <span>Logo uploaded</span>
            </p>
          )}
          {item.customerDetails?.description && (
            <p className="text-sm text-gray-600 flex items-start mt-2 pt-2 border-t border-gray-100">
              <FaInfoCircle className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
              <span><span className="font-medium">Notes:</span> {item.customerDetails.description}</span>
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 flex items-start">
            <FaBuilding className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
            <span><span className="font-medium">Company:</span> {item.customerDetails?.companyName || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-start">
            <FaMapMarkerAlt className="mt-1 mr-3 text-red-600 flex-shrink-0" />
            <span><span className="font-medium">Address:</span> {item.customerDetails?.address || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-start">
            <FaPhone className="mt-1 mr-3 text-green-600 flex-shrink-0" />
            <span><span className="font-medium">Mobile:</span> {item.customerDetails?.mobile}</span>
          </p>
          {item.customerDetails?.alternateMobile && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaMobile className="mt-1 mr-3 text-purple-600 flex-shrink-0" />
              <span><span className="font-medium">Alt Mobile:</span> {item.customerDetails.alternateMobile}</span>
            </p>
          )}
          {item.customerDetails?.email && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaEnvelope className="mt-1 mr-3 text-yellow-600 flex-shrink-0" />
              <span><span className="font-medium">Email:</span> {item.customerDetails.email}</span>
            </p>
          )}
          {item.customerDetails?.gstNo && (
            <p className="text-sm text-gray-600 flex items-start">
              <FaFileInvoice className="mt-1 mr-3 text-indigo-600 flex-shrink-0" />
              <span><span className="font-medium">GST:</span> {item.customerDetails.gstNo}</span>
            </p>
          )}
          {item.customerDetails?.description && (
            <p className="text-sm text-gray-600 flex items-start mt-2 pt-2 border-t border-gray-100">
              <FaInfoCircle className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
              <span><span className="font-medium">Notes:</span> {item.customerDetails.description}</span>
            </p>
          )}
        </div>
      );
    }
  };

  const renderSelectedOptions = (item) => {
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
          {item.selectedOptions?.serialNumber && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              {item.selectedOptions.serialNumber}
            </span>
          )}
        </div>
      );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FaBox className="text-4xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to create your custom products!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/bill-books')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all"
                >
                  Shop Bill Books
                </button>
                <button
                  onClick={() => navigate('/prescription-pads')}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all"
                >
                  Shop Prescription Pads
                </button>
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

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <FaShoppingBag className="text-blue-600 mr-3" />
              My Orders
            </h1>
            <p className="text-gray-600">
              You have placed {orders.length} order{orders.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                      <FaBox className="text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Order ID:</span>
                      <span className="ml-2 font-mono font-bold text-gray-900">{order.id}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        {format(new Date(order.date), 'dd MMM yyyy')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-start flex-1">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              {getProductIcon(item)}
                              <h3 className="font-bold text-gray-900">{item.name}</h3>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{getProductTypeDisplay(item)}</p>
                            
                            {/* Customer Details */}
                            <div className="bg-gray-50 p-3 rounded-lg mb-2">
                              {renderCustomerDetails(item)}
                            </div>
                            
                            {/* Selected Options */}
                            {renderSelectedOptions(item)}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="font-bold text-blue-600 text-lg">
                            ₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      {order.deliveryDetails.address}, {order.deliveryDetails.city}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Total Amount:</span>
                        <span className="ml-2 text-xl font-bold text-blue-600">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FaEye className="mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Order ID: <span className="font-bold text-gray-900">{selectedOrder.id}</span></p>
                      <p className="text-sm text-gray-600">
                        Date: <span className="font-bold text-gray-900">{format(new Date(selectedOrder.date), 'dd MMM yyyy, hh:mm a')}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Status: <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span>
                      </p>
                    </div>

                    {/* Items Section */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                        <FaBox className="mr-2 text-blue-600" />
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start flex-1">
                                <div className="w-16 h-16 bg-white rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    {getProductIcon(item)}
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                  </div>
                                  <p className="text-xs text-gray-500 mb-2">{getProductTypeDisplay(item)}</p>
                                  
                                  {/* Customer Details */}
                                  <div className="mt-2">
                                    {renderCustomerDetails(item)}
                                  </div>
                                  
                                  {/* Selected Options */}
                                  {renderSelectedOptions(item)}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                <p className="font-bold text-lg text-blue-600">
                                  ₹{(parseInt(item.price) * item.quantity).toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-red-600" />
                        Delivery Address
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="font-medium text-gray-900">{selectedOrder.deliveryDetails.fullName}</p>
                        <p className="text-gray-600">{selectedOrder.deliveryDetails.address}</p>
                        <p className="text-gray-600">
                          {selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.state} - {selectedOrder.deliveryDetails.pincode}
                        </p>
                        <p className="text-gray-600 mt-2 flex items-center">
                          <FaPhone className="mr-2 text-green-600" />
                          {selectedOrder.deliveryDetails.mobile}
                        </p>
                        {selectedOrder.deliveryDetails.email && (
                          <p className="text-gray-600 mt-1 flex items-center">
                            <FaEnvelope className="mr-2 text-yellow-600" />
                            {selectedOrder.deliveryDetails.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Payment & Total */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold">₹{selectedOrder.subtotal?.toLocaleString('en-IN') || selectedOrder.total.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="font-bold text-lg">Total Amount</span>
                        <span className="text-2xl font-bold text-blue-600">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 flex items-center">
                        <FaCreditCard className="mr-2 text-purple-600" />
                        Payment Method: {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : selectedOrder.paymentMethod}
                      </p>
                    </div>

                    {selectedOrder.estimatedDelivery && (
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-blue-800 flex items-center">
                          <FaTruck className="mr-2" />
                          Estimated Delivery by {selectedOrder.estimatedDelivery}
                        </p>
                      </div>
                    )}
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

export default MyOrders;