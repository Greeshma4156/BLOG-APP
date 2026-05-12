import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
  errorClass,
  pageWrapper
} from "../styles/common";

function AddArticle() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!user || user.role !== "AUTHOR") {
      toast.error("Authors only");
      return;
    }

    try {
      toast.loading("Publishing...");
      await axios.post("/author-api/articles", {
        ...data,
        author: user.userId,
      }, { withCredentials: true });

      toast.dismiss();
      toast.success("Article published!");
      navigate("/authordashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Publish failed");
    }
  };

  return (
    <div className={pageWrapper}>
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="relative flex justify-center mt-6">
        <div className={formCard + " w-full max-w-3xl"}>
          <h2 className={formTitle}>Craft Your Story</h2>
          <p className="text-gray-500 text-center mb-10 -mt-6">Share your ideas with the world.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            <div className={formGroup}>
              <label className={labelClass}>Article Title</label>
              <input 
                className={inputClass} 
                placeholder="Give it a catchy name..."
                {...register("title", { required: "Title required" })} 
              />
              {errors.title && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.title.message}</p>}
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Category</label>
              <select className={inputClass} {...register("category", { required: "Category required" })}>
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="design">UI/UX Design</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.category.message}</p>}
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Content</label>
              <textarea 
                rows="14" 
                placeholder="Start writing your masterpiece here..."
                className={inputClass + " font-serif resize-none"} 
                {...register("content", { required: "Content required" })} 
              />
              {errors.content && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.content.message}</p>}
            </div>

            <button className={submitBtn + " py-4 text-lg font-extrabold mt-6 w-full"} type="submit">
              Publish to the World
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;

