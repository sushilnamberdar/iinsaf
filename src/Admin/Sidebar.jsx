import React, { useEffect } from "react";
import dashboardicon from './assets/icons/dashboard.png';
import influencericon from './assets/icons/influncer.png';
import advertisersicon from './assets/icons/advertisers.png';
import leadicon from './assets/icons/leads.png';
import paymenthistoryicon from './assets/icons/mhistory.png';
import withdrawalicon from './assets/icons/money-withdrawal.png';
import cardrequestsicon from './assets/icons/applied_card.png';
import pandingcardicon from './assets/icons/pending_card.png';
import rejectedcardicon from './assets/icons/rejected_card.png';
import profileicon from './assets/icons/profile.png';
import settingsicon from './assets/icons/setting.png';
import logouticon from './assets/icons/switch.png';
import confranceicon from './assets/icons/conferences.png'
import usergroupicon from './assets/icons/user-group-296.svg'
import reporteicon from './assets/icons/male-reporter-journalist-icon.svg'
import createadminicon from './assets/icons/creatadmin.png'
import couponmanagementicon from "./assets/icons/8633496.png"
import alladminicon from './assets/icons/all admin icon.png'
import { useNavigate } from "react-router-dom";



const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const handellogout = ()=> {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin')
  }
  const linkClasses = "flex items-center space-x-4 px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li onClick={() => onNavigate("dashboard")} className={linkClasses}>
          <img src={dashboardicon} alt="Dashboard" className="w-6 h-6" />
          <span>Dashboard</span>
        </li>
        <li onClick={() => onNavigate("advertisers")} className={linkClasses}>
          <img src={advertisersicon} alt="Advertisers" className="w-6 h-6" />
          <span>Advertisers</span>
        </li>
        <li onClick={() => onNavigate("influencers")} className={linkClasses}>
          <img src={influencericon} alt="Influencers" className="w-6 h-6" />
          <span>Influencers</span>
        </li>
        <li onClick={() => onNavigate("Reporter")} className={linkClasses}>
          <img src={reporteicon} alt="Influencers" className="w-6 h-6" />
          <span>Reporter</span>
        </li>
        <li onClick={() => onNavigate("priceset")} className={linkClasses}>
          <img src={pandingcardicon} alt="Price Set" className="w-6 h-6" />
          <span>Price Set</span>
        </li>
        <li onClick={() => onNavigate("AllUser")} className={linkClasses}>
          <img src={usergroupicon} alt="Leads" className="w-6 h-6" />
          <span>All User</span>
        </li>
        <li onClick={() => onNavigate("getallleads")} className={linkClasses}>
          <img src={leadicon} alt="Leads" className="w-6 h-6" />
          <span>Leads</span>
        </li>
        <li onClick={() => onNavigate("allconfrences")} className={linkClasses}>
          <img src={confranceicon} alt="Leads" className="w-6 h-6" />
          <span> All Confrences</span>
        </li>
        {/* <li onClick={() => onNavigate("updateconfrences")} className={linkClasses}>
          <img src={confranceicon} alt="Leads" className="w-6 h-6" />
          <span> Update Confrences</span>
        </li> */}
        <li onClick={() => onNavigate("payment-history")} className={linkClasses}>
          <img src={paymenthistoryicon} alt="Payment History" className="w-6 h-6" />
          <span>Payment History</span>
        </li>
        <li onClick={() => onNavigate("withdrawal-history")} className={linkClasses}>
          <img src={paymenthistoryicon} alt="Payment History" className="w-6 h-6" />
          <span>Withdrawal History</span>
        </li>
        <li onClick={() => onNavigate("withdrawal-requests")} className={linkClasses}>
          <img src={withdrawalicon} alt="Withdrawal Requests" className="w-6 h-6" />
          <span>Withdrawal Requests</span>
        </li>
        <li onClick={() => onNavigate("card-requests")} className={linkClasses}>
          <img src={cardrequestsicon} alt="Card Requests" className="w-6 h-6" />
          <span>Card Requests</span>
        </li>
        <li onClick={() => onNavigate("approved-cards")} className={linkClasses}>
          <img src={pandingcardicon} alt="Approved Cards" className="w-6 h-6" />
          <span>Approved Cards</span>
        </li>
        <li onClick={() => onNavigate("rejected-cards")} className={linkClasses}>
          <img src={rejectedcardicon} alt="Rejected Cards" className="w-6 h-6" />
          <span>Rejected Cards</span>
        </li>
        <li onClick={() => onNavigate("createAdmin")} className={linkClasses}>
          <img src={createadminicon} alt="createAdmin" className="w-6 h-6" />
          <span>Create Admin</span>
        </li>
        <li onClick={() => onNavigate("AllAdmin")} className={linkClasses}>
          <img src={alladminicon} alt="createAdmin" className="w-6 h-6" />
          <span>All Admin</span>
        </li>
        <li onClick={() => onNavigate("getAllDarbar")} className={linkClasses}>
          <img src={alladminicon} alt="getAllDarbar" className="w-6 h-6" />
          <span>Darbar</span>
        </li>
        
        <li onClick={() => onNavigate("admincouponmanage")} className={linkClasses}>
          <img src={couponmanagementicon} alt="Coupon" className="w-6 h-6" />
          <span>Coupon Management</span>
        </li>
        <li onClick={() => onNavigate("profile")} className={linkClasses}>
          <img src={profileicon} alt="Profile" className="w-6 h-6" />
          <span>Profile</span>
        </li>
        <li onClick={() => onNavigate("settings")} className={linkClasses}>
          <img src={settingsicon} alt="Settings" className="w-6 h-6" />
          <span>Settings</span>
        </li>
        <li onClick={() => onNavigate("login")} className={linkClasses}>
          <img src={logouticon} alt="Logout" className="w-6 h-6" />
          <span onClick={handellogout}>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
