import React, { useEffect, useState } from "react";

const WatchMatch = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/matches.json") // Lấy dữ liệu từ file JSON
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Xem người khác chơi</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {matches.map((match) => (
          <div key={match.match_id} className="bg-cream p-4 shadow-md rounded-lg flex flex-col items-center">
            
            {/* Người chơi 1 (Trên) */}
            <div className="flex items-center space-x-3">
              <img src={match.player1.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold" />
              <div>
                <span className="font-semibold text-lg">{match.player1.name}</span>
                <img src={match.player1.flag} alt={match.player1.country} className="w-5 h-5 inline ml-1" />
              </div>
            </div>

            {/* Thông tin trận đấu */}
            <div className="flex items-center justify-between w-full bg-gray-200 px-4 py-2 my-2 rounded-md text-gray-600 text-sm">
              <span>{match.match_type}</span>  
              <img src="/images/kiem.jpg" alt="Kiem" className="w-6 h-6 mx-2" />
              <span>{match.time_control}</span>
            </div>

            {/* Người chơi 2 (Dưới) */}
            <div className="flex items-center space-x-3">
              <img src={match.player2.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold" />
              <div>
                <span className="font-semibold text-lg">{match.player2.name}</span>
                <img src={match.player2.flag} alt={match.player2.country} className="w-5 h-5 inline ml-1" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchMatch;
