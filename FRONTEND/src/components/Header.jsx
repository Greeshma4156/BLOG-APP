import { NavLink, useNavigate } from "react-router";
import { navbarClass, navContainerClass, navBrandClass, navLinksClass, navLinkClass, navLinkActiveClass } from "../styles/common";
import { useAuth } from "../store/authStore";

function Header() {
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const currentUser = useAuth(state => state.currentUser);
  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
     <header className={navbarClass}>
       <div className={navContainerClass}>
         <NavLink to="/" className={navBrandClass}>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-black">B</div>
             <span>BlogApp</span>
           </div>
         </NavLink>

         <nav className={navLinksClass}>
           <NavLink to="/" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Home</NavLink>
           
           {!isAuthenticated ? (
             <>
               <NavLink to="/login" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Login</NavLink>
               <NavLink to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition">Get Started</NavLink>
             </>
           ) : (
             <>
               {currentUser?.role === "AUTHOR" && (
                 <NavLink to="/authordashboard" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Dashboard</NavLink>
               )}
               {currentUser?.role === "USER" && (
                 <NavLink to="/userdashboard" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Dashboard</NavLink>
               )}
               <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 text-[0.95rem] font-semibold transition">
                 Logout
               </button>
             </>
           )}
         </nav>
       </div>
     </header>
  );
}

export default Header;