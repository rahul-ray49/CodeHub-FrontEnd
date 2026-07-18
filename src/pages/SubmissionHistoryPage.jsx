import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { 
    History, 
    ArrowLeft, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    Clock, 
    Inbox,
    ChevronLeft,
    ChevronRight,
    TerminalSquare
} from "lucide-react";
import NavigationBar2 from "./NavigationBar2";

function SubmissionHistoryPage() {
    const [submissions, setSubmissions] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSubmissionHistory = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(
                `/history/submission-history?page=${page}&limit=10`
            );
            setSubmissions(response?.data?.submissions);
            setPagination(response?.data?.pagination);
        } catch (err) {
            console.error(err);
            if (typeof toast !== 'undefined') {
                toast.error(
                    err?.response?.data?.message ||
                    "Unable to fetch submission history."
                );
            } else {
                alert(err?.response?.data?.message || "Unable to fetch submission history.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissionHistory();
    }, [page]);

    const getStatusConfig = (status) => {
        switch (status) {
            case "Accepted":
                return {
                    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    icon: <CheckCircle2 size={14} className="text-emerald-400" />
                };
            case "Wrong Answer":
                return {
                    color: "bg-red-500/10 text-red-400 border-red-500/20",
                    icon: <XCircle size={14} className="text-red-400" />
                };
            case "Compilation Error":
                return {
                    color: "bg-red-500/10 text-red-400 border-red-500/20",
                    icon: <TerminalSquare size={14} className="text-red-400" />
                };
            case "Runtime Error":
                return {
                    color: "bg-red-500/10 text-red-400 border-red-500/20",
                    icon: <AlertCircle size={14} className="text-red-400" />
                };
            case "Time Limit Exceeded":
                return {
                    color: "bg-red-500/10 text-red-400 border-red-500/20",
                    icon: <Clock size={14} className="text-red-400" />
                };
            case "Pending":
                return {
                    color: "bg-blue-500/10 text-red-400 border-blue-500/20",
                    icon: <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                };
            default:
                return {
                    color: "bg-slate-700/30 text-slate-300 border-slate-600/30",
                    icon: <AlertCircle size={14} className="text-slate-400" />
                };
        }
    };

    return (
        <>
        <NavigationBar2/>
        <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-white">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>

                        <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <History className="text-xl sm:text-2xl text-blue-400" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Submission History
                            </h1>
                        </div>

                        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed mt-2">
                            Review your past attempts, analyze your progress, and learn from previous mistakes to improve your algorithmic thinking.
                        </p>
                    </div>

                    <Link
                        to="/problemSection"
                        className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] whitespace-nowrap"
                    >
                        Solve More Problems
                    </Link>
                </div>

                {/* Table Container */}
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                    
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px] text-left border-collapse">
                            <thead className="bg-slate-900/60 border-b border-slate-800/80">
                                <tr>
                                    <th className="px-6 sm:px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest w-48">Status</th>
                                    <th className="px-6 sm:px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Problem</th>
                                    <th className="px-6 sm:px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest w-32">Language</th>
                                    <th className="px-6 sm:px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest w-48">Submitted</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                                                <p className="text-slate-400 font-medium">Fetching records...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : submissions?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
                                                    <Inbox size={32} className="text-slate-600" />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-300 mb-1">No Submissions Yet</h3>
                                                <p className="text-sm">You haven't submitted any solutions. Start practicing!</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    submissions?.map((submission) => {
                                        const statusStyle = getStatusConfig(submission?.status);
                                        return (
                                            <tr 
                                                key={submission?._id} 
                                                className="group hover:bg-slate-800/40 transition-colors duration-200"
                                            >
                                                {/* Status Column */}
                                                <td className="px-6 sm:px-8 py-5">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${statusStyle.color} whitespace-nowrap`}>
                                                        {statusStyle.icon}
                                                        {submission?.status}
                                                    </div>
                                                </td>

                                                {/* Problem Column */}
                                                <td className="px-6 sm:px-8 py-5 text-sm sm:text-base font-semibold text-slate-200">
                                                    <Link
                                                        to={`/problem/${submission?.problemId?._id}`}
                                                        className="hover:text-blue-400 transition-colors line-clamp-1"
                                                    >
                                                        {submission?.problemId?.title || "Unknown Problem"}
                                                    </Link>
                                                </td>

                                                {/* Language Column */}
                                                <td className="px-6 sm:px-8 py-5">
                                                    <span className="inline-block px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900 border border-slate-700/80 text-slate-400 capitalize">
                                                        {submission?.language}
                                                    </span>
                                                </td>

                                                {/* Date Column */}
                                                <td className="px-6 sm:px-8 py-5 text-sm text-slate-400 font-medium whitespace-nowrap">
                                                    {new Date(submission?.createdAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="p-5 sm:p-6 border-t border-slate-800/80 bg-slate-900/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-sm font-medium text-slate-400">
                            Page <span className="text-white font-bold bg-slate-800 px-2 py-1 rounded-md mx-1">{page}</span> of <span className="text-slate-200 font-bold ml-1">{pagination?.totalPages || 1}</span>
                        </span>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={!pagination?.hasPrevPage}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                                <ChevronLeft size={16} /> Prev
                            </button>
                            
                            <button
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={!pagination?.hasNextPage}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        </>
    );
}

export default SubmissionHistoryPage;