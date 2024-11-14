import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";
import ConferenceStatusView from "./ConferenceStatusView";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const ConferenceDetailsReporter = () => {
  const [conference, setConference] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null); // State for status messages
  const [accepting, setAccepting] = useState(false); // State for accept loading

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId"); // Get conferenceId from query parameters

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getSpecificeConferenceDetails`,
          {
            params: {
              conferenceId: conferenceId,
            },
            headers: {
              authorization: token,
            },
          }
        ); // Adjust the endpoint as needed
        console.log(" ==>", response);
        setConference(response.data.conference);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching conference"
        );
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConference();
  }, [conferenceId]);

  const handleAccept = async () => {
    setAccepting(true); // Set accepting state to true
    try {
      const token = localStorage.getItem("userToken");
      console.log("accept token is this =>", token, conferenceId);

      const response = await axios.post(
        `${baseUrl}createConferenceStatus`,
        {},
        {
          params: { conferenceId: conferenceId }, // Send the conferenceId as query param
          headers: {
            Authorization: token, // Send the token in Authorization header
          },
        }
      );

      toast.success(
        "Conference status created successfully! See it in the ACCEPTED panel to upload its Video!"
      ); // Show success toast
      console.log(response.data); // Log the response for debugging
    } catch (err) {
      console.log(err);
      toast.error(
        err.response
          ? err.response.data.message
          : "Error creating conference status"
      ); // Show error toast
    } finally {
      setAccepting(false); // Reset accepting state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!conference) {
    return <div>No conference found.</div>;
  }

  return (
    <div className="conference-details max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        {conference.conferenceName}
      </h2>
      <p className="mb-2">
        <strong className="text-gray-700">Organizer:</strong>{" "}
        {conference.conferenceBy}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">WhatsApp Number:</strong>{" "}
        {conference.whatsappNumber}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Email Address:</strong>{" "}
        {conference.conferenceEmailAddress}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Number of Reporters:</strong>{" "}
        {conference.numberOfReporters}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Cost:</strong>₹
        {conference.conferenceCost}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Date:</strong>{" "}
        {new Date(conference.conferenceDate).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Channel State:</strong>{" "}
        {conference.conferenceChannelState}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Channel City:</strong>{" "}
        {conference.conferenceChannelCity}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Area:</strong>{" "}
        {conference.conferenceArea}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Pin Code:</strong>{" "}
        {conference.conferencePinCode}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Purpose:</strong>{" "}
        {conference.conferencePurpose}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Status:</strong> {conference.status}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Payment Status:</strong>{" "}
        {conference.paymentStatus}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Created At:</strong>{" "}
        {new Date(conference.createdAt).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <strong className="text-gray-700">Updated At:</strong>{" "}
        {new Date(conference.updatedAt).toLocaleDateString()}
      </p>

      <button
        onClick={handleAccept}
        className={`mt-4 px-6 py-2 ${
          accepting ? "bg-gray-500" : "bg-green-500"
        } text-white font-semibold rounded hover:bg-green-600 transition duration-200`}
        disabled={accepting} // Disable button while accepting
      >
        {accepting ? "Accepting..." : "Accept"}
      </button>

      {statusMessage && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded border border-blue-300">
          {statusMessage}
        </div>
      )}

      {/* <ConferenceStatusView conferenceId={conferenceId} /> */}
    </div>
  );
};

export default ConferenceDetailsReporter;
