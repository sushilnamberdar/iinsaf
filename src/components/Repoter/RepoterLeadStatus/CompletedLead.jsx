import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const CompletedLead = () => {
  const [completedLeads, setCompletedLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedLeads = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getUserAcceptedCompletedLeads`,
          {
            headers: { Authorization: token },
          }
        );
        setCompletedLeads(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load completed leads"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedLeads();
  }, []);

  const handleEdit = (leadId) => {
    console.log("Edit lead with ID:", leadId);
    // Example: Navigate to an edit page or open a modal
    // navigate(`/edit-lead/${leadId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : completedLeads.length === 0 ? (
        <p>No completed leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Required Views</th>
                <th className="py-3 px-6 text-left">Remaining Views</th>
                <th className="py-3 px-6 text-left">Ad Length</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {completedLeads.map((lead, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left">
                    {lead.leadId.channelType}
                  </td>
                  <td className="py-3 px-6 text-left">{lead.leadId.adType}</td>
                  <td className="py-3 px-6 text-left">
                    {lead.leadId.requiredViews}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {lead.leadId.remainingViews}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {lead.leadId.adLength}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link
                      to={`/getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                      onClick={() => handleEdit(lead.leadId._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
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

export default CompletedLead;
