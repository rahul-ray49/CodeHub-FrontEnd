import { useNavigate } from "react-router-dom";
import { History, Inbox, ChevronRight, CheckCircle2, XCircle, AlertCircle, Clock, TerminalSquare } from "lucide-react";

function SubmissionHistory({ submissionLoading, submissions }) {
    const navigate = useNavigate();

    // Helper for status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case "Accepted":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "Wrong Answer":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Compilation Error":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Runtime Error":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Time Limit Exceeded":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            default:
                return "bg-slate-800 text-slate-400 border-slate-700";
        }
    };

    if (submissionLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400 font-medium">Fetching your submission history...</p>
            </div>
        );
    }

    if (!submissions || submissions?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                    <Inbox size={40} className="text-slate-600" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No Submissions Yet</h2>
                <p className="text-slate-400 max-w-sm">
                    You haven't submitted any solutions for this problem. Start coding to see your history appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                    <thead className="bg-slate-900/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Language</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Runtime</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Memory</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tests</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Submitted</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {submissions?.map((submission) => (
                            <tr key={submission?._id} className="hover:bg-slate-800/30 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${getStatusStyle(submission?.status)}`}>
                                        {submission?.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-mono text-slate-300 capitalize">{submission?.language}</td>
                                <td className="px-6 py-4 text-sm text-slate-400">
                                    {submission?.runtime > 0 ? `${Number(submission?.runtime).toFixed(3)}ms` : "--"}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">
                                    {submission?.memory > 0 ? `${submission?.memory}KB` : "--"}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    {submission?.testCasesPassed} / {submission?.testCasesTotal}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">
                                    {new Date(submission?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => navigate(`/submission-details/${submission?._id}`)}
                                        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        View <ChevronRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubmissionHistory;