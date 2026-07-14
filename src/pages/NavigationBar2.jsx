import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { logoutUser } from "../authSlice";
import { FaUser, FaHouse, FaCode, FaClockRotateLeft,FaCircleCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
function NavigationBar2() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#111827] relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">

        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">
            ⚡
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            CodeHub
          </h1>
        </div>

        {/* Desktop Profile */}

        <div className="hidden md:block relative group">

          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer">

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>

          </div>

          <div className="absolute right-0 top-12 mt-2 hidden group-hover:block w-48 rounded-xl overflow-hidden border border-slate-700 bg-[#111827] shadow-xl">

                         <button
                            onClick={() => navigate("/profile/me")}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-white hover:bg-slate-800 rounded-xl transition"
                          >
                            <FaUser className="text-lg" />
                            <span>Profile</span>
                          </button>
            
                          <button
                            onClick={() => navigate("/")}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-white hover:bg-slate-800 rounded-xl transition"
                          >
                            <FaHouse className="text-lg" />
                            <span>Home</span>
                          </button>
            
                          <button
                            onClick={() => navigate("/problemSection")}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-white hover:bg-slate-800 rounded-xl transition"
                          >
                            <FaCode className="text-lg" />
                            <span>Problems</span>
                          </button>
            
                          <button
                            onClick={() => navigate("/solved")}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-white hover:bg-slate-800 rounded-xl transition"
                          >
                            <FaCircleCheck className="text-lg text-white" />
                            <span>Solved</span>
                          </button>
            
                          <button
                            onClick={() => navigate("/submission-history")}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-white hover:bg-slate-800 rounded-xl transition"
                          >
                            <FaClockRotateLeft className="text-lg" />
                            <span>Submissions</span>
                          </button>
            
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 text-left px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-xl transition"
                          >
                            <MdLogout className="text-xl" />
                            <span>Logout</span>
                          </button>
            

            </div>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Dropdown */}

      {mobileMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-56 rounded-xl border border-slate-700 bg-[#111827] shadow-2xl md:hidden z-50 overflow-hidden">

          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm text-slate-400 truncate">
                {user?.email}
              </p>
            </div>

          </div>

          <button
            onClick={() => {
              navigate("/profile/me");
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
          >
            Profile
          </button>

          <button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/submission-history");
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
          >
            submissions
          </button>

          <button
            onClick={() => {
              navigate("/solved");
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
          >
            solved
          </button>

          <button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default NavigationBar2;