import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from '../authSlice';
import Footer from "../components/footer/Footer";
import NavigationBar2 from "./NavigationBar2";
import {BookOpen,BadgeCheck,History,CircleHelp,Bot} from "lucide-react";
import {SquarePlus,FilePenLine,UserPlus} from "lucide-react";

const LandingPage = () => {

    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handleLogout=()=>{
         dispatch(logoutUser())
    }


    const userOptions=[
      {
        icon:<BookOpen className="w-10 h-10 text-blue-500 mb-2"/>,
        routeTo:"/problemSection",
        heading:"Problem Section",
        description:" Browse coding challenges and test your skills with curated problems."
      },
      {
        icon:<BadgeCheck className="w-10 h-10 text-emerald-400 mb-2"/>,
        routeTo:"/solved",
        heading:"Solved Problems",
        description:" View all accepted solutions and track your completed challenges."
      },
      {
        icon:<History className="w-10 h-10 text-violet-400 mb-2"/>,
        routeTo:"/submission-history",
        heading:"Submission History",
        description:"View your previous submissions and review your coding journey."
      },
      {
        icon:<CircleHelp className="w-10 h-10 text-amber-400 mb-2"/>,
        routeTo:"/help-page",
        heading:"Help Center",
        description:"Learn how to write, format, and submit your solutions correctly on CodeHub before starting your coding journey."
      },
      {
        icon:<Bot className="w-10 h-10 text-cyan-400 mb-2"/>,
        routeTo:"/chat/ai",
        heading:"AI Assistant",
        description:"Chat with CodeHub AI to learn programming concepts, solve coding doubts, debug code, and prepare for technical interviews."
      },
    ]

   const adminOptions = [
  {
    icon: <SquarePlus className="w-10 h-10 text-green-400 mb-2" />,
    routeTo: "/admin-panel",
    heading: "Create Problem",
    description:
      "Add new coding problems, examples, constraints and test cases.",
  },
  {
    icon: <FilePenLine className="w-10 h-10 text-sky-400 mb-2" />,
    routeTo: "/updateproblems",
    heading: "Update Problems",
    description:
      "Edit existing problems, update statements and manage test cases.",
  },
  {
    icon: <UserPlus className="w-10 h-10 text-orange-400 mb-2" />,
    routeTo: "/admin-register",
    heading: "Register Admin",
    description:
      "Create a new administrator account to manage problems, users, and platform settings.",
  },
];


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
           {
            userOptions?.map((item)=>(
              <Link key={item?.routeTo}
            to={item?.routeTo}
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
          >
            
             {item?.icon}
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              {item?.heading}
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item?.description}
            </p>
          </Link>
            ))
           }
          {user?.role === "admin" && (
         
            <>
             {
            adminOptions?.map((item)=>(
              <Link key={item?.routeTo}
            to={item?.routeTo}
            className="group bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
          >
            
             {item?.icon}
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              {item?.heading}
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item?.description}
            </p>
          </Link>
            ))
           }
            </>

        )}
        </div>
        

      </div>
 
      <Footer/>


    </div>
  );
};

export default LandingPage;