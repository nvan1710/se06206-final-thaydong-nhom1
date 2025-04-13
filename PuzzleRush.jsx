import React, { useState, useEffect } from "react";

const puzzles = [
  { question: "White to move and checkmate in one", answer: "Qh5#" },
  { question: "Find the best move for Black", answer: "Nf6" },
  { question: "How does White win material?", answer: "Bxg7" },
];

const PuzzleRush = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 giây đếm ngược

  // Bắt đầu đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Xử lý khi người chơi nhập câu trả lời
  const handleSubmit = () => {
    if (userInput.trim().toLowerCase() === puzzles[currentPuzzleIndex].answer.toLowerCase()) {
      setScore(score + 1);
    }
    setUserInput("");
    setCurrentPuzzleIndex((prevIndex) => (prevIndex + 1) % puzzles.length);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Puzzle Rush</h1>
      <p className="text-lg mb-2">Solve as many puzzles as possible within 60 seconds!</p>
      <p className="text-lg font-bold text-red-400">⏳ Time Left: {timeLeft} sec</p>
      <p className="text-xl font-semibold mt-4">{puzzles[currentPuzzleIndex].question}</p>
      
      <input
        type="text"
        className="mt-4 p-2 text-black rounded"
        placeholder="Enter your move..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        className="mt-3 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      <p className="mt-4 text-lg font-bold text-yellow-400">Score: {score}</p>

      {timeLeft === 0 && (
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-red-500">Time's Up!</h2>
          <p className="text-lg">Your final score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default PuzzleRush;
