import React, { useState } from 'react';

const CategoriesDropdown = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = [
    {
      title: 'Business Cards',
      subcategories: [
        'Thick Business Cards',
        'Economic Business Card',
        'Premium Business Card',
        'Enviro Print'
      ]
    },
    {
      title: 'Office Supplies',
      subcategories: [
        'Letterhead',
        'Envelope',
        'Office Supplies',
        'Invitations'
      ]
    },
    {
      title: 'Cards & Gifts',
      subcategories: [
        'Cards',
        'Gift Wrapping Paper',
        'Stamp'
      ]
    },
    {
      title: 'Marketing & Promotional Material',
      subcategories: [
        'Booklet',
        'Brochure',
        'Calendar',
        'Flyer & Leaflet',
        'Certificate',
        'Dangler',
        'Menu'
      ]
    },
    {
      title: 'Labels, Stickers & Packaging',
      subcategories: [
        'Stickers',
        'Stickers by shape',
        'Label',
        'Gift Wrapper'
      ]
    }
  ];

  return (
    <div className="relative mt-20 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Categories Toggle Button */}
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>All Categories</span>
            <svg 
              className={`w-4 h-4 transform transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Quick Category Links */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.slice(0, 3).map((category) => (
              <button
                key={category.title}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
              >
                {category.title}
              </button>
            ))}
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
              View All →
            </button>
          </div>
        </div>

        {/* Dropdown Categories Panel */}
        {isCategoriesOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl border border-gray-200 rounded-b-lg z-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
              {categories.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg border-b border-gray-200 pb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.subcategories.map((subcat, subIndex) => (
                      <li key={subIndex}>
                        <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left py-1.5 px-2 rounded transition-colors duration-200">
                          {subcat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Footer with popular categories */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Popular:</span>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200">
                      Business Cards
                    </button>
                    <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200">
                      Stickers
                    </button>
                    <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200">
                      Brochures
                    </button>
                    <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200">
                      Labels
                    </button>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                  <span>View All Categories</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesDropdown;