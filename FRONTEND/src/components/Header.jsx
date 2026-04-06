import { NavLink, useNavigate } from "react-router";
import { navbarClass, navContainerClass, navBrandClass, navLinksClass, navLinkClass, navLinkActiveClass, primaryBtn, ghostBtn } from "../styles/common";
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
         <NavLink to="/" className={({isActive}) => `${navBrandClass} ${isActive ? 'font-bold text-slate-900' : ''}`}>
           BlogApp
         </NavLink>

         <nav className={navLinksClass}>
           <NavLink to="/" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Home</NavLink>
           
           {!isAuthenticated ? (
             <>
               <NavLink to="/login" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Login</NavLink>
               <NavLink to="/register" className={`${primaryBtn} text-sm px-5 py-2.5`}>Get Started</NavLink>
             </>
           ) : (
             <>
               {currentUser?.role === "AUTHOR" && (
                 <NavLink to="/authordashboard" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Dashboard</NavLink>
               )}
               {currentUser?.role === "USER" && (
                 <NavLink to="/userdashboard" className={({isActive}) => isActive ? navLinkActiveClass : navLinkClass}>Dashboard</NavLink>
               )}
               <button onClick={handleLogout} className={`${ghostBtn} hover:text-red-500`}>
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