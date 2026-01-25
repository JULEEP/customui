import React, { useState } from "react";

const SingleLetterhead = () => {
  const [quantity, setQuantity] = useState(100);
  const [paperType, setPaperType] = useState("90 GSM");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);

  // Quantity options and pricing
  const quantityOptions = [
    { qty: 100, price90: 600, price100: 700 },
    { qty: 200, price90: 1200, price100: 1400 },
    { qty: 300, price90: 1800, price100: 2100 },
    { qty: 500, price90: 2700, price100: 3150 },
    { qty: 1000, price90: 3600, price100: 4200 }
  ];

  const selectedProduct = quantityOptions.find(item => item.qty === quantity);
  const currentPrice = paperType === "90 GSM" ? selectedProduct?.price90 : selectedProduct?.price100;

  // Paper options
  const paperOptions = [
    "90 GSM Mapilho Paper",
    "100 GSM Eco-Bond Paper"
  ];

  const handleCheckDelivery = () => {
    if (pickupLocation) {
      alert(`Delivery available for: ${pickupLocation}`);
    } else {
      alert("Please enter pickup location");
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      product: "A4 Letterhead",
      paperType,
      quantity,
      price: currentPrice
    };
    alert(`Added to cart: ${quantity} sheets of ${paperType} letterhead for ₹${currentPrice}`);
    console.log("Cart item:", cartItem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          Home / Stationery / Letterheads / <span className="font-semibold">A4 Letterhead</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              LETTERHEAD TEMPLATES
            </h1>

            {/* Google Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-600 text-sm font-medium">Our Customized Reviews On Google</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <span className="font-bold text-gray-900">4.5/5</span>
                <span className="text-gray-600">(★★★★★)</span>
              </div>
            </div>

            {/* Product Image */}
            <div className="mb-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src="https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/letterhead/letterhead-121-600x800.webp"
                  alt="Letterhead Template"
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-transparent opacity-20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-200 to-transparent opacity-20 rounded-tl-full"></div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                PRODUCT DETAILS
              </h2>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  LETTERHEAD TYPE
                </h3>
                <div className="text-gray-700 mb-4">
                  A4<br />
                  20 cm x 29.7 cm
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">A4 LETTERHEAD</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">90 GSM Mapilho Paper</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">•</div>
                      <span className="text-gray-700">100 GSM Eco-Bond Paper</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">PRICING</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">90 GSM</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">100 GSM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quantityOptions.map((item) => (
                          <tr key={item.qty} className={`${item.qty === quantity ? 'bg-blue-50' : ''}`}>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.qty}</td>
                            <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Rs. {item.price90.toLocaleString('en-IN')}</td>
                            <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Rs. {item.price100.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">MULTI COLOR PRINTING</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Paper Quality: 100 GSM Eco-Bond Paper</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Paper Quantity: 90 GSM Mapilho Paper</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Size: A4 Size / Width: 210 cm & Height: 297 cm</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">Free Shipping</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2 mt-1">✓</div>
                      <span className="text-gray-700">10% Cashback</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">EACH PACK CONTAINS</h4>
                  <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">100 Pages</div>
                      <div className="text-gray-600 mt-2">With</div>
                      <div className="text-xl font-semibold text-gray-800">Box Binding</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">LETTERHEADS AFTER FINISHING</h4>
                  <p className="text-gray-600 italic">
                    Professional finishing with high-quality print and premium paper stock for the best impression.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ordering Panel */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit sticky top-6">
            
            {/* SELECT OPTIONS */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">SELECT OPTIONS</h3>
              
              {/* Paper Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold">PAPER</label>
                <div className="space-y-2">
                  {paperOptions.map((paper) => (
                    <div
                      key={paper}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-300 ${paperType === paper.split(' ')[0] ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setPaperType(paper.split(' ')[0])}
                    >
                      <div className="font-medium text-gray-900">{paper}</div>
                      <div className="text-blue-600 text-sm mt-1">www.compergysense.com</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Shipping Banner */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">FREE SHIPPING</div>
                    <p className="text-sm text-gray-600 mt-1">Free Shipping</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">₹{currentPrice}</span>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    1
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 1</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full ${selectedStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} flex items-center justify-center font-bold mr-3`}>
                    2
                  </div>
                  <span className="font-semibold text-gray-900">Skip - 2</span>
                </div>

                {/* eB gift card */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600">eB gift card today</div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
                  <select 
                    className="w-full px-4 py-3 focus:outline-none appearance-none bg-white"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {quantityOptions.map((option) => (
                      <option key={option.qty} value={option.qty}>{option.qty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg mb-6 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add to cart
              </button>

              {/* Delivery Check */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Check Delivery</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Enter your pickup location:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                  <button
                    onClick={handleCheckDelivery}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-300"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-gray-700">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLetterhead;