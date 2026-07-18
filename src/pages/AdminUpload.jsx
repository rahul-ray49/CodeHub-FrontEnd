import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; 
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { Search, ListFilter, ChevronLeft, ChevronRight, Video, Upload, Trash2,Loader2} from "lucide-react";
import NavigationBar2 from './NavigationBar2';

function AdminUpload() {
    const { user } = useSelector((state) => state.auth);
    const navigate=useNavigate();

    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [deletingProblemId, setDeletingProblemId] = useState(null);
 
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [difficulty, setDifficulty] = useState("all");
    const [tag, setTag] = useState("all");
    const limit = 10;

    useEffect(() => {
        fetchProblems();
    }, [page, search, difficulty, tag]);



    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/video/problems", {
                params: {
                    page,
                    limit,
                    search,
                    difficulty,
                    tag
                }
            });
            setProblems(response?.data?.problems);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Error fetching problems");
        } finally {
            setLoading(false);
        }
    };

    

    const deleteVideo = async (problemId) => {

            const isConfirmed = window.confirm(
                "Are you sure you want to delete this solution video?"
            );

            if (!isConfirmed) return;

            try {
                setDeletingProblemId(problemId);

                await axiosClient.delete(`/video/delete/${problemId}`);

                alert("Video deleted successfully.");

                fetchProblems();

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data?.message ||
                    "Failed to delete video."
                );

            }
            finally{
                setDeletingProblemId(null);
            }

        };

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-white">
            <NavigationBar2/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                       Solution Videos
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm sm:text-base">
                        Upload, manage and delete solution videos for coding problems.
                    </p>
                </div>

                {/* Filters & Search Control Bar */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        
                        {/* Search Bar */}
                        <div className="sm:col-span-6 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-slate-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>

                        {/* Difficulty Dropdown */}
                        <div className="sm:col-span-3 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ListFilter size={18} className="text-slate-500" />
                            </div>
                            <select
                                value={difficulty}
                                onChange={(e) => {
                                    setDifficulty(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="all">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        {/* Tag Dropdown */}
                        <div className="sm:col-span-3 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ListFilter size={18} className="text-slate-500" />
                            </div>
                            <select
                                value={tag}
                                onChange={(e) => {
                                    setTag(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="all">All Tags</option>
                                <option value="array">Array</option>
                                <option value="linkedList">Linked List</option>
                                <option value="graph">Graph</option>
                                <option value="dp">DP</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Problem List Area */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex flex-col">
                    
                    {/* List Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="col-span-1 text-center">Video</div>
                        <div className="col-span-5 lg:col-span-6">Problem Title</div>
                        <div className="col-span-2 text-center">Difficulty</div>
                        <div className="col-span-3 lg:col-span-2 text-center">Tag</div>
                        <div className="col-span-1 text-right">{user?.role === "admin" && "Action"}</div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex-1 flex flex-col justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-400 text-sm">Fetching video solutions...</p>
                        </div>
                    ) : problems?.length === 0 ? (
                        // Empty State
                        <div className="flex-1 flex flex-col justify-center items-center py-24 text-slate-500">
                            <Search size={48} className="text-slate-700 mb-4" />
                            <h2 className="text-xl font-semibold text-slate-300">No problems found</h2>
                            <p className="text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    ) : (
                        // Problems Mapping
                        <div className="flex flex-col divide-y divide-slate-800/50">
                            {problems?.map((problem) => (
                                <div
                                    key={problem?._id}
                                    className="group grid grid-cols-1 sm:grid-cols-12 gap-4 items-center px-4 sm:px-6 py-4 sm:py-5 hover:bg-slate-800/30 transition-colors duration-200"
                                >
                                    {/* Status Indicator */}
                                    <div className="hidden sm:flex col-span-1 justify-center">
                                        <div className="hidden sm:flex col-span-1 justify-center">
                                        {problem?.hasVideo ? (
                                            <Video size={18} className="text-blue-400" />
                                        ) : (
                                            <Video size={18} className="text-slate-600" />
                                        )}
                                    </div>
                                    </div>

                                    {/* Mobile Only Status + Title */}
                                    <div className="col-span-1 sm:hidden flex items-center gap-3 mb-2">
                                        {problem?.hasVideo ? (
                                            <Video size={18} className="text-blue-400 flex-shrink-0" />
                                        ) : (
                                            <Video size={18} className="text-slate-600 flex-shrink-0" />
                                        )}
                                        <NavLink
                                            to={`/problem/${problem?._id}`}
                                            className="text-base font-semibold text-slate-200 hover:text-blue-400 transition-colors line-clamp-1"
                                        >
                                            {problem?.problemNumber}. {problem?.title}
                                        </NavLink>
                                    </div>

                                    {/* Desktop Title */}
                                    <div className="hidden sm:block col-span-5 lg:col-span-6">
                                        <NavLink
                                            to={`/problem/${problem?._id}`}
                                            className="text-base font-medium text-slate-200 hover:text-blue-400 transition-colors line-clamp-1"
                                        >
                                            {problem?.problemNumber}. {problem?.title}
                                        </NavLink>
                                    </div>

                                    {/* Difficulty Badge */}
                                    <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                                        <span className={`px-2.5 py-1 rounded text-xs font-semibold tracking-wide capitalize ${getDifficultyBadgeColor(problem?.difficulty)}`}>
                                            {problem?.difficulty}
                                        </span>
                                    </div>

                                    {/* Tags Badge */}
                                    <div className="col-span-1 sm:col-span-3 lg:col-span-2 flex justify-start sm:justify-center">
                                        <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-400 capitalize truncate max-w-[120px]">
                                            {problem?.tags}
                                        </span>
                                    </div>

                                    {/* Admin Actions */}
                                    <div className="col-span-1 flex justify-end">
                                        {user?.role === "admin" && (
                                            problem?.hasVideo ? (

                                                <button
                                                onClick={() => deleteVideo(problem?._id)}
                                                disabled={deletingProblemId === problem?._id}
                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete Video"
                                            >
                                              {
                                                    deletingProblemId === problem?._id ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash2 className="w-4 h-4" />
                                                            
                                                        </>
                                                    )
                                                }
                                            </button>
                                            ) : (

                                                <button
                                                    onClick={() =>navigate(`/admin/video/upload/${problem?._id}`)}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                                                >
                                                    <Upload size={16} />
                                                    Upload
                                                </button>

                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 p-4 sm:p-5 border border-slate-800 bg-[#0f172a] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
                    <span className="text-sm font-medium text-slate-400">
                        Page <span className="text-white font-semibold">{page}</span> of <span className="text-white font-semibold">{totalPages === 0 ? "1" : totalPages}</span>
                    </span>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={totalPages === 0 || page >= totalPages}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </main>
        </div>
        
    );
}

const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
        case "easy":
            return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
        case "medium":
            return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        case "hard":
            return "bg-red-500/10 text-red-400 border border-red-500/20";
        default:
            return "bg-slate-500/10 text-slate-300 border border-slate-500/20";
    }
};

export default AdminUpload;
