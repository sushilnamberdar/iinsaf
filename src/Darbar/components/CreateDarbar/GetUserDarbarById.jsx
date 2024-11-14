import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetUserDarbarById = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");

  const [darbarData, setDarbarData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbarById = async () => {
      try {
        const response = await axios.get(`${baseUrl}getUserDarbarsStatusById`, {
          params: { id: darbarId },
          headers: {
            Authorization: localStorage.getItem("darbarToken"),
          },
        });
        setDarbarData(response.data);
      } catch (err) {
        setError("An error occurred while fetching the Darbar details.");
      }
    };
    if (darbarId) fetchDarbarById();
  }, [darbarId]);

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Darbar Details</h1>
    {error && <p className="text-red-500">{error}</p>}
    {darbarData ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
            {/* Darbar Details */}
            <h2 className="text-xl font-semibold mb-2">Darbar Name: {darbarData.darbar.darbarBy.name}</h2>
            <p className="text-gray-700 mb-2">Email: {darbarData.darbar.darbarBy.email}</p>
            <p className="text-gray-700 mb-2">Date: {new Date(darbarData.darbar.darbarDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2">Location: {darbarData.darbar.village}, {darbarData.darbar.area}, {darbarData.darbar.darbarCity}, {darbarData.darbar.darbarState}</p>
            <p className="text-gray-700 mb-2">Purpose: {darbarData.darbar.purpose}</p>
            <p className="text-gray-700 mb-2">Reason: {darbarData.darbar.darbarReason}</p>
            <p className="text-gray-700 mb-2">Pincode: {darbarData.darbar.pincode}</p>
            <p className="text-gray-700 mb-2">Type: {darbarData.darbar.darbarType}</p>
            <p className="text-gray-700 mb-2">Status: {darbarData.darbar.darbarStatus}</p>
            <p className="text-gray-700 mb-2">Time Limit: {darbarData.darbar.darbarTimeLimit} hours</p>
            <p className="text-gray-700 mb-2">People Available: {darbarData.darbar.peopleAvailable}</p>
            <p className="text-gray-700 mb-4">People Required: {darbarData.darbar.peopleRequired}</p>

            {/* Darbar Status Details */}
            <h3 className="text-lg font-semibold mt-4">Darbar Status</h3>
            {darbarData.darbarStatus.length > 0 ? (
                <ul className="space-y-4 mt-2">
                    {darbarData.darbarStatus.map((status) => (
                        <li key={status._id} className="border-b py-4">
                            <p className="text-gray-800">Status by Admin: {status.statusByAdmin}</p>
                            <p className="text-gray-800">Name: {status.acceptedByUser.name}</p>
                            <p className="text-gray-800">Email: {status.acceptedByUser.email}</p>
                            <p className="text-gray-800">Accepted Date: {new Date(status.acceptedDate).toLocaleDateString()}</p>
                            <p className="text-gray-800">Video Date: {new Date(status.videoDate).toLocaleDateString()}</p>
                            <p className="text-gray-800">Previous Views: {status.previousViews}</p>
                            <p className="text-gray-800">Note: {status.note}</p>
                            <a 
                                href={status.videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Watch Video
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No accepted statuses found for this Darbar.</p>
            )}
        </div>
    ) : (
        <p>Loading...</p>
    )}
</div>
  );
};

export default GetUserDarbarById;
