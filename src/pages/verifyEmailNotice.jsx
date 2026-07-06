import { Link } from "react-router-dom";

function VerifyEmailNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-slate-900/80">
      <div className="card w-full max-w-md bg-slate-900/80 shadow-xl">
        <div className="card-body p-5 sm:p-8 text-center">

          {/* Email Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold">📧</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold">
            Verify Your Email
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-base-content/70 leading-6">
            We've sent a verification link to your email address.
          </p>

          <p className="text-sm sm:text-base text-base-content/70 leading-6">
            Please check your inbox and click the verification link
            to activate your CodeHub account.
          </p>

          {/* Information Box */}
          <div className="alert alert-info mt-6 text-xs sm:text-sm text-left">
            <span>
              Verification emails may take a few minutes to arrive.
              Don't forget to check your spam folder.
            </span>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              to="/login"
              className="btn btn-primary w-full sm:w-auto"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyEmailNotice;