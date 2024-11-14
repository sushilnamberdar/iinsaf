import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/const';

const GetRelevantConference = () => {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.get(`${baseUrl}getRelevantConference`, {
                    headers: {
                        Authorization: token
                    }
                });
                setConferences(response.data.relevantConferences);
                setLoading(false);
            } catch (err) {
                setError('Error fetching conferences');
                setLoading(false);
            }
        };

        fetchConferences();
    }, []);

    const handleEdit = (leadId) => {
        // Add logic to handle edit action
        console.log("Edit lead:", leadId);
    };

    if (loading) return <p>Loading conferences...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">Relevant Conferences</h1>
            <ul className="space-y-6">
                {conferences.map((conference) => (
                    <li key={conference._id} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{conference.conferenceName}</h3>
                        <p className="text-gray-700 mb-2">{conference.conferencePurpose}</p>
                        <p className="text-gray-600 mb-1">City: <span className="font-medium">{conference.conferenceChannelCity}</span></p>
                        <p className="text-gray-600 mb-1">State: <span className="font-medium">{conference.conferenceChannelState}</span></p>
                        <p className="text-gray-600 mb-1">Cost: <span className="font-medium">₹{conference.conferenceCost}</span></p>
                        <Link
                            to={`/getSpecificConferenceDetailsReporter?conferenceId=${conference._id}`}
                            className="inline-block mt-4 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition"
                            onClick={() => handleEdit(conference._id)}
                        >
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetRelevantConference;