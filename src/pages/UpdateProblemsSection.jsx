import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosClient from '../utils/axiosClient';
import { Link } from "react-router-dom";

const UpdateProblems = () => {
   const navigate = useNavigate();

   const [problems, setProblems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const limit = 5;

   const [selectedDifficulty, setSelectedDifficulty] = useState("all");
   const [selectedTag, setSelectedTag] = useState("all");
   const [search,setSearch]=useState("");


   const fetchProblems = async () => {
                try {
                    setLoading(true);

                    const response = await axiosClient.get("/problem/getAllProblem2", {
                        params: {
                            page,
                            limit,
                            difficulty: selectedDifficulty,
                            tag: selectedTag,
                            search
                        },
                    });

                    setProblems(response.data.getProblem);
                    setTotalPages(response.data.totalPages);

                } catch (err) {
                    console.log(err);
                    alert(err?.response?.data?.message || "Error fetching problems");
                } finally {
                    setLoading(false);
                }
            };


            useEffect(() => {
                    fetchProblems();
                }, [page,selectedDifficulty,selectedTag,search]);

            // jaise he page change hoga useEffect chalgei aur problems fetch karke leke aayegi


            const handleNext = () => {
                if (page < totalPages) {
                    setPage(prev => prev + 1);
                }
            };

            const handlePrevious = () => {
                if (page > 1) {
                    setPage(prev => prev - 1);
                }
            };
            
          




    return (
        <div className="min-h-screen bg-[#0B1120] text-white">
            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="flex justify-between">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        Update Problems
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Select a problem and update its details.
                    </p>

                </div>
                <Link to="/">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Return to Home</button>
                </Link>

                </div>


                <div className="bg-[#111827] rounded-2xl border border-[#263146] p-6">
                 
                 <div className="grid grid-cols-3 gap-5">

                    <input
                    type="text"
                    placeholder="Search Problems..."
                    className="bg-[#0B1120]
                    border
                    border-[#2A3754]
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    w-full"
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    />



                    <select
                        className="
                        bg-[#0B1120]
                        border
                        border-[#2A3754]
                        rounded-xl
                        px-4
                        py-3"
                        value={selectedDifficulty}
                        onChange={(e)=>{
                            setSelectedDifficulty(e.target.value);
                            setPage(1);
                        }}
                        >

                        
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>

                    </select>

                    <select
                        className="
                        bg-[#0B1120]
                        border
                        border-[#2A3754]
                        rounded-xl
                        px-4
                        py-3"
                         value={selectedTag}
                         onChange={(e)=>{
                            setSelectedTag(e.target.value);
                            setPage(1);
                        }}
                         
                        >

                        <option value="all">All Tags</option>
                        <option value="array">Array</option>
                        <option value="dp">Dynammic Programming</option>
                        <option value="graph">Graph</option>
                        <option value="linkedList">Linked List</option>

                    </select>


                 </div>
                </div>


                <div className="mt-8 space-y-5">

                        {
                            loading ? (

                                <div className="text-center py-20 text-gray-400">
                                    Loading Problems...
                                </div>

                            ) : problems.length === 0 ? (

                                <div className="text-center py-20 text-gray-400">
                                    No Problems Found
                                </div>

                            ) : (

                                problems?.map((problem) => (

                                  
                                    <div
                                        key={problem._id}
                                        className="
                                        bg-[#111827]
                                        border
                                        border-[#263146]
                                        rounded-2xl
                                        p-6
                                        hover:border-blue-500
                                        transition-all
                                        duration-200"
                                    >


                                        <div className="flex justify-between items-start">

                                            <div>

                                                <h2 className="text-2xl font-semibold text-white">

                                                    {problem?.problemNumber}. {problem?.title}

                                                </h2>

                                            </div>

                                            <div
                                                className="
                                                bg-blue-600/20
                                                text-blue-400
                                                px-4
                                                py-2
                                                rounded-xl
                                                font-semibold"
                                            >

                                                Score : {problem?.score}

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-3 mt-5">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold
                                                ${
                                                    problem?.difficulty === "easy"
                                                        ? "bg-green-500/20 text-green-400"

                                                        : problem?.difficulty === "medium"
                                                        ? "bg-yellow-500/20 text-yellow-400"

                                                        : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {problem?.difficulty}
                                            </span>

                                            <span className="bg-[#1E293B] text-gray-300 px-3 py-1 rounded-full text-sm">
                                                {problem?.tags}
                                            </span>

                                        </div>


                                        <div className="mt-6 flex justify-between items-center">

                                            <p className="text-gray-400 text-sm">
                                                Problem #{problem?.problemNumber}
                                            </p>

                                            <button
                                                onClick={() => navigate(`/updateProblem/${problem?._id}`)}
                                                className="
                                                bg-blue-600
                                                hover:bg-blue-700
                                                px-5
                                                py-2
                                                rounded-lg
                                                font-medium
                                                transition-colors"
                                            >
                                                ✏️ Update Problem
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )
                        }

                </div>

                <div className="flex justify-between items-center mt-8">

                        <button
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className={`
                            px-5 py-2 rounded-lg font-medium
                            ${
                                page === 1
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-[#1D4ED8] hover:bg-blue-700"
                            }
                            `}
                        >
                            ← Previous
                        </button>

                        <p className="text-gray-300 font-medium">
                            Page {page} of {totalPages}
                        </p>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className={`
                            px-5 py-2 rounded-lg font-medium
                            ${
                                page === totalPages
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-[#1D4ED8] hover:bg-blue-700"
                            }
                            `}
                        >
                            Next →
                        </button>

                </div>
                








           </div>
        </div>
    );
};

export default UpdateProblems;