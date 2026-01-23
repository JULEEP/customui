import React from "react";
import { ShoppingBag, ShoppingCart, ArrowRight, Gift, Sparkles, Heart, Package } from "lucide-react";

const EmptyCartPage = () => {
  const suggestedProducts = [
    {
      id: 1,
      name: "Personalized Photo Album",
      price: "₹999",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      badge: "BESTSELLER"
    },
    {
      id: 2,
      name: "Custom Coffee Mug",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      badge: "TRENDING"
    },
    {
      id: 3,
      name: "Photo Canvas Print",
      price: "₹1499",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      badge: "PREMIUM"
    },
    {
      id: 4,
      name: "Custom T-Shirt",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      badge: "POPULAR"
    }
  ];

  const features = [
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Premium Quality",
      description: "High-quality materials & printing"
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-600" />,
      title: "Perfect Gifts",
      description: "Personalized for special occasions"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "Easy Customization",
      description: "Design online in minutes"
    },
    {
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      title: "Made with Love",
      description: "Crafted with attention to detail"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <ShoppingBag className="w-10 h-10 text-purple-600" />
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Add amazing personalized products to make someone's day special
          </p>
        </div>

        {/* Main Empty Cart Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 relative overflow-hidden border border-purple-100">
          {/* Decorative Background Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-30"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center py-12">
            {/* Animated Cart Icon */}
            <div className="relative mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shadow-lg shadow-purple-200/50">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-50 to-white flex items-center justify-center shadow-inner">
                  <ShoppingCart className="w-32 h-32 text-purple-400" />
                </div>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center justify-center shadow-lg">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center shadow-lg">
                <Gift className="w-8 h-8 text-pink-500" />
              </div>
              <div className="absolute -bottom-4 -left-8 w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <div className="absolute -bottom-4 -right-8 w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-green-500" />
              </div>
            </div>

            {/* Empty State Message */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your cart feels light...
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Looks like you haven't added any personalized items yet. 
                Start shopping to create something special!
              </p>
              
              {/* CTA Button */}
              <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span className="text-lg">Start Shopping Now</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mt-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              You might also like
            </h2>
            <button className="flex items-center text-purple-600 font-semibold hover:text-purple-700">
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Product Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* Quick Add Button */}
                  <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-purple-600 p-2 rounded-full shadow-lg hover:bg-purple-50">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Create Something Special?
            </h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Browse our collection of personalized gifts and start creating memories today
            </p>
            <button className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 3s ease-in-out infinite 0.5s;
        }
        
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite 1s;
        }
        
        .animate-float-delay-3 {
          animation: float 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default EmptyCartPage;