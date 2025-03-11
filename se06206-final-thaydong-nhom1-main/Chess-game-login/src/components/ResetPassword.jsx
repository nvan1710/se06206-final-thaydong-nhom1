import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
      alert("Invalid request! Please try again.");
      navigate("/forgot-password");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.email === resetEmail ? { ...user, password: newPassword } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("resetEmail");

    alert("Password reset successfully!");
    navigate("/signin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/79/d6/b5/79d6b5a462cfd7db75867305ecf436f0.jpg')", // Hình nền full màn hình
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747614.png"
            alt="Lock Icon"
            className="w-16 mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition duration-300"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
