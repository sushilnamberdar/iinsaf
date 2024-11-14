import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const DarbarDetailsByIdAdmin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");

  const [darbarData, setDarbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); // To handle loading state for update
  const [updatedDarbarData, setUpdatedDarbarData] = useState({}); // To hold updated data

  useEffect(() => {
    const fetchDarbarData = async () => {
      const adminToken = localStorage.getItem("adminToken");

      try {
        const response = await axios.get(
          `${baseUrl}getDarbarById?id=${darbarId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setDarbarData(response.data);
        setUpdatedDarbarData(response.data.darbar); // Initialize updated data with fetched data
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbarData();
  }, [darbarId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDarbarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const adminToken = localStorage.getItem("adminToken");
    setUpdating(true);

    try {
      // Call the update API with the correct URL and data
      await axios.put(
        `${baseUrl}updateDarbarAdmin?id=${darbarId}`,
        updatedDarbarData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Darbar updated successfully!"); // You might want to show a better notification
      // Optionally, you can fetch the updated data again
      // fetchDarbarData();
    } catch (err) {
      setError(
        err.response
          ? err.response.data.error
          : "An error occurred during update"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Darbar Details</h1>
      {darbarData && (
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold">Darbar Information</h2>
          <p>
            <strong>ID:</strong> {darbarData.darbar._id}
          </p>
          <p>
            <strong>By:</strong> {darbarData.darbar.darbarBy.name} (
            {darbarData.darbar.darbarBy.email})
          </p>
          <p>
            <strong>Date:</strong>
            <input
              type="date"
              name="darbarDate"
              value={
                updatedDarbarData.darbarDate
                  ? new Date(updatedDarbarData.darbarDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>State:</strong>
            <input
              type="text"
              name="darbarState"
              value={updatedDarbarData.darbarState || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>City:</strong>
            <input
              type="text"
              name="darbarCity"
              value={updatedDarbarData.darbarCity || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Area:</strong>
            <input
              type="text"
              name="area"
              value={updatedDarbarData.area || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Village:</strong>
            <input
              type="text"
              name="village"
              value={updatedDarbarData.village || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Purpose:</strong>
            <input
              type="text"
              name="purpose"
              value={updatedDarbarData.purpose || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Reason:</strong>
            <input
              type="text"
              name="darbarReason"
              value={updatedDarbarData.darbarReason || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Pincode:</strong>
            <input
              type="text"
              name="pincode"
              value={updatedDarbarData.pincode || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>People Available:</strong>
            <input
              type="number"
              name="peopleAvailable"
              value={updatedDarbarData.peopleAvailable || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>People Required:</strong>
            <input
              type="number"
              name="peopleRequired"
              value={updatedDarbarData.peopleRequired || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Type:</strong>
            <input
              type="text"
              name="darbarType"
              value={updatedDarbarData.darbarType || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            />
          </p>
          <p>
            <strong>Status:</strong>
            <select
              name="darbarStatus"
              value={updatedDarbarData.darbarStatus || ""}
              onChange={handleInputChange}
              className="border rounded p-1 mx-2"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </p>
          <p>
            <strong>Time Limit:</strong> {darbarData.darbar.darbarTimeLimit}
          </p>
          <p>
            <strong>Created At:</strong>
            {new Date(darbarData.darbar.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>
            {new Date(darbarData.darbar.updatedAt).toLocaleString()}
          </p>
          <button
            onClick={handleUpdate}
            disabled={updating}
            className={`mt-4 p-2 bg-blue-500 text-white rounded ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DarbarDetailsByIdAdmin;
