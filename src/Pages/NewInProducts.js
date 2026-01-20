import React from "react";

const NewInProducts = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-new-in-acrylic-writing-pads.webp";

  const newProducts = [
    {
      name: "Acrylic Writing Pads",
      originalPrice: "₹1,699/-",
      discountedPrice: "₹799/-",
      bgColor: "bg-[#E8F4FF]"
    },
    {
      name: "Photo Lamps",
      originalPrice: "₹499/-",
      discountedPrice: "₹299/-",
      bgColor: "bg-[#FFF0F5]"
    },
    {
      name: "Name Wallets",
      bgColor: "bg-[#F0FFF4]",
      comingSoon: true
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Simple Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center uppercase tracking-tight">
            NEW IN
          </h2>
          <div className="w-20 h-0.5 bg-gray-400 mx-auto mt-3"></div>
        </div>

        {/* Simple Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newProducts.map((product, index) => (
            <div
              key={index}
              className={`${product.bgColor} rounded-xl p-6 border border-gray-200`}
            >
              {/* Image - Simple */}
              <div className="h-48 mb-4 bg-white rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {product.name}
              </h3>

              {/* Pricing - Simple */}
              {product.comingSoon ? (
                <div className="space-y-2">
                  <div className="text-gray-600 italic">Coming Soon</div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-700">
                    {product.discountedPrice}
                  </div>
                  <div className="text-gray-500 line-through text-lg">
                    {product.originalPrice}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewInProducts;