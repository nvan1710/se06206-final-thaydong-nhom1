import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import SignInForm from "./components/SignInForm"; // Đảm bảo đường dẫn đúng
import SignUpForm from "./components/SignUpForm"; // Adjust path if necessary
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
