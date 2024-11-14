import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetDarbarByIdReporter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");
  const [darbar, setDarbar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbar = async () => {
      try {
        const token = localStorage.getItem("darbarToken"); // Get the token from local storage
        const response = await axios.get(
          `${baseUrl}getDarbarByIdReporter?id=${darbarId}`,
          {
            headers: {
              Authorization: token, // Include the token in the headers
            },
          }
        );
        setDarbar(response.data.darbar);
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbar();
  }, [darbarId]);

  // Function to handle accept action
  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("darbarToken"); // Get the token from local storage
      await axios.post(
        `${baseUrl}createDarbarStatus`, // Change to your actual endpoint for accepting the darbar
        {}, // Empty object since we're using query parameters
        {
          headers: {
            Authorization: token, // Include the token in the headers
          },
          params: {
            darbarId: darbarId, // Query parameter
          },
        }
      );

      alert("Darbar accepted successfully!");
      // Optionally, you can redirect or refresh the data here
    } catch (err) {
      alert(err.response ? err.response.data.error : "An error occurred");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!darbar) return <div>No Darbar found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Darbar Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Darbar ID: {darbar._id}</h2>
        <p>
          <strong>Organized by:</strong> {darbar.darbarBy.name} (
          {darbar.darbarBy.email})
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(darbar.darbarDate).toLocaleDateString()}
        </p>
        <p>
          <strong>State:</strong> {darbar.darbarState}
        </p>
        <p>
          <strong>City:</strong> {darbar.darbarCity}
        </p>
        <p>
          <strong>Area:</strong> {darbar.area}
        </p>
        <p>
          <strong>Village:</strong> {darbar.village}
        </p>
        <p>
          <strong>Purpose:</strong> {darbar.purpose}
        </p>
        <p>
          <strong>Reason:</strong> {darbar.darbarReason}
        </p>
        <p>
          <strong>Pincode:</strong> {darbar.pincode}
        </p>
        <p>
          <strong>People Available:</strong> {darbar.peopleAvailable}
        </p>
        <p>
          <strong>People Required:</strong> {darbar.peopleRequired}
        </p>
        <p>
          <strong>Type:</strong> {darbar.darbarType}
        </p>
        <p>
          <strong>Status:</strong> {darbar.darbarStatus}
        </p>
        <p>
          <strong>Time Limit (hours):</strong> {darbar.darbarTimeLimit}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(darbar.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(darbar.updatedAt).toLocaleString()}
        </p>
        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default GetDarbarByIdReporter;
