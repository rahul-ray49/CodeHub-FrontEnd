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

      

      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 sm:py-10 lg:py-12">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-indigo-500/10 to-transparent p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12">

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Welcome to CodeHub 🚀
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Practice coding problems, improve problem-solving skills,
              and prepare for interviews with real coding challenges.
            </p>

            <Link
              to="/problemSection"
              className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
            >
              Start Solving Problems
            </Link>
          </div>

        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Problems */}
          <Link
            to="/problemSection"
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-4xl sm:text-5xl mb-4">📚</div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Problem Section
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Browse coding challenges and test your skills with curated problems.
            </p>
          </Link>

          {/* Solved Problems */}
          <Link
            to="/solved"
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-4xl sm:text-5xl mb-4">✅</div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Solved Problems
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              View all accepted solutions and track your completed challenges.
            </p>
          </Link>


           <Link
              to="/submission-history"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-4">📜</div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Submission History
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                View your previous submissions and review your coding journey.
              </p>
          </Link>

          <Link
              to="/help-page"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-4">📘</div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Help Center
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Learn how to write, format, and submit your solutions correctly on CodeHub before starting your coding journey.
              </p>
          </Link>



        </div>


        
     



        {/* Admin Cards */}
        {user?.role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 sm:mt-8">

            <Link
              to="/admin-panel"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-4">➕</div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Create Problem
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Add new coding problems, examples, constraints and test cases.
              </p>
            </Link>

            <Link
              to="/updateproblems"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-4">✏️</div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Update Problems
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Edit existing problems, update statements and manage test cases.
              </p>
            </Link>

            <Link
              to="/admin-register"
              className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-4">👤</div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Register Admin
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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