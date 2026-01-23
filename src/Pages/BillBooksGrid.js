import React from "react";
import { useNavigate } from "react-router-dom";

const BillBooksGrid = () => {
  const navigate = useNavigate();
  
  // Single image for all bill books
  const defaultImage = "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp";
  
  // Sample bill books data with SAME image
  const billBooks = [
    {
      id: 1,
      name: "Premium Carbon Copy Bill Book",
      price: "₹850/-",
      description: "3 copies with carbon paper, size A5",
      image: defaultImage,
      colors: ["Blue", "Green", "Red"],
      pages: 100
    },
    {
      id: 2,
      name: "Duplicate Bill Book - NCR",
      price: "₹950/-",
      description: "No Carbon Required, self-copying",
      image: defaultImage,
      colors: ["White", "Yellow", "Pink"],
      pages: 150
    },
    {
      id: 3,
      name: "Triplicate Bill Book",
      price: "₹1200/-",
      description: "Original + 2 copies, bound with spiral",
      image: defaultImage,
      colors: ["All Colors"],
      pages: 200
    },
    {
      id: 4,
      name: "Pocket Bill Book",
      price: "₹650/-",
      description: "Small size, portable, 50 bills",
      image: defaultImage,
      colors: ["Blue", "Black"],
      pages: 50
    },
    {
      id: 5,
      name: "Custom Logo Bill Book",
      price: "₹1500/-",
      description: "Custom design with your logo",
      image: defaultImage,
      colors: ["Custom"],
      pages: 100
    },
    {
      id: 6,
      name: "Professional Invoice Book",
      price: "₹1100/-",
      description: "Professional invoices with serial numbers",
      image: defaultImage,
      colors: ["White", "Blue"],
      pages: 120
    },
    {
      id: 7,
      name: "Receipt Book - Carbonless",
      price: "₹750/-",
      description: "Carbonless duplicate receipts",
      image: defaultImage,
      colors: ["White", "Green"],
      pages: 80
    },
    {
      id: 8,
      name: "Delivery Challan Book",
      price: "₹900/-",
      description: "Delivery notes with duplicate",
      image: defaultImage,
      colors: ["White", "Yellow"],
      pages: 100
    },
    {
      id: 9,
      name: "Thermal Bill Book",
      price: "₹1800/-",
      description: "Thermal paper, no ink needed",
      image: defaultImage,
      colors: ["White"],
      pages: 200
    },
    {
      id: 10,
      name: "Waterproof Bill Book",
      price: "₹1350/-",
      description: "Water and tear resistant",
      image: defaultImage,
      colors: ["Blue", "White"],
      pages: 100
    }
  ];

  const handleCardClick = (id) => {
    navigate(`/bill-books/${id}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Business Needs
          </button>
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Bill Books Collection
          </h1>
          <div className="w-32"></div> {/* For spacing */}
        </div>

        {/* Grid of bill books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {billBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleCardClick(book.id)}
              className="bg-white rounded-2xl p-4 border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Image container */}
              <div className="mb-4 h-48 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
                
                {/* Gradient overlay corners */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-200 to-transparent opacity-30 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-200 to-transparent opacity-30 rounded-tl-full"></div>
              </div>

              {/* Product info */}
              <div className="text-center">
                <h3 className="text-md font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                  {book.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {book.price}
                  </div>
                  <span className="text-sm text-gray-500">
                    {book.pages} pages
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {book.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Bill Books?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">High Quality Paper</h4>
                <p className="text-gray-600">GSM paper for durability</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Custom Printing</h4>
                <p className="text-gray-600">Add your logo and details</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Fast Delivery</h4>
                <p className="text-gray-600">Across India in 5-7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillBooksGrid;