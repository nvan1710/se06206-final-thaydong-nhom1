import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleBlockUser = (email) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, isBlocked: !user.isBlocked } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleCheckUser = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="transition duration-300 hover:bg-gray-100">
                  <td className="px-6 py-4">{user.email}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      user.isBlocked ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleBlockUser(user.email)}
                      className={`px-4 py-2 text-white rounded-lg font-semibold transition duration-300 ${
                        user.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleCheckUser(user)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                      Check
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hiển thị thông tin chi tiết người dùng */}
        {selectedUser && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              User Information
            </h3>
            <p className="text-gray-800"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="text-gray-800"><strong>First Name:</strong> {selectedUser.firstName || "N/A"}</p>
            <p className="text-gray-800"><strong>Last Name:</strong> {selectedUser.lastName || "N/A"}</p>
            <p className="text-gray-800"><strong>Password:</strong> {selectedUser.password}</p>
            <p className="text-gray-800"><strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
          </div>
        )}

        {/* Nút Logout */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
