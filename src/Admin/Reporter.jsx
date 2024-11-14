import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/const';
import UserCard from './UserCard';

const Reporter = () => {
  const [advertisers, setAdvertisers] = useState([]); // State to hold advertisers
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [viewDetailsId, setViewDetailsId] = useState(null);


  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          },
          params: { role: 'Reporter' }, // Send role as a query parameter
        });
        setAdvertisers(response.data); // Set the state with the fetched advertisers
      } catch (err) {
        setError(err.message); // Set error message in case of failure
        console.error("Error fetching advertisers:", err);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchAdvertisers(); // Call the function to fetch advertisers
  }, []); // Empty dependency array to run once on mount

  const toggleViewDetails = (id) => {
    // Toggle the visibility of details for a specific influencer
    if (viewDetailsId === id) {
      setViewDetailsId(null); // If already visible, hide details
    } else {
      setViewDetailsId(id); // Show details for the clicked influencer
    }
  };


  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error handling

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reporter</h1>
      {advertisers.length === 0 ? (
        <p>No advertisers found.</p>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //   {advertisers.map((advertiser) => (
        //     <div key={advertiser._id} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow duration-300 space-y-2">
        //       <div className="font-bold text-lg">{advertiser.name}</div>
        //       <div className="grid grid-cols-2 gap-1 text-sm">
        //         <p><strong>Mobile:</strong> {advertiser.mobile}</p>
        //         <p><strong>Email:</strong> {advertiser.email}</p>
        //         <p><strong>Role:</strong> {advertiser.role}</p>
        //         <p><strong>Channel Genre:</strong> {advertiser.channelGenre}</p>
        //         {viewDetailsId === advertiser._id && (
        //           <>
        //             <p><strong>Wallet:</strong> {advertiser.wallet}</p>
        //             <p><strong>State:</strong> {advertiser.state}</p>
        //             <p><strong>City:</strong> {advertiser.city}</p>
        //             <p><strong>Area Details:</strong> {advertiser.areaDetails}</p>
        //             <p><strong>Pincode:</strong> {advertiser.pincode}</p>
        //             <p><strong>Secondary Phone:</strong> {advertiser.secondaryPhone}</p>
        //             <p><strong>Gender:</strong> {advertiser.gender}</p>
        //             <p><strong>WhatsApp:</strong> {advertiser.whatsapp}</p>
        //             <p><strong>Website:</strong> {advertiser.website}</p>
        //             <p><strong>Admin Verified:</strong> {advertiser.adminVerified ? "Yes" : "No"}</p>
        //             <p><strong>Channel Name:</strong> {advertiser.channelName}</p>
        //             <p><strong>YouTube Channel URL:</strong> <a href={advertiser.youtubeChannelUrl}>Visit YouTube</a></p>
        //             <p><strong>Facebook Page URL:</strong> <a href={advertiser.facebookPageUrl}>Visit Facebook</a></p>
        //             <p><strong>Instagram Page URL:</strong> <a href={advertiser.instagramPageUrl}>Visit Instagram</a></p>
        //             <p><strong>Verified:</strong> {advertiser.isVerified ? "Yes" : "No"}</p>
        //             <p><strong>Account Created:</strong> {new Date(advertiser.date).toLocaleDateString()}</p>
        //           </>
        //         )}
        //         <button className="col-span-2 mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200" onClick={() => toggleViewDetails(advertiser._id)}>
        //           {viewDetailsId === advertiser._id ? 'Hide Details' : 'View Details'}
        //         </button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      <UserCard advertisers={advertisers} />
      )}
    </div>
  );
};

export default Reporter
