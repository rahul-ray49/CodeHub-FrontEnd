import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from '../authSlice';


const LandingPage = () => {

    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handleLogout=()=>{
         dispatch(logoutUser())
    }


  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-[#111827] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">
              ⚡
            </div>

            <h1 className="text-3xl font-bold">
              CodeHub
            </h1>
          </div>

          <div className="relative group">
  
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer">
              
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>

            </div>

            <div className="absolute right-0 mt-2 hidden group-hover:block w-44 bg-[#111827] border border-slate-700 rounded-xl overflow-hidden">
              
              <button
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-indigo-500/10 to-transparent p-10 mb-12">

          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to CodeHub 🚀
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Practice coding problems, improve problem-solving skills,
              and prepare for interviews with real coding challenges.
            </p>

            <Link
              to="/problemSection"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
            >
              Start Solving Problems
            </Link>
          </div>

        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Problems */}
          <Link
            to="/problemSection"
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition-all"
          >
            <div className="text-5xl mb-4">📚</div>

            <h2 className="text-2xl font-bold mb-3">
              Problem Section
            </h2>

            <p className="text-slate-400">
              Browse coding challenges and test your skills with curated problems.
            </p>
          </Link>

          {/* Solved Problems */}
          <Link
            to="/solved"
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-green-500 transition-all"
          >
            <div className="text-5xl mb-4">✅</div>

            <h2 className="text-2xl font-bold mb-3">
              Solved Problems
            </h2>

            <p className="text-slate-400">
              View all accepted solutions and track your completed challenges.
            </p>
          </Link>

        </div>

        {/* Admin Cards */}
        {user?.role === "admin" && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <Link
              to="/admin-panel"
              className="bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition-all"
            >
              <div className="text-5xl mb-4">➕</div>

              <h2 className="text-2xl font-bold text-blue-400 mb-3">
                Create Problem
              </h2>

              <p className="text-slate-400">
                Add new coding problems, examples, constraints and test cases.
              </p>
            </Link>

            <Link
              to="/updateproblems"
              className="bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-yellow-500 transition-all"
            >
              <div className="text-5xl mb-4">✏️</div>

              <h2 className="text-2xl font-bold text-yellow-400 mb-3">
                Update Problems
              </h2>

              <p className="text-slate-400">
                Edit existing problems, update statements and manage test cases.
              </p>
            </Link>

            <Link
              to="/admin-register"
              className="bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-emerald-500 transition-all"
            >
              <div className="text-5xl mb-4">👤</div>

              <h2 className="text-2xl font-bold text-emerald-400 mb-3">
                Register Admin
              </h2>

              <p className="text-slate-400">
                Create a new administrator account to manage problems, users, and platform settings.
              </p>
            </Link>

          </div>
        )}

      </div>
    </div>
  );
};

export default LandingPage;