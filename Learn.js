import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChessPawn, FaChessKnight, FaChessQueen, FaArrowLeft } from "react-icons/fa";

const Learn = () => {
  const navigate = useNavigate(); // Hook điều hướng

  const lessons = [
    { title: "Beginner Basics", description: "Learn how pieces move and basic strategies.", icon: <FaChessPawn size={24} />, path: "/learn/basics" },
    { title: "Intermediate Tactics", description: "Understand tactics like forks, pins, and skewers.", icon: <FaChessKnight size={24} />, path: "/learn/tactics" },
    { title: "Advanced Strategies", description: "Master endgames and high-level strategies.", icon: <FaChessQueen size={24} />, path: "/learn/strategies" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Nút trở về Dashboard */}
      <button 
        className="mb-5 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
        onClick={() => navigate("/Dashboard")}
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold flex items-center gap-2">🎓 Learn Chess</h1>
      <p className="text-gray-600 mt-2 text-lg">
        Welcome to the chess learning section! Click on a topic to start learning.
      </p>

      {/* Danh sách bài học */}
      <div className="mt-6 space-y-4">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            icon={lesson.icon}
            title={lesson.title}
            description={lesson.description}
            onClick={() => navigate(lesson.path)}
          />
        ))}
      </div>
    </div>
  );
};

// Component hiển thị từng bài học (có thể bấm vào)
const LessonCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="flex items-start p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-blue-500">{icon}</div>
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Learn;
