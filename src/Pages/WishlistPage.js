import React from "react";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star, Package, Clock, Tag } from "lucide-react";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Personalized Photo Album",
      price: "₹999",
      originalPrice: "₹1,299",
      discount: "23% off",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      delivery: "Free Delivery",
      inStock: true
    },
    {
      id: 2,
      name: "Custom Coffee Mug",
      price: "₹499",
      originalPrice: "₹699",
      discount: "29% off",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 89,
      delivery: "Express Delivery",
      inStock: true
    },
    {
      id: 3,
      name: "Photo Canvas Print",
      price: "₹1,499",
      originalPrice: "₹1,999",
      discount: "25% off",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 201,
      delivery: "Free Delivery",
      inStock: false
    },
    {
      id: 4,
      name: "Custom T-Shirt",
      price: "₹699",
      originalPrice: "₹899",
      discount: "22% off",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      reviews: 67,
      delivery: "Standard Delivery",
      inStock: true
    },
    {
      id: 5,
      name: "Wooden Photo Frame",
      price: "₹799",
      originalPrice: "₹1,099",
      discount: "27% off",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 156,
      delivery: "Free Delivery",
      inStock: true
    },
    {
      id: 6,
      name: "Personalized Diary",
      price: "₹349",
      originalPrice: "₹499",
      discount: "30% off",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 92,
      delivery: "Express Delivery",
      inStock: true
    }
  ];

  const totalItems = wishlistItems.length;
  const totalPrice = wishlistItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace('₹', '').replace(',', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-red-100 mb-4">
            <Heart className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            My <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Wishlist</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Save your favorite personalized items for later
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{wishlistItems.filter(item => item.inStock).length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(
                      wishlistItems.reduce((sum, item) => sum + item.rating, 0) / totalItems
                    ).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full font-bold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {item.discount}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:w-3/5 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <button className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                      <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{item.delivery}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        item.inStock
                          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white hover:shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!item.inStock}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <ArrowRight className="w-5 h-5" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-600 to-red-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mb-12">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-24 translate-x-24"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make Your Wishlist Real?
            </h3>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto text-lg">
              Don't wait! Add these amazing personalized items to your cart and create special memories today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Move All to Cart
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-all duration-300">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;