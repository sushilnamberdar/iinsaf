import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLeads } from "../../../redux/leadSlicer";
import { Link } from "react-router-dom";

const RejectedLead = () => {
  const dispatch = useDispatch();
  const { rejectedLeads, loading, error } = useSelector((state) => state.lead);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5; // Number of leads per page

  useEffect(() => {
    dispatch(fetchUserLeads("rejected"));
  }, [dispatch]);

  // Handle view button click
  const handleViewClick = (id) => {
    console.log("View button clicked for rejected lead ID:", id);
    // Add your view action logic here
  };

  return (
    <div className="container mx-auto p-6 bg-red-100 ">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-8">
        Rejected Leads
      </h1>

      {loading && <p>Loading...</p>}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {!loading && rejectedLeads.length === 0 && (
        <p>No rejected leads found.</p>
      )}

      {rejectedLeads.length > 0 && (
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
            {rejectedLeads.map((lead) => (
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
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-300"
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

export default RejectedLead;
