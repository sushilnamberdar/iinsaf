import React from 'react';
import img1 from '../../assets/services/about -us-2.png';
import img2 from '../../assets/services/about us banner.jpg';

const AboutUs = () => {
  return (
    <div className="flex justify-center bg-gray-50 mt-10 px-4 sm:px-6 lg:px-0">
      {/* Content Wrapper */}
      <div className="w-full lg:w-[70%] p-5 sm:p-10 lg:p-20 flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
        
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-blue-600 font-semibold text-xl">About Us</h3>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug">
              Meet our company unless miss the opportunity
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velit temporibus
              repudiandae ipsa, eaque perspiciatis cumque incidunt tenetur sequi reiciendis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-4.02-.49-7.17-3.83-7.64-7.93h2.1c.45 3.31 3.31 5.87 6.73 5.87 3.41 0 6.27-2.56 6.73-5.87h2.1c-.47 4.1-3.62 7.44-7.64 7.93V13h2l-3-3-3 3h2v6.93z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Business Consulting</h4>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-4.02-.49-7.17-3.83-7.64-7.93h2.1c.45 3.31 3.31 5.87 6.73 5.87 3.41 0 6.27-2.56 6.73-5.87h2.1c-.47 4.1-3.62 7.44-7.64 7.93V13h2l-3-3-3 3h2v6.93z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Years Of Expertise</h4>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
              Discover Now
            </button>

            {/* Subscribe Now Section */}
            <div className="bg-blue-500 text-white rounded-lg p-8 mt-6">
              <div className="text-center md:text-left mb-6">
                <span className="text-sm uppercase tracking-wide">For IT Company</span>
                <h2 className="font-bold text-xl mt-2">
                  Join Our IT Solution Community
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 grid grid-rows-2 lg:mt-10 gap-6">
          <div className="bg-blue-200 rounded-lg h-64 w-full flex items-center justify-center">
            <img src={img1} className="h-full object-contain" alt="About Us 1" />
          </div>
          <div className="bg-blue-300 rounded-lg h-64 w-full flex items-center justify-center">
            <img src={img2} className="h-full object-contain" alt="About Us 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
