import { useEffect, useState } from "react";
import {
  Mail,
  MailCheck,
  Code2,
  RefreshCw,
  Loader2,
  ArrowLeft,
  CircleDashed,
} from "lucide-react";
import { toast } from "react-toastify";
import axiosClient from "../utils/axiosClient";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function VerifyEmailNotice() {

  const location = useLocation();
  const emailId = location.state?.emailId;
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (!emailId) {
        toast.error("Please register first.");
        navigate("/signup");
    }
}, [emailId,navigate]);

  const handleResend = async () => {
  if (countdown > 0 || loading) return;

  try {
    setLoading(true);

    const response = await axiosClient.post(
      "/user/resend-verification",
      {
        emailId,
      }
    );

    toast.success(response?.data?.message);

    setCountdown(60);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to resend verification email."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6">

      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden min-h-[500px]">


        <div className="hidden lg:flex flex-1 bg-slate-900/80 p-12 flex-col justify-between text-white">

          <div className="flex items-center gap-2 text-2xl font-bold text-blue-500">
            <Code2 size={32}/>
            CodeHub
          </div>

          <div>

            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-8">

              <MailCheck
                size={34}
                className="text-blue-400"
              />

            </div>

            <h2 className="text-4xl font-bold mb-4">
              Almost there.
            </h2>

            <p className="text-blue-100/80 text-lg leading-8">

              Verify your email address to activate your account and
              unlock all CodeHub features including coding challenges,
              AI assistance and submissions.

            </p>

          </div>

        </div>


        <div className="flex-1 p-10 sm:p-12 flex flex-col justify-center w-full">

          <div className="max-w-sm w-full mx-auto">

            <div className="mb-8">

              <h1 className="text-3xl font-bold text-white mb-2">
                Verify Email
              </h1>

              <p className="text-slate-400">
                We've sent a verification link to your email address.
              </p>

            </div>


            <div className="space-y-2">

              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">

                Registered Email

              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-3.5 text-slate-600"
                  size={18}
                />

                <div className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white">

                  {emailId}

                </div>

              </div>

            </div>



            <button
              onClick={handleResend}
              disabled={loading || countdown > 0}
              className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                loading || countdown > 0
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Sending Verification Email...
                </>
              ) : (
                <>
                  <RefreshCw size={18} />

                  {countdown > 0
                    ? `Resend Email (${countdown}s)`
                    : "Resend Verification Email"}
                </>
              )}
            </button>


            <div className="mt-5">

              <p className="text-xs text-slate-500 leading-6">

                Didn't receive the email?
                <br />
                Check your spam or promotions folder. If you still
                don't see it, wait until the timer finishes and
                request another verification email.

              </p>

            </div>


            <div className="flex items-center gap-3 my-7">

              <div className="flex-1 h-px bg-slate-800"></div>

              <span className="text-[11px] uppercase tracking-widest text-slate-600">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-800"></div>

            </div>


            <NavLink
              to="/login"
              className="w-full border border-slate-800 hover:border-slate-700 bg-[#0b1120] hover:bg-slate-900 rounded-xl py-4 text-sm font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Login
            </NavLink>


            <p className="text-center text-slate-500 text-xs mt-6">

              Already verified your email?{" "}

              <NavLink
                to="/login"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Login
              </NavLink>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VerifyEmailNotice;