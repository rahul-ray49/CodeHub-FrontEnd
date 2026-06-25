import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotAuthorizedPage = () => {
    return (
        <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6">
            <div className="w-full max-w-3xl">

                <div className="bg-gradient-to-br from-[#162454] to-[#12172d] border border-[#24345f] rounded-3xl p-12 text-center shadow-2xl">

                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                            <ShieldX size={50} className="text-red-400" />
                        </div>
                    </div>

                    <p className="text-blue-400 font-semibold tracking-widest mb-3">
                        ERROR 403
                    </p>

                    <h1 className="text-5xl font-bold text-white mb-5">
                        Access Denied
                    </h1>

                    <p className="text-gray-400 text-lg max-w-xl mx-auto leading-8">
                        You are <span className="text-red-400 font-semibold">not authorized</span> to
                        access this page. Please contact an administrator if you
                        believe this is a mistake.
                    </p>

                    <div className="flex justify-center gap-4 mt-10">

                        <Link
                            to="/"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
                        >
                            <Home size={18} />
                            Go Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 border border-slate-600 hover:border-blue-500 hover:bg-slate-800 px-6 py-3 rounded-xl text-gray-300 transition"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default NotAuthorizedPage;