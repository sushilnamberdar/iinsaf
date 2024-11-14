import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";
import LeadStatusViewDetails from "../LeadStatusViewDetails";
import { MdClose } from 'react-icons/md';

const AcceptedLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadId, setleadId] = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchAcceptedLeads = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getUserAcceptedLeads`, {
          headers: { Authorization: token },
        });
        setLeads(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedLeads();
  }, []);

  const handleEdit = (leadId) => {
    // You can use this function to navigate to an edit page or open a modal.
    console.log("Edit lead with ID:", leadId);
    // Example: navigate(`/edit-lead/${leadId}`);
  };

  const handleEditClick = (id) => {
    setleadId(id);
    setShowModal(true);  // Open the modal
  };

  const handleClose = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : leads.length === 0 ? (
        <p>No accepted leads found.</p>
      ) : (
        <div className="table-container rounded-2xl overflow-x-auto">
          <table className="scrollable-table min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Required Views</th>
                <th className="py-3 px-6 text-left">Remaining Views</th>
                <th className="py-3 px-6 text-left">Ad Length</th>
                <th className="py-3 px-6 text-left">Details</th>
                <th className="py-3 px-6 text-left">Edit</th>

              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {leads.map((lead, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td data-label="CHANNEL TYPE">{lead.leadId.channelType}</td>
                  <td data-label="AD TYPE ">{lead.leadId.adType}</td>
                  <td data-label="REQUIRED VIEWS ">{lead.leadId.requiredViews}</td>
                  <td data-label=" REMAINING VIEWS">{lead.leadId.remainingViews}</td>
                  <td data-label="AD LENGTH ">{lead.leadId.adLength}</td>
                  <td data-label="DETAILS">
                    <Link to={`getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                      onClick={() => handleEdit(lead.leadId._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200">
                      View Details
                    </Link>
                  </td>
                  <td data-label="EDIT">
                    <button onClick={() => handleEditClick(lead.leadId._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200">
                      Edit
                    </button>
                  </td>
                  <td className="mb-10"></td>
                </tr>
              ))}
            </tbody>

          </table>
          {showModal && (
            <div className="absolute top-0 left-0 w-full h-full lg:mt-0 mt-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <button onClick={handleClose} className=" absolute right-1 top-20  mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center">
                <MdClose className="mr-2" /> Close
              </button>
              <div className="bg-white p-5 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Lead Status Details</h2>
                <LeadStatusViewDetails leadId={leadId} />
                <button onClick={handleClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcceptedLeads;
