import React from 'react'

import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { useAuth } from '../store/authStore';
import {
  pageWrapper, 
  articleGrid, 
  articleCardClass, 
  articleTitle, 
  articleExcerpt, 
  articleMeta, 
  timestampClass, 
  tagClass,
  loadingClass,
  emptyStateClass
} from '../styles/common';

function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth(state => state.currentUser);

  const fetchData = async () => {
    try {
      const [articlesRes, statsRes] = await Promise.all([
        axios.get('/admin-api/articles', { withCredentials: true }),
        axios.get('/admin-api/stats', { withCredentials: true })
      ]);
      setArticles(articlesRes.data.payload || []);
      setStats(statsRes.data.payload || {});
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className={loadingClass}>Loading admin dashboard...</div>;

  return (
    <div className={pageWrapper}>
      {/* Welcome Header */}
      <div className="cardClass mb-12 p-8 flex flex-col lg:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-sm">
          ⚙️
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 font-medium">Manage articles and stats</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-3xl border border-emerald-200 shadow-xl text-center">
          <div className="text-3xl font-black text-emerald-600 mb-2">{stats.active || 0}</div>
          <div className="text-emerald-700 font-bold text-sm uppercase tracking-wider">Active Articles</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-3xl border border-yellow-200 shadow-xl text-center">
          <div className="text-3xl font-black text-yellow-600 mb-2">{stats.pending || 0}</div>
          <div className="text-yellow-700 font-bold text-sm uppercase tracking-wider">Pending Review</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-3xl border border-indigo-200 shadow-xl text-center">
          <div className="text-3xl font-black text-indigo-600 mb-2">{stats.total || 0}</div>
          <div className="text-indigo-700 font-bold text-sm uppercase tracking-wider">Total Articles</div>
        </div>
      </div>

      {/* Articles Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
          All Articles
        </h2>
        {articles.length === 0 ? (
          <div className={emptyStateClass + ' bg-white/40 rounded-3xl border border-dashed border-gray-300'}>
            No articles to moderate.
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <div key={article._id} className={articleCardClass}>
                {article.imageUrl && (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl mb-4 overflow-hidden relative shadow-inner">
                    <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={tagClass}>{article.category || 'General'}</span>
                    </div>
                  </div>
                )}
                <h3 className={articleTitle}>{article.title}</h3>
                <p className={articleExcerpt}>{article.content?.slice(0, 100)}...</p>
                <div className="mt-auto pt-4 border-t border-gray-100/50 flex justify-between items-center text-sm">
                  <span className={articleMeta}>By {article.author?.firstName}</span>
                  <Link to={`/article/${article._id}`} className={timestampClass}>View →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

