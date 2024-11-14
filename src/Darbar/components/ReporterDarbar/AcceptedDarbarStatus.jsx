import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const AcceptedDarbarStatus = () => {
  const [darbars, setDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [note, setNote] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        const token = localStorage.getItem("darbarToken");
        const response = await axios.get(`${baseUrl}getUserAcceptedDarbars`, {
          headers: {
            Authorization: token,
          },
        });
        setDarbars(response.data.userDarbars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  const handleUpdateClick = (darbar) => {
    setUpdatingId(darbar._id); // Set the darbar ID for updating
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem("darbarToken");
      await axios.put(
        `${baseUrl}updateDarbarStatusReporter`,
        {
          darbarId: updatingId,
          videoUrl,
          note,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Optionally refresh the list or show a success message
      setVideoUrl("");
      setNote("");
      setUpdatingId(null);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Accepted Darbars</h1>
      {darbars.length === 0 ? (
        <p>No accepted Darbars found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {darbars.map((darbar) => (
            <div
              key={darbar._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="font-semibold">
                Darbar ID: {darbar.darbarId._id}
              </h2>
              <p>
                <strong>Darbar By:</strong> {darbar.darbarId.darbarBy}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(darbar.darbarId.darbarDate).toLocaleDateString()}
              </p>
              <p>
                <strong>State:</strong> {darbar.darbarId.darbarState}
              </p>
              <p>
                <strong>City:</strong> {darbar.darbarId.darbarCity}
              </p>
              <p>
                <strong>Area:</strong> {darbar.darbarId.area}
              </p>
              <p>
                <strong>Village:</strong> {darbar.darbarId.village}
              </p>
              <p>
                <strong>Purpose:</strong> {darbar.darbarId.purpose}
              </p>
              <p>
                <strong>Reason:</strong> {darbar.darbarId.darbarReason}
              </p>
              <p>
                <strong>Pincode:</strong> {darbar.darbarId.pincode}
              </p>
              <p>
                <strong>People Available:</strong>{" "}
                {darbar.darbarId.peopleAvailable}
              </p>
              <p>
                <strong>People Required:</strong>{" "}
                {darbar.darbarId.peopleRequired}
              </p>
              <p>
                <strong>Type:</strong> {darbar.darbarId.darbarType}
              </p>
              <p>
                <strong>Status:</strong> {darbar.darbarId.darbarStatus}
              </p>
              <p>
                <strong>Accepted Date:</strong>{" "}
                {new Date(darbar.acceptedDate).toLocaleString()}
              </p>
              <p>
                <strong>Admin Status:</strong> {darbar.statusByAdmin}
              </p>
              <button
                onClick={() => handleUpdateClick(darbar)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}

      {updatingId && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold mb-2">Update Darbar Status</h2>
          {updateError && <p className="text-red-500">{updateError}</p>}
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-2">
              <label className="block mb-1">
                Video URL
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">
                Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                className="border rounded-lg px-3 py-2 w-full"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={updateLoading}
            >
              {updateLoading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AcceptedDarbarStatus;
