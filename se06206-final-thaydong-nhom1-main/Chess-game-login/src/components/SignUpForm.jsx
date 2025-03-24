import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../apis/api_auth";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      await signUp(email, password);
      alert("Sign up successful! Please log in.");
      navigate("/signin"); // Redirect to login page
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-md font-bold hover:bg-green-800 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")} className="text-green-600 font-bold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
