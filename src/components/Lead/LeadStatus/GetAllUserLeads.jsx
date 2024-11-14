import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLeads } from "../../../redux/leadSlicer"; // Import the fetchUserLeads action
import { Link } from "react-router-dom";

const GetAllUserLeads = () => {
  const dispatch = useDispatch();

  const { allLeads, loading, error } = useSelector((state) => state.lead);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5; // Number of leads per page

  useEffect(() => {
    dispatch(fetchUserLeads("")); // Fetch all leads
  }, [dispatch]);

  // Handle view button click
  const handleViewClick = (id) => {
    // Perform the action for viewing the specific lead (e.g., navigate to lead details)
    console.log("View button clicked for lead ID:", id);
    // You can add navigation logic here or any other action you want to perform
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All User Leads</h1>

      {loading && <p className="text-lg text-center">Loading leads...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && allLeads.length === 0 && (
        <p className="text-lg text-center">No leads found.</p>
      )}

      {!loading && allLeads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-4 border-b">Lead By</th>
                <th className="py-3 px-4 border-b">Channel Type</th>
                <th className="py-3 px-4 border-b">Ad Type</th>
                <th className="py-3 px-4 border-b">Required Views</th>
                <th className="py-3 px-4 border-b">Remaining Views</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Action</th>{" "}
                {/* Add header for the button */}
              </tr>
            </thead>
            <tbody>
              {allLeads?.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{lead.leadBy}</td>
                  <td className="py-2 px-4 border-b">{lead.channelType}</td>
                  <td className="py-2 px-4 border-b">{lead.adType}</td>
                  <td className="py-2 px-4 border-b">{lead.requiredViews}</td>
                  <td className="py-2 px-4 border-b">{lead.remainingViews}</td>
                  <td className="py-2 px-4 border-b">{lead.status}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/getSpecificLeadDetails?leadId=${lead._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      onClick={() => handleViewClick(lead._id)} // Action on button click
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Pagination = ({ leadsPerPage, totalLeads, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <ul className="inline-flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded ${currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUserLeads;
