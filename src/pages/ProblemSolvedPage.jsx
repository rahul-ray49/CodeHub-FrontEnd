import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsCheck2Square } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineDocumentSearch } from "react-icons/hi";

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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">


                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">

                            <div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                                    Solved Problems
                                </h1>

                                <p className="text-gray-400 mt-2 text-base sm:text-lg">
                                    View all the problems you have solved.
                                </p>

                            </div>

                            <button
                                onClick={() => navigate("/")}
                                className="
                                    w-full
                                    sm:w-auto
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


                        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 mb-8">

                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">

                                    <div className=" h-16 w-16 rounded-xl bg-blue-600/20 flex items-center justify-center self-center sM:self-auto text-3xl">

                                        ✅

                                    </div>

                                    <div>

                                        <p className="text-gray-400">

                                            You have solved

                                        </p>

                                        <div className="flex items-end gap-2 sm:gap-3 mt-2">

                                            <span className="text-3xl sm:text-4xl font-bold text-blue-400">

                                                {netSolvedProblems}

                                            </span>

                                            <span className="text-gray-300 text-sm sm:text-base">

                                                problems out of

                                            </span>

                                            <span className="text-3xl sm:text-4xl font-bold text-blue-400">

                                                {totalProblems}

                                            </span>

                                            <span className="text-gray-300 text-sm sm:text-base">

                                                total problems

                                            </span>

                                        </div>

                                    </div>

                                </div>

                        </div>

                        {/* filter cards */}

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8">
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

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
                                        text-sm sm:text-base
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-500/20
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
                                              w-full
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-sm sm:text-base
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-500/20
                                            transition
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
                                             w-full
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-sm sm:text-base
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-500/20
                                            transition
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
                        <div className="flex flex-wrap justify-center items-center gap-3 mt-8 mb-6 px-2">

                                <button

                                disabled={currentPage===1}

                                onClick={()=>setCurrentPage(prev=>prev-1)}

                                className="
                                px-4 sm:px-5
                                py-2
                                text-sm sm:text-base
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                "

                                >

                                Previous

                                </button>

                                <p className="text-gray-400 px-2 py-2 text-sm sm:text-base text-center">

                                Page {currentPage} of {totalPages}

                                </p>

                                <button

                                disabled={currentPage===totalPages}

                                onClick={()=>setCurrentPage(prev=>prev+1)}

                                className="
                                px-4 sm:px-5
                                py-2
                                text-sm sm:text-base
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                "

                                >

                                Next

                                </button>

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

                          

                        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-lg">

                            <table className="min-w-[700px] w-full">

                                
                                   <thead className="bg-slate-900 border-b border-slate-700">

                                        <tr className="
                                            border-b
                                            border-slate-800
                                            hover:bg-slate-800/40
                                            transition-all
                                            duration-200
                                            ">

                                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400 uppercase text-xs sm:text-sm">
                                        No.
                                        </th>

                                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400 uppercase text-xs sm:text-sm">
                                        Problem
                                        </th>

                                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400 uppercase text-xs sm:text-sm">
                                        Difficulty
                                        </th>

                                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400 uppercase text-xs sm:text-sm">
                                        Tag
                                        </th>

                                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400 uppercase text-xs sm:text-sm">
                                        Score
                                        </th>

                                        </tr>

                                     </thead>

                                

                                        <tbody>
                                            {
                                                solvedProblems.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="px-4 py-12 sm:px-6 sm:py-16">
                                                            <div className="flex flex-col items-center text-center">

                                                            <HiOutlineDocumentSearch
                                                                className="text-5xl sm:text-6xl lg:text-7xl text-blue-400"
                                                            />

                                                            <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                                                                No Solved Problems
                                                            </h2>

                                                            <p className="mt-3 max-w-md px-2 text-sm sm:text-base text-slate-400 leading-relaxed">
                                                                You haven't solved any problems yet.
                                                                Start solving problems to track your progress here.
                                                            </p>

                                                            <button
                                                                onClick={() => navigate("/problemSection")}
                                                                className="
                                                                mt-6
                                                                w-full
                                                                max-w-[220px]
                                                                sm:w-auto
                                                                px-6
                                                                py-3
                                                                rounded-xl
                                                                bg-blue-600
                                                                hover:bg-blue-700
                                                                transition-all
                                                                duration-300
                                                                font-semibold
                                                                "
                                                            >
                                                                Solve Problems
                                                            </button>

                                                            </div>
                                                        </td>
                                                        </tr>
                                                ) 
                                                :

                                            


                                            (
                                                solvedProblems?.map((problem) => (

                                                    <tr key={problem?._id}
                                                     className="
                                                        border-b
                                                        border-slate-800
                                                        hover:bg-slate-900/40
                                                        transition
                                                    ">

                                                        <td className="px-4 sm:px-6 py-5 text-sm sm:text-base">
                                                            {problem?.problemNumber}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-5 text-sm sm:text-base">

                                                            <Link
                                                                to={`/problem/${problem?._id}`}
                                                                className="
                                                                    text-blue-400
                                                                    hover:text-blue-300
                                                                    hover:underline
                                                                "
                                                            >

                                                                {problem?.title}

                                                            </Link>

                                                        </td>

                                                        <td className="px-4 sm:px-6 py-5 text-sm sm:text-base">

                                                            <span className={`
                                                                px-3 py-1 rounded-full text-xs sm:text-sm font-semibold
                                                                ${
                                                                    problem?.difficulty === "easy"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : problem?.difficulty === "medium"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                                }
                                                            `}>
                                                                  {problem?.difficulty}
                                                            </span>


                                                           

                                                        </td>

                                                        <td className="px-4 sm:px-6 py-5 text-sm sm:text-base">

                                                             <span
                                                                className="
                                                                bg-slate-700
                                                                text-slate-300
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-xs
                                                                sm:text-sm
                                                                "
                                                            >
                                                                {problem?.tags}
                                                            </span>

                                                        </td>

                                                        <td className="px-6 py-5 font-semibold text-cyan-400">

                                                            {problem?.score}

                                                        </td>

                                                    </tr>

                                                ))
                                            )
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
