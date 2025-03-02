import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound"; 
import ChessBoard from "./components/ChessBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} /> 
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chessboard" element={<ChessBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
