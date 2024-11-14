import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../../redux/AdminRedux/adminLogin__RegisterSlicer";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.admin);
  const [isCreating, setIsCreating] = useState(false); // State for loading
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    permissions: [], // Allow superadmin to define permissions
  });

  // List of available permissions based on the schema enum
  const availablePermissions = [
    "manage_admin",
    "manage_users",
    "view_reports",
    "edit_content",
    "delete_content",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the permission to the list if it's checked
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, value],
      }));
    } else {
      // Remove the permission if it's unchecked
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((perm) => perm !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true); // Set loading state to true
    try {
      await dispatch(createAdmin(formData)); // Dispatch form data with the selected permissions
      // toast.success("Admin created successfullyy!"); // Show success toast
    } catch (err) {
      console.error(err);
      toast.error("Failed to create admin."); // Show error toast
    } finally {
      setIsCreating(false); // Reset loading state
    }
  };

  const handelnavigate = () => {
    navigate('/admin/alladmin')
  }

  return (

    <div className="flex justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-sm font-medium text-gray-700">Permissions</legend>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    name="permissions"
                    value={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={handlePermissionChange}
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">{permission}</span>
                </label>
              ))}
            </div>
          </fieldset>
  
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Create Admin
          </button>
        </form>
  
        {status === 'loading' && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <button className="text-blue-500  underline hover:no-underline" onClick={handelnavigate}>All Admins</button>

      </div>
    </div>
  );
};

export default CreateAdmin;
