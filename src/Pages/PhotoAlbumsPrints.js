import React from "react";

const PhotoAlbumsPrints = () => {
  const imageUrl = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-photo-books-premium-photo-books-v1.webp";

  const products = [
    {
      name: "Premium Photo Albums",
      price: "From ₹999/-"
    },
    {
      name: "Snapbooks",
      price: "From ₹399/-"
    },
    {
      name: "Glossy Polaroid Prints",
      price: "From 30 @ ₹300/-"
    }
  ];

  return (
    <div className="py-12 px-4 bg-[#FFF8F0]"> {/* Ghee color background */}
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            PHOTO ALBUMS & PRINTS
          </h1>
          <div className="w-32 h-0.5 bg-amber-600 mx-auto mt-3"></div>
        </div>

        {/* Products with Image - Same image in all */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-amber-200"
            >
              {/* Image Section */}
              <div className="h-48 bg-amber-50 flex items-center justify-center p-4">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="text-amber-700 text-lg font-medium">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoAlbumsPrints;