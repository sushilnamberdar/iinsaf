import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaCaretDown, FaUser } from "react-icons/fa";
import logo from "../../assets/images/iinsaf.png";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isOpen, setIsOpen] = useState(false); // Toggle for mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // Toggle for profile dropdown
  const [servicesOpen, setServicesOpen] = useState(false); // Toggle for services dropdown
  const [careerOpen, setCareerOpen] = useState(false); // Toggle for career dropdown

  const [authentication, setAuthentication] = useState(false); // Set authentication status

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  const toggleCareer = () => setCareerOpen(!careerOpen);

  const onLogout = () => {
    localStorage.clear(); // Clear the token from local storage
    setAuthentication(false);
    setProfileOpen(false);
    navigate('/login'); // Redirect to /login
  };
  return (
    <>
      <nav className="bg-gradient-to-r text-2xl from-blue-100 via-blue-300 to-[#f2effd] text-black shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left Section: Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img className="h-10" src={logo} />
          </Link>

          {/* Center Section: Menu Items */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>

            <div className="relative">
              <button
                onClick={toggleServices}
                className="flex items-center hover:text-gray-200"
              >
                Services <FaCaretDown className="ml-1" />
              </button>
              {servicesOpen && (
                <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg">
                  <Link
                    to="/service1"
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Service 1
                  </Link>
                  <Link
                    to="/service2"
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Service 2
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleCareer}
                className="flex items-center hover:text-gray-200"
              >
                Career <FaCaretDown className="ml-1" />
              </button>
              {careerOpen && (
                <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg">
                  <Link
                    to="/career1"
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Career 1
                  </Link>
                  <Link
                    to="/career2"
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Career 2
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </div>

          {/* Right Section: Profile or Login/Signup */}
          <div className="relative hidden md:flex items-center">
            {!authentication ? (
              <>
                <FaUser className="mr-2" />
                <Link
                  to={"/login"}
                  className="mr-1   rounded-2xl hover:text-white pb-1 bg-sky-500 px-3 hover:shadow-2xl"
                >
                  Login
                </Link>{" "}
                <Link to={"/register"} className="pb-1 hover:text-blue-500">
                  {" "}
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 hover:text-blue-500"
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
                <FaCaretDown />
              </button>
            )}

            {profileOpen && authentication && (
              <div className="absolute right-0  mt-32 w-48 bg-white text-black rounded shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-300"
                >
                  View Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden  text-black">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block px-4 py-2 hover:bg-blue-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block px-4 py-2 hover:bg-blue-300"
            >
              About
            </Link>
            <button
              onClick={toggleServices}
              className="w-full text-left px-4 py-2 hover:bg-blue-300"
            >
              Services <FaCaretDown className="inline ml-1" />
            </button>
            {servicesOpen && (
              <div className="pl-8 ">
                <Link
                  to="/service1"
                  onClick={toggleMenu}
                  className="block py-2 hover:bg-blue-300"
                >
                  Service 1
                </Link>
                <Link
                  to="/service2"
                  onClick={toggleMenu}
                  className="block py-2 hover:bg-blue-300"
                >
                  Service 2
                </Link>
              </div>
            )}
            <button
              onClick={toggleCareer}
              className="w-full text-left px-4 py-2 hover:bg-blue-300"
            >
              Career <FaCaretDown className="inline ml-1" />
            </button>
            {careerOpen && (
              <div className="pl-8 ">
                <Link
                  to="/career1"
                  onClick={toggleMenu}
                  className="block py-2 hover:bg-blue-300"
                >
                  Career 1
                </Link>
                <Link
                  to="/career2"
                  onClick={toggleMenu}
                  className="block py-2 hover:bg-blue-300"
                >
                  Career 2
                </Link>
              </div>
            )}
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block px-4 py-2 hover:bg-blue-300"
            >
              Contact
            </Link>

            {/* Profile Section or Login/Signup in Mobile Menu */}
            {!authentication ? (
              <>
                <div className="flex pb-3 items-center">
                  <FaUser className="mr-2" />
                  <Link
                  to="/login"
                    onClick={toggleMenu}
                    className="mr-1   rounded-2xl hover:text-white pb-1 bg-sky-500 px-3 hover:shadow-2xl"
                  >
                    Login
                  </Link>{" "}
                  <Link to={'/register'} 
                  onClick={toggleMenu}
                  className="pb-1 hover:text-blue-500"> Signup</Link>
                </div>
              </>
            ) : (
              <button
                onClick={toggleProfile}
                className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center space-x-2"
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
                <FaCaretDown />
              </button>
            )}

            {profileOpen && authentication && (
              <div className="pl-8">
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="block py-2 hover:bg-blue-300"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 hover:bg-blue-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
