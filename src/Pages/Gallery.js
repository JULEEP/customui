// components/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FiTrash2, FiDownload, FiEdit2, FiGrid, FiList, FiShoppingCart, FiCheck } from 'react-icons/fi';
import PrintShoppyNavbar from './Navbar';
import Footer from './Footer';

const API_BASE_URL = "https://designback.onrender.com";

const Gallery = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [userId, setUserId] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  // Get current user ID
  const getCurrentUserId = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        return user._id || user.id;
      }
    } catch (e) {}
    return null;
  };

  // Fetch all saved designs
  const fetchGallery = async () => {
    const id = getCurrentUserId();
    if (!id) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }
    
    setUserId(id);
    setLoading(true);
    
    try {
      const response = await fetch(`https://designback.onrender.com/api/auth/gallery/${id}`);
      const result = await response.json();
      
      if (result.success) {
        console.log("Gallery data:", result.data);
        setDesigns(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Error loading gallery");
    } finally {
      setLoading(false);
    }
  };

  // Delete a design
  const deleteDesign = async (index, designId) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;
    
    try {
      const response = await fetch(`https://designback.onrender.com/api/auth/gallery/${userId}/${index}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Design deleted successfully");
        fetchGallery();
      } else {
        toast.error(result.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Error deleting design");
    }
  };

  // Download image
  const downloadImage = async (imageUrl, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Failed to download");
    }
  };

  // Add to Cart function
  const addToCart = (design, index) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = {
      id: design._id || index,
      imageUrl: typeof design === 'string' ? design : design.imageUrl,
      flexBookId: design.flexBookId,
      name: `Design ${index + 1}`,
      price: 299,
      quantity: 1,
      addedAt: new Date().toISOString()
    };
    
    const exists = existingCart.some(item => item.id === cartItem.id);
    
    if (exists) {
      toast.error("Already in cart!");
      return;
    }
    
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setAddedToCart(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [index]: false }));
    }, 2000);
    
    toast.success("Added to cart!");
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <>
        <PrintShoppyNavbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your designs...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PrintShoppyNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <Toaster position="top-center" />
        
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Gallery</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {designs.length} {designs.length === 1 ? 'design' : 'designs'} saved
                </p>
              </div>
              
              <div className="flex gap-3">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
                  >
                    <FiList size={18} />
                  </button>
                </div>
                
                {/* New Design Button */}
                <button
                  onClick={() => navigate('/flexes')}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md"
                >
                  + New Design
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gallery Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {designs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No designs yet</h3>
              <p className="text-gray-500 mb-6">Create your first design by clicking the button above</p>
              <button
                onClick={() => navigate('/flexes')}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Create Design
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {designs.map((design, index) => {
                // Handle both formats
                let imageUrl, flexBookId, createdAt, designId;
                
                if (typeof design === 'string') {
                  imageUrl = design;
                  flexBookId = null;
                  createdAt = null;
                  designId = index;
                } else {
                  imageUrl = design.imageUrl;
                  flexBookId = design.flexBookId;
                  createdAt = design.createdAt;
                  designId = design._id || index;
                }
                
                const isAdded = addedToCart[index];
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Design ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                        }}
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <button
                          onClick={() => downloadImage(imageUrl, index)}
                          className="p-2 bg-white rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
                          title="Download"
                        >
                          <FiDownload size={16} />
                        </button>
                        <button
                          onClick={() => addToCart(design, index)}
                          className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                            isAdded ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-500 hover:text-white'
                          }`}
                          title="Add to Cart"
                        >
                          {isAdded ? <FiCheck size={16} /> : <FiShoppingCart size={16} />}
                        </button>
                        <button
                          onClick={() => deleteDesign(index, designId)}
                          className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-3">
                      <p className="text-xs text-gray-400">
                        {createdAt ? new Date(createdAt).toLocaleDateString() : 'Recent'}
                      </p>
                      {flexBookId && (
                        <p className="text-xs text-indigo-500 mt-1 truncate">
                          Book ID: {flexBookId.slice(-8)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {designs.map((design, index) => {
                  let imageUrl, flexBookId, createdAt, designId;
                  
                  if (typeof design === 'string') {
                    imageUrl = design;
                    flexBookId = null;
                    createdAt = null;
                    designId = index;
                  } else {
                    imageUrl = design.imageUrl;
                    flexBookId = design.flexBookId;
                    createdAt = design.createdAt;
                    designId = design._id || index;
                  }
                  
                  const isAdded = addedToCart[index];
                  
                  return (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={`Design ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                          }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Design #{index + 1}</p>
                        <p className="text-xs text-gray-400">
                          {createdAt ? new Date(createdAt).toLocaleString() : 'Recently saved'}
                        </p>
                        {flexBookId && (
                          <p className="text-xs text-indigo-500">FlexBook: {flexBookId}</p>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadImage(imageUrl, index)}
                          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors"
                          title="Download"
                        >
                          <FiDownload size={18} />
                        </button>
                        <button
                          onClick={() => addToCart(design, index)}
                          className={`p-2 rounded-lg transition-all ${
                            isAdded ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-orange-500 hover:text-white'
                          }`}
                          title="Add to Cart"
                        >
                          {isAdded ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
                        </button>
                        <button
                          onClick={() => deleteDesign(index, designId)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Gallery;