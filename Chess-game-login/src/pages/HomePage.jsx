import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url(https://img.freepik.com/premium-vector/checkmate-game-chess-chess-king-lying-chess-board-queen-figure-it-chess-figures-chessboard_285336-1579.jpg?w=1380)", // Thay bằng đường dẫn chính xác nếu cần
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-wide">
          GAME OF CHESS
        </h1>
        <p className="text-lg mb-6">
          Experience the best online chess game. Play, learn, and compete!
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Play Now
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
