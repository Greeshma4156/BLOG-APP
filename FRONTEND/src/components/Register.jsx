import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { errorClass, loadingClass, submitBtn } from "../styles/common";
import { useState } from "react";
import { useEffect } from "react";

function Register() {

  const { register, handleSubmit, watch, formState:{errors} } = useForm();

  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localPreview, setLocalPreview] = useState(null);

  const watchProfileImage = watch("profileImageUrl");

  useEffect(() => {
    if (watchProfileImage && watchProfileImage.length > 0) {
      const file = watchProfileImage[0];
      if (["image/jpeg", "image/png"].includes(file.type)) {
        if (file.size <= 2 * 1024 * 1024) {
          const previewUrl = URL.createObjectURL(file);
          setLocalPreview(previewUrl);
          setError(null);
          return () => URL.revokeObjectURL(previewUrl);
        } else {
          setError("File size must be less than 2MB");
        }
      } else {
        setError("Only JPG or PNG allowed");
      }
    } else {
      setLocalPreview(null);
    }
  }, [watchProfileImage]);

  const navigate = useNavigate();


  const onUserRegister = async (newUser) => {
  
    setLoading(true);
    
    // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add role override
        userObj.role = role.toUpperCase();
        //add all fields to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        if (profileImageUrl && profileImageUrl[0]) {
          formData.append("profileImageUrl", profileImageUrl[0]);
        }

    

    
    try {

     // user registration
      if(role === "user"){

        let resObj = await axios.post(
          "/user-api/users",
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data' 
            } 
          }
        );

        if(resObj.status === 201){
          navigate("/Login");
        }
      }

      // author registration
      if(role === "author"){

        let resObj = await axios.post(
          "/author-api/users",
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data' 
            } 
          }
        );

        if(resObj.status === 201){
          navigate("/Login");
        }
      }

    } catch(err){
      console.log(err)
      setError(err.response?.data?.error || "Registration failed");
    } finally{
      setLoading(false);
    }
  }


  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center relative">
         <p className="text-xl font-bold text-indigo-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-6">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72  rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72  rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72  rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-xl relative z-10 glass-panel p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-500/10">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 text-center mb-8">
          Join Us
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl px-5 py-4 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserRegister)} className="space-y-6">
          <div className="flex justify-center gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer p-4 border border-indigo-100 rounded-2xl bg-white/50 hover:bg-white flex-1 justify-center transition">
              <input type="radio" value="user" {...register("role",{required:true})} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span className="font-bold text-gray-700">Reader</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-4 border border-indigo-100 rounded-2xl bg-white/50 hover:bg-white flex-1 justify-center transition">
              <input type="radio" value="author" {...register("role",{required:true})} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span className="font-bold text-gray-700">Author</span>
            </label>
          </div>
          {errors.role && <p className="text-red-500 text-sm font-semibold -mt-4 text-center">Please select a role</p>}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First name"
                {...register("firstName",{required:true})}
                className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">Required</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName",{required:true})}
                className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email",{required:true})}
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">Email is required</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Create password"
              {...register("password",{required:true,minLength:6})}
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">Minimum 6 characters</p>}
          </div>

          <div className="bg-white/40 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-700 block mb-1">Profile Picture (Optional)</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                {...register("profileImageUrl")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>
            {localPreview && (
              <img
                src={localPreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-full border-2 border-indigo-200 shadow-sm"
              />
            )}
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 text-lg mt-2">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;
