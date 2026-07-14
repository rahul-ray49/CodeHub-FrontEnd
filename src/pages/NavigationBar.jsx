import { useDispatch } from 'react-redux';
import { logoutUser } from '../authSlice';
import { Link, NavLink } from 'react-router';
import { useState } from "react";
import { useNavigate } from 'react-router';
import { FaUser, FaHouse, FaCode, FaClockRotateLeft,FaCircleCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import {
  HiOutlineMenu,
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineChevronRight,
  HiOutlineX,
  HiMenu,
} from "react-icons/hi";
 function NavigationBar({user,setSolvedProblemsIds}){
 
            const [menuOpen, setMenuOpen] = useState(false);
            const dispatch=useDispatch();
            const navigate=useNavigate();
            
            const handleLogout = () => {
                  dispatch(logoutUser());
                  setSolvedProblemsIds([]);
                  setMenuOpen(false);
                  // Clear solved problems on logout
            };

    return (
        <>
          {/* Navbar */}
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 relative">
        <div className="flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white hover:text-blue-400 transition"
        >
          <div className='flex items-center gap-3'>

           <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">
              ⚡
            </div>
          <div>CodeHub</div>
          </div>
        </NavLink>
         <div className='hidden md:flex items-center gap-5'>
          <Link to="/">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Return to Home</button>
          </Link>
          {
          user?.role==="admin"&&(
             <Link to="/admin-panel">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Create Problem Section</button>
          </Link>
          )
          }
           <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>

          <div className="absolute top-10 right-0 w-40 bg-slate-900 border border-slate-700 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            
            <button
                onClick={() => navigate("/profile")}
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
                onClick={() => navigate("/solved-problems")}
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
      </div>
      <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
              md:hidden
              text-white
              text-3xl
              p-2
              rounded-lg
              hover:bg-slate-800
              transition
          "
      >
        <HiMenu size={30}/>
      </button>
      </div>
      {
      menuOpen && (

            <div
          className="
            absolute
            top-[calc(100%+12px)]
            right-4
            w-72
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            shadow-2xl
            overflow-hidden
            z-50
            animate-in
          "
        >

          {/* User */}

          <div className="px-5 py-4 border-b border-slate-700 bg-slate-800">

            <p className="text-xs text-slate-400">
              Signed in as
            </p>

            <p className="font-semibold text-white mt-1">
              {user?.firstName}
            </p>

          </div>

          {/* Home */}

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              items-center
              gap-3
              px-5
              py-4
              hover:bg-slate-800
              transition
            "
          >

            <HiOutlineHome className="text-blue-400 text-xl"/>

            Home

          </Link>

          {/* Admin */}

          {
            user?.role==="admin" && (

              <Link
                to="/admin-panel"
                onClick={()=>setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-4
                  hover:bg-slate-800
                  transition
                "
              >

                <HiOutlinePlusCircle className="text-indigo-400 text-xl"/>

                Create Problem

              </Link>

            )
          }

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-4
              border-t
              border-slate-700
              hover:bg-red-500/10
              text-red-400
              transition
            "
          >

           <HiOutlineLogout className="text-xl" />

            Logout

          </button>

        </div>

      )
    }

    </nav>
        
        </>
    )
}
export default NavigationBar;