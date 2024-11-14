import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchLeadStatus } from "../../../../redux/AdminRedux/leadStatusSlicer"; // Redux action for fetching lead status
import { baseUrl } from "../../../../utils/const";

const GetLeadStatus = () => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);


  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  // Fetch lead status from Redux store
  const leadStatus = useSelector((state) => state.adminLeadStatus.LeadStatus);
  const status = useSelector((state) => state.adminLeadStatus.status);
  const error = useSelector((state) => state.adminLeadStatus.error);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId");

  // State for managing form data for each lead status by its _id
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (leadId) {
      dispatch(fetchLeadStatus(leadId)); // Fetch lead status when leadId is available
    }
  }, [leadId, dispatch]);

  useEffect(() => {
    if (leadStatus.length > 0) {
      const initialData = {};
      leadStatus.forEach((statusItem) => {
        initialData[statusItem._id] = {
          videoDate: statusItem.videoDate || "",
          videoUrl: statusItem.videoUrl || "",
          reqView: statusItem.reqView || false,
          statusByAdmin: statusItem.statusByAdmin || "",
          note: statusItem.note || "",
        };
      });
      setUpdateData(initialData); // Set initial state for update fields based on the fetched lead statuses
    }
  }, [leadStatus]);

  // Handle input change for a specific lead status
  const handleInputChange = (e, statusId) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [statusId]: {
        ...prevData[statusId],
        [name]: value,
      },
    }));
  };

  // Handle update for a specific lead status without using Redux
  const handleUpdate = async (statusId) => {
    const updatedData = updateData[statusId]; // Get the data for the specific status being updated

    try {
      const response = await axios.put(
        `${baseUrl}updateLeadStatusView`,
        {
          id: statusId, // Status ID to update
          videoDate: updatedData.videoDate,
          videoUrl: updatedData.videoUrl,
          reqView: updatedData.reqView,
          statusByAdmin: updatedData.statusByAdmin,
          note: updatedData.note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // Optionally update local state (not using Redux here)
      setUpdateData((prevData) => ({
        ...prevData,
        [statusId]: response.data,
      }));
      alert("Lead status updated successfully!");
    } catch (err) {
      console.log(err);
      alert(
        "Error updating lead status: " +
        (err.response?.data?.error || "Something went wrong.")
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lead Status for IDD: {leadId}</h1>
      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {status === "failed" && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}

      {/* Display each lead status with inputs for editing */}
      {/* {status === "succeeded" && leadStatus.length > 0 ? (
        leadStatus.map((statusItem) => (
          <div
            key={statusItem._id}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-2">
              Update Lead Status - ID: {statusItem._id}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
                value={updateData[statusItem._id]?.videoUrl || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="note"
                placeholder="Note"
                value={updateData[statusItem._id]?.note || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="datetime-local"
                name="videoDate"
                value={new Date(statusItem.videoDate).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="statusByAdmin"
                placeholder="Status By Admin"
                value={updateData[statusItem._id]?.statusByAdmin || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="acceptedByUser"
                placeholder="Accepted By User"
                value={statusItem.acceptedByUser || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="datetime-local"
                name="acceptedDate"
                value={new Date(statusItem.acceptedDate).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="datetime-local"
                name="createdAt"
                value={new Date(statusItem.createdAt).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="datetime-local"
                name="updatedAt"
                value={new Date(statusItem.updatedAt).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="leadChannelType"
                placeholder="Channel Type"
                value={statusItem.leadId.channelType || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="adType"
                placeholder="Ad Type"
                value={statusItem.leadId.adType || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="number"
                name="previousViews"
                placeholder="Previous Views"
                value={statusItem.previousViews || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="number"
                name="reqView"
                placeholder="Requested Views"
                value={statusItem.reqView || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="number"
                name="viewReceived"
                placeholder="View Received"
                value={statusItem.viewReceived || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <button
                onClick={() => handleUpdate(statusItem._id)}
                className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No lead status found.</p>
      )} */}
      {status === "succeeded" && leadStatus.length > 0 ? (
        leadStatus.map((statusItem) => (
          <div
            key={statusItem._id}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-2">
              Update Lead Status - ID: {statusItem._id}
            </h2>
            <div className="grid grid-cols-1 gap-4">

              <label className="font-medium">Video URL:</label>
              <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
                value={updateData[statusItem._id]?.videoUrl || statusItem.videoUrl || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-medium">Note:</label>
              <input
                type="text"
                name="note"
                placeholder="Note"
                value={updateData[statusItem._id]?.note || statusItem.note || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-medium">Video Date:</label>
              <input
                type="datetime-local"
                name="videoDate"
                value={new Date(statusItem.videoDate).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Accepted By User:</label>
              <input
                type="text"
                name="acceptedByUser"
                placeholder="Accepted By User"
                value={statusItem.acceptedByUser || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Accepted Date:</label>
              <input
                type="datetime-local"
                name="acceptedDate"
                value={new Date(statusItem.acceptedDate).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Created At:</label>
              <input
                type="datetime-local"
                name="createdAt"
                value={new Date(statusItem.createdAt).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Updated At:</label>
              <input
                type="datetime-local"
                name="updatedAt"
                value={new Date(statusItem.updatedAt).toISOString().slice(0, 16)}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Channel Type:</label>
              <input
                type="text"
                name="leadChannelType"
                placeholder="Channel Type"
                value={statusItem.leadId.channelType || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Ad Type:</label>
              <input
                type="text"
                name="adType"
                placeholder="Ad Type"
                value={statusItem.leadId.adType || ""}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Previous Views:</label>
              <input
                type="number"
                name="previousViews"
                placeholder="Previous Views"
                value={statusItem.previousViews || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Requested Views:</label>
              <input
                type="number"
                name="reqView"
                placeholder="Requested Views"
                value={statusItem.reqView || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Views Received:</label>
              <input
                type="number"
                name="viewReceived"
                placeholder="View Received"
                value={statusItem.viewReceived || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <label className="font-medium">Lead Status:</label>
              <input
                type="text"
                name="status"
                placeholder="View Received"
                value={statusItem.status || 0}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />

              <label className="font-medium">Status By Admin:</label>
              <select
                name="statusByAdmin"
                value={updateData[statusItem._id]?.statusByAdmin || statusItem.statusByAdmin || ""}
                onChange={(e) => handleInputChange(e, statusItem._id)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={() => handleUpdate(statusItem._id)}
                className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No lead status found.</p>
      )}

    </div>
  );
};

export default GetLeadStatus;
