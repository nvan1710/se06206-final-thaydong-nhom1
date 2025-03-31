import React, { useState } from "react";

const RoomJoin = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (roomId.trim() !== "") {
      onJoin(roomId); // Gửi roomId về component cha
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">🔑 Enter Room ID</h2>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter Room ID"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
