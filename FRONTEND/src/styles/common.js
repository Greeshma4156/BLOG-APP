// src/styles/common.js
// Theme: Modern Pastel Light — Soft gradients, minimal shadows, calming aesthetic

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 min-h-screen";
export const pageWrapper = "max-w-6xl mx-auto px-6 py-12 lg:py-20";
export const section = "mb-16 last:mb-0";

// ─── Cards ────────────────────────────────────────────
export const cardClass = "bg-white/80 border border-slate-200/60 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6";
export const headingClass = "text-2xl lg:text-3xl font-bold text-slate-900 mb-4";
export const subHeadingClass = "text-xl font-semibold text-slate-800 mb-3";
export const bodyText = "text-slate-700 leading-relaxed text-base lg:text-lg";
export const mutedText = "text-sm text-slate-500";
export const linkClass = "text-blue-500 hover:text-blue-600 font-medium transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn = "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 transition-all text-sm";
export const secondaryBtn = "bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-sm";
export const ghostBtn = "text-slate-700 font-medium hover:text-blue-500 hover:bg-blue-50 transition-all px-4 py-2 rounded-lg";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 max-w-lg mx-auto shadow-sm hover:shadow-md";
export const formTitle = "text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-8";
export const labelClass = "text-sm font-semibold text-slate-700 mb-2.5 block";
export const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm";
export const formGroup = "mb-6";
export const submitBtn = "w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass = "bg-white/80 border-b border-slate-200/60 backdrop-blur-sm h-16 flex items-center sticky top-0 z-50 shadow-sm";
export const navContainerClass = "max-w-6xl mx-auto w-full flex items-center justify-between px-6";
export const navBrandClass = "text-2xl font-bold text-slate-900";
export const navLinksClass = "flex items-center gap-6 lg:gap-8";
export const navLinkClass = "text-sm lg:text-base font-medium text-slate-700 hover:text-blue-500 transition-colors px-2 py-1 rounded";
export const navLinkActiveClass = "text-blue-500 font-semibold";

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
export const editBtn = "text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all shadow-sm text-sm";
export const deleteBtn = "text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all shadow-sm text-sm";

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