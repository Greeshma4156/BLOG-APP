import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = useAuth(state => state.login);
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const currentUser = useAuth(state => state.currentUser);
  const error = useAuth(state => state.error);
  const navigate = useNavigate();

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser?.role === "USER") {
        navigate("/userdashboard");
      }
      if (currentUser?.role === "AUTHOR") {
        navigate("/authordashboard");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-6">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10 p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-500/10">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 text-center mb-8">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl px-5 py-4 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email", { required: true })} 
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">Email is required</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              {...register("password", { required: true })} 
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">Password is required</p>}
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 text-lg mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;