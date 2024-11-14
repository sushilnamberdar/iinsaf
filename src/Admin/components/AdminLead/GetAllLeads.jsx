import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/AdminRedux/adminGetAllLeadsSlicer";
import { Link } from "react-router-dom";

const GetAllLeads = () => {
  const dispatch = useDispatch();
  const { leads, status } = useSelector((state) => state.adminLeads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleViewClick = (leadId) => {
    // Action when the View button is clicked, you can navigate to a detailed page or open a modal
    console.log("View button clicked for lead:", leadId);
    // Add your view logic here
  };

  const paymentStatusStyle = (paymentStatus) => ({
    backgroundColor: paymentStatus === "failed" ? '#ffcccc' : 'transparent',
    transition: 'background-color 0.3s'
  });

  const generalStatusStyle = (generalStatus) => {
    switch (generalStatus) {
      case 'cancelled':
        return { backgroundColor: '#ffdead', transition: 'background-color 0.3s' }; // Navajo White
      case 'completed':
        return { backgroundColor: '#98fb98', transition: 'background-color 0.3s' }; // Pale Green
      case 'rejected':
        return { backgroundColor: '#ff6347', transition: 'background-color 0.3s' }; // Tomato
      case 'pending':
        return { backgroundColor: '#f0e68c', transition: 'background-color 0.3s' }; // Khaki
      case 'approved':
        return { backgroundColor: '#add8e6', transition: 'background-color 0.3s' }; // Light Blue
      default:
        return { backgroundColor: 'transparent', transition: 'background-color 0.3s' };
    }
  };

  // State for filters
  const [showTodaysLeads, setShowTodaysLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  // Filter leads based on today's date and selected status
  const filteredLeads = leads.filter((lead) => {
    const isToday = new Date(lead.createdDate).toDateString() === new Date().toDateString();
    const statusMatches = statusFilter ? lead.status === statusFilter : true;
    return (!showTodaysLeads || isToday) && statusMatches;
  });

  return (
    <div className="container mx-auto p-4">
      <h2>Leads</h2>
       {/* Filter Section */}
       <div className="mb-4 flex items-center space-x-4">
        {/* Toggle Today's Leads */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showTodaysLeads}
            onChange={() => setShowTodaysLeads(!showTodaysLeads)}
          />
          <span>Today's Leads</span>
        </label>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {status === "succeeded" && filteredLeads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-6 text-gray-600 font-bold">Lead By</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Area</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Cost</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Ad Description
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Type</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Channel Type
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Payment Status
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Status</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Required Views
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Admin Note
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Created Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6">{lead.leadBy}</td>
                  <td className="py-3 px-6">
                    {lead.adArea.length > 0
                      ? `${lead.adArea[0].adCity}, ${lead.adArea[0].adState}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">{lead.adCost}</td>
                  <td className="py-3 px-6">{lead.adDescription}</td>
                  <td className="py-3 px-6">{lead.adType}</td>
                  <td className="py-3 px-6">{lead.channelType}</td>
                  <td className="py-3 px-6" style={paymentStatusStyle(lead.paymentStatus)} >{lead.paymentStatus}</td>
                  <td className="py-3 px-6" style={generalStatusStyle(lead.status)}>{lead.status}</td>
                  <td className="py-3 px-6">{lead.requiredViews}</td>
                  <td className="py-3 px-6">{lead.adminNote}</td>
                  <td className="py-3 px-6">
                    {new Date(lead.createdDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/admin/updateLeads?leadId=${lead._id}`}
                      onClick={() => handleViewClick(lead._id)}
                      className="bg-blue-500 mr-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/getLeadStatus?leadId=${lead._id}`}
                      onClick={() => handleViewClick(lead._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Status
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No leads found.</p>
      )}
    </div>
  );
};

export default GetAllLeads;
