import React from "react";

const activities = [
  { player: "Hikaru", action: "won against Caruana", time: "5m ago" },
  { player: "Firouzja", action: "reached 2750 Elo", time: "30m ago" },
  { player: "Magnus", action: "streaming live chess!", time: "1h ago" },
];

const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="bg-gray-700 p-3 rounded-md shadow-md">
          <p className="text-yellow-400 font-bold">{activity.player}</p>
          <p>{activity.action}</p>
          <p className="text-sm text-gray-400">{activity.time}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;

