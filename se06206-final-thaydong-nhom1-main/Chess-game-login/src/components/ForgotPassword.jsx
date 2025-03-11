import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleResetRequest = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((u) => u.email === email);

    if (!user) {
      alert("Email not found! Please enter a valid email.");
      return;
    }

    const newOtp = generateOtp();
    localStorage.setItem("resetOtp", newOtp);
    localStorage.setItem("resetEmail", email);
    setGeneratedOtp(newOtp);
    setShowOtpInput(true);

    alert(`Your OTP code is: ${newOtp}`); // Simulating email sending
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("resetOtp");

    if (otp === storedOtp) {
      alert("OTP verified successfully. Proceed to reset password.");
      navigate("/reset-password");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/5a/f2/8a/5af28ad0a4feee85bb9038e64ee2455f.jpg')",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password?
        </h2>

        {!showOtpInput ? (
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
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;