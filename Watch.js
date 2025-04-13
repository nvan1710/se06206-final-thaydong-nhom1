import React from "react";
import "./Watch.css"; // Import CSS với hiệu ứng đặc biệt

const Watch = () => {
  return (
    <div className="watch-container">
      {/* Viền phát sáng hai bên */}
      <div className="watch-border left-border"></div>
      <div className="watch-border right-border"></div>

      {/* Hình nền bàn cờ ảo */}
      <div className="chess-bg"></div>

      {/* Tiêu đề với hiệu ứng glowing */}
      <h1 className="neon-text">🎥 Watch Chess Games</h1>

      {/* Video Embed với hiệu ứng hover */}
      <div className="video-container">
        <iframe
          className="video-frame"
          src="https://www.youtube.com/embed/7fD69_HUJ7o"
          title="Chess Game Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Hiệu ứng chữ nhấp nháy nhẹ */}
      <p className="subtext">Watch live chess games, tournaments, and tutorials here!</p>

      {/* Câu trích dẫn về cờ vua hai bên */}
      <p className="chess-quote left-quote">
        "Chess is the gymnasium of the mind." — Pascal
      </p>
      <p className="chess-quote right-quote">
        "Every chess master was once a beginner." — Irving Chernev
      </p>

      {/* Hiệu ứng ánh sáng xung quanh */}
      <div className="glow"></div>
      <div className="particles"></div>
    </div>
  );
};

export default Watch;
