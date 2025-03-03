import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((u) => u.email === email);

    if (!user) {
      alert("Email not found! Please enter a valid email.");
      return;
    }

    localStorage.setItem("resetEmail", email);
    alert("Password reset link has been sent to your email.");
    navigate("/reset-password");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/5a/f2/8a/5af28ad0a4feee85bb9038e64ee2455f.jpg')", // Hình nền full màn hình
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password?
        </h2>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
