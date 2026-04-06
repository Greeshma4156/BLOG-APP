import { NavLink, Outlet } from "react-router";
import { pageWrapper, primaryBtn, secondaryBtn, divider } from "../styles/common";

function AuthorProfile() {
  return (
    <div className={pageWrapper}>
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-12 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl shadow-indigo-500/10">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl">✍️</span>
        </div>
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
            Author Dashboard
          </h1>

          <p className="text-gray-500 font-medium mt-3">Manage your content & grow your audience</p>
        </div>
      </div>

      {/* Author Navigation - Styled Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-3xl border border-indigo-200/50 shadow-xl backdrop-blur-sm">
        <NavLink 
          to="/articles" 
          className={({ isActive }) => (isActive ? secondaryBtn : primaryBtn.replace('px-8 py-3', 'px-6 py-2.5 w-full sm:w-auto').replace('text-sm', 'text-base'))}
        >
          📖 My Articles
        </NavLink>
        <NavLink 
          to="/addarticle" 
          className={({ isActive }) => (isActive ? primaryBtn.replace('px-8 py-3', 'px-6 py-2.5 w-full sm:w-auto').replace('text-sm', 'text-base') : secondaryBtn.replace('px-8 py-3', 'px-6 py-2.5 w-full sm:w-auto').replace('text-sm', 'text-base'))}
        >
          ✏️ Write Article
        </NavLink>
      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorProfile;