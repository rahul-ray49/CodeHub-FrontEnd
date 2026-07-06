import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const Page404 = () => {
  return (
    <div className="relative min-h-screen bg-slate-900/80 flex items-center justify-center px-4 sm:px-6 py-8 overflow-hidden">
      <div className="w-full text-center max-w-lg">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 sm:p-6 rounded-full bg-red-500/10 border border-red-500/20">
            <AlertTriangle size={60} className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-3">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-slate-400 mb-8 leading-7 sm:leading-relaxed px-2 sm:px-0">
          Oops! The page you are looking for doesn't exist or may have
          been moved. Let's get you back to solving problems.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
       <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>
        </div>
    </div>
  );
};

export default Page404;