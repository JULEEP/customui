// components/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaEdit, FaSave, FaTimes,
  FaSpinner, FaCheckCircle, FaUserCircle
} from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Get user ID from localStorage
  const getUserId = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.id;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // Fetch user data
  const fetchUserData = async () => {
    const userId = getUserId();
    const token = localStorage.getItem("token");
    
    if (!userId || !token) {
      setError("Please login to view your profile");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:4050/api/auth/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUser(data.user);
        setEditData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address || ""
        });
      } else {
        setError(data.message || "Failed to fetch user data");
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateSuccess("");
    setError("");
    
    const token = localStorage.getItem("token");
    const userId = getUserId();
    
    try {
      const response = await fetch(`http://localhost:4050/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          phoneNumber: editData.phoneNumber,
          address: editData.address
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUpdateSuccess("Profile updated successfully!");
        // Update local storage
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setTimeout(() => {
          setUpdateSuccess("");
          setIsEditing(false);
        }, 2000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset edit data
      setEditData({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address || ""
      });
    }
    setIsEditing(!isEditing);
    setError("");
    setUpdateSuccess("");
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center p-4">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 max-w-md text-center shadow-[20px_20px_40px_rgba(0,0,0,0.1),_-20px_-20px_40px_rgba(255,255,255,0.5)] border border-white/50">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
      {/* Floating Glass Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 backdrop-blur-md rounded-full border border-white/40"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.05), -6px -6px 12px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[12px_12px_24px_rgba(0,0,0,0.1),_-12px_-12px_24px_rgba(255,255,255,0.5)]">
            <FaUserCircle className="text-white text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account details</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[20px_20px_40px_rgba(0,0,0,0.1),_-20px_-20px_40px_rgba(255,255,255,0.5)] border border-white/50 overflow-hidden">
          
          {/* Success Message */}
          {updateSuccess && (
            <div className="m-6 p-4 bg-green-100/80 backdrop-blur-sm border border-green-400 text-green-700 rounded-xl flex items-center">
              <FaCheckCircle className="mr-2" />
              {updateSuccess}
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="m-6 p-4 bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-700 rounded-xl">
              {error}
            </div>
          )}
          
          {/* Profile Info */}
          <div className="p-6 md:p-8">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Full Name</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Email Address</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{user.email}</p>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{user.phoneNumber}</p>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Address</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">{user.address || "Not provided"}</p>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Member Since</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Last Login</label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "First login"}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editData.phoneNumber}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={editData.address}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner resize-none"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200/80 text-gray-700 rounded-xl hover:bg-gray-300/80 transition-all"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-70"
                  >
                    {isUpdating ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Account Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm text-gray-600">Account Status</p>
            <p className="font-semibold text-gray-800">{user.isActive ? "Active" : "Inactive"}</p>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-600">Security</p>
            <p className="font-semibold text-gray-800">Verified Account</p>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center border border-white/40">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-sm text-gray-600">Member Type</p>
            <p className="font-semibold text-gray-800">Premium Customer</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(6px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;