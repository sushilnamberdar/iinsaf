import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelevantLeads } from "../../../redux/leadSlicer";
import { Link } from "react-router-dom";

const GetRelevantLeads = () => {
  const dispatch = useDispatch();
  const { allLeads, loading, error } = useSelector((state) => state.lead);

  useEffect(() => {
    dispatch(fetchRelevantLeads());
  }, [dispatch]);

  const handleEdit = (leadId) => {
    // Add logic to handle edit action
    console.log("Edit lead:", leadId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Relevant Leads</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : allLeads.length === 0 ? (
        <p className="text-center text-gray-600">No relevant leads found.</p>
      ) : (
        <div className="table-container rounded-2xl overflow-x-auto">
          <table className="scrollable-table min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3 border">Lead ID</th>
                <th className="px-4 py-3 border">Ad State</th>
                <th className="px-4 py-3 border">Ad City</th>
                <th className="px-4 py-3 border">Ad Description</th>
                <th className="px-4 py-3 border">Ad Length</th>
                <th className="px-4 py-3 border">Ad Type</th>
                <th className="px-4 py-3 border">Channel Type</th>
                <th className="px-4 py-3 border">Required Views</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Payment Status</th>

                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className=" overflow-x-auto bg-white rounded-2xl">
              {allLeads.map((lead) => (
                <tr key={lead._id}>
                  <td DATA-LABEL='LEAD-ID'className=" border pl-4 pr-7">{lead._id}</td>
                  <td DATA-LABEL='AD STATE'>
                    {lead.adArea[0]?.adState}
                  </td>
                  <td  data-label='AD CITY'>{lead.adArea[0]?.adCity}</td>
                  <td DATA-LABEL='AD DISCRIPTAION'>{lead.adDescription}</td>
                  <td DATA-LABEL='AD LENGTH'>{lead.adLength} seconds</td>
                  <td DATA-LABEL='AD TYPE'>{lead.adType}</td>
                  <td DATA-LABEL='CHANNEL TYPE'>{lead.channelType}</td>
                  <td DATA-LABEL='REQUIRE VIEW'>{lead.requiredViews / 4}</td>
                  <td DATA-LABEL='AD STATUS'>{lead.status}</td>
                  <td DATA-LABEL='PAYMENT STATUS '>{lead.paymentStatus}</td>
                  <td DATA-LABEL='ACTIONS'>
                    <Link to={`getSpecificLeadDetailsReporter?leadId=${lead._id}`} className="bg-green-500 text-white px-4 py-1 rounded">
                      Edit
                    </Link>

                  </td>
                  <td className="mb-10"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetRelevantLeads;
