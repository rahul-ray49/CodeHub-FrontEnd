import { useNavigate } from "react-router-dom";
import NavigationBar2 from "./NavigationBar2";
import { 
    User, House, BookOpen, Trophy, ClipboardList, 
    ChevronLeft, ChevronRight, Activity, Target, Calendar,
    CheckCircle2, XCircle, AlertCircle, Clock, Inbox, Code2
} from "lucide-react";
import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

function UserProfile() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);
    const [totalSolved, setTotalSolved] = useState(0);
    const [submissions, setSubmissions] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);

    const fetchSubmissionHistory = async () => {
        try {
            setSubmissionLoading(true);
            const response = await axiosClient.get(
                `/history/submission-history?page=${page}&limit=5`
            );

            if (!response.data.success) {
                return;
            }

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
            setSubmissionLoading(false);
        }
    };

    const getUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/user/getProfile");

            if (response?.data?.success) {
                setUser(response?.data?.user);
                setEasy(response?.data?.easy);
                setMedium(response?.data?.medium);
                setHard(response?.data?.hard);
                setTotalSolved(response?.data?.totalSolved);
            }
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to fetch profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        fetchSubmissionHistory();
    }, [page]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#0b1120]">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "Accepted": return <CheckCircle2 size={16} className="text-emerald-400" />;
            case "Wrong Answer": return <XCircle size={16} className="text-red-400" />;
            case "Compilation Error": return <AlertCircle size={16} className="text-red-400" />;
            case "Time Limit Exceeded": return <Clock size={16} className="text-red-400" />;
            default: return <AlertCircle size={16} className="text-red-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-white">
            <NavigationBar2 />

            <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto">
                
                {/* Responsive Sidebar / Top Nav on Mobile */}
                <div className="w-full lg:w-72 lg:min-h-[calc(100vh-64px)] bg-[#0f172a] border-b lg:border-b-0 lg:border-r border-slate-800 p-4 lg:p-6 z-10 sticky top-0 flex flex-col">
                    <div className="hidden lg:flex items-center gap-3 mb-10 pl-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                            <Code2 size={18} className="text-white" />
                        </div>
                        <h2 className="text-white text-2xl font-bold tracking-tight">
                            CodeHub
                        </h2>
                    </div>

                    <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full pb-2 lg:pb-0">
                        {[
                            { name: "Home", icon: House, path: "/" },
                            { name: "Problems", icon: BookOpen, path: "/problemSection" },
                            { name: "Profile", icon: User, path: "/profile/me", active: true },
                            { name: "Solved", icon: Trophy, path: "/solved" },
                            { name: "Submissions", icon: ClipboardList, path: "/submission-history" },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(item?.path)}
                                className={`flex-shrink-0 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-2.5 lg:py-3 rounded-lg transition-colors duration-200 font-medium text-sm lg:text-base
                                ${item?.active 
                                    ? "bg-blue-500/10 text-blue-400" 
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                }`}
                            >
                                <item.icon 
                                    size={18} 
                                    className={`${item?.active ? "text-blue-400" : "text-slate-500"} transition-colors`} 
                                />
                                {item?.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            My Profile
                        </h1>
                        <p className="text-slate-400 mt-1 text-sm sm:text-base">
                            View your coding statistics and recent problem-solving activity.
                        </p>
                    </div>

                  <div className="rounded-2xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 w-full">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left relative">
                        
                       {user?.profileImage?.url ? (
                            <img
                                src={user?.profileImage?.url}
                                alt="Profile"
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-slate-700 shadow-sm"
                            />
                        ) : (
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-800 border border-slate-700 flex flex-shrink-0 items-center justify-center text-3xl font-bold text-white shadow-sm">
                                {user?.firstName?.slice(0, 1).toUpperCase() || "U"}
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex flex-col justify-center h-full sm:pt-2 flex-grow">
                            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{user?.firstName} {user?.lastName}</h2>
                            <p className="text-slate-400 mt-1 text-sm sm:text-base">{user?.emailId}</p>
                            <div className="mt-4 flex justify-center sm:justify-start">
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                                    {user?.role || "Developer"}
                                </span>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button 
                            onClick={() => navigate("/user/update-profile")}
                            className="cursor-pointer sm:absolute sm:top-0 sm:right-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* About Section */}
                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">About</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {user?.about || "This user hasn't added an about section yet."}
                        </p>
                    </div>
                </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 sm:p-6 transition-colors hover:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-slate-400 font-medium text-xs sm:text-sm uppercase tracking-wide">Current Score</p>
                                <Activity size={18} className="text-blue-500" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                {user?.userScore || 0}
                            </h2>
                        </div>

                        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 sm:p-6 transition-colors hover:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-slate-400 font-medium text-xs sm:text-sm uppercase tracking-wide">Problems Solved</p>
                                <Target size={18} className="text-emerald-500" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                {totalSolved ?? 0}
                            </h2>
                        </div>

                        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 sm:p-6 transition-colors hover:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-slate-400 font-medium text-xs sm:text-sm uppercase tracking-wide">Joined Date</p>
                                <Calendar size={18} className="text-purple-500" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' }) : 'N/A'}
                            </h2>
                        </div>
                    </div>

                    {/* Detailed Difficulty Stats */}
                    <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-white mb-6">
                            Difficulty Breakdown
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 flex flex-col items-center justify-center hover:border-emerald-500/30 transition-colors">
                                <p className="text-emerald-400 font-medium text-sm mb-2">Easy</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">{easy ?? 0}</h2>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 flex flex-col items-center justify-center hover:border-yellow-500/30 transition-colors">
                                <p className="text-yellow-400 font-medium text-sm mb-2">Medium</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">{medium ?? 0}</h2>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 flex flex-col items-center justify-center hover:border-red-500/30 transition-colors">
                                <p className="text-red-400 font-medium text-sm mb-2">Hard</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">{hard ?? 0}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Submissions Table Section */}
                    <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-[#0f172a] overflow-hidden flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <ClipboardList className="text-slate-400" size={20} />
                                Recent Activity
                            </h2>
                            <button 
                                onClick={() => navigate("/submission-history")} 
                                className="text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
                            >
                                View All
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left border-collapse">
                                <thead className="bg-slate-900/50 border-b border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Problem</th>
                                        <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Language</th>
                                        <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Submitted</th>
                                        <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {submissionLoading ? (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    {/* Clean spinner for table loader */}
                                                    <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                                                    <p className="text-sm text-slate-400">Loading submissions...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : submissions && submissions?.length > 0 ? (
                                        submissions?.map((submission) => (
                                            <tr key={submission?._id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-medium
                                                        ${submission?.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400" : 
                                                          submission?.status === "Wrong Answer" ? "bg-red-500/10 text-red-400" : 
                                                          submission?.status === "Compilation Error" ? "bg-red-500/10 text-red-400" : 
                                                          submission?.status === "Runtime Error" ? "bg-red-500/10 text-red-400" : 
                                                          submission?.status === "Time Limit Exceeded" ? "bg-red-500/10 text-red-400" : 
                                                          "bg-slate-800 text-slate-300"}
                                                    `}>
                                                        {getStatusIcon(submission?.status)}
                                                        {submission?.status}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-200">
                                                    {submission?.problemId?.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 capitalize font-mono">
                                                        {submission?.language}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-400">
                                                    {new Date(submission?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => navigate(`/submission-details/${submission?._id}`)}
                                                        className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors"
                                                    >
                                                        Review
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-16 text-center">
                                                <div className="flex flex-col items-center justify-center text-slate-500">
                                                    <Inbox size={28} className="text-slate-600 mb-3" />
                                                    <p className="text-base font-medium text-slate-400">No submissions found</p>
                                                    <p className="text-sm mt-1">You haven't submitted any solutions yet.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Clean Pagination */}
                        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/30 flex justify-between items-center">
                            <span className="text-sm text-slate-500 hidden sm:block">
                                Page <span className="font-medium text-slate-300">{pagination?.currentPage || 1}</span> of <span className="font-medium text-slate-300">{pagination?.totalPages === 0 ? "1" : pagination?.totalPages || 1}</span>
                            </span>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                                <button
                                    disabled={!pagination || pagination?.currentPage === 1}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    <ChevronLeft size={16} /> Prev
                                </button>
                                
                                <span className="px-4 py-2 text-sm font-medium text-slate-300 sm:hidden">
                                    {pagination?.currentPage || 1} / {pagination?.totalPages === 0 ? "1" : pagination?.totalPages || 1}
                                </span>

                                <button
                                    disabled={!pagination || pagination?.totalPages === 0 || pagination?.currentPage >= pagination?.totalPages}
                                    onClick={() => setPage((prev) => prev + 1)}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    Next <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;