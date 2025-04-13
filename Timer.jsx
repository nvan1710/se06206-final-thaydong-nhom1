import React, { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]);

  return (
    <div className="bg-black text-green-400 px-4 py-2 rounded-md text-lg font-bold">
      Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
    </div>
  );
};

export default Timer;
