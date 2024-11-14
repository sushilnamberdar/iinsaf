import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, requestOtp, resetPassword } from "../../redux/userSlicer"; // Import your Redux actions
import rightsideimg from "../../assets/loginregister/hello1.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isOtpSent } = useSelector((state) => state.user); // Get Redux state

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("login");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      // User is already authenticated, redirect based on role
      const userRole = localStorage.getItem("userRole");
      if (userRole === "Advertiser") {
        navigate("/inAd");
      } else if (userRole === "Reporter" || userRole === "Influencer") {
        navigate("/repoter");
      } else {
        navigate("/"); // Default route for other roles
      }
    }
  }, [navigate]);
  // Handle login form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ emailOrMobile, password }))
      .unwrap()
      .then((data) => {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userRole", data.role); // Store the role in local storage
        toast.success("Login successful!");
        // Check the role and navigate accordingly
        if (data.role === "Advertiser") {
          navigate("/inAd");
        } else if (data.role === "Reporter") {
          navigate("/repoter");
        } else if (data.role === "Influencer") {
          navigate("/repoter");
        } else {
          navigate("/"); // Default route for other roles
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed! Please check your credentials.");
        // Handle error
      });
  };

  // Handle forgot password OTP request
  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(requestOtp(forgotPasswordEmail)) // Dispatching requestOtp action
      .unwrap()
      .then(() => {
        setTab("verifyOtp2");
        toast.success("OTP requested successfully!");
      })
      .catch((err) => {
        console.error("Error requesting OTP:", err);
        toast.error("Error requesting OTP. Please try again.");
      });
  };

  // Handle OTP verification and password reset
  const handleVerifyOtpSubmit2 = (event) => {
    event.preventDefault();
    dispatch(
      resetPassword({
        email: forgotPasswordEmail,
        otp,
        newPassword: resetPasswordData.newPassword,
      })
    ) // Dispatching resetPassword action
      .unwrap()
      .then(() => {
        toast.success(
          "Password has been reset successfully! Redirecting to login..."
        );
        setTab("login");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
        toast.error("Error resetting password. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {tab === "login"
                ? "The Creative Adult is the child who survived."
                : tab === "forgotPassword"
                ? "Forgot Password?"
                : "Verify OTP"}
            </h1>
            <p className="text-gray-600">
              {tab === "login"
                ? "Welcome back! Please login to your account to continue."
                : tab === "forgotPassword"
                ? "Enter your email to request OTP."
                : "Enter OTP and reset your password."}
            </p>
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="emailOrMobile"
                  className="block text-sm font-medium text-black"
                >
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  id="emailOrMobile"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email or Mobile"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* {error && <p className="text-red-500 text-sm">{error.msg}</p>} */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-black"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => setTab("forgotPassword")}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <Link
                  to="/register"
                  className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 text-center"
                >
                  Signup
                </Link>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {tab === "forgotPassword" && (
            <form onSubmit={handleForgotPasswordSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="forgotPasswordEmail"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Request OTP
              </button>
              <button
                type="button"
                className="w-full py-2 mt-4 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          )}

          {/* OTP Verification Form */}
          {tab === "verifyOtp2" && isOtpSent && (
            <form onSubmit={handleVerifyOtpSubmit2} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={(e) =>
                    setResetPasswordData({
                      ...resetPasswordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="w-full py-2 mt-4 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src={rightsideimg}
            alt="Side Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
