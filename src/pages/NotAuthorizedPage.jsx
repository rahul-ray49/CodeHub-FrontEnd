import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar2 from "./NavigationBar2"
const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <NavigationBar2/>
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Top Section: Icon with a subtle background hint */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <ShieldAlert size={36} className="text-slate-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-3">Access Restricted</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            You do not have the necessary permissions to view this page. 
            Please check your account role or contact support.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/10"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 rounded-xl transition-all border border-slate-700"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            Error Code: 403
          </p>
        </div>
      </div>
    </div>
    </>

  );
};

export default NotAuthorizedPage;