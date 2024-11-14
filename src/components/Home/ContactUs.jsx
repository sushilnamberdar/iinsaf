import React from 'react';
import icon1 from '../../assets/icon/phone-icon.png';
import icon2 from '../../assets/icon/email-icon.png';
import icon3 from '../../assets/icon/location-icon.png';
import contactBottomRight from '../../assets/icon/contact-bottom-right.png';
import contactTopRight from '../../assets/icon/contact-top-right.png';
import outerDivTopRight from '../../assets/icon/contact-dec.png';

const ContactUs = () => {
  return (
    // Outer Div with decorations
    <div className="bg-white flex flex-col items-center relative">
      {/* Decorative Top Right Image (Hidden on Mobile) */}
      <div
        className="absolute right-72 w-40 h-40 bg-no-repeat bg-contain hidden lg:block"
        style={{ backgroundImage: `url(${outerDivTopRight})` }}
      ></div>

      <div className="text-blue-500 font-bold mt-8">CONTACT US</div>
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Get In Touch With Us <span className="text-blue-500">Now</span>
      </h2>
      <hr className="border-blue-500 border-t-2 lg:w-[3%] w-[20%] mx-auto" />

      {/* Contact Section Container */}
      <div className="container mx-auto p-8 lg:p-20 mt-10 bg-gray-50 rounded-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d352.6461089471986!2d75.72805224930323!3d29.175412846261246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1729157057175!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
              style={{ border: '0' }}
            ></iframe>
          </div>

          {/* Contact Info & Form Section with Background Images */}
          <div
            className="space-y-6 relative bg-no-repeat bg-cover p-10 rounded-2xl"
            style={{
              backgroundImage: `url(${contactTopRight}), url(${contactBottomRight})`,
              backgroundPosition: 'top right, bottom right',
              backgroundSize: '100% 20%, 100% 20%', // Custom background sizes
            }}
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-5 space-y-3">
                <div className="bg-blue-100 p-4 rounded-full">
                  <img className="h-10" src={icon1} />
                </div>
                <p className="font-medium">+91 999-1992-492</p>
              </div>

              <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-5 space-y-3">
                <div className="bg-pink-100 p-4 rounded-full">
                  <img className="h-10" src={icon2} />
                </div>
                <p className="font-medium">meharetech420@email.com</p>
              </div>

              <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-5 space-y-3">
                <div className="bg-red-100 p-4 rounded-full">
                  <img className="h-10" src={icon3} />
                </div>
                <p className="flex items-center justify-center font-medium">
                  IINSAF OFFICE
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form className=" md:grid lg:grid grid-cols-1 items-center sm:grid-cols-2 gap-8">
              {/* Left Side: Name, Email, and Subject */}
              <div className="space-y-8 mb-8 md:mb-0 lg:mb-0 ">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Right Side: Message */}
              <div className=" space-y-4">
                <textarea
                  rows="8"
                  placeholder="Message"
                  className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Submit Button (Spanning Full Width) */}
              <div className=" col-span-2">
                <button
                  type="submit"
                  className="w-full text-blue-500 rounded-full py-2 px-4 hover:bg-blue-600 hover:text-white border border-blue-600 transition"
                >
                  Send Message Now
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
