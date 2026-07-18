import { Tag, Trophy } from "lucide-react";

export default function ProblemHeader({ problem }) {
    if (!problem) return null;

    const getDifficultyColor = (diff) => {
        switch (diff?.toLowerCase()) {
            case "easy": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "hard": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-slate-500/10 text-slate-300 border-slate-500/20";
        }
    };

    return (
        <div className="mb-6 pb-6 border-b border-slate-800/80">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-5">
                {problem.problemNumber}. {problem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                </span>

                {problem.tags && (
                    <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-md text-blue-400">
                        <Tag size={14} />
                        <span className="capitalize text-xs font-medium tracking-wide">
                            {problem.tags}
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-md text-yellow-400 text-xs font-semibold">
                    <Trophy size={14} />
                    <span>{problem.score || "0"} Points</span>
                </div>
            </div>
        </div>
    );
}