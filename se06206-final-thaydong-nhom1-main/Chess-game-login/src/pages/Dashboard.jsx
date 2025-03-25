import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChess, FaPuzzlePiece, FaGraduationCap, FaVideo, FaNewspaper, FaUsers, FaEllipsisH } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(""); // State để lưu roomId
  const [showInput, setShowInput] = useState(false); // State để hiển thị ô nhập

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      navigate(`/chessboard/${roomId}`); // Điều hướng đến trang bàn cờ với roomId
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-5 flex flex-col space-y-6">
        <div className="flex items-center space-x-2 text-green-500 text-2xl font-bold">
          <FaChess />
          <span>Chess.com</span>
        </div>
        
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaChess />
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaPuzzlePiece />
            <span>Puzzles</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaGraduationCap />
            <span>Learn</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaVideo />
            <span>Watch</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaNewspaper />
            <span>News</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaUsers />
            <span>Social</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-400">
            <FaEllipsisH />
            <span>More</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button className="w-full bg-green-500 text-black py-2 rounded-md font-bold hover:bg-green-600">
            Sign Up
          </button>
          <button className="w-full bg-gray-700 text-white py-2 rounded-md font-bold mt-2 hover:bg-gray-600">
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
                className={`w-12 h-12 flex justify-center items-center text-2xl font-bold ${
                  (Math.floor(index / 8) + (index % 8)) % 2 === 0
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
          {!showInput ? (
            <>
              <button
                className="w-72 bg-green-500 text-black py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition"
                onClick={() => setShowInput(true)}
              >
                Play Online
              </button>
              <button
                className="w-72 bg-gray-700 text-white py-3 rounded-lg text-xl font-bold hover:bg-gray-600 transition"
                onClick={() => navigate("/chessboard")}
              >
                Play Computer
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="w-72 p-3 text-black border rounded-lg"
              />
              <button
                className="w-72 bg-green-500 text-black py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition"
                onClick={handleJoinRoom}
              >
                Join Room
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
