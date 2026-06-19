import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Homepage(){

     const dispatch = useDispatch();
      const { user } = useSelector((state) => state.auth);
      const [problems, setProblems] = useState([]);
      const [solvedProblems, setSolvedProblems] = useState([]);
      const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all' 
      });
       useEffect(() => {
         const fetchProblems = async () => {
           try {
             const { data } = await axiosClient.get('/problem/getAllProblem');
             setProblems(data);
           } catch (error) {
             console.error('Error fetching problems:', error);
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
       }, [user]);

       const handleLogout = () => {
           dispatch(logoutUser());
           setSolvedProblems([]); // Clear solved problems on logout
         };
          
      const filteredProblems = problems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
        const statusMatch = filters.status === 'all' || 
                        solvedProblems.some(sp => sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    });

    return(
        <>
        <div className="min-h-screen bg-[#1D232A]">
      
      {/* Navbar */}
      <nav className="bg-gray-700 shadow-md px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-600 transition"
        >
          CodeHub
        </NavLink>

        <div className="relative group">
          <button className="px-4 py-2 rounded-lg hover:bg-[#1D232A] font-medium">
            {user?.firstName}
          </button>

          <div className="absolute top-7 right-0 mt-0 w-40 hover:bg-[#1D232A] shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
            <button
              onClick={handleLogout}
              className="w-full rounded-md text-red-500 text-left px-4 py-3 hover:bg-[#1D232A]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-[#1D232A] focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-[#1D232A] focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="border border-gray-300 rounded-lg px-4 py-2 bg-[#1D232A] focus:ring-2 focus:ring-blue-500 outline-none"
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
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <div
              key={problem._id}
              className="bg-gray-700 rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold">
                  <NavLink
                    to={`/problem/${problem._id}`}
                    className="hover:text-blue-600"
                  >
                    {problem.title}
                  </NavLink>
                </h2>

                {solvedProblems.some(
                  (sp) => sp._id === problem._id
                ) && (
                  <span className="flex items-center gap-2 bg-green-700 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Solved
                  </span>
                )}
              </div>

              <div className="flex gap-3 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-700 text-blue-200">
                  {problem.tags}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
        </>
    );
}
const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-500 text-white";
    case "medium":
      return "bg-yellow-300 text-yellow-900";
    case "hard":
      return "bg-red-900 text-red-200";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default Homepage;