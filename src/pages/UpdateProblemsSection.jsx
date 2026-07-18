import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight, Edit3, Settings2 } from "lucide-react";
import axiosClient from '../utils/axiosClient';
import NavigationBar2 from "./NavigationBar2";

const UpdateProblems = () => {
    const navigate = useNavigate();

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedTag, setSelectedTag] = useState("all");
    const [search, setSearch] = useState("");

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/problem/getAllProblem2", {
                params: { page, limit, difficulty: selectedDifficulty, tag: selectedTag, search },
            });
            setProblems(response?.data?.getProblem);
            setTotalPages(response?.data?.totalPages);
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Error fetching problems");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, [page, selectedDifficulty, selectedTag, search]);

    return (
        <>
        <NavigationBar2/>
        <div className="min-h-screen bg-[#0b1120] text-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Update Problems</h1>
                        <p className="text-slate-400 mt-2">Manage and modify existing coding challenges.</p>
                    </div>
                    
                </div>

                {/* Filter Bar */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="w-full bg-[#0b1120] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                        <select 
                            className="bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer"
                            value={selectedDifficulty}
                            onChange={(e) => { setSelectedDifficulty(e.target.value); setPage(1); }}
                        >
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select 
                            className="bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer"
                            value={selectedTag}
                            onChange={(e) => { setSelectedTag(e.target.value); setPage(1); }}
                        >
                            <option value="all">All Tags</option>
                            <option value="array">Array</option>
                            <option value="dp">Dynamic Programming</option>
                            <option value="graph">Graph</option>
                            <option value="linkedList">Linked List</option>
                        </select>
                    </div>
                </div>

                {/* Problems List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-20 text-slate-500 animate-pulse">Loading problems...</div>
                    ) : problems?.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">No Problems Found</div>
                    ) : (
                        problems.map((problem) => (
                            <div key={problem?._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {problem?.problemNumber}. {problem?.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider 
                                            ${problem?.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400' : 
                                              problem?.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {problem?.difficulty}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 uppercase">{problem?.tags}</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 uppercase">Score: {problem?.score}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/updateProblem/${problem?._id}`)}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <Edit3 size={16} /> Update Details
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 border-t border-slate-800 pt-8">
                    <p className="text-slate-500 text-sm font-medium">Page {page} of {totalPages}</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl disabled:opacity-50 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl disabled:opacity-50 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
};

export default UpdateProblems;