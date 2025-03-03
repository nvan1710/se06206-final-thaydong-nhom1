import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Tài khoản admin mặc định
    const adminEmail = "annvbh01101@fpt.edu.vn";
    const adminPassword = "an17102004";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.dribbble.com/userupload/23005716/file/original-36c675c448e2b5e5efb2a6ad090da9a3.png?resize=752x564&vertical=center')",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Back to Homepage */}
        <p className="mt-4 text-center text-gray-600">
          <button
            onClick={() => navigate("/homepage")}
            className="text-blue-600 font-bold hover:underline"
          >
            Back to Home
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
