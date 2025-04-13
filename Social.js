import React from "react";
import FriendList from "../components/FriendList";
import Leaderboard from "../components/Leaderboard";
import RecentMessages from "../components/RecentMessages";
import ActivityFeed from "../components/ActivityFeed";

const Social = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-center mb-8">🌐 Social Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái - Danh sách bạn bè */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">👥 Friends Online</h2>
          <FriendList />
        </div>

        {/* Cột giữa - Tin nhắn & Hoạt động */}
        <div className="md:col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">💬 Recent Messages</h2>
          <RecentMessages />
          
          <h2 className="text-xl font-bold mt-6 mb-4">📢 Activity Feed</h2>
          <ActivityFeed />
        </div>

        {/* Cột phải - Bảng xếp hạng */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Social;
