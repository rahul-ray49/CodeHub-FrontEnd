import { Link } from "react-router-dom";

function VerifyEmailNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">

          {/* Email Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl">📧</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold">
            Verify Your Email
          </h2>

          {/* Description */}
          <p className="mt-4 text-base-content/70">
            We've sent a verification link to your email address.
          </p>

          <p className="text-base-content/70">
            Please check your inbox and click the verification link
            to activate your CodeHub account.
          </p>

          {/* Information Box */}
          <div className="alert alert-info mt-6 text-sm">
            <span>
              Verification emails may take a few minutes to arrive.
              Don't forget to check your spam folder.
            </span>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              to="/login"
              className="btn btn-primary"
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