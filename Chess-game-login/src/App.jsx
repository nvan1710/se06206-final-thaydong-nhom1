import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ChessBoard from "./components/ChessBoard";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminPage from "./pages/AdminPages";
import AdminLogin from "./components/AdminLogin"; // ✅ Import Admin Login

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chessboard" element={<ChessBoard />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* ✅ Thêm route đăng nhập admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
