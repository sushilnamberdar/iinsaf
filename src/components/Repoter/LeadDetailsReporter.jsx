import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import { baseUrl } from "../../utils/const";
import LeadStatusViewDetails from "./LeadStatusViewDetails";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for the toast
import { AiOutlineCopy } from 'react-icons/ai';


const LeadDetailsReporter = () => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false); // New state for accept button loading

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId"); // Get leadId from query parameters

  const [reqView, setReqView] = useState(""); // To capture the required views for the lead

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getSpecificLeadDetails`, {
          params: { leadId: leadId },
          headers: {
            Authorization: token, // Add token to the header
          },
        });
        console.log(response);
        setLead(response.data);
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

  const handleAccept = async () => {
    setAccepting(true);
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${baseUrl}createStatus`,
        { leadId, reqView }, // Send the required fields to the API
        {
          headers: {
            Authorization: token, // Add token to the header
          },
        }
      );

      console.log("Accept response:", response.data);
      toast.success("Lead accepted successfully!");
    } catch (error) {
      console.error("Error accepting lead:", error);
      toast.error("Error accepting lead: " + error.message);
    } finally {
      setAccepting(false); // Reset accepting state after API call
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(lead.adImageURL, {
        responseType: 'blob', // Important: get the response as a Blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'adImage.jpg'); // Specify the download file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up after download
    } catch (error) {
      toast.error("Error downloading image: " + error.message);
    }
  };

  const handleDownloadVideo = async () => {
    try {
      const response = await axios.get(lead.adVideoURL, {
        responseType: 'blob', // Important: get the response as a Blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'adVideo.mp4'); // Specify the download file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up after download
    } catch (error) {
      toast.error("Error downloading video: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lead) return <div>No lead found</div>;
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('URL copied to clipboard!'); // Alert the user that the copy was successful
    }).catch(err => {
      console.error('Failed to copy: ', err); // Log an error if the copy fails
    });
  };

  return (
    <div className="bg-white shadow flex flex-col items-center rounded-lg p-6">
      <ToastContainer /> {/* Render the toast container */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lead Details</h2>
      {/* Grid layout for structured box-like sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-4/6 gap-4">

        {/* Basic Information Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">Basic Information</h3>
          <div className="space-y-2">
            <div><strong>Lead ID:</strong> {lead._id}</div>
            <div><strong>Lead By:</strong> {lead.leadBy}</div>
            <div><strong>Channel Type:</strong> {lead.channelType}</div>
            <div><strong>Ad Type:</strong> {lead.adType}</div>
          </div>
        </div>
        
        

        {/* Advertisement Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">Advertisement Details</h3>
          <div className="space-y-2">
            <div><strong>Required Views:</strong> {lead.requiredViews}</div>
            <div><strong>Remaining Views:</strong> {lead.remainingViews}</div>
            <div><strong>Ad Length:</strong> {lead.adLength}</div>
            <div className="p-2 rounded-full text- bg-green-300"><strong>Ad Cost:</strong> {lead.adCost}</div>
            <div><strong>Ad Description:</strong> {lead.adDescription || "N/A"}</div>
            <div><strong>Ad Note:</strong> {lead.adNote || "N/A"}</div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Image:</label>
        {lead.adImageURL ? (
          <div className="mt-2">
            <img
              src={lead.adImageURL}
              alt="Ad Image"
              className="w-full h-1- object-cover rounded-lg mb-2"
            />
            <button
              onClick={handleDownloadImage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Download Image
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No Image Available</p>
        )}
      </div>
      <div>
          <label className="text-sm font-medium text-gray-700">Ad Video:</label>
          {lead.adVideoURL ? (
            <div className="mt-2">
              <video
                controls
                className="w-full h-1- object-cover rounded-lg"
                src={lead.adVideoURL}
              />
              <button
                onClick={handleDownloadVideo}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Download Video
              </button>
            </div>
          ) : (
            <p>No Video Available</p>
          )}
        </div>

        {/* Location Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">Location Details</h3>
          <div className="space-y-2">
            <div><strong>Ad Area State:</strong> {lead.adArea[0]?.adState || "N/A"}</div>
            <div><strong>Ad Area City:</strong> {lead.adArea[0]?.adCity || "N/A"}</div>
          </div>
        </div>

        {/* Media Links Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">Media Links</h3>
          <div className="space-y-2 break-all">
            <div>
              <strong>Ad Image URL:</strong> {lead.adImageURL || "N/A"}
              <button onClick={() => copyToClipboard(lead.adImageURL || "")} className="flex bg-red-400 p-2 rounded-full text-white items-center ml-2">
                Copy
                <AiOutlineCopy />
              </button>
            </div>
            <div>
              <strong>Ad Video URL:</strong> {lead.adVideoURL || "N/A"}
              <button onClick={() => copyToClipboard(lead.adVideoURL || "")} className=" bg-red-400 p-2 rounded-full text-white ml-2 flex items-center">
                Copy
                <AiOutlineCopy />
              </button>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">Status and Administration</h3>
          <div className="space-y-2">
            <div><strong>Status:</strong> {lead.status}</div>
            <div><strong>Payment Status:</strong> {lead.paymentStatus}</div>
            <div><strong>Created Date:</strong> {new Date(lead.createdDate).toLocaleDateString()}</div>
            <div><strong>Admin Note:</strong> {lead.adminNote || "N/A"}</div>
          </div>
        </div>
      </div>
      {/* Accept Button */}
      <button
        type="button"
        onClick={handleAccept}
        disabled={accepting} // Disable button when accepting
        className="mt-4 inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700 disabled:opacity-50"
      >
        {accepting ? "Accepting..." : "Accept"} {/* Show loading text when accepting */}
      </button>
      <br />
      <LeadStatusViewDetails leadId={leadId} />
    </div>
  );

};

export default LeadDetailsReporter;