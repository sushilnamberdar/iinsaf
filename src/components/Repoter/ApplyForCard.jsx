import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const ApplyForCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    bloodGroup: "",
    designation: "",
    aadharCardNumber: "",
    address: "",
    mobile: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}createIdCard`, formData, {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      }); // Adjust the URL as needed
      toast.success(response.data.message); // Success notification
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setMessage(null);
      setError(err.response ? err.response.data.message : "An error occurred");
      toast.error(err.response ? err.response.data.message : "An error occurred"); // Error notification
    }
  };

  return (
    <div className="p-4">
      <ToastContainer /> {/* Render Toastify container */}
      <h1 className="text-2xl font-bold mb-4">Apply for ID Card</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="aadharCardNumber"
          placeholder="Aadhar Card Number"
          value={formData.aadharCardNumber}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border"
        ></textarea>
        <input
          type="number"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ApplyForCard;
