import React from "react";

// Tạo danh sách bạn bè với ảnh từ API UI Avatars
const friends = [
  { name: "Magnus Carlsen", status: "online", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Hikaru Nakamura", status: "offline", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Alireza Firouzja", status: "online", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Fabiano Caruana", status: "online", avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Ian Nepomniachtchi", status: "offline", avatar: "https://i.pravatar.cc/150?img=5" },
];

const FriendList = () => {
  return (
    <ul className="space-y-3">
      {friends.map((friend, index) => (
        <li key={index} className="flex items-center p-3 bg-gray-700 rounded-md">
          {/* Ảnh đại diện từ API */}
          <img 
            src={friend.avatar} 
            alt={friend.name} 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          
          {/* Tên và trạng thái */}
          <span className="flex-1">{friend.name}</span>
          <span className={`text-sm px-2 py-1 rounded-md ${friend.status === "online" ? "bg-green-500" : "bg-red-500"}`}>
            {friend.status}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
