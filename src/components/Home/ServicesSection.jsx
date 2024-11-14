// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css"; // Import AOS styles

// // Import service icons (Replace these paths with your actual image paths)
// import campaignsIcon from '../../assets/services/Social Media Campaigns.webp';
// import collaborationsIcon from '../../assets/services/Brand Collaborations.webp';
// import contentIcon from '../../assets/services/Content Creation.webp';
// import engagementIcon from '../../assets/services/Audience Engagement.webp';
// import analyticsIcon from '../../assets/services/Performance Analytics.webp';
// import marketingimage from '../../assets/services/marketing website .webp'

// const InfluencingMarketingSection = () => {
//   const services = [
//     { name: "Social Media Campaigns", icon: campaignsIcon },
//     { name: "Brand Collaborations", icon: collaborationsIcon },
//     { name: "Content Creation", icon: contentIcon },
//     { name: "Audience Engagement", icon: engagementIcon },
//     { name: "Performance Analytics", icon: analyticsIcon },
//   ];

//   // Initialize AOS
//   useEffect(() => {
//     AOS.init({ duration: 1200 });
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       {/* Heading */}
//       <h2
//         className="text-center text-3xl md:text-4xl font-bold mb-10"
//         data-aos="fade-up"
//       >
//         Empower Your Brand with <span className="text-blue-500">Influencers</span>
//       </h2>

//       {/* Services Icons Section */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center space-y-2 p-4 bg-white shadow-md rounded-lg"
//             data-aos="zoom-in"
//             data-aos-delay={index * 100} // Delay for staggered effect
//           >
//             {/* Service Icon */}
//             <div className="w-16 h-16 flex items-center justify-center">
//               <img
//                 src={service.icon}
//                 alt={`${service.name} Icon`}
//                 className="w-full h-full object-contain rounded-full"
//               />
//             </div>
//             <p className="text-lg font-medium">{service.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Content Block */}
//       <div
//         className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row gap-8 items-center"
//         data-aos="fade-up"
//       >
//         {/* Left Text Section */}
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-blue-500 mb-4">
//             Maximize Influence with Our Expertise
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Reach your target audience and boost engagement through the power of
//             influencers. Our tailored strategies ensure your brand makes a lasting impact.
//           </p>
//           <ul className="list-disc list-inside text-gray-700 space-y-2">
//             <li>✔️ Influencer Network Matching</li>
//             <li>✔️ Data-Driven Campaigns</li>
//             <li>✔️ Real-Time Performance Reports</li>
//           </ul>
//         </div>

//         {/* Right Image Section */}
//         <div className="flex-1">
//           <div className="w-full overflow-hidden h-48 rounded-lg"><img  src={marketingimage}/></div> {/* Placeholder for an image */}
//         </div>
//       </div>

//       {/* "Why Choose Us" Link */}
//       <div className="text-center mt-12" data-aos="fade-in">
//         <a
//           href="/why-us"
//           className="text-xl text-blue-500 font-semibold hover:underline"
//         >
//           Why Choose Us?
//         </a>
//       </div>
//     </div>
//   );
// };

// export default InfluencingMarketingSection;

import React, { useState } from 'react';
import bgimg from '../../assets/backgroundimages/backgroundimageserivicesection.webp';
import { Navigate, useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Main Menu Button - Positioned on the center-left */}
         <div className="h-96 w-96 rotated-half-circle">
      {/* Optional content can go here */}
    </div>

      {/* Sub-Buttons in a Circular Pattern to the Right */}
      <div
        className={`absolute left-10 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <button
          onClick={() => handleNavigation('/rise-your-voice')}
          className="menu-item w-40 h-10 bg-red-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(20px, -300px) rotate(-30deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Rise Your Voice
        </button>

        <button
          onClick={() => handleNavigation('/marketer')}
          className="menu-item w-40 h-10 bg-green-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(100px, -170px) rotate(-20deg)`
              : `translate(0, 0) rotate(-5deg)`, // Rotate along with translate
          }}
        >
          Marketer
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-yellow-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(110px, -10px) `
              : `translate(0, 0)`, // Rotate along with translate
          }}
        >
          Advertiser
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-purple-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(90px, 150px) rotate(20deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Reporter
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-teal-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(0px, 270px) rotate(30deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Influencer
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
