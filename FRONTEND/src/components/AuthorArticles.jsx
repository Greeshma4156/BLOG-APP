import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStatus = async (articleId, currentStatus) => {
    if (!window.confirm(`Are you sure? ${currentStatus ? 'This will soft-delete the article (can be restored).' : 'This will restore the article.'}`)) return;

    try {
      await axios.patch(`/author-api/articles/${articleId}/status`, { 
        isArticleActive: !currentStatus 
      }, { withCredentials: true });
      
      setArticles(articles.map(a => a._id === articleId ? { ...a, isArticleActive: !currentStatus } : a));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    if (!user) {
      setError('Please login to view your articles.');
      return;
    }

    const userId = user._id || user.id || user.userId;
    if (!userId) {
      setError('User ID not found. Please login again.');
      return;
    }

    const getAuthorArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/author-api/articles/${userId}`, { withCredentials: true });
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold text-xl animate-pulse">Loading articles...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">{error}</div>;

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-blue-50/50">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Dashboard Header */}
      <div className="w-full max-w-5xl relative z-10 glass-panel mb-12 p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-500/10">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 mb-2">
          Your Articles Dashboard
        </h1>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl">
          Manage your published content, toggle visibility, and track engagement.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
          <span>{articles.filter(a => a.isArticleActive).length} Active</span>
          <span>•</span>
          <span>{articles.filter(a => !a.isArticleActive).length} Drafts/Deleted</span>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="w-full max-w-5xl text-center p-12 text-gray-700 text-lg font-medium bg-white/40 rounded-3xl border border-dashed border-gray-300 shadow-inner">
          No articles found. Create your first one!
        </div>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="relative group/art flex flex-col glass-panel p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-indigo-500/10 hover:shadow-xl transition-all">
              {/* Image */}
              {article.imageUrl && (
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative">
                  <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800`}>
                    {article.category || 'General'}
                  </span>
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${article.isArticleActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {article.isArticleActive ? "ACTIVE" : "DELETED"}
                  </span>
                </div>
              )}

              {!article.imageUrl && (
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                    {article.category || 'General'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${article.isArticleActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {article.isArticleActive ? "ACTIVE" : "DELETED"}
                  </span>
                </div>
              )}

              {/* Title & Excerpt */}
              <div className="flex flex-col gap-2 flex-grow">
                <p className="text-lg font-bold text-gray-900">{article.title}</p>
                <p className="text-gray-700 text-sm">{article.content.slice(0, 100)}...</p>
              </div>

              {/* Meta */}
              <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                <span>By You</span>
                <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
              </div>

              {/* Bottom buttons */}
              <div className="mt-3 flex flex-col gap-2 opacity-0 group-hover/art:opacity-100 transition-all duration-200">
                <button 
                  onClick={() => navigate(`/edit-article/${article._id}`, { state: article })}
                  className="w-full text-emerald-600 hover:text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 shadow-sm transition-all"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => toggleStatus(article._id, article.isArticleActive)}
                  className="w-full text-red-600 hover:text-red-700 font-bold text-xs px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 shadow-sm transition-all"
                >
                  {article.isArticleActive ? "🗑️ Delete" : "↺ Restore"}
                </button>
                {(article.comments || []).length > 0 && (
                  <button 
                    onClick={async () => {
                      try {
                        const res = await axios.get(`/author-api/articles/${article._id}/comments`, { withCredentials: true });
                        alert(`Comments (${res.data.payload.comments.length}):\n\n` + 
                          res.data.payload.comments.map(c => 
                            `${c.user?.firstName || 'User'} (${c.user?.email}): ${c.comment}`
                          ).join('\n\n')
                        );
                      } catch (err) {
                        alert('Failed to fetch comments: ' + (err.response?.data?.message || err.message));
                      }
                    }}
                    className="w-full text-blue-600 hover:text-blue-700 font-bold text-xs px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-sm transition-all"
                  >
                    💬 View Comments ({(article.comments || []).length})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorArticles;
