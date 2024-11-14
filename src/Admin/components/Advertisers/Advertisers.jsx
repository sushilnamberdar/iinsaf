import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/const';
import UserCard from '../../UserCard';

const Advertisers = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewDetailsId, setViewDetailsId] = useState(null);

  const toggleViewDetails = (id) => {
    // Toggle the visibility of details for a specific advertiser
    if (viewDetailsId === id) {
      setViewDetailsId(null); // If already visible, hide details
    } else {
      setViewDetailsId(id); // Show details for the clicked advertiser
    }
  };

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          },
          params: { role: 'Advertiser' },
        });
        setAdvertisers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching advertisers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Advertisers</h1>
      {advertisers.length === 0 ? (
        <div className="text-center">No advertisers found.</div>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //   {advertisers.map((advertiser) => (
        //     <div key={advertiser._id} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow duration-300 space-y-2">
        //       <div className="font-bold flex justify-center text-lg">{advertiser.name}</div>
        //       <div className="grid border-2 p-1 grid-cols-2 gap-1 text-sm">
                
        //         <p className='p-2 border-2 hover:bg-gray-100 rounded-full'><strong>Mobile:</strong> {advertiser.mobile}</p>
        //         <p className='p-2 border-2 hover:bg-gray-100 rounded-full'><strong>Email:</strong> {advertiser.email}</p>
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
        //         <div className='flex items-center justify-center w-full'>
        //         <button className="col-span-2 mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200" onClick={() => toggleViewDetails(advertiser._id)}>
        //           {viewDetailsId === advertiser._id ? 'Hide Details' : 'View Details'}
        //         </button>
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <UserCard advertisers={advertisers}/>
      )}
      
    </div>
  );
};

export default Advertisers;
