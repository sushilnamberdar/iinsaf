import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link, useNavigate } from "react-router-dom";

const GetUserDarbar = () => {
  const [userDarbars, setUserDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDarbars = async () => {
      try {
        const token = localStorage.getItem("darbarToken");
        const response = await axios.get(`${baseUrl}getUserDarbars`, {
          headers: {
            Authorization: token,
          },
        });
        setUserDarbars(response.data.userDarbars);
      } catch (err) {
        console.error("Error fetching user Darbars:", err);
        setError("Failed to fetch Darbars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDarbars();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading Darbars...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Your Created Darbars
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userDarbars.map((darbar) => (
          <div key={darbar._id} className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">{darbar.purpose}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">State:</span> {darbar.darbarState}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">City:</span> {darbar.darbarCity}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Area:</span> {darbar.area}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Village:</span> {darbar.village}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Date:</span> {darbar.darbarDate}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Time Limit:</span>{" "}
              {darbar.darbarTimeLimit} hours
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Type:</span> {darbar.darbarType}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {darbar.darbarStatus}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">People Available:</span>{" "}
              {darbar.peopleAvailable}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">People Required:</span>{" "}
              {darbar.peopleRequired}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Reason:</span>{" "}
              {darbar.darbarReason}
            </p>
            <Link
              to={`/getUserDarbarById?Id=${darbar._id}`}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUserDarbar;
