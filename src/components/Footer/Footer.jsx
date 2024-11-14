import React from "react";
import { Link } from "react-router-dom"; // Adjust based on your routing library
import iinsafwhiteimage from '../../assets/images/iinsaf.png'; // Replace with your logo path

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] text-black">
      <div className="container mx-auto px-6 py-12">
        

        {/* Footer Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Logo and Social Icons */}
          <div>
            <img src={iinsafwhiteimage} alt="Company Logo" className="w-32 mb-4" />
            <p className="font-bold mb-4">
              Insaaf is a leading platform dedicated to promoting social justice
              through innovative technological solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-400">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-400">
                <i className="fa-brands fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="hover:text-blue-400">
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Homepage</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/faqs" className="hover:underline">Faqs</Link></li>
              <li><Link to="/register?as=1" className="hover:underline">Join as Reporter</Link></li>
              <li><Link to="/register?as=2" className="hover:underline">Join as Advertiser</Link></li>
            </ul>
          </div>

          {/* Privacy Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy Links</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/refundpolicy" className="hover:underline">Refund Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919992396623" className="hover:underline flex items-center">
                  <i className="fa-solid fa-phone mr-2"></i> +91 99923-96623
                </a>
              </li>
              <li>
                <a href="mailto:email@example.com" className="hover:underline flex items-center">
                  <i className="fa-solid fa-envelope mr-2"></i> email@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <hr />
      <div className="bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Copyright © 2024, All rights reserved by{" "}
            <a href="https://www.iinsaf.com" className="hover:underline">
              www.iinsaf.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
