import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/const";

const CreateDarbar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    darbarDate: "",
    darbarState: "",
    darbarCity: "",
    area: "",
    village: "",
    purpose: "",
    darbarReason: "",
    pincode: "",
    peopleAvailable: "",
    peopleRequired: "",
    darbarType: "",
    darbarTimeLimit: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const token = localStorage.getItem("darbarToken");
      const response = await axios.post(`${baseUrl}createDarbar`, formData, {
        headers: {
          Authorization: token,
        },
      });
      setSuccessMessage(response.data.message);
    //   navigate("/success");
    } catch (error) {
      console.error("Error creating Darbar:", error);
      setErrorMessage("Error creating Darbar. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Darbar
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col">
          <label htmlFor="darbarDate" className="text-gray-600">
            Darbar Date
          </label>
          <input
            type="date"
            id="darbarDate"
            name="darbarDate"
            value={formData.darbarDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="darbarState" className="text-gray-600">
            Darbar State
          </label>
          <input
            type="text"
            id="darbarState"
            name="darbarState"
            value={formData.darbarState}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="darbarCity" className="text-gray-600">
            Darbar City
          </label>
          <input
            type="text"
            id="darbarCity"
            name="darbarCity"
            value={formData.darbarCity}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="area" className="text-gray-600">
            Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="village" className="text-gray-600">
            Village
          </label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="purpose" className="text-gray-600">
            Purpose
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="darbarReason" className="text-gray-600">
            Darbar Reason
          </label>
          <input
            type="text"
            id="darbarReason"
            name="darbarReason"
            value={formData.darbarReason}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pincode" className="text-gray-600">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="peopleAvailable" className="text-gray-600">
            People Available
          </label>
          <input
            type="number"
            id="peopleAvailable"
            name="peopleAvailable"
            value={formData.peopleAvailable}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="peopleRequired" className="text-gray-600">
            People Required
          </label>
          <input
            type="number"
            id="peopleRequired"
            name="peopleRequired"
            value={formData.peopleRequired}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="darbarType" className="text-gray-600">
            Darbar Type
          </label>
          <input
            type="text"
            id="darbarType"
            name="darbarType"
            value={formData.darbarType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="darbarTimeLimit" className="text-gray-600">
            Darbar Time Limit
          </label>
          <input
            type="text"
            id="darbarTimeLimit"
            name="darbarTimeLimit"
            value={formData.darbarTimeLimit}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
        >
          Create Darbar
        </button>
      </form>
    </div>
  );
};

export default CreateDarbar;
