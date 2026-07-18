import { useDispatch } from 'react-redux';
import { logoutUser } from '../authSlice';
import { useState } from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Code2, History,LogOut,User,Menu,X,PlusCircle,ChevronDown,Trophy} from "lucide-react";

function NavigationBar({ user, setSolvedProblemsIds }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        setSolvedProblemsIds([]);
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#0b1120]/80 backdrop-blur-lg border-b border-slate-800">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                            <Code2 size={20} />
                        </div>
                        <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">CodeHub</span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-6">
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
                        {user?.role === "admin" && (
                            <Link to="/admin-panel" className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300">
                                <PlusCircle size={16} /> Admin
                            </Link>
                        )}

                        <div className="relative group">
                           {user?.profileImage?.url ? (
                                <img
                                    src={user.profileImage.url}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover border border-slate-700 cursor-pointer hover:border-blue-500 transition-all"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white cursor-pointer hover:border-blue-500 transition-all">
                                    {user?.firstName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            
                            <div className="absolute top-12 right-0 w-48 bg-[#0f172a] border border-slate-800 shadow-2xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="px-3 py-2 text-xs text-slate-500 font-bold uppercase tracking-wider">{user?.firstName}</div>
                                <button onClick={() => navigate("/profile/me")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                                    <User size={16} /> Profile
                                </button>
                                <button onClick={() => navigate("/submission-history")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                                    <History size={16} /> History
                                </button>
                                <hr className="my-1 border-slate-800" />
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-[#0f172a] border-b border-slate-800 p-4 space-y-2">
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Home</NavLink>
                    <NavLink to="/problemSection" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Problems</NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg">Logout</button>
                </div>
            )}
        </nav>
    );
}

export default NavigationBar;