import React from "react";
import GetRelevantLeads from "../Lead/LeadStatus/GetRelevantLeads";
import ApplyForCard from "./ApplyForCard";
import AcceptedLeads from "./RepoterLeadStatus/AccpetedLead";
import CompletedLead from "./RepoterLeadStatus/CompletedLead";
import PendingLead from "./RepoterLeadStatus/PendingLead";
import ReporterDashboard from "../Repoter/User/ReporterDashboard";

const Repoter = () => {
  return (
    <div>
      {/* Repoter
      <GetRelevantLeads />
      Accepted Leads
      <AcceptedLeads />
      Completed Leads
      <CompletedLead />
      Pending Lead
      <PendingLead /> */}
      {/* <ApplyForCard /> */}
      <ReporterDashboard />
    </div>
  );
};

export default Repoter;
