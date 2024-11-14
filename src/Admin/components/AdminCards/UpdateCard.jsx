import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCard = () => {
  const [cardRequests, setCardRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    bloodGroup: "",
    designation: "",
    aadharCardNumber: "",
    address: "",
    mobile: "",
    status: "",
  });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // New state for loading

  // Fetch pending card requests
  useEffect(() => {
    const fetchCardRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Get token from local storage
        const { data } = await axios.get(`${baseUrl}getCardRequest`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        });
        setCardRequests(data);
      } catch (err) {
        setError("Error fetching card requests");
      }
    };
    fetchCardRequests();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle card selection
  const handleCardSelect = (card) => {
    setSelectedCardId(card._id);
    setFormData({
      name: card.name,
      fatherName: card.fatherName,
      bloodGroup: card.bloodGroup,
      designation: card.designation,
      aadharCardNumber: card.aadharCardNumber,
      address: card.address,
      mobile: card.mobile,
      status: card.status,
    });
  };

  // Update card details API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCardId) {
      setError("Please select a card to update");
      return;
    }

    setIsUpdating(true); // Set loading state to true

    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${baseUrl}updateCard?cardId=${selectedCardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Card details updated successfully!");
      setError(null);
      // Optionally refresh card requests after update
    } catch (err) {
      toast.error("Error updating card details");
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <h2 className="text-2xl font-semibold my-4">Pending Card Requests</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Mobile
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {cardRequests.map((card) => (
              <tr key={card._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{card.name}</td>
                <td className="py-2 px-4 border-b">{card.mobile}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleCardSelect(card)}
                    className="text-blue-600 hover:underline"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Update Card Details
        </h2>

        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold rounded-lg transition ${
            isUpdating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Card"}
        </button>
      </form>
    </div>
  );

};

export default UpdateCard;
