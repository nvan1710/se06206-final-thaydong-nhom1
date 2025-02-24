import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook điều hướng

  const handleSubmit = (e) => {
    e.preventDefault();
  
<<<<<<< Updated upstream
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not found! Please sign up first.");
      return;
    }
  
    const userData = JSON.parse(storedUser);
  
    if (email === userData.email && password === userData.password) {
      console.log("Login successful");
  
      // Kiểm tra role: nếu là admin thì vào /admin, nếu là user thì vào /dashboard
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid email or password!");
    }
=======
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Nếu email là admin -> gán role "admin", ngược lại là "user"
    const role = email === "admin@gmail.com" ? "admin" : "user";
  
    const userData = {
      firstName,
      lastName,
      email,
      password,
      gender,
      birthday,
      address,
      country,
      role, // Thêm role vào dữ liệu
    };
  
    localStorage.setItem("user", JSON.stringify(userData));
  
    setSuccessMessage("Registration successful! You can now sign in.");
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
>>>>>>> Stashed changes
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

        {/* Hình ảnh trên phần nhập email */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn11.bigcommerce.com/s-fhcm7h/images/stencil/1280x1280/products/789/6518/IMG_8197-removebg__85699.1731310806.png?c=2"
            alt="Sign In"
            className="w-30 h-50 mx-auto mb-4"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password & Sign Up */}
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-sm text-blue-500 hover:underline"
            >
              Register New Account
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

