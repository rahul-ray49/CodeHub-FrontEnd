import { useEffect, useState } from "react";
import {
  Flame,
  Trophy,
  Tag,
  Hash,
  Clock3,
  ArrowRight,
  ArrowLeft,
  Code2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import NavigationBar2 from "./NavigationBar2";

const ProblemOfTheDayPage = () => {
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    fetchProblem();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);

      const diff = tomorrow - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(
          2,
          "0"
        )}m : ${String(seconds).padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchProblem = async () => {
    try {
      const { data } = await axiosClient.get("/problem/potd");
      setProblem(data?.problem);
    } catch (err) {
      console.log(err);
      alert("Failed to load today's problem. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const difficultyColor = () => {
    if (!problem) return "";

    switch (problem?.difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "hard":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-slate-700/30 text-slate-300 border border-slate-600/30";
    }
  };

  if (loading) {
    return (
      <>
      <NavigationBar2/>
      <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center text-slate-300">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium tracking-wide">Loading Today's Challenge...</p>
      </div>
      </>
    );
  }

  if (!problem) {
    return (
      <>
      <NavigationBar2/>
      
      <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
          <Flame size={36} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Challenge Unavailable</h2>
        <p className="text-slate-400 text-center max-w-md mb-8">
          We couldn't load today's problem. Please check your connection or try again later.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Return Home
        </button>
      </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar2 />

      <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-orange-500/30 selection:text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="max-w-6xl mx-auto">
        

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <Flame size={16} className="animate-pulse" />
                <span className="font-bold text-xs tracking-widest uppercase">
                  Daily Challenge
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
                Problem Of The Day
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                Consistency is the key to mastery. Solve today's featured coding challenge to improve your logic and keep your streak alive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Main Problem Card (Left Column) */}
            <div className="lg:col-span-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              {/* Badges Row */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${difficultyColor()}`}>
                  {problem?.difficulty}
                </span>

                <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-md text-yellow-400 text-xs font-semibold">
                  <Trophy size={14} />
                  <span>{problem?.score} PTS</span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-md text-slate-300 text-xs font-semibold">
                  <Hash size={14} className="text-slate-500" />
                  <span>{problem?.problemNumber}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                {problem?.title}
              </h2>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg text-blue-400">
                  <Tag size={14} />
                  <span className="capitalize text-xs font-medium tracking-wide">
                    {problem?.tags}
                  </span>
                </div>
              </div>

              {/* Description Box */}
              <div className="relative z-10 bg-slate-950/50 border-l-2 border-blue-500 rounded-r-xl p-5 sm:p-6 mb-8 text-sm sm:text-base shadow-inner">
                <h3 className="flex items-center gap-2 text-white font-semibold mb-2">
                  <Code2 size={18} className="text-blue-400" />
                  About This Challenge
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Every day, a new algorithm is selected automatically. 
                  Solve today's challenge to test your problem-solving skills, earn bonus points, and climb the leaderboard.
                </p>
              </div>

              {/* Solve Button */}
              <button
                onClick={() => navigate(`/problem/${problem._id}`)}
                className="relative z-10 group w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 rounded-xl px-8 py-4 flex justify-center items-center gap-3 font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                Solve Challenge Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Sidebar (Right Column) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Countdown Card */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>

                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-5 border border-orange-500/20">
                  <Clock3 className="text-orange-400" size={28} />
                </div>

                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Next Challenge In
                </h3>

                <div className="bg-slate-950 border border-slate-800 w-full py-5 rounded-2xl flex items-center justify-center shadow-inner mb-2">
                  <p className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-200 drop-shadow-sm">
                    {countdown}
                  </p>
                </div>
                
                <p className="text-xs text-slate-500 mt-4">
                  Problem resets nightly at 12:00 AM
                </p>

              </div>
              
              {/* Motivation/Info Card */}
              <div className="hidden lg:block bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6">
                <h4 className="font-semibold text-white mb-2 text-sm">Why solve daily?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Consistent practice is proven to improve algorithmic thinking. Spending just 20-30 minutes a day keeps your coding skills sharp and prepares you for technical interviews.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ProblemOfTheDayPage;