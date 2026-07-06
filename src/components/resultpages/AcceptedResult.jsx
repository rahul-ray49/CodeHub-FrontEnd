

function AcceptedResult({ passedCases,totalCases,runtime,memory}){


    return(
       <div>
        <div className="bg-slate-900/80 rounded-xl border border-slate-900/80 p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                <div className="text-4xl sm:text-5xl">
                    🎉
                </div>

                <div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-green-500">
                        Accepted
                    </h2>

                    <p className="text-sm sm:text-base text-gray-400 mt-2 leading-6">
                        Congratulations! Your solution passed all hidden test cases.
                    </p>

                </div>

            </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-4 sm:p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Passed
                    </p>                                    

                    <h2 className="text-xl sm:text-2xl  font-bold text-white mt-2 break-words">
                        {passedCases}/{totalCases}
                    </h2>

                </div>

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-4 sm:p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Runtime                                                
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 break-words">
                        {runtime ?? "--"} ms
                    </h2>                                      

                </div>

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-4 sm:p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Memory
                    </p>

                    <h2 className="text-xl sm:text-2xl  font-bold text-white mt-2 break-words">
                        {memory ?? "--"} KB
                    </h2>

                </div>

        </div>


        <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-5">

            <div className="flex items-start gap-3">

                <div className="text-2xl flex-shrink-0">
                    ✅
                </div>

                <div>

                    <h3 className="text-green-400 text-lg sm:text-xl font-semibold">
                        Excellent Work!
                    </h3>

                    <p className="text-gray-300 mt-2 leading-7 text-sm sm:text-base text-gray-300 mt-2 leading-6 sm:leading-7">
                        Your solution passed all hidden test cases successfully.
                        You can now move on to solve more challenging problems.
                    </p>

                </div>

            </div>

        </div>
    </div>
    )
}
export default AcceptedResult;