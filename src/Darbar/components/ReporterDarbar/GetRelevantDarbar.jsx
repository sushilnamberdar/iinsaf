import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const GetRelevantDarbar = () => {
  const [darbars, setDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        const response = await axios.get(`${baseUrl}getRelevantDarbar`, {
          headers: {
            Authorization: localStorage.getItem("darbarToken"),
          },
        });
        setDarbars(response.data.darbars);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Relevant Darsbars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {darbars.map((darbar) => (
          <div key={darbar._id} className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{darbar.purpose}</h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(darbar.darbarDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {darbar.village}, {darbar.darbarCity},{" "}
              {darbar.darbarState}
            </p>
            <p>
              <strong>Available:</strong> {darbar.peopleAvailable} /{" "}
              {darbar.peopleRequired}
            </p>
            <p>
              <strong>Status:</strong> {darbar.darbarStatus}
            </p>
            <p>
              <strong>Type:</strong> {darbar.darbarType}
            </p>
            <Link
              to={`/getDarbarByReporter?Id=${darbar._id}`}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetRelevantDarbar;
