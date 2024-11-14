import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/const";
import reporterIcon from '../../assets/icons/male-reporter-journalist-icon.svg'
import influencerIcon from '../../assets/icons/influncer.png'
import advertiserIcon from '../../assets/icons/advertisers.png'
import allIcon from '../../assets/icons/user-group-296.svg'
import UserCard from "../../UserCard";
const AllUsers = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('mobile');
  const [viewDetailsId, setViewDetailsId] = useState(null);



  const roleIcons = {
    All: allIcon,
    Advertiser: advertiserIcon,
    Reporter: reporterIcon,
    Influencer: influencerIcon
  };
  const roleStyles = {
    All: "bg-white hover:bg-gray-600",
    Advertiser: "bg-white hover:bg-blue-600",
    Reporter: "bg-white hover:bg-green-600",
    Influencer: "bg-white hover:bg-red-600"
  };
  



  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
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

  const handleFilterChange = (role) => {
    setFilter(role);
  };

  const filteredAdvertisers = advertisers.filter(ad =>
    (filter === 'All' || ad.role === filter) &&
    (searchType === 'mobile' ? (ad.mobile && String(ad.mobile).includes(searchQuery)) : (ad.email && String(ad.email).includes(searchQuery)))
  );

  const toggleViewDetails = (id) => {
    // Toggle the visibility of details for a specific influencer
    if (viewDetailsId === id) {
      setViewDetailsId(null); // If already visible, hide details
    } else {
      setViewDetailsId(id); // Show details for the clicked influencer
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex  justify-between flex-wrap space-y-1 items-center space-x-2 mb-4">
      {['All', 'Advertiser', 'Reporter', 'Influencer'].map(role => (
        <button
          key={role}
          onClick={() => handleFilterChange(role)}
          className={`flex items-center space-x-2 py-2 px-4 rounded-full text-black border-2 font-bold transition-colors duration-300 ${roleStyles[role]}`}
        >
          <img src={roleIcons[role]} alt={`${role} icon`} className="w-6 h-6" />
          <span>{role}</span>
        </button>
      ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <select onChange={e => setSearchType(e.target.value)} className="border p-2 rounded">
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-full flex-grow"
        />
      </div>

      {filteredAdvertisers.length === 0 ? (
        <p>No advertisers found.</p>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        //   {filteredAdvertisers.map((advertiser) => (
        //     <div key={advertiser._id} className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
        //       <h3 className="text-lg font-semibold text-gray-900 mb-4">{advertiser.name}</h3>
        //       <div className="grid grid-cols-1 sm:grid-cols-2 text-sm text-gray-800">
        //         <p className="mb-2"><strong>Mobile:</strong> {advertiser.mobile}</p>
        //         <p className="mb-2"><strong>Email:</strong> {advertiser.email}</p>
        //         <p className="mb-2"><strong>Role:</strong> {advertiser.role}</p>
        //         <p className="mb-2"><strong>Genre:</strong> {advertiser.channelGenre}</p>
        //         {viewDetailsId === advertiser._id && (
        //         <>
        //           <p><strong>Wallet:</strong> {advertiser.wallet}</p>
        //           <p><strong>State:</strong> {advertiser.state}</p>
        //           <p><strong>City:</strong> {advertiser.city}</p>
        //           <p><strong>Area Details:</strong> {advertiser.areaDetails}</p>
        //           <p><strong>Pincode:</strong> {advertiser.pincode}</p>
        //           <p><strong>Secondary Phone:</strong> {advertiser.secondaryPhone}</p>
        //           <p><strong>Gender:</strong> {advertiser.gender}</p>
        //           <p><strong>WhatsApp:</strong> {advertiser.whatsapp}</p>
        //           <p><strong>Website:</strong> {advertiser.website}</p>
        //           <p><strong>Admin Verified:</strong> {advertiser.adminVerified ? "Yes" : "No"}</p>
        //           <p><strong>Channel Name:</strong> {advertiser.channelName}</p>
        //           <p><strong>YouTube Channel URL:</strong> <a href={advertiser.youtubeChannelUrl}>Visit YouTube</a></p>
        //           <p><strong>Facebook Page URL:</strong> <a href={advertiser.facebookPageUrl}>Visit Facebook</a></p>
        //           <p><strong>Instagram Page URL:</strong> <a href={advertiser.instagramPageUrl}>Visit Instagram</a></p>
        //           <p><strong>Verified:</strong> {advertiser.isVerified ? "Yes" : "No"}</p>
        //           <p><strong>Account Created:</strong> {new Date(advertiser.date).toLocaleDateString()}</p>
        //         </>
        //       )}
        //       <button className="col-span-2 mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200" onClick={() => toggleViewDetails(advertiser._id)}>
        //         {viewDetailsId === advertiser._id ? 'Hide Details' : 'View Details'}
        //       </button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <UserCard advertisers={filteredAdvertisers}/>
      )}
    </div>
  );
};

export default AllUsers;

