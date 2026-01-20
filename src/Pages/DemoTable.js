import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const DemoTable = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const response = await axios.get("https://school-backend-1-2xki.onrender.com/api/admin/get-demo");
        setDemos(response.data.demos);
      } catch (err) {
        setError("Failed to fetch demo data!");
      }
      setLoading(false);
    };
    fetchDemos();
  }, []);

  // Filtering data based on search term
  const filteredDemos = demos.filter(
    (demo) =>
      demo.demoFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.demoDate?.includes(searchTerm)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredDemos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedDemos = filteredDemos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Static Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        <h2 className="text-2xl font-semibold text-center text-purple-900 mb-4">
          Demo Requests
        </h2>

        <input
          type="text"
          placeholder="Search by Demo For or Date"
          className="border p-2 mb-4 w-full rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-gray-300 p-2">Full Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Demo For</th>
                  <th className="border border-gray-300 p-2">Demo Date</th>
                  <th className="border border-gray-300 p-2">Demo Time</th>
                  <th className="border border-gray-300 p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {displayedDemos.map((demo) => (
                  <tr key={demo._id} className="hover:bg-gray-100 text-center">
                    <td className="border border-gray-300 p-2">{demo.fullName}</td>
                    <td className="border border-gray-300 p-2">{demo.email}</td>
                    <td className="border border-gray-300 p-2">{demo.phone}</td>
                    <td className="border border-gray-300 p-2">{demo.address}</td>
                    <td className="border border-gray-300 p-2">{demo.demoFor}</td>
                    <td className="border border-gray-300 p-2">{demo.demoDate || "N/A"}</td>
                    <td className="border border-gray-300 p-2">{demo.demoTime || "N/A"}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(demo.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="py-2 px-4">Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoTable;
