import { useNavigate } from "react-router-dom";
import NavigationBar2 from "./NavigationBar2";
import { User, House, BookOpen, Trophy, LogOut,ClipboardList} from "lucide-react";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";

function UserProfile(){
    const navigate=useNavigate();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    const [easy, setEasy] = useState(0);

    const [medium, setMedium] = useState(0);

    const [hard, setHard] = useState(0);

    const [totalSolved, setTotalSolved] = useState(0);

    const[submissions,setSubmissions]= useState(null);

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState(null);

    const [submissionLoading,setSubmissionLoading]=useState(false);





         const fetchSubmissionHistory = async () => {

            try {

                setSubmissionLoading(true);

                const response = await axiosClient.get(
                    `/history/submission-history?page=${page}&limit=5`
                );

                if(!response.data.success) {
                    return;
                }

                setSubmissions(response.data.submissions);

                setPagination(response.data.pagination);

            }
            catch (err) {

                console.error(err);

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to fetch submission history."
                );

            }
            finally {

                setSubmissionLoading(false);

            }

        };






            const getUserProfile = async () => {

            try {

                setLoading(true);

                const response = await axiosClient.get("/user/getProfile");

                if (response.data.success) {

                    setUser(response.data.user);
                    setEasy(response.data.easy);
                    setMedium(response.data.medium);
                    setHard(response.data.hard);
                    setTotalSolved(response.data.totalSolved);

                }

            } catch (err) {

                console.error(err);

                alert(err.response?.data?.message || "Failed to fetch profile.");

            } finally {

                setLoading(false);

            }

        };

             useEffect(() => {

                getUserProfile();

            }, []);


            useEffect(()=>{
                fetchSubmissionHistory();
            },[page]);


            if (loading) {
                return (
                    <div className="min-h-screen flex justify-center items-center bg-slate-900">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                );
            }



    return (
          <div className="min-h-screen bg-slate-900">

            <NavigationBar2 />

            <div className="flex">

               

                <div className="w-64 min-h-[calc(100vh-64px)] bg-slate-800 border-r border-slate-700 p-5">

                    <h2 className="text-white text-2xl font-bold mb-8">
                        CodeHub
                    </h2>

                    <nav className="space-y-2">

                        <button onClick={()=>navigate("/")} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition cursor-pointer">
                            <House size={20} />
                            Home
                        </button>

                        <button onClick={()=>navigate("/problemSection")} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition cursor-pointer">
                            <BookOpen size={20} />
                            Problems
                        </button>

                        <button onClick={()=>navigate("/profile/me")} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-600 text-white cursor-pointer">
                            <User size={20} />
                            Profile
                        </button>

                        <button onClick={()=>navigate("/solved")} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition cursor-pointer">
                            <Trophy size={20} />
                            Solved
                        </button>

                          <button onClick={()=>navigate("/submission-history")} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition cursor-pointer">
                            <ClipboardList size={20} />
                            Submissions
                        </button>

                    </nav>

                </div>

             

                <div className="flex-1 p-8">

                  <h1 className="text-4xl font-bold text-white">
                        My Profile
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage your profile and track your coding progress.
                    </p>




                    <div className="mt-8 rounded-2xl bg-slate-800 border border-slate-700 p-8">

                        <div className="flex items-center gap-6">

                           

                            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white">

                                {user?.firstName.slice(0,1).toUpperCase()}

                            </div>

                            <div>

                                <h2 className="text-3xl font-semibold text-white">

                                   {user?.firstName} {user?.lastName}

                                </h2>

                                <p className="text-slate-400 mt-2">

                                   {user?.emailId}

                                </p>

                                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">

                                   {user?.role.toUpperCase()}

                                </span>

                            </div>

                        </div>

                    </div>



                    <div className="grid grid-cols-3 gap-6 mt-8">

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">

                            <p className="text-slate-400">
                                Current Score
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-3">
                               {user?.userScore}
                            </h2>

                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">

                            <p className="text-slate-400">
                                Problems Solved
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-3">
                                {totalSolved ?? 0}
                            </h2>

                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">

                            <p className="text-slate-400">
                                Joined
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-3">
                                {new Date(user?.createdAt).toLocaleDateString()}
                            </h2>

                        </div>

                    </div>


                    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">

                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Problem Solving Statistics
                        </h2>

                        <div className="grid grid-cols-3 gap-6">

                            <div className="rounded-xl bg-slate-900 border border-slate-700 p-6 text-center">

                                <p className="text-green-400 text-sm font-medium">
                                    Easy
                                </p>

                                <h2 className="text-4xl font-bold text-white mt-3">
                                    {easy ?? 0}
                                </h2>

                            </div>

                            <div className="rounded-xl bg-slate-900 border border-slate-700 p-6 text-center">

                                <p className="text-yellow-400 text-sm font-medium">
                                    Medium
                                </p>

                                <h2 className="text-4xl font-bold text-white mt-3">
                                    {medium ?? 0}
                                </h2>

                            </div>

                            <div className="rounded-xl bg-slate-900 border border-slate-700 p-6 text-center">

                                <p className="text-red-400 text-sm font-medium">
                                    Hard
                                </p>

                                <h2 className="text-4xl font-bold text-white mt-3">
                                    {hard ?? 0}
                                </h2>

                            </div>

                        </div>

                    </div>



                    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-semibold text-white">
                                Recent Submissions
                            </h2>

                            <button onClick={()=>navigate("/submission-history")} className="text-blue-400 hover:text-blue-300">
                                View All
                            </button>

                        </div>

                          <div className="flex items-center justify-center gap-3 mt-6 mb-4">

                                    <button
                                        disabled={pagination?.currentPage === 1}
                                        onClick={() => setPage((prev) => prev - 1)}
                                        className={`px-4 py-2 rounded-lg border transition
                                        ${
                                            pagination?.currentPage === 1
                                                ? "border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed"
                                                : "border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    <span className="text-slate-300 font-medium">
                                        Page {pagination?.currentPage} of {pagination?.totalPages}
                                    </span>

                                    <button
                                        disabled={pagination?.currentPage === pagination?.totalPages}
                                        onClick={() => setPage((prev) => prev + 1)}
                                        className={`px-4 py-2 rounded-lg border transition
                                        ${
                                            pagination?.currentPage === pagination?.totalPages
                                                ? "border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed"
                                                : "border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                                        }`}
                                    >
                                        Next
                                    </button>

                           </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="border-b border-slate-700">

                                    <tr>

                                        <th className="text-left py-3 text-slate-400">Status</th>

                                        <th className="text-left py-3 text-slate-400">Problem</th>

                                        <th className="text-left py-3 text-slate-400">Language</th>

                                        <th className="text-left py-3 text-slate-400">Submitted</th>

                                    </tr>

                                </thead>

                               

                                 <tbody>
                                    {
                                        submissionLoading ? (
                                            <tr>

                                            <td
                                                colSpan={5}
                                                className="py-16"
                                            >
                                                <div className="flex justify-center">
                                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            </td>

                                        </tr>
                                        )
                                        :



                                    (submissions?.map((submission) => (

                                        <tr
                                            key={submission?._id}
                                            className="border-b border-slate-700 hover:bg-slate-700/40 transition-colors"
                                        >


                                            <td className="px-4 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium
                                                    ${
                                                        submission?.status === "Accepted"
                                                            ? "bg-green-500/20 text-green-400"
                                                            : submission?.status === "Wrong Answer"
                                                            ? "bg-red-500/20 text-red-400"
                                                            : submission?.status === "Compilation Error"
                                                            ? "bg-orange-500/20 text-orange-400"
                                                            : submission?.status === "Runtime Error"
                                                            ? "bg-pink-500/20 text-pink-400"
                                                            : submission?.status === "Time Limit Exceeded"
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-slate-600/30 text-slate-300"
                                                    }`}
                                                >
                                                    {submission?.status}
                                                </span>

                                            </td>


                                            <td className="px-4 py-4 text-white font-medium">

                                                {submission?.problemId?.title}

                                            </td>


                                            <td className="px-4 py-4 text-slate-300 capitalize">

                                                {submission?.language}

                                            </td>


                                            <td className="px-4 py-4 text-slate-400">

                                                {new Date(submission?.createdAt).toLocaleDateString()}

                                            </td>


                                            <td className="px-4 py-4">

                                                <button onClick={()=>navigate(`/submission-details/${submission?._id}`)}
                                                    className="text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )))

                                }

                                

                                  

                                </tbody>

                            </table>

                            

                        </div>



                          

                    </div>







     
               </div>

            </div>

        </div>
    )
}
export default UserProfile;