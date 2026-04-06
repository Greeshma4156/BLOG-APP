import { Link } from "react-router";

function Home() {
  return (
    <div className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-blue-50/50 py-20 lg:py-32">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-4xl px-6 lg:px-8 text-center glass-panel p-12 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-500/10">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 mb-6">
          Modern Blog Platform
        </h1>
        <p className="mx-auto max-w-2xl mb-12 text-lg text-gray-700 leading-relaxed">
          Share your stories, engage with readers, and discover new perspectives in a clean, modern interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 text-lg text-center"
          >
            Start Writing
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto bg-white/60 border border-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl shadow-md hover:bg-white/80 transition-all text-lg text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;