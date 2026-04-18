import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/authStore';
import { useNavigate, Link } from 'react-router';
import { pageWrapper, articleGrid, articleCardClass, articleTitle, articleExcerpt, articleMeta, timestampClass, tagClass } from '../styles/common';
import axios from 'axios';

function UserDashboard() {
  const currentUser = useAuth(state => state.currentUser);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      let res = await axios.get("https://blog-app-if8r.onrender.com/user-api/articles", { withCredentials: true });
      if (res.data.payload) setArticles(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={pageWrapper}>
      {/* Header */}
      <div className="cardClass mb-12 p-8 flex flex-col lg:flex-row items-center gap-6">
        {currentUser?.profileImageUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-sm">
            <img 
              src={currentUser.profileImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
            Welcome, {currentUser?.firstName || currentUser?.name || 'Reader'}!
          </h1>
          <p className="text-slate-600 font-medium">Latest articles for you</p>
        </div>
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
          Latest For You
        </h2>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-bold text-xl">No articles available yet.</p>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <Link 
                to={`/article/${article._id}`} 
                key={article._id} 
                className={`${articleCardClass} relative group flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all p-4`}
              >
                {/* Image */}
                {article.imageUrl && (
                  <div className="w-full h-48 rounded-2xl mb-4 overflow-hidden relative shadow-inner">
                    <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <span className={tagClass}>{article.category || 'General'}</span>
                  </div>
                )}

                {!article.imageUrl && (
                  <div className="mb-4">
                    <span className={tagClass}>{article.category || 'General'}</span>
                  </div>
                )}

                {/* Title & Excerpt */}
                <h3 className={articleTitle}>{article.title}</h3>
                <p className={articleExcerpt}>{article.content.slice(0, 100)}...</p>

                {/* Author & Read More */}
                <div className="mt-auto pt-4 border-t border-gray-100/50 flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-semibold">{article.author?.firstName || 'Author'}</span>
                  <span className="text-indigo-600 font-bold hover:underline">Read more &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;