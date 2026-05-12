import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/authStore.js";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  pageWrapper,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Auth guard + fetch article if needed
  useEffect(() => {
    if (!user || user.role !== "AUTHOR") {
      toast.error("Access denied. Authors only.");
      navigate("/");
      return;
    }

    const loadArticle = async () => {
      if (!id) {
        toast.error("No article ID");
        navigate("/");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`/user-api/articles/${id}`, { withCredentials: true });
        const articleData = res.data.payload;
        setArticle(articleData);
        setValue("title", articleData.title);
        setValue("category", articleData.category);
        setValue("content", articleData.content);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load article");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.title) {
      // Use state if available (back compat)
      setArticle(location.state);
      setValue("title", location.state.title);
      setValue("category", location.state.category);
      setValue("content", location.state.content);
    } else {
      loadArticle();
    }
  }, [id, location.state, user, navigate, setValue]);

  const updateArticle = async (data) => {
    if (loading || !article) return;

    try {
      toast.loading("Updating article...");
      data.articleId = id;
      const res = await axios.put("/author-api/articles", data, { withCredentials: true });
      toast.dismiss();
      toast.success("Article updated successfully!");
      navigate(`/article/${id}`, { state: res.data.payload });
    } catch (err) {
      toast.dismiss();
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update article");
    }
  };

  if (loading) {
    return <div className={`${pageWrapper} mt-10 text-center font-bold text-indigo-600 animate-pulse`}>Loading...</div>;
  }

  return (
    <div className={pageWrapper}>
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="relative flex justify-center mt-6">
        <div className={formCard + " w-full max-w-3xl"}>
          <h2 className={formTitle}>Refine Your Story</h2>
          <p className="text-gray-500 text-center mb-10 -mt-6">Make it even better.</p>

          <form onSubmit={handleSubmit(updateArticle)} className="space-y-6 flex flex-col">
            {/* Title */}
            <div className={formGroup}>
              <label className={labelClass}>Article Title</label>
              <input className={inputClass} {...register("title", { required: "Title required" })} />
              {errors.title && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className={formGroup}>
              <label className={labelClass}>Category</label>
              <select className={inputClass} {...register("category", { required: "Category required" })}>
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="design">UI/UX Design</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.category.message}</p>}
            </div>

            {/* Content */}
            <div className={formGroup}>
              <label className={labelClass}>Content</label>
              <textarea rows="14" className={inputClass + " font-serif resize-none"} {...register("content", { required: "Content required" })} />
              {errors.content && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.content.message}</p>}
            </div>

            <button type="submit" className={submitBtn + " py-4 text-lg font-extrabold mt-6 w-full"} disabled={loading}>
              Update Article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditArticle;

