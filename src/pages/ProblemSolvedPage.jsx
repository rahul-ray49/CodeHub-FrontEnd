import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsCheck2Square } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";


function ProblemSolvedPage(){

    const navigate=useNavigate();
  


    const [solvedProblems, setSolvedProblems] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [difficulty, setDifficulty] = useState("all");

    const [tag, setTag] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [totalSolvedProblems, setTotalSolvedProblems] = useState(0);

    const[totalProblems,setTotalProblems]=useState(0);

    const [netSolvedProblems,setNetSolvedProblems]=useState(0);
    
    const limit=5;



    const fetchSolvedProblems=async()=>{

        try{
           setLoading(true);
           const response=await axiosClient.get("problem/problemSolvedByUser",{

            params:{
                limit,
                page:currentPage,
                search,
                difficulty,
                tag
            }

           })

           setTotalPages(response.data.totalPages);
           setSolvedProblems(response.data.solvedProblems);
           setTotalSolvedProblems(response.data.totalSolvedProblems);
           setTotalProblems(response.data.totalProblems);
           setNetSolvedProblems(response.data.netSolvedProblems);

        }
        catch(err){
            alert(err?.response?.data?.message || "problem occured while fetching the problems");
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }   



      
    useEffect(()=>{
        fetchSolvedProblems();
    },[search,tag,difficulty,currentPage]);

     
     
   


            return(
                <>


                 <div className="min-h-screen bg-[#0B1120] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-8">


                        <div className="flex items-start justify-between mb-8">

                            <div>

                                <h1 className="text-5xl font-bold tracking-tight">
                                    Solved Problems
                                </h1>

                                <p className="text-gray-400 mt-2 text-lg">
                                    View all the problems you have solved.
                                </p>

                            </div>

                            <button
                                onClick={() => navigate("/")}
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    transition
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                "
                            >
                                Return to Home
                            </button>

                        </div>


                        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 mb-8">

                                <div className="flex items-center gap-6">

                                    <div className=" h-16 w-16 rounded-xl bg-blue-600/20 flex items-center justify-center">

                                        ✅

                                    </div>

                                    <div>

                                        <p className="text-gray-400">

                                            You have solved

                                        </p>

                                        <div className="flex items-end gap-3 mt-1">

                                            <span className="text-4xl font-bold text-blue-400">

                                                {netSolvedProblems}

                                            </span>

                                            <span className="text-gray-300">

                                                problems out of

                                            </span>

                                            <span className="text-4xl font-bold text-blue-400">

                                                {totalProblems}

                                            </span>

                                            <span className="text-gray-300">

                                                total problems

                                            </span>

                                        </div>

                                    </div>

                                </div>

                        </div>

                        {/* filter cards */}

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 mb-8">
                          
                          <div className="grid grid-cols-3 gap-2">

                                <input
                                    type="text"
                                    placeholder="Search solved problem..."
                                    value={search}
                                    onChange={(e)=>{
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="
                                        w-full
                                        bg-slate-800
                                        border
                                        border-slate-700
                                        rounded-xl
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500
                                        transition
                                    "
                                    />

                                    <select
                                        value={difficulty}
                                        onChange={(e)=>{
                                            setDifficulty(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            rounded-xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
                                        "
                                    >

                                        <option value="all">All Difficulty</option>

                                        <option value="easy">Easy</option>

                                        <option value="medium">Medium</option>

                                        <option value="hard">Hard</option>

                                    </select>
                                    <select
                                        value={tag}
                                        onChange={(e)=>{
                                            setTag(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            rounded-xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-blue-500
                                        "
                                          >

                                        <option value="all">All Tags</option>

                                        <option value="Array">Array</option>

                                        <option value="DP">DP</option>

                                        <option value="Graph">Graph</option>

                                        <option value="Linked List">Linked List</option>

                                        <option value="Tree">Tree</option>

                                        <option value="Greedy">Greedy</option>

                                        <option value="Binary Search">Binary Search</option>

                                    </select>

                           

                          </div>

                        </div>
                        {
                            loading? (
                                   <div className=" bg-[#0B1120] flex items-center justify-center">

                                        <div className="flex flex-col items-center gap-4">

                                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                                            <p className="text-gray-400">
                                                Loading solved problems...
                                            </p>

                                        </div>

                                    </div>



                            ):(

                            
                        

                        <>

                          <div className="flex justify-center items-center mt-8 mb-4">

                                <button

                                disabled={currentPage===1}

                                onClick={()=>setCurrentPage(prev=>prev-1)}

                                className="
                                px-5
                                py-2
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                disabled:opacity-50
                                "

                                >

                                Previous

                                </button>

                                <p className="text-gray-400 p-3">

                                Page {currentPage} of {totalPages}

                                </p>

                                <button

                                disabled={currentPage===totalPages}

                                onClick={()=>setCurrentPage(prev=>prev+1)}

                                className="
                                px-5
                                py-2
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                disabled:opacity-50
                                "

                                >

                                Next

                                </button>

                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-800">

                            <table className="w-full">

                                
                                   <thead className="bg-slate-900 border-b border-slate-700">

                                        <tr className="
                                            border-b
                                            border-slate-800
                                            hover:bg-slate-800/40
                                            transition-all
                                            duration-200
                                            ">

                                        <th className="px-6 py-4 text-left text-slate-400 uppercase text-sm">
                                        No.
                                        </th>

                                        <th className="px-6 py-4 text-left text-slate-400 uppercase text-sm">
                                        Problem
                                        </th>

                                        <th className="px-6 py-4 text-left text-slate-400 uppercase text-sm">
                                        Difficulty
                                        </th>

                                        <th className="px-6 py-4 text-left text-slate-400 uppercase text-sm">
                                        Tag
                                        </th>

                                        <th className="px-6 py-4 text-left text-slate-400 uppercase text-sm">
                                        Score
                                        </th>

                                        </tr>

                                     </thead>

                                

                                        <tbody>
                                            {
                                                solvedProblems?.map((problem) => (

                                                    <tr key={problem._id}
                                                     className="
                                                        border-b
                                                        border-slate-800
                                                        hover:bg-slate-900/40
                                                        transition
                                                    ">

                                                        <td className="px-6 py-5">
                                                            {problem.problemNumber}
                                                        </td>

                                                        <td className="px-6 py-5">

                                                            <Link
                                                                to={`/problem/${problem._id}`}
                                                                className="
                                                                    text-blue-400
                                                                    hover:text-blue-300
                                                                    hover:underline
                                                                "
                                                            >

                                                                {problem.title}

                                                            </Link>

                                                        </td>

                                                        <td className="px-6 py-5">

                                                            <span className={`
                                                                px-3 py-1 rounded-full text-sm font-semibold
                                                                ${
                                                                    problem.difficulty === "easy"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : problem.difficulty === "medium"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                                }
                                                            `}>
                                                                  {problem.difficulty}
                                                            </span>


                                                           

                                                        </td>

                                                        <td className="px-6 py-5">

                                                             <span
                                                                className="
                                                                bg-slate-700
                                                                text-slate-300
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-sm
                                                                "
                                                            >
                                                                {problem.tags}
                                                            </span>

                                                        </td>

                                                        <td className="px-6 py-5 font-semibold text-cyan-400">

                                                            {problem.score}

                                                        </td>

                                                    </tr>

                                                ))
                                            }

                                        </tbody>

                            </table>

                        </div>
                        </>
                           
                        
                        )
                        
                        }

                      

                    </div>
                </div>










                
                </>
            )
}
export default ProblemSolvedPage;
