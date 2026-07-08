import { useNavigate } from "react-router-dom";


function SubmissionHistory({submissionLoading,submissions}){

    const navigate=useNavigate();



     if (submissionLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

                <p className="mt-5 text-gray-400 text-lg">
                    Loading your submissions...
                </p>
            </div>
        );
    }

     if (submissions.length === 0) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#141B2D] p-6 sm:p-10 text-center">

                    <div className="text-5xl sm:text-6xl mb-5">
                        📄
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        No Submissions Yet
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-gray-400 leading-6 sm:leading-7">
                        Looks like you haven't submitted this problem yet.
                        Once you submit your solution, your complete submission
                        history will appear here.
                    </p>

                </div>
            </div>
        );
    }


    return (

         <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-lg">

            <table className="w-full min-w-[900px]">

                <thead className="bg-[#18223B]">

                    <tr>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Status
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Language
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Runtime
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Memory
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Test Cases
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Submitted
                        </th>

                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-gray-300">
                            Action
                        </th>

                    </tr>

                </thead>

                

                    <tbody>

                        {submissions?.map((submission) => (

                            <tr
                                key={submission?._id}
                                className="border-t border-slate-700 hover:bg-[#18223B] transition-colors duration-200"
                            >

                                {/* Status */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4">

                                    <span
                                        className={`px-3 py-1 text-center rounded-full text-xs sm:text-sm font-medium whitespace-nowrap
                                        ${
                                            submission?.status === "Accepted"
                                                ? " text-green-400"

                                            : submission?.status === "Wrong Answer"
                                                ? " text-red-400"

                                            : submission?.status === "Compilation Error"
                                                ? " text-yellow-400"

                                            : submission?.status === "Runtime Error"
                                                ? " text-orange-400"

                                            : submission?.status === "Time Limit Exceeded"
                                                ? " text-purple-400"

                                            : " text-gray-400"
                                        }`}
                                    >
                                        {submission?.status}
                                    </span>

                                </td>

                                {/* Language */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 whitespace-nowrap">

                                    {submission?.language}

                                </td>

                                {/* Runtime */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 whitespace-nowrap">

                                    {submission?.runtime > 0
                                        ? `${submission?.runtime} ms`
                                        : "--"}

                                </td>

                                {/* Memory */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 whitespace-nowrap">

                                    {submission?.memory > 0
                                        ? `${submission?.memory} KB`
                                        : "--"}

                                </td>

                                {/* Test Cases */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300">

                                    {submission?.testCasesPassed} / {submission?.testCasesTotal}

                                </td>

                                {/* Submitted At */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 whitespace-nowrap">

                                    {new Date(submission?.createdAt).toLocaleString()}

                                </td>

                                {/* Action */}

                                <td className="px-4 sm:px-6 py-3 sm:py-4">

                                    <button
                                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer whitespace-nowrap"
                                        onClick={()=>navigate(`/submission-details/${submission?._id}`)}
                                    >
                                        View Code
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

              

            </table>

    </div>
    )
}
export default SubmissionHistory;