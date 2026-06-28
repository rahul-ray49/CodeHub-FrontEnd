import { useState } from "react";
import {Link} from "react-router-dom"
import {FaHistory} from "react-icons/fa"
import { useEffect } from "react";
import axiosClient from "../utils/axiosClient"

function SubmissionHistoryPage(){
    const [submissions, setSubmissions] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);




    const fetchSubmissionHistory = async () => {

            try {

                setLoading(true);

                const response = await axiosClient.get(
                    `/history/submission-history?page=${page}&limit=10`
                );

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

                setLoading(false);

            }

        };

        useEffect(()=>{

            fetchSubmissionHistory();


        },[page])


    return (
        <>
        <div className="min-h-screen bg-slate-900/80">

          <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex items-start justify-between mb-10">

                    <div>

                        <div className="flex items-center gap-4 mb-3">

                            <div className="bg-blue-600/20 p-3 rounded-xl">
                                <FaHistory className="text-2xl text-blue-400" />
                            </div>

                            <h1 className="text-5xl font-bold text-white">
                                Submission History
                            </h1>

                        </div>

                        <p className="text-slate-400 text-xl">
                            Review all your previous submissions and track your coding progress.
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold transition-all"
                    >
                        Return to Home
                    </Link>

                </div>



            <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-[#172033]">

                        <tr className="text-left">

                            <th className="px-8 py-5 text-slate-400 font-semibold">
                                Status
                            </th>

                            <th className="px-8 py-5 text-slate-400 font-semibold">
                                Problem
                            </th>

                            <th className="px-8 py-5 text-slate-400 font-semibold">
                                Language
                            </th>

                            <th className="px-8 py-5 text-slate-400 font-semibold">
                                Submitted At
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="py-16"
                                        >
                                            <div className="flex justify-center">
                                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        </td>

                                    </tr>

                                ) : submissions?.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="text-center py-16 text-slate-400 text-lg"
                                        >
                                            No Submission History Found
                                        </td>

                                    </tr>

                                ) : (

                                    submissions?.map((submission) => (

                                            <tr
                                                key={submission?._id}
                                                className="border-t border-slate-800 hover:bg-[#1b2538] transition-colors"
                                            >

                                                <td
                                                    className={`px-8 py-6 font-medium ${
                                                        submission?.status === "Accepted"
                                                            ? "text-green-400"
                                                            : submission?.status === "Time Limit Exceeded"
                                                            ? "text-orange-400"
                                                            : submission?.status === "Pending"
                                                            ? "text-yellow-400"
                                                            : "text-red-400"
                                                    }`}
                                                >
                                                    {submission?.status}
                                                </td>

                                                <td className="px-8 py-6">
                                                    <Link
                                                        to={`/problem/${submission?.problemId._id}`}
                                                        className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                                                    >
                                                        {submission?.problemId.title}
                                                    </Link>
                                                </td>

                                                <td className="px-8 py-6 text-slate-300">
                                                    {submission?.language}
                                                </td>

                                                <td className="px-8 py-6 text-slate-400">
                                                    {new Date(submission?.createdAt).toLocaleString("en-IN", {
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })}
                                                </td>



                                            </tr>

                                        ))

                                )}

                            

                        

                    </tbody>

                </table>

            </div>

        </div>

        <div className="flex justify-between items-center mt-2 max-w-3xl mx-auto pb-3">

            <button
                onClick={() => setPage(page - 1)}
                disabled={!pagination?.hasPrevPage}
                className="px-5 py-2 rounded-xl bg-[#111827] border border-slate-800 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                ← Previous
            </button>

            <span className="text-slate-400">
                Page {page} of {pagination?.totalPages || 1}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination?.hasNextPage}
                className="px-5 py-2 rounded-xl bg-[#111827] border border-slate-800 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Next →
            </button>

        </div>
        
       </div>             
        
        
        </>
    )
}
export default SubmissionHistoryPage;