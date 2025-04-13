import React from "react";

const News = () => {
  // Danh sách bài viết chính
  const articles = [
    {
      title: "Bluebaum 1st Player To Win European Championship Twice",
      author: "Anthony Levin",
      date: "Mar 26, 2025",
      image: "/images/5anh.png",
      description: "Bluebaum đã trở thành kỳ thủ đầu tiên giành chức vô địch Châu Âu hai lần liên tiếp.",
      tag: "WINNER",
    },
    {
      title: "Kirill Shevchenko Receives 3-Year Ban For Cheating",
      author: "TarjeiJS",
      date: "Mar 26, 2025",
      image: "/images/anh7.png",
      description: "GM Kirill Shevchenko bị cấm thi đấu cờ vua 3 năm sau vụ gian lận.",
    },
    {
      title: "PogChamps Is Back With Star-Studded Field",
      author: "CHESScom",
      date: "Mar 26, 2025",
      image: "/images/anh8.png",
      description: "PogChamps 6 sẽ trở lại vào ngày 29 tháng 4 với dàn sao cực khủng!",
    },
    {
      title: "Nakamura Wins Another $5,000 In American Cup Blitz",
      author: "Blitz Chess",
      date: "Mar 26, 2025",
      image: "/images/anh9.png",
      description: "Hikaru Nakamura tiếp tục thể hiện đẳng cấp trong giải đấu Blitz.",
    }
  ];

  // Danh mục tin tức
  const categories = [
    "Chess Event Coverage",
    "Chess Players",
    "Chess Politics",
    "Editorials",
    "Chess.com News",
    "Misc",
    "Authors",
    "Chess Tournaments Calendar",
    "RSS",
  ];

  return (
    <div className="bg-[#1E1E1E] text-white min-h-screen p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold flex items-center mb-4">
        <span className="mr-2">📜</span> News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột chính (Danh sách tin tức) */}
        <div className="md:col-span-2">
          {articles.map((article, index) => (
            <div key={index} className="bg-[#2B2B2B] p-4 rounded-lg shadow-lg mb-6">
              {/* Hiển thị ảnh với tỷ lệ chuẩn */}
              <div className="w-full aspect-[16/9] overflow-hidden rounded-md">
                <img
                  src={article.image || "/images/default.png"} 
                  alt={article.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Nội dung bài viết */}
              <div className="mt-4">
                {article.tag && (
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-md text-sm">{article.tag}</span>
                )}
                <h2 className="text-xl font-bold mt-2 hover:text-yellow-500 cursor-pointer transition duration-200">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  <span className="text-red-400">📝 {article.author}</span> • 📅 {article.date}
                </p>
                <p className="text-gray-300 mt-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar (Danh mục & Tin nổi bật) */}
        <div className="bg-[#2B2B2B] p-4 rounded-lg shadow-lg">
          {/* Danh mục tin tức */}
          <h3 className="text-xl font-bold mb-3">News Categories</h3>
          <ul className="space-y-2 border-b border-gray-600 pb-3">
            {categories.map((category, index) => (
              <li key={index} className="hover:text-yellow-500 cursor-pointer transition duration-200">
                {category}
              </li>
            ))}
          </ul>

          {/* Tin nổi bật */}
          <h3 className="text-xl font-bold mt-4 mb-3">Top News</h3>
          {articles.slice(0, 3).map((article, index) => (
            <div key={index} className="mb-4 flex items-start">
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img 
                  src={article.image || "/images/default.png"} 
                  alt={article.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-bold hover:text-yellow-500 cursor-pointer transition duration-200">
                  {article.title}
                </h4>
                <p className="text-gray-400 text-xs">{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
