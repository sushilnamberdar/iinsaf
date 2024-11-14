import React, { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

import reportingimg from '../../assets/services/reporter icon.png';
import advartisimg from '../../assets/services/advertiser icon.png';
import influencimg from '../../assets/services/influcencer icon.png';
import bgImageLeft from '../../assets/backgroundimages/bg5.jpg';
import bgImageRight from '../../assets/backgroundimages/bg4.jpg';
import bgImageTop from '../../assets/backgroundimages/bg3.jpg';
import bgImageBottom from '../../assets/backgroundimages/bg3.jpg';
import advertiserjpg from '../../assets/services/advertiser1.jpg'
import reporterjpg from '../../assets/services/reporter.jpg'
import inflencerjng from '../../assets/services/influencer3.jpg'

const TopicsComponent = () => {
  const [activeTopic, setActiveTopic] = useState("reporting");

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  const topics = {
    reporting: {
      title: "Reporting",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: reportingimg,
      image: reporterjpg,
    },
    advertising: {
      title: "Advertising",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: advartisimg,
      image: advertiserjpg,
    },
    influencing: {
      title: "Influencing",
      description:
      "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: influencimg,
      image: inflencerjng,
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Absolute Div for Background Images */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImageLeft}), url(${bgImageRight}), url(${bgImageTop}), url(${bgImageBottom})`,
          backgroundPosition: 'left, right center, top center, bottom center',
          backgroundSize: 'contain, contain, contain, contain',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative container  rounded-lg mx-auto px-6 py-12 z-10">
        <p className=" flex items-center justify-center font-bold text-blue-300 mb-1"> OUR SERVICES</p>
        {/* Header */}
        <h2 className="text-center text-3xl font-bold mb-16" data-aos="fade-down">
          What Our Agency <span className="text-blue-500">Provides</span>
        </h2>

        {/* Topic Icons */}
        <div
          className="flex flex-wrap lg:space-x-11 gap-6 mt-10 items-center justify-center mb-8"
          data-aos="zoom-in"
        >
          {Object.keys(topics).map((key) => (
            <div
            key={key}
            className="flex flex-col space-y-3 items-center justify-center text-center"
          >
            <div
              onClick={() => setActiveTopic(key)}
              className={`cursor-pointer flex items-center justify-center h-24 w-24 rounded-full shadow-lg border-2 transition-all ${activeTopic === key
                ? "border-blue-500 bg-blue-100"
                : "border-transparent bg-white"
                }`}
            >
              <img className="h-20 w-20 object-contain" src={topics[key].icon} alt={key} />
            </div>
            <p
              className={`text-lg mt-2 font-semibold ${activeTopic === key ? "text-blue-500" : "text-black"
                }`}
            >
              {topics[key].title}
            </p>
          </div>
          
          ))}
        </div>
        {/* Content Section Wrapper with Background */}
        <div className="border p-20 rounded-lg shadow-lg bg-white" data-aos="fade-up">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left Section - Description */}
    <div className="flex flex-col justify-center lg:pl-10 lg:pr-10">  {/* Added padding-left on lg screens */}
      <h3 className="text-2xl font-bold text-blue-500 mb-4">
        {topics[activeTopic].title}
      </h3>
      <p className="text-gray-700 text-lg mb-6">
        {topics[activeTopic].description}
      </p>
      <button className="bg-blue-500 text-white px-6 py-2 w-44 items-center rounded-md hover:bg-blue-700">
        Get Started
      </button>
    </div>

    {/* Right Section - Image */}
    <div className="flex items-center justify-center">
      <img
        src={topics[activeTopic].image}
        alt={topics[activeTopic].title}
        className="max-w-full max-h-[400px] object-contain rounded-md"
        data-aos="zoom-in"
      />
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default TopicsComponent;
