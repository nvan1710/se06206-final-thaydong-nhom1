import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChess,
  FaTrophy,
  FaHistory,
  FaBookOpen,
  FaComments,
  FaCog,
  FaEye
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showDifficulty, setShowDifficulty] = useState(false); // Hiện modal chọn mức độ
  const [showOnlineMode, setShowOnlineMode] = useState(false); // Hiện modal chọn chế độ online

  const handlePlayComputer = (difficulty) => {
    setShowDifficulty(false);
    navigate(`/chessboard?difficulty=${difficulty}`);
  };

  const handlePlayOnline = (mode) => {
    setShowOnlineMode(false);
    navigate(`/play-online?mode=${mode}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-5 flex flex-col space-y-6">
        {/* Logo, bấm vào sẽ chuyển về trang chủ */}
        <div
          className="flex items-center space-x-2 text-green-500 text-2xl font-bold cursor-pointer hover:text-green-400"
          onClick={() => navigate("/")}
        >
          <FaChess />
          <span>Chess.com</span>
        </div>

        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaChess />
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/leaderboard")}>
            <FaTrophy />
            <span>Leaderboard</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/history")}>
            <FaHistory />
            <span>Game History</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/tutorials")}>
            <FaBookOpen />
            <span>Tutorials</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/forums")}>
            <FaComments />
            <span>Forums</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/settings")}>
            <FaCog />
            <span>Settings</span>
          </button>
          {/* Nút mới: Watch the Match */}
          <button className="flex items-center space-x-2 hover:text-green-400" onClick={() => navigate("/watch-match")}>
            <FaEye />
            <span>Watch the Match</span>
          </button>

        </nav>


        {/* Login & Sign Up Buttons */}
        <div className="mt-auto">
          <button
            className="w-full bg-green-500 text-black py-2 rounded-md font-bold hover:bg-green-600"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className="w-full bg-gray-700 text-white py-2 rounded-md font-bold mt-2 hover:bg-gray-600"
            onClick={() => navigate("/signin")}
          >
            Log In
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-10">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {/* Chessboard Placeholder */}
          <div className="grid grid-cols-8 w-96 h-96 border-4 border-black">
            {Array.from({ length: 64 }).map((_, index) => (
              <div
                key={index}
                className={`w-12 h-12 flex justify-center items-center text-2xl font-bold ${(Math.floor(index / 8) + (index % 8)) % 2 === 0
                  ? "bg-green-200"
                  : "bg-green-600"
                  }`}
              >
                {index === 0 || index === 7 ? "♜" : ""}
                {index === 1 || index === 6 ? "♞" : ""}
                {index === 2 || index === 5 ? "♝" : ""}
                {index === 3 ? "♛" : ""}
                {index === 4 ? "♚" : ""}
                {index >= 8 && index < 16 ? "♟" : ""}
                {index >= 48 && index < 56 ? "♙" : ""}
                {index === 56 || index === 63 ? "♖" : ""}
                {index === 57 || index === 62 ? "♘" : ""}
                {index === 58 || index === 61 ? "♗" : ""}
                {index === 59 ? "♕" : ""}
                {index === 60 ? "♔" : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            className="w-72 bg-green-500 text-black py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition"
            onClick={() => setShowOnlineMode(true)}
          >
            Play Online
          </button>
          <button
            className="w-72 bg-gray-700 text-white py-3 rounded-lg text-xl font-bold hover:bg-gray-600 transition"
            onClick={() => setShowDifficulty(true)}
          >
            Play Computer
          </button>
        </div>
      </main>

      {/* Modal chọn chế độ chơi Online */}
      {showOnlineMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Mode</h2>
            <div className="space-y-3">
              <button
                className="w-40 bg-blue-500 text-black py-2 rounded-lg font-bold hover:bg-blue-600 transition"
                onClick={() => handlePlayOnline("players")}
              >
                VS Players
              </button>
              <button
                className="w-40 bg-purple-500 text-black py-2 rounded-lg font-bold hover:bg-purple-600 transition"
                onClick={() => handlePlayOnline("friends")}
              >
                VS Friends
              </button>
            </div>
            <button
              className="mt-4 w-40 bg-gray-600 text-white py-2 rounded-lg font-bold hover:bg-gray-700 transition"
              onClick={() => setShowOnlineMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal chọn mức độ chơi với Máy */}
      {showDifficulty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Difficulty</h2>
            <div className="space-y-3">
              <button className="w-40 bg-green-500 text-black py-2 rounded-lg font-bold hover:bg-green-600" onClick={() => handlePlayComputer("easy")}>Easy</button>
              <button className="w-40 bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-600" onClick={() => handlePlayComputer("normal")}>Normal</button>
              <button className="w-40 bg-red-500 text-black py-2 rounded-lg font-bold hover:bg-red-600" onClick={() => handlePlayComputer("hard")}>Hard</button>
            </div>
            <button className="mt-4 w-40 bg-gray-600 text-white py-2 rounded-lg font-bold hover:bg-gray-700 transition" onClick={() => setShowDifficulty(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
