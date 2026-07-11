import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import NavigationBar from './NavigationBar';



      function ProblemListPage(){

        const { user } = useSelector((state) => state.auth);

        const [loading, setLoading] = useState(false);
        const [problems, setProblems] = useState([]);
        const [solvedProblemsIds, setSolvedProblemsIds] = useState([]);

        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [search, setSearch] = useState("");

        const[difficulty,setDifficulty]=useState("all");
        const[tag,setTag]=useState("all");
        const limit=5;


        useEffect(() => {
            fetchProblems();
        }, [page,search,difficulty,tag]);



        useEffect(() => {
            if(user){
                fetchSolvedProblems();
            }
        }, [user]);



        

            const fetchProblems=async()=>{

              try{
                setLoading(true);
                const response=await axiosClient.get("/problem/getAllProblem",{
                  params:{
                    page,
                    limit,
                    search,
                    difficulty,
                    tag
                  }
                });
                setProblems(response.data.getProblem);
                setTotalPages(response.data.totalPages);
              }
              catch(error){
                console.log(error);
                alert(error?.response?.data?.message || "Error fetching problems");
              }
              finally{
                setLoading(false);
              }
            }



            const fetchSolvedProblems=async()=>{


              try{
                const response=await axiosClient.get("/problem/ProblemSolvedByUser2");
                setSolvedProblemsIds(response.data.solvedProblemsIds);
              }
              catch(error){

             console.log(error);
             alert(error?.response?.data?.message || "Error fetching solved problems");

              }

            }



            const deleteProblem = async (problemId) => {

                  const isConfirmed = window.confirm(
                      "Are you sure you want to delete this problem?"
                  );

                  if (!isConfirmed) return;

                  try {

                      await axiosClient.delete(`/problem/delete/${problemId}`);

                      alert("Problem deleted successfully.");
                      if (problems.length === 1 && page > 1) {
                            await fetchSolvedProblems();
                            setPage((prev) => prev - 1);
                        } else {
                            await fetchProblems();
                            await fetchSolvedProblems();
                        }
                     

                  }
                  catch (error) {

                      console.log(error);

                      alert(
                          error?.response?.data?.message || "Problem could not be deleted."
                      );

                  }

              }














             return(
              <>
                <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
                    <NavigationBar
                        user={user}
                        setSolvedProblemsIds={setSolvedProblemsIds}
                    />

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                              <input
                                  type="text"
                                  placeholder="Search Problems..."
                                  value={search}
                                  onChange={(e)=>{
                                      setSearch(e.target.value);
                                      setPage(1);
                                  }}
                                  className="
                                      w-full
                                      bg-slate-950
                                      border border-slate-700
                                      rounded-xl
                                      px-4
                                      py-3
                                      text-white
                                      placeholder:text-slate-500
                                      focus:outline-none
                                      focus:ring-2
                                      focus:ring-blue-500
                                  "
                              />

                              <select
                                  value={difficulty}
                                  onChange={(e)=>{
                                      setDifficulty(e.target.value);
                                      setPage(1);
                                  }}
                                  className="
                                        w-full
                                      bg-slate-950
                                      border border-slate-700
                                      rounded-xl
                                      px-4
                                      py-3
                                      text-white
                                      focus:outline-none
                                      focus:ring-2
                                      focus:ring-blue-500
                                  "
                              >
                                  <option value="all">All Difficulties</option>
                                  <option value="easy">Easy</option>
                                  <option value="medium">Medium</option>
                                  <option value="hard">Hard</option>
                              </select>

                              <select
                                  value={tag}
                                  onChange={(e)=>{
                                      setTag(e.target.value);
                                      setPage(1);
                                  }}
                                  className="
                                      w-full
                                      bg-slate-950
                                      border border-slate-700
                                      rounded-xl
                                      px-4
                                      py-3
                                      text-white
                                      focus:outline-none
                                      focus:ring-2
                                      focus:ring-blue-500
                                  "
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

                   <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-4 mb-4 pb-4 px-4">

                        <button
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}
                            className="
                                px-4 sm:px-5
                                py-2
                                text-sm sm:text-base
                                rounded-xl
                                bg-slate-900
                                border
                                border-slate-700
                                text-white
                                transition
                                hover:bg-slate-800
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            Previous
                        </button>

                        <span
                            className="
                                px-3 sm:px-4
                                py-2
                                text-sm sm:text-base
                                rounded-lg
                                bg-blue-600
                                font-semibold
                                text-white
                            "
                        >
                            {page} / {totalPages===0?"1":totalPages}
                        </span>

                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={totalPages === 0 || page >= totalPages}
                            className="
                                px-4 sm:px-5
                                py-2
                                text-sm sm:text-base
                                rounded-xl
                                bg-slate-900
                                border
                                border-slate-700
                                text-white
                                transition
                                hover:bg-slate-800
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            Next
                        </button>

                    </div>



                  <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-6xl mx-auto">

                              {
                                loading ?

                                <div className="flex justify-center py-12">
                                  <span className="loading loading-spinner loading-lg"></span>
                                </div>

                                :

                                problems.length===0 ?

                                <div className="flex justify-center items-center h-40">
                                  <h2 className="text-xl text-slate-400 font-semibold">
                                    No Problems Found
                                  </h2>
                                </div>

                                :

                                <div className="space-y-5 max-w-5xl mx-auto w-full">

                                  {
                                    problems?.map((problem)=>(

                                      <div
                                        key={problem._id}
                                        className="
                                          bg-slate-950
                                          border border-slate-800
                                          rounded-2xl
                                          p-4 sm:p-5 lg:p-6
                                          hover:border-blue-500
                                          hover:-translate-y-1
                                          hover:shadow-xl
                                          hover:shadow-blue-500/10
                                          transition-all
                                          duration-300
                                        "
                                      >

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                                          <h2 className="text-lg sm:text-xl font-semibold break-words">

                                            <NavLink
                                              to={`/problem/${problem._id}`}
                                              className="text-slate-100 hover:text-blue-400 transition break-words"
                                            >
                                              {problem.problemNumber}. {problem.title}
                                            </NavLink>

                                          </h2>

                                          {
                                            solvedProblemsIds?.includes(problem._id) &&

                                            <span
                                              className="
                                                inline-flex items-center justify-center gap-2
                                                self-start sm:self-auto
                                                bg-emerald-500/20
                                                text-emerald-400
                                                border border-emerald-500/30
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs sm:text-sm
                                                font-medium
                                              "
                                            >
                                              ✓ Solved
                                            </span>
                                          }

                                        </div>

                                        <div className="flex flex-wrap gap-3 mt-5">

                                          <span
                                            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyBadgeColor(problem.difficulty)}`}
                                          >
                                            {problem.difficulty}
                                          </span>

                                          <span
                                            className="
                                              px-3
                                              py-1
                                              rounded-full
                                              text-xs sm:text-sm
                                              font-medium
                                              bg-blue-500/20
                                              text-blue-400
                                              border border-blue-500/30
                                            "
                                          >
                                            {problem.tags}
                                          </span>

                                        </div>

                                        {
                                          user?.role==="admin" &&

                                          <div className="mt-5 flex justify-end">
                                           

                                             <button
                                             onClick={()=>deleteProblem(problem?._id)}
                                              className="
                                              w-full
                                              sm:w-auto
                                                px-4
                                                py-2
                                                bg-red-600
                                                rounded-lg
                                                hover:bg-red-700
                                                transition
                                              "
                                            >
                                              Delete Problem
                                            </button>
                                            
                                            
                                            
                                            

                                           

                                          </div>
                                        }

                                      </div>

                                    ))
                                  }

                                </div>
                              }

                  </div>

                 


                </div>
              
              
              
              
              </>



             )



      }



const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";

    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

    case "hard":
      return "bg-red-500/20 text-red-400 border border-red-500/30";

    default:
      return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
  }
};

export default ProblemListPage;