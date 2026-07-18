import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800">
            <AlertTriangle size={48} className="text-red-400" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-black text-white mb-2 tracking-tighter">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white mb-4">
          Page not found
        </h2>

        <p className="text-slate-400 text-sm sm:text-base mb-10 max-w-sm mx-auto">
          The page you are looking for doesn't exist. Let's get you back to the platform.
        </p>

        {/* Flat Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#0f172a] border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;