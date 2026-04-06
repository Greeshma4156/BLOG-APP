import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore.js";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass
} from "../styles/common.js";

function ArticleById() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`http://localhost:4000/user-api/articles/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, article]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `http://localhost:4000/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true },
      );

      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.status === 400) {
        toast(msg); 
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`);
  };

  const addComment = async (data) => {
    try {
      const userId = user._id || user.id || user.userId;
      const payload = {
        user: userId,
        comment: data.comment
      }
      
      const res = await axios.post(`http://localhost:4000/user-api/articles/${id}/comments`, payload, { withCredentials: true });
      
      // Update article locally
      setArticle({
        ...article,
        comments: [...article.comments, { 
          user: { email: user.email || 'Anonymous', firstName: user.firstName || user.name }, 
          comment: data.comment,
          _id: res.data.payload._id
        }]
      });
      
      toast.success("Comment added!");
      reset();
    } catch (err) {
      console.error('Comment error:', err);
      toast.error(err.response?.data?.message || err.response?.data?.error || "Failed to add comment");
    }
  };

  if (loading) return <div className={loadingClass}>Loading article...</div>;
  if (error) return <div className={errorClass}>{error}</div>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {article.imageUrl && (
        <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl relative">
           <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8 pb-10">
              <span className="bg-white/90 backdrop-blur text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {article.category}
              </span>
           </div>
        </div>
      )}
      {!article.imageUrl && (
        <div className="mb-8">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {article.category}
          </span>
        </div>
      )}

      <div className={articleHeader}>
        <h1 className={articleMainTitle}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">
              {article.author?.firstName?.charAt(0) || "A"}
            </div>
            By {article.author?.firstName || "Author"}
          </div>

          <div className="text-gray-400 font-medium">{formatDate(article.createdAt)}</div>
        </div>
      </div>

      <div className={articleContent}>{article.content}</div>

      {user?.role === "AUTHOR" && user.userId === (article.author?._id || article.author) && (
        <div className="border-t border-gray-200 mt-16 pt-8 flex items-center gap-4">
          <button className={editBtn} onClick={() => editArticle(article)}>
            ✏️ Edit Article
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "🗑️ Delete Article" : "♻️ Restore Article"}
          </button>
        </div>
      )}
      
      {/* Comments Section */}
      <div className="mt-20">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Responses ({article.comments?.length || 0})</h3>
        
        {user?.role === "USER" && (
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl shadow-indigo-500/10 mb-10">
            <form onSubmit={handleSubmit(addComment)} className="flex flex-col gap-4">
              <textarea
                rows="3"
                {...register("comment", { required: true })}
                className={inputClass + " resize-none bg-white"}
                placeholder="What are your thoughts?"
              />
              <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full self-end hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30 transition-all">
                Publish Response
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {article.comments?.map((comment, index) => (
            <div key={index} className="bg-white/40 p-6 rounded-3xl border border-gray-100/50 shadow-sm relative pl-16">
              <div className="absolute left-6 top-6 w-10 h-10 bg-gradient-to-tr from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                {comment.user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <p className="font-bold text-gray-900 mb-1">
                {comment.user?.email || "User"}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">{comment.comment}</p>
            </div>
          ))}
          
          {(!article.comments || article.comments.length === 0) && (
            <div className="text-center py-12 bg-white/30 rounded-3xl border border-dashed border-gray-300 text-gray-500">
               No responses yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>

      <div className={articleFooter}>
         <span className="font-medium">Last updated: {formatDate(article.updatedAt)}</span>
      </div>
    </div>
  );
}

export default ArticleById;