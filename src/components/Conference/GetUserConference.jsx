// src/components/GetUserConference.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserConferences } from "../../redux/conferenceSlicer";
import { Link } from "react-router-dom";

const GetUserConference = () => {
  const dispatch = useDispatch();
  const { conferences, loading, error } = useSelector(
    (state) => state.conference
  );

  // Fetch conferences when the component mounts
  useEffect(() => {
    dispatch(getUserConferences());
  }, [dispatch]);

  const [filteredConferences, setFilteredConferences] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Update filtered conferences when status changes
  useEffect(() => {
    filterConferences();
  }, [statusFilter, conferences]);

  const filterConferences = () => {
    if (statusFilter === "All") {
      setFilteredConferences(conferences || []); // Fallback to empty array
    } else {
      const filtered = (conferences || []).filter(
        (conf) => conf.status?.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredConferences(filtered);
    }
  };
  





  // Handler for the View button
  const handleView = (conferenceId) => {
    // Implement your logic for viewing the conference
    console.log("View conference:", conferenceId);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Your Conferences</h2>
      {/* Status Filter Buttons */}
      <div className="mb-4 flex space-x-4">
        {["All", "Completed", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
              } hover:bg-blue-500 hover:text-white`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex-1 overflow-auto">
        {conferences && conferences.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Conference Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  WhatsApp Number
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Number of Reporters
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  State
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  City
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Area
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Pin Code
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Purpose
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConferences.map((conference) => (
                <tr key={conference._id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferenceName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.whatsappNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferenceEmailAddress}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.numberOfReporters}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferenceChannelState}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferenceChannelCity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferenceArea}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferencePinCode}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.conferencePurpose}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    {conference.status}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                    <Link
                      to={`/getSpecificConfrenceDetails?conferenceId=${conference._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleView(conference._id)}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No conferences found.</p>
        )}
      </div>
    </div>
  );
};

export default GetUserConference;
