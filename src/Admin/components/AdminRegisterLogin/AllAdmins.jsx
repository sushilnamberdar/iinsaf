import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/const";

const AllAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const availablePermissions = [
        "manage_admin",
        "manage_users",
        "view_reports",
        "edit_content",
        "delete_content",
    ];

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get(`${baseUrl}admin/get-admin`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            setAdmins(res.data);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to fetch admins");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${baseUrl}admin/update`, selectedAdmin, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            toast.success(res.data.msg);
            fetchAdmins();
            setSelectedAdmin(null);
        } catch (err) {
            console.error(err.message);
            toast.error(err.response?.data?.msg || "Error updating admin");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}admin/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                data: { id },
            });
            toast.success(res.data.msg);
            fetchAdmins();
        } catch (err) {
            console.error(err.message);
            toast.error(err.response?.data?.msg || "Error deleting admin");
        }
    };

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        if (selectedAdmin) {
            setSelectedAdmin((prev) => ({
                ...prev,
                permissions: checked
                    ? [...(prev.permissions || []), value]
                    : (prev.permissions || []).filter((perm) => perm !== value),
            }));
        }
    };

   return (
    <div className="flex flex-wrap justify-between items-start p-6 bg-white rounded-lg shadow-md min-h-screen">
        {/* Admin list section */}
        <div className="w-full lg:w-1/2 border rounded-3xl p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Management</h2>
            <h3 className="text-xl font-semibold mb-2">All Admins</h3>
            <ul className="space-y-4">
                {admins.map((admin) => (
                    <li key={admin._id} className="p-4 border rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Name: {admin.name}</p>
                                <p>Email: {admin.email}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setSelectedAdmin(admin)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(admin._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        {/* Edit admin section */}
        {selectedAdmin && (
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0 p-4 border rounded-3xl ">
                <h3 className="text-xl font-semibold mb-4">Edit Admin</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={selectedAdmin.name || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, name: e.target.value })}
                        className="w-full border-gray-700 border-2 rounded-lg p-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={selectedAdmin.email || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
                        className="w-full border-gray-700 border-2 rounded-lg p-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mobile"
                        value={selectedAdmin.mobile || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, mobile: e.target.value })}
                        className="w-full border-gray-700 border-2 rounded-lg p-2"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={selectedAdmin.password || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
                        className="w-full border-gray-700 border-2 rounded-lg p-2"
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={selectedAdmin.role || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, role: e.target.value })}
                        className="w-full border-gray-700 border-2 rounded-lg p-2"
                    />
                    <fieldset>
                        <legend className="font-medium">Permissions</legend>
                        {availablePermissions.map((permission) => (
                            <label key={permission} className="block">
                                <input
                                    type="checkbox"
                                    value={permission}
                                    checked={selectedAdmin.permissions?.includes(permission)}
                                    onChange={(handlePermissionChange)}
                                    className="mr-2 leading-tight"
                                />
                                {permission}
                            </label>
                        ))}
                    </fieldset>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update Admin
                    </button>
                </form>
            </div>
        )}
    </div>
);

};

export default AllAdmins;
