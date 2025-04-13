import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChess, FaPuzzlePiece, FaGraduationCap,
  FaVideo, FaNewspaper, FaUsers, FaEllipsisH,
  FaGlobe, FaRobot
} from "react-icons/fa";
import ChessNews from "../components/ChessNews";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F5F5F5] text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-[#FFCC00] text-2xl font-bold mb-6">
            <FaChess />
            <span>Chess.com</span>
          </div>
          <nav className="flex flex-col space-y-4">
            {[
              { icon: FaChess, label: "Play", route: "/chessboard" },
              { icon: FaPuzzlePiece, label: "Puzzles", route: "/puzzles" },
              { icon: FaGraduationCap, label: "Learn", route: "/learn" },
              { icon: FaVideo, label: "Watch", route: "/watch" },
              { icon: FaNewspaper, label: "News", route: "/news" },
              { icon: FaUsers, label: "Social", route: "/social" }, // Thêm route cho Social
              { icon: FaEllipsisH, label: "More" },
            ].map(({ icon: Icon, label, route }) => (
              <button
                key={label}
                className="flex items-center space-x-2 text-lg hover:text-[#FFCC00]"
                onClick={() => route && navigate(route)}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-6">
          <button className="w-full bg-[#FFCC00] text-black py-2 rounded-md font-bold hover:bg-[#E6B800]">
            Sign Up
          </button>
          <button className="w-full bg-gray-700 text-white py-2 rounded-md font-bold mt-2 hover:bg-gray-600">
            Log In
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center min-h-screen grow overflow-auto bg-black text-white">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Play Chess Online on the #1 Site!</h1>
          <p className="text-lg text-green-600 font-bold mt-2">
            <span className="font-bold text-white">18,642,512</span> Games Today ·
            <span className="font-bold text-white"> 122,153</span> Playing Now
          </p>
        </div>

        {/* Chessboard */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-8 grid-rows-8 w-[512px] h-[512px] border-4 border-gray-500">
            {Array.from({ length: 64 }).map((_, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex justify-center items-center text-2xl font-bold ${
                  (Math.floor(index / 8) + (index % 8)) % 2 === 0
                    ? "bg-[#EEEED2]"
                    : "bg-[#769656]"
                } text-black`}
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
        <div className="mt-6 flex space-x-4">
          {[
            { icon: FaGlobe, label: "Play Online", desc: "Play with someone at your level", route: "/chessboard", bg: "bg-[#FFCC00] hover:bg-[#E6B800] text-black" },
            { icon: FaRobot, label: "Play Computer", desc: "Play vs customizable training bots", route: "/chessboard", bg: "bg-gray-700 hover:bg-gray-600 text-white" },
          ].map(({ icon: Icon, label, desc, route, bg }) => (
            <button
              key={label}
              className={`w-80 h-20 flex flex-col items-center justify-center rounded-lg text-xl font-bold transition p-2 shadow-md ${bg}`}
              onClick={() => navigate(route)}
            >
              <div className="flex items-center space-x-3">
                <Icon className="text-2xl" />
                <span className="text-lg font-bold">{label}</span>
              </div>
              <p className="text-sm font-medium">{desc}</p>
            </button>
          ))}
        </div>

        {/* Chess News Section */}
        <div className="mt-12 w-full max-w-3xl">
          <ChessNews />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
