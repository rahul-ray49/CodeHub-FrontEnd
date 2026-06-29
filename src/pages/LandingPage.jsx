import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from '../authSlice';
import Footer from "../components/footer/Footer";
import NavigationBar2 from "./NavigationBar2";


const LandingPage = () => {

    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handleLogout=()=>{
         dispatch(logoutUser())
    }


  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      
      {/* Navbar */}
      <NavigationBar2/>

      

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
        <div className="grid md:grid-cols-4 gap-8">

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


           <Link
              to="/submission-history"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-yellow-500 transition-all"
            >
              <div className="text-5xl mb-4">📜</div>

              <h2 className="text-2xl font-bold mb-3">
                Submission History
              </h2>

              <p className="text-slate-400">
                View your previous submissions and review your coding journey.
              </p>
          </Link>

          <Link
              to="/help-page"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">📘</div>

              <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                Help Center
              </h2>

              <p className="text-slate-400">
                Learn how to write, format, and submit your solutions correctly on CodeHub before starting your coding journey.
              </p>
          </Link>



        </div>


        
     



        {/* Admin Cards */}
        {user?.role === "admin" && (
          <div className="grid md:grid-cols-4 gap-8 mt-8">

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

      {/* Footer */}
 
      <Footer/>


    </div>
  );
};

export default LandingPage;