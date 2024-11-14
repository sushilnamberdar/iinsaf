import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchConferenceById,
  updateConference,
} from "../../redux/conferenceSlicer";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css";
import ConferenceStatusAd from "./ConferenceStatusAd";

const ConferenceDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId");

  const { conference, loading, error } = useSelector(
    (state) => state.conference
  );

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    conferenceArea: "",
    conferenceBy: "",
    conferenceChannelCity: "",
    conferenceChannelState: "",
    conferenceCost: "",
    conferenceEmailAddress: "",
    conferenceName: "",
    conferencePinCode: "",
    conferencePurpose: "",
    numberOfReporters: "",
    paymentStatus: "",
    status: "",
    whatsappNumber: "",
  });

  const [updating, setUpdating] = useState(false); // State for update loading

  useEffect(() => {
    if (conferenceId) {
      dispatch(fetchConferenceById(conferenceId));
    }
  }, [dispatch, conferenceId]);

  useEffect(() => {
    if (conference) {
      // Populate the form with the conference data
      setFormData({
        conferenceArea: conference.conferenceArea,
        conferenceBy: conference.conferenceBy,
        conferenceChannelCity: conference.conferenceChannelCity,
        conferenceChannelState: conference.conferenceChannelState,
        conferenceCost: conference.conferenceCost,
        conferenceEmailAddress: conference.conferenceEmailAddress,
        conferenceName: conference.conferenceName,
        conferencePinCode: conference.conferencePinCode,
        conferencePurpose: conference.conferencePurpose,
        numberOfReporters: conference.numberOfReporters,
        paymentStatus: conference.paymentStatus,
        status: conference.status,
        whatsappNumber: conference.whatsappNumber,
      });
    }
  }, [conference]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setUpdating(true); // Set updating state to true
    try {
      // Dispatch the update action with the form data
      await dispatch(
        updateConference({ conferenceId, conferenceData: formData })
      );
      toast.success("Conference updated successfully!"); // Show success toast
    } catch (err) {
      console.error(err);
      toast.error("Failed to update conference."); // Show error toast
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <ToastContainer /> {/* Toast container */}
      <h1 className="text-2xl font-bold mb-4">Conference Details</h1>
      {conference && (
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            {conference.conferenceName}
          </h2>

          {/* Form for conference details */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="conferenceArea"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Conference Area
                </label>
                <input
                  type="text"
                  id="conferenceArea"
                  name="conferenceArea"
                  value={formData.conferenceArea}
                  onChange={handleChange}
                  placeholder="Enter conference area"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceBy"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Conference By
                </label>
                <input
                  type="text"
                  id="conferenceBy"
                  name="conferenceBy"
                  value={formData.conferenceBy}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter conference by"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceChannelCity"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Channel City
                </label>
                <input
                  type="text"
                  id="conferenceChannelCity"
                  name="conferenceChannelCity"
                  value={formData.conferenceChannelCity}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter channel city"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceChannelState"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Channel State
                </label>
                <input
                  type="text"
                  id="conferenceChannelState"
                  name="conferenceChannelState"
                  value={formData.conferenceChannelState}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter channel state"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceCost"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Cost
                </label>
                <input
                  type="number"
                  id="conferenceCost"
                  name="conferenceCost"
                  value={formData.conferenceCost}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter cost"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceEmailAddress"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="conferenceEmailAddress"
                  name="conferenceEmailAddress"
                  value={formData.conferenceEmailAddress}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferenceName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Conference Name
                </label>
                <input
                  type="text"
                  id="conferenceName"
                  name="conferenceName"
                  value={formData.conferenceName}
                  onChange={handleChange}
                  placeholder="Enter conference name"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferencePinCode"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  id="conferencePinCode"
                  name="conferencePinCode"
                  value={formData.conferencePinCode}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter pin code"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="conferencePurpose"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Purpose
                </label>
                <input
                  type="text"
                  id="conferencePurpose"
                  name="conferencePurpose"
                  value={formData.conferencePurpose}
                  onChange={handleChange}
                  placeholder="Enter conference purpose"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="numberOfReporters"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Number of Reporters
                </label>
                <input
                  type="number"
                  id="numberOfReporters"
                  name="numberOfReporters"
                  value={formData.numberOfReporters}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter number of reporters"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="paymentStatus"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Payment Status
                </label>
                <input
                  type="text"
                  id="paymentStatus"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter payment status"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter status"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="whatsappNumber"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  disabled
                  onChange={handleChange}
                  placeholder="Enter WhatsApp number"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Conference"}
            </button>
          </form>
          <ConferenceStatusAd conferenceId={conferenceId} />
        </div>
      )}
    </div>
  );
};

export default ConferenceDetails;
