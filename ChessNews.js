import React from "react";
import { Link } from "react-router-dom";

const newsArticles = [
  {
    id: 1,
    title: "Nakamura Wins Another $5,000 In American Cup Blitz",
    image: "/images/anh1.jpg",
    author: "Anthony Levin",
    tag: "NM",
    category: "Blitz Winner",
  },
  {
    id: 2,
    title: "Anna Muzychuk Wins Cyprus Grand Prix On Tiebreaks",
    image: "/images/anh2.png",
    author: "Colin McGourty",
    tag: null,
    category: "Winner",
  },
  {
    id: 3,
    title: "Underwater Chess Tournament Held Successfully",
    image: "/images/anh4.png",
    author: "Chess.com",
    tag: null,
    category: null,
  },
  {
    id: 4,
    title: "Jan's Four Knights Strategy Explained",
    image: "/images/anh3.png",
    author: "Jan Gustafsson",
    tag: null,
    category: null,
  },
];

const ChessNews = () => {
  return (
    <section className="bg-gray-900 text-white py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Follow what’s happening in Chess Today.
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <Link to={`/news/${article.id}`} className="block">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="rounded-lg w-full h-52 object-cover"
                />
                {article.category && (
                  <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs font-bold">
                    {article.category}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold mt-4">{article.title}</h3>

              <div className="text-gray-400 text-sm mt-1 flex items-center">
                {article.tag && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold mr-2">
                    {article.tag}
                  </span>
                )}
                <span>{article.author}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChessNews;
