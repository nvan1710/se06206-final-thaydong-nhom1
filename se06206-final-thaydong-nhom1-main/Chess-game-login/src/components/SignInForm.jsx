import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../apis/api_auth";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await signIn(email, password);
      if(response.status === 200) {

        localStorage.setItem("token", response.data.token); // Store token


        alert("Login successful!");
        navigate("/dashboard"); // Redirect user
        
      }
    
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Log In</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-md font-bold hover:bg-green-800 transition">
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-green-600 font-bold hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
