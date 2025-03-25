import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RoomJoin from "./components/RoomJoin";
import ChessBoard from "./components/ChessBoard";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminPage from "./pages/AdminPages";
import AdminLogin from "./components/AdminLogin";

// HOC để bảo vệ route admin
const ProtectedRoute = ({ element }) => {
  const isAdminAuthenticated = localStorage.getItem("isAdmin"); // Kiểm tra đăng nhập
  return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
};

function App() {
  // Trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Điều hướng mặc định */}
        <Route path="/" element={<Navigate to="/homepage" />} />

        {/* Các trang chính */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<RoomJoin />} />
        <Route path="/chessboard/:roomId" element={<ChessBoard />} />
        <Route path="/chessboard" element={<ChessBoard />} />

        {/* Authentication */}
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
