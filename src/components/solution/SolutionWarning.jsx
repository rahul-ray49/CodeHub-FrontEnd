import { Eye, Lightbulb, Lock } from "lucide-react";

const SolutionWarning = ({ onReveal }) => {
    return (
        <div className="flex items-center justify-center min-h-[400px] px-4">
            <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-[#0f172a] shadow-2xl p-8 relative overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                        <Lightbulb className="h-8 w-8 text-amber-400" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Challenge yourself first
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                        We recommend attempting the problem on your own. Struggling is where the real learning happens.
                    </p>
                </div>

                {/* Tip Box */}
                <div className="mt-8 rounded-2xl bg-slate-900/50 border border-slate-800 p-5">
                    <p className="text-slate-300 text-sm italic leading-relaxed text-center">
                        "The struggle you're in today is developing the strength you need for tomorrow."
                    </p>
                </div>

                {/* Action Section */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={onReveal}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                    >
                        <Eye className="h-4 w-4" />
                        Reveal Solution
                    </button>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Lock className="h-3 w-3" />
                        <span>Solution is currently locked</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionWarning;