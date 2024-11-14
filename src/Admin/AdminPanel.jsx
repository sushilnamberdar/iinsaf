import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./NavbarNew";

import Dashboard from "./components/Dashboard/Dashboard";
import PriceSet from "./components/AdminPriceSet/PriceSet";
import UpdateLeadAdmin from "./components/AdminLead/UpdateLeadAdmin";
import LeadDetails from "../components/Lead/LeadDetails";
import GetAllConference from "./components/AdminConference/GetAllConference";
import Advertisers from "./components/Advertisers/Advertisers";
import Influencers from "./components/Influencers/Influencers";
import Adminconferences from "./conferences/Adminconferences";
import Leads from "./components/Leads/Leads";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import WithdrawalRequests from "./components/WithdrawalRequests/WithdrawalRequests";
import CardRequests from "./components/AdminCards/CardRequests";
import ApprovedCards from "./components/AdminCards/ApprovedCards";
import RejectedCards from "./components/AdminCards/RejectedCards";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Login from "./components/AdminRegisterLogin/AdminLogin";
import Register from "./components/AdminRegisterLogin/AdminRegister";
import GetAllLeads from "./components/AdminLead/GetAllLeads";
import UpdateConferenceAdmin from "./components/AdminConference/UpdateConferenceAdmin";
import Reporter from "./Reporter";
import AllUsers from "./components/Users/AllUsers";
import UpdateCard from "./components/AdminCards/UpdateCard";
import GetLeadStatus from "./components/AdminLead/AdminLeadStatus/GetLeadStatus";
import CreateAdmin from "./components/AdminRegisterLogin/CreateAdmin";
import GetConferenceStatus from "./components/AdminConference/AdminConferenceStatus/GetConferenceStatus";
import CouponManagement from "./components/AdminCoupon/CouponManagement";
import AllAdmins from "./components/AdminRegisterLogin/AllAdmins";
import AdminGetAllDarbar from "../Darbar/components/AdminDarbar/AdminGetALLDarbar";


const AdminPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigation = (path) => {
        navigate(`/admin/${path}`); // Navigate to admin-specific path
        toggleSidebar(); // Close sidebar after navigation (for mobile)
    };

    // Determine if the sidebar and navbar should be hidden
    const isAuthRoute = location.pathname === "/admin/login" || location.pathname === "/admin/register";

    return (
        <div className={`h-screen ${isAuthRoute ? 'bg-gray-50' : 'lg:p-20 bg-gray-50'}`}>
            <div className={`flex ${isAuthRoute ? '' : 'rounded-3xl shadow-2xl h-full'}`}>
                {/* Sidebar */}
                {!isAuthRoute && (
                    <div
                        className={`lg:relative fixed inset-y-0 left-0 z-50 w-72 overflow-scroll bg-white shadow-lg rounded-tl-3xl rounded-bl-3xl lg:border-r-2 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            } lg:translate-x-0`}
                    >
                        <Sidebar onNavigate={handleNavigation} />
                    </div>
                )}

                {/* Overlay for mobile */}
                {isSidebarOpen && !isAuthRoute && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 min-h-full overflow-scroll">
                    {!isAuthRoute && <Navbar toggleSidebar={toggleSidebar} />}

                    {/* Routes */}
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                            <Route path="dashboard" element={<Dashboard handleNavigation={handleNavigation} />} />
                            <Route path="priceset" element={<PriceSet />} />
                            <Route path="getallleads" element={<GetAllLeads />} />
                            <Route path='getLeadStatus' element={<GetLeadStatus />} />
                            <Route path="updateLeads" element={<UpdateLeadAdmin />} />
                            <Route path="advertisers" element={<Advertisers />} />
                            <Route path="influencers" element={<Influencers />} />
                            <Route path="Reporter" element={<Reporter />} />
                            <Route path="AllUser" element={<AllUsers />} />
                            <Route path="allconfrences" element={<GetAllConference />} />
                            <Route path="updateConference" element={<UpdateConferenceAdmin />} />
                            <Route path="getConferenceStatus" element={<GetConferenceStatus />} />
                            <Route path="payment-history" element={<PaymentHistory />} />
                            <Route path="withdrawal-requests" element={<WithdrawalRequests />} />
                            <Route path="card-requests" element={<UpdateCard />} />
                            <Route path="approved-cards" element={<ApprovedCards />} />
                            <Route path="rejected-cards" element={<RejectedCards />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="createAdmin" element={<CreateAdmin />} />
                            <Route path="AllAdmin" element={<AllAdmins />} />
                            <Route path="admincouponmanage" element={<CouponManagement />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="getAllDarbar" element={<AdminGetAllDarbar />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
