import { useEffect, useState } from "react";
import {
  Flame,
  Trophy,
  Tag,
  Hash,
  Clock3,
  ArrowRight,
  ArrowLeft
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
                setProblem(data.problem);
              } catch (err) {
                console.log(err);
              } finally {
                setLoading(false);
              }
            };

            const difficultyColor = () => {
              if (!problem) return "";

              switch (problem.difficulty) {
                case "easy":
                  return "bg-green-500/20 text-green-400";

                case "medium":
                  return "bg-yellow-500/20 text-yellow-400";

                case "hard":
                  return "bg-red-500/20 text-red-400";

                default:
                  return "bg-slate-700 text-white";
              }
            };

            if (loading) {
              return (
                <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white text-lg sm:text-xl">
                  Loading Today's Challenge...
                </div>
              );
            }

            if (!problem) {
              return (
                <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-red-400 text-lg sm:text-xl">
                  Unable to load today's challenge.
                </div>
              );
            }

            return (
              <>
              <NavigationBar2/>

              <div className="min-h-screen bg-[#0B1120] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-white">
                
                <div className="max-w-5xl mx-auto">

                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
                  >
                    <ArrowLeft size={18} />
                    Back to Home
                  </button>

                  {/* Header */}

                  <div className="text-center mb-10">

                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 sm:px-6 py-2 text-orange-400 mb-5">

                      <Flame size={20} />

                      <span className="font-semibold text-sm sm:text-base">
                        Today's Challenge
                      </span>

                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                      Problem Of The Day
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                      Solve today's featured coding challenge and improve your
                      consistency every single day.
                    </p>

                  </div>

                  {/* Main Card */}

                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl">

                    {/* Top Badges */}

                    <div className="flex flex-wrap gap-3 mb-8">

                      <span
                        className={`px-4 py-2 rounded-full font-semibold text-sm ${difficultyColor()}`}
                      >
                        {problem.difficulty.toUpperCase()}
                      </span>

                      <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-yellow-400 text-sm">

                        <Trophy size={18} />

                        <span>{problem.score} Points</span>

                      </div>

                      <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sky-400 text-sm">

                        <Hash size={18} />

                        <span>#{problem.problemNumber}</span>

                      </div>

                    </div>

                    {/* Title */}

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6">
                      {problem.title}
                    </h2>

                    {/* Tag */}

                    <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-3 rounded-xl mb-8">

                      <Tag size={18} />

                      <span className="capitalize text-sm sm:text-base">
                        {problem.tags}
                      </span>

                    </div>

                    {/* Description */}

                    <div className="bg-slate-800 rounded-2xl p-5 sm:p-6 mb-8">

                      <h3 className="text-lg sm:text-xl font-semibold mb-3">
                        Daily Challenge
                      </h3>

                      <p className="text-slate-300 leading-7 text-sm sm:text-base">
                        Every day a new coding problem is selected automatically.
                        Solve today's challenge to improve your coding skills,
                        maintain your consistency, and become a better programmer.
                      </p>

                    </div>

                    {/* Button */}

                    <button
                      onClick={() => navigate(`/problem/${problem._id}`)}
                      className="w-full cursor-pointer sm:w-fit bg-blue-600 hover:bg-blue-700 transition rounded-xl px-8 py-4 flex justify-center items-center gap-3 font-semibold"
                    >
                      Solve Problem

                      <ArrowRight size={20} />
                    </button>

                  </div>

                  {/* Countdown */}

                  <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center">

                    <Clock3
                      className="mx-auto text-orange-400 mb-4"
                      size={32}
                    />

                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                      Next Challenge In
                    </h3>

                    <p className="text-2xl sm:text-4xl font-bold text-orange-400 break-all">
                      {countdown}
                    </p>

                  </div>

                </div>

              </div>
              </>
            );
          };

          export default ProblemOfTheDayPage;