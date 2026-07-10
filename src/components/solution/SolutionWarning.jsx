import { Eye, Lightbulb, Lock } from "lucide-react";

const SolutionWarning = ({ onReveal }) => {
    return (
        <div className="flex items-center justify-center min-h-[400px] md:min-h-[500px] px-3 sm:px-6">

            <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900/80 shadow-xl backdrop-blur-sm p-5 sm:p-7 lg:p-9">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                        <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="mt-5 text-center text-2xl sm:text-3xl font-bold text-white">
                    Before You Reveal the Solution
                </h2>

                {/* Description */}
                <p className="mt-5 text-center text-sm sm:text-base leading-7 text-slate-300">
                    We encourage you to solve this problem on your own before
                    viewing the official solution.
                </p>

                <p className="mt-3 text-center text-sm sm:text-base leading-7 text-slate-400">
                    Struggling with a problem helps strengthen your logical
                    thinking, improves problem-solving skills, and prepares you
                    for coding interviews.
                </p>

                {/* Learning Tip */}
                <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/60 p-4 sm:p-5">

                    <div className="flex items-center justify-center gap-2 text-yellow-400 font-semibold text-sm sm:text-base">
                        <Lightbulb className="h-5 w-5" />
                        Learning Tip
                    </div>

                    <p className="mt-3 text-center text-sm sm:text-base italic text-slate-300 leading-7">
                        "Think first. Code second. Learn forever."
                    </p>

                </div>

                {/* Locked Text */}
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">

                    <Lock className="h-5 w-5" />

                    <span className="text-sm sm:text-base font-medium">
                        Solution is currently hidden
                    </span>

                </div>

                {/* Button */}
                <div className="mt-8 flex justify-center">

                    <button
                        onClick={onReveal}
                        className="
                            flex
                            w-full
                            sm:w-auto
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-500
                            active:scale-95
                            transition-all
                            duration-300
                            px-6
                            py-3
                            font-semibold
                            text-white
                            cursor-pointer
                            shadow-lg
                            hover:shadow-blue-500/20
                        "
                    >
                        <Eye className="h-5 w-5" />

                        Reveal Solution
                    </button>

                </div>

            </div>

        </div>
    );
};

export default SolutionWarning;