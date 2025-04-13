import React from "react";
import { useNavigate } from "react-router-dom";

const Puzzles = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Chess Puzzles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-xl"
          onClick={() => navigate("/puzzles/rush")}
        >
          Puzzle Rush
        </button>

        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-xl"
          onClick={() => navigate("/puzzles/battle")}
        >
          Puzzle Battle
        </button>

        <button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-xl"
          onClick={() => navigate("/puzzles/daily")}
        >
          Daily Puzzle
        </button>

        <button 
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg text-xl"
          onClick={() => navigate("/puzzles/custom")}
        >
          Custom Puzzles
        </button>
      </div>
    </div>
  );
};

export default Puzzles;

