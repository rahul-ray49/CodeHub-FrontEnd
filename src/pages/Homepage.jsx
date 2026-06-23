import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import NavigationBar from './NavigationBar';

function Homepage(){


      const dispatch = useDispatch();
      const { user } = useSelector((state) => state.auth);
      const [problems, setProblems] = useState([]);
      const [solvedProblems, setSolvedProblems] = useState([]);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [Loading,setLoading]=useState(false);
      const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all' 
      });

   async function deleteProblem(problemId){
          const isConfirmed=window.confirm("Are you sure you want to delete this problem?");
          if(isConfirmed){
            try{
            await axiosClient.delete(`/problem/delete/${problemId}`);
            alert('your problem is successfully deleted');
            const newProblemArray=problems.filter((problem)=>problem._id!==problemId);
            setProblems(newProblemArray);
            }
            catch(err){
                 alert("couldnot delete problem please try again!!");
            }
          }
    }



       useEffect(() => {
         const fetchProblems = async () => {
           try {
             setLoading(true);
             const { data } = await axiosClient.get('/problem/getAllProblem',{
              params:{
                page,
                limit:5
              }
             });
             setProblems(data.getProblem);
             setTotalPages(data.totalPages);
           } catch (error) {
             console.error('Error fetching problems:', error);
           } finally{
               setLoading(false);
           }
         };
     



         const fetchSolvedProblems = async () => {
           try {
             const { data } = await axiosClient.get('/problem/problemSolvedByUser');
             setSolvedProblems(data);
           } catch (error) {
             console.error('Error fetching solved problems:', error);
           }
         };
     
         fetchProblems();
         if (user) fetchSolvedProblems();
       }, [user,page]);




    
          


      const filteredProblems = problems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
        const statusMatch = filters.status === 'all' || 
                        solvedProblems.some(sp => sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    });


    return(
        <>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">      
      {/* Navbar */}
      <NavigationBar user={user} setSolvedProblems={setSolvedProblems}/>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

          <select
            className="bg-slate-950 border border-slate-700 rounded-xl w-80 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={filters.status}
            onChange={(e) =>
              setFilters({...filters, status: e.target.value })
            }
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select
          className="bg-slate-950 border border-slate-700 rounded-xl w-80 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
          className="bg-slate-950 border border-slate-700 rounded-xl w-80 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={filters.tag}
            onChange={(e) =>
              setFilters({ ...filters, tag: e.target.value })
            }
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>

        {/* Problems List */}
        <div className="space-y-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {Loading ? 
      <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-lg"></span>
      </div>:
          (filteredProblems.map((problem) => (
  <div
    key={problem?._id}
    className="
      bg-slate-900
      border border-slate-800
      rounded-2xl
      p-5
      hover:border-blue-500
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-blue-500/10
      transition-all
      duration-300
    "
  >
    <div className="flex justify-between items-center">

      <h2 className="text-xl font-semibold">
        <NavLink
          to={`/problem/${problem?._id}`}
          className="text-slate-100 hover:text-blue-400 transition"
        >
         {problem?.problemNumber.toString()}. {problem?.title}
        </NavLink>
      </h2>

      {solvedProblems.some(
        (sp) => sp._id === problem._id
      ) && (
        <span
          className="
            flex items-center gap-2
            bg-emerald-500/20
            text-emerald-400
            border border-emerald-500/30
            px-3 py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          ✓ Solved
        </span>
      )}
    </div>

    <div className="flex gap-3 mt-4">
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor(
          problem.difficulty
        )}`}
      >
        {problem.difficulty}
      </span>

      <span
        className="
          px-3 py-1
          rounded-full
          text-sm
          font-medium
          bg-blue-500/20
          text-blue-400
          border border-blue-500/30
        "
      >
        {problem.tags}
      </span>
    </div>
    <div>
      {user.role==="admin"&&<div className='mt-2 flex flex-row-reverse'>
      <button  onClick={()=>deleteProblem(problem._id)}
  className="px-4 py-1 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
>
  Delete Problem
</button>
      </div>
}
      </div> 
  </div>
)))
}
</div>

<div className="flex justify-center items-center gap-4 mt-8">

  <button
    className="
      px-5 py-2
      bg-slate-900
      border border-slate-700
      rounded-xl
      hover:bg-slate-800
      transition
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
    disabled={page===1}
    onClick={() => setPage(prev => prev-1)}
  >
    Previous
  </button>

  <span className="text-slate-300 font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    className="
      px-5 py-2
      bg-slate-900
      border border-slate-700
      rounded-xl
      hover:bg-slate-800
      transition
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
    disabled={page===totalPages}
    onClick={() => setPage(prev => prev+1)}
  >
    Next
  </button>

</div>
      </div>
    </div>
        </>
    );
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

export default Homepage;