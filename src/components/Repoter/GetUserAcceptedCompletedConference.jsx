import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/const';

const GetUserAcceptedCompletedConference = () => {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserAcceptedConferences = async () => {
            try {
                const response = await axios.get(`${baseUrl}getUserAcceptedCompletedConference`, {
                    headers: {
                        Authorization: localStorage.getItem("userToken")
                    },
                });
                console.log(response);
                setConferences(response.data); 
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserAcceptedConferences();
    }, []);

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Accepted Conferences</h1>
            {conferences.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No accepted conferences found for this user.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {conferences.map((conference) => (
                        <div
                            key={conference._id}
                            className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                Conference ID: <span className="text-gray-600">{conference._id}</span>
                            </h2>
                            <div className="text-gray-700 space-y-1">
                                <p><span className="font-medium">Accepted By User:</span> {conference.acceptedByUser || 'N/A'}</p>
                                <p><span className="font-medium">Accepted Date:</span> {formatDate(conference.acceptedDate)}</p>
                                <p><span className="font-medium">Status:</span> {conference.status || 'N/A'}</p>
                                <p><span className="font-medium">Admin Status:</span> {conference.statusByAdmin || 'N/A'}</p>
                                <p><span className="font-medium">Video Date:</span> {formatDate(conference.videoDate)}</p>
                                <p><span className="font-medium">Note:</span> {conference.note || 'No additional notes'}</p>
                            </div>
                            <a 
                                href={conference.videoUrl || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block mt-4 text-blue-500 hover:text-blue-600 underline text-sm font-medium"
                            >
                                Watch Video
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetUserAcceptedCompletedConference;
