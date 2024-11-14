import React, { useState } from "react";
import HomeImageSlider from "./Banner";
import Card from "./Card";
import InfluencingMarketingSection from "./ServicesSection";
import TopicsComponent from "./TopicComponent";
import ReporterComponent from "./ReporterComponent";
import OwerClientSlider from "./OwerClientSlider";
import AboutUs from "./Aboutus";
import ContactUs from "./ContactUs";
import ServicesSection from "./ServicesSection";

const Home = () => {
  const [formData, setFormData] = useState({
    channelType: "",
    adType: "bannerAd",
    requiredViews: 100,
    adState: "",
    adCity: "",
    createdBy: "self",
    adDescription: "",
    adNote: "",
    adLength: 8,
    image: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = type === "file" ? files[0] : value;

    // Log the form data as it updates
    console.log(`Field changed: ${name}, New value:`, updatedValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd]">
        <HomeImageSlider />
        <div className="flex items-center justify-center">
          <div className=" marqueenew w-full text-3xl">
            <span>
              International Influencing News Social Media Advertisement
              Federation
            </span>
          </div>
        </div>
        <Card />
        <TopicsComponent />
        <ServicesSection/>
        <OwerClientSlider />
        <AboutUs />
        <ContactUs />
      </div>
    </>
  );
};

export default Home;
