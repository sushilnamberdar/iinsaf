import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const AdminGetAllDarbar = () => {
  const [darbars, setDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        // Retrieve the adminToken from localStorage
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(`${baseUrl}getAllDarbars`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        });
        setDarbars(response.data.darbars);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Darbars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {darbars.map((darbar) => (
          <div key={darbar._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{darbar.darbarBy.name}</h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(darbar.darbarDate).toLocaleDateString()}
            </p>
            <p>
              <strong>City:</strong> {darbar.darbarCity}
            </p>
            <p>
              <strong>State:</strong> {darbar.darbarState}
            </p>
            <p>
              <strong>Purpose:</strong> {darbar.purpose}
            </p>
            <p>
              <strong>People Available:</strong> {darbar.peopleAvailable}
            </p>
            <p>
              <strong>People Required:</strong> {darbar.peopleRequired}
            </p>
            <p>
              <strong>Status:</strong> {darbar.darbarStatus}
            </p>
            <Link
              to={`/getDarbarById?Id=${darbar._id}`}
              className="mt-4 inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700 disabled:opacity-50"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGetAllDarbar;
