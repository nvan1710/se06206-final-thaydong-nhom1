import React, { useState } from "react";
import { useParams } from "react-router-dom";

const newsArticles = [
  {
    id: "1",
    title: "Nakamura Wins Another $5,000 In American Cup Blitz",
    image: "/images/anh1.jpg",
    author: "Anthony Levin",
    tag: "NM",
    category: "Blitz Winner",
    content: `
      <p>📅 <strong>Published Date:</strong> 31/03/2025</p>
      <p>✍ <strong>Author:</strong> Anthony Levin</p>

      <h2>🏆 Nakamura – The Blitz Chess Machine</h2>
      <p>Hikaru Nakamura continues to assert his dominance in blitz chess as he convincingly won the American Cup Blitz 2025, securing an additional $5,000 in prize money.</p>

      <img src="/images/anh11.jpg" alt="Hikaru Nakamura" class="w-full rounded-lg my-4" />

      <p>The tournament gathered many top players, but Nakamura demonstrated that his calculation speed and rapid chess skills remain on another level.</p>

      <h3>🔥 The Road to Victory</h3>
      <p>The tournament featured 12 rounds with a double round-robin format.</p>

      <h3>🔥 Key Highlights of Nakamura’s Performance:</h3>
      <ul>
        <li>✅ Defeated Fabiano Caruana in both games with precise endgame techniques.</li>
        <li>✅ Secured a crucial victory against Wesley So.</li>
        <li>✅ Lost only one game against Levon Aronian but avenged the loss in the rematch.</li>
      </ul>

      <h3>♟️ Memorable Games</h3>
      <h4>🎯 Classic Match Against Caruana</h4>
      <p>Nakamura capitalized on Caruana's endgame blunder, delivering a brilliant checkmate.</p>

      <img src="/images/anh13.jpg" alt="Nakamura vs Caruana" class="w-full rounded-lg my-4" />

      <h3>📌 Conclusion</h3>
      <p>Once again, Hikaru Nakamura proves that blitz chess is his territory.</p>

      <p>📢 <strong>What do you think about Nakamura’s performance? Share your thoughts below! 🚀♟️</strong></p>
    `,
  },
  {
    id: "2",
    title: "Anna Muzychuk Wins Cyprus Grand Prix On Tiebreaks",
    image: "/images/anh2.png",
    author: "Colin McGourty",
    tag: null,
    category: "Winner",
    content: `
      <h2>Anna Muzychuk Wins Cyprus Grand Prix On Tiebreaks</h2>
      <p>In a thrilling conclusion to the Cyprus Grand Prix, Ukrainian Grandmaster <strong>Anna Muzychuk</strong> emerged victorious after a tense series of tiebreaks...</p>
      <img src="/images/anh15.png" alt="Anna Muzychuk at the board" style="width:100%; border-radius: 10px; margin: 20px 0;" />
      <p><em>Anna Muzychuk focused during a critical round of the Grand Prix.</em></p>
      <p>Held in <strong>Limassol, Cyprus</strong>... (rút gọn cho ngắn gọn phần hiển thị mẫu)</p>
    `,
  },
  {
    id: "3",
    title: "Underwater Chess Tournament Held Successfully",
    image: "/images/anh4.png",
    author: "Chess.com",
    tag: null,
    category: null,
    content: "<p>An underwater chess tournament was successfully held...</p>",
  },
  {
    id: "4",
    title: "Jan's Four Knights Strategy Explained",
    image: "/images/anh3.png",
    author: "Jan Gustafsson",
    tag: null,
    category: null,
    content: "<p>Jan Gustafsson's Four Knights strategy explained in detail...</p>",
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const article = newsArticles.find((news) => news.id === id);

  const [comments, setComments] = useState([
    { username: "Carlson68853", content: "Cool!", avatar: "/images/user1.jpg" },
    { username: "Das_Batman", content: "Chess Engines have made chess boring.", avatar: "/images/user2.jpg" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      username: "Guest",
      content: newComment,
      avatar: "/images/default-avatar.png",
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  if (!article) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold">404 - Article Not Found</h2>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Left */}
        <aside className="hidden md:block md:col-span-3 bg-gray-800 p-4 rounded-lg h-fit">
          <h3 className="text-white font-semibold text-lg mb-4">🔥 Trending</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Firouzja Shines in World Rapid</li>
            <li>• Magnus vs. Gukesh: Epic Duel</li>
            <li>• AI Bot Beats Grandmasters</li>
          </ul>
        </aside>

        {/* Main Article */}
        <div className="md:col-span-6">
          <img src={article.image} alt={article.title} className="w-full rounded-lg mb-6" />
          <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
          <p className="text-gray-400 text-sm mb-2">{article.author}</p>

          <div className="text-lg" dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Comments */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
            <div className="mt-4 space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gray-800 p-4 rounded-lg">
                  <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-blue-400 font-bold">{comment.username}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* New Comment Input */}
            <div className="mt-6">
              <textarea
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none"
                rows="3"
                placeholder="Vui lòng cư xử phù hợp và tử tế..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={handleAddComment}
              >
                Đăng bình luận
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Right */}
        <aside className="hidden md:block md:col-span-3 bg-gray-800 p-4 rounded-lg h-fit">
          <h3 className="text-white font-semibold text-lg mb-4">📅 Upcoming Events</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Candidates Tournament – Apr 25</li>
            <li>• Grand Chess Tour Paris – May 3</li>
            <li>• World Cup Prep – May 20</li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default NewsDetail;
