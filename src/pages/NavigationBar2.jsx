import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Code2, User, History, LogOut, Menu, X } from "lucide-react";
import { logoutUser } from "../authSlice";

function NavigationBar2() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1120] border-b border-slate-800">
      <div className="max-w-8xl mx-auto px-8 h-16 flex items-center justify-between">
        
       
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            <Code2 size={20} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CodeHub</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
         <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors ${
              isActive 
                ? "text-white border-b-2 border-blue-500" 
                : "text-slate-400 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink 
        to="/problemSection" 
        className={({ isActive }) => 
          `text-sm font-medium transition-colors ${
            isActive 
              ? "text-white border-b-2 border-blue-500" 
              : "text-slate-400 hover:text-white"
          }`
        }
      >
        problems
      </NavLink>
      <NavLink 
        to="/solved" 
        className={({ isActive }) => 
          `text-sm font-medium transition-colors ${
            isActive 
              ? "text-white border-b-2 border-blue-500" 
              : "text-slate-400 hover:text-white"
          }`
        }
      >
        solved
      </NavLink>
      <NavLink 
        to="/submission-history" 
        className={({ isActive }) => 
          `text-sm font-medium transition-colors ${
            isActive 
              ? "text-white border-b-2 border-blue-500" 
              : "text-slate-400 hover:text-white"
          }`
        }
      >
        submissions
      </NavLink>

          <div className="relative group">
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-slate-700 cursor-pointer hover:border-blue-500 transition-all"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 cursor-pointer hover:border-blue-500 transition-all">
                {user?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="absolute right-0 top-12 w-48 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
              <button onClick={() => navigate("/profile/me")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"><User size={16} /> Profile</button>
              <button onClick={() => navigate("/submission-history")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"><History size={16} /> Submissions</button>
              <div className="h-px bg-slate-800 my-1"></div>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"><LogOut size={16} /> Logout</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300 z-[60]">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Absolute Positioned Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 w-56 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in duration-200">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 rounded-lg">Home</NavLink>
          <NavLink to="/problemSection" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 rounded-lg">Problems</NavLink>
          <NavLink to="/profile/me" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 rounded-lg">Profile</NavLink>
          <div className="h-px bg-slate-800 my-1"></div>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar2;