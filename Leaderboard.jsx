import React from "react";

const topPlayers = [
  { name: "Magnus Carlsen", rating: 2850 },
  { name: "Hikaru Nakamura", rating: 2780 },
  { name: "Fabiano Caruana", rating: 2760 },
  { name: "Alireza Firouzja", rating: 2745 },
  { name: "Ding Liren", rating: 2740 },
];

const Leaderboard = () => {
  return (
    <ul className="space-y-3">
      {topPlayers.map((player, index) => (
        <li key={index} className="flex justify-between p-2 bg-gray-700 rounded-md">
          <span>{index + 1}. {player.name}</span>
          <span className="font-bold text-yellow-500">{player.rating}</span>
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
