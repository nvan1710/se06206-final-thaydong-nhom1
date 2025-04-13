import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const LearnDetail = () => {
  const navigate = useNavigate();
  const { section } = useParams(); // Lấy tên section từ URL

  // Nội dung từng bài học
  const lessons = {
    basics: {
      title: "Beginner Basics - How Pieces Move",
      content: [
        "♙ Pawn: Moves forward 1 square, captures diagonally.",
        "♘ Knight: Moves in an L-shape.",
        "♖ Rook: Moves horizontally or vertically.",
        "♗ Bishop: Moves diagonally.",
        "♕ Queen: Moves any direction.",
        "♔ King: Moves one square in any direction."
      ]
    },
    tactics: {
      title: "Intermediate Tactics",
      content: [
        "♜ Control the center: e4, d4, e5, d5.",
        "♞ Develop your pieces: Knights and bishops first.",
        "♚ Castle early: Protect your king."
      ]
    },
    strategies: {
      title: "Advanced Strategies",
      content: [
        "👀 Think 2-3 moves ahead.",
        "🔄 Balance attack and defense.",
        "🎯 Exploit opponent mistakes."
      ]
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Nút trở về Learn */}
      <button 
        className="mb-5 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
        onClick={() => navigate("/learn")}
      >
        <FaArrowLeft className="mr-2" /> Back to Learn Section
      </button>

      {/* Hiển thị nội dung bài học */}
      {lessons[section] ? (
        <div>
          <h1 className="text-3xl font-bold text-green-500 mb-6">{lessons[section].title}</h1>
          <ul className="list-disc pl-5 bg-gray-800 p-4 rounded-md text-white">
            {lessons[section].content.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-400">Lesson not found!</p>
      )}
    </div>
  );
};

export default LearnDetail;
