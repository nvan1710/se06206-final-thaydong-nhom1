import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("User not found! Please sign up first.");
      return;
    }

    if (user.isBlocked) {
      alert("Your account has been blocked by the admin.");
      return;
    }

    if (email === user.email && password === user.password) {
      alert("Login successful!");
      navigate("/homepage");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">🌿</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-green-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-bold hover:bg-green-800 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-600 font-bold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
