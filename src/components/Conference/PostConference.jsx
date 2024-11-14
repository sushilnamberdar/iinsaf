import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConference } from "../../redux/conferenceSlicer";
import indianstateandcity from "../LoginRegisterUser/IndianStatesCities.json";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Import

const PostConference = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.conference);
  const [formData, setFormData] = useState({
    conferenceName: "",
    whatsappNumber: "",
    conferenceEmailAddress: "",
    numberOfReporters: 1,
    conferenceChannelState: "",
    conferenceChannelCity: "",
    conferenceArea: "",
    conferencePinCode: "",
    conferencePurpose: "",
  });

  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      conferenceChannelState: selectedState,
      conferenceChannelCity: "", // Reset city when state changes
    }));

    const stateCities = indianstateandcity[selectedState] || [];
    setCities(stateCities);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      conferenceChannelCity: selectedCity,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createConference(formData)); // Assuming createConference returns a promise
      toast.success("Conference created successfully!"); // Show success toast
    } catch (err) {
      toast.error("Error creating conference: " + err.message); // Show error toast
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Create Conference
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="conferenceName"
            placeholder="Conference Name"
            value={formData.conferenceName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="whatsappNumber"
            placeholder="WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <input
          type="email"
          name="conferenceEmailAddress"
          placeholder="Email Address"
          value={formData.conferenceEmailAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="numberOfReporters"
            placeholder="Number of Reporters"
            value={formData.numberOfReporters}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            min="1"
            required
          />
          <select
            name="conferenceChannelState"
            value={formData.conferenceChannelState}
            onChange={handleStateChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <select
          name="conferenceChannelCity"
          value={formData.conferenceChannelCity}
          onChange={handleCityChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          disabled={!formData.conferenceChannelState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((cityObj) => (
            <option key={cityObj.id} value={cityObj.city}>
              {cityObj.city}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="conferenceArea"
            placeholder="Area"
            value={formData.conferenceArea}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="conferencePinCode"
            placeholder="Pin Code"
            value={formData.conferencePinCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <textarea
          name="conferencePurpose"
          placeholder="Purpose"
          value={formData.conferencePurpose}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-lg font-bold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Conference"}
        </button>
      </form>
    </div>
  );
};

export default PostConference;
