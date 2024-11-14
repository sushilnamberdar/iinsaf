import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOtp } from "../../redux/userSlicer"; // Import verifyOtp
import indianstateandcity from "./IndianStatesCities.json";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector((state) => state.user); // Access user state from Redux store

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    password: "",
    confirmpassword: "",
  });

  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true); // Manage register button visibility

  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({ ...formData, state: selectedState, city: "" }); // Reset city when state changes
    const stateCities = indianstateandcity[selectedState] || [];
    setCities(stateCities);
  };

  const [selectedRole, setSelectedRole] = useState("");
  const [showOtpFields, setShowOtpFields] = useState(false); // State to manage OTP fields visibility
  const [otpData, setOtpData] = useState({
    email: formData.email, // Make sure this is defined and not empty
    mobile: formData.mobile,
    otpMobile: "",
    otpEmail: "",
  });

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOtpData({
      email: formData.email,
      mobile: formData.mobile,
    });

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Dispatch the registerUser action with the form data
    dispatch(registerUser({ ...formData, role: selectedRole })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setShowOtpFields(true);
          setIsRegisterButtonVisible(false);
          toast.success("Registration successful! Please verify OTP.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    );
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Dispatch the verifyOtp action with the OTP data
    dispatch(verifyOtp(otpData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("OTP verified successfully!");
        navigate("/login");
      } else {
        toast.error("OTP verification failed. Please try again.");
      }
    });
  };

  console.log(formData);
  console.log(selectedRole);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] items-center justify-center w-full p-4 lg:p-0">
      <ToastContainer />
      <div className="hidden h-[700px] lg:flex items-center justify-center lg:w-[14%]">
        <div className="mt-4 text-center">
          <h2 className="lg:text-5xl mb-20 text-gray-800">Welcome</h2>
          <Link
            to={"/login"}
            className="bg-gradient-to-r from-violet-500 to-blue-500 text-white py-2 px-20 rounded-full hover:bg-blue-700 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-[70%] lg:h-[700px] flex flex-wrap lg:flex-nowrap items-center justify-between bg-white rounded-lg lg:rounded-none lg:rounded-tl-[250px] lg:rounded-bl-[250px]">
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-evenly items-center mb-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="advertiser"
                name="role"
                value="Advertiser"
                checked={selectedRole === "Advertiser"}
                onChange={() => handleRoleSelection("Advertiser")}
                className="mr-2 hidden lg:block"
              />
              <button
                className="text-white py-2 px-4 rounded-lg lg:rounded-full bg-indigo-500 hover:bg-indigo-800 lg:hover:bg-indigo-700 transition-colors"
                onClick={() => handleRoleSelection("Advertiser")}
              >
                Join as Advertiser
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="influencer"
                name="role"
                value="Influencer"
                checked={selectedRole === "Influencer"}
                onChange={() => handleRoleSelection("Influencer")}
                className="mr-2 hidden lg:block"
              />
              <button
                className="text-white py-2 px-4 rounded-lg lg:rounded-full bg-indigo-500 hover:bg-indigo-800 lg:hover:bg-indigo-700 transition-colors ml-1"
                onClick={() => handleRoleSelection("Influencer")}
              >
                Join as Influencer
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="reporter"
                name="role"
                value="Reporter"
                checked={selectedRole === "Reporter"}
                onChange={() => handleRoleSelection("Reporter")}
                className="mr-2 hidden lg:block"
              />
              <button
                className="text-white py-2 px-4 rounded-lg lg:rounded-full bg-indigo-500 hover:bg-indigo-800 lg:hover:bg-indigo-700 transition-colors ml-1"
                onClick={() => handleRoleSelection("Reporter")}
              >
                Join as Reporter
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your Full Name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email1"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No.
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Mobile No."
              />
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your Password"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm your Password"
              />
            </div>

            {isRegisterButtonVisible && (
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
                >
                  Register
                </button>
              </div>
            )}
          </form>

          {showOtpFields && ( // Conditionally render OTP fields
            <form onSubmit={handleOtpSubmit} className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Verify OTP</h3>
              <div className="mb-4">
                <label
                  htmlFor="mobileOtp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile OTP
                </label>
                <input
                  type="text"
                  id="otpMobile"
                  name="otpMobile"
                  value={otpData.otpMobile}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter OTP sent to your Mobile"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="emailOtp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email OTP
                </label>
                <input
                  type="text"
                  id="otpEmail"
                  name="otpEmail"
                  value={otpData.otpEmail}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter OTP sent to your Email"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
