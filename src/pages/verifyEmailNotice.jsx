import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function VerifyEmailNotice() {
  return (
    <div className="min-h-screen bg-[#060b18] flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        
        <div className="mb-10">
          <div className="w-10 h-10 mx-auto mb-4 border-[0.5px] border-white/10 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
          </div>
          <h1 className="text-2xl font-light text-white tracking-wide">CodeHub</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white/90">Email verification sent</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              We've sent a secure activation link to your inbox. Please check your email to complete your registration.
            </p>
          </div>

          <div className="pt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-[11px] text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
            >
              <ArrowLeft size={12} />
              Return to Login
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-[9px] text-white/10 uppercase tracking-[0.3em]">
            System Authentication Service
          </p>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmailNotice;