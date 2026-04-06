// src/styles/common.js
// Theme: Vibrant Glassmorphic Light — Animated gradients, backdrop filters, heavy shadows, modern typography.

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-gradient-to-br from-[#f0f4ff] via-[#faf5ff] to-[#fff0f5] min-h-screen relative overflow-hidden";
export const pageWrapper = "max-w-6xl mx-auto px-6 py-20 relative z-10";
export const section = "mb-16";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 tracking-tight leading-tight mb-4";
export const headingClass = "text-3xl font-bold text-gray-900 tracking-tight";
export const subHeadingClass = "text-xl font-semibold text-gray-800 tracking-tight";
export const bodyText = "text-gray-600 leading-relaxed text-lg";
export const mutedText = "text-sm text-gray-500";
export const linkClass = "text-indigo-600 font-semibold hover:text-indigo-800 transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all cursor-pointer text-sm tracking-wide";
export const secondaryBtn =
  "bg-white/80 backdrop-blur-md border border-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-white shadow-sm hover:shadow hover:-translate-y-0.5 transition-all cursor-pointer text-sm tracking-wide";
export const ghostBtn = "text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer text-sm px-4 py-2 hover:bg-indigo-50 rounded-full";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl shadow-purple-500/10";
export const formTitle = "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-8";
export const labelClass = "text-sm font-bold text-gray-700 mb-2 block";
export const inputClass =
  "w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-inner";
export const formGroup = "mb-5 text-left";
export const submitBtn =
  "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-2xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all cursor-pointer mt-4 text-base tracking-wide transform hover:-translate-y-0.5";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/70 backdrop-blur-2xl border-b border-white/50 h-[72px] flex items-center sticky top-0 z-50 shadow-sm";
export const navContainerClass = "max-w-6xl mx-auto w-full flex items-center justify-between px-6";
export const navBrandClass = "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 tracking-tight";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-[0.95rem] font-semibold text-gray-600 hover:text-indigo-600 transition-colors";
export const navLinkActiveClass = "text-[0.95rem] font-bold text-indigo-600";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10";
export const articleCardClass =
  "group bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col cursor-pointer";
export const articleTitle = "text-xl font-bold text-gray-900 leading-snug tracking-tight mb-2 group-hover:text-indigo-600 transition-colors";
export const articleExcerpt = "text-base text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3";
export const articleMeta = "text-xs font-semibold text-gray-400 uppercase tracking-widest";
export const timestampClass = "text-xs font-medium text-gray-500 flex items-center gap-1.5";
export const tagClass = "text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 rounded-full uppercase tracking-wider w-fit shadow-md shadow-indigo-500/30";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-4xl mx-auto px-6 py-20 relative z-10";
export const articleHeader = "mb-14 flex flex-col gap-6 items-center text-center";
export const articleCategory = "text-sm font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full inline-block";
export const articleMainTitle = "text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-center gap-4 py-6 text-base text-gray-500 w-full border-t border-b border-gray-200/60 mt-6";
export const authorInfo = "flex items-center gap-3 font-bold text-gray-900";
export const articleContent = "text-gray-800 leading-[2] text-lg md:text-xl whitespace-pre-line mt-10 font-serif";
export const articleFooter = "border-t border-gray-200/60 mt-16 pt-8 flex items-center justify-between";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-4 mt-8 justify-center";
export const editBtn = "bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all text-sm";
export const deleteBtn = "bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-red-500/30 hover:scale-105 transition-all text-sm";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100/80 backdrop-blur border border-emerald-200 text-emerald-700 shadow-sm";
export const articleStatusDeleted =
  "absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full bg-red-100/80 backdrop-blur border border-red-200 text-red-700 shadow-sm";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-red-50 text-red-600 border border-red-100 rounded-2xl px-5 py-4 text-sm font-medium shadow-sm mb-6";
export const successClass =
  "bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl px-5 py-4 text-sm font-medium shadow-sm mb-6";
export const loadingClass = "text-indigo-600 font-bold text-lg animate-pulse text-center py-20";
export const emptyStateClass = "text-center text-gray-400 py-24 text-lg font-medium";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-gray-200/60 my-12";