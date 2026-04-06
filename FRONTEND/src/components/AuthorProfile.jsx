import { NavLink, Outlet } from "react-router";

function AuthorProfile() {
  return (
    <div className="relative min-h-[calc(100vh-72px)] flex flex-col items-center p-6 bg-gradient-to-b from-slate-50 to-blue-50/50">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Welcome Header */}
      <div className="w-full max-w-4xl relative z-10 glass-panel mb-12 p-8 flex flex-col lg:flex-row items-center gap-6 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-500/10">
        
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Author Dashboard
          </h1>
          <p className="text-slate-700 font-medium mt-2">Manage articles & audience</p>
        </div>
      </div>

      {/* Author Navigation - Styled Buttons */}
      <div className="w-full max-w-4xl relative z-10 flex flex-col sm:flex-row gap-4 mb-12 p-4 rounded-3xl border border-indigo-200/50 shadow-xl backdrop-blur-sm bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <NavLink
          to="/articles"
          className={({ isActive }) =>
            `w-full sm:w-auto text-center font-bold rounded-xl transition-all ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-purple-700 px-6 py-3"
                : "bg-white/60 text-gray-900 border border-gray-200 shadow-md hover:bg-white/80 px-6 py-3"
            }`
          }
        >
          📖 My Articles
        </NavLink>
        <NavLink
          to="/addarticle"
          className={({ isActive }) =>
            `w-full sm:w-auto text-center font-bold rounded-xl transition-all ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-purple-700 px-6 py-3"
                : "bg-white/60 text-gray-900 border border-gray-200 shadow-md hover:bg-white/80 px-6 py-3"
            }`
          }
        >
          ✏️ Write Article
        </NavLink>
      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl h-px bg-gray-200/50 mb-8"></div>

      {/* Nested route content */}
      <div className="w-full max-w-4xl relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;