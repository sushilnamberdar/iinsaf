import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const LeadDetails = () => {
  const [leadStatus, setLeadStatus] = useState(null);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adArea, setAdArea] = useState({ adState: "", adCity: "" });
  const [adDescription, setAdDescription] = useState("");
  const [adNote, setAdNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // State for loading during update
//sushil
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId");

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getSpecificLeadDetails`, {
          params: { leadId: leadId },
          headers: { Authorization: token },
        });
        setLead(response.data);
        setAdArea({
          adState: response.data.adArea[0].adState,
          adCity: response.data.adArea[0].adCity,
        });
        setAdDescription(response.data.adDescription);
        setAdNote(response.data.adNote);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadDetails();
    }
  }, [leadId]);

    useEffect(() => {
        const fetchLeadStatusView = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${baseUrl}viewStatus`, {
                    headers: { Authorization: token },
                    params: { leadId: leadId }
                });
                console.log("lead Status View response => ", response)
                if (response.data.leadStatusViews) {
                    setLeadStatus(response.data.leadStatusViews);
                }
            } catch (err) {
                console.log("lead Status View error => ", err)
                setError('Failed to fetch lead status details.');
            } finally {
                setLoading(false);
            }
        };

    if (leadId) {
      fetchLeadStatusView();
    }
  }, [leadId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("leadId", leadId);
    formData.append("adDescription", adDescription);
    formData.append("adNote", adNote);
    formData.append("adArea[adState]", adArea.adState);
    formData.append("adArea[adCity]", adArea.adCity);

    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    setIsUpdating(true); // Set loading state to true
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(`${baseUrl}updateLead-User`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message); // Show success toast
    } catch (error) {
      toast.error("Error updating lead: " + error.message); // Show error toast
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lead) return <div>No lead found</div>;

  return (
    <div className="container mx-auto p-4">
        <ToastContainer /> {/* Add ToastContainer */}
      <h2 className="text-xl font-bold mb-4 text-center">Lead Details</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lead ID:
            </label>
            <input
              type="text"
              value={lead._id}
              disabled
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lead By:
            </label>
            <input
              type="text"
              value={lead.leadBy}
              disabled
              className="border p-2 w-full rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ad Description:
            </label>
            <input
              type="text"
              value={adDescription || ""}
              onChange={(e) => setAdDescription(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ad Note:
            </label>
            <input
              type="text"
              value={adNote || ""}
              onChange={(e) => setAdNote(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Video:
          </label>
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Lead"}
        </button>
      </form>

      <h2>Lead Status View Details</h2>
      {Array.isArray(leadStatus) && leadStatus.length > 0 ? (
        leadStatus.map((status, index) => (
          <form key={index}>
            <div>
              <label>Lead ID:</label>
              <input type="text" value={status.leadId || ""} readOnly />
            </div>
            <div>
              <label>Accepted By User:</label>
              <input type="text" value={status.acceptedByUser || ""} readOnly />
            </div>
            <div>
              <label>Required Views:</label>
              <input type="number" value={status.reqView || 0} readOnly />
            </div>
            <div>
              <label>Video URL:</label>
              <input
                type="text"
                value={status.videoUrl || ""}
                onChange={(e) =>
                  setLeadStatus(
                    leadStatus.map((item, i) =>
                      i === index ? { ...item, videoUrl: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div>
              <label>Note:</label>
              <textarea
                value={status.note || ""}
                onChange={(e) =>
                  setLeadStatus(
                    leadStatus.map((item, i) =>
                      i === index ? { ...item, note: e.target.value } : item
                    )
                  )
                }
              />
            </div>
          </form>
        ))
      ) : (
        <div>No lead status available</div>
      )}
    </div>
  );
};

export default LeadDetails;
