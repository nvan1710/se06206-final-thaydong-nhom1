import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Learn = () => {
  const navigate = useNavigate();
  const { section } = useParams(); // Lấy tên section từ URL
  const [visibleSection, setVisibleSection] = useState(section || null);

  // Danh sách nội dung hướng dẫn
  const sections = {
    basics: {
      title: "How Pieces Move",
      content: [
        "♙ Pawn: Moves forward 1 square, 2 squares on first move, captures diagonally.",
        "♘ Knight: Moves in an L-shape.",
        "♖ Rook: Moves horizontally or vertically.",
        "♗ Bishop: Moves diagonally.",
        "♕ Queen: Moves any direction.",
        "♔ King: Moves one square in any direction."
      ]
    },
    tactics: {
      title: "Basic Strategies",
      content: [
        "♜ Control the center: e4, d4, e5, d5.",
        "♞ Develop your pieces: Knights and bishops first.",
        "♚ Castle early: Protect your king."
      ]
    },
    strategies: {
      title: "Advanced Tips",
      content: [
        "👀 Think 2-3 moves ahead.",
        "🔄 Balance attack and defense.",
        "🎯 Exploit opponent mistakes."
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Back Button */}
      <button 
        className="mb-5 px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 flex items-center"
        onClick={() => navigate("/learn")}
      >
        <FaArrowLeft className="mr-2" /> Back to Learn Section
      </button>

      {/* Hiển thị nội dung theo mục học */}
      {visibleSection && sections[visibleSection] ? (
        <div>
          <h1 className="text-3xl font-bold text-green-400 mb-6">{sections[visibleSection].title}</h1>
          <ul className="list-disc pl-5 bg-gray-800 p-4 rounded-md">
            {sections[visibleSection].content.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-400">Section not found!</p>
      )}
    </div>
  );
};

export default Learn;
